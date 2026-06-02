globalThis.localStorage = {
  _store: new Map(),
  getItem(key) {
    return this._store.has(key) ? this._store.get(key) : null;
  },
  setItem(key, value) {
    this._store.set(key, String(value));
  },
  removeItem(key) {
    this._store.delete(key);
  },
};

function normalizeText(str) {
  if (!str) return '';
  return String(str).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function stripHtml(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function questionSignature(question) {
  const blankAnswers = Array.isArray(question?.blanks)
    ? question.blanks.map(blank => blank?.answer || '').join('|')
    : '';
  return normalizeText([
    question?.type || '',
    question?.question || '',
    question?.answer || question?.ans || blankAnswers,
  ].join('|'));
}

function explanationSignature(question) {
  return normalizeText(stripHtml(question?.explanation || ''));
}

const { getCurriculumDay } = await import('../js/data/curriculum-loader.js');
const State = (await import('../js/state.js')).default;

const seenQuestions = new Set();
const seenTopics = new Set();
const daySummaries = [];
let duplicateQuestions = 0;
let duplicateTopics = 0;
let underTargetDays = 0;

for (let day = 1; day <= 90; day++) {
  const dayData = getCurriculumDay(day);
  const modules = dayData?.modules || [];
  const estimatedMinutes = modules.reduce((sum, module) => sum + (module.estimatedMinutes || 0), 0);
  if (estimatedMinutes < 210) underTargetDays += 1;

  for (const module of modules) {
    const topicKey = module.topicKey || `${module.subject}:${module.title}`;
    if (seenTopics.has(topicKey)) duplicateTopics += 1;
    seenTopics.add(topicKey);

    for (const question of module.questions || []) {
      const qSig = questionSignature(question);
      if (qSig && seenQuestions.has(qSig)) duplicateQuestions += 1;
      if (qSig) seenQuestions.add(qSig);
    }
  }

  const ledger = State.getKnowledgeLedger();
  for (const module of modules) {
    const topicKey = module.topicKey || `${module.subject}:${module.title}`;
    ledger.topicKeys.push(topicKey);
    for (const question of module.questions || []) {
      const qSig = questionSignature(question);
      const eSig = explanationSignature(question);
      if (qSig) ledger.questionSignatures.push(qSig);
      if (eSig) ledger.explanationSignatures.push(eSig);
    }
  }

  daySummaries.push({
    day,
    modules: modules.length,
    estimatedMinutes,
    subjects: [...new Set(modules.map(module => module.subject))],
  });
}

const totals = daySummaries.reduce((acc, day) => {
  acc.minutes += day.estimatedMinutes;
  acc.modules += day.modules;
  return acc;
}, { minutes: 0, modules: 0 });

console.log(JSON.stringify({
  days: daySummaries.length,
  duplicateQuestions,
  duplicateTopics,
  underTargetDays,
  averageEstimatedMinutes: Math.round(totals.minutes / daySummaries.length),
  averageModules: Math.round((totals.modules / daySummaries.length) * 10) / 10,
  sampleDays: daySummaries.slice(0, 5),
}, null, 2));
