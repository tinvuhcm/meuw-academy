import State from '../state.js';
import { normalizeText } from '../utils.js';
import { getAcademicPhase, getStudyDateForDay } from '../schedule-calendar.js';
import { CURATED_ENGLISH_TOPICS } from './english-topics.js';
import {
  ALL_SUBJECT_CODES,
  CORE_SUBJECT_CODES,
  getDailyEnrichmentSubjects,
  OFFICIAL_GRADE4_KNOWLEDGE_MAP,
  OTHER_SUBJECT_CODES,
  getSubjectEstimatedMinutes,
  LONG_RANGE_STUDY_POLICY,
} from './official-knowledge-map.js';
import { buildKnttCatalogTopics } from './kntt-topics.js';
import { getPptxTopicsForSubject } from './kntt-pptx-questions.js';
import { ALL_SCI_ENCYCLOPEDIA_TOPICS } from './science-encyclopedia.js';
import { ALL_SCIENCE_WORLD_TOPICS } from './science-world.js';
import { ALL_VIETNAM_TOPICS } from './vietnam-topics.js';
import {
  SUPPLEMENTAL_IT_TOPICS,
  SUPPLEMENTAL_OTHER_TOPICS,
  SUPPLEMENTAL_SCIENCE_TOPICS,
  SUPPLEMENTAL_VIETNAMESE_TOPICS,
} from './supplemental-topics.js';

// ─── Learning time targets ───────────────────────────────────────────────────
// Core subjects (math+vie+eng+sci) must fill >70% of each day.
// Removed: ethics (đạo đức), pe (thể chất), life (HĐTN)
const TARGET_QUESTION_COUNT = {
  math: 20,
  eng: 18,
  vie: 20,
  sci: 20,  // boosted — includes encyclopedic science content
  it: 14,
  histgeo: 14,
  music: 10,
  art: 10,
  tech: 12,
  draw: 1,
};

// Daily caps per subject. Loose upper limits — patterns drive actual distribution.
// Core budget: math:8 + vie:7 + eng:5 + sci:6 = 26 possible core slots per day
// Secondary budget: it:3 + histgeo:3 + music:2 + art:2 + tech:2 = 12
// Pattern ensures core ≥ 70% of 24 actual slots served.
const SUBJECT_DAILY_CAPS = {
  math: 8,
  eng: 5,
  vie: 7,
  sci: 6,
  it: 3,
  histgeo: 3,
  music: 2,
  art: 2,
  tech: 2,
  draw: 1,
};

const MATH_TOPICS = [
  { topicKey: 'math:add-thousands', title: 'Toán: Phép cộng hàng ngàn', op: '+' },
  { topicKey: 'math:sub-thousands', title: 'Toán: Phép trừ hàng ngàn', op: '-' },
  { topicKey: 'math:times-table', title: 'Toán: Bảng nhân 2-9', op: '*' },
  { topicKey: 'math:division-basic', title: 'Toán: Phép chia cơ bản', op: '/' },
  { topicKey: 'math:fractions-basic', title: 'Toán: Phân số cơ bản', op: 'frac' },
  { topicKey: 'math:geometry-perimeter-area', title: 'Toán: Hình học (Chu vi, Diện tích)', op: 'geo' },
  { topicKey: 'math:place-value', title: 'Toán: Giá trị chữ số và hàng lớp', op: 'place-value' },
  { topicKey: 'math:rounding', title: 'Toán: Làm tròn số', op: 'rounding' },
  { topicKey: 'math:expression-order', title: 'Toán: Biểu thức số', op: 'expression' },
  { topicKey: 'math:average-basic', title: 'Toán: Trung bình cộng', op: 'average' },
  { topicKey: 'math:measurement', title: 'Toán: Đơn vị đo và đổi đơn vị', op: 'measurement' },
  { topicKey: 'math:data-chart', title: 'Toán: Bảng số liệu và biểu đồ', op: 'data-chart' },
  { topicKey: 'math:word-problem', title: 'Toán: Bài toán có lời văn', op: 'word-problem' },
  { topicKey: 'math:mental-math', title: 'Toán: Tính nhẩm nhanh', op: 'quick' },
  { topicKey: 'math:even-odd', title: 'Toán: Số chẵn và số lẻ', op: 'parity' },
  { topicKey: 'math:compare-numbers', title: 'Toán: So sánh số', op: 'compare' },
  { topicKey: 'math:missing-number', title: 'Toán: Tìm số còn thiếu', op: 'missing' },
  { topicKey: 'math:double-half', title: 'Toán: Gấp lên và giảm đi', op: 'double-half' },
  { topicKey: 'math:money', title: 'Toán: Tiền Việt Nam', op: 'money' },
  { topicKey: 'math:clock', title: 'Toán: Đọc giờ đồng hồ', op: 'clock' },
];

