/**
 * MEUW ACADEMY — parent.js
 * Parent Dashboard & Settings
 */

import { el, animateClass, formatDateVI } from '../utils.js';
import State from '../state.js';
import Router from '../router.js';
import { Audio } from '../audio.js';

export function renderParent() {
  const container = el('div', { class: 'page-container parent-container max-w-4xl' });

  // 1. PIN Lock Check
  if (State.isPinLocked()) {
    container.innerHTML = `<div class="text-center mt-20">
      <h2 class="font-display text-3xl text-wrong mb-4">Đã khóa khu vực Phụ huynh</h2>
      <p>Nhập sai PIN quá nhiều lần. Vui lòng quay lại sau.</p>
      <button class="btn btn-outline mt-8" onclick="window.history.back()">Quay lại</button>
    </div>`;
    return container;
  }

  // 2. Initial PIN Entry Modal
  let isAuthorized = false;
  
  const authWrapper = el('div', { class: 'flex-center min-h-[60vh] flex-col' });
  const pinTitle = el('h2', { class: 'font-display text-2xl mb-6 text-center' }, 'Khu vực dành cho Phụ huynh');
  const pinError = el('div', { class: 'text-wrong font-bold text-sm h-5 mb-4 text-center' });
  
  // Custom Keypad (Mobile friendly)
  const keypad = el('div', { class: 'pin-keypad grid grid-cols-3 gap-3 w-full max-w-xs mx-auto mb-6' });
  let currentPin = '';
  const dotsContainer = el('div', { class: 'flex justify-center gap-3 mb-6' });
  const dots = [];
  
  for (let i = 0; i < 4; i++) {
    const dot = el('div', { class: 'w-4 h-4 rounded-full border-2 border-border transition-colors' });
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }

  const updateDots = () => {
    dots.forEach((dot, idx) => {
      dot.className = `w-4 h-4 rounded-full border-2 transition-colors ${idx < currentPin.length ? 'bg-méo-purple border-méo-purple' : 'bg-transparent border-border'}`;
    });
  };

  const handlePinSubmit = () => {
    try {
      if (State.validatePin(currentPin)) {
        Audio.correct();
        isAuthorized = true;
        authWrapper.remove();
        renderDashboardContent(container);
      }
    } catch (e) {
      Audio.wrong();
      currentPin = '';
      updateDots();
      pinError.textContent = e.message;
      animateClass(dotsContainer, 'shake', 400);
      
      if (State.isPinLocked()) {
        Router.replace('/');
      }
    }
  };

  [1,2,3,4,5,6,7,8,9,'C',0,'OK'].forEach(key => {
    const btn = el('button', { class: 'pin-key btn-secondary font-display text-xl h-14 rounded-xl' }, String(key));
    btn.addEventListener('click', () => {
      Audio.click();
      if (key === 'C') {
        currentPin = currentPin.slice(0, -1);
      } else if (key === 'OK') {
        if (currentPin.length === 4) handlePinSubmit();
      } else {
        if (currentPin.length < 4) {
          currentPin += key;
          if (currentPin.length === 4) {
            updateDots();
            setTimeout(handlePinSubmit, 150); // small delay to see the 4th dot
            return;
          }
        }
      }
      updateDots();
      pinError.textContent = '';
    });
    keypad.appendChild(btn);
  });

  authWrapper.appendChild(pinTitle);
  authWrapper.appendChild(pinError);
  authWrapper.appendChild(dotsContainer);
  authWrapper.appendChild(keypad);
  
  const backBtn = el('button', { class: 'btn btn-outline mt-6' }, 'Quay lại trang chính');
  backBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/'); });
  authWrapper.appendChild(backBtn);

  container.appendChild(authWrapper);

  return container;
}

