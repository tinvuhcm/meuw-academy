/**
 * MEUW ACADEMY — FillBlank.js
 * Question Type: Fill in the Blank (Single or multiple fields)
 */

import { el, animateClass, sleep } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderFillBlank(q, onComplete) {
  const container = el('div', { class: 'question-wrapper fb-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, q.question);
  container.appendChild(title);

  // 2. Illustration
  if (q.illustration) {
    const illusWrapper = el('div', { class: 'fill-blank-illustration' });
    illusWrapper.innerHTML = q.illustration;
    container.appendChild(illusWrapper);
  }

  // 3. Fields Area
  const fieldsArea = el('div', { class: 'fill-blank-fields' });
  const inputs = [];
  let attempts = 0;
  let isAnswered = false;

  q.blanks.forEach((blank, idx) => {
    const row = el('div', { class: 'fill-blank-field-row' });
    
    if (blank.label) {
      const label = el('label', { class: 'fill-blank-field-label' }, blank.label);
      row.appendChild(label);
    }

    const inputWrap = el('div', { class: 'fill-blank-input-wrapper' });
    
    // Support number keyboard on mobile if type is number
    const type = blank.type === 'number' ? 'number' : 'text';
    const input = el('input', { 
      type, 
      class: 'fill-blank-input',
      placeholder: blank.placeholder || 'Nhập câu trả lời...',
      autocomplete: 'off'
    });
    
    input.dataset.answer = String(blank.answer);
    inputs.push(input);
    inputWrap.appendChild(input);

    if (blank.unit) {
      inputWrap.appendChild(el('div', { class: 'fill-blank-unit-label' }, blank.unit));
    }

    row.appendChild(inputWrap);
    fieldsArea.appendChild(row);
  });

  container.appendChild(fieldsArea);

  // 4. Actions
  const actionArea = el('div', { class: 'flex-between mt-6' });
  
  const hintBtn = el('button', { class: 'btn btn-outline', style: { display: q.hint ? 'block' : 'none' } }, '💡 Gợi ý');
  hintBtn.addEventListener('click', () => {
    if (isAnswered) return;
    Audio.click();
    triggerMascot('answer:wrong', { customLines: [q.hint] }); // use encouraging state to show hint
  });

  const submitBtn = el('button', { class: 'btn btn-cta' }, 'Kiểm tra');
  
  submitBtn.addEventListener('click', async () => {
    if (isAnswered) return;
    
    // Check all fields
    let allCorrect = true;
    let anyEmpty = false;

    inputs.forEach(input => {
      const val = input.value.trim().toLowerCase();
      const ans = input.dataset.answer.toLowerCase();
      
      if (!val) {
        anyEmpty = true;
        animateClass(input, 'shake', 400);
      } else if (val === ans) {
        input.classList.remove('fb-wrong');
        input.classList.add('fb-correct');
        input.disabled = true;
      } else {
        allCorrect = false;
        input.classList.add('fb-wrong');
        animateClass(input, 'shake', 400);
      }
    });

    if (anyEmpty) {
      triggerMascot('answer:wrong', { customLines: ['Em chưa điền hết kìa!'] });
      return;
    }

    attempts++;

    if (allCorrect) {
      isAnswered = true;
      submitBtn.disabled = true;
      Audio.correct();
      triggerMascot('answer:correct');
      State.recordAnswer(true);

      const xp = Math.max(2, (q.xp || 10) - (attempts > 1 ? 5 : 0)); // deduct XP on retry
      await sleep(1500);
      onComplete(true, xp);
    } else {
      Audio.wrong();
      if (attempts >= 3) {
        isAnswered = true;
        submitBtn.disabled = true;
        triggerMascot('answer:wrong', { customLines: ['Hơi khó đúng không? Xem đáp án nhé!'] });
        
        // Reveal answers
        inputs.forEach(input => {
          if (!input.disabled) {
            input.value = input.dataset.answer;
            input.classList.add('fb-correct');
            input.disabled = true;
          }
        });

        // Show Explanation
        if (q.explanation) {
          const expBox = el('div', { class: 'explanation-box mt-4 p-4 bg-wrong-bg border-2 border-wrong rounded-xl' });
          expBox.innerHTML = `<strong>💡 Méo giải thích:</strong> ${q.explanation}`;
          container.appendChild(expBox);
        }

        const nextBtn = el('button', { class: 'btn btn-cta w-full mt-4' }, 'Tiếp tục');
        nextBtn.addEventListener('click', () => {
          Audio.click();
          onComplete(false, Math.floor((q.xp || 10) / 3)); // minimal XP
        });
        container.appendChild(nextBtn);
      } else {
        triggerMascot('answer:wrong', { customLines: ['Chưa chính xác! Thử lại nha!', 'Kiểm tra lại xem nào!'] });
        State.recordAnswer(false);
      }
    }
  });

  actionArea.appendChild(hintBtn);
  actionArea.appendChild(submitBtn);
  container.appendChild(actionArea);

  return container;
}
