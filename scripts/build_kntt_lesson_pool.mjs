/**
 * Build KNTT Lesson Pool from HTS book indexes.
 *
 * Reads:  docs/research/official-sources/notes/hts-lop4-book-indexes.json
 * Writes: js/data/kntt-lesson-pool.js
 *
 * Output structure per subject:
 *   Array of lesson entries, each with:
 *   - topicKey       — unique stable key for routing (subject:slug)
 *   - subject        — app subject code
 *   - displayTitle   — engaging title for the child (not dry SGK title)
 *   - ssgkTitle      — real SGK lesson/skill title (for accuracy tracing)
 *   - unit           — chủ đề / chapter name
 *   - skillType      — Đọc / Luyện từ và câu / Viết / Bài / etc.
 *   - source         — full traceable citation { book, bookId, page, unit, lesson, skill }
 *   - sequenceIndex  — position in book order (for progression)
 *
 * Usage: node scripts/build_kntt_lesson_pool.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const INDEXES_FILE = path.join(repoRoot, 'docs', 'research', 'official-sources', 'notes', 'hts-lop4-book-indexes.json');
const OUT_FILE = path.join(repoRoot, 'js', 'data', 'kntt-lesson-pool.js');

// Map HTS subjectName → app subject code
// HTS subjectName values may vary in capitalization — normalize to NFC then map
const SUBJECT_MAP = {
  'Tiếng Việt': 'vie',
  'Toán':       'math',
  'Tin học':    'it',
  'Tin Học':    'it',
  'Khoa học':   'sci',
  'Khoa Học':   'sci',
  'Lịch sử và Địa lí': 'histgeo',
  'Lịch Sử Và Địa Lí': 'histgeo',
  'Đạo đức':   'ethics',
  'Đạo Đức':   'ethics',
  'Âm nhạc':   'music',
  'Âm Nhạc':   'music',
  'Mĩ thuật':  'art',
  'Mĩ Thuật':  'art',
  'Công nghệ': 'tech',
  'Công Nghệ': 'tech',
  'Hoạt động và trải nghiệm': 'life',
  'Hoạt Động Và Trải Nghiệm': 'life',
  'Hoạt động trải nghiệm, hướng nghiệp': 'life',
  'Giáo dục thể chất': 'pe',
  'Giáo Dục Thể Chất': 'pe',
  // English handled separately (Family & Friends 4), skip KNTT TA for pool
};

// SkillType → subject-specific display hook templates
// These guide how the engagement title is constructed
const SKILL_DISPLAY = {
  'Đọc':               (lesson, unit) => `Đọc: "${lesson}"`,
  'Viết':              (lesson, unit) => `Viết: ${lesson}`,
  'Luyện từ và câu':   (lesson, unit) => `Từ & câu: ${lesson}`,
  'Nói và nghe':       (lesson, unit) => `Kể chuyện: ${lesson}`,
  'Luyện tập':         (lesson, unit) => `Luyện tập: ${lesson}`,
  'Góc sáng tạo':      (lesson, unit) => `Sáng tạo: ${lesson}`,
  'Trao đổi':          (lesson, unit) => `Trao đổi: ${lesson}`,
  'Kể chuyện':         (lesson, unit) => `Kể chuyện: ${lesson}`,
};

function skillDisplay(skillType, lessonName, unitName) {
  const fn = SKILL_DISPLAY[skillType];
  if (fn) return fn(lessonName, unitName);
  return lessonName || skillType;
}

// Make a safe topicKey from strings
function makeKey(subject, parts) {
  return subject + ':' + parts
    .map(p => String(p || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40))
    .filter(Boolean)
    .join('-');
}

function nfc(s) { return (s || '').normalize('NFC'); }

function extractLessons(book, subjectCode) {
  const lessons = [];
  const bookRef = `${nfc(book.name)} (KNTT)`;
  const bookId = book.bookId;
  let seq = 0;

  for (const unit of book.bookIndexs || []) {
    const unitName = nfc(unit.name);
    const unitTitle = nfc(unit.title) || '';  // may be empty for some subjects
    const unitPage = unit.pageNo;

    // Check if this unit has children (lessons)
    if (!unit.bookIndexChilds || unit.bookIndexChilds.length === 0) {
      // Unit itself is the leaf (e.g., Mĩ thuật, some subjects)
      seq++;
      const topicKey = makeKey(subjectCode, [unitTitle || unitName]);
      lessons.push({
        topicKey,
        subject: subjectCode,
        displayTitle: unitName,
        ssgkTitle: (unitTitle ? `${unitTitle}: ` : '') + unitName,
        unit: unitName,
        skillType: null,
        source: {
          book: bookRef,
          bookId,
          page: unitPage,
          unit: unitName,
          lesson: null,
          skill: null,
        },
        sequenceIndex: seq,
      });
      continue;
    }

    for (const lesson of unit.bookIndexChilds) {
      const lessonTitle = nfc(lesson.title); // "Bài 1", "Bài 2", etc.
      const lessonName = nfc(lesson.name);   // e.g., "Điều kì diệu"
      const lessonPage = lesson.pageNo;

      // If lesson has skill children, iterate those
      if (lesson.bookIndexChilds && lesson.bookIndexChilds.length > 0) {
        for (const skill of lesson.bookIndexChilds) {
          seq++;
          const skillType = nfc(skill.title);  // "Đọc", "Viết", "Luyện từ và câu"
          const skillName = nfc(skill.name);   // topic within the skill
          const skillPage = skill.pageNo;

          const display = skillDisplay(skillType, skillName || lessonName, unitName);
          const topicKey = makeKey(subjectCode, [lessonTitle, skillType, skillName].filter(Boolean));

          lessons.push({
            topicKey,
            subject: subjectCode,
            displayTitle: display,
            ssgkTitle: `${lessonTitle}: ${lessonName} — ${skillType}: ${skillName}`,
            unit: unitName,
            skillType,
            source: {
              book: bookRef,
              bookId,
              page: skillPage,
              unit: unitName,
              lesson: `${lessonTitle}: ${lessonName}`,
              skill: `${skillType}: ${skillName}`,
            },
            sequenceIndex: seq,
          });
        }
      } else {
        // Lesson is the leaf
        seq++;
        const topicKey = makeKey(subjectCode, [lessonTitle, lessonName].filter(Boolean));
        const display = (lessonTitle ? `${lessonTitle}: ` : '') + lessonName;

        lessons.push({
          topicKey,
          subject: subjectCode,
          displayTitle: display,
          ssgkTitle: `${lessonTitle}: ${lessonName}`,
          unit: unitName,
          skillType: null,
          source: {
            book: bookRef,
            bookId,
            page: lessonPage,
            unit: unitName,
            lesson: `${lessonTitle}: ${lessonName}`,
            skill: null,
          },
          sequenceIndex: seq,
        });
      }
    }
  }

  return lessons;
}

function dedupeTopicKeys(lessons) {
  const seen = new Map();
  return lessons.map(l => {
    let key = l.topicKey;
    const count = seen.get(key) || 0;
    seen.set(key, count + 1);
    if (count > 0) {
      key = key + '-' + (count + 1);
    }
    return { ...l, topicKey: key };
  });
}

async function main() {
  const indexesData = JSON.parse(await fs.readFile(INDEXES_FILE, 'utf8'));

  // Normalize helper — HTS data uses NFD, our literals are NFC
  const nfc = s => (s || '').normalize('NFC');

  // Process only KNTT SGK books (not bổ trợ or SGV for this pool)
  const sgkBooks = indexesData.books.filter(
    b => b.seriesId === 3 && nfc(b.groupName) === 'Sách giáo khoa'
  );

  const poolBySubject = {};
  const allStats = [];

  for (const book of sgkBooks) {
    const subjectCode = SUBJECT_MAP[nfc(book.subjectName)];
    if (!subjectCode) {
      console.log(`  skip: ${book.name} (subjectName="${book.subjectName}" not in map)`);
      continue;
    }

    const lessons = extractLessons(book, subjectCode);
    if (!poolBySubject[subjectCode]) poolBySubject[subjectCode] = [];
    poolBySubject[subjectCode].push(...lessons);

    allStats.push({ book: book.name, subject: subjectCode, count: lessons.length });
    console.log(`  ✓ ${book.name} → ${subjectCode}: ${lessons.length} lesson entries`);
  }

  // Dedupe topicKeys per subject
  for (const code of Object.keys(poolBySubject)) {
    poolBySubject[code] = dedupeTopicKeys(poolBySubject[code]);
  }

  // Count totals
  const total = Object.values(poolBySubject).reduce((s, arr) => s + arr.length, 0);
  const subjects = Object.keys(poolBySubject);

  // Generate the JS module
  const lines = [
    `/**`,
    ` * KNTT Grade 4 Lesson Pool`,
    ` * Auto-generated from HTS book indexes (Kết nối tri thức với cuộc sống SGK).`,
    ` * Source: docs/research/official-sources/notes/hts-lop4-book-indexes.json`,
    ` * DO NOT EDIT MANUALLY — regenerate with: node scripts/build_kntt_lesson_pool.mjs`,
    ` *`,
    ` * Structure per entry:`,
    ` *   topicKey      — stable routing key`,
    ` *   displayTitle  — shown in app UI (engaging, not dry SGK copy)`,
    ` *   ssgkTitle     — real SGK title for accuracy tracing`,
    ` *   source        — full citation { book, bookId, page, unit, lesson, skill }`,
    ` *   sequenceIndex — position in book order`,
    ` *`,
    ` * Generated: ${new Date().toISOString()}`,
    ` * Total entries: ${total} across ${subjects.length} subjects`,
    ` */`,
    ``,
    `export const KNTT_LESSON_POOL = {`,
  ];

  for (const code of subjects) {
    const entries = poolBySubject[code];
    lines.push(`  // ── ${code.toUpperCase()} (${entries.length} entries) ──────────────`);
    lines.push(`  ${JSON.stringify(code)}: ${JSON.stringify(entries, null, 2).replace(/^/gm, '  ').trim()},`);
    lines.push(``);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(`/** Get all lessons for a subject, in book sequence order */`);
  lines.push(`export function getKnttLessons(subjectCode) {`);
  lines.push(`  return KNTT_LESSON_POOL[subjectCode] || [];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Get N lessons for a subject starting near a given day.`);
  lines.push(` * Wraps around so the pool never runs out.`);
  lines.push(` */`);
  lines.push(`export function getKnttLessonsForDay(subjectCode, dayNumber, count = 1) {`);
  lines.push(`  const pool = KNTT_LESSON_POOL[subjectCode] || [];`);
  lines.push(`  if (pool.length === 0) return [];`);
  lines.push(`  const start = (dayNumber - 1) % pool.length;`);
  lines.push(`  const result = [];`);
  lines.push(`  for (let i = 0; i < count; i++) {`);
  lines.push(`    result.push(pool[(start + i) % pool.length]);`);
  lines.push(`  }`);
  lines.push(`  return result;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Format a source citation for display in explanation text.`);
  lines.push(` * e.g. "Tiếng Việt 4 - Tập một (KNTT), tr.8 — Bài 1: Điều kì diệu — Đọc: Danh từ"`);
  lines.push(` */`);
  lines.push(`export function formatSourceCitation(source) {`);
  lines.push(`  if (!source) return '';`);
  lines.push(`  const parts = [source.book];`);
  lines.push(`  if (source.page) parts.push('tr.' + source.page);`);
  lines.push(`  if (source.unit) parts.push(source.unit);`);
  lines.push(`  if (source.lesson) parts.push(source.lesson);`);
  lines.push(`  if (source.skill) parts.push(source.skill);`);
  lines.push(`  return parts.join(' — ');`);
  lines.push(`}`);

  const content = lines.join('\n');
  await fs.writeFile(OUT_FILE, content, 'utf8');

  console.log(`\n── Done ──────────────────────────────────────────────`);
  console.log(`  Total entries : ${total}`);
  console.log(`  Subjects      : ${subjects.join(', ')}`);
  console.log(`  Output        : ${path.relative(repoRoot, OUT_FILE)}`);
  allStats.forEach(s => console.log(`    ${s.subject.padEnd(10)} ${s.book.padEnd(45)} ${s.count}`));
  console.log(`──────────────────────────────────────────────────────\n`);
}

main().catch(err => { console.error(err); process.exitCode = 1; });
