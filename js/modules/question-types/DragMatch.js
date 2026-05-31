/**
 * MEUW ACADEMY — DragMatch.js
 * Question Type: Drag & Drop Match (Pairs)
 */

import { el, animateClass, sleep, shuffle } from '../../utils.js';
import { triggerMascot } from '../../mascot.js';
import { Audio } from '../../audio.js';
import State from '../../state.js';

export function renderDragMatch(q, onComplete) {
  const container = el('div', { class: 'question-wrapper dm-wrapper' });

  // 1. Title
  const title = el('h2', { class: 'question-title text-gradient font-display text-2xl' }, q.question);
  container.appendChild(title);

  // 2. Setup Data
  const pairsCount = q.pairs.length;
  let matchesFound = 0;
  
  // Create shuffled left & right items
  const leftItems = shuffle(q.pairs.map(p => ({ id: p.id, text: p.left })));
  const rightItems = shuffle(q.pairs.map(p => ({ id: p.id, text: p.right })));

  // 3. Grid Layout
  const grid = el('div', { class: 'drag-match-container' });
  const leftCol = el('div', { class: 'drag-column' });
  const rightCol = el('div', { class: 'drag-column' });

  leftCol.appendChild(el('div', { class: 'drag-column-label' }, 'Kéo từ đây'));
  rightCol.appendChild(el('div', { class: 'drag-column-label' }, 'Thả vào đây'));

  // State for touch/tap fallback
  let selectedSource = null;

  // --- Render Left (Draggables) ---
  const sourceElements = {};
  leftItems.forEach(item => {
    const dragEl = el('div', { 
      class: 'drag-item',
      draggable: true,
      'data-id': item.id
    }, item.text);

    // Desktop Drag
    dragEl.addEventListener('dragstart', (e) => {
      if (dragEl.classList.contains('matched')) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', item.id);
      setTimeout(() => dragEl.classList.add('dragging'), 0);
    });

    dragEl.addEventListener('dragend', () => {
      dragEl.classList.remove('dragging');
    });

    // Mobile Tap
    dragEl.addEventListener('click', () => {
      if (dragEl.classList.contains('matched')) return;
      
      // Deselect all
      Object.values(sourceElements).forEach(el => el.classList.remove('selected'));
      
      if (selectedSource === item.id) {
        selectedSource = null; // toggle off
      } else {
        selectedSource = item.id;
        dragEl.classList.add('selected');
        Audio.click();
      }
    });

    sourceElements[item.id] = dragEl;
    leftCol.appendChild(dragEl);
  });

  // --- Render Right (Drop Zones) ---
  const targetElements = {};
  rightItems.forEach(item => {
    const dropEl = el('div', { 
      class: 'drop-zone',
      'data-target-id': item.id
    }, item.text);

    // Desktop Drop
    dropEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!dropEl.classList.contains('drop-filled')) {
        dropEl.classList.add('drop-hover');
      }
    });

    dropEl.addEventListener('dragleave', () => {
      dropEl.classList.remove('drop-hover');
    });

    dropEl.addEventListener('drop', (e) => {
      e.preventDefault();
      dropEl.classList.remove('drop-hover');
      if (dropEl.classList.contains('drop-filled')) return;

      const sourceId = e.dataTransfer.getData('text/plain');
      handleMatchAttempt(sourceId, item.id, dropEl);
    });

    // Mobile Tap
    dropEl.addEventListener('click', () => {
      if (dropEl.classList.contains('drop-filled')) return;
      if (!selectedSource) return; // Must select source first
      
      handleMatchAttempt(selectedSource, item.id, dropEl);
      
      // Clear selection
      if (sourceElements[selectedSource]) {
        sourceElements[selectedSource].classList.remove('selected');
      }
      selectedSource = null;
    });

    targetElements[item.id] = dropEl;
    rightCol.appendChild(dropEl);
  });

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);
  container.appendChild(grid);

  // --- Match Logic ---
  async function handleMatchAttempt(sourceId, targetId, dropEl) {
    const sourceEl = sourceElements[sourceId];
    if (!sourceEl) return;

    if (sourceId === targetId) {
      // Correct Match
      Audio.click();
      setTimeout(() => Audio.correct(), 100);
      
      sourceEl.classList.add('matched');
      sourceEl.draggable = false;
      
      dropEl.classList.add('drop-filled');
      dropEl.innerHTML = `✓ ${dropEl.innerHTML}`; // mark correct
      
      matchesFound++;
      State.recordAnswer(true);

      // Flash XP
      const xpSpan = el('span', { class: 'xp-flash-particle' }, `+2 ⭐`);
      const rect = dropEl.getBoundingClientRect();
      xpSpan.style.left = `${rect.left + rect.width/2}px`;
      xpSpan.style.top = `${rect.top}px`;
      document.body.appendChild(xpSpan);
      setTimeout(() => xpSpan.remove(), 1000);

      // Check win
      if (matchesFound === pairsCount) {
        triggerMascot('answer:correct', { customLines: ['Tuyệt vời! Em ghép đúng hết rồi!'] });
        await sleep(1500);
        onComplete(true, q.xp || 15);
      }
    } else {
      // Wrong Match
      Audio.wrong();
      triggerMascot('answer:wrong');
      State.recordAnswer(false);
      
      sourceEl.classList.add('wrong');
      dropEl.classList.add('wrong-bg');
      animateClass(sourceEl, 'shake', 400);
      animateClass(dropEl, 'shake', 400);
      
      setTimeout(() => {
        sourceEl.classList.remove('wrong');
        dropEl.classList.remove('wrong-bg');
      }, 400);
    }
  }

  return container;
}
