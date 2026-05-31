const fs = require('fs');
const path = require('path');
const { EN_DICT, VIE_DICT, SCI_DICT, IT_DICT } = require('./data_banks');

const NUM_DAYS = 90;
const MODULES_AM = 12; // 120 mins
const MODULES_PM = 9;  // 90 mins
const QUESTIONS_PER_MODULE = 10;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getWeightedSubject() {
    const r = Math.random() * 100;
    if (r < 30) return 'math';
    if (r < 55) return 'eng';
    if (r < 70) return 'vie';
    if (r < 90) return 'sci';
    if (r < 95) return 'draw';
    return 'it';
}

const MATH_TOPICS = [
    { name: 'Phép cộng hàng ngàn', op: '+' },
    { name: 'Phép trừ hàng ngàn', op: '-' },
    { name: 'Bảng nhân 2-9', op: '*' },
    { name: 'Phép chia cơ bản', op: '/' },
    { name: 'Phân số cơ bản', op: 'frac' },
    { name: 'Hình học (Chu vi, Diện tích)', op: 'geo' },
    { name: 'Tính nhẩm nhanh', op: 'quick' }
];

const ENG_TOPICS = Object.keys(EN_DICT);
const VIE_TOPICS = Object.keys(VIE_DICT);
const SCI_TOPICS = Object.keys(SCI_DICT);
const IT_TOPICS = Object.keys(IT_DICT);

const DRAW_TOPICS = [
    'Tập những nét cơ bản', 'Nhân vật Conan', 'Nhân vật Poca Poca', 
    'Một số nhân vật cartoon phổ biến', 'Chi tiết cơ thể người: mặt, đầu',
    'Chi tiết cơ thể người: tay chân, tóc', 'Chi tiết cơ thể người: áo, váy', 
    'Dáng người đứng/ngồi', 'Con vật đơn giản', 'Chibi', 'Trái cây phổ biến'
];

function generateMathQuestions(topic, count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const types = ['multiple-choice', 'fill-blank'];
        const type = randomPick(types);
        
        let a, b, eq, ans, explanation, qText;
        if (topic.op === '+') {
            a = randomInt(1000, 9000); b = randomInt(100, 9000);
            ans = a + b; eq = `${a} + ${b}`;
            qText = `Tính tổng: ${eq}`;
        } else if (topic.op === '-') {
            a = randomInt(1000, 9000); b = randomInt(100, a);
            ans = a - b; eq = `${a} - ${b}`;
            qText = `Tính hiệu: ${eq}`;
        } else if (topic.op === '*') {
            a = randomInt(2, 9); b = randomInt(10, 99);
            ans = a * b; eq = `${a} × ${b}`;
            qText = `Kết quả của ${eq} là?`;
        } else if (topic.op === '/') {
            b = randomInt(2, 9); ans = randomInt(10, 99);
            a = b * ans; eq = `${a} : ${b}`;
            qText = `Kết quả của phép chia ${eq} là bao nhiêu?`;
        } else if (topic.op === 'quick') {
            a = randomInt(1, 9) * 10; b = randomInt(1, 9) * 10;
            const isAdd = Math.random() > 0.5;
            if (isAdd) {
                ans = a + b;
                eq = `${a} + ${b}`;
            } else {
                let max = Math.max(a, b);
                let min = Math.min(a, b);
                ans = max - min;
                eq = `${max} - ${min}`;
            }
            qText = `Tính nhẩm: ${eq}`;
        } else if (topic.op === 'frac') {
            const fracTypes = [
                { q: 'Phân số nào lớn hơn: 1/2 hay 1/4?', ans: '1/2', opts: ['1/2', '1/4', 'Bằng nhau'] },
                { q: 'Phân số nào lớn hơn: 1/3 hay 1/5?', ans: '1/3', opts: ['1/3', '1/5', 'Bằng nhau'] },
                { q: 'Phân số nào bé hơn: 1/10 hay 1/2?', ans: '1/10', opts: ['1/10', '1/2', 'Bằng nhau'] },
                { q: 'Một nửa chiếc bánh tương ứng với phân số nào?', ans: '1/2', opts: ['1/2', '1/4', '1/3', '1/8'] }
            ];
            const ft = randomPick(fracTypes);
            questions.push({
                type: 'multiple-choice',
                isMath: true,
                question: ft.q,
                options: shuffle([...ft.opts]),
                answer: ft.ans,
                explanation: `Đáp án đúng là ${ft.ans}.`
            });
            continue;
        } else {
            const c = randomInt(3, 15);
            questions.push({
                type: 'multiple-choice',
                isMath: true,
                question: `Tính chu vi hình vuông có cạnh là ${c}cm?`,
                illustration: `<div class="w-32 h-32 bg-yellow-200 border-4 border-yellow-500 mx-auto flex items-center justify-center font-bold">${c}cm</div>`,
                options: shuffle([`${c*4}cm`, `${c*4 + randomInt(1,5)}cm`, `${c*2}cm`, `${c*c}cm`]),
                answer: `${c*4}cm`,
                explanation: `Chu vi hình vuông = cạnh × 4 = ${c} × 4 = ${c*4}cm.`
            });
            continue;
        }

        if (type === 'fill-blank') {
            questions.push({
                type: 'fill-blank',
                isMath: true,
                question: qText,
                text: `${eq} = [   ]`,
                answer: ans.toString(),
                explanation: `Đáp án đúng là ${ans}.`
            });
        } else {
            questions.push({
                type: 'multiple-choice',
                isMath: true,
                question: qText,
                options: shuffle([
                    ans.toString(),
                    (ans + randomInt(1, 10)).toString(),
                    (ans - randomInt(1, 10)).toString(),
                    (ans + 100).toString()
                ]),
                answer: ans.toString(),
                explanation: `Đáp án đúng là ${ans}.`
            });
        }
    }
    return questions;
}

