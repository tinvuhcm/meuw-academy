const fs = require('fs');
let code = fs.readFileSync('./js/data/fresh-curriculum.js', 'utf8');

code = code.replace(
  'if (candidateQuestions.length >= 4 || subject === subjectOrder[subjectOrder.length - 1]) {',
  'if (index === 11 && subject === "vie") { console.log("VIE AT 11:", candidateQuestions.length, candidateQuestions.map(q => q.question)); }\nif (candidateQuestions.length >= 4 || subject === subjectOrder[subjectOrder.length - 1]) {'
);

code = code.replace(
  'const subjectOrder = forcedTopicKey',
  'const subjectOrder = forcedTopicKey'
); // noop

code = code.replace(
  'let chosenEntry = null;',
  'if (index === 11) console.log("SUBJECT ORDER 11:", subjectOrder);\nlet chosenEntry = null;'
);

fs.writeFileSync('./fresh-curriculum.trace.js', code);

// Now load it
const { materializeDayCurriculum } = require('./fresh-curriculum.trace.js');
const { M1_DATA } = require('./js/data/curriculum-m1.js');
const allData = require('./js/data/curriculum-loader.js').ALL_DATA;

global.localStorage = { getItem: () => null, setItem: () => {} };
materializeDayCurriculum(1, JSON.parse(JSON.stringify(M1_DATA.day1)), allData);
