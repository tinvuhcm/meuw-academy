import State from '../state.js';
import { normalizeText } from '../utils.js';
import {
  SUPPLEMENTAL_IT_TOPICS,
  SUPPLEMENTAL_SCIENCE_TOPICS,
  SUPPLEMENTAL_VIETNAMESE_TOPICS,
} from './supplemental-topics.js';

const TARGET_QUESTION_COUNT = {
  math: 16,
  eng: 14,
  vie: 10,
  sci: 12,
  it: 8,
  draw: 1,
};

const MATH_TOPICS = [
  { topicKey: 'math:add-thousands', title: 'Toán: Phép cộng hàng ngàn', op: '+' },
  { topicKey: 'math:sub-thousands', title: 'Toán: Phép trừ hàng ngàn', op: '-' },
  { topicKey: 'math:times-table', title: 'Toán: Bảng nhân 2-9', op: '*' },
  { topicKey: 'math:division-basic', title: 'Toán: Phép chia cơ bản', op: '/' },
  { topicKey: 'math:fractions-basic', title: 'Toán: Phân số cơ bản', op: 'frac' },
  { topicKey: 'math:geometry-perimeter-area', title: 'Toán: Hình học (Chu vi, Diện tích)', op: 'geo' },
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
  return normalizeText([
    question.type || '',
    question.question || '',
    question.answer || question.ans || '',
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

function buildScienceQuestionPool(topic) {
  const base = topic.facts.map(fact => ({
    type: 'multiple-choice',
    question: fact.q,
    options: [...fact.options],
    answer: fact.ans,
    explanation: fact.explanation,
  }));

  const statements = topic.facts.map(fact => fact.statement);
  const variants = topic.facts.map((fact, index) => {
    const distractors = seededShuffle(
      statements.filter((_, statementIndex) => statementIndex !== index),
      `${topic.topicKey}|statement|${index}`,
    ).slice(0, 3);
    return {
      type: 'multiple-choice',
      question: 'Câu nào nói đúng?',
      options: seededShuffle([fact.statement, ...distractors], `${topic.topicKey}|statement-options|${index}`),
      answer: fact.statement,
      explanation: `Gợi ý nhớ bài: ${fact.statement} ${stripHtml(fact.explanation)}`,
    };
  });

  return [...base, ...variants];
}

function buildSourceCatalog(allData) {
  const bySubject = {
    math: {},
    eng: {},
    vie: {},
    sci: {},
    it: {},
    draw: {},
  };

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
    eng: finalizeBucket(bySubject.eng),
    vie: finalizeBucket(bySubject.vie),
    sci: finalizeBucket(bySubject.sci),
    it: finalizeBucket(bySubject.it),
    draw: finalizeBucket(bySubject.draw),
  };
}

function mergeSupplemental(catalog, topic) {
  const key = moduleKey(topic.subject, topic.title);
  const existing = catalog[topic.subject].find(item => moduleKey(item.subject, item.title) === key);
  const extraPool = topic.facts ? buildScienceQuestionPool(topic) : clone(topic.questionPool || []);

  if (existing) {
    if (topic.replacePool) {
      existing.questionPool = extraPool.map(ensureAnswerField);
    } else {
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
  });
}

function buildCatalog(allData) {
  if (CATALOG_CACHE) return CATALOG_CACHE;
  const catalog = buildSourceCatalog(allData);
  SUPPLEMENTAL_SCIENCE_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  SUPPLEMENTAL_VIETNAMESE_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
  SUPPLEMENTAL_IT_TOPICS.forEach(topic => mergeSupplemental(catalog, topic));
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

  if (forcedTopicKey) {
    const forced = candidates.find(item => item.topicKey === forcedTopicKey);
    if (forced) return forced;
  }

  const recentGlobal = new Set((ledger.topicKeys || []).slice(-120));
  const order = seededShuffle(candidates, `${dayNumber}|${session}|${moduleIndex}|${moduleId}|${subject}`);

  const passes = [
    item => !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey) && !recentGlobal.has(item.topicKey),
    item => !daySeen.has(item.topicKey) && !sessionSeen.has(item.topicKey),
    item => !daySeen.has(item.topicKey),
    () => true,
  ];

  for (const pass of passes) {
    const found = order.find(pass);
    if (found) return found;
  }
  return order[0];
}

function buildQuestionsForEntry(entry, skeleton, seedInput, questionSeenDay, explanationSeenDay, ledger) {
  const targetCount = entry.defaultCount || TARGET_QUESTION_COUNT[entry.subject] || Math.max((skeleton.questions || []).length, 1);
  const globalQuestionSeen = new Set((ledger.questionSignatures || []).slice(-600));
  const globalExplanationSeen = new Set((ledger.explanationSignatures || []).slice(-600));

  let pool = [];
  if (entry.generator) {
    pool = entry.generator(entry, targetCount * 2, seedInput);
  } else {
    pool = seededShuffle(entry.questionPool || [], `${seedInput}|pool`);
  }

  const selected = [];
  const localQuestionSeen = new Set();
  const localExplanationSeen = new Set();
  const tiers = [
    q => !questionSeenDay.has(questionSignature(q)) && !explanationSeenDay.has(explanationSignature(q)) && !globalQuestionSeen.has(questionSignature(q)) && !globalExplanationSeen.has(explanationSignature(q)),
    q => !questionSeenDay.has(questionSignature(q)) && !explanationSeenDay.has(explanationSignature(q)),
    q => !localQuestionSeen.has(questionSignature(q)),
    () => true,
  ];

  for (const allow of tiers) {
    for (const candidate of pool) {
      const normalizedQuestion = questionSignature(candidate);
      if (!normalizedQuestion) continue;
      if (selected.length >= targetCount) break;
      if (!allow(candidate)) continue;
      if (localQuestionSeen.has(normalizedQuestion)) continue;

      const copy = ensureAnswerField(candidate);
      selected.push(copy);
      localQuestionSeen.add(normalizedQuestion);
      questionSeenDay.add(normalizedQuestion);

      const normalizedExplanation = explanationSignature(copy);
      if (normalizedExplanation) {
        localExplanationSeen.add(normalizedExplanation);
        explanationSeenDay.add(normalizedExplanation);
      }
    }
    if (selected.length >= targetCount) break;
  }

  return selected;
}

export function materializeDayCurriculum(dayNumber, dayData, allData) {
  if (!dayData?.modules?.length) return dayData;

  const catalog = buildCatalog(allData);
  const ledger = State.getKnowledgeLedger();
  const questionSeenDay = new Set();
  const explanationSeenDay = new Set();
  const topicSeenDay = new Set();
  const topicSeenBySession = { am: new Set(), pm: new Set() };

  const modules = dayData.modules.map((module, index) => {
    const completed = State.getModuleData(module.id);
    const forcedTopicKey = completed?.curriculumTopicKey || null;
    const entry = chooseTopicEntry({
      subject: module.subject,
      dayNumber,
      moduleIndex: index,
      session: module.session,
      moduleId: module.id,
      catalog,
      daySeen: topicSeenDay,
      sessionSeen: topicSeenBySession[module.session] || new Set(),
      ledger,
      forcedTopicKey,
    });

    if (!entry) return module;

    topicSeenDay.add(entry.topicKey);
    (topicSeenBySession[module.session] || topicSeenBySession.am).add(entry.topicKey);

    const questions = buildQuestionsForEntry(
      entry,
      module,
      `${dayNumber}|${module.session}|${index}|${entry.topicKey}`,
      questionSeenDay,
      explanationSeenDay,
      ledger,
    );

    return {
      ...module,
      subject: entry.subject,
      title: entry.title,
      topicKey: entry.topicKey,
      lessonBlocks: clone(entry.lessonBlocks || module.lessonBlocks || []),
      questions,
    };
  });

  return {
    ...dayData,
    modules,
  };
}
