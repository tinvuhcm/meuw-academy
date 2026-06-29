import State from './js/state.js';
import { getCurriculumDay } from './js/data/curriculum-loader.js';
import { generateAvatarHTML } from './js/generators.js';

console.log("Active Profile:", State.getActiveProfile().id);
console.log("Current Day:", State.getActiveProfile().currentDay);
console.log("XP:", State.getActiveProfile().xpTotal);
console.log("Items:", State.getActiveProfile().purchasedItems);

console.time('Load 7 Days');
for(let i=16; i<=22; i++) {
  getCurriculumDay(i);
}
console.timeEnd('Load 7 Days');

console.log("Avatar:", generateAvatarHTML('meo', State.getActiveProfile().equippedAccessories, 'idle'));
