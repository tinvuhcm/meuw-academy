/**
 * MEUW ACADEMY — practice-generator.js
 * Generates endless practice questions on the fly
 */

import { randomPick } from '../utils.js';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathQuestion() {
    const types = ['multiple-choice', 'fill-blank', 'drag-match'];
    const type = randomPick(types);
    const multiplier = randomInt(1, 10);
    const a = randomInt(10, 99) * multiplier;
    const b = randomInt(10, 99) * multiplier;
    const isAdd = Math.random() > 0.5;
    const ans = isAdd ? a + b : Math.abs(a - b);
    const eq = `${a} ${isAdd ? '+' : '-'} ${isAdd ? b : Math.min(a, b)}`;

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
                { left: `${a + 10} + 10`, right: (a + 20).toString() }
            ]
        };
    }

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
        { en: 'Elephant', vi: 'Con voi' }, { en: 'Lion', vi: 'Sư tử' },
        { en: 'Tiger', vi: 'Con hổ' }, { en: 'Monkey', vi: 'Con khỉ' },
        { en: 'Giraffe', vi: 'Hươu cao cổ' }, { en: 'Zebra', vi: 'Ngựa vằn' },
        { en: 'Apple', vi: 'Quả táo' }, { en: 'Banana', vi: 'Quả chuối' },
        { en: 'Orange', vi: 'Quả cam' }, { en: 'Grapes', vi: 'Quả nho' },
        { en: 'Car', vi: 'Ô tô' }, { en: 'Bicycle', vi: 'Xe đạp' }
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

export function generatePracticeModule(numQuestions = 10) {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
        if (Math.random() > 0.5) {
            questions.push(generateMathQuestion());
        } else {
            questions.push(generateEngQuestion());
        }
    }
    
    // Add one drawing/creative question at the end sometimes
    if (Math.random() < 0.3) {
        questions.push({
            type: 'drawing-canvas',
            question: 'Hãy vẽ một bức tranh thật đẹp nhé!',
            hint: 'Vẽ bất cứ thứ gì em thích.'
        });
    }

    return {
        id: `practice-${Date.now()}`,
        subject: 'mixed',
        title: 'Luyện Tập Ngẫu Nhiên',
        session: 'practice',
        xp: 25, // Lower XP for practice
        questions: questions
    };
}
