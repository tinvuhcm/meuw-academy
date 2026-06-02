import { localDateString } from './utils.js';

export const SCHOOL_TERM_START = '2026-09-07';
export const SCHOOL_TERM_END = '2027-05-22';
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
  const schoolWeekday = isSchoolTermWeekday(dateLike);
  if (schoolWeekday) {
    return {
      mode: 'merged',
      sessionIds: ['day'],
      targetMinutes: SCHOOL_WEEKDAY_TARGET_MINUTES,
      label: 'Lịch học hôm nay',
      shortLabel: '1 buổi',
    };
  }

  return {
    mode: 'split',
    sessionIds: ['am', 'pm'],
    targetMinutes: FULL_DAY_TARGET_MINUTES,
    label: 'Buổi Sáng & Buổi Chiều',
    shortLabel: '2 buổi',
  };
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

  const merged = [];
  let totalMinutes = 0;
  for (const module of interleaveModules(modules)) {
    const duration = module.estimatedMinutes || 9;
    if (merged.length && totalMinutes >= plan.targetMinutes) break;
    merged.push(module);
    totalMinutes += duration;
  }

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
