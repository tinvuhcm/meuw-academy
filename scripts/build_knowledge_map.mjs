import fs from 'node:fs/promises';
import path from 'node:path';

import {
  LONG_RANGE_STUDY_POLICY,
  OFFICIAL_GRADE4_KNOWLEDGE_MAP,
  YEARLY_STUDY_PHASES,
} from '../js/data/official-knowledge-map.js';

const repoRoot = process.cwd();
const notesDir = path.join(repoRoot, 'docs', 'research', 'official-sources', 'notes');
const hoc10BookIndexPath = path.join(notesDir, 'hoc10-lop4-book-index.json');
const outputPath = path.join(notesDir, 'knowledge-map-lop4.json');

const SUBJECT_KEY_BY_SLUG = {
  toan: 'math',
  'tieng-viet': 'vie',
  'tieng-anh': 'eng',
  'tin-hoc': 'it',
  'khoa-hoc': 'sci',
  'lich-su-va-dia-li': 'histgeo',
  'am-nhac': 'music',
  'mi-thuat': 'art',
  'dao-duc': 'ethics',
  'cong-nghe': 'tech',
  'hoat-dong-trai-nghiem': 'life',
  'giao-duc-the-chat': 'pe',
};

function countConcepts(strands = []) {
  return strands.reduce((sum, strand) => sum + (strand.concepts?.length || 0), 0);
}

async function main() {
  const raw = JSON.parse(await fs.readFile(hoc10BookIndexPath, 'utf8'));
  const hoc10Coverage = new Map();

  for (const collection of raw) {
    for (const subjectEntry of collection.subjects || []) {
      const appKey = SUBJECT_KEY_BY_SLUG[subjectEntry.subject?.slug];
      if (!appKey) continue;
      if (!hoc10Coverage.has(appKey)) hoc10Coverage.set(appKey, []);
      hoc10Coverage.get(appKey).push({
        bookType: collection.book_type?.slug,
        totalRows: subjectEntry.rows?.length || 0,
        titles: (subjectEntry.rows || []).map(row => row.title),
      });
    }
  }

  const subjects = Object.entries(OFFICIAL_GRADE4_KNOWLEDGE_MAP).map(([key, subject]) => ({
    subjectKey: key,
    label: subject.label,
    sourceSets: subject.sourceSets,
    books: subject.books,
    strands: subject.strands,
    conceptCount: countConcepts(subject.strands),
    hoc10Coverage: hoc10Coverage.get(key) || [],
  }));

  const knowledgeMap = {
    generated_at: new Date().toISOString(),
    policy: {
      ...LONG_RANGE_STUDY_POLICY,
      phases: YEARLY_STUDY_PHASES,
      note: 'Knowledge map combines official Hoc10/SGK lineage with merged concept coverage from Chân Trời Sáng Tạo, Kết Nối Tri Thức, Family & Friends 4 and vetted science extensions.',
    },
    subjects,
    summary: {
      subjectCount: subjects.length,
      totalConcepts: subjects.reduce((sum, subject) => sum + subject.conceptCount, 0),
      officialSubjectsBackedByHoc10: subjects.filter(subject => subject.hoc10Coverage.length > 0).length,
    },
  };

  await fs.writeFile(outputPath, JSON.stringify(knowledgeMap, null, 2));
  console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
