import State from './js/state.js';
import { getScheduledModulesForProfileDay } from './js/modules/dashboard.js';
import { getCurriculumDay } from './js/data/curriculum-loader.js';

let profile = State.getActiveProfile();
console.log("Current Day:", profile.currentDay);

const dayData = getCurriculumDay(profile.currentDay);
const scheduled = getScheduledModulesForProfileDay(profile, profile.currentDay, dayData.modules);

console.log("AM Modules for Day 22:", scheduled.allModules.filter(m => m.session === 'am').map(m => m.id + ' isDone: ' + m.isDone));