// ============================================
// DASHBOARD CONTENT (Post-PIN)
// ============================================
function renderDashboardContent(container) {
  // 1. Header
  const header = el('div', { class: 'flex-between mb-8 pb-4 border-b-2 border-border' });
  const title = el('h1', { class: 'font-display text-3xl text-méo-purple' }, '⚙️ Quản lý Phụ huynh');
  const closeBtn = el('button', { class: 'btn btn-outline text-sm' }, 'Đóng');
  closeBtn.addEventListener('click', () => { Audio.click(); Router.navigate('/'); });
  header.appendChild(title);
  header.appendChild(closeBtn);
  container.appendChild(header);

  // 2. Tabs
  const tabsContainer = el('div', { class: 'tabs' });
  const tabs = [
    { id: 'stats', label: '📊 Thống kê', active: true },
    { id: 'history', label: '📅 Lịch sử' },
    { id: 'settings', label: '🛠️ Cài đặt' },
    { id: 'data', label: '💾 Dữ liệu' }
  ];

  const contentArea = el('div', { class: 'tab-content-area relative' });

  tabs.forEach(t => {
    const btn = el('button', { class: `tab-btn ${t.active ? 'active' : ''}` }, t.label);
    const content = el('div', { class: `tab-content ${t.active ? 'active' : ''}`, id: `tab-${t.id}` });
    
    // Render specific tab content
    if (t.id === 'stats') renderStatsTab(content);
    else if (t.id === 'history') renderHistoryTab(content);
    else if (t.id === 'settings') renderSettingsTab(content);
    else if (t.id === 'data') renderDataTab(content);

    btn.addEventListener('click', () => {
      Audio.click();
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      contentArea.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      content.classList.add('active');
    });

    tabsContainer.appendChild(btn);
    contentArea.appendChild(content);
  });

  container.appendChild(tabsContainer);
  container.appendChild(contentArea);
}

// ============================================
// TAB: STATS
// ============================================
function renderStatsTab(container) {
  const profile = State.getActiveProfile();
  const stats = profile.stats || {};
  
  // Overview Cards
  const grid = el('div', { class: 'grid grid-cols-2 md:grid-cols-4 gap-4 mb-8' });
  
  const timeSecs = Math.floor((stats.totalTimeMs || 0) / 1000);
  const timeStr = timeSecs > 3600 ? `${Math.floor(timeSecs/3600)} giờ` : `${Math.floor(timeSecs/60)} phút`;
  
  const overviews = [
    { label: 'Tổng ⭐', value: profile.xpTotal, emoji: '🌟' },
    { label: 'Thời gian học', value: timeStr, emoji: '⏱️' },
    { label: 'Chuỗi cao nhất', value: `${stats.longestStreakEver || 0} ngày`, emoji: '🔥' },
    { label: 'Tỉ lệ đúng', value: `${State.getAccuracyRate()}%`, emoji: '🎯' }
  ];

  overviews.forEach(item => {
    const card = el('div', { class: 'card p-4 flex flex-col items-center text-center' });
    card.innerHTML = `
      <div class="text-3xl mb-2">${item.emoji}</div>
      <div class="text-xl font-bold text-méo-purple">${item.value}</div>
      <div class="text-xs text-text-muted font-bold uppercase mt-1">${item.label}</div>
    `;
    grid.appendChild(card);
  });
  
  container.appendChild(grid);

  // Subject Breakdown Bar Chart
  const subjects = el('div', { class: 'card p-6' });
  subjects.innerHTML = '<h3 class="font-display text-xl mb-6">Môn học đã hoàn thành</h3>';
  
  const chartData = [
    { label: 'Toán', val: stats.mathModulesCompleted || 0, color: 'bg-math-color' },
    { label: 'Tiếng Anh', val: stats.engModulesCompleted || 0, color: 'bg-eng-color' },
    { label: 'Khoa học', val: stats.sciModulesCompleted || 0, color: 'bg-sci-color' },
    { label: 'Đọc hiểu', val: stats.readModulesCompleted || 0, color: 'bg-read-color' },
  ];
  const maxVal = Math.max(...chartData.map(d => d.val), 10);

  const chart = el('div', { class: 'flex flex-col gap-4' });
  chartData.forEach(d => {
    const row = el('div', { class: 'flex items-center gap-4' });
    row.innerHTML = `
      <div class="w-24 text-sm font-bold text-right">${d.label}</div>
      <div class="flex-1 h-6 bg-bg-2 rounded-full overflow-hidden">
        <div class="h-full ${d.color} rounded-full" style="width: ${(d.val / maxVal) * 100}%"></div>
      </div>
      <div class="w-8 text-sm font-bold">${d.val}</div>
    `;
    chart.appendChild(row);
  });

  subjects.appendChild(chart);
  container.appendChild(subjects);
}

