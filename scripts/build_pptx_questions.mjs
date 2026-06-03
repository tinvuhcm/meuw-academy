#!/usr/bin/env node
/**
 * build_pptx_questions.mjs
 *
 * Reads PPTX JSON files (from extract_pptx_content.py) and converts them
 * into app-compatible question pools per subject.
 *
 * Output: js/data/kntt-pptx-questions.js
 *
 * Question strategy per subject:
 *  - vocab slides     → fill-blank + multiple-choice (term ↔ definition)
 *  - Q+A slide pairs  → comprehension multiple-choice
 *  - theory slides    → key-fact multiple-choice
 *  - lesson context   → scenario questions enriched with source citation
 *
 * Usage: node scripts/build_pptx_questions.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO      = path.resolve(__dirname, '..');
const PPTX_ROOT = path.join(REPO, 'docs/research/official-sources/notes/pptx-content');
const OUT_FILE  = path.join(REPO, 'js/data/kntt-pptx-questions.js');

// ─── Subject folder → app code ──────────────────────────────────────────────
const SUBJECT_MAP = {
  'tieng-viet':            'vie',
  'khoa-hoc':              'sci',
  'lich-su-va-dia-li':     'histgeo',
  'dao-duc':               'ethics',
  'am-nhac':               'music',
  'mi-thuat':              'art',
  'cong-nghe':             'tech',
  'hoat-dong-trai-nghiem': 'life',
  'tin-hoc':               'it',
  'giao-duc-the-chat':     'pe',
  'tieng-anh':             'eng',
  // toan is skipped — has generator
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function topicKeyFromFile(subjectCode, filename) {
  const stem = filename.replace(/\.json$/, '').replace(/\.pptx$/, '');
  return `${subjectCode}:pptx:${slugify(stem)}`;
}

function shortCitation(subjectCode, title, slideNo) {
  const SUBJECT_BOOK = {
    vie:     'TV4 KNTT',
    sci:     'KH4 KNTT',
    histgeo: 'LSDL4 KNTT',
    ethics:  'ĐĐ4 KNTT',
    music:   'ÂN4 KNTT',
    art:     'MT4 KNTT',
    tech:    'CN4 KNTT',
    life:    'HĐTN4 KNTT',
    it:      'TH4 KNTT',
    pe:      'TDTC4 KNTT',
    eng:     'TA4 KNTT',
  };
  const book = SUBJECT_BOOK[subjectCode] || subjectCode.toUpperCase();
  return `${book} — ${title.slice(0, 40)}${slideNo ? ', slide ' + slideNo : ''}`;
}

// ─── Distractor pools (subject-specific wrong answers) ───────────────────────

const GENERIC_WRONG = [
  'Không có trong bài',
  'Đây là nội dung môn khác',
  'Thông tin chưa được học',
];

function pickDistractors(correct, pool, count, fallback) {
  const others = pool.filter(x => x !== correct && x && x.length > 1);
  const picked = [];
  const seen = new Set([correct]);
  for (const item of others) {
    if (picked.length >= count) break;
    if (!seen.has(item)) { picked.push(item); seen.add(item); }
  }
  while (picked.length < count) {
    const f = fallback[picked.length % fallback.length];
    if (!seen.has(f)) { picked.push(f); seen.add(f); }
    else picked.push(`Đáp án ${picked.length + 1} không đúng`);
  }
  return picked.slice(0, count);
}

function shuffle(arr, seed) {
  const a = [...arr];
  let h = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h ^= h >>> 16;
    const j = (h >>> 0) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function strHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ─── Question builders ───────────────────────────────────────────────────────

/**
 * From vocab pairs: build fill-blank and MC questions.
 */
// Words that appear as section headings but not real vocab terms/defs
const META_VOCAB = new Set(['từ ngữ', 'nghĩa của từ', 'ví dụ', 'gợi ý', 'hướng dẫn',
  'nhận xét', 'kết luận', 'ghi nhớ', 'luyện tập', 'ôn tập', 'thảo luận',
  'cách tiến hành', 'hoạt động', 'nhiệm vụ', 'câu hỏi']);

