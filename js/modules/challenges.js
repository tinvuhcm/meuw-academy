import { el } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';

export function renderChallenges() {
  const container = el('div', { class: 'page-container p-6' });
  
  const header = el('div', { class: 'flex-between mb-6' });
  const backBtn = el('button', { class: 'btn btn-outline' }, '← Quay lại');
  backBtn.addEventListener('click', () => Router.navigate('/'));
  
  const title = el('h1', { class: 'font-display text-3xl' }, 'Thử Thách & Phần Thưởng');
  const points = el('div', { class: 'font-bold text-xl text-warning' }, `⭐ ${State.getXPTotal()} Điểm`);
  
  header.appendChild(backBtn);
  header.appendChild(title);
  header.appendChild(points);
  
  const content = el('div', { class: 'grid gap-6 md:grid-cols-2' });
  
  // Daily Challenges
  const dailyCard = el('div', { class: 'card shadow-sm flex flex-col' });
  dailyCard.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      <img src="assets/images/meo_celebrating_sticker_1780213464815.png" class="h-16 object-contain" />
      <h2 class="font-display text-2xl text-méo-purple">Nhiệm vụ hàng ngày</h2>
    </div>
  `;
  
  const dailyTasks = [
    { title: 'Hoàn thành 5 bài học Toán', current: State.getActiveProfile().stats.mathModulesCompleted || 0, target: 5, reward: 50 },
    { title: 'Hoàn thành 3 bài luyện nói', current: State.getActiveProfile().stats.speechSubmitted || 0, target: 3, reward: 50 },
    { title: 'Vẽ 1 bức tranh', current: State.getActiveProfile().stats.drawingsCreated || 0, target: 1, reward: 30 }
  ];
  
  dailyTasks.forEach(t => {
    const item = el('div', { class: 'flex-between p-3 border-b border-border last:border-0' });
    const isDone = t.current >= t.target;
    item.innerHTML = `
      <div>
        <div class="font-bold ${isDone ? 'line-through text-text-muted' : ''}">${t.title}</div>
        <div class="text-sm text-text-muted">${Math.min(t.current, t.target)} / ${t.target}</div>
      </div>
      <div class="font-bold text-warning">${isDone ? '✓ Đã nhận' : `+${t.reward} ⭐`}</div>
    `;
    dailyCard.appendChild(item);
  });
  
  // Long-term Challenges
  const longCard = el('div', { class: 'card shadow-sm' });
  longCard.innerHTML = `<h2 class="font-display text-2xl mb-4 text-correct">Thử thách dài hạn</h2>`;
  
  const longTasks = [
    { title: 'Chuỗi 7 ngày học liên tiếp', current: State.getStreak(), target: 7, reward: 200 },
    { title: 'Đạt mốc 5000 Điểm', current: State.getXPTotal(), target: 5000, reward: 500 },
    { title: 'Hoàn thành Tháng 1', current: State.getCurrentDay(), target: 30, reward: 1000 }
  ];
  
  longTasks.forEach(t => {
    const item = el('div', { class: 'flex-between p-3 border-b border-border last:border-0' });
    const isDone = t.current >= t.target;
    const progressPct = Math.min(100, (t.current / t.target) * 100);
    item.innerHTML = `
      <div class="w-full mr-4">
        <div class="font-bold flex-between mb-1">
          <span>${t.title}</span>
          <span class="text-sm">${Math.min(t.current, t.target)} / ${t.target}</span>
        </div>
        <div class="w-full bg-border rounded-full h-2">
          <div class="bg-correct h-2 rounded-full" style="width: ${progressPct}%"></div>
        </div>
      </div>
      <div class="font-bold text-warning whitespace-nowrap">${isDone ? '✓' : `+${t.reward} ⭐`}</div>
    `;
    longCard.appendChild(item);
  });
  
  content.appendChild(dailyCard);
  content.appendChild(longCard);
  
  container.appendChild(header);
  container.appendChild(content);
  return container;
}
