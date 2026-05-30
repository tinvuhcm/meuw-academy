/**
 * MEUW ACADEMY — MiniQuiz.js
 * Question Type: Multi-question wrapper (Review mode)
 */

import { el, animateClass, sleep } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';
import { renderMultipleChoice } from './MultipleChoice.js';
import { renderFillBlank } from './FillBlank.js';
import { renderDragMatch } from './DragMatch.js';

export function renderMiniQuiz(qData, onComplete) {
  const container = el('div', { class: 'question-wrapper quiz-wrapper' });
  
  const questions = qData.questions || [];
  const total = questions.length;
  if (total === 0) {
    onComplete(true, 0);
    return container;
  }

  let currentIndex = 0;
  let score = 0;
  let totalXP = 0;
  const reviewData = [];

  // 1. Header (Progress)
  const header = el('div', { class: 'mini-quiz-header' });
  const counter = el('div', { class: 'mini-quiz-counter' }, `1 / ${total}`);
  const progressBg = el('div', { class: 'mini-quiz-progress' });
  const progressFill = el('div', { class: 'mini-quiz-progress-fill', style: { width: `${(1/total)*100}%` } });
  
  progressBg.appendChild(progressFill);
  header.appendChild(counter);
  header.appendChild(progressBg);
  
  const scoreDisplay = el('div', { class: 'mini-quiz-score' }, `0 ⭐`);
  header.appendChild(scoreDisplay);

  container.appendChild(header);

  // 2. Body
  const body = el('div', { class: 'quiz-body mt-4' });
  container.appendChild(body);

  // Load first
  loadQuestion(0);

  function loadQuestion(index) {
    body.innerHTML = ''; // clear
    counter.textContent = `${index + 1} / ${total}`;
    progressFill.style.width = `${((index + 1) / total) * 100}%`;

    const q = questions[index];
    let qEl = null;

    const handleAnswer = (isCorrect, xpEarned) => {
      totalXP += xpEarned || 0;
      
      // Store review data
      if (!isCorrect) {
        reviewData.push(q);
      } else {
        score++;
        scoreDisplay.textContent = `${score} ⭐`;
        animateClass(scoreDisplay, 'pulse', 500);
      }

      currentIndex++;
      if (currentIndex < total) {
        loadQuestion(currentIndex);
      } else {
        showResults();
      }
    };

    // Dispatch to correct renderer
    switch (q.type) {
      case 'multiple-choice':
        qEl = renderMultipleChoice(q, handleAnswer); break;
      case 'fill-blank':
        qEl = renderFillBlank(q, handleAnswer); break;
      case 'drag-match':
        qEl = renderDragMatch(q, handleAnswer); break;
      default:
        // Fallback to MC
        qEl = renderMultipleChoice(q, handleAnswer); break;
    }

    // Remove MC's own title if it's redundant, but usually it's fine
    body.appendChild(qEl);
  }

  function showResults() {
    body.innerHTML = '';
    header.style.display = 'none';

    const resultBox = el('div', { class: 'quiz-result' });
    
    // Score Big
    const scoreRow = el('div', { class: 'quiz-result-score' });
    scoreRow.innerHTML = `<span class="quiz-score-big">${score}</span><span class="quiz-score-total">/ ${total}</span>`;
    resultBox.appendChild(scoreRow);

    // Message
    const pct = score / total;
    let msg = 'Rất tốt!';
    let state = 'happy';
    
    if (pct === 1) {
      msg = 'Tuyệt đỉnh! Hoàn hảo 100%! 🌟';
      state = 'excited';
      Audio.levelUp();
    } else if (pct >= 0.7) {
      msg = 'Giỏi quá! Cố lên chút nữa nhé! 🔥';
      state = 'happy';
      Audio.complete();
    } else {
      msg = 'Không sao, lần sau sẽ tốt hơn! 💪';
      state = 'encouraging';
      Audio.streak();
    }

    triggerMascot('quiz:perfect', { customLines: [msg], duration: 4000 });
    
    const msgEl = el('div', { class: 'quiz-result-message mt-4' }, msg);
    resultBox.appendChild(msgEl);

    // Review Wrong Answers
    if (reviewData.length > 0) {
      const reviewBox = el('div', { class: 'quiz-review mt-6' });
      reviewBox.appendChild(el('h3', { class: 'text-xl font-bold mb-4 text-meuw-purple' }, 'Cùng xem lại nhé:'));
      
      reviewData.forEach(rq => {
        const item = el('div', { class: 'quiz-review-item' });
        item.appendChild(el('div', { class: 'quiz-review-question' }, rq.question));
        
        let ansText = rq.answer || '';
        if (rq.type === 'fill-blank') {
          ansText = rq.blanks.map(b => b.answer).join(', ');
        } else if (rq.type === 'drag-match') {
          ansText = 'Ghép đúng các cặp';
        }
        
        item.appendChild(el('div', { class: 'quiz-review-correct' }, `Đáp án đúng: ${ansText}`));
        
        if (rq.explanation) {
          item.appendChild(el('div', { class: 'text-sm mt-2 text-text-muted italic' }, rq.explanation));
        }
        
        reviewBox.appendChild(item);
      });
      resultBox.appendChild(reviewBox);
    }

    // Finish Button
    const btn = el('button', { class: 'btn btn-cta mt-8' }, 'Hoàn thành Bài Kiểm Tra');
    btn.addEventListener('click', () => {
      Audio.click();
      // Add bonus XP for completion
      const bonusXP = pct === 1 ? 50 : 20;
      onComplete(true, totalXP + bonusXP);
    });
    
    resultBox.appendChild(btn);
    body.appendChild(resultBox);
  }

  return container;
}
