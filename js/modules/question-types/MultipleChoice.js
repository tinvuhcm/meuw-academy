/**
 * MEUW ACADEMY — MultipleChoice.js
 * Question Type: Multiple Choice (4 options)
 */

import { el, animateClass, sleep, shuffle } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';
import { createScratchpad } from '../../scratchpad.js';

/**
 * Render Multiple Choice Question
 * @param {Object} q - Question data
 * @param {Function} onComplete - Callback(isCorrect, xpEarned)
 * @returns {HTMLElement}
 */
export function renderMultipleChoice(q, onComplete) {
  const container = el('div', { class: 'question-wrapper mc-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, q.question);
  container.appendChild(title);

  // 1.5 Passage
  if (q.passage) {
    const passageBox = el('div', { class: 'passage-box mb-4 p-4 bg-surface border-2 border-border rounded-xl text-text leading-relaxed text-sm max-h-[200px] overflow-y-auto italic' });
    passageBox.innerHTML = q.passage;
    container.appendChild(passageBox);
  }

  // 2. Illustration (SVG string or key)
  if (q.illustration) {
    const illusWrapper = el('div', { class: 'mc-illustration' });
    illusWrapper.innerHTML = q.illustration;
    container.appendChild(illusWrapper);
  }

  // 3. Options Grid
  const optionsGrid = el('div', { class: 'mc-options' });
  const shuffledOptions = q.shuffle !== false ? shuffle(q.options) : [...q.options];
  const optionBtns = [];
  let isAnswered = false;

  // 4. Scratchpad (if Math)
  if (q.isMath) {
    const scratchpad = createScratchpad();
    container.appendChild(scratchpad);
  }

  shuffledOptions.forEach((optText) => {
    const isCorrect = optText === q.answer;
    
    const btn = el('button', { class: 'btn-option' });
    btn.innerHTML = `<span class="opt-text">${optText}</span>`;

    btn.addEventListener('click', async () => {
      if (isAnswered) return;
      isAnswered = true;
      btn.classList.add('selected');

      if (isCorrect) {
        // Correct Answer
        btn.classList.add('correct');
        Audio.correct();
        triggerMascot('answer:correct');
        State.recordAnswer(true);

        // Flash XP
        const xpSpan = el('span', { class: 'xp-flash-particle' }, `+${q.xp || 10} ⭐`);
        const rect = btn.getBoundingClientRect();
        xpSpan.style.left = `${rect.left + rect.width/2}px`;
        xpSpan.style.top = `${rect.top}px`;
        document.body.appendChild(xpSpan);
        setTimeout(() => xpSpan.remove(), 1000);

        // Show Explanation if it's a rich one (length > 60)
        if (q.explanation && q.explanation.length > 60) {
          const expBox = el('div', { class: 'explanation-box mt-4 p-4 bg-méo-purple-lt border-2 border-méo-purple rounded-xl text-text leading-relaxed text-sm max-h-[300px] overflow-y-auto' });
          expBox.innerHTML = `<div class="font-bold text-méo-purple mb-2">💡 Méo bật mí:</div> ${q.explanation}`;
          container.appendChild(expBox);

          const nextBtnContainer = el('div', { class: 'mt-6 flex justify-center' });
          const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục nha');
          nextBtn.addEventListener('click', () => {
            Audio.click();
            onComplete(true, q.xp || 10);
          });
          nextBtnContainer.appendChild(nextBtn);
          container.appendChild(nextBtnContainer);
        } else {
          await sleep(1500);
          onComplete(true, q.xp || 10);
        }
      } else {
        // Wrong Answer
        btn.classList.add('wrong');
        Audio.wrong();
        triggerMascot('answer:wrong');
        State.recordAnswer(false);

        // Highlight correct
        const correctBtn = optionBtns.find(b => b.dataset.correct === 'true');
        if (correctBtn) correctBtn.classList.add('correct');

        // Show Explanation
        if (q.explanation) {
          const expBox = el('div', { class: 'explanation-box mt-4 p-4 bg-méo-purple-lt border-2 border-méo-purple rounded-xl text-text leading-relaxed text-sm max-h-[300px] overflow-y-auto' });
          expBox.innerHTML = `<div class="font-bold text-méo-purple mb-2">💡 Méo bật mí:</div> ${q.explanation}`;
          container.appendChild(expBox);
        }

        // Show Next button to proceed anyway (don't block progress)
        const nextBtnContainer = el('div', { class: 'mt-6 flex justify-center' });
        const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục nha');
        nextBtn.addEventListener('click', () => {
          Audio.click();
          onComplete(false, Math.floor((q.xp || 10) / 2)); // half XP for trying
        });
        nextBtnContainer.appendChild(nextBtn);
        container.appendChild(nextBtnContainer);
      }
    });

    btn.dataset.correct = isCorrect;
    optionBtns.push(btn);
    optionsGrid.appendChild(btn);
  });

  container.appendChild(optionsGrid);

  return container;
}