// ============================================
// TAB: HISTORY
// ============================================
function renderHistoryTab(container) {
  const profile = State.getActiveProfile();
  
  // A simple heat map or list of recent completed modules
  const wrap = el('div', { class: 'card p-6' });
  wrap.innerHTML = '<h3 class="font-display text-xl mb-4">Lịch sử bài học gần đây</h3>';

  const list = el('div', { class: 'flex flex-col gap-3 max-h-96 overflow-y-auto pr-2' });
  
  // Sort completed modules by date desc
  const completed = Object.entries(profile.completedModules || {})
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 20); // last 20

  if (completed.length === 0) {
    list.innerHTML = '<div class="text-center text-text-muted py-8">Chưa có dữ liệu lịch sử.</div>';
  } else {
    completed.forEach(c => {
      const date = new Date(c.completedAt);
      const timeStr = `${date.getDate()}/${date.getMonth()+1} - ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
      const item = el('div', { class: 'flex-between p-3 bg-bg-2 rounded-lg' });
      item.innerHTML = `
        <div>
          <div class="font-bold text-sm">${c.id}</div>
          <div class="text-xs text-text-muted">${timeStr}</div>
        </div>
        <div class="text-right">
          <div class="font-bold text-méo-purple">+${c.xp} ⭐</div>
          <div class="text-xs text-correct-dk">${c.score}/${c.total} câu đúng</div>
        </div>
      `;
      list.appendChild(item);
    });
  }

  wrap.appendChild(list);
  container.appendChild(wrap);
}

// ============================================
// TAB: SETTINGS
// ============================================
function renderSettingsTab(container) {
  const profile = State.getActiveProfile();
  const settings = profile.settings || {};

  const wrap = el('div', { class: 'card p-6' });

  // 1. Audio Toggles
  const soundToggle = createToggleRow('Âm thanh & Nhạc', settings.soundOn !== false, (val) => {
    State.setSetting('soundOn', val);
  });
  wrap.appendChild(soundToggle);

  const speechToggle = createToggleRow('Nhận diện giọng nói (Speech API)', settings.speechEnabled !== false, (val) => {
    State.setSetting('speechEnabled', val);
  });
  wrap.appendChild(speechToggle);

  wrap.appendChild(el('hr', { class: 'my-6 border-border' }));

  // 2. Break Reminder
  const breakGroup = el('div', { class: 'input-group' });
  breakGroup.innerHTML = '<label class="input-label">Nhắc nhở nghỉ giải lao (phút)</label>';
  const breakSelect = el('select', { class: 'input-field w-full md:w-1/2 cursor-pointer' });
  [15, 30, 45, 60, 0].forEach(val => {
    const opt = el('option', { value: val }, val === 0 ? 'Không nhắc' : `${val} phút`);
    if (val === (settings.breakReminderMins || 45)) opt.selected = true;
    breakSelect.appendChild(opt);
  });
  breakSelect.addEventListener('change', (e) => {
    State.setSetting('breakReminderMins', parseInt(e.target.value, 10));
  });
  breakGroup.appendChild(breakSelect);
  wrap.appendChild(breakGroup);

  wrap.appendChild(el('hr', { class: 'my-6 border-border' }));

  // 3. Change PIN
  const pinArea = el('div');
  pinArea.innerHTML = '<h3 class="font-bold text-lg mb-4">Thay đổi mã PIN Phụ huynh</h3>';
  
  const oldPin = el('input', { type: 'password', class: 'input-field mb-2', placeholder: 'PIN hiện tại', maxLength: 4 });
  const newPin = el('input', { type: 'password', class: 'input-field mb-2', placeholder: 'PIN mới (4 số)', maxLength: 4 });
  const changeBtn = el('button', { class: 'btn btn-secondary text-sm' }, 'Đổi PIN');
  const pinMsg = el('div', { class: 'text-sm mt-2 font-bold h-5' });

  changeBtn.addEventListener('click', () => {
    try {
      State.changePin(oldPin.value, newPin.value);
      pinMsg.textContent = 'Đổi PIN thành công!';
      pinMsg.className = 'text-sm mt-2 font-bold h-5 text-correct-dk';
      oldPin.value = '';
      newPin.value = '';
    } catch (e) {
      pinMsg.textContent = e.message;
      pinMsg.className = 'text-sm mt-2 font-bold h-5 text-wrong';
    }
  });

  pinArea.appendChild(oldPin);
  pinArea.appendChild(newPin);
  pinArea.appendChild(changeBtn);
  pinArea.appendChild(pinMsg);

  wrap.appendChild(pinArea);

  // Removed dev area from here since it's moved to Data tab

  container.appendChild(wrap);
}

function createToggleRow(label, initialValue, onChange) {
  const row = el('div', { class: 'flex-between py-3 border-b border-border border-dashed last:border-0' });
  row.innerHTML = `<span class="font-bold">${label}</span>`;
  
  const labelEl = el('label', { class: 'toggle-switch' });
  const input = el('input', { type: 'checkbox' });
  input.checked = initialValue;
  const slider = el('span', { class: 'toggle-slider' });
  
  input.addEventListener('change', (e) => {
    Audio.click();
    onChange(e.target.checked);
  });
  
  labelEl.appendChild(input);
  labelEl.appendChild(slider);
  row.appendChild(labelEl);
  
  return row;
}

// ============================================
// TAB: DATA (Import/Export)
// ============================================
function renderDataTab(container) {
  const wrap = el('div', { class: 'card p-6' });

  wrap.innerHTML = `
    <h3 class="font-display text-xl mb-4">Quản lý Dữ liệu</h3>
    <p class="text-sm text-text-muted mb-6">Tất cả dữ liệu học tập được lưu cục bộ trên trình duyệt này. Nếu em muốn chuyển sang máy khác, hãy xuất dữ liệu và nhập vào máy kia.</p>
  `;

  // Export
  const exportBtn = el('button', { class: 'btn btn-primary w-full md:w-auto mb-4' }, '💾 Tải tệp sao lưu (.json)');
  exportBtn.addEventListener('click', () => {
    Audio.click();
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MéoAcademy_Backup_${formatDateVI(new Date()).replace(/ /g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  wrap.appendChild(exportBtn);

  wrap.appendChild(el('hr', { class: 'my-6 border-border' }));

  // Sync Code (Base64)
  const syncCodeLabel = el('h4', { class: 'font-bold mb-2' }, 'Đồng bộ nhanh bằng Mã (Sync Code)');
  const syncCodeDesc = el('p', { class: 'text-sm text-text-muted mb-4' }, 'Dùng mã này để copy-paste dán sang điện thoại/máy tính bảng nhanh chóng mà không cần tải file.');
  
  const syncTextarea = el('textarea', { class: 'input-field w-full h-24 mb-2 font-mono text-xs', placeholder: 'Dán mã đồng bộ vào đây...' });
  const syncRow = el('div', { class: 'flex gap-2 mb-4' });
  
  const genCodeBtn = el('button', { class: 'btn btn-secondary flex-1' }, 'Tạo Mã Đồng Bộ');
  genCodeBtn.addEventListener('click', () => {
    Audio.click();
    const json = State.exportJSON();
    syncTextarea.value = btoa(encodeURIComponent(json));
    syncTextarea.select();
  });
  
  const applyCodeBtn = el('button', { class: 'btn btn-primary flex-1' }, 'Áp dụng Mã');
  applyCodeBtn.addEventListener('click', () => {
    Audio.click();
    try {
      const code = syncTextarea.value.trim();
      if (!code) throw new Error('Vui lòng dán mã!');
      const json = decodeURIComponent(atob(code));
      State.importJSON(json);
      alert('Khôi phục thành công! Đang tải lại...');
      window.location.reload();
    } catch(e) {
      alert('Mã không hợp lệ hoặc bị lỗi!');
    }
  });

  syncRow.appendChild(genCodeBtn);
  syncRow.appendChild(applyCodeBtn);

  wrap.appendChild(syncCodeLabel);
  wrap.appendChild(syncCodeDesc);
  wrap.appendChild(syncTextarea);
  wrap.appendChild(syncRow);

  // Cloud Sync (Firebase)
  const cloudCodeLabel = el('h4', { class: 'font-bold mb-2' }, 'Đồng bộ qua Đám Mây (Firebase)');
  const cloudCodeDesc = el('p', { class: 'text-sm text-text-muted mb-4' }, 'Tự động lưu và tải dữ liệu từ máy chủ. Ghi nhớ Mã Đám Mây bên dưới để tải về trên thiết bị khác.');
  
  const cloudIdGroup = el('div', { class: 'mb-4 flex flex-col gap-1' });
  const cloudIdLabel = el('label', { class: 'text-xs font-bold text-text-muted uppercase' }, 'Mã Đám Mây (Cloud ID):');
  const cloudIdInput = el('input', { type: 'text', class: 'input-field w-full font-mono text-sm text-center font-bold text-méo-purple', value: State.getActiveProfile().id });
  cloudIdGroup.appendChild(cloudIdLabel);
  cloudIdGroup.appendChild(cloudIdInput);

  const cloudRow = el('div', { class: 'flex gap-2 mb-4' });
  const pushBtn = el('button', { class: 'btn btn-secondary flex-1' }, '⬆️ Đẩy lên Đám Mây');
  const pullBtn = el('button', { class: 'btn btn-primary flex-1' }, '⬇️ Tải về máy');
  const cloudStatus = el('div', { class: 'text-sm font-bold h-5 text-center mb-4' });

  pushBtn.addEventListener('click', async () => {
    Audio.click();
    const syncId = cloudIdInput.value.trim();
    if (!syncId) {
      cloudStatus.textContent = '❌ Lỗi: Vui lòng nhập Mã Đám Mây';
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-wrong';
      return;
    }
    cloudStatus.textContent = 'Đang tải lên...';
    cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-méo-purple';
    try {
      const { cloudSyncPush } = await import('./cloud-sync.js');
      await cloudSyncPush(syncId, State.exportJSON());
      cloudStatus.textContent = '✅ Đã đồng bộ lên đám mây thành công!';
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-correct-dk';
    } catch (err) {
      cloudStatus.textContent = '❌ Lỗi: ' + err.message;
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-wrong';
    }
  });

  pullBtn.addEventListener('click', async () => {
    Audio.click();
    const syncId = cloudIdInput.value.trim();
    if (!syncId) {
      cloudStatus.textContent = '❌ Lỗi: Vui lòng nhập Mã Đám Mây';
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-wrong';
      return;
    }
    cloudStatus.textContent = 'Đang tải về...';
    cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-méo-purple';
    try {
      const { cloudSyncPull } = await import('./cloud-sync.js');
      const jsonStr = await cloudSyncPull(syncId);
      State.importJSON(jsonStr);
      cloudStatus.textContent = '✅ Đã tải về thành công! Đang tải lại...';
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-correct-dk';
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      cloudStatus.textContent = '❌ Lỗi: ' + err.message;
      cloudStatus.className = 'text-sm font-bold h-5 text-center mb-4 text-wrong';
    }
  });

  cloudRow.appendChild(pushBtn);
  cloudRow.appendChild(pullBtn);
  
  wrap.appendChild(cloudCodeLabel);
  wrap.appendChild(cloudCodeDesc);
  wrap.appendChild(cloudIdGroup);
  wrap.appendChild(cloudRow);
  wrap.appendChild(cloudStatus);

  wrap.appendChild(el('hr', { class: 'my-6 border-wrong opacity-30' }));

  // Danger Zone - Replaced with Dev Tool (Reset Current Day)
  const devArea = el('div', { class: 'mt-8 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-xl' });
  devArea.innerHTML = '<h3 class="font-bold text-lg mb-2 text-yellow-800">🛠️ Công cụ Phát triển (Dev Mode)</h3><p class="text-sm mb-4 text-yellow-700">Khôi phục bài học của ngày hôm nay về 0 (Học lại từ đầu).</p>';
  const hardResetBtn = el('button', { class: 'btn bg-red-500 hover:bg-red-600 text-white border-none text-sm px-4 py-2 rounded-lg font-bold w-full' }, 'Học lại Ngày Hôm Nay');
  hardResetBtn.addEventListener('click', async () => {
    if (confirm('BẠN CÓ CHẮC KHÔNG? Toàn bộ bài học của Ngày hôm nay sẽ bị đánh dấu là chưa hoàn thành. (XP và Huy hiệu vẫn được giữ nguyên)')) {
      const { getCurriculumDay } = await import('../data/curriculum-loader.js');
      const profile = State.getActiveProfile();
      const dayData = getCurriculumDay(profile.currentDay);
      if (dayData && dayData.modules) {
        const moduleIds = dayData.modules.map(m => m.id);
        State.resetCurrentDayProgress(moduleIds);
        alert(`Đã khôi phục ${moduleIds.length} bài học của Ngày ${profile.currentDay}.`);
        window.location.reload();
      } else {
        alert('Không tìm thấy dữ liệu bài học ngày hôm nay!');
      }
    }
  });
  devArea.appendChild(hardResetBtn);
  wrap.appendChild(devArea);

  container.appendChild(wrap);
}