function isMetaVocab(text) {
  if (!text) return true;
  const t = text.trim().toLowerCase().replace(/[:.!]/g, '').trim();
  if (t.length < 4) return true;
  if (META_VOCAB.has(t)) return true;
  // Short all-caps text (section header)
  if (/^[A-ZĐÂÊÔƯ\s]{4,}$/.test(text.trim())) return true;
  return false;
}

function cleanVocabText(text) {
  // Remove trailing poem markers (* or -)
  return (text || '').replace(/\s*[*✦●•–—]+\s*$/, '').trim();
}

function buildVocabQuestions(vocab, citation, subjectCode) {
  if (!vocab || vocab.length < 1) return [];
  const questions = [];

  // Filter valid vocab pairs first
  // A real vocab entry: term is 1-6 words, definition is meaningfully longer than term,
  // and neither is a section header or poem continuation.
  const validVocab = vocab.filter(v => {
    const term = cleanVocabText(v.term);
    const def  = cleanVocabText(v.definition);
    if (!term || !def) return false;
    if (term.length < 2 || def.length < 10) return false;
    if (isMetaVocab(term) || isMetaVocab(def)) return false;
    // Term should be 1-5 words; both term AND def having ≥4 words = poem/prose, not vocab
    const termWords = term.split(/\s+/).length;
    const defWords  = def.split(/\s+/).length;
    if (termWords > 6) return false;
    if (termWords >= 3 && defWords >= 4) return false; // both multi-word = likely poem
    if (def.length < term.length) return false;
    return true;
  });
  if (validVocab.length < 1) return [];

  const allTerms = validVocab.map(v => cleanVocabText(v.term)).filter(Boolean);
  const allDefs  = validVocab.map(v => cleanVocabText(v.definition)).filter(Boolean);

  validVocab.forEach((v, idx) => {
    const term = cleanVocabText(v.term);
    const def  = cleanVocabText(v.definition);
    if (!term || !def || def.length < 8) return;
    // Re-assign cleaned versions
    const vClean = { term, definition: def };
    // Use vClean below
    Object.assign(v, vClean);
    const seed = strHash(`${citation}|${idx}`);

    // Q1: term → definition (MC)
    const defDistractors = pickDistractors(def, allDefs, 3, GENERIC_WRONG);
    questions.push({
      type: 'multiple-choice',
      question: `Trong bài, từ "${term}" có nghĩa là gì?`,
      options: shuffle([def, ...defDistractors], seed),
      answer: def,
      explanation: `"${term}" có nghĩa là: ${def}. (Nguồn: ${citation})`,
    });

    // Q2: definition → term (fill-blank), only if definition is reasonable length
    if (def.length >= 10 && def.length <= 80) {
      questions.push({
        type: 'fill-blank',
        question: `Điền từ vào chỗ trống: "${def.length > 40 ? def.slice(0, 35) + '...' : def}" — đây là nghĩa của từ nào?`,
        text: `Từ "[   ]" có nghĩa là: ${def}`,
        blanks: [{ answer: term, type: 'text' }],
        explanation: `Từ "${term}" có nghĩa là: ${def}. (Nguồn: ${citation})`,
      });
    }

    // Q3: matching context (MC if ≥ 3 vocab)
    if (validVocab.length >= 3 && idx < 6) {
      const termDistractors = pickDistractors(term, allTerms, 3, ['Từ khác', 'Không có từ này', 'Chưa học']);
      questions.push({
        type: 'multiple-choice',
        question: `Từ nào có nghĩa là "${def.length > 60 ? def.slice(0, 60) + '...' : def}"?`,
        options: shuffle([term, ...termDistractors], seed + 1),
        answer: term,
        explanation: `"${term}" mang nghĩa: ${def}. (Nguồn: ${citation})`,
      });
    }
  });

  return questions;
}

