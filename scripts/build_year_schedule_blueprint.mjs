import fs from 'node:fs/promises';
import path from 'node:path';

import { getAcademicPhase, getProgramDayLimit, getStudyDateForDay, getStudyPlanForDate, PROGRAM_START_DATE } from '../js/schedule-calendar.js';
import { getDailyEnrichmentSubjects, OFFICIAL_GRADE4_KNOWLEDGE_MAP, YEARLY_STUDY_PHASES } from '../js/data/official-knowledge-map.js';
import { localDateString } from '../js/utils.js';

const repoRoot = process.cwd();
const outputPath = path.join(repoRoot, 'docs', 'research', 'official-sources', 'notes', 'year-study-plan-2026-2027.json');

function getPhaseMeta(phaseKey) {
  return YEARLY_STUDY_PHASES.find(phase => phase.key === phaseKey) || null;
}

const totalDays = getProgramDayLimit(PROGRAM_START_DATE);
const days = [];

for (let dayNumber = 1; dayNumber <= totalDays; dayNumber++) {
  const studyDate = getStudyDateForDay(PROGRAM_START_DATE, dayNumber);
  const plan = getStudyPlanForDate(studyDate);
  const phaseKey = getAcademicPhase(studyDate);
  const phase = getPhaseMeta(phaseKey);
  const enrichment = getDailyEnrichmentSubjects(dayNumber).map(code => ({
    subject: code,
    label: OFFICIAL_GRADE4_KNOWLEDGE_MAP[code]?.label || code,
  }));

  days.push({
    dayNumber,
    date: localDateString(studyDate),
    dayOfWeek: studyDate.getDay(),
    phase: phaseKey,
    phaseLabel: phase?.label || phaseKey,
    mode: plan.mode,
    targetMinutes: plan.targetMinutes,
    sessionIds: plan.sessionIds,
    focus: phase?.focus || [],
    enrichment,
  });
}

const payload = {
  generated_at: new Date().toISOString(),
  programStartDate: PROGRAM_START_DATE,
  totalDays,
  phases: YEARLY_STUDY_PHASES,
  days,
};

await fs.writeFile(outputPath, JSON.stringify(payload, null, 2));
console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
