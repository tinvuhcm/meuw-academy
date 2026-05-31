const fs = require('fs');
const path = require('path');

const NUM_DAYS = 90;
const MODULES_AM = 24;
const MODULES_PM = 18;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMathQuestion(day) {
    const types = ['multiple-choice', 'fill-blank', 'drag-match'];
    const type = randomPick(types);
    const a = randomInt(10, 99) * (day % 10 + 1);
    const b = randomInt(10, 99) * (day % 10 + 1);
    const isAdd = Math.random() > 0.5;
    const ans = isAdd ? a + b : Math.abs(a - b);
    const eq = `${a} ${isAdd ? '+' : '-'} ${isAdd ? b : Math.min(a,b)}`;

    if (type === 'fill-blank') {
        return {
            type: 'fill-blank',
            question: `Điền kết quả đúng vào ô trống:`,
            text: `${eq} = [   ]`,
            illustration: `<div class="text-center text-4xl my-4">🧮 ${eq}</div>`,
            answer: ans.toString(),
            explanation: `Đáp án đúng là ${ans}.`
        };
    } else if (type === 'drag-match') {
        return {
            type: 'drag-match',
            question: 'Kéo kết quả vào đúng phép tính:',
            pairs: [
                { left: eq, right: ans.toString() },
                { left: `${a+10} + 10`, right: (a+20).toString() }
            ]
        };
    }

    // Default multiple-choice
    return {
        type: 'multiple-choice',
        question: `Hãy tính: ${eq}`,
        illustration: `<div class="text-center text-4xl my-4">🧮 ${eq}</div>`,
        options: [
            ans.toString(),
            (ans + 10).toString(),
            (ans - 10).toString(),
            (ans + 100).toString()
        ].sort(() => 0.5 - Math.random()),
        answer: ans.toString(),
        explanation: `Đáp án đúng là ${ans}.`
    };
}

function generateEngQuestion() {
    const types = ['multiple-choice', 'speech-practice', 'drag-match'];
    const type = randomPick(types);
    
    const words = [
        { en: 'Elephant', vi: 'Con voi' },
        { en: 'Lion', vi: 'Sư tử' },
        { en: 'Tiger', vi: 'Con hổ' },
        { en: 'Monkey', vi: 'Con khỉ' },
        { en: 'Giraffe', vi: 'Hươu cao cổ' },
        { en: 'Zebra', vi: 'Ngựa vằn' }
    ];
    const word = randomPick(words);
    
    if (type === 'speech-practice') {
        return {
            type: 'speech-practice',
            question: 'Hãy đọc to từ vựng sau:',
            targetText: word.en,
            hint: `Nghĩa là: ${word.vi}`
        };
    } else if (type === 'drag-match') {
        const w2 = randomPick(words.filter(w => w !== word));
        return {
            type: 'drag-match',
            question: 'Kéo từ tiếng Anh tương ứng với nghĩa tiếng Việt:',
            pairs: [
                { left: word.en, right: word.vi },
                { left: w2.en, right: w2.vi }
            ]
        };
    }

    return {
        type: 'multiple-choice',
        question: `Từ "${word.en}" có nghĩa tiếng Việt là gì?`,
        illustration: `<div class="text-center text-4xl my-4">📖 ${word.en}</div>`,
        options: [
            word.vi,
            words[(words.indexOf(word) + 1) % words.length].vi,
            words[(words.indexOf(word) + 2) % words.length].vi,
            words[(words.indexOf(word) + 3) % words.length].vi
        ].sort(() => 0.5 - Math.random()),
        answer: word.vi,
        explanation: `"${word.en}" nghĩa là ${word.vi}.`
    };
}

function generateCreativeQuestion() {
    return {
        type: 'drawing-canvas',
        question: 'Hãy vẽ một bức tranh thật đẹp để giải lao nhé!',
        hint: 'Vẽ một con vật mà em thích nhất.'
    };
}

function generateQuestion(subject, day) {
    if (Math.random() < 0.05) return generateCreativeQuestion(); // 5% chance of drawing canvas
    if (subject === 'math') return generateMathQuestion(day);
    if (subject === 'eng') return generateEngQuestion();
    return generateMathQuestion(day); 
}

function generateDay(dayIndex) {
    const day = {
        title: `Ngày ${dayIndex}: Khám phá tri thức mới`,
        modules: []
    };

    for (let i = 1; i <= MODULES_AM; i++) {
        const subject = i % 2 === 0 ? 'math' : 'eng';
        day.modules.push({
            id: `d${dayIndex}-am-${i}`,
            session: 'am',
            subject: subject,
            title: `Bài học ${subject === 'math' ? 'Toán' : 'Tiếng Anh'} sáng ${i}`,
            xp: 50,
            questions: [
                generateQuestion(subject, dayIndex),
                generateQuestion(subject, dayIndex)
            ]
        });
    }

    for (let i = 1; i <= MODULES_PM; i++) {
        const subject = i % 2 === 0 ? 'math' : 'eng';
        day.modules.push({
            id: `d${dayIndex}-pm-${i}`,
            session: 'pm',
            subject: subject,
            title: `Bài học ${subject === 'math' ? 'Toán' : 'Tiếng Anh'} chiều ${i}`,
            xp: 50,
            questions: [
                generateQuestion(subject, dayIndex),
                generateQuestion(subject, dayIndex)
            ]
        });
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
    console.log(`Generated curriculum-m${monthIndex}.js`);
}

generateMonth(1, 30, 1);
generateMonth(31, 60, 2);
generateMonth(61, 90, 3);