/**
 * From Q+A slide pairs: extract comprehension questions.
 * Looks for question slide followed by content/question slide with answer.
 */
function buildComprehensionQuestions(slides, citation) {
  const questions = [];

  for (let i = 0; i < slides.length - 1; i++) {
    const cur  = slides[i];
    const next = slides[i + 1];

    if (!cur.paragraphs?.length || !next?.paragraphs?.length) continue;

    // Find a question paragraph in current slide
    const qPara = cur.paragraphs.find(p =>
      p.length > 20 &&
      (p.endsWith('?') || /^Câu \d/.test(p) || /^Em hãy|^Hãy nêu|^Hãy kể/.test(p))
    );
    if (!qPara) continue;

    // Get answer candidates from next slide (skip slide headers/instructions)
    const answerCandidates = next.paragraphs.filter(p =>
      p.length > 5 &&
      !p.startsWith('Gợi ý') &&
      !p.startsWith('Câu hỏi') &&
      !p.startsWith('Nhiệm vụ') &&
      !p.startsWith('Thực hiện') &&
      !p.match(/^\d+\./)
    );
    if (!answerCandidates.length) continue;

    const mainAnswer = answerCandidates[0];
    if (mainAnswer.length < 5) continue;

    // Build distractor options from OTHER next-slides' answers
    const otherAnswers = [];
    for (let j = 0; j < slides.length; j++) {
      if (Math.abs(j - (i + 1)) < 2) continue;
      const s = slides[j];
      if (s.type === 'content' || s.type === 'questions') {
        const candidates = (s.paragraphs || []).filter(p =>
          p.length > 5 && p.length < 120 && !p.startsWith('Câu') && !p.startsWith('Hãy')
        );
        otherAnswers.push(...candidates.slice(0, 2));
      }
      if (otherAnswers.length >= 6) break;
    }

    const distractors = pickDistractors(mainAnswer, otherAnswers, 3, GENERIC_WRONG);
    const seed = strHash(`${citation}|comprehension|${i}`);

    // Clean up question text
    const cleanQ = qPara
      .replace(/^Câu \d+:\s*/, '')
      .replace(/^Em hãy\s*/i, 'Em hãy ')
      .trim();

    questions.push({
      type: 'multiple-choice',
      question: cleanQ.length > 160 ? cleanQ.slice(0, 157) + '...' : cleanQ,
      options: shuffle([mainAnswer, ...distractors], seed),
      answer: mainAnswer,
      explanation: `Đáp án: ${mainAnswer}. (Nguồn: ${citation})`,
    });
  }

  return questions;
}

/**
 * From key-fact patterns in content slides (Nhiệm vụ X + answer pattern).
 * Science-style: task description → answer conclusion.
 */
function buildKeyFactQuestions(slides, citation, title) {
  const questions = [];

  // Pattern: slide with Nhiệm vụ/task description + conclusion on SAME or next slide
  for (let i = 0; i < slides.length - 1; i++) {
    const cur  = slides[i];
    const next = slides[i + 1];

    const hasTask = (cur.paragraphs || []).some(p => /^Nhiệm vụ|^Tìm hiểu|^Thực hiện thí nghiệm/i.test(p));
    if (!hasTask) continue;

    // Look for a short conclusion sentence (often last paragraph of next slide)
    const conclusions = (next?.paragraphs || []).filter(p =>
      p.length > 15 && p.length < 150 &&
      !p.startsWith('Nhiệm vụ') && !p.startsWith('Thực hiện') && !p.startsWith('Rót') &&
      !p.startsWith('Căng') && !p.startsWith('Cho') && !p.startsWith('Quan sát')
    );
    if (!conclusions.length) continue;

    const fact = conclusions[conclusions.length - 1]; // last = usually the conclusion
    if (fact.length < 15) continue;

    // What does the fact tell us? build a "which is correct?" question
    const distractors = buildWrongScienceFacts(fact, title);
    const seed = strHash(`${citation}|fact|${i}`);

    questions.push({
      type: 'multiple-choice',
      question: `Trong thí nghiệm về "${title.slice(0, 50)}", điều nào SAU ĐÂY là đúng?`,
      options: shuffle([fact, ...distractors], seed),
      answer: fact,
      explanation: `${fact}. (Nguồn: ${citation}, slide ${next.slideNo})`,
    });
  }

  // Also look for single-slide summaries/conclusions
  for (const slide of slides) {
    if (slide.type !== 'theory' && slide.type !== 'reflection') continue;
    const facts = (slide.paragraphs || []).filter(p =>
      p.length > 20 && p.length < 200 &&
      !p.startsWith('Ghi nhớ') && !p.startsWith('Kết luận')
    );
    for (const fact of facts.slice(0, 3)) {
      const seed = strHash(`${citation}|theory|${fact.slice(0, 20)}`);
      const distractors = buildWrongScienceFacts(fact, title);
      questions.push({
        type: 'multiple-choice',
        question: `Em hãy chọn phát biểu ĐÚNG về "${title.slice(0, 40)}":`,
        options: shuffle([fact, ...distractors], seed),
        answer: fact,
        explanation: `Đúng: ${fact}. (Nguồn: ${citation})`,
      });
    }
  }

  return questions;
}