function generateEngQuestions(topic, count) {
    const dict = EN_DICT[topic];
    if (!dict || dict.length < 2) {
        // fallback
        const fb = EN_DICT['Trái cây & Rau củ'];
        return generateEngQuestionsFallback(fb, count);
    }
    return generateEngQuestionsFallback(dict, count);
}

function generateEngQuestionsFallback(dict, count) {
    const questions = [];
    const types = ['multiple-choice', 'drag-match', 'fill-blank-en'];
    
    for (let i = 0; i < count; i++) {
        const type = randomPick(types);
        const word = randomPick(dict);
        
        if (type === 'drag-match') {
            const numPairs = Math.min(dict.length, 6);
            const selectedWords = shuffle([...dict]).slice(0, numPairs);
            const pairs = selectedWords.map((w, index) => ({
                id: `pair-${i}-${index}`,
                left: w.en,
                right: w.vi
            }));
            questions.push({
                type: 'drag-match',
                question: 'Kéo từ tiếng Anh tương ứng với nghĩa tiếng Việt:',
                pairs: pairs
            });
        } else if (type === 'fill-blank-en' && word.en.length > 3) {
            // Remove one random letter
            const idx = randomInt(1, word.en.length - 2);
            const hidden = word.en.substring(0, idx) + '_' + word.en.substring(idx + 1);
            const missingLetter = word.en[idx];
            questions.push({
                type: 'multiple-choice',
                question: `Chữ cái nào còn thiếu trong từ "${hidden}" (nghĩa là: ${word.vi})?`,
                options: shuffle([missingLetter, String.fromCharCode(missingLetter.charCodeAt(0)+1), String.fromCharCode(missingLetter.charCodeAt(0)-1), 'a']),
                answer: missingLetter,
                explanation: `Từ đúng là ${word.en}.`
            });
        } else {
            // Multiple choice
            const opt2 = randomPick(dict.filter(w => w.en !== word.en)) || dict[0];
            const opt3 = randomPick(dict.filter(w => w.en !== word.en && w.en !== opt2.en)) || dict[0];
            const opt4 = randomPick(dict.filter(w => w.en !== word.en && w.en !== opt2.en && w.en !== opt3.en)) || dict[0];
            
            questions.push({
                type: 'multiple-choice',
                question: `Từ "${word.en}" có nghĩa tiếng Việt là gì?`,
                options: shuffle([word.vi, opt2.vi, opt3.vi, opt4.vi]),
                answer: word.vi,
                explanation: `"${word.en}" nghĩa là ${word.vi}.`
            });
        }
    }
    return questions;
}

function generateDataDictQuestions(dictBank, topic, count) {
    const questions = [];
    let pool = dictBank[topic];
    if (!pool || pool.length === 0) {
        // Fallback to random pick from any pool
        const allKeys = Object.keys(dictBank);
        pool = dictBank[randomPick(allKeys)];
    }
    
    // Create a shuffled pool
    let shuffledPool = shuffle([...pool]);
    
    for (let i = 0; i < count; i++) {
        // Re-shuffle if we run out of questions in the pool
        if (i >= shuffledPool.length) {
            shuffledPool = shuffledPool.concat(shuffle([...pool]));
        }
        
        const qData = shuffledPool[i];
        questions.push({
            type: 'multiple-choice',
            question: qData.q,
            passage: qData.passage || null,
            options: shuffle([...qData.options]),
            answer: qData.ans,
            explanation: qData.explanation || `Tuyệt vời! Đáp án đúng là ${qData.ans}.`
        });
    }
    return questions;
}

