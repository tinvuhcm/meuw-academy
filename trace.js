const { materializeDayCurriculum } = require('./js/data/fresh-curriculum.js');
const { M1_DATA } = require('./js/data/curriculum-m1.js');
const allData = require('./js/data/curriculum-loader.js').ALL_DATA;

global.localStorage = { getItem: () => null, setItem: () => {} };

const currSum = materializeDayCurriculum(1, M1_DATA.day1, allData);
console.log(currSum.modules.map((m, i) => m.subject + '(' + m.session + '-' + i + ')').join(', '));
