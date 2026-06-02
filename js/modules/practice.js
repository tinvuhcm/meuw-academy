import { el, formatModuleDisplayTitle, getSubjectConfig } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { getCurriculumDay } from '../data/curriculum-loader.js';

export function renderPractice() {
  const container = el('div', { class: 'page-container p-6' });
  
  const header = el('div', { class: 'flex-between mb-6' });
  const backBtn = el('button', { class: 'btn btn-outline' }, '← Quay lại');
  backBtn.addEventListener('click', () => Router.navigate('/'));
  
  const title = el('h1', { class: 'font-display text-3xl' }, 'Phòng Ôn Tập');
  
  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(el('div', { class: 'w-24' }));
  
  const content = el('div', { class: 'flex flex-col gap-8' });
  
  const categories = [
    { id: 'all', title: 'Kiến thức chung', icon: '🌟', color: 'bg-méo-purple-lt border-méo-purple', text: 'text-méo-purple' },
    { id: 'math', title: 'Toán học', icon: '🧮', color: 'bg-blue-100 border-blue-400', text: 'text-blue-600' },
    { id: 'vie', title: 'Tiếng Việt', icon: '📝', color: 'bg-orange-100 border-orange-400', text: 'text-orange-600' },
    { id: 'eng', title: 'Tiếng Anh', icon: '🔤', color: 'bg-green-100 border-green-400', text: 'text-green-600' },
    { id: 'sci', title: 'Khoa học', icon: '🔬', color: 'bg-teal-100 border-teal-400', text: 'text-teal-600' },
    { id: 'other', title: 'Khác', icon: '🎨', color: 'bg-pink-100 border-pink-400', text: 'text-pink-600' }
  ];

  const catGrid = el('div', { class: 'grid grid-cols-2 md:grid-cols-3 gap-4 mb-6' });
  
  categories.forEach(cat => {
    const card = el('button', { class: `p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm border ${cat.color} hover:-translate-y-1 transition-transform` });
    card.innerHTML = `
      <div class="text-4xl">${cat.icon}</div>
      <div class="font-display text-lg ${cat.text}">${cat.title}</div>
    `;
    card.addEventListener('click', () => {
      Router.navigate(`/lesson/practice/${cat.id}`);
    });
    catGrid.appendChild(card);
  });

  content.appendChild(catGrid);
  
  // Show list of completed days
  const profile = State.getActiveProfile();
  const currentDay = profile.currentDay;
  
  const daysList = el('div', { class: 'col-span-full flex flex-col gap-4' });
  
  if (currentDay <= 1 && Object.keys(profile.completedModules || {}).length === 0) {
    daysList.innerHTML = `<div class="text-center p-8 text-text-muted">Em chưa học bài nào cả. Hãy hoàn thành bài học hôm nay trước nhé!</div>`;
  } else {
    // Generate up to current day
    for (let i = 1; i <= currentDay; i++) {
      const dayData = getCurriculumDay(i);
      if (!dayData) continue;
      
      const dayCard = el('div', { class: 'card shadow-sm' });
      dayCard.innerHTML = `<h2 class="font-display text-xl mb-3 border-b pb-2">Ngày ${i}: ${dayData.title}</h2>`;
      
      const modGrid = el('div', { class: 'grid gap-2 sm:grid-cols-2' });
      
      dayData.modules.forEach(m => {
        const isCompleted = State.isModuleComplete(m.id);
        if (!isCompleted && i === currentDay) return; // Only show completed or past modules
        
        const btn = el('button', { 
          class: 'btn text-left justify-start p-3 ' + (isCompleted ? 'bg-correct-bg border border-correct text-text' : 'bg-bg-2 text-text') 
        });
        const conf = getSubjectConfig(m.subject);
        btn.innerHTML = `
          <div class="flex items-center gap-2 w-full">
            <span class="text-2xl">${conf.emoji}</span>
            <div class="flex-1 truncate">
              <div class="font-bold text-sm truncate">${formatModuleDisplayTitle(m)}</div>
              <div class="text-xs text-text-muted">${isCompleted ? 'Điểm: ' + (State.getModuleData(m.id)?.score || 0) : 'Chưa học'}</div>
            </div>
            ${isCompleted ? '<span class="text-correct font-bold">✓</span>' : ''}
          </div>
        `;
        
        btn.addEventListener('click', () => {
          Router.navigate(`/lesson/${i}/${m.id}?mode=practice`);
        });
        
        modGrid.appendChild(btn);
      });
      
      dayCard.appendChild(modGrid);
      daysList.appendChild(dayCard);
    }
  }
  
  content.appendChild(daysList);
  container.appendChild(header);
  container.appendChild(content);
  
  // (removed old btn-random-practice listener)
  
  return container;
}
