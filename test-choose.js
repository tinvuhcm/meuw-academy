const { buildCatalog } = require('./js/data/fresh-curriculum.js');
const allData = require('./js/data/curriculum-loader.js').ALL_DATA;

// We need to extract the chooseTopicEntry function.
// Since it's not exported, we'll just read the file and eval it.
const fs = require('fs');
let code = fs.readFileSync('./js/data/fresh-curriculum.js', 'utf8');

// replace export with regular functions for eval
code = code.replace(/export (const|let|var|function)/g, '$1');
code += '\n\n module.exports = { buildCatalog, chooseTopicEntry };';

fs.writeFileSync('./fresh-eval.js', code);

const { buildCatalog: bc, chooseTopicEntry: cte } = require('./fresh-eval.js');
const catalog = bc(allData);

const daySeen = new Set();
const sessionSeen = new Set();
const ledger = { topicUsage: {} };

for (let i = 0; i < 5; i++) {
  const item = cte({
    subject: 'vie',
    dayNumber: 1,
    moduleIndex: i,
    session: 'am',
    moduleId: 'test-' + i,
    catalog,
    daySeen,
    sessionSeen,
    ledger,
    forcedTopicKey: null,
  });
  if (item) {
    console.log("Selected:", item.topicKey);
    daySeen.add(item.topicKey);
    sessionSeen.add(item.topicKey);
  } else {
    console.log("Failed at", i);
  }
}
