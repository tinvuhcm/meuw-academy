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
  copy.modules = (copy.modules || []).map((module, index) => ({
    ...module,
    id: `d${day}-${module.session}-${index + 1}`,
  }));
  return copy;
}

/**
 * Get full data for a specific day
 * @param {number} day 
 */
export function getCurriculumDay(day) {
  const dayKey = `day${day}`;
  const dayData = ALL_DATA[dayKey] || synthesizeDaySkeleton(day);
  const materialized = materializeDayCurriculum(day, dayData, ALL_DATA);
  return enrichLessonBlocks(dayKey, materialized);
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