function buildWrongScienceFacts(fact, title) {
  // Generic wrong science answers that sound plausible
  const wrongs = [
    'Điều này không đúng với thí nghiệm trên',
    'Ngược lại với kết quả quan sát được',
    'Chưa được kiểm chứng trong bài học này',
    'Đây là nhận xét về hiện tượng khác',
    'Chỉ đúng với điều kiện đặc biệt',
  ];
  return pickDistractors(fact, wrongs, 3, ['Không đúng', 'Chưa chính xác', 'Cần kiểm tra lại']);
}

/**
 * From dao-duc / life / ethics slide pairs: person → role / contribution
 */
function buildRoleMatchQuestions(slides, citation, title) {
  const questions = [];
  const rolePairs = []; // {person, contribution}

  for (let i = 0; i < slides.length - 1; i++) {
    const cur  = slides[i];
    const next = slides[i + 1];
    if (cur.type !== 'content' || !cur.paragraphs?.length) continue;

    // Pattern: next slide has 2 paragraphs: contribution (line 0) + person/role (line 1)
    if (next.paragraphs?.length === 2 && next.paragraphs[0].length > 5) {
      const contribution = next.paragraphs[0];
      const person = next.paragraphs[1];
      if (person && contribution && person.length < 40 && contribution.length > 5) {
        rolePairs.push({ person, contribution });
      }
    }
  }

  if (rolePairs.length >= 2) {
    const allContributions = rolePairs.map(p => p.contribution);
    rolePairs.slice(0, 6).forEach((pair, idx) => {
      const seed = strHash(`${citation}|role|${idx}`);
      const distractors = pickDistractors(pair.contribution, allContributions, 3, GENERIC_WRONG);
      questions.push({
        type: 'multiple-choice',
        question: `Trong bài "${title.slice(0, 50)}", ${pair.person} có đóng góp quan trọng nào?`,
        options: shuffle([pair.contribution, ...distractors], seed),
        answer: pair.contribution,
        explanation: `${pair.person}: ${pair.contribution}. (Nguồn: ${citation})`,
      });
    });
  }

  return questions;
}

/**
 * From any slides: extract "Em hãy..." task-style questions + turn into MC
 */
