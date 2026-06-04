import { el, getSubjectConfig } from '../utils.js';
import { TEXTBOOKS } from '../data/textbooks.js';
import Router from '../router.js';

export function renderLibrary() {
  const container = el('div', { class: 'space-y-8 animate-fade-in pb-12' });

  // Header
  const topNav = el('div', { class: 'flex items-center gap-4 mb-4' });
  const backBtn = el('button', { class: 'btn btn-outline border-border bg-white rounded-full w-12 h-12 flex-center shadow-sm hover:bg-bg-2' }, '←');
  backBtn.addEventListener('click', () => { Router.navigate('/'); });
  topNav.appendChild(backBtn);
  container.appendChild(topNav);

  const header = el('header', { class: 'mb-8 flex justify-between items-center bg-gradient-to-r from-méo-purple to-purple-400 p-6 rounded-3xl text-white shadow-md' });
  header.innerHTML = `
    <div>
      <h1 class="font-display text-3xl mb-2">Thư viện Sách 📚</h1>
      <p class="opacity-90 text-sm">Đọc sách giáo khoa và vở bài tập trực tuyến từ Hành Trang Số.</p>
    </div>
  `;
  container.appendChild(header);

  // Group books by subject
  const subjects = {};
  TEXTBOOKS.forEach(book => {
    if (!subjects[book.subject]) {
      subjects[book.subject] = {
        config: getSubjectConfig(book.subject),
        books: []
      };
    }
    subjects[book.subject].books.push(book);
  });

  // Render Grid
  const gridContainer = el('div', { class: 'grid gap-8' });

  for (const [subjId, data] of Object.entries(subjects)) {
    const subjSection = el('section', { class: 'bg-surface p-6 rounded-3xl border border-border shadow-sm' });
    
    // Subject Title
    const subjTitle = el('h2', { class: 'font-display text-2xl mb-4 text-text flex items-center gap-3' });
    subjTitle.innerHTML = `<span class="w-10 h-10 rounded-full flex-center bg-bg-2 text-xl">${data.config.emoji}</span> ${data.config.name}`;
    subjSection.appendChild(subjTitle);

    // Books Grid
    const booksGrid = el('div', { class: 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4' });
    
    data.books.forEach(book => {
      const isWorkbook = book.isWorkbook;
      const card = el('a', { 
        href: book.url, 
        target: '_blank',
        class: 'book-card group relative bg-bg-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-border hover:-translate-y-1 block' 
      });

      // Cover Placeholder - Beautiful CSS Book
      const coverColor = isWorkbook ? 'from-orange-400 to-red-400' : 'from-blue-400 to-indigo-500';
      const coverIcon = isWorkbook ? '✏️' : '📚';
      
      const cover = el('div', { class: `w-full h-44 bg-gradient-to-br ${coverColor} flex flex-col justify-center items-center p-4 text-center border-b-4 ${isWorkbook ? 'border-red-600' : 'border-indigo-700'} relative shadow-inner` });
      cover.innerHTML = `
        <div class="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/20"></div>
        <span class="text-5xl mb-2 drop-shadow-md transform group-hover:scale-110 transition-transform">${coverIcon}</span>
        <span class="text-xs font-bold text-white/90 drop-shadow-sm px-2 text-center leading-tight line-clamp-2">${book.title.toUpperCase()}</span>
      `;
      card.appendChild(cover);

      // Info
      const info = el('div', { class: 'p-3 text-center bg-white' });
      info.innerHTML = `
        <div class="text-[10px] text-white font-bold inline-block px-3 py-1 rounded-full ${isWorkbook ? 'bg-warning shadow-warning/30' : 'bg-méo-purple shadow-méo-purple/30'} shadow-md uppercase tracking-wider">${isWorkbook ? 'Vở bài tập' : 'Sách học'}</div>
      `;
      card.appendChild(info);
      
      // External link icon hover
      const hoverOverlay = el('div', { class: 'absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex-center' });
      hoverOverlay.innerHTML = `<div class="bg-white text-méo-purple font-bold px-4 py-2 rounded-xl shadow-md flex items-center gap-2">Mở đọc <span class="text-lg">↗</span></div>`;
      card.appendChild(hoverOverlay);

      booksGrid.appendChild(card);
    });

    subjSection.appendChild(booksGrid);
    gridContainer.appendChild(subjSection);
  }

  container.appendChild(gridContainer);
  return container;
}
