const fs = require('fs');
let code = fs.readFileSync('./js/data/fresh-curriculum.js', 'utf8');
code = code.replace(
  'function chooseTopicEntry(opts) {',
  'function chooseTopicEntry(opts) { if(opts.subject==="vie") console.log("choose vie, minQs:", opts.sciWorldOnly ? 4 : (TARGET_QUESTION_COUNT[opts.subject] || 1), "daySeen:", opts.daySeen.size);'
);
code = code.replace(
  'for (let i = 0; i < passes.length; i++) {',
  'for (let i = 0; i < passes.length; i++) { let passedItems = pool.filter(passes[i]); if(opts.subject==="vie") console.log("vie pass", i, "items:", passedItems.length);'
);
fs.writeFileSync('./fresh-curriculum.trace.js', code);

const { materializeDayCurriculum } = require('./fresh-curriculum.trace.js');
const { M1_DATA } = require('./js/data/curriculum-m1.js');
const allData = require('./js/data/curriculum-loader.js').ALL_DATA;

global.localStorage = { getItem: () => null, setItem: () => {} };
materializeDayCurriculum(1, M1_DATA.day1, allData);
