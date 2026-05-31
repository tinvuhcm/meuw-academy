const fs = require('fs');
const path = require('path');

const NUM_DAYS = 90;
const MODULES_AM = 12; // 120 mins
const MODULES_PM = 9;  // 90 mins
const QUESTIONS_PER_MODULE = 10;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// WEIGHTED PICKER
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
    { name: 'Hình học (Chu vi, Diện tích)', op: 'geo' }
];

const ENG_TOPICS = [
    'Động vật hoang dã', 'Cơ thể người', 'Trái cây & Rau củ', 
    'Nghề nghiệp', 'Màu sắc & Hình khối', 'Gia đình', 'Phương tiện giao thông'
];

const VIE_TOPICS = [
    'Đọc hiểu: Chuyện cổ tích', 'Chính tả: Phân biệt ch/tr', 'Từ trái nghĩa, đồng nghĩa', 
    'Cấu tạo câu: Chủ ngữ - Vị ngữ', 'Luyện từ và câu'
];

const SCI_TOPICS = [
    'Vương Quốc Động Vật', 'Trái Đất & Thiên Nhiên', 'Khoa Học & Phát Minh',
    'Cơ thể người', 'Hệ Mặt Trời', 'Bảo vệ Môi trường', 'Thế giới Thực vật'
];

const DRAW_TOPICS = [
    'Nét cơ bản', 'Gương mặt Chibi', 'Con vật đơn giản', 
    'Nhân vật Conan', 'Trái cây phổ biến', 'Dáng người đứng/ngồi'
];

const IT_TOPICS = [
    'Máy tính là gì?', 'Sử dụng chuột và bàn phím', 'An toàn trên mạng', 
    'Tìm kiếm thông tin'
];

function generateMathQuestion(topic) {
    const types = ['multiple-choice', 'fill-blank', 'drag-match'];
    const type = randomPick(types);
    
    let a, b, eq, ans;
    if (topic.op === '+') {
        a = randomInt(1000, 9000); b = randomInt(100, 9000);
        ans = a + b; eq = `${a} + ${b}`;
    } else if (topic.op === '-') {
        a = randomInt(1000, 9000); b = randomInt(100, a);
        ans = a - b; eq = `${a} - ${b}`;
    } else if (topic.op === '*') {
        a = randomInt(2, 9); b = randomInt(10, 99);
        ans = a * b; eq = `${a} × ${b}`;
    } else if (topic.op === '/') {
        b = randomInt(2, 9); ans = randomInt(10, 99);
        a = b * ans; eq = `${a} : ${b}`;
    } else if (topic.op === 'frac') {
        return {
            type: 'multiple-choice',
            question: 'Phân số nào lớn hơn?',
            illustration: `<div class="text-4xl text-center">1/2 hay 1/4?</div>`,
            options: ['1/2', '1/4', 'Bằng nhau', 'Không thể so sánh'],
            answer: '1/2',
            explanation: '1/2 là một nửa, lớn hơn 1/4 là một phần tư.'
        };
    } else {
        return {
            type: 'multiple-choice',
            question: 'Tính chu vi hình vuông cạnh 5cm?',
            illustration: `<div class="w-32 h-32 bg-yellow-200 border-4 border-yellow-500 mx-auto flex items-center justify-center font-bold">5cm</div>`,
            options: ['20cm', '25cm', '10cm', '15cm'],
            answer: '20cm',
            explanation: 'Chu vi = cạnh x 4 = 5 x 4 = 20.'
        };
    }

    if (type === 'fill-blank') {
        return {
            type: 'fill-blank',
            question: `Tính: ${eq} = ?`,
            text: `${eq} = [   ]`,
            answer: ans.toString(),
            explanation: `Đáp án đúng là ${ans}.`
        };
    }

    return {
        type: 'multiple-choice',
        question: `Kết quả của ${eq} là bao nhiêu?`,
        options: [
            ans.toString(),
            (ans + randomInt(1, 10)).toString(),
            (ans - randomInt(1, 10)).toString(),
            (ans + 100).toString()
        ].sort(() => 0.5 - Math.random()),
        answer: ans.toString(),
        explanation: `Đáp án đúng là ${ans}.`
    };
}

