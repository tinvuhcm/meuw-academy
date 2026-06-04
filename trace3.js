const fs = require('fs');
let code = fs.readFileSync('./js/data/fresh-curriculum.js', 'utf8');
code = code.replace(
  'function materializeDayCurriculum',
  'function materializeDayCurriculum(dayNumber, dayData, allData, opts = {}) { console.log("Vie catalog size:", catalog["vie"].length); '
);
fs.writeFileSync('./fresh-curriculum.trace.js', code);

const { materializeDayCurriculum } = require('./fresh-curriculum.trace.js');
const { M1_DATA } = require('./js/data/curriculum-m1.js');
const allData = require('./js/data/curriculum-loader.js').ALL_DATA;

global.localStorage = { getItem: () => null, setItem: () => {} };
materializeDayCurriculum(1, M1_DATA.day1, allData);
