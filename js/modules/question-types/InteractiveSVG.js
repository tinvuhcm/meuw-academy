/**
 * MEUW ACADEMY — InteractiveSVG.js
 * Question Type: Interactive SVG (Click to reveal/remove/change)
 */

import { el, animateClass, sleep } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderInteractiveSVG(q, onComplete) {
  const container = el('div', { class: 'question-wrapper isvg-wrapper' });

  // 1. Title & Instruction
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, q.question);
  container.appendChild(title);

  if (q.instruction) {
    const inst = el('div', { class: 'interactive-instruction mt-2' });
    inst.innerHTML = `<span>👆</span> ${q.instruction}`;
    container.appendChild(inst);
  }

  // 2. SVG Area
  const svgWrapper = el('div', { class: 'interactive-svg-area mt-4' });
  svgWrapper.innerHTML = q.svgContent;
  container.appendChild(svgWrapper);

  // 3. Optional Slider Control
  if (q.slider) {
    const sliderContainer = el('div', { class: 'svg-slider-control mt-4' });
    const header = el('div', { class: 'svg-slider-label' });
    header.innerHTML = `<span>${q.slider.label}</span><span class="svg-slider-value">${q.slider.min}</span>`;
    
    const input = el('input', {
      type: 'range',
      class: 'svg-slider',
      min: q.slider.min,
      max: q.slider.max,
      step: q.slider.step || 1,
      value: q.slider.min
    });

    const valDisplay = header.querySelector('.svg-slider-value');
    
    input.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      valDisplay.textContent = val;
      
      // Update SVG CSS variables
      svgWrapper.style.setProperty('--slider-val', val);
      
      if (q.slider.onInput) {
        // Evaluate custom logic securely or pass via mapped CSS vars
        // In this implementation, we just use CSS vars.
      }
    });

    sliderContainer.appendChild(header);
    sliderContainer.appendChild(input);
    container.appendChild(sliderContainer);
  }

  // 4. Interaction Logic
  let actionsCompleted = 0;
  const targetActions = parseInt(q.targetActions || 1, 10);
  let isComplete = false;

  // Find all actionable elements
  const actionTargets = svgWrapper.querySelectorAll('[data-action]');
  
  actionTargets.forEach(target => {
    target.addEventListener('click', async (e) => {
      if (isComplete) return;
      e.stopPropagation();

      const action = target.dataset.action;
      const effect = target.dataset.effect;
      
      // Audio
      Audio.click();

      // Action Handlers
      if (action === 'click-remove') {
        target.classList.add('svg-removed');
        target.dataset.action = 'done'; // disable further clicks
        actionsCompleted++;
      }
      else if (action === 'click-toggle') {
        target.classList.toggle('active');
        if (effect === 'color') {
          const newColor = target.dataset.colorActive || '#7C3AED';
          const oldColor = target.dataset.colorInactive || target.getAttribute('fill');
          if (target.classList.contains('active')) {
            target.setAttribute('data-color-inactive', oldColor);
            target.setAttribute('fill', newColor);
          } else {
            target.setAttribute('fill', target.dataset.colorInactive);
          }
        }
        actionsCompleted++; // Each toggle counts
      }
      else if (action === 'click-grow') {
        target.style.transform = `scale(${target.dataset.scale || 1.5})`;
        target.dataset.action = 'done';
        actionsCompleted++;
      }
      else if (action === 'click-wrong') {
        Audio.wrong();
        animateClass(target, 'shake', 400);
        triggerMascot('answer:wrong', { customLines: ['Chưa đúng rồi! Thử cái khác nhé!'] });
        return; // Don't count as progress
      }

      // Check Completion
      if (actionsCompleted >= targetActions && !isComplete) {
        isComplete = true;
        Audio.correct();
        triggerMascot('answer:correct', { customLines: ['Tuyệt vời! Em làm đúng rồi!'] });
        
        // Show follow-up question or finish
        if (q.followUp) {
          showFollowUp();
        } else {
          finishAction();
        }
      }
    });
  });

  // 5. Follow-up Question
  function showFollowUp() {
    const fwWrapper = el('div', { class: 'mt-6 p-4 bg-surface border-2 border-border rounded-xl' });
    const qTitle = el('h3', { class: 'font-bold text-lg mb-4' }, q.followUp.question);
    fwWrapper.appendChild(qTitle);

    const optionsGrid = el('div', { class: 'mc-options grid-cols-1 gap-2' });
    
    q.followUp.options.forEach(opt => {
      const btn = el('button', { class: 'btn-option' }, opt);
      btn.addEventListener('click', async () => {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        
        if (opt === q.followUp.answer) {
          btn.classList.add('correct');
          Audio.correct();
          State.recordAnswer(true);
          triggerMascot('answer:correct');
          await sleep(1000);
          finishAction();
        } else {
          btn.classList.add('wrong');
          Audio.wrong();
          State.recordAnswer(false);
          triggerMascot('answer:wrong');
        }
      });
      optionsGrid.appendChild(btn);
    });

    fwWrapper.appendChild(optionsGrid);
    container.appendChild(fwWrapper);
    
    // Scroll down to it
    setTimeout(() => fwWrapper.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
  }

  // 6. Finish
  async function finishAction() {
    const finishBtn = el('button', { class: 'btn btn-cta w-full mt-6' }, 'Tiếp tục');
    finishBtn.addEventListener('click', () => {
      Audio.click();
      onComplete(true, q.xp || 15);
    });
    container.appendChild(finishBtn);
  }

  // If no targets defined, it's just a view-only interactive. Show next immediately.
  if (actionTargets.length === 0 && !q.slider) {
    finishAction();
  } else if (actionTargets.length === 0 && q.slider) {
    // If just a slider, wait for user to click continue manually
    const continueBtn = el('button', { class: 'btn btn-cta w-full mt-6' }, 'Tiếp tục');
    continueBtn.addEventListener('click', () => {
      Audio.click();
      onComplete(true, q.xp || 5);
    });
    container.appendChild(continueBtn);
  }

  return container;
}
