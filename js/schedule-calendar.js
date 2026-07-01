import { localDateString } from './utils.js';

export const PROGRAM_START_DATE = '2026-06-03';
export const SCHOOL_TERM_START = '2026-09-07';
export const SCHOOL_TERM_END = '2027-05-22';
export const PROGRAM_END_DATE = SCHOOL_TERM_END;
export const SCHOOL_WEEKDAY_TARGET_MINUTES = 120;
export const FULL_DAY_TARGET_MINUTES = 220;

const FULL_STUDY_DATE_SET = new Set([
  '2026-11-24',
  '2027-01-01',
  '2027-02-05',
  '2027-02-06',
  '2027-02-07',
  '2027-02-08',
  '2027-02-09',
  '2027-02-10',
  '2027-04-16',
  '2027-04-30',
  '2027-05-01',
]);

function parseDateOnly(dateLike) {
  if (dateLike instanceof Date) {
    return new Date(dateLike.getFullYear(), dateLike.getMonth(), dateLike.getDate());
  }
  if (typeof dateLike === 'string') {
    const [year, month, day] = dateLike.split('-').map(Number);
    if (year && month && day) return new Date(year, month - 1, day);
  }
  return new Date();
}

function isWithinRange(date, start, end) {
  const time = parseDateOnly(date).getTime();
  return time >= parseDateOnly(start).getTime() && time <= parseDateOnly(end).getTime();
}

function diffCalendarDays(startDate, endDate) {
  return Math.floor((parseDateOnly(endDate).getTime() - parseDateOnly(startDate).getTime()) / 86400000);
}

export function getStudyDateForDay(startDate, dayNumber) {
  const d = parseDateOnly(startDate);
  d.setDate(d.getDate() + Math.max(0, dayNumber - 1));
  return d;
}

export function isWeekendStudyDate(dateLike) {
  const day = parseDateOnly(dateLike).getDay();
  return day === 0 || day === 6;
}

export function isFullStudyException(dateLike) {
  return FULL_STUDY_DATE_SET.has(localDateString(parseDateOnly(dateLike)));
}

export function isSchoolTermWeekday(dateLike) {
  const date = parseDateOnly(dateLike);
  return isWithinRange(date, SCHOOL_TERM_START, SCHOOL_TERM_END) && !isWeekendStudyDate(date) && !isFullStudyException(date);
}

export function getProgramDayLimit(startDate = PROGRAM_START_DATE) {
  return Math.max(1, diffCalendarDays(parseDateOnly(startDate), parseDateOnly(PROGRAM_END_DATE)) + 1);
}

export function getAcademicPhase(dateLike) {
  const date = parseDateOnly(dateLike);
  if (date.getTime() < parseDateOnly(SCHOOL_TERM_START).getTime()) {
    return 'summer-foundation';
  }
  if (date.getTime() <= parseDateOnly('2027-01-31').getTime()) {
    return 'term-1';
  }
  return 'term-2';
}

function interleaveModules(modules) {
  const bySession = {
    am: modules.filter(module => module.session === 'am'),
    pm: modules.filter(module => module.session === 'pm'),
  };
  const result = [];
  const max = Math.max(bySession.am.length, bySession.pm.length);
  for (let index = 0; index < max; index++) {
    if (bySession.am[index]) result.push(bySession.am[index]);
    if (bySession.pm[index]) result.push(bySession.pm[index]);
  }
  return result;
}

export function getStudyPlanForDate(dateLike = new Date()) {
  return {
    mode: 'split',
    sessionIds: ['am', 'pm'],
    targetMinutes: FULL_DAY_TARGET_MINUTES,
    label: 'Buổi Sáng & Buổi Chiều',
    shortLabel: '2 buổi',
  };
}

function pickMergedModules(modules, targetMinutes) {
  const source = interleaveModules(modules);
  if (source.length <= 1) return source;

  const desiredCount = Math.min(source.length, 12);
  const selected = [];
  const used = new Set();
  for (let slot = 0; slot < desiredCount; slot++) {
    const rawIndex = Math.round((slot * (source.length - 1)) / Math.max(desiredCount - 1, 1));
    let index = rawIndex;
    while (used.has(index) && index < source.length - 1) index += 1;
    while (used.has(index) && index > 0) index -= 1;
    if (used.has(index)) continue;
    used.add(index);
    selected.push(source[index]);
  }

  const byOriginalOrder = selected.sort((a, b) => source.indexOf(a) - source.indexOf(b));
  const merged = [];
  let totalMinutes = 0;
  for (const module of byOriginalOrder) {
    const duration = module.estimatedMinutes || 9;
    if (merged.length && totalMinutes >= targetMinutes) break;
    merged.push(module);
    totalMinutes += duration;
  }
  return merged;
}

export function getScheduledModulesForDate(modules, dateLike = new Date()) {
  const plan = getStudyPlanForDate(dateLike);
  if (plan.mode === 'split') {
    return {
      plan,
      sessions: {
        am: modules.filter(module => module.session === 'am'),
        pm: modules.filter(module => module.session === 'pm'),
      },
      allModules: [...modules],
    };
  }

  const merged = pickMergedModules(modules, plan.targetMinutes);

  return {
    plan,
    sessions: {
      day: merged,
    },
    allModules: merged,
  };
}

export function getScheduledModulesForProfileDay(profile, dayNumber, allModules) {
  const studyDate = getStudyDateForDay(profile.learningStartDate || localDateString(new Date()), dayNumber);
  return getScheduledModulesForDate(allModules, studyDate);
}