function buildTaskQuestions(slides, citation, subjectCode) {
  const questions = [];
  // For subjects where we build scenario-style questions
  if (!['ethics', 'life', 'pe', 'music', 'art'].includes(subjectCode)) return questions;

  const taskSlides = slides.filter(s =>
    s.type === 'activity' || s.type === 'questions'
  );

  for (const slide of taskSlides.slice(0, 4)) {
    const taskPara = (slide.paragraphs || []).find(p =>
      p.length > 15 && (
        /^(Em hãy|Hãy|Theo em|Tại sao)/i.test(p) ||
        (p.includes('nên') && p.endsWith('?'))
      )
    );
    if (!taskPara) continue;

    // Find answer in next content slide
    const slideIdx = slides.indexOf(slide);
    const nextSlide = slides[slideIdx + 1];
    if (!nextSlide?.paragraphs?.length) continue;

    const answers = nextSlide.paragraphs.filter(p =>
      p.length > 8 && !p.startsWith('Gợi ý') && !p.startsWith('Nhiệm vụ')
    );
    if (!answers.length) continue;

    const correct = answers[0];
    const distractors = pickDistractors(
      correct,
      answers.slice(1),
      3,
      ['Không phù hợp với bài học', 'Chưa đúng tinh thần bài', 'Ngược với điều bài dạy']
    );
    const seed = strHash(`${citation}|task|${taskPara.slice(0, 20)}`);

    questions.push({
      type: 'multiple-choice',
      question: taskPara.length > 150 ? taskPara.slice(0, 147) + '...' : taskPara,
      options: shuffle([correct, ...distractors], seed),
      answer: correct,
      explanation: `${correct}. (Nguồn: ${citation})`,
    });
  }
  return questions;
}

// ─── Per-file processor ──────────────────────────────────────────────────────

