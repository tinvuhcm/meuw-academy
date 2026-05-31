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

export const ALL_DATA = { ...M1_DATA, ...M2_DATA, ...M3_DATA };

/**
 * Get full data for a specific day
 * @param {number} day 
 */
export function getCurriculumDay(day) {
  return ALL_DATA[`day${day}`] || null;
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
