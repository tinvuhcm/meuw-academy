import { pathToFileURL } from 'url';
const stateUrl = pathToFileURL('js/state.js').href;
import(stateUrl).then(m => {
  const state = m.default.getState();
  console.log("Day:", state.profiles[state.activeProfile].currentDay);
});