function generateEngQuestion(topic) {
    const type = randomPick(['multiple-choice', 'speech-practice']);
    
    // Simplistic mock data
    if (type === 'speech-practice') {
        return {
            type: 'speech-practice',
            question: `Đọc to từ vựng chủ đề: ${topic}`,
            targetText: 'Hello',
            hint: `Thử đọc rõ chữ nhé!`
        };
    }

    return {
        type: 'multiple-choice',
        question: `Từ nào thuộc chủ đề ${topic}?`,
        options: ['Apple', 'Run', 'Blue', 'Cat'].sort(() => 0.5 - Math.random()),
        answer: 'Apple',
        explanation: 'Apple là từ đúng.'
    };
}

function generateGenericQuestion(subject, topic) {
    return {
        type: 'multiple-choice',
        question: `Câu hỏi ôn tập: ${topic}`,
        options: ['Đáp án A', 'Đáp án đúng', 'Đáp án C', 'Đáp án D'].sort(() => 0.5 - Math.random()),
        answer: 'Đáp án đúng',
        explanation: `Tuyệt vời!`
    };
}

function generateCreativeQuestion(topic) {
    return {
        type: 'drawing-canvas',
        question: `Bé hãy tập vẽ: ${topic}`,
        hint: `Cố gắng vẽ theo mẫu hoặc tự sáng tạo nhé.`
    };
}

function generateQuestion(subject, topic) {
    if (subject === 'math') return generateMathQuestion(topic);
    if (subject === 'eng') return generateEngQuestion(topic);
    if (subject === 'draw') return generateCreativeQuestion(topic);
    return generateGenericQuestion(subject, topic);
}

function generateModule(dayIndex, session, moduleIdx) {
    const subject = getWeightedSubject();
    let topicName = '';
    let topicObj = null;

    if (subject === 'math') {
        topicObj = randomPick(MATH_TOPICS);
        topicName = topicObj.name;
    } else if (subject === 'eng') {
        topicName = randomPick(ENG_TOPICS);
        topicObj = topicName;
    } else if (subject === 'vie') {
        topicName = randomPick(VIE_TOPICS);
        topicObj = topicName;
    } else if (subject === 'sci') {
        topicName = randomPick(SCI_TOPICS);
        topicObj = topicName;
    } else if (subject === 'draw') {
        topicName = randomPick(DRAW_TOPICS);
        topicObj = topicName;
    } else {
        topicName = randomPick(IT_TOPICS);
        topicObj = topicName;
    }

    const subTitles = {
        'math': 'Toán', 'eng': 'Tiếng Anh', 'vie': 'Tiếng Việt',
        'sci': 'Khoa Học', 'draw': 'Mỹ Thuật', 'it': 'Tin Học'
    };

    const qList = [];
    // Number of questions = 10, except drawing which is 1
    const numQ = subject === 'draw' ? 1 : QUESTIONS_PER_MODULE;
    for (let i = 0; i < numQ; i++) {
        qList.push(generateQuestion(subject, topicObj));
    }

    return {
        id: `d${dayIndex}-${session}-${moduleIdx}`,
        session: session,
        subject: subject,
        title: `${subTitles[subject]}: ${topicName}`,
        xp: subject === 'draw' ? 100 : 50,
        questions: qList
    };
}

function generateDay(dayIndex) {
    const day = {
        title: `Ngày ${dayIndex}: Khám phá tri thức`,
        modules: []
    };

    for (let i = 1; i <= MODULES_AM; i++) {
        day.modules.push(generateModule(dayIndex, 'am', i));
    }
    for (let i = 1; i <= MODULES_PM; i++) {
        day.modules.push(generateModule(dayIndex, 'pm', i));
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