function processFile(jsonPath, subjectCode, subjectFolder) {
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const filename = path.basename(jsonPath);
  const stem     = filename.replace(/\.json$/, '');

  const title = (raw.extracted?.title || stem)
    .replace(/_/g, ' ')
    .replace(/\.pptx/i, '')
    .replace(/Tuan \d+ - /i, '')
    .trim();

  const topicKey  = topicKeyFromFile(subjectCode, filename);
  const citation  = shortCitation(subjectCode, title, null);
  const slides    = raw.slides || [];
  const vocab     = raw.extracted?.vocab || [];

  const allQuestions = [];

  // 1. Vocabulary questions
  if (vocab.length > 0) {
    allQuestions.push(...buildVocabQuestions(vocab, citation, subjectCode));
  }

  // 2. Comprehension Q+A pairs (skip vie — slide structure too noisy for reliable Q+A)
  if (subjectCode !== 'vie') {
    allQuestions.push(...buildComprehensionQuestions(slides, citation));
  }

  // 3. Key-fact / experiment questions (sci, histgeo, it, tech)
  if (['sci', 'histgeo', 'it', 'tech'].includes(subjectCode)) {
    allQuestions.push(...buildKeyFactQuestions(slides, citation, title));
  }

  // 4. Role-match questions (ethics, life)
  if (['ethics', 'life', 'histgeo'].includes(subjectCode)) {
    allQuestions.push(...buildRoleMatchQuestions(slides, citation, title));
  }

  // 5. Task / scenario questions
  allQuestions.push(...buildTaskQuestions(slides, citation, subjectCode));

  // 6. Extracted questions from extractor
  const extractedQ = (raw.extracted?.questions || []).filter(q =>
    q.text && q.text.length > 15 && q.text.endsWith('?')
  );
  for (const eq of extractedQ.slice(0, 6)) {
    // Turn open questions into prompts for reflection-style MC
    const prompt = eq.text;
    // Only add if we don't already have too many questions
    if (allQuestions.length >= 20) break;
    // Build a "which is closest to what this question asks?" style
    // (skip — these are open-ended, not directly answerable as MC)
  }

  // Quality filter + deduplication
  const GARBAGE_EXACT = new Set([
    'nối đúng', 'đúng', 'sai', 'ok', 'go', 'go home', 'next', 'back', 'continue',
    'ví dụ', 'gợi ý', 'kết luận', 'nhận xét', 'hướng dẫn', 'thảo luận', 'luyện tập',
    'ôn tập', 'tổng kết', 'thí nghiệm', 'tiếp theo', 'trả lời', 'câu hỏi', 'đáp án',
    'hoạt động', 'nhiệm vụ', 'thực hiện', 'cách tiến hành', 'làm việc nhóm',
  ]);
  const GARBAGE_STARTS = [
    'tính chất', 'nhiệm vụ', 'thực hiện thí nghiệm', 'gợi ý trả lời',
    'hoạt động nhóm', 'làm việc nhóm',
  ];

  function isGarbage(text) {
    if (!text || text.length < 5) return true;
    const t = text.trim();
    const lower = t.toLowerCase().normalize('NFC').replace(/[:.!,]/g, '').trim();
    if (GARBAGE_EXACT.has(lower)) return true;
    if (GARBAGE_STARTS.some(s => lower.startsWith(s))) return true;
    // Answer that is itself a labeled question ("Câu 1:", "Câu 2:")
    if (/^Câu \d/.test(t)) return true;
    // Answer that ends with "?" (it's another question, not an answer)
    if (t.endsWith('?')) return true;
    // All-caps check (works for Vietnamese with normalize)
    if (t.length >= 4 && t === t.toUpperCase() && /\p{L}/u.test(t)) return true;
    // Number only
    if (/^\d+\.?\s*$/.test(t)) return true;
    return false;
  }

  function isValidQuestion(q) {
    if (!q || !q.type) return false;
    if (!q.question || q.question.length < 15) return false;
    // Question text that looks like an instruction without answer context
    if (/^(Em hãy đọc|Hãy quan sát|Các em hãy|Hãy đọc)/i.test(q.question) && !q.question.includes('?')) return false;
    if (q.type === 'fill-blank') {
      const blanks = Array.isArray(q.blanks) ? q.blanks : [];
      const validBlanks = blanks.filter(b => {
        const a = String(b?.answer || '').trim();
        return a.length > 2 && !isGarbage(a);
      });
      return validBlanks.length > 0;
    }
    if (q.type === 'multiple-choice') {
      if (!q.answer || q.answer.length < 4) return false;
      if (isGarbage(q.answer)) return false;
      // Answer should not itself be a question
      if (q.answer.trim().endsWith('?')) return false;
      // Must have at least 2 non-garbage options
      const goodOpts = (q.options || []).filter(o => o && !isGarbage(o));
      if (goodOpts.length < 2) return false;
      return true;
    }
    return true;
  }

  const seen = new Set();
  const unique = allQuestions.filter(q => {
    if (!isValidQuestion(q)) return false;
    const k = (q.question || '').slice(0, 80);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Build lesson blocks from key points
  const keyPoints = raw.extracted?.keyPoints || [];
  const lessonBlocks = [];
  if (keyPoints.length > 0) {
    lessonBlocks.push({
      type: 'micro',
      teacherName: 'Gâu tiên sinh',
      title: title.slice(0, 60),
      points: keyPoints.slice(0, 5).map(p => p.length > 120 ? p.slice(0, 117) + '...' : p),
      example: vocab.length > 0 ? `Từ quan trọng: ${vocab.slice(0, 3).map(v => `"${v.term}" — ${v.definition.slice(0, 40)}`).join('; ')}` : undefined,
    });
  }

  return {
    topicKey,
    subject: subjectCode,
    title,
    lessonBlocks,
    questionPool: unique,
    _filename: stem,
    _questionCount: unique.length,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const topicsBySubject = {};
  let totalFiles = 0;
  let totalQuestions = 0;

  for (const [folder, subjectCode] of Object.entries(SUBJECT_MAP)) {
    const dir = path.join(PPTX_ROOT, folder);
    if (!fs.existsSync(dir)) {
      console.log(`  skip ${folder}: no pptx-content dir`);
      continue;
    }

    const jsonFiles = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
    if (!topicsBySubject[subjectCode]) topicsBySubject[subjectCode] = [];

    let subjQ = 0;
    for (const jsonFile of jsonFiles) {
      const topic = processFile(path.join(dir, jsonFile), subjectCode, folder);
      topicsBySubject[subjectCode].push(topic);
      subjQ += topic._questionCount;
      totalFiles++;
      totalQuestions += topic._questionCount;
    }

    console.log(`  ${subjectCode.padEnd(8)} ${jsonFiles.length.toString().padStart(3)} files → ${subjQ} questions`);
  }

  // Build aggregated mega-topic per subject (all questions in one pool)
  // These are the "depth" topics that serve 20+ Q per module session
  const aggregatedTopics = {};
  for (const [subjectCode, topics] of Object.entries(topicsBySubject)) {
    const allQ = [];
    const allPoints = [];
    const seen = new Set();
    for (const topic of topics) {
      for (const q of (topic.questionPool || [])) {
        const key = (q.question || '').slice(0, 60);
        if (seen.has(key)) continue;
        seen.add(key);
        allQ.push(q);
      }
      for (const block of (topic.lessonBlocks || [])) {
        if (block.points) allPoints.push(...block.points.slice(0, 2));
      }
    }
    if (allQ.length >= 20) {
      const subjectNames = { vie:'Tiếng Việt', sci:'Khoa học', histgeo:'Lịch sử & Địa lí', ethics:'Đạo đức', art:'Mĩ thuật', tech:'Công nghệ', life:'HĐTN', it:'Tin học' };
      const sName = subjectNames[subjectCode] || subjectCode;
      aggregatedTopics[subjectCode] = {
        topicKey: `${subjectCode}:pptx:aggregated`,
        subject: subjectCode,
        title: `${sName}: Ôn tổng hợp (KNTT Lớp 4)`,
        defaultCount: 20,
        lessonBlocks: allPoints.length >= 3 ? [{
          type: 'micro',
          teacherName: 'Gâu tiên sinh',
          title: `Ôn kiến thức ${sName} theo SGK KNTT`,
          points: allPoints.slice(0, 5),
        }] : [],
        questionPool: allQ,
      };
    }
  }

  // Emit JS module
  const lines = [
    '/**',
    ' * KNTT Hoc10 PPTX Question Pools',
    ` * Auto-generated by scripts/build_pptx_questions.mjs`,
    ` * Generated: ${new Date().toISOString()}`,
    ` * Total topics: ${totalFiles} | Total questions: ${totalQuestions}`,
    ` * Aggregated mega-topics: ${Object.keys(aggregatedTopics).length}`,
    ' *',
    ' * DO NOT EDIT MANUALLY — regenerate with: node scripts/build_pptx_questions.mjs',
    ' */',
    '',
    '// Indexed by subjectCode → array of topic objects',
    'export const PPTX_QUESTION_TOPICS = {',
  ];

  for (const [subjectCode, topics] of Object.entries(topicsBySubject)) {
    lines.push(`  // ── ${subjectCode} (${topics.length} topics) ──`);
    lines.push(`  ${JSON.stringify(subjectCode)}: [`);
    // Put aggregated topic FIRST so scheduler finds it early
    if (aggregatedTopics[subjectCode]) {
      const { } = aggregatedTopics[subjectCode]; // no cleanup needed
      lines.push(`    ${JSON.stringify(aggregatedTopics[subjectCode])},`);
    }
    for (const topic of topics) {
      const { _filename, _questionCount, ...clean } = topic;
      lines.push(`    ${JSON.stringify(clean)},`);
    }
    lines.push(`  ],`);
    lines.push('');
  }

  lines.push('};');
  lines.push('');
  lines.push('/**');
  lines.push(' * Get all PPTX topics for a given subject code.');
  lines.push(' */');
  lines.push('export function getPptxTopicsForSubject(subjectCode) {');
  lines.push('  return PPTX_QUESTION_TOPICS[subjectCode] || [];');
  lines.push('}');
  lines.push('');

  fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf-8');

  console.log(`\n── Summary ──────────────────────────────────────────`);
  console.log(`  Files processed  : ${totalFiles}`);
  console.log(`  Questions total  : ${totalQuestions}`);
  console.log(`  Output           : ${OUT_FILE}`);
  console.log(`─────────────────────────────────────────────────────`);
}

main();
