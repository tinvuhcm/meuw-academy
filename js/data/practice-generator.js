/**
 * MEUW ACADEMY — practice-generator.js
 * Generates endless practice questions on the fly by picking from the main curriculum
 */

import { randomPick, shuffle } from '../utils.js';
import { ALL_DATA } from './curriculum-loader.js';

export function generatePracticeModule(numQuestions = 20, category = 'all') {
    let allModules = [];
    
    // Flatten all modules from all days
    Object.values(ALL_DATA).forEach(day => {
        allModules.push(...day.modules);
    });

    // Filter by category
    if (category !== 'all') {
        if (category === 'other') {
            allModules = allModules.filter(m => m.subject === 'draw' || m.subject === 'it');
        } else {
            allModules = allModules.filter(m => m.subject === category);
        }
    }

    if (allModules.length === 0) {
        // Fallback if none found
        allModules = Object.values(ALL_DATA)[0].modules; 
    }

    let allQuestions = [];
    allModules.forEach(m => {
        if (m.questions && Array.isArray(m.questions)) {
            allQuestions.push(...m.questions);
        }
    });

    // Pick numQuestions randomly
    const selected = shuffle([...allQuestions]).slice(0, numQuestions);

    let title = 'Kiến Thức Chung';
    if (category === 'math') title = 'Luyện Tập Toán';
    if (category === 'vie') title = 'Luyện Tập Tiếng Việt';
    if (category === 'eng') title = 'Luyện Tập Tiếng Anh';
    if (category === 'sci') title = 'Luyện Tập Khoa Học';
    if (category === 'other') title = 'Luyện Tập Kỹ Năng';

    return {
        id: `practice-${category}-${Date.now()}`,
        subject: category === 'all' ? 'mixed' : category,
        title: title,
        session: 'practice',
        xp: 25, // Lower XP for practice
        questions: selected
    };
}
