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

function getLessonBlockMeta(block) {
  if (block.type === 'reading-page' || block.flowStage === 'reading') {
    return {
      badge: 'Bước 3',
      role: 'Đọc hoặc xem nguồn gốc bài học',
      hint: 'Đọc kĩ rồi mới làm bài để tìm ý nhanh hơn.',
    };
  }
  if (block.flowStage === 'warmup' || block.__flowWarmup) {
    return {
      badge: 'Bước 1',
      role: 'Khởi động cùng Gâu tiên sinh',
      hint: 'Đoán nhanh nhiệm vụ học để vào bài dễ hơn.',
    };
  }
  return {
    badge: 'Bước 2',
    role: 'Bài học ngắn trước khi luyện tập',
    hint: 'Nắm ý chính trước để làm bài chắc tay hơn.',
  };
}

export function renderLesson(params) {
  const isRandomPractice = params.dayId === 'practice';
  const dayId = isRandomPractice ? 'practice' : parseInt(params.dayId, 10);
  const moduleId = params.moduleId;
  if (!isRandomPractice) {
    State.syncDailyProgress();
  }

  const moduleData = isRandomPractice ? generatePracticeModule(20, moduleId) : getModuleData(dayId, moduleId);
  const container = el('div', { class: 'page-container lesson-container' });

  if (!isRandomPractice && dayId > State.getCurrentDay()) {
    const blocked = el('div', { class: 'card max-w-2xl mx-auto mt-10 text-center border-2 border-warning bg-warning-bg' });
    blocked.innerHTML = `
      <div class="text-5xl mb-4">🗓️</div>
      <h2 class="font-display text-3xl text-warning-dk mb-3">Ngày này chưa mở để học</h2>
      <p class="font-bold text-text">Bé có thể xem trước ở lộ trình, nhưng chỉ bắt đầu học khi tới đúng ngày và các ngày trước đã pass trên 80%.</p>
    `;
    const backBtn = el('button', { class: 'btn btn-outline mt-6' }, 'Quay lại lộ trình');
    backBtn.addEventListener('click', () => Router.navigate('/'));
    blocked.appendChild(backBtn);
    container.appendChild(blocked);
    return container;
  }

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
    <div class="mascot-container" data-mascot data-mascot-character="gau"></div>
    <div class="speech-bubble" data-speech-bubble></div>
  `;
  sidebar.appendChild(mascotArea);

  // Progress Dots
  const lessonBlocks = Array.isArray(moduleData.lessonBlocks) ? moduleData.lessonBlocks : [];
  const flowItems = [
    ...lessonBlocks.map(block => ({ kind: 'lesson', block })),
    ...moduleData.questions.map(question => ({ kind: 'question', question })),
  ];

  // If there's a reading-page block, keep a reference for the "Xem lại" button
  const readingBlock = lessonBlocks.find(b => b.type === 'reading-page') || null;
  const reviewableLessonBlocks = lessonBlocks.filter(block => {
    if (block.type === 'reading-page') return true;
    return Boolean((block.points && block.points.length) || block.example || block.title);
  });
  // Detect reading lessons even without a book-image block (e.g. PPTX bài đọc topics)
  const isReadingLesson = !!readingBlock || (
    moduleData.subject === 'vie' &&
    /bai.?doc|b[àa]i[\s-]*đọc/i.test(`${moduleData.topicKey || ''} ${moduleData.title || ''}`)
  );
  const numQuestions = moduleData.questions.length;
  const numSteps = flowItems.length;
  const progressBox = el('div', { class: 'card mt-4' });
  progressBox.innerHTML = '<div class="text-sm font-bold text-text-muted mb-2 text-center">Tiến trình</div>';
  const dotsContainer = el('div', { class: 'flex flex-wrap justify-center gap-2' });

  const dots = [];
  for (let i = 0; i < numSteps; i++) {
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

    if (index >= numSteps) {
      showCompletion();
      return;
    }

    const item = flowItems[index];
    if (item.kind === 'lesson') {
      if (item.block.type === 'reading-page') {
        triggerMascot('lesson:start', { customLines: ['Đọc bài trong sách giáo khoa trước nhé!'] });
      } else {
        triggerMascot('lesson:start', { customLines: ['Nghe 1 bài học ngắn nhé!'] });
      }
      card.appendChild(renderLessonBlock(item.block, () => {
        Audio.click();
        currentIndex++;
        loadQuestion(currentIndex);
      }));
      return;
    }

    const q = item.question;
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
      case 'multiple-choice':
      case 'multiple-answer':
        qEl = renderMultipleChoice(q, handleComplete);
        break;
      case 'fill-blank':
        // Non-math vocab fill-blanks are too hard for kids — reduce to 1 attempt before hint
        qEl = renderFillBlank(q.isMath ? q : { ...q, _maxAttempts: 1 }, handleComplete);
        break;
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

    // "Xem lại bài đọc / bài học" button — shown during questions whenever we have reviewable lesson content
    if (reviewableLessonBlocks.length) {
      const reviewRow = el('div', { class: 'flex justify-end mt-3' });
      const reviewBtn = el(
        'button',
        { class: 'btn btn-outline text-xs py-1 px-3' },
        isReadingLesson ? '📖 Xem lại bài đọc' : '📘 Xem lại bài học',
      );
      reviewBtn.addEventListener('click', () => {
        Audio.click();
        openLessonReviewModal(moduleData, reviewableLessonBlocks, readingBlock);
      });
      reviewRow.appendChild(reviewBtn);
      card.appendChild(reviewRow);
    }
  }

  function showCompletion() {
    Audio.complete();
    Confetti.burst();
    triggerMascot('module:complete');

    const isAlreadyCompleted = State.isModuleComplete(moduleData.id);
    const prevDay = State.getActiveProfile().currentDay || 1;

    if (!isAlreadyCompleted) {
      // Mark complete only if it's the first time
      const timeSpentMs = Date.now() - startTime;
      State.recordKnowledgeExposure(moduleData, {
        dayId,
        session: moduleData.session,
      });
      State.markModuleComplete(moduleData.id, {
        score: numQuestions, // simplify for now
        total: numQuestions,
        timeMs: timeSpentMs,
        xp: xpEarnedTotal,
        curriculumTopicKey: moduleData.topicKey || null,
        curriculumTitle: moduleData.title,
      });
    }

    // Re-sync progress: detects if completing this module passed the full day
    const newDay = State.syncDailyProgress();
    const dayJustAdvanced = !isAlreadyCompleted && !isRandomPractice && newDay > prevDay;

    card.innerHTML = '';
    const compBox = el('div', { class: 'flex flex-col items-center justify-center flex-1 text-center py-10' });

    const title = el('h2', { class: 'completion-title font-display text-4xl text-méo-purple mb-4' }, 'Hoàn thành!');
    const xpText = el('div', { class: 'text-2xl font-bold text-warning mb-8 flex items-center gap-2 justify-center' });
    xpText.innerHTML = isAlreadyCompleted ? `Ôn tập hoàn tất! 🌟` : `+${xpEarnedTotal} ⭐ <span class="text-3xl">🌟</span>`;

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

    const nextLabel = dayJustAdvanced ? `Học ngày ${newDay} →` : 'Tiếp tục';
    const nextBtn = el('button', { class: 'btn btn-cta' }, nextLabel);
    nextBtn.addEventListener('click', () => {
      Audio.click();
      if (isRandomPractice) {
        Router.navigate('/practice');
      } else if (dayJustAdvanced) {
        const nextPlan = State.getStudyPlanForDayNumber(newDay);
        Router.navigate(`/session/${newDay}/${nextPlan.mode === 'merged' ? 'day' : 'am'}`);
      } else {
        Router.navigate(`/session/${dayId}/${moduleData.session}`);
      }
    });

    btnRow.appendChild(backBtn);
    btnRow.appendChild(nextBtn);

    compBox.appendChild(title);
    compBox.appendChild(xpText);
    if (dayJustAdvanced) {
      const unlockBanner = el('div', { class: 'bg-méo-purple-lt border-2 border-méo-purple rounded-2xl p-4 mb-6 w-full max-w-md' });
      unlockBanner.innerHTML = `
        <div class="text-3xl mb-2">🔓</div>
        <div class="font-display text-xl text-méo-purple mb-1">Ngày ${newDay} đã mở khóa!</div>
        <div class="text-sm font-bold text-text-muted">Con đã hoàn thành ngày hôm trước. Tiếp tục nào!</div>
      `;
      compBox.appendChild(unlockBanner);
    }
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

function renderReadingPageBlock(block, onNext) {
  const wrapper = el('div', { class: 'lesson-reading-block flex flex-col gap-3' });
  const meta = getLessonBlockMeta(block);
  const pageNumbers = block.startPage && block.endPage
    ? Array.from({ length: (block.endPage - block.startPage) + 1 }, (_, idx) => block.startPage + idx)
    : [];

  // Header
  const header = el('div', { class: 'flex items-center gap-2 mb-1' });
  header.innerHTML = `<span class="text-2xl">📖</span><div>
    <div class="text-[11px] uppercase tracking-[0.18em] font-black text-méo-purple">${meta.role}</div>
    <div class="font-display text-lg text-méo-purple">${block.title || 'Bài đọc'}</div>
    ${block.sourceLabel ? `<div class="text-xs text-text-muted">${block.sourceLabel}</div>` : ''}
  </div>`;
  wrapper.appendChild(header);
  wrapper.appendChild(el('div', { class: 'text-sm text-text-muted' }, 'Đây là trang SGK thật của bài học. Con đọc kĩ rồi mới làm bài nhé.'));
  wrapper.appendChild(el('div', { class: 'text-xs font-bold text-warning-dk bg-warning-bg rounded-xl px-3 py-2' }, meta.hint));

  // Page image viewer — uses the full-screen zoomable viewer
  const pages = block.pages || [];

  // "Open full-screen" zoom button
  if (pages.length > 0) {
    const zoomBtn = el('button', { class: 'btn btn-outline text-xs self-start mb-1' }, '🔍 Phóng to để đọc rõ hơn');
    zoomBtn.addEventListener('click', () => {
      Audio.click();
      const overlay = buildSGKViewerOverlay({ pages, pageNumbers, title: block.title || 'Bài đọc', sourceLabel: block.sourceLabel || '' });
      document.body.appendChild(overlay);
    });
    wrapper.appendChild(zoomBtn);
  }

  // Inline preview (shows thumbnail, click to open fullscreen viewer)
  const imgWrap = el('div', { class: 'relative rounded-xl overflow-hidden border border-border bg-gray-50 cursor-pointer', title: 'Nhấn để phóng to' });
  const img = el('img', {
    src: pages[0] || '',
    alt: 'Trang SGK',
    class: 'w-full block',
    style: 'max-height: 55vh; object-fit: contain;',
  });
  img.onerror = () => { imgWrap.innerHTML = '<div class="p-8 text-center text-text-muted">Không tải được ảnh sách. Vẫn có thể làm bài tiếp.</div>'; };
  imgWrap.appendChild(img);
  imgWrap.addEventListener('click', () => {
    const overlay = buildSGKViewerOverlay({ pages, pageNumbers, title: block.title || 'Bài đọc', sourceLabel: block.sourceLabel || '' });
    document.body.appendChild(overlay);
  });
  wrapper.appendChild(imgWrap);

  // Page navigation (if > 1 page) — updates the inline preview
  if (pages.length > 1) {
    const nav = el('div', { class: 'flex justify-center gap-2' });
    pages.forEach((url, idx) => {
      const btn = el('button', {
        class: `btn text-sm py-1 px-4 ${idx === 0 ? 'btn-cta' : 'btn-outline'}`,
      }, pageNumbers[idx] ? `Trang ${pageNumbers[idx]}` : `Trang ${idx + 1}`);
      btn.addEventListener('click', () => {
        img.src = url;
        nav.querySelectorAll('button').forEach((b, i) => {
          b.className = `btn text-sm py-1 px-4 ${i === idx ? 'btn-cta' : 'btn-outline'}`;
        });
        Audio.click();
      });
      nav.appendChild(btn);
    });
    wrapper.appendChild(nav);
  }

  // Done reading → proceed to questions
  const nextRow = el('div', { class: 'flex justify-center mt-2' });
  const nextBtn = el('button', { class: 'btn btn-cta w-full max-w-xs' }, '✅ Đã đọc xong — Làm bài!');
  nextBtn.addEventListener('click', onNext);
  nextRow.appendChild(nextBtn);
  wrapper.appendChild(nextRow);

  return wrapper;
}

function renderReviewTheoryBlock(block) {
  const meta = getLessonBlockMeta(block);
  const card = el('div', { class: 'border border-border rounded-2xl p-4 bg-bg-2 flex flex-col gap-3' });
  card.appendChild(el('div', { class: 'text-[11px] uppercase tracking-[0.18em] font-black text-méo-purple' }, `${meta.role}`));
  card.appendChild(el('h3', { class: 'font-display text-xl text-méo-purple' }, block.title || 'Bài học ngắn'));
  if (block.sourceLabel) {
    card.appendChild(el('div', { class: 'text-xs font-bold text-text-muted' }, block.sourceLabel));
  }
  if (block.sourcePages?.length) {
    const pageBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3 self-start' }, '📘 Xem trang SGK thật');
    pageBtn.addEventListener('click', () => {
      Audio.click();
      openSourcePagesModal(block);
    });
    card.appendChild(pageBtn);
  }

  (block.points || []).forEach(point => {
    const row = el('div', { class: 'lesson-theory-point' });
    row.innerHTML = `<span class="lesson-point-dot"></span><span>${point}</span>`;
    card.appendChild(row);
  });

  if (block.example) {
    const example = el('div', { class: 'lesson-theory-example' });
    example.innerHTML = block.example;
    card.appendChild(example);
  }

  return card;
}

function renderReviewReadingBlock(block) {
  const meta = getLessonBlockMeta(block);
  const section = el('div', { class: 'flex flex-col gap-3' });

  const pageNumbers = block.startPage && block.endPage
    ? Array.from({ length: (block.endPage - block.startPage) + 1 }, (_, idx) => block.startPage + idx)
    : [];

  section.appendChild(el('div', { class: 'text-[11px] uppercase tracking-[0.18em] font-black text-méo-purple' }, `${meta.role}`));
  section.appendChild(el('h3', { class: 'font-display text-xl text-méo-purple' }, block.title || 'Bài đọc SGK'));
  if (block.sourceLabel) {
    section.appendChild(el('div', { class: 'text-xs font-bold text-text-muted' }, block.sourceLabel));
  }

  const pages = block.pages || [];
  if (pages.length > 0) {
    // "Open full viewer" button — opens the full-screen zoom-capable viewer
    const openBtn = el('button', { class: 'btn btn-outline text-sm self-start' }, '🔍 Mở trang SGK (zoom được)');
    openBtn.addEventListener('click', () => {
      Audio.click();
      const overlay = buildSGKViewerOverlay({
        pages,
        pageNumbers,
        title: block.title || 'Bài đọc SGK',
        sourceLabel: block.sourceLabel || '',
      });
      document.body.appendChild(overlay);
    });
    section.appendChild(openBtn);

    // Preview thumbnail (first page, small) so user can see what it looks like
    const thumb = el('img', {
      src: pages[0],
      alt: 'Xem trước trang SGK',
      class: 'w-full rounded-lg block border border-border bg-white cursor-pointer',
      style: 'max-height: 40vh; object-fit: contain;',
    });
    thumb.addEventListener('click', () => openBtn.click());
    thumb.title = 'Nhấn để mở xem đầy đủ';
    section.appendChild(thumb);
  } else {
    const msg = el('div', { class: 'p-6 text-center border border-border rounded-2xl bg-bg-2' });
    msg.innerHTML = `
      <div class="text-5xl mb-4">📚</div>
      <p class="font-bold text-lg mb-2">Mở SGK để đọc lại bài nhé!</p>
      <p class="text-text-muted text-sm">Đọc kỹ bài đọc, chú ý các từ in đậm và ghi chú giải nghĩa bên cạnh.</p>
    `;
    section.appendChild(msg);
  }

  return section;
}

/**
 * Shared SGK page viewer with zoom +/- and scroll.
 *
 * Default: image fills full width of the modal (readable text size).
 * Zoom: increases/decreases the rendered width in 25% steps.
 * Scroll: the image container scrolls when image is wider or taller than panel.
 *
 * @param {string[]} pages       - Array of CDN image URLs
 * @param {number[]} pageNumbers - Human-readable page numbers for nav buttons
 * @param {string}   title       - Modal title
 * @param {string}   sourceLabel - Source attribution line
 * @param {Function} onClose     - Called when user closes the modal
 * @returns {HTMLElement}         The full overlay element
 */
function buildSGKViewerOverlay({ pages = [], pageNumbers = [], title = '', sourceLabel = '', onClose }) {
  const ZOOM_STEPS = [75, 100, 125, 150, 200]; // percent widths relative to container
  const ZOOM_DEFAULT = 1; // index into ZOOM_STEPS
  let zoomIdx = ZOOM_DEFAULT;

  const overlay = el('div', {
    class: 'fixed inset-0 z-50 bg-black/80 flex items-stretch justify-center',
    style: 'backdrop-filter: blur(3px)',
  });

  // Modal: near-full-screen with flex column layout
  const modal = el('div', {
    class: 'bg-surface rounded-2xl w-full flex flex-col',
    style: 'max-width: min(96vw, 900px); margin: 16px; max-height: calc(100vh - 32px);',
  });

  // ── Header (sticky) ─────────────────────────────────────────────────────
  const header = el('div', { class: 'flex items-center justify-between gap-2 px-4 py-3 border-b border-border flex-shrink-0' });
  header.appendChild(el('span', { class: 'font-display text-base text-méo-purple truncate flex-1' }, title || 'Trang SGK'));
  const closeBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3 flex-shrink-0' }, '✕ Đóng');
  closeBtn.addEventListener('click', () => { onClose?.(); overlay.remove(); });
  header.appendChild(closeBtn);
  modal.appendChild(header);

  // ── Source label ─────────────────────────────────────────────────────────
  if (sourceLabel) {
    const srcRow = el('div', { class: 'px-4 py-1 text-[11px] text-text-muted border-b border-border flex-shrink-0' }, sourceLabel);
    modal.appendChild(srcRow);
  }

  // ── Zoom toolbar ─────────────────────────────────────────────────────────
  const toolbar = el('div', { class: 'flex items-center gap-2 px-4 py-2 border-b border-border flex-shrink-0 bg-bg-2' });
  const zoomLabel = el('span', { class: 'text-xs font-bold text-text-muted w-10 text-center' }, `${ZOOM_STEPS[zoomIdx]}%`);

  const zoomOut = el('button', { class: 'btn btn-outline text-sm py-1 px-3', title: 'Thu nhỏ' }, '−');
  const zoomIn = el('button', { class: 'btn btn-outline text-sm py-1 px-3', title: 'Phóng to' }, '+');
  const zoomFit = el('button', { class: 'btn btn-outline text-xs py-1 px-2', title: 'Vừa màn hình' }, '⊡ Vừa');

  function applyZoom() {
    const pct = ZOOM_STEPS[zoomIdx];
    zoomLabel.textContent = `${pct}%`;
    // Image width relative to the scroll container
    imgEl.style.width = pct <= 100 ? '100%' : `${pct}%`;
    imgEl.style.maxWidth = pct <= 100 ? '100%' : 'none';
    zoomOut.disabled = zoomIdx === 0;
    zoomIn.disabled = zoomIdx === ZOOM_STEPS.length - 1;
  }

  zoomOut.addEventListener('click', () => { if (zoomIdx > 0) { zoomIdx--; applyZoom(); } });
  zoomIn.addEventListener('click', () => { if (zoomIdx < ZOOM_STEPS.length - 1) { zoomIdx++; applyZoom(); } });
  zoomFit.addEventListener('click', () => { zoomIdx = ZOOM_DEFAULT; applyZoom(); });

  toolbar.appendChild(zoomOut);
  toolbar.appendChild(zoomLabel);
  toolbar.appendChild(zoomIn);
  toolbar.appendChild(el('div', { class: 'w-px bg-border self-stretch mx-1' })); // divider
  toolbar.appendChild(zoomFit);
  toolbar.appendChild(el('span', { class: 'text-[11px] text-text-muted ml-auto' }, 'Kéo để cuộn khi phóng to'));
  modal.appendChild(toolbar);

  // ── Scrollable image area ─────────────────────────────────────────────────
  const imgWrap = el('div', { class: 'flex-1 overflow-auto bg-gray-100 relative', style: 'min-height: 0;' });

  // Placeholder for pinch-to-zoom on mobile: touch events
  const imgEl = el('img', {
    src: pages[0] || '',
    alt: 'Trang SGK',
    class: 'block rounded border border-border bg-white mx-auto',
    style: 'width: 100%; max-width: 100%; height: auto; display: block; cursor: zoom-in; transition: width 0.15s ease;',
  });
  imgEl.onerror = () => {
    imgEl.style.display = 'none';
    const err = el('div', { class: 'p-8 text-center text-text-muted text-sm' }, '⚠️ Không tải được ảnh SGK. Kiểm tra kết nối mạng.');
    imgWrap.appendChild(err);
  };

  // Click image to zoom in (for touch users without toolbar access)
  imgEl.addEventListener('click', () => {
    if (zoomIdx < ZOOM_STEPS.length - 1) { zoomIdx++; applyZoom(); }
    else { zoomIdx = ZOOM_DEFAULT; applyZoom(); }
  });

  imgWrap.appendChild(imgEl);
  modal.appendChild(imgWrap);

  // ── Page navigation ──────────────────────────────────────────────────────
  if (pages.length > 1) {
    const nav = el('div', { class: 'flex justify-center gap-2 flex-wrap px-4 py-3 border-t border-border flex-shrink-0' });
    pages.forEach((url, i) => {
      const label = pageNumbers[i] ? `Trang ${pageNumbers[i]}` : `Trang ${i + 1}`;
      const btn = el('button', { class: `btn text-sm py-1 px-4 ${i === 0 ? 'btn-cta' : 'btn-outline'}` }, label);
      btn.addEventListener('click', () => {
        imgEl.src = url;
        imgWrap.scrollTo(0, 0); // reset scroll on page change
        nav.querySelectorAll('button').forEach((nb, ni) => {
          nb.className = `btn text-sm py-1 px-4 ${ni === i ? 'btn-cta' : 'btn-outline'}`;
        });
        Audio.click();
      });
      nav.appendChild(btn);
    });
    modal.appendChild(nav);
  }

  overlay.appendChild(modal);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  // Keyboard: Escape to close, +/- to zoom
  const keyHandler = e => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', keyHandler); }
    if (e.key === '+' || e.key === '=') { if (zoomIdx < ZOOM_STEPS.length - 1) { zoomIdx++; applyZoom(); } }
    if (e.key === '-') { if (zoomIdx > 0) { zoomIdx--; applyZoom(); } }
  };
  document.addEventListener('keydown', keyHandler);
  overlay.addEventListener('remove', () => document.removeEventListener('keydown', keyHandler));

  return overlay;
}

function openSourcePagesModal(block) {
  const pages = block.sourcePages || [];
  if (!pages.length) return;

  const pageNumbers = block.sourceStartPage && block.sourceEndPage
    ? Array.from({ length: (block.sourceEndPage - block.sourceStartPage) + 1 }, (_, idx) => block.sourceStartPage + idx)
    : [];

  const overlay = buildSGKViewerOverlay({
    pages,
    pageNumbers,
    title: block.title || 'Trang SGK',
    sourceLabel: block.sourceLabel || '',
  });
  document.body.appendChild(overlay);
}

function openLessonReviewModal(moduleData, lessonBlocks, readingBlock) {
  const overlay = el('div', {
    class: 'fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4',
    style: 'backdrop-filter: blur(4px)',
  });
  const modal = el('div', { class: 'bg-surface rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto p-4 flex flex-col gap-4' });
  const closeRow = el('div', { class: 'flex justify-between items-center sticky top-0 bg-surface py-1' });
  closeRow.appendChild(el('span', { class: 'font-display text-lg text-méo-purple' }, (readingBlock?.title || moduleData.title) || 'Bài học'));
  const closeBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3' }, '✕ Đóng');
  closeBtn.addEventListener('click', () => overlay.remove());
  closeRow.appendChild(closeBtn);
  modal.appendChild(closeRow);

  lessonBlocks.forEach(block => {
    if (block.type === 'reading-page') {
      modal.appendChild(renderReviewReadingBlock(block));
      return;
    }
    modal.appendChild(renderReviewTheoryBlock(block));
  });

  overlay.appendChild(modal);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function renderLessonBlock(block, onNext) {
  // Dispatch to specialized renderer for reading pages
  if (block.type === 'reading-page') {
    return renderReadingPageBlock(block, onNext);
  }

  const meta = getLessonBlockMeta(block);
  const wrapper = el('div', { class: 'lesson-theory-block' });
  const teacher = el('div', { class: 'lesson-teacher-card' });
  teacher.innerHTML = `
    <div class="teacher-avatar" aria-hidden="true"><img src="assets/images/gau-lun-teacher-avatar.png" alt="" class="w-full h-full object-contain" /></div>
    <div>
      <div class="teacher-name">${block.teacherName || 'Gâu tiên sinh'}</div>
      <div class="teacher-role">${meta.role}</div>
    </div>
  `;

  const content = el('div', { class: 'lesson-theory-content' });
  content.appendChild(el('div', { class: 'text-xs font-bold text-warning-dk bg-warning-bg rounded-xl px-3 py-2 mb-3' }, meta.hint));
  content.appendChild(el('h2', { class: 'font-display text-2xl text-méo-purple mb-3' }, block.title || 'Bài học ngắn'));
  if (block.sourceLabel) {
    content.appendChild(el('div', { class: 'text-xs font-bold text-text-muted mb-3' }, block.sourceLabel));
  }
  if (block.sourcePages?.length) {
    const pageBtn = el('button', { class: 'btn btn-outline text-sm py-1 px-3 mb-3' }, '📘 Xem trang SGK thật');
    pageBtn.addEventListener('click', () => {
      Audio.click();
      openSourcePagesModal(block);
    });
    content.appendChild(pageBtn);
  }

  (block.points || []).forEach(point => {
    const row = el('div', { class: 'lesson-theory-point' });
    row.innerHTML = `<span class="lesson-point-dot"></span><span>${point}</span>`;
    content.appendChild(row);
  });

  if (block.example) {
    const example = el('div', { class: 'lesson-theory-example' });
    example.innerHTML = block.example;
    content.appendChild(example);
  }

  const nextRow = el('div', { class: 'flex justify-center mt-6' });
  const nextBtn = el('button', { class: 'btn btn-cta' }, block.cta || 'Làm thử nào');
  nextBtn.addEventListener('click', onNext);
  nextRow.appendChild(nextBtn);

  wrapper.appendChild(teacher);
  wrapper.appendChild(content);
  wrapper.appendChild(nextRow);
  return wrapper;
}
