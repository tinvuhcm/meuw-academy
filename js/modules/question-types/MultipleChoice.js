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
  const correctAnswers = Array.isArray(q.correctAnswers)
    ? q.correctAnswers
    : Array.isArray(q.answers)
      ? q.answers
      : Array.isArray(q.answer)
        ? q.answer
        : [q.answer];
  const isMultiAnswer = q.type === 'multiple-answer' || correctAnswers.length > 1;
  const normalizedCorrectSet = new Set(correctAnswers.map(answer => String(answer)));

  // 1. Title
  const titleText = isMultiAnswer
    ? `${q.question} ${q.question?.includes('chọn nhiều') ? '' : '(Có thể chọn nhiều đáp án đúng)'}`
    : q.question;
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, titleText.trim());
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
  const selectedOptions = new Set();

  // 4. Scratchpad (if Math)
  if (q.isMath) {
    const scratchpad = createScratchpad();
    container.appendChild(scratchpad);
  }

  function renderExplanation(prefix) {
    if (!q.explanation) return null;
    const expBox = el('div', { class: 'explanation-box mt-4 p-4 bg-méo-purple-lt border-2 border-méo-purple rounded-xl text-text leading-relaxed text-sm max-h-[300px] overflow-y-auto' });
    expBox.innerHTML = `<div class="font-bold text-méo-purple mb-2">${prefix}</div> ${q.explanation}`;
    container.appendChild(expBox);
    return expBox;
  }

  function finalizeSingleAnswer(isCorrect, earnedXp) {
    if (isCorrect) {
      Audio.correct();
      triggerMascot('answer:correct');
      State.recordAnswer(true);

      if (q.explanation && q.explanation.length > 60) {
        renderExplanation('💡 Gâu tiên sinh bật mí:');
        const nextBtnContainer = el('div', { class: 'mt-6 flex justify-center' });
        const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục nha');
        nextBtn.addEventListener('click', () => {
          Audio.click();
          onComplete(true, earnedXp);
        });
        nextBtnContainer.appendChild(nextBtn);
        container.appendChild(nextBtnContainer);
        return;
      }

      sleep(1500).then(() => onComplete(true, earnedXp));
      return;
    }

    Audio.wrong();
    triggerMascot('answer:wrong');
    State.recordAnswer(false);
    renderExplanation('💡 Gâu tiên sinh bật mí:');

    const nextBtnContainer = el('div', { class: 'mt-6 flex justify-center' });
    const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục nha');
    nextBtn.addEventListener('click', () => {
      Audio.click();
      onComplete(false, earnedXp);
    });
    nextBtnContainer.appendChild(nextBtn);
    container.appendChild(nextBtnContainer);
  }

  function finalizeMultiAnswer() {
    if (isAnswered) return;
    isAnswered = true;

    const selected = [...selectedOptions];
    const selectedSet = new Set(selected);
    const isCorrect =
      selected.length === normalizedCorrectSet.size &&
      selected.every(option => normalizedCorrectSet.has(option));

    optionBtns.forEach(btn => {
      btn.disabled = true;
      const optText = btn.dataset.optionText;
      if (normalizedCorrectSet.has(optText)) {
        btn.classList.add('correct');
      }
      if (selectedSet.has(optText) && !normalizedCorrectSet.has(optText)) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      Audio.correct();
      triggerMascot('answer:correct');
      State.recordAnswer(true);
    } else {
      Audio.wrong();
      triggerMascot('answer:wrong');
      State.recordAnswer(false);
    }

    renderExplanation('💡 Gâu tiên sinh bật mí:');
    const answerNote = el('div', { class: 'mt-4 text-sm font-bold text-text text-center' });
    answerNote.textContent = `Đáp án đúng: ${correctAnswers.join(', ')}`;
    container.appendChild(answerNote);

    const nextBtnContainer = el('div', { class: 'mt-6 flex justify-center gap-3' });
    const nextBtn = el('button', { class: 'btn btn-cta' }, 'Tiếp tục nha');
    nextBtn.addEventListener('click', () => {
      Audio.click();
      onComplete(isCorrect, isCorrect ? (q.xp || 10) : Math.floor((q.xp || 10) / 2));
    });
    nextBtnContainer.appendChild(nextBtn);
    container.appendChild(nextBtnContainer);
  }

  shuffledOptions.forEach((optText) => {
    const isCorrect = normalizedCorrectSet.has(optText);
    
    const btn = el('button', { class: 'btn-option' });
    btn.innerHTML = `<span class="opt-text">${optText}</span>`;
    btn.dataset.optionText = String(optText);

    btn.addEventListener('click', async () => {
      if (isAnswered) return;
      btn.classList.toggle('selected');

      if (isMultiAnswer) {
        if (selectedOptions.has(optText)) {
          selectedOptions.delete(optText);
        } else {
          selectedOptions.add(optText);
        }
        return;
      }

      isAnswered = true;
      if (isCorrect) {
        btn.classList.add('correct');

        const xpSpan = el('span', { class: 'xp-flash-particle' }, `+${q.xp || 10} ⭐`);
        const rect = btn.getBoundingClientRect();
        xpSpan.style.left = `${rect.left + rect.width / 2}px`;
        xpSpan.style.top = `${rect.top}px`;
        document.body.appendChild(xpSpan);
        setTimeout(() => xpSpan.remove(), 1000);

        finalizeSingleAnswer(true, q.xp || 10);
        return;
      }

      btn.classList.add('wrong');
      const correctBtn = optionBtns.find(b => b.dataset.correct === 'true');
      if (correctBtn) correctBtn.classList.add('correct');
      finalizeSingleAnswer(false, Math.floor((q.xp || 10) / 2));
    });

    btn.dataset.correct = isCorrect;
    optionBtns.push(btn);
    optionsGrid.appendChild(btn);
  });

  container.appendChild(optionsGrid);

  if (isMultiAnswer) {
    const helper = el('div', { class: 'text-sm text-text-muted mt-4 text-center' }, 'Câu này có thể có nhiều đáp án đúng. Chọn xong rồi bấm nút kiểm tra nhé.');
    const submitRow = el('div', { class: 'mt-4 flex justify-center' });
    const submitBtn = el('button', { class: 'btn btn-cta' }, 'Kiểm tra');
    submitBtn.addEventListener('click', () => finalizeMultiAnswer());
    submitRow.appendChild(submitBtn);
    container.appendChild(helper);
    container.appendChild(submitRow);
  }

  return container;
}
