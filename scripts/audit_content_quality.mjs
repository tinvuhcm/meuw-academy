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

import { stripHtmlLite } from './lib/content-audit-helpers.mjs';
const { getCurriculumDay } = await import('../js/data/curriculum-loader.js');

const dayFrom = Number(process.argv[2] || 1);
const dayTo = Number(process.argv[3] || 30);

const bannedPatterns = [
  { tag: 'meta-subject', re: /thuộc mạch kiến thức nào|thường được học trong môn nào/i },
  { tag: 'wrong-topic', re: /nhầm sang nội dung/i },
  { tag: 'teacher-voice', re: /\bcô giáo\b|\bcô hỏi\b/i },
  { tag: 'garbage-choice', re: /chọn đáp án vì thấy quen mắt|chỉ nhìn nút nộp bài|một môn khác|không cần hiểu|nhắm mắt chọn đại/i },
  { tag: 'weak-strategy', re: /chọn câu dài nhất|đếm số lần/i },
  { tag: 'meta-learning', re: /con đang học nội dung nào|nên mở lại phần nào/i },
  { tag: 'warmup', re: /^khởi động/i },
];

const findings = [];

for (let day = dayFrom; day <= dayTo; day += 1) {
  const dayData = getCurriculumDay(day);
  for (const module of dayData?.modules || []) {
    const modulePath = `day${day}/${module.id}/${module.subject}/${module.title}`;

    for (const block of module.lessonBlocks || []) {
      const text = [
        block.title,
        ...(block.points || []),
        block.example,
        block.cta,
      ].filter(Boolean).map(stripHtmlLite).join(' | ');

      for (const pattern of bannedPatterns) {
        if (pattern.re.test(text)) {
          findings.push({
            type: 'lessonBlock',
            tag: pattern.tag,
            path: modulePath,
            snippet: text.slice(0, 220),
          });
        }
      }
    }

    for (const question of module.questions || []) {
      const text = [
        question.question,
        ...(question.options || []),
        question.answer,
        question.explanation,
      ].filter(Boolean).map(stripHtmlLite).join(' | ');

      for (const pattern of bannedPatterns) {
        if (pattern.re.test(text)) {
          findings.push({
            type: 'question',
            tag: pattern.tag,
            path: modulePath,
            snippet: stripHtmlLite(question.question || '').slice(0, 220),
          });
        }
      }
    }
  }
}

const grouped = findings.reduce((acc, item) => {
  acc[item.tag] = (acc[item.tag] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({
  days: { from: dayFrom, to: dayTo },
  totalFindings: findings.length,
  byTag: grouped,
  findings: findings.slice(0, 200),
}, null, 2));
