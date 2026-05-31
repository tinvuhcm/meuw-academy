import { el, getSubjectConfig } from '../utils.js';
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
  
  // Random Practice Banner
  const randomBanner = el('div', { class: 'bg-méo-purple-lt p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm border border-méo-purple' });
  randomBanner.innerHTML = `
    <div class="w-48 h-48 md:w-64 md:h-64 shrink-0 mx-auto md:mx-0">
      <img src="assets/images/meo_thinking_sticker_1780213451318.png" class="w-full h-full object-contain drop-shadow-md" />
    </div>
    <div class="flex-1 text-center md:text-left">
      <h2 class="font-display text-2xl text-méo-purple mb-2">Luyện Tập Vô Hạn 🌟</h2>
      <p class="text-text mb-4">Méo sẽ tạo ra các bài tập ngẫu nhiên để em ôn luyện kiến thức. Làm đúng sẽ được nhận thêm 25 ⭐ đó nha!</p>
      <button class="btn btn-primary px-8 py-3 text-lg w-full md:w-auto shadow-md hover:-translate-y-1 transition-transform" id="btn-random-practice">Bắt đầu luyện tập</button>
    </div>
  `;
  
  content.appendChild(randomBanner);
  
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
              <div class="font-bold text-sm truncate">${m.title}</div>
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
  
  // Bind events
  setTimeout(() => {
    const btn = container.querySelector('#btn-random-practice');
    if (btn) btn.addEventListener('click', () => Router.navigate('/lesson/practice/random'));
  }, 0);
  
  return container;
}
