/**
 * MEUW ACADEMY — ColorFill.js
 * Question Type: SVG Color Fill
 */

import { el, animateClass, sleep } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderColorFill(q, onComplete) {
  const container = el('div', { class: 'question-wrapper color-fill-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl text-center' }, q.question);
  container.appendChild(title);

  // 2. Palette
  const palette = el('div', { class: 'color-fill-palette mt-4' });
  const colors = q.palette || [
    '#EF4444', '#F97316', '#FCD34D', '#22C55E', 
    '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'
  ];
  let currentColor = colors[0];
  const colorBtns = [];

  colors.forEach(c => {
    const btn = el('div', { class: 'color-swatch w-10 h-10', style: `background-color: ${c}` });
    if (c === currentColor) btn.classList.add('active');
    btn.addEventListener('click', () => {
      Audio.click();
      currentColor = c;
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    colorBtns.push(btn);
    palette.appendChild(btn);
  });

  container.appendChild(palette);

  // 3. SVG Area
  const svgWrapper = el('div', { class: 'color-fill-svg-wrapper mx-auto mt-6' });
  svgWrapper.innerHTML = q.svgContent;
  container.appendChild(svgWrapper);

  // 4. History (Undo)
  const history = [];
  const actionArea = el('div', { class: 'flex-between mt-4' });
  
  const undoBtn = el('button', { class: 'btn btn-outline', disabled: true }, '↩️ Lùi lại');
  undoBtn.addEventListener('click', () => {
    if (history.length > 0) {
      Audio.click();
      const lastAction = history.pop();
      lastAction.element.setAttribute('fill', lastAction.oldColor);
      lastAction.element.classList.remove('region-filled-correct');
      if (history.length === 0) undoBtn.disabled = true;
      regionsFilled--;
    }
  });

  // 5. Interaction Logic
  const regions = svgWrapper.querySelectorAll('[data-region]');
  const totalRegions = regions.length;
  let regionsFilled = 0;

  regions.forEach(region => {
    // Save original color
    if (!region.hasAttribute('fill')) {
      region.setAttribute('fill', '#FFFFFF');
    }
    
    region.addEventListener('click', () => {
      const oldColor = region.getAttribute('fill');
      
      // Don't re-fill if same color
      if (oldColor === currentColor) return;

      // Save to history
      history.push({ element: region, oldColor });
      undoBtn.disabled = false;

      // Apply fill
      region.setAttribute('fill', currentColor);
      region.style.transition = 'fill 0.3s ease';
      
      // If validation is required
      const targetColor = region.dataset.targetColor;
      if (targetColor) {
        if (currentColor.toUpperCase() === targetColor.toUpperCase()) {
          Audio.correct(); // mini ping
          region.classList.add('region-filled-correct');
          triggerMascot('answer:correct', { duration: 1000 });
        } else {
          Audio.click();
          region.classList.remove('region-filled-correct');
        }
      } else {
        Audio.click();
      }

      // Track completion
      if (oldColor === '#FFFFFF' || oldColor === 'none' || oldColor === '#fff') {
        regionsFilled++;
      }
    });
  });

  const submitBtn = el('button', { class: 'btn btn-cta w-full' }, 'Hoàn thành bức tranh');
  submitBtn.addEventListener('click', async () => {
    Audio.click();
    
    if (regionsFilled < totalRegions / 2 && !confirm('Bức tranh vẫn còn nhiều chỗ trống. Em có muốn tô xong đã không?')) {
      return;
    }

    submitBtn.disabled = true;
    
    // Save to gallery via trick (render SVG to canvas, then save)
    try {
      const svgElement = svgWrapper.querySelector('svg');
      const xml = new XMLSerializer().serializeToString(svgElement);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const b64Start = 'data:image/svg+xml;base64,';
      const image64 = b64Start + svg64;
      
      // Since canvas rendering from SVG needs img load, do it async
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = svgElement.width.baseVal.value || 500;
        canvas.height = svgElement.height.baseVal.value || 500;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        State.saveDrawing({ src: canvas.toDataURL('image/jpeg', 0.8), title: q.title || 'Tranh tô màu' });
      };
      img.src = image64;
    } catch(e) {
      console.warn('Could not save SVG to gallery', e);
    }

    Audio.correct();
    triggerMascot('answer:correct', { customLines: ['Màu sắc thật rực rỡ! Đẹp quá em ơi! 🌈'] });
    
    await sleep(2000);
    onComplete(true, q.xp || 15);
  });

  actionArea.appendChild(undoBtn);
  container.appendChild(actionArea);
  
  const submitWrap = el('div', { class: 'mt-6' });
  submitWrap.appendChild(submitBtn);
  container.appendChild(submitWrap);

  // Trigger drawing mascot state
  triggerMascot('module:drawing');

  return container;
}