function generateModule(dayIndex, session, moduleIdx, usedTopics) {
    let subject = getWeightedSubject();
    let topicName = '';
    let topicObj = null;
    let questions = [];

    const numQ = subject === 'draw' ? 1 : QUESTIONS_PER_MODULE;

    if (subject === 'math') {
        const available = MATH_TOPICS.filter(t => !usedTopics.math.includes(t.name));
        topicObj = randomPick(available) || randomPick(MATH_TOPICS);
        topicName = topicObj.name;
        usedTopics.math.push(topicName);
        questions = generateMathQuestions(topicObj, numQ);
    } else if (subject === 'eng') {
        const available = ENG_TOPICS.filter(t => !usedTopics.eng.includes(t));
        topicName = randomPick(available) || randomPick(ENG_TOPICS);
        usedTopics.eng.push(topicName);
        topicObj = topicName;
        questions = generateEngQuestions(topicName, numQ);
    } else if (subject === 'vie') {
        const available = VIE_TOPICS.filter(t => !usedTopics.vie.includes(t));
        topicName = randomPick(available) || randomPick(VIE_TOPICS);
        usedTopics.vie.push(topicName);
        topicObj = topicName;
        questions = generateDataDictQuestions(VIE_DICT, topicName, numQ);
    } else if (subject === 'sci') {
        const available = SCI_TOPICS.filter(t => !usedTopics.sci.includes(t));
        topicName = randomPick(available) || randomPick(SCI_TOPICS);
        usedTopics.sci.push(topicName);
        topicObj = topicName;
        questions = generateDataDictQuestions(SCI_DICT, topicName, numQ);
    } else if (subject === 'it') {
        const available = IT_TOPICS.filter(t => !usedTopics.it.includes(t));
        topicName = randomPick(available) || randomPick(IT_TOPICS);
        usedTopics.it.push(topicName);
        topicObj = topicName;
        questions = generateDataDictQuestions(IT_DICT, topicName, numQ);
    } else if (subject === 'draw') {
        const available = DRAW_TOPICS.filter(t => !usedTopics.draw.includes(t));
        topicName = randomPick(available) || randomPick(DRAW_TOPICS);
        usedTopics.draw.push(topicName);
        topicObj = topicName;
        questions = [{
            type: 'drawing-canvas',
            question: `Bé hãy vẽ thật đẹp chủ đề: ${topicName}`,
            hint: `Sử dụng các công cụ vẽ để sáng tạo nhé!`
        }];
    }

    const subTitles = {
        'math': 'Toán', 'eng': 'Tiếng Anh', 'vie': 'Tiếng Việt',
        'sci': 'Khoa Học', 'draw': 'Mỹ Thuật', 'it': 'Tin Học'
    };

    return {
        id: `d${dayIndex}-${session}-${moduleIdx}`,
        session: session,
        subject: subject,
        title: `${subTitles[subject]}: ${topicName}`,
        xp: subject === 'draw' ? 100 : 50,
        questions: questions
    };
}

function generateDay(dayIndex) {
    const day = {
        title: `Ngày ${dayIndex}: Khám phá tri thức mới`,
        modules: []
    };

    let usedTopicsAM = { math: [], eng: [], vie: [], sci: [], it: [], draw: [] };
    let usedTopicsPM = { math: [], eng: [], vie: [], sci: [], it: [], draw: [] };

    for (let i = 1; i <= MODULES_AM; i++) {
        day.modules.push(generateModule(dayIndex, 'am', i, usedTopicsAM));
    }
    for (let i = 1; i <= MODULES_PM; i++) {
        day.modules.push(generateModule(dayIndex, 'pm', i, usedTopicsPM));
    }

    return day;
}

function generateMonth(startDay, endDay, monthIndex) {
    let output = `/**\n * Méo ACADEMY — curriculum-m${monthIndex}.js\n * Month ${monthIndex} (Days ${startDay}-${endDay})\n */\n\nexport const M${monthIndex}_DATA = {\n`;
    for (let d = startDay; d <= endDay; d++) {
        const dayData = generateDay(d);
        output += `  day${d}: ${JSON.stringify(dayData, null, 4)}`;
        if (d !== endDay) output += ',\n';
    }
    output += `\n};\n`;
    
    fs.writeFileSync(path.join(__dirname, `../js/data/curriculum-m${monthIndex}.js`), output, 'utf8');
    console.log(`Generated curriculum-m${monthIndex}.js (Days ${startDay}-${endDay})`);
}

generateMonth(1, 30, 1);
generateMonth(31, 60, 2);
generateMonth(61, 90, 3);
