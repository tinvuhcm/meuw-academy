/**
 * KNTT Topics Bridge
 *
 * Converts KNTT_LESSON_POOL entries into catalog-compatible topic objects
 * that fresh-curriculum.js can merge via mergeSupplemental().
 *
 * Key principles baked in:
 *  1. Source citations — every question explanation appended with KNTT ref
 *  2. Math routing — KNTT lesson titles mapped to generator ops
 *  3. Engagement — displayTitle is the child-facing label; not dry SGK prose
 *  4. Empty pools are fine — they'll grow when Direction 2 adds parsed questions
 */

import { KNTT_LESSON_POOL, formatSourceCitation } from './kntt-lesson-pool.js';

// ─── Math lesson → generator op mapping ──────────────────────────────────────
// Match KNTT Toán 4 lesson titles to existing math generator ops
const MATH_OP_RULES = [
  { pattern: /phân số|phần bằng nhau/i,           op: 'frac' },
  { pattern: /chu vi|diện tích|hình học|hình vuông|hình chữ nhật/i, op: 'geo' },
  { pattern: /trung bình cộng|trung bình/i,        op: 'average' },
  { pattern: /biểu thức|thứ tự phép tính/i,        op: 'expression' },
  { pattern: /đo|đơn vị|km|dm|kg|lít|ml|cm|m²|ha/i, op: 'measurement' },
  { pattern: /bảng số liệu|biểu đồ|thống kê/i,    op: 'data-chart' },
  { pattern: /bài toán có lời văn|lời văn/i,       op: 'word-problem' },
  { pattern: /tính nhẩm|nhẩm nhanh/i,             op: 'quick' },
  { pattern: /làm tròn/i,                          op: 'rounding' },
  { pattern: /giá trị chữ số|hàng|lớp|số tự nhiên|so sánh số|số lớn|100 000|1 000 000/i, op: 'place-value' },
  { pattern: /số chẵn|số lẻ/i,                    op: 'parity' },
  { pattern: /tìm x|tìm thành phần|số còn thiếu|ẩn số/i, op: 'missing' },
  { pattern: /gấp|giảm đi|nhiều hơn|ít hơn/i,    op: 'double-half' },
  { pattern: /tiền|đồng/i,                         op: 'money' },
  { pattern: /đồng hồ|giờ phút|xem giờ/i,         op: 'clock' },
  { pattern: /nhân|chia|bảng nhân|bảng chia/i,    op: '*' },
  { pattern: /cộng|trừ/i,                          op: '+' },
];

function mathOpForLesson(title) {
  const t = title || '';
  for (const rule of MATH_OP_RULES) {
    if (rule.pattern.test(t)) return rule.op;
  }
  return '+'; // fallback: arithmetic
}

// ─── Engagement transforms ────────────────────────────────────────────────────
// Make non-math subject titles feel less like "school labels"
// Rules: short, specific, use the actual story/topic name

