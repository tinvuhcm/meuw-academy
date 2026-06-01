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
    <p class="text-sm text-text-muted mb-6">Dữ liệu vẫn lưu trên máy để học offline. Khi đăng nhập tài khoản, phụ huynh có thể chủ động đẩy dữ liệu lên cloud hoặc tải dữ liệu cloud về máy này.</p>
  `;

  const backupArea = el('div', { class: 'p-4 border-2 border-border rounded-xl bg-bg mb-6' });
  backupArea.innerHTML = `
    <h4 class="font-bold mb-2">Sao lưu thủ công</h4>
    <p class="text-sm text-text-muted mb-4">Dùng file JSON làm phương án khôi phục an toàn trước khi đổi máy hoặc đồng bộ tài khoản.</p>
  `;

  const backupActions = el('div', { class: 'grid gap-3 md:grid-cols-2' });
  const exportBtn = el('button', { class: 'btn btn-primary w-full' }, '💾 Tải tệp sao lưu (.json)');
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

  const fileInput = el('input', { type: 'file', accept: 'application/json,.json', class: 'hidden' });
  const restoreBtn = el('button', { class: 'btn btn-secondary w-full' }, '📥 Khôi phục từ tệp (.json)');
  restoreBtn.addEventListener('click', () => {
    Audio.click();
    fileInput.click();
  });
  fileInput.addEventListener('change', async () => {
    Audio.click();
    try {
      const file = fileInput.files?.[0];
      if (!file) return;
      const json = await file.text();
      JSON.parse(json);
      const ok = confirm('Khôi phục file này sẽ ghi đè dữ liệu học tập trên máy hiện tại. Bạn có chắc muốn tiếp tục?');
      if (!ok) return;
      State.importJSON(json);
      alert('Khôi phục thành công. App sẽ tải lại để áp dụng dữ liệu mới.');
      window.location.reload();
    } catch (e) {
      alert(`Không thể khôi phục file: ${e.message}`);
    } finally {
      fileInput.value = '';
    }
  });

  backupActions.appendChild(exportBtn);
  backupActions.appendChild(restoreBtn);
  backupArea.appendChild(backupActions);
  backupArea.appendChild(fileInput);
  wrap.appendChild(backupArea);

  const accountArea = el('div', { class: 'p-4 border-2 border-méo-purple rounded-xl bg-méo-purple-lt mb-6' });
  accountArea.innerHTML = `
    <h4 class="font-bold mb-2 text-méo-purple">Tài khoản học tập</h4>
    <p class="text-sm text-text mb-4">Một email tương ứng một bé. Khi dữ liệu local và cloud khác nhau, app sẽ hỏi trước khi ghi đè.</p>
  `;

  const accountStatus = el('div', { class: 'text-sm font-bold mb-4 text-text-muted' }, 'Đang kiểm tra tài khoản...');
  const emailInput = el('input', { type: 'email', class: 'input-field w-full mb-2', placeholder: 'Email phụ huynh' });
  const passwordInput = el('input', { type: 'password', class: 'input-field w-full mb-3', placeholder: 'Mật khẩu', autocomplete: 'current-password' });
  const authRow = el('div', { class: 'grid gap-3 md:grid-cols-2 mb-3' });
  const signInBtn = el('button', { class: 'btn btn-primary w-full' }, 'Đăng nhập');
  const signUpBtn = el('button', { class: 'btn btn-secondary w-full' }, 'Tạo tài khoản');
  const syncRow = el('div', { class: 'grid gap-3 md:grid-cols-3' });
  const uploadBtn = el('button', { class: 'btn btn-secondary w-full' }, 'Đẩy máy này lên cloud');
  const downloadBtn = el('button', { class: 'btn btn-primary w-full' }, 'Dùng dữ liệu cloud');
  const signOutBtn = el('button', { class: 'btn btn-outline w-full' }, 'Đăng xuất');

  function setAccountStatus(message, type = 'info') {
    const color = type === 'error' ? 'text-wrong' : type === 'success' ? 'text-correct-dk' : 'text-text-muted';
    accountStatus.className = `text-sm font-bold mb-4 ${color}`;
    accountStatus.textContent = message;
  }

  function setAccountControls(isSignedIn) {
    emailInput.disabled = isSignedIn;
    passwordInput.disabled = isSignedIn;
    signInBtn.disabled = isSignedIn;
    signUpBtn.disabled = isSignedIn;
    uploadBtn.disabled = !isSignedIn;
    downloadBtn.disabled = !isSignedIn;
    signOutBtn.disabled = !isSignedIn;
  }

  async function handleSignedIn(session, syncModule) {
    State.setAccountSession({ userId: session.user.id, email: session.user.email });
    setAccountStatus(`Đã đăng nhập: ${session.user.email}`, 'success');
    setAccountControls(true);

    const cloud = await syncModule.fetchCloudState();
    if (!cloud?.state) {
      const shouldUpload = confirm('Tài khoản này chưa có dữ liệu cloud. Bạn có muốn đẩy dữ liệu trên máy này lên tài khoản không?');
      if (shouldUpload) {
        await syncModule.saveCloudState(State.getState());
        State.markSynced();
        setAccountStatus('Đã tạo dữ liệu cloud từ máy này.', 'success');
      }
      return;
    }

    const localTime = new Date(State.getLocalUpdatedAt() || 0).getTime();
    const cloudTime = new Date(cloud.updated_at || 0).getTime();
    if (Math.abs(localTime - cloudTime) > 1000) {
      const useCloud = confirm('Phát hiện dữ liệu trên máy này và cloud khác nhau.\n\nOK: dùng dữ liệu cloud và ghi đè máy này.\nCancel: giữ dữ liệu máy này, chưa ghi đè gì.');
      if (useCloud) {
        State.importJSON(JSON.stringify(cloud.state));
        State.setAccountSession({ userId: session.user.id, email: session.user.email });
        State.markSynced();
        alert('Đã tải dữ liệu cloud. App sẽ tải lại.');
        window.location.reload();
      } else {
        setAccountStatus('Đang giữ dữ liệu trên máy này. Bạn có thể bấm "Đẩy máy này lên cloud" khi muốn.', 'info');
      }
    }
  }

  async function loadAccountModule() {
    const syncModule = await import('./account-sync.js');
    if (!syncModule.isAccountSyncConfigured()) {
      setAccountStatus('Supabase chưa cấu hình. Sau khi nhập URL/anon key, đăng nhập email sẽ hoạt động.', 'error');
      setAccountControls(false);
      signInBtn.disabled = true;
      signUpBtn.disabled = true;
      return null;
    }
    return syncModule;
  }

  signInBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang đăng nhập...');
      const data = await syncModule.signInWithEmail(emailInput.value.trim(), passwordInput.value);
      await handleSignedIn(data.session, syncModule);
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  signUpBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang tạo tài khoản...');
      const data = await syncModule.signUpWithEmail(emailInput.value.trim(), passwordInput.value);
      if (data.session) {
        await handleSignedIn(data.session, syncModule);
      } else {
        setAccountStatus('Đã tạo tài khoản. Hãy kiểm tra email nếu Supabase yêu cầu xác nhận.', 'success');
      }
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  uploadBtn.addEventListener('click', async () => {
    Audio.click();
    if (!confirm('Thao tác này sẽ ghi đè dữ liệu cloud bằng dữ liệu trên máy hiện tại. Tiếp tục?')) return;
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang đẩy dữ liệu lên cloud...');
      await syncModule.saveCloudState(State.getState());
      State.markSynced();
      setAccountStatus('Đã đẩy dữ liệu máy này lên cloud.', 'success');
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  downloadBtn.addEventListener('click', async () => {
    Audio.click();
    if (!confirm('Thao tác này sẽ ghi đè dữ liệu trên máy hiện tại bằng dữ liệu cloud. Tiếp tục?')) return;
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang tải dữ liệu cloud...');
      const cloud = await syncModule.fetchCloudState();
      if (!cloud?.state) throw new Error('Tài khoản này chưa có dữ liệu cloud.');
      const session = await syncModule.getCurrentSession();
      State.importJSON(JSON.stringify(cloud.state));
      State.setAccountSession({ userId: session.user.id, email: session.user.email });
      State.markSynced();
      alert('Đã tải dữ liệu cloud. App sẽ tải lại.');
      window.location.reload();
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  signOutBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      await syncModule.signOutAccount();
      State.setAccountSession(null);
      setAccountStatus('Đã đăng xuất. Dữ liệu local vẫn giữ trên máy này.');
      setAccountControls(false);
      emailInput.disabled = false;
      passwordInput.disabled = false;
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  authRow.appendChild(signInBtn);
  authRow.appendChild(signUpBtn);
  syncRow.appendChild(uploadBtn);
  syncRow.appendChild(downloadBtn);
  syncRow.appendChild(signOutBtn);

  accountArea.appendChild(accountStatus);
  accountArea.appendChild(emailInput);
  accountArea.appendChild(passwordInput);
  accountArea.appendChild(authRow);
  accountArea.appendChild(syncRow);
  wrap.appendChild(accountArea);

  setAccountControls(false);
  loadAccountModule().then(async (syncModule) => {
    if (!syncModule) return;
    const session = await syncModule.getCurrentSession();
    if (session?.user) {
      emailInput.value = session.user.email || '';
      State.setAccountSession({ userId: session.user.id, email: session.user.email });
      setAccountStatus(`Đã đăng nhập: ${session.user.email}`, 'success');
      setAccountControls(true);
    } else {
      setAccountStatus('Chưa đăng nhập.');
    }
  }).catch((e) => setAccountStatus(e.message, 'error'));

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