let CATALOG_CACHE = null;

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function trimLabel(text, max = 48) {
  const clean = stripHtml(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/**
 * Short hint from a text — no "…" truncation.
 * Takes whole words up to `max` chars, stops cleanly at word boundary.
 */
function shortHint(text, max = 22) {
  const t = stripHtml(text || '').replace(/["""''„«»]/g, '').replace(/\s+/g, ' ').trim();
  if (!t || t.length <= max) return t;
  const words = t.split(' ');
  let out = '';
  for (const w of words) {
    const next = out ? `${out} ${w}` : w;
    if (next.length > max) break;
    out = next;
  }
  return out || words[0].slice(0, max);
}

/**
 * Compact base title — strip verbose book labels, keep subject: prefix.
 * The colon prefix is important: formatModuleDisplayTitle strips everything before ":".
 */
function compactBase(title) {
  return stripHtml(title || '')
    .replace(/\(KNTT Lớp \d+\)/gi, '')
    .replace(/TIẾNG VIỆT \d+\s*(Tập \d+)?/gi, 'TV')
    .replace(/Khoa học \d+/gi, 'KH')
    .replace(/Tin học \d+\s*(Chủ đề)?/gi, 'TH')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Ôn tập (review) scheduling ──────────────────────────────────────────────
// PROGRAM_START_DATE = 2026-06-03 = Day 1
// HK1 end region ≈ days 210-243 (Dec 2026 – Jan 2027)
// HK2 end region ≈ days 320-354 (Apr – May 2027)
// Review topics must NOT appear in summer or early/mid term.

function isReviewTopic(item) {
  const t = normalizeText(item.title || item.topicKey || '');
  return /on tap|luyen tap chung|on lai|tong hop|on cuoi|em vui hoc/.test(t);
}

function isReviewAllowedOnDay(dayNumber) {
  return (dayNumber >= 210 && dayNumber <= 243) || dayNumber >= 318;
}

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createRng(seedInput) {
  let seed = stableHash(seedInput) || 123456789;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function seededShuffle(list, seedInput) {
  const arr = [...list];
  const rand = createRng(seedInput);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function moduleKey(subject, title) {
  return `${subject}:${normalizeText(title)}`;
}

function questionSignature(question) {
  const blankAnswers = Array.isArray(question?.blanks)
    ? question.blanks.map(blank => blank?.answer || '').join('|')
    : '';
  return normalizeText([
    question.type || '',
    question.question || '',
    question.answer || question.ans || blankAnswers,
  ].join('|'));
}

function explanationSignature(question) {
  return normalizeText(stripHtml(question.explanation || ''));
}

function ensureAnswerField(question) {
  const copy = clone(question);
  if (copy.answer === undefined && copy.ans !== undefined) {
    copy.answer = copy.ans;
  }
  return copy;
}

function buildFactQuestionPool(topic) {
  const base = topic.facts.map(fact => ({
    type: 'multiple-choice',
    question: fact.q,
    options: [...fact.options],
    answer: fact.ans,
    explanation: fact.explanation,
  }));
  return base;
}

function buildSourceCatalog(allData) {
  const bySubject = Object.fromEntries([...ALL_SUBJECT_CODES, 'draw'].map(subject => [subject, {}]));

  Object.values(allData).forEach(day => {
    (day.modules || []).forEach(module => {
      const key = moduleKey(module.subject, module.title);
      const bucket = bySubject[module.subject] || (bySubject[module.subject] = {});
      if (!bucket[key]) {
        bucket[key] = {
          topicKey: key,
          subject: module.subject,
          title: module.title,
          questionPool: [],
          lessonBlocks: clone(module.lessonBlocks || []),
        };
      }

      (module.questions || []).forEach(question => {
        const normalized = questionSignature(question);
        if (!normalized) return;
        if (!bucket[key]._questionSeen) bucket[key]._questionSeen = new Set();
        if (bucket[key]._questionSeen.has(normalized)) return;
        bucket[key]._questionSeen.add(normalized);
        bucket[key].questionPool.push(ensureAnswerField(question));
      });
    });
  });

  const finalizeBucket = subjectBucket => Object.values(subjectBucket).map(entry => {
    delete entry._questionSeen;
    return entry;
  });

  return {
    math: MATH_TOPICS.map(topic => ({
      ...topic,
      subject: 'math',
      lessonBlocks: [],
      generator: generateMathQuestions,
    })),
    eng:     finalizeBucket(bySubject.eng),
    vie:     finalizeBucket(bySubject.vie),
    sci:     finalizeBucket(bySubject.sci),
    it:      finalizeBucket(bySubject.it),
    histgeo: finalizeBucket(bySubject.histgeo),
    music:   finalizeBucket(bySubject.music),
    art:     finalizeBucket(bySubject.art),
    tech:    finalizeBucket(bySubject.tech),
    draw:    finalizeBucket(bySubject.draw),
    // Removed subjects kept as empty arrays so mergeSupplemental doesn't crash
    // on supplemental topics that still reference them.
    // The scheduler never picks these (not in SUBJECT_DAILY_CAPS or patterns).
    ethics:  [],
    life:    [],
    pe:      [],
  };
}

function mergeSupplemental(catalog, topic) {
  const resolvedSourceLane = topic.sourceLane || (topic.subject === 'sci' ? (topic.knttSource ? 'sgk' : 'extended') : undefined);
  const key = moduleKey(topic.subject, topic.title);
  const existing = catalog[topic.subject].find(item => moduleKey(item.subject, item.title) === key);
  const extraPool = topic.facts ? buildFactQuestionPool(topic) : clone(topic.questionPool || []);

  if (existing) {
    if (topic.replacePool) {
      existing.questionPool = extraPool.map(ensureAnswerField);
    } else {
      if (!Array.isArray(existing.questionPool)) {
        existing.questionPool = [];
      }
      const seen = new Set(existing.questionPool.map(questionSignature));
      extraPool.forEach(question => {
        const signature = questionSignature(question);
        if (signature && !seen.has(signature)) {
          seen.add(signature);
          existing.questionPool.push(ensureAnswerField(question));
        }
      });
    }
    if (!existing.lessonBlocks?.length && topic.lessonBlocks?.length) {
      existing.lessonBlocks = clone(topic.lessonBlocks);
    }
    if (!existing.topicKey || existing.topicKey === key) {
      existing.topicKey = topic.topicKey;
    }
    if (!existing.generator && topic.generator) {
      existing.generator = topic.generator;
    }
    if (!existing.knttSource && topic.knttSource) {
      existing.knttSource = clone(topic.knttSource);
    }
    if (!existing.sourceLane && resolvedSourceLane) {
      existing.sourceLane = resolvedSourceLane;
    }
    if (existing.sequenceIndex === undefined && topic.sequenceIndex !== undefined) {
      existing.sequenceIndex = topic.sequenceIndex;
    }
    if (topic.defaultCount) existing.defaultCount = topic.defaultCount;
    return;
  }

  catalog[topic.subject].push({
    topicKey: topic.topicKey,
    subject: topic.subject,
    title: topic.title,
    lessonBlocks: clone(topic.lessonBlocks || []),
    questionPool: extraPool.map(ensureAnswerField),
    defaultCount: topic.defaultCount,
    generator: topic.generator,
    knttSource: topic.knttSource ? clone(topic.knttSource) : undefined,
    sourceLane: resolvedSourceLane,
    sequenceIndex: topic.sequenceIndex,
  });
}

function conceptBenefit(subjectKey) {
  const map = {
    math: 'giúp em tính chắc hơn và giải bài toán nhiều bước tốt hơn',
    vie: 'giúp em đọc hiểu sâu hơn và viết rõ ý hơn',
    eng: 'giúp em nghe, nói, đọc và dùng mẫu câu tự tin hơn',
    it: 'giúp em dùng thiết bị số an toàn và có tổ chức hơn',
    sci: 'giúp em hiểu thế giới tự nhiên quanh mình rõ hơn',
    histgeo: 'giúp em hiểu quê hương, bản đồ và con người Việt Nam',
    music: 'giúp em cảm nhịp, nghe tốt hơn và yêu âm nhạc',
    art: 'giúp em quan sát đẹp hơn và diễn đạt ý tưởng bằng hình ảnh',
    ethics: 'giúp em ứng xử tử tế và có trách nhiệm hơn',
    tech: 'giúp em làm sản phẩm theo bước và dùng dụng cụ an toàn',
    life: 'giúp em tự phục vụ, giao tiếp và hợp tác tốt hơn',
    pe: 'giúp em khỏe mạnh, vận động đúng và an toàn hơn',
  };
  return map[subjectKey] || 'giúp em học tốt hơn mỗi ngày';
}

function createConceptPrompt(subjectKey, concept) {
  const map = {
    math: `Bài luyện nào gần nhất với kiến thức "${concept}"?`,
    vie: `Khi học "${concept}", em thường luyện điều gì?`,
    eng: `Hoạt động nào phù hợp để luyện "${concept}" trong English?`,
    it: `Khi học "${concept}" trong Tin học, điều gì là quan trọng?`,
    sci: `Tình huống nào giúp em hiểu rõ "${concept}" trong Khoa học?`,
    histgeo: `Ví dụ nào gần nhất với việc học "${concept}"?`,
    music: `Hoạt động nào phù hợp khi luyện "${concept}"?`,
    art: `Khi thực hành "${concept}", em nên chú ý điều gì?`,
    ethics: `Tình huống nào giúp em rèn "${concept}"?`,
    tech: `Khi làm việc với "${concept}", điều gì là quan trọng?`,
    life: `Việc nào giúp em rèn "${concept}" mỗi ngày?`,
    pe: `Khi luyện "${concept}", em cần nhớ điều gì?`,
  };
  return map[subjectKey] || `Điều nào phù hợp nhất với "${concept}"?`;
}

function createConceptCorrectOption(subjectKey, concept) {
  const map = {
    math: `Làm bài và quan sát quy tắc của ${concept}`,
    vie: `Đọc, nói hoặc viết để hiểu ${concept}`,
    eng: `Nghe, nói hoặc dùng mẫu câu gắn với ${concept}`,
    it: `Thực hành trên thiết bị để hiểu ${concept}`,
    sci: `Quan sát hiện tượng và giải thích ${concept}`,
    histgeo: `Quan sát, nhận biết và nói đúng về ${concept}`,
    music: `Nghe, vỗ tay hoặc hát để cảm nhận ${concept}`,
    art: `Quan sát rồi thể hiện ${concept} bằng hình và màu`,
    ethics: `Thực hành ${concept} trong cách cư xử hằng ngày`,
    tech: `Làm theo từng bước để hiểu ${concept}`,
    life: `Biến ${concept} thành thói quen hằng ngày`,
    pe: `Vận động đúng cách để rèn ${concept}`,
  };
  return map[subjectKey] || `Hiểu và thực hành ${concept}`;
}

function buildKnowledgeMapConceptTopics() {
  return [];
}

function buildCatalog(allData) {
  if (CATALOG_CACHE) return CATALOG_CACHE;
  const catalog = buildSourceCatalog(allData);
  catalog.eng = [];
  SUPPLEMENTAL_SCIENCE_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  SUPPLEMENTAL_VIETNAMESE_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  SUPPLEMENTAL_IT_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  SUPPLEMENTAL_OTHER_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  // Disabled for runtime: concept-only topics were generating meta, low-value
  // questions like "X thuộc môn nào?" instead of real lesson content.
  CURATED_ENGLISH_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));

  // KNTT lesson pool — KNTT lesson structure with source citations
  buildKnttCatalogTopics().forEach(topic => {
    if (!topic.sourceLane) {
      topic.sourceLane = topic.subject === 'sci' ? 'sgk' : 'sgk';
    }
    if (topic.subject === 'math' && topic.op) {
      topic.generator = generateMathQuestions;
    }
    // Note: generateKnttLessonQuestions is intentionally NOT used as fallback.
    // It produces meta study-habit questions with zero educational value.
    // Subjects without a specific generator rely on their questionPool
    // (filled by PPTX/supplemental) or are simply not selected.
    mergeSupplemental(catalog, topic);
  });

  // Science encyclopedia — inventors, space, great inventions
  ALL_SCI_ENCYCLOPEDIA_TOPICS.forEach(topic => mergeSupplemental(catalog, { ...topic, sourceLane: 'extended' }));
  // Science world — nature, body, animals, evolution, earth, ocean, forest
  ALL_SCIENCE_WORLD_TOPICS.forEach(topic => mergeSupplemental(catalog, { ...topic, sourceLane: 'extended' }));

  // Vietnam topics — Lịch sử & Địa lí Việt Nam (handwritten, source-verified)
  ALL_VIETNAM_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));

  // PPTX slide-derived question pools are unreliable for direct runtime QA,
  // especially for SGK reading/language content where extracted answers often
  // become nonsensical. Keep only the science lane unchanged for now.
  const PPTX_SUBJECTS = ['sci'];
  for (const subjectCode of PPTX_SUBJECTS) {
    const topics = getPptxTopicsForSubject(subjectCode);
    for (const topic of topics) {
      mergeSupplemental(catalog, topic);
    }
  }

  // ── Post-process: number topics with same base display name ────────────────
  // When multiple topics share the same normalized short name (e.g. two PPTX
  // files from the same lesson split into Tiết 1/2), append (1), (2)... so the
  // child sees distinct labels in the UI instead of repeating names.
  for (const subjectTopics of Object.values(catalog)) {
    if (!Array.isArray(subjectTopics)) continue;
    const countByBase = {};
    const indexByBase = {};
    // Use full normalized title as base — only number truly duplicate names
    for (const topic of subjectTopics) {
      const base = normalizeText(compactBase(topic.title));
      countByBase[base] = (countByBase[base] || 0) + 1;
    }
    for (const topic of subjectTopics) {
      const base = normalizeText(compactBase(topic.title));
      if (countByBase[base] > 1) {
        indexByBase[base] = (indexByBase[base] || 0) + 1;
        // Only number 2nd+ occurrences (keep first one unnumbered)
        if (indexByBase[base] > 1 && !/\(\d+\)$/.test(topic.title)) {
          topic.title = `${topic.title} (${indexByBase[base]})`;
        }
      }
    }
  }

  CATALOG_CACHE = catalog;
  return CATALOG_CACHE;
}

function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function generateMathQuestions(topic, count, seedInput) {
  const rng = createRng(seedInput);
  const questions = [];

  for (let i = 0; i < count; i++) {
    let question = null;

    if (topic.op === '+') {
      const a = randInt(rng, 1000, 9000);
      const b = randInt(rng, 100, 9000);
      const ans = a + b;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Tính tổng: ${a} + ${b}`,
        options: seededShuffle([`${ans}`, `${ans + randInt(rng, 3, 21)}`, `${ans - randInt(rng, 3, 21)}`, `${ans + 100}`], `${seedInput}|${i}|plus`),
        answer: `${ans}`,
        explanation: `Cộng theo từng hàng rồi ghép lại: ${a} + ${b} = ${ans}.`,
      };
    } else if (topic.op === '-') {
      const a = randInt(rng, 2000, 9999);
      const b = randInt(rng, 100, a - 1);
      const ans = a - b;
      question = {
        type: 'fill-blank',
        isMath: true,
        question: `Tính hiệu: ${a} - ${b}`,
        text: `${a} - ${b} = [   ]`,
        blanks: [{ answer: `${ans}`, type: 'number' }],
        explanation: `Trừ theo từng hàng cẩn thận: ${a} - ${b} = ${ans}.`,
      };
    } else if (topic.op === '*') {
      const a = randInt(rng, 2, 9);
      const b = randInt(rng, 3, 12);
      const ans = a * b;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Kết quả của ${a} × ${b} là?`,
        options: seededShuffle([`${ans}`, `${ans + a}`, `${ans - a}`, `${ans + b}`], `${seedInput}|${i}|times`),
        answer: `${ans}`,
        explanation: `${a} × ${b} nghĩa là cộng ${a} thành ${b} nhóm bằng nhau, kết quả là ${ans}.`,
      };
    } else if (topic.op === '/') {
      const b = randInt(rng, 2, 9);
      const ans = randInt(rng, 2, 12);
      const a = b * ans;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Kết quả của ${a} : ${b} là bao nhiêu?`,
        options: seededShuffle([`${ans}`, `${ans + 1}`, `${Math.max(ans - 1, 1)}`, `${ans + 2}`], `${seedInput}|${i}|divide`),
        answer: `${ans}`,
        explanation: `Vì ${b} × ${ans} = ${a} nên ${a} : ${b} = ${ans}.`,
      };
    } else if (topic.op === 'quick') {
      const tensA = randInt(rng, 2, 9) * 10;
      const tensB = randInt(rng, 2, 9) * 10;
      const isAdd = rng() > 0.5;
      const eq = isAdd ? `${tensA} + ${tensB}` : `${Math.max(tensA, tensB)} - ${Math.min(tensA, tensB)}`;
      const ans = isAdd ? tensA + tensB : Math.max(tensA, tensB) - Math.min(tensA, tensB);
      question = {
        type: 'fill-blank',
        isMath: true,
        question: `Tính nhẩm: ${eq}`,
        text: `${eq} = [   ]`,
        blanks: [{ answer: `${ans}`, type: 'number' }],
        explanation: `Tách theo chục cho dễ nhẩm rồi tính ra ${ans}.`,
      };
    } else if (topic.op === 'frac') {
      const templates = [
        { question: 'Phân số nào lớn hơn: 1/2 hay 1/4?', answer: '1/2', options: ['1/2', '1/4', 'Bằng nhau', 'Không so sánh được'], explanation: 'Cùng lấy 1 phần, mẫu số càng lớn thì phần đó càng nhỏ, nên 1/2 lớn hơn 1/4.' },
        { question: 'Một chiếc bánh chia đều thành 8 phần. Lấy 1 phần là phân số nào?', answer: '1/8', options: ['1/2', '1/4', '1/8', '8/1'], explanation: 'Lấy 1 trong 8 phần bằng nhau thì được phân số 1/8.' },
        { question: 'Phân số nào bé hơn: 1/3 hay 1/5?', answer: '1/5', options: ['1/3', '1/5', 'Bằng nhau', 'Không có đáp án'], explanation: 'Cùng lấy 1 phần, chia càng nhiều phần thì mỗi phần càng nhỏ, nên 1/5 bé hơn 1/3.' },
        { question: 'Điền đúng: 2 phần trong 6 phần bằng nhau viết là ...', answer: '2/6', options: ['2/6', '6/2', '1/3', '3/2'], explanation: 'Số trên là số phần lấy, số dưới là tổng số phần bằng nhau, nên viết là 2/6.' },
      ];
      question = ensureAnswerField(templates[i % templates.length]);
    } else if (topic.op === 'geo') {
      const side = randInt(rng, 3, 15);
      const mode = rng() > 0.5 ? 'perimeter' : 'area';
      if (mode === 'perimeter') {
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Tính chu vi hình vuông có cạnh ${side} cm.`,
          illustration: `<div class="w-32 h-32 bg-yellow-200 border-4 border-yellow-500 mx-auto flex items-center justify-center font-bold">${side}cm</div>`,
          options: seededShuffle([`${side * 4} cm`, `${side * side} cm²`, `${side * 2} cm`, `${side * 4 + 4} cm`], `${seedInput}|${i}|geo-p`),
          answer: `${side * 4} cm`,
          explanation: `Chu vi hình vuông = cạnh × 4 = ${side} × 4 = ${side * 4} cm.`,
        };
      } else {
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Tính diện tích hình vuông có cạnh ${side} cm.`,
          illustration: `<div class="w-32 h-32 bg-emerald-100 border-4 border-emerald-500 mx-auto flex items-center justify-center font-bold">${side}cm</div>`,
          options: seededShuffle([`${side * side} cm²`, `${side * 4} cm`, `${side * 2} cm²`, `${side * side + side} cm²`], `${seedInput}|${i}|geo-a`),
          answer: `${side * side} cm²`,
          explanation: `Diện tích hình vuông = cạnh × cạnh = ${side} × ${side} = ${side * side} cm².`,
        };
      }
    } else if (topic.op === 'place-value') {
      const digits = Array.from({ length: 6 }, () => randInt(rng, 0, 9));
      if (digits[0] === 0) digits[0] = randInt(rng, 1, 9);
      const number = Number(digits.join(''));
      const positions = [
        { label: 'hàng trăm nghìn', factor: 100000 },
        { label: 'hàng chục nghìn', factor: 10000 },
        { label: 'hàng nghìn', factor: 1000 },
        { label: 'hàng trăm', factor: 100 },
        { label: 'hàng chục', factor: 10 },
        { label: 'hàng đơn vị', factor: 1 },
      ];
      const picked = positions[randInt(rng, 0, positions.length - 1)];
      const digit = Math.floor(number / picked.factor) % 10;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Trong số ${number.toLocaleString('vi-VN')}, chữ số ở ${picked.label} là chữ số nào?`,
        options: seededShuffle([`${digit}`, `${(digit + 1) % 10}`, `${(digit + 3) % 10}`, `${(digit + 7) % 10}`], `${seedInput}|${i}|place-value`),
        answer: `${digit}`,
        explanation: `Tách số theo từng hàng. Ở ${picked.label} của số ${number.toLocaleString('vi-VN')} là chữ số ${digit}.`,
      };
    } else if (topic.op === 'rounding') {
      const number = randInt(rng, 1000, 999999);
      const mode = seededShuffle(['10', '100', '1000'], `${seedInput}|${i}|rounding-mode`)[0];
      let rounded = number;
      if (mode === '10') rounded = Math.round(number / 10) * 10;
      if (mode === '100') rounded = Math.round(number / 100) * 100;
      if (mode === '1000') rounded = Math.round(number / 1000) * 1000;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Làm tròn số ${number.toLocaleString('vi-VN')} đến hàng ${mode === '10' ? 'chục' : mode === '100' ? 'trăm' : 'nghìn'}.`,
        options: seededShuffle([
          `${rounded.toLocaleString('vi-VN')}`,
          `${(rounded + Number(mode)).toLocaleString('vi-VN')}`,
          `${Math.max(rounded - Number(mode), 0).toLocaleString('vi-VN')}`,
          `${(rounded + Number(mode) * 2).toLocaleString('vi-VN')}`,
        ], `${seedInput}|${i}|rounding`),
        answer: `${rounded.toLocaleString('vi-VN')}`,
        explanation: `Nhìn chữ số ngay bên phải hàng cần làm tròn rồi làm tròn được ${rounded.toLocaleString('vi-VN')}.`,
      };
    } else if (topic.op === 'expression') {
      const a = randInt(rng, 12, 99);
      const b = randInt(rng, 2, 9);
      const c = randInt(rng, 2, 9);
      const mode = rng() > 0.5 ? 'mul-first' : 'paren';
      if (mode === 'mul-first') {
        const ans = a + b * c;
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Tính giá trị biểu thức: ${a} + ${b} × ${c}`,
          options: seededShuffle([`${ans}`, `${(a + b) * c}`, `${a * b + c}`, `${ans + b}`], `${seedInput}|${i}|expr1`),
          answer: `${ans}`,
          explanation: `Thực hiện phép nhân trước: ${b} × ${c} = ${b * c}, rồi cộng ${a} để được ${ans}.`,
        };
      } else {
        const ans = (a + b) * c;
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Tính giá trị biểu thức: (${a} + ${b}) × ${c}`,
          options: seededShuffle([`${ans}`, `${a + b * c}`, `${a * c + b}`, `${ans - c}`], `${seedInput}|${i}|expr2`),
          answer: `${ans}`,
          explanation: `Tính trong ngoặc trước: ${a} + ${b} = ${a + b}, sau đó nhân với ${c} được ${ans}.`,
        };
      }
    } else if (topic.op === 'average') {
      const a = randInt(rng, 10, 60);
      const b = randInt(rng, 10, 60);
      const c = randInt(rng, 10, 60);
      const sum = a + b + c;
      const answer = Math.floor(sum / 3);
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Ba bạn có lần lượt ${a}, ${b}, ${c} nhãn vở. Trung bình mỗi bạn có bao nhiêu nhãn vở?`,
        options: seededShuffle([`${answer}`, `${Math.floor(sum / 2)}`, `${answer + 3}`, `${answer - 2}`], `${seedInput}|${i}|avg`),
        answer: `${answer}`,
        explanation: `Cộng lại được ${sum}, rồi chia cho 3: ${sum} : 3 = ${answer}.`,
      };
    } else if (topic.op === 'measurement') {
      const cases = [
        () => {
          const meters = randInt(rng, 2, 25);
          return {
            question: `${meters} m bằng bao nhiêu xăng-ti-mét?`,
            answer: `${meters * 100} cm`,
            options: [`${meters * 100} cm`, `${meters * 10} cm`, `${meters * 1000} cm`, `${meters} cm`],
            explanation: `1 m = 100 cm nên ${meters} m = ${meters * 100} cm.`,
          };
        },
        () => {
          const hours = randInt(rng, 1, 8);
          return {
            question: `${hours} giờ bằng bao nhiêu phút?`,
            answer: `${hours * 60} phút`,
            options: [`${hours * 60} phút`, `${hours * 100} phút`, `${hours * 30} phút`, `${hours * 360} phút`],
            explanation: `1 giờ = 60 phút nên ${hours} giờ = ${hours * 60} phút.`,
          };
        },
        () => {
          const kg = randInt(rng, 2, 18);
          return {
            question: `${kg} kg bằng bao nhiêu gam?`,
            answer: `${kg * 1000} g`,
            options: [`${kg * 1000} g`, `${kg * 100} g`, `${kg * 10} g`, `${kg} g`],
            explanation: `1 kg = 1000 g nên ${kg} kg = ${kg * 1000} g.`,
          };
        },
      ];
      const sample = cases[i % cases.length]();
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: sample.question,
        options: seededShuffle(sample.options, `${seedInput}|${i}|measurement`),
        answer: sample.answer,
        explanation: sample.explanation,
      };
    } else if (topic.op === 'data-chart') {
      const labels = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm'];
      const values = labels.map(() => randInt(rng, 2, 10));
      const biggestIndex = values.indexOf(Math.max(...values));
      const askBiggest = rng() > 0.5;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `${labels.map((label, idx) => `${label}: ${values[idx]} quyển`).join(' | ')}. ${askBiggest ? 'Ngày nào đọc nhiều sách nhất?' : 'Tổng số sách đã đọc là bao nhiêu?'}`,
        options: askBiggest
          ? seededShuffle(labels, `${seedInput}|${i}|chart-day`)
          : seededShuffle([`${values.reduce((a, b) => a + b, 0)}`, `${values[0] + values[1]}`, `${Math.max(...values)}`, `${values.reduce((a, b) => a + b, 0) + 2}`], `${seedInput}|${i}|chart-total`),
        answer: askBiggest ? labels[biggestIndex] : `${values.reduce((a, b) => a + b, 0)}`,
        explanation: askBiggest
          ? `So sánh các số liệu thì ${labels[biggestIndex]} có ${values[biggestIndex]} quyển là nhiều nhất.`
          : `Cộng các số liệu: ${values.join(' + ')} = ${values.reduce((a, b) => a + b, 0)}.`,
      };
    } else if (topic.op === 'word-problem') {
      const mode = ['buy', 'share', 'perimeter'][i % 3];
      if (mode === 'buy') {
        const a = randInt(rng, 15, 60);
        const b = randInt(rng, 15, 60);
        const c = randInt(rng, 10, 40);
        const answer = a + b - c;
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Thư viện lớp có ${a} truyện tranh. Nhà trường bổ sung thêm ${b} quyển rồi lớp mượn ra ${c} quyển. Thư viện còn lại bao nhiêu quyển?`,
          options: seededShuffle([`${answer}`, `${a + b + c}`, `${a - b + c}`, `${a + c - b}`], `${seedInput}|${i}|word1`),
          answer: `${answer}`,
          explanation: `Số truyện còn lại là ${a} + ${b} - ${c} = ${answer}.`,
        };
      } else if (mode === 'share') {
        const groups = randInt(rng, 3, 8);
        const each = randInt(rng, 4, 12);
        const total = groups * each;
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Có ${total} cái bánh chia đều cho ${groups} bạn. Mỗi bạn được mấy cái bánh?`,
          options: seededShuffle([`${each}`, `${groups}`, `${each + 2}`, `${total - groups}`], `${seedInput}|${i}|word2`),
          answer: `${each}`,
          explanation: `Chia đều ${total} cho ${groups} bạn: ${total} : ${groups} = ${each}.`,
        };
      } else {
        const length = randInt(rng, 5, 18);
        const width = randInt(rng, 3, 12);
        const answer = (length + width) * 2;
        question = {
          type: 'multiple-choice',
          isMath: true,
          question: `Một khu vườn hình chữ nhật dài ${length} m, rộng ${width} m. Chu vi khu vườn là bao nhiêu mét?`,
          options: seededShuffle([`${answer} m`, `${length * width} m²`, `${length + width} m`, `${answer + 2} m`], `${seedInput}|${i}|word3`),
          answer: `${answer} m`,
          explanation: `Chu vi hình chữ nhật = (dài + rộng) × 2 = (${length} + ${width}) × 2 = ${answer} m.`,
        };
      }
    } else if (topic.op === 'parity') {
      const value = randInt(rng, 10, 999);
      const answer = value % 2 === 0 ? 'Số chẵn' : 'Số lẻ';
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Số ${value} là số gì?`,
        options: seededShuffle(['Số chẵn', 'Số lẻ', 'Số âm', 'Phân số'], `${seedInput}|${i}|parity`),
        answer,
        explanation: `Nhìn chữ số cuối cùng. ${value} ${value % 2 === 0 ? 'kết thúc bằng số chẵn nên là số chẵn' : 'kết thúc bằng số lẻ nên là số lẻ'}.`,
      };
    } else if (topic.op === 'compare') {
      const a = randInt(rng, 100, 9999);
      const b = randInt(rng, 100, 9999);
      const answer = a > b ? '>' : a < b ? '<' : '=';
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Chọn dấu đúng: ${a} [ ? ] ${b}`,
        options: seededShuffle(['>', '<', '=', 'không so sánh được'], `${seedInput}|${i}|compare`),
        answer,
        explanation: `${a} ${answer} ${b}. So sánh từ hàng nghìn, trăm, chục rồi đến đơn vị.`,
      };
    } else if (topic.op === 'missing') {
      const start = randInt(rng, 5, 25);
      const step = randInt(rng, 2, 9);
      const missingIndex = randInt(rng, 1, 3);
      const values = Array.from({ length: 5 }, (_, idx) => start + idx * step);
      const answer = values[missingIndex];
      const shown = values.map((value, idx) => idx === missingIndex ? '__' : value);
      question = {
        type: 'fill-blank',
        isMath: true,
        question: `Điền số còn thiếu trong dãy: ${shown.join(', ')}`,
        text: `${shown.join(', ')} , [   ]`,
        blanks: [{ answer: `${answer}`, type: 'number' }],
        explanation: `Mỗi lần dãy tăng thêm ${step}, nên số còn thiếu là ${answer}.`,
      };
    } else if (topic.op === 'double-half') {
      const value = randInt(rng, 3, 20) * 2;
      const mode = rng() > 0.5 ? 'double' : 'half';
      const answer = mode === 'double' ? value * 2 : value / 2;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: mode === 'double' ? `Gấp ${value} lên 2 lần được bao nhiêu?` : `Giảm ${value} đi một nửa còn bao nhiêu?`,
        options: seededShuffle([`${answer}`, `${answer + 2}`, `${Math.max(answer - 2, 1)}`, `${answer + 5}`], `${seedInput}|${i}|double-half`),
        answer: `${answer}`,
        explanation: mode === 'double' ? `Gấp lên 2 lần nghĩa là nhân 2: ${value} × 2 = ${answer}.` : `Giảm đi một nửa nghĩa là chia đôi: ${value} : 2 = ${answer}.`,
      };
    } else if (topic.op === 'money') {
      const billA = randInt(rng, 1, 9) * 1000;
      const billB = randInt(rng, 1, 9) * 1000;
      const answer = billA + billB;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Bé có ${billA.toLocaleString('vi-VN')} đồng và thêm ${billB.toLocaleString('vi-VN')} đồng. Bé có tất cả bao nhiêu?`,
        options: seededShuffle([
          `${answer.toLocaleString('vi-VN')} đồng`,
          `${(answer + 1000).toLocaleString('vi-VN')} đồng`,
          `${Math.max(answer - 1000, 0).toLocaleString('vi-VN')} đồng`,
          `${(billA - billB).toLocaleString('vi-VN')} đồng`,
        ], `${seedInput}|${i}|money`),
        answer: `${answer.toLocaleString('vi-VN')} đồng`,
        explanation: `Cộng số tiền lại: ${billA.toLocaleString('vi-VN')} + ${billB.toLocaleString('vi-VN')} = ${answer.toLocaleString('vi-VN')} đồng.`,
      };
    } else if (topic.op === 'clock') {
      const hour = randInt(rng, 1, 12);
      const minute = randInt(rng, 0, 1) * 30;
      const answer = `${hour} giờ${minute ? ' 30 phút' : ''}`;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Nếu kim phút chỉ vào số ${minute ? '6' : '12'} và kim giờ gần số ${hour}, đồng hồ chỉ mấy giờ?`,
        options: seededShuffle([
          answer,
          `${hour} giờ${minute ? '' : ' 30 phút'}`,
          `${(hour % 12) + 1} giờ${minute ? ' 30 phút' : ''}`,
          `${Math.max(hour - 1, 1)} giờ`,
        ], `${seedInput}|${i}|clock`),
        answer,
        explanation: `Kim phút ở số ${minute ? '6 là 30 phút' : '12 là đúng giờ'}, nên đồng hồ chỉ ${answer}.`,
      };
    }

    if (question) questions.push(question);
  }

  return questions;
}

function chooseTopicEntry({ subject, dayNumber, moduleIndex, session, moduleId, catalog, daySeen, sessionSeen, ledger, forcedTopicKey }) {
  const candidates = catalog[subject] || [];
  if (!candidates.length) return null;
  const minQuestions = TARGET_QUESTION_COUNT[subject] || 1;
  const globalSeen = new Set(ledger.questionSignatures || []);

  if (forcedTopicKey) {
    const forced = candidates.find(item => item.topicKey === forcedTopicKey);
    if (forced) return forced;
  }

  const recentGlobal = new Set((ledger.topicKeys || []).slice(-500));
  const order = seededShuffle(candidates, `${dayNumber}|${session}|${moduleIndex}|${moduleId}|${subject}`);
  const scienceLaneFor = item => {
    if (item.sourceLane) return item.sourceLane;
    if (item.knttSource) return 'sgk';
    return 'extended';
  };
  const seenScienceLaneCounts = { sgk: 0, extended: 0 };
  if (subject === 'sci') {
    const candidateByKey = new Map(candidates.map(item => [item.topicKey, item]));
    daySeen.forEach(topicKey => {
      const matched = candidateByKey.get(topicKey);
      if (!matched) return;
      const lane = scienceLaneFor(matched);
      seenScienceLaneCounts[lane] = (seenScienceLaneCounts[lane] || 0) + 1;
    });
  }
  const preferredScienceLane = subject === 'sci'
    ? (seenScienceLaneCounts.extended <= seenScienceLaneCounts.sgk ? 'extended' : 'sgk')
    : null;
  const remainingQuestions = item => {
    if (item.generator) return 999999;
    const pool = item.questionPool || [];
    return pool.reduce((count, question) => count + (globalSeen.has(questionSignature(question)) ? 0 : 1), 0);
  };

  const reviewOk = isReviewAllowedOnDay(dayNumber);
  // notReview: block review topics outside end-of-term windows
  const notReview = item => reviewOk || !isReviewTopic(item);

  const passes = [
    item => subject === 'sci' && scienceLaneFor(item) === preferredScienceLane && notReview(item) && remainingQuestions(item) >= minQuestions && !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey) && !recentGlobal.has(item.topicKey),
    item => subject === 'sci' && scienceLaneFor(item) === preferredScienceLane && notReview(item) && remainingQuestions(item) > 0 && !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey) && !recentGlobal.has(item.topicKey),
    item => notReview(item) && remainingQuestions(item) >= minQuestions && !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey) && !recentGlobal.has(item.topicKey),
    item => notReview(item) && remainingQuestions(item) > 0 && !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey) && !recentGlobal.has(item.topicKey),
    item => notReview(item) && remainingQuestions(item) > 0 && !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey),
    item => notReview(item) && remainingQuestions(item) > 0 && !daySeen.has(item.topicKey),
    item => notReview(item) && remainingQuestions(item) > 0,
    item => remainingQuestions(item) > 0,  // last resort: allow review
    item => item.generator,
  ];

  for (const pass of passes) {
    const found = order.find(pass);
    if (found) return found;
  }
  return order[0];
}

function subjectFallbackOrder(primarySubject) {
  // ethics, pe, life removed — fallbacks route to active subjects only
  const map = {
    vie:     ['vie', 'math', 'eng', 'sci', 'histgeo', 'it'],
    it:      ['it', 'eng', 'math', 'tech', 'sci', 'vie'],
    sci:     ['sci', 'math', 'eng', 'histgeo', 'tech', 'vie', 'it'],
    eng:     ['eng', 'math', 'sci', 'vie', 'it', 'music'],
    math:    ['math', 'eng', 'sci', 'vie', 'histgeo', 'it', 'tech'],
    histgeo: ['histgeo', 'vie', 'sci', 'math', 'it'],
    music:   ['music', 'eng', 'vie', 'art', 'sci'],
    art:     ['art', 'vie', 'music', 'sci', 'tech'],
    tech:    ['tech', 'it', 'math', 'art', 'sci'],
    draw:    ['art', 'music', 'math', 'eng', 'sci', 'vie', 'it'],
  };
  return map[primarySubject] || [primarySubject, ...CORE_SUBJECT_CODES];
}

function getPhaseCoreSubject(phase, session, moduleIndex) {
  // All patterns ensure >70% core subjects (math+vie+eng+sci).
  // ethics/pe/life removed; secondary subjects: it, histgeo, music, art, tech
  const patterns = {
    // Summer hè: heavy core focus — sci encyclopedic content mixed in
    'summer-foundation': {
      am: ['math', 'vie', 'eng', 'sci', 'math', 'vie', 'eng', 'sci', 'math', 'sci', 'eng', 'math', 'vie', 'sci'],
      //   core×14 = math:4 vie:3 eng:3 sci:4 → 14/14 = 100%
      pm: ['math', 'eng', 'vie', 'sci', 'math', 'eng', 'vie', 'sci', 'math', 'sci'],
      //   core×10 = math:3 eng:2 vie:2 sci:3 → 10/10 = 100%
    },
    // Term 1 (tháng 9–1): bám SGK, xen kẽ it + histgeo
    'term-1': {
      am: ['math', 'vie', 'eng', 'math', 'sci', 'vie', 'eng', 'histgeo', 'math', 'vie', 'eng', 'sci', 'math', 'it'],
      //   core: math:4 vie:3 eng:3 sci:2 = 12/14 = 85.7%
      pm: ['math', 'eng', 'vie', 'math', 'it', 'eng', 'vie', 'sci', 'math', 'sci'],
      //   core: math:3 eng:2 vie:2 sci:2 = 9/10 = 90%
    },
    // Term 2 (tháng 2–5): tăng sci + tech
    'term-2': {
      am: ['math', 'vie', 'eng', 'math', 'sci', 'vie', 'eng', 'tech', 'math', 'vie', 'sci', 'eng', 'math', 'histgeo'],
      //   core: math:4 vie:3 eng:3 sci:2 = 12/14 = 85.7%
      pm: ['math', 'eng', 'vie', 'math', 'sci', 'eng', 'vie', 'sci', 'math', 'it'],
      //   core: math:3 eng:2 vie:2 sci:2 = 9/10 = 90%
    },
  };
  const sessionPattern = patterns[phase]?.[session] || patterns['summer-foundation'][session] || [];
  return sessionPattern[moduleIndex % sessionPattern.length] || null;
}

function getLongRangePlanSubject(dayNumber, session, moduleIndex, studyDate) {
  const phase = getAcademicPhase(studyDate);
  const slotIndexes = LONG_RANGE_STUDY_POLICY.enrichmentSlotMap[session] || [];
  const slotPosition = slotIndexes.indexOf(moduleIndex);
  if (slotPosition !== -1) {
    const enrichment = getDailyEnrichmentSubjects(dayNumber);
    return enrichment[slotPosition % enrichment.length] || null;
  }
  return getPhaseCoreSubject(phase, session, moduleIndex);
}

function getSubjectUsageScore(usage, subject) {
  return usage?.[subject] || 0;
}

function prioritizeSubjectOrder(primarySubject, subjectUsage) {
  const base = [...new Set(subjectFallbackOrder(primarySubject))];
  const preferred = primarySubject === 'it'
    ? ['math', 'vie', 'eng', 'sci', 'it', 'tech', 'draw']
    : base;

  const underCap = [];
  const atCap = [];

  preferred.forEach(subject => {
    if (!base.includes(subject) && subject !== primarySubject) return;
    const cap = SUBJECT_DAILY_CAPS[subject] ?? Number.POSITIVE_INFINITY;
    if (getSubjectUsageScore(subjectUsage, subject) < cap) {
      underCap.push(subject);
    } else {
      atCap.push(subject);
    }
  });

  return [...underCap, ...atCap];
}

function generateEmergencyMathQuestions(seedInput, targetCount, questionSeenDay, explanationSeenDay, ledger) {
  const globalQuestionSeen = new Set(ledger.questionSignatures || []);
  const globalExplanationSeen = new Set(ledger.explanationSignatures || []);
  const rng = createRng(`${seedInput}|emergency-math`);
  const collected = [];

  for (let attempt = 0; attempt < 500 && collected.length < targetCount; attempt++) {
    const mode = ['+', '-', '*', '/', 'compare'][attempt % 5];
    let question = null;
    if (mode === '+') {
      const a = randInt(rng, 200, 9999);
      const b = randInt(rng, 10, 9999);
      const answer = a + b;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Tính nhanh: ${a} + ${b}`,
        options: seededShuffle([`${answer}`, `${answer + 10}`, `${answer - 10}`, `${answer + 100}`], `${seedInput}|${attempt}|plus`),
        answer: `${answer}`,
        explanation: `Cộng theo từng hàng: ${a} + ${b} = ${answer}.`,
      };
    } else if (mode === '-') {
      const a = randInt(rng, 500, 9999);
      const b = randInt(rng, 10, a - 1);
      const answer = a - b;
      question = {
        type: 'fill-blank',
        isMath: true,
        question: `Điền kết quả đúng: ${a} - ${b}`,
        text: `${a} - ${b} = [   ]`,
        blanks: [{ answer: `${answer}`, type: 'number' }],
        explanation: `Trừ từng hàng cẩn thận để được ${answer}.`,
      };
    } else if (mode === '*') {
      const a = randInt(rng, 2, 12);
      const b = randInt(rng, 2, 12);
      const answer = a * b;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Phép nhân nào đúng với ${a} nhóm, mỗi nhóm ${b}?`,
        options: seededShuffle([`${a} × ${b} = ${answer}`, `${a} × ${b} = ${answer + a}`, `${a} × ${b} = ${answer - b}`, `${a} × ${b} = ${answer + 1}`], `${seedInput}|${attempt}|times`),
        answer: `${a} × ${b} = ${answer}`,
        explanation: `${a} nhóm mỗi nhóm ${b} thì tổng là ${a} × ${b} = ${answer}.`,
      };
    } else if (mode === '/') {
      const divisor = randInt(rng, 2, 9);
      const answer = randInt(rng, 2, 25);
      const dividend = divisor * answer;
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `${dividend} : ${divisor} bằng bao nhiêu?`,
        options: seededShuffle([`${answer}`, `${answer + 2}`, `${Math.max(answer - 2, 1)}`, `${answer + 5}`], `${seedInput}|${attempt}|div`),
        answer: `${answer}`,
        explanation: `Vì ${divisor} × ${answer} = ${dividend}, nên ${dividend} : ${divisor} = ${answer}.`,
      };
    } else {
      const a = randInt(rng, 100, 9999);
      const b = randInt(rng, 100, 9999);
      const answer = a > b ? '>' : a < b ? '<' : '=';
      question = {
        type: 'multiple-choice',
        isMath: true,
        question: `Chọn dấu đúng giữa ${a} và ${b}`,
        options: seededShuffle(['>', '<', '='], `${seedInput}|${attempt}|compare`),
        answer,
        explanation: `${a} ${answer} ${b}. Hãy so sánh từ hàng lớn nhất trước.`,
      };
    }

    const normalizedQuestion = questionSignature(question);
    const normalizedExplanation = explanationSignature(question);
    if (!normalizedQuestion) continue;
    if (globalQuestionSeen.has(normalizedQuestion) || questionSeenDay.has(normalizedQuestion)) continue;
    if (normalizedExplanation && (globalExplanationSeen.has(normalizedExplanation) || explanationSeenDay.has(normalizedExplanation))) continue;

    collected.push(question);
    questionSeenDay.add(normalizedQuestion);
    if (normalizedExplanation) explanationSeenDay.add(normalizedExplanation);
  }

  return collected;
}

function buildQuestionsForEntry(entry, skeleton, seedInput, questionSeenDay, explanationSeenDay, ledger) {
  const targetCount = entry.defaultCount || TARGET_QUESTION_COUNT[entry.subject] || Math.max((skeleton.questions || []).length, 1);
  const globalQuestionSeen = new Set(ledger.questionSignatures || []);
  const globalExplanationSeen = new Set(ledger.explanationSignatures || []);

  const selected = [];
  const localQuestionSeen = new Set();
  const processPool = pool => {
    for (const candidate of pool) {
      if (selected.length >= targetCount) break;
      const normalizedQuestion = questionSignature(candidate);
      if (!normalizedQuestion) continue;
      if (globalQuestionSeen.has(normalizedQuestion) || questionSeenDay.has(normalizedQuestion) || localQuestionSeen.has(normalizedQuestion)) continue;

      const normalizedExplanation = explanationSignature(candidate);
      if (normalizedExplanation && (globalExplanationSeen.has(normalizedExplanation) || explanationSeenDay.has(normalizedExplanation))) continue;

      const copy = ensureAnswerField(candidate);
      selected.push(copy);
      localQuestionSeen.add(normalizedQuestion);
      questionSeenDay.add(normalizedQuestion);
      if (normalizedExplanation) explanationSeenDay.add(normalizedExplanation);
    }
  };

  if (entry.generator) {
    for (let attempt = 0; attempt < 12 && selected.length < targetCount; attempt++) {
      const pool = entry.generator(entry, targetCount * 8, `${seedInput}|${attempt}`);
      processPool(pool);
    }
  } else {
    const pool = seededShuffle(entry.questionPool || [], `${seedInput}|pool`);
    processPool(pool);
  }

  return selected;
}

function deriveModuleTitle(entry, questions) {
  const base = compactBase(entry.title);

  // ── Clean title: just the topic name for most subjects ───────────────────
  // Non-English subjects use only the topic name — no question-derived hints.
  // Reason: math calculation fragments ("Trong số 505.265, chữ"), generic
  // concept prompts ("Vì sao bé nên học"), and partial sentences make the
  // session list noisy and hard to scan.
  //
  // English is the exception: a short vocabulary keyword (e.g. "· weekend",
  // "· cắm trại") helps distinguish vocabulary units at a glance.

  if (entry.subject !== 'eng') return base;

  // English: append the vocabulary answer as a short keyword hint
  const firstQuestion = questions[0];
  if (!firstQuestion) return base;
  const rawAnswer = firstQuestion.answer || firstQuestion.ans || (firstQuestion.blanks?.[0]?.answer ?? '');
  const hint = shortHint(rawAnswer, 18);
  // Only show hint if it has meaningful content (≥3 chars, not just a letter/number)
  return hint && hint.length >= 3 ? `${base} · ${hint}` : base;
}

export function materializeDayCurriculum(dayNumber, dayData, allData) {
  if (!dayData?.modules?.length) return dayData;

  const catalog = buildCatalog(allData);
  const ledger = State.getKnowledgeLedger();
  const profile = State.getActiveProfile();
  const studyDate = getStudyDateForDay(profile.learningStartDate || new Date().toISOString().slice(0, 10), dayNumber);
  const questionSeenDay = new Set();
  const explanationSeenDay = new Set();
  const topicSeenDay = new Set();
  const topicSeenBySession = { am: new Set(), pm: new Set() };
  const subjectUsage = Object.fromEntries([...ALL_SUBJECT_CODES, 'draw'].map(subject => [subject, 0]));
  const sessionIndexCounter = { am: 0, pm: 0 };

  const modules = dayData.modules.map((module, index) => {
    const completed = State.getModuleData(module.id);
    const forcedTopicKey = completed?.curriculumTopicKey || null;
    const sessionIndex = sessionIndexCounter[module.session] || 0;
    sessionIndexCounter[module.session] = sessionIndex + 1;
    const plannedSubject = forcedTopicKey ? null : getLongRangePlanSubject(dayNumber, module.session, sessionIndex, studyDate);
    const subjectOrder = forcedTopicKey
      ? [module.subject]
      : [...new Set([plannedSubject, ...prioritizeSubjectOrder(plannedSubject || module.subject, subjectUsage)].filter(Boolean))];
    let chosenEntry = null;
    let questions = [];

    for (const subject of subjectOrder) {
      const candidate = chooseTopicEntry({
        subject,
        dayNumber,
        moduleIndex: index,
        session: module.session,
        moduleId: module.id,
        catalog,
        daySeen: topicSeenDay,
        sessionSeen: topicSeenBySession[module.session] || new Set(),
        ledger,
        forcedTopicKey: subject === module.subject ? forcedTopicKey : null,
      });
      if (!candidate) continue;

      const candidateQuestions = buildQuestionsForEntry(
        candidate,
        module,
        `${dayNumber}|${module.session}|${index}|${candidate.topicKey}`,
        questionSeenDay,
        explanationSeenDay,
        ledger,
      );

      if (candidateQuestions.length >= 4 || subject === subjectOrder[subjectOrder.length - 1]) {
        chosenEntry = candidate;
        questions = candidateQuestions;
        break;
      }
    }

    if (!chosenEntry) return module;

    if (questions.length < 4) {
      const emergencyQuestions = generateEmergencyMathQuestions(
        `${dayNumber}|${module.session}|${index}|${module.id}`,
        8,
        questionSeenDay,
        explanationSeenDay,
        ledger,
      );
      if (emergencyQuestions.length >= 4) {
        chosenEntry = {
          subject: 'math',
          title: 'Toán: Ôn luyện không trùng lặp',
          topicKey: `math:emergency:${dayNumber}:${index}`,
          lessonBlocks: [],
        };
        questions = emergencyQuestions;
      }
    }

    topicSeenDay.add(chosenEntry.topicKey);
    (topicSeenBySession[module.session] || topicSeenBySession.am).add(chosenEntry.topicKey);
    subjectUsage[chosenEntry.subject] = (subjectUsage[chosenEntry.subject] || 0) + 1;

    return {
      ...module,
      subject: chosenEntry.subject,
      title: deriveModuleTitle(chosenEntry, questions),
      topicKey: chosenEntry.topicKey,
      lessonBlocks: clone(chosenEntry.lessonBlocks || module.lessonBlocks || []),
      estimatedMinutes: getSubjectEstimatedMinutes(chosenEntry.subject),
      questions,
    };
  });

  return {
    ...dayData,
    targetMinutes: { ...LONG_RANGE_STUDY_POLICY.targetMinutes },
    modules,
  };
}