const SUBJECT_TITLE_TRANSFORMS = {
  vie: (entry) => {
    const { skillType, displayTitle } = entry;
    if (skillType === 'Đọc') return displayTitle; // "Đọc: Điều kì diệu" — already good
    if (skillType === 'Viết') return `Viết: ${entry.source.skill?.replace('Viết: ','') || displayTitle}`;
    if (skillType === 'Luyện từ và câu') return `Từ & câu: ${entry.source.skill?.replace('Luyện từ và câu: ','') || displayTitle}`;
    return displayTitle;
  },
  sci: (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  it:  (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  histgeo: (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  music: (entry) => entry.displayTitle,
  art:   (entry) => entry.displayTitle,
  ethics: (entry) => entry.ssgkTitle?.replace(/^(Bài|Chủ đề) \d+[:.]\s*/, '') || entry.displayTitle,
  tech:  (entry) => entry.displayTitle,
  life:  (entry) => entry.displayTitle,
  pe:    (entry) => entry.displayTitle,
};

function engagingTitle(subject, entry) {
  const fn = SUBJECT_TITLE_TRANSFORMS[subject];
  if (fn) return fn(entry);
  return entry.displayTitle;
}

// ─── Source citation suffix ───────────────────────────────────────────────────
// Appended to question explanations as a small traceable note

function citationNote(source) {
  if (!source) return '';
  const parts = [source.book];
  if (source.page) parts.push(`tr.${source.page}`);
  if (source.lesson) parts.push(source.lesson);
  return `(Nguồn: ${parts.join(', ')})`;
}

function withCitation(explanation, source) {
  if (!explanation || !source) return explanation || '';
  const note = citationNote(source);
  if (!note) return explanation;
  return `${explanation} ${note}`;
}

// ─── Math topic builder ───────────────────────────────────────────────────────

function buildKnttMathTopics(lessons) {
  return lessons.map(entry => {
    const op = mathOpForLesson(entry.ssgkTitle);
    const title = `Toán: ${entry.displayTitle}`;
    return {
      topicKey: entry.topicKey,
      subject: 'math',
      title,
      knttSource: entry.source,
      sequenceIndex: entry.sequenceIndex,
      // math generator will be attached by buildCatalog (it checks for 'math' + op)
      op,
      lessonBlocks: [],
      questionPool: [],
    };
  });
}

// ─── Non-math topic builder ───────────────────────────────────────────────────
// Empty question pools are OK — they'll be filled by Direction 2 (PPTX parsing)
// and immediately usable as session titles even without questions.

function buildKnttNonMathTopics(subject, lessons) {
  return lessons.map(entry => ({
    topicKey: entry.topicKey,
    subject,
    title: engagingTitle(subject, entry),
    knttSource: entry.source,
    sequenceIndex: entry.sequenceIndex,
    lessonBlocks: [],
    questionPool: [],
    // citationNote is available for when Direction 2 adds questions
    _citationNote: citationNote(entry.source),
  }));
}

// ─── Public API ───────────────────────────────────────────────────────────────

let _cached = null;

/**
 * Returns all KNTT catalog topics ready for mergeSupplemental().
 * Cached after first call.
 */
export function buildKnttCatalogTopics() {
  if (_cached) return _cached;

  const result = [];

  for (const [subject, lessons] of Object.entries(KNTT_LESSON_POOL)) {
    if (!lessons.length) continue;
    if (subject === 'math') {
      result.push(...buildKnttMathTopics(lessons));
    } else {
      result.push(...buildKnttNonMathTopics(subject, lessons));
    }
  }

  // Sort by sequenceIndex within each subject to get book order
  result.sort((a, b) => (a.sequenceIndex ?? 0) - (b.sequenceIndex ?? 0));

  _cached = result;
  return result;
}

/**
 * Enrich a question's explanation with KNTT source citation.
 * Call this when adding questions derived from KNTT content.
 */
export function enrichExplanationWithSource(question, source) {
  if (!question || !source) return question;
  return {
    ...question,
    explanation: withCitation(question.explanation, source),
  };
}

/**
 * Get the KNTT source citation for a specific topicKey.
 * Useful in lesson.js / session.js when displaying module info.
 */
export function getKnttSourceForTopic(topicKey) {
  for (const lessons of Object.values(KNTT_LESSON_POOL)) {
    const match = lessons.find(l => l.topicKey === topicKey);
    if (match) return match.source;
  }
  return null;
}

/**
 * Format a source for user-visible attribution (short form).
 * e.g. "Toán 4 T1 (KNTT), tr.6"
 */
export function shortCitation(source) {
  if (!source) return '';
  const bookShort = source.book
    ?.replace('Kết nối tri thức với cuộc sống', 'KNTT')
    ?.replace(' (KNTT)', ' KNTT')
    ?.replace('Tập một', 'T1')
    ?.replace('Tập hai', 'T2');
  return [bookShort, source.page ? `tr.${source.page}` : ''].filter(Boolean).join(', ');
}
