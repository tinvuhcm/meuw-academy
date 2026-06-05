/**
 * MEUW ACADEMY — curriculum-loader.js
 * Abstracts fetching day/module data
 */

// Import curriculum data
// For now, we will import a dummy or Month 1 data file.
// In real use, we might lazy load these.
import { M1_DATA } from './curriculum-m1.js';
import { M2_DATA } from './curriculum-m2.js';
import { M3_DATA } from './curriculum-m3.js';
import { enrichLessonBlocks } from './lesson-blocks.js';
import { materializeDayCurriculum } from './fresh-curriculum.js';

export const ALL_DATA = { ...M1_DATA, ...M2_DATA, ...M3_DATA };
const BASE_DAY_COUNT = Object.keys(ALL_DATA).length;

// ─── Materialized-day cache ────────────────────────────────────────────────
// materializeDayCurriculum() must return the SAME result for the same day
// within a single "state epoch". Without caching, the session list and the
// lesson page each call getCurriculumDay() independently. Between those two
// calls, syncDailyProgress() fires meuw:state-committed and can subtly change
// the ledger/completed-modules state → session shows "Toán" but lesson loads
// "Tiếng Việt" for the same module slot.
//
// Cache is keyed by day number. It is invalidated ONLY on
// meuw:curriculum-invalidated, which is dispatched exclusively by
// markModuleComplete() and recordKnowledgeExposure() in state.js — the two
// operations that actually affect topic selection. Routine state commits
// (syncDailyProgress, XP updates, etc.) do NOT invalidate this cache.
const _dayCache = {};

if (typeof window !== 'undefined') {
  window.addEventListener('meuw:curriculum-invalidated', () => {
    // Clear all cached day data so the next render re-materializes with fresh
    // completedModules / knowledgeLedger state.
    for (const key of Object.keys(_dayCache)) {
      delete _dayCache[key];
    }
  });
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function getTemplateDayData(day) {
  const templateDay = ((day - 1) % BASE_DAY_COUNT) + 1;
  return {
    templateDay,
    dayData: ALL_DATA[`day${templateDay}`] || null,
  };
}

function synthesizeDaySkeleton(day) {
  const { templateDay, dayData } = getTemplateDayData(day);
  if (!dayData) return null;
  const copy = clone(dayData);
  copy.title = `Ngày ${day}: Khám phá tri thức mới`;
  copy.templateDay = templateDay;
  // Replace the template-day prefix in each module's ID so per-session indices
  // (d1-am-1, d1-pm-1, …) map correctly to the actual day (d85-am-1, d85-pm-1, …).
  copy.modules = (copy.modules || []).map((module) => ({
    ...module,
    id: module.id
      ? module.id.replace(/^d\d+/, `d${day}`)
      : `d${day}-${module.session}-1`,
  }));
  return copy;
}

/**
 * Get full data for a specific day.
 * Result is cached per day and invalidated on any state commit, guaranteeing
 * that the session list and lesson page always see identical module content.
 * @param {number} day
 */
export function getCurriculumDay(day) {
  if (_dayCache[day]) return _dayCache[day];

  const dayKey = `day${day}`;
  const dayData = ALL_DATA[dayKey] || synthesizeDaySkeleton(day);
  const materialized = materializeDayCurriculum(day, dayData, ALL_DATA);
  const enriched = enrichLessonBlocks(dayKey, materialized);

  _dayCache[day] = enriched;
  return enriched;
}

/**
 * Get data for a specific module
 * @param {number} day
 * @param {string} moduleId
 */
export function getModuleData(day, moduleId) {
  const dayData = getCurriculumDay(day);
  if (!dayData) return null;
  return dayData.modules.find(m => m.id === moduleId) || null;
}
