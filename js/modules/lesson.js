/**
 * MEUW ACADEMY — lesson.js
 * Lesson Orchestrator Screen (handles question flow)
 */

import { el, animateClass, sleep, getSubjectConfig } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { getModuleData } from '../data/curriculum-loader.js';
import { generatePracticeModule } from '../data/practice-generator.js';
import { Mascot, triggerMascot } from '../mascot.js';
import { Audio } from '../audio.js';
import Confetti from '../confetti.js';

// Question renderers
import { renderMultipleChoice } from './question-types/MultipleChoice.js';
import { renderFillBlank } from './question-types/FillBlank.js';
import { renderDragMatch } from './question-types/DragMatch.js';
import { renderInteractiveSVG } from './question-types/InteractiveSVG.js';
import { renderSpeechPractice } from './question-types/SpeechPractice.js';
import { renderDrawingCanvas } from './question-types/DrawingCanvas.js';
import { renderColorFill } from './question-types/ColorFill.js';
import { renderMiniQuiz } from './question-types/MiniQuiz.js';

export function renderLesson(params) {
  const isRandomPractice = params.dayId === 'practice';
  const dayId = isRandomPractice ? 'practice' : parseInt(params.dayId, 10);
  const moduleId = params.moduleId;
  
  const moduleData = isRandomPractice ? generatePracticeModule(20, moduleId) : getModuleData(dayId, moduleId);
  const container = el('div', { class: 'page-container lesson-container' });

  if (!moduleData) {
    container.innerHTML = '<div class="text-center mt-10">Lỗi: Không tìm thấy bài học!</div>';
    return container;
  }

  // --- Layout Setup ---
  // A clean layout without the global app-header, focusing on content.
  const layout = el('div', { class: 'lesson-layout grid gap-4' });

  // 1. Sidebar (Mascot & Progress)
  const sidebar = el('div', { class: 'lesson-sidebar sticky top-4 flex flex-col gap-4' });
  
  // Back / Leave button
  const leaveBtn = el('button', { class: 'btn btn-outline btn-pop text-sm w-full' }, '← Rời khỏi bài học');
  leaveBtn.addEventListener('click', () => {
    Audio.click();
    if (confirm('Em có chắc muốn rời khỏi bài học này? Mọi kết quả từ đầu bài sẽ bị mất.')) {
      Router.back(); // Or Router.navigate(`/session/${dayId}/${moduleData.session}`)
    }
  });
  sidebar.appendChild(leaveBtn);

  // Mascot area
  const mascotArea = el('div', { class: 'lesson-mascot-area mascot-xl relative mt-4' });
  mascotArea.innerHTML = `
    <div class="mascot-container" data-mascot></div>
    <div class="speech-bubble" data-speech-bubble></div>
  `;
  sidebar.appendChild(mascotArea);
  
  // Progress Dots
  const numQuestions = moduleData.questions.length;
  const progressBox = el('div', { class: 'card mt-4' });
  progressBox.innerHTML = '<div class="text-sm font-bold text-text-muted mb-2 text-center">Tiến trình</div>';
  const dotsContainer = el('div', { class: 'flex flex-wrap justify-center gap-2' });
  
  const dots = [];
  for (let i = 0; i < numQuestions; i++) {
    const dot = el('div', { class: 'w-4 h-4 rounded-full bg-border transition-colors duration-300' });
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }
  progressBox.appendChild(dotsContainer);
  sidebar.appendChild(progressBox);

  // 2. Main Card Area
  const mainArea = el('div', { class: 'lesson-main flex-1' });
  const card = el('div', { class: 'card lesson-card p-6 md:p-8 min-h-[500px] flex flex-col' });
  mainArea.appendChild(card);

  layout.appendChild(sidebar);
  layout.appendChild(mainArea);
  container.appendChild(layout);

  // --- Logic ---
  let currentIndex = 0;
  let xpEarnedTotal = 0;
  const startTime = Date.now();

  function loadQuestion(index) {
    card.innerHTML = ''; // clear previous
    
    // Update dots
    dots.forEach((d, i) => {
      d.className = 'w-4 h-4 rounded-full transition-colors duration-300 ';
      if (i < index) d.className += 'bg-correct';
      else if (i === index) d.className += 'bg-méo-purple animate-pulse';
      else d.className += 'bg-border';
    });

    if (index >= numQuestions) {
      showCompletion();
      return;
    }

    const q = moduleData.questions[index];
    let qEl = null;

    const isAlreadyCompleted = State.isModuleComplete(moduleData.id);
    const handleComplete = (isCorrect, xp) => {
      // Only award XP if the module wasn't previously completed
      if (isCorrect && xp && !isAlreadyCompleted) {
        xpEarnedTotal += xp;
        State.addXP(xp); // Add immediately
      }
      currentIndex++;
      loadQuestion(currentIndex);
    };

    // Mascot intro for specific types
    if (q.type === 'drawing-canvas') Mascot.startDrawing();
    else if (q.type === 'speech-practice') triggerMascot('thinking');
    else triggerMascot('idle');

    switch (q.type) {
      case 'multiple-choice': qEl = renderMultipleChoice(q, handleComplete); break;
      case 'fill-blank': qEl = renderFillBlank(q, handleComplete); break;
      case 'drag-match': qEl = renderDragMatch(q, handleComplete); break;
      case 'interactive-svg': qEl = renderInteractiveSVG(q, handleComplete); break;
      case 'speech-practice': qEl = renderSpeechPractice(q, handleComplete); break;
      case 'drawing-canvas': qEl = renderDrawingCanvas(q, handleComplete); break;
      case 'color-fill': qEl = renderColorFill(q, handleComplete); break;
      case 'mini-quiz': qEl = renderMiniQuiz(q, handleComplete); break;
      default: 
        qEl = el('div', {}, 'Loại câu hỏi không được hỗ trợ: ' + q.type);
        const next = el('button', { class: 'btn btn-cta' }, 'Bỏ qua');
        next.addEventListener('click', () => handleComplete(true, 0));
        qEl.appendChild(next);
        break;
    }

    card.appendChild(qEl);
  }

  function showCompletion() {
    Audio.complete();
    Confetti.burst();
    triggerMascot('module:complete');

    const isAlreadyCompleted = State.isModuleComplete(moduleData.id);
    
    if (!isAlreadyCompleted) {
      // Mark complete only if it's the first time
      const timeSpentMs = Date.now() - startTime;
      State.markModuleComplete(moduleData.id, {
        score: numQuestions, // simplify for now
        total: numQuestions,
        timeMs: timeSpentMs,
        xp: xpEarnedTotal
      });
    }

    card.innerHTML = '';
    const compBox = el('div', { class: 'flex flex-col items-center justify-center flex-1 text-center py-10' });
    
    const title = el('h2', { class: 'completion-title font-display text-4xl text-méo-purple mb-4' }, 'Hoàn thành!');
    const xpText = el('div', { class: 'text-2xl font-bold text-warning mb-8 flex items-center gap-2' }, 
      isAlreadyCompleted ? `Ôn tập hoàn tất! 🌟` : `+${xpEarnedTotal} ⭐ <span class="text-3xl">🌟</span>`
    );
    
    // Check if badges were earned
    const newBadges = State.checkAndAwardBadges();
    if (newBadges.length > 0) {
      Audio.badge();
      const badgeArea = el('div', { class: 'bg-méo-purple-lt p-6 rounded-2xl mb-8 w-full max-w-md' });
      badgeArea.innerHTML = `<h3 class="font-bold text-méo-purple mb-4">Huy hiệu mới!</h3>`;
      const grid = el('div', { class: 'flex justify-center gap-4' });
      newBadges.forEach(b => {
        grid.innerHTML += `
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white rounded-full flex-center text-3xl shadow-md border-2 border-warning mb-2">${b.emoji}</div>
            <div class="text-xs font-bold text-text">${b.name}</div>
          </div>
        `;
      });
      badgeArea.appendChild(grid);
      compBox.appendChild(badgeArea);
    }

    const btnRow = el('div', { class: 'flex gap-4' });
    const backBtn = el('button', { class: 'btn btn-secondary' }, 'Về danh sách');
    backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
    
    const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục');
    nextBtn.addEventListener('click', () => {
      Audio.click();
      if (isRandomPractice) {
        Router.navigate('/practice');
      } else {
        Router.navigate(`/session/${dayId}/${moduleData.session}`);
      }
    });

    btnRow.appendChild(backBtn);
    btnRow.appendChild(nextBtn);

    compBox.appendChild(title);
    compBox.appendChild(xpText);
    compBox.appendChild(btnRow);

    card.appendChild(compBox);
  }

  // Check if already completed (Skip this check for random practice, because random practice is never considered "already completed" before it starts)
  if (!isRandomPractice && State.isModuleComplete(moduleData.id)) {
    // Just a prompt
    const compBox = el('div', { class: 'text-center py-10' });
    compBox.innerHTML = `
      <h2 class="font-display text-3xl text-méo-purple mb-4">Bài này em đã hoàn thành rồi!</h2>
      <p class="mb-8">Em có muốn học lại không? (Học lại không nhận thêm ⭐ đâu nhé)</p>
    `;
    const btnRow = el('div', { class: 'flex justify-center gap-4' });
    
    const backBtn = el('button', { class: 'btn btn-secondary' }, 'Quay lại');
    backBtn.addEventListener('click', () => { Audio.click(); Router.back(); });
    
    const againBtn = el('button', { class: 'btn btn-primary' }, 'Học lại');
    againBtn.addEventListener('click', () => { Audio.click(); loadQuestion(0); });
    
    btnRow.appendChild(backBtn);
    btnRow.appendChild(againBtn);
    compBox.appendChild(btnRow);
    card.appendChild(compBox);
  } else {
    // Start lesson
    Mascot.startLesson(`Cùng học ${getSubjectConfig(moduleData.subject).label} nào! 🚀`);
    loadQuestion(0);
  }

  return container;
}
