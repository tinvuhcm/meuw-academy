global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

global.window = {
  dispatchEvent: () => {}
};

import State from './js/state.js';
import { getCurriculumDay } from './js/data/curriculum-loader.js';
import { getScheduledModulesForProfileDay } from './js/modules/dashboard.js';

let profile = State.getActiveProfile();
console.log("Current Day:", profile.currentDay);

const dayData = getCurriculumDay(profile.currentDay);
const scheduled = getScheduledModulesForProfileDay(profile, profile.currentDay, dayData.modules);

console.log("AM Modules for Day", profile.currentDay, ":", scheduled.allModules.filter(m => m.session === 'am').map(m => m.id + ' isDone: ' + m.isDone));
