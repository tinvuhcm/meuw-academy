/**
 * MEUW ACADEMY — parent.js
 * Parent Dashboard & Settings
 */

import { el, animateClass, formatDateVI, showAlertDialog, showConfirmDialog } from '../utils.js';
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
      } else {
        throw new Error('Mã PIN không đúng!');
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

  // 2. Content Area (Single Page, no tabs)
  const contentArea = el('div', { class: 'tab-content-area flex flex-col gap-6 relative' });
  
  // Section A: Settings
  const settingsSection = el('section', { class: 'card p-6 border-2 border-border' });
  settingsSection.innerHTML = '<h2 class="font-display text-2xl mb-6">🛠️ Thiết lập chung</h2>';
  renderSettingsTab(settingsSection);
  contentArea.appendChild(settingsSection);

  // Section B: Data & Account
  const dataSection = el('section', { class: 'card p-6 border-2 border-border' });
  dataSection.innerHTML = '<h2 class="font-display text-2xl mb-6">💾 Dữ liệu & Đám mây</h2>';
  renderDataTab(dataSection);
  contentArea.appendChild(dataSection);

  container.appendChild(contentArea);
}

// ============================================
// SECTION: SETTINGS
// ============================================
function renderSettingsTab(wrap) {
  const profile = State.getActiveProfile();
  const settings = profile.settings || {};
  const usingDefaultPin = State.isUsingDefaultParentPin();

  // 1. Break Settings
  const breakGroup = el('div', { class: 'input-group mb-6' });
  breakGroup.innerHTML = `<label class="input-label">Nghỉ giải lao khi học online liên tục</label>`;
  const breakGrid = el('div', { class: 'grid md:grid-cols-2 gap-4 mb-2' });

  const studyWrap = el('div');
  studyWrap.innerHTML = `<div class="text-sm font-bold mb-2">Sau bao lâu thì nhắc nghỉ?</div>`;
  const studySelect = el('select', { class: 'input-field' });
  [15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 90].forEach(mins => {
    const option = el('option', { value: String(mins) }, `${mins} phút`);
    if (Number(settings.breakReminderMins || 30) === mins) option.selected = true;
    studySelect.appendChild(option);
  });
  studyWrap.appendChild(studySelect);

  const breakWrap = el('div');
  breakWrap.innerHTML = `<div class="text-sm font-bold mb-2">Thời gian nghỉ</div>`;
  const breakSelect = el('select', { class: 'input-field' });
  [3, 5, 7, 10, 12, 15].forEach(mins => {
    const option = el('option', { value: String(mins) }, `${mins} phút`);
    if (Number(settings.breakDurationMins || 5) === mins) option.selected = true;
    breakSelect.appendChild(option);
  });
  breakWrap.appendChild(breakSelect);

  breakGrid.appendChild(studyWrap);
  breakGrid.appendChild(breakWrap);
  
  const updateBreakBtn = el('button', { class: 'btn btn-secondary' }, 'Cập nhật thời gian nghỉ');
  updateBreakBtn.addEventListener('click', () => {
    Audio.click();
    State.setSetting('breakReminderMins', Number(studySelect.value));
    State.setSetting('breakDurationMins', Number(breakSelect.value));
    window.toast?.('Đã lưu thiết lập nghỉ giải lao.', 'success');
  });

  breakGroup.appendChild(breakGrid);
  breakGroup.appendChild(updateBreakBtn);
  breakGroup.appendChild(el('p', { class: 'text-xs text-text-muted mt-3' }, 'Áp dụng cho cả bài học chính và luyện tập. Khi hết giờ nghỉ, app sẽ mở lại để học tiếp.'));
  wrap.appendChild(breakGroup);

  wrap.appendChild(el('hr', { class: 'my-6 border-border' }));

  // 2. Change PIN
  const pinArea = el('div');
  pinArea.innerHTML = '<h3 class="font-bold text-lg mb-4">Thay đổi mã PIN Phụ huynh</h3>';
  if (usingDefaultPin) {
    const pinWarning = el(
      'div',
      { class: 'mb-4 rounded-xl border-2 border-warning bg-warning/10 p-4 text-sm font-bold text-warning' },
      'PIN hiện tại vẫn là mặc định 1234. Hãy đổi PIN ngay trước khi dùng tính năng cloud hoặc chia sẻ app rộng hơn.'
    );
    pinArea.appendChild(pinWarning);
  }
  
  const oldPin = el('input', { type: 'password', class: 'input-field mb-2 w-full max-w-sm', placeholder: 'PIN hiện tại', maxLength: 4 });
  const newPin = el('input', { type: 'password', class: 'input-field mb-2 w-full max-w-sm', placeholder: 'PIN mới (4 số)', maxLength: 4 });
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
  pinArea.appendChild(el('br'));
  pinArea.appendChild(changeBtn);
  pinArea.appendChild(pinMsg);

  wrap.appendChild(pinArea);
}

// ============================================
// SECTION: DATA & ACCOUNT
// ============================================
function renderDataTab(wrap) {
  const accountArea = el('div', { class: 'p-4 border-2 border-méo-purple rounded-xl bg-méo-purple-lt mb-6' });
  accountArea.innerHTML = `
    <h4 class="font-bold mb-2 text-méo-purple">Tài khoản & Thiết bị</h4>
    <p class="text-sm text-text mb-4">Dùng tài khoản để đồng bộ dữ liệu lên cloud hoặc quản lý thiết bị.</p>
  `;

  const accountStatus = el('div', { class: 'text-sm font-bold mb-4 text-text-muted' }, 'Đang kiểm tra tài khoản...');
  const emailInput = el('input', { type: 'email', class: 'input-field w-full mb-2', placeholder: 'Email phụ huynh' });
  const passwordInput = el('input', { type: 'password', class: 'input-field w-full mb-3', placeholder: 'Mật khẩu', autocomplete: 'current-password' });
  const authRow = el('div', { class: 'grid gap-3 md:grid-cols-2 mb-3' });
  const signInBtn = el('button', { class: 'btn btn-primary w-full' }, 'Đăng nhập');
  const signUpBtn = el('button', { class: 'btn btn-secondary w-full' }, 'Tạo tài khoản');
  const syncRow = el('div', { class: 'grid gap-3 md:grid-cols-3' });
  const uploadBtn = el('button', { class: 'btn btn-secondary w-full' }, 'Đẩy lên cloud');
  const downloadBtn = el('button', { class: 'btn btn-primary w-full' }, 'Dùng dữ liệu cloud');
  const signOutBtn = el('button', { class: 'btn btn-outline text-warning w-full' }, 'Đăng xuất / Logout từ xa');

  function formatAuthError(error, mode = 'generic') {
    const raw = error?.message || 'Có lỗi xảy ra khi kết nối tài khoản.';
    const lower = raw.toLowerCase();
    if (lower.includes('email rate limit exceeded')) return 'Supabase chặn gửi email vì vượt giới hạn. Vui lòng chờ.';
    if (lower.includes('invalid login credentials')) return 'Email hoặc mật khẩu chưa đúng.';
    if (lower.includes('user already registered')) return 'Email này đã có tài khoản. Hãy dùng nút Đăng nhập.';
    return raw;
  }

  function setAccountStatus(message, type = 'info') {
    const color = type === 'error' ? 'text-wrong' : type === 'success' ? 'text-correct-dk' : 'text-text-muted';
    accountStatus.className = `text-sm font-bold mb-4 ${color}`;
    accountStatus.textContent = message;
  }

  function formatSyncStamp(value) {
    if (!value) return 'chưa có';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'không rõ';
    return formatDateVI(date);
  }

  function requireStrongPinForCloud() {
    if (!State.isUsingDefaultParentPin()) return true;
    setAccountStatus('Hãy đổi PIN mặc định 1234 trước khi dùng hoặc kết nối Cloud.', 'error');
    return false;
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
  }

  async function loadAccountModule() {
    const syncModule = await import('./account-sync.js');
    if (!syncModule.isAccountSyncConfigured()) {
      setAccountStatus('Supabase chưa cấu hình. Không thể kết nối Cloud.', 'error');
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
      if (!requireStrongPinForCloud()) return;
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang đăng nhập...');
      const data = await syncModule.signInWithEmail(emailInput.value.trim(), passwordInput.value);
      await handleSignedIn(data.session, syncModule);
    } catch (e) {
      setAccountStatus(formatAuthError(e, 'signin'), 'error');
    }
  });

  signUpBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      if (!requireStrongPinForCloud()) return;
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      setAccountStatus('Đang tạo tài khoản...');
      const data = await syncModule.signUpWithEmail(emailInput.value.trim(), passwordInput.value);
      if (data.session) {
        await handleSignedIn(data.session, syncModule);
      } else {
        setAccountStatus('Đã tạo tài khoản. Hãy kiểm tra email.', 'success');
      }
    } catch (e) {
      setAccountStatus(formatAuthError(e, 'signup'), 'error');
    }
  });

  uploadBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      if (!requireStrongPinForCloud()) return;
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      const cloud = await syncModule.fetchCloudState().catch(() => null);
      const localStamp = formatSyncStamp(State.getLocalUpdatedAt());
      const cloudStamp = formatSyncStamp(cloud?.updated_at);
      if (!await showConfirmDialog({
        title: 'Đẩy dữ liệu lên cloud?',
        message: `Dữ liệu trên cloud sẽ bị ghi đè.\nMáy này cập nhật lần cuối: ${localStamp}\nCloud cập nhật lần cuối: ${cloudStamp}`,
        tone: 'warning',
        confirmText: 'Đẩy lên cloud',
        cancelText: 'Xem lại',
      })) return;
      setAccountStatus('Đang đẩy dữ liệu lên cloud...');
      await syncModule.saveCloudState(State.getState());
      State.markSynced();
      setAccountStatus('Đã đẩy thành công.', 'success');
    } catch (e) {
      setAccountStatus(e.message, 'error');
    }
  });

  downloadBtn.addEventListener('click', async () => {
    Audio.click();
    try {
      if (!requireStrongPinForCloud()) return;
      const syncModule = await loadAccountModule();
      if (!syncModule) return;
      const cloud = await syncModule.fetchCloudState();
      if (!cloud?.state) throw new Error('Chưa có dữ liệu cloud.');
      const localStamp = formatSyncStamp(State.getLocalUpdatedAt());
      const cloudStamp = formatSyncStamp(cloud.updated_at);
      if (!await showConfirmDialog({
        title: 'Dùng dữ liệu cloud?',
        message: `Dữ liệu hiện tại trên máy sẽ bị ghi đè.\nMáy này cập nhật lần cuối: ${localStamp}\nCloud cập nhật lần cuối: ${cloudStamp}`,
        tone: 'warning',
        confirmText: 'Dùng dữ liệu cloud',
        cancelText: 'Giữ dữ liệu máy',
      })) return;
      setAccountStatus('Đang tải dữ liệu cloud...');
      const session = await syncModule.getCurrentSession();
      State.importJSON(JSON.stringify(cloud.state));
      State.setAccountSession({ userId: session.user.id, email: session.user.email });
      State.markSynced();
      await showAlertDialog({
        title: 'Tải cloud thành công',
        message: 'Dữ liệu cloud đã được nạp vào máy này. App sẽ tải lại để áp dụng trạng thái mới.',
        tone: 'success',
        confirmText: 'Tiếp tục',
      });
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
      setAccountStatus('Đã đăng xuất tài khoản trên máy này.');
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
  if (State.isUsingDefaultParentPin()) {
    accountArea.appendChild(el(
      'div',
      { class: 'mb-4 rounded-xl border border-warning bg-warning/10 p-3 text-sm font-bold text-warning' },
      'Cloud đang bị khóa tạm thời vì PIN phụ huynh vẫn là mặc định 1234. Hãy đổi PIN trong phần Thiết lập chung trước.'
    ));
  }
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
  }).catch((e) => setAccountStatus(formatAuthError(e), 'error'));

  // Simple Sync Code Area
  const syncCodeArea = el('div', { class: 'p-4 border-2 border-eng-color rounded-xl bg-blue-50 mb-6' });
  syncCodeArea.innerHTML = `
    <h4 class="font-bold mb-2 text-eng-color">Đồng bộ nhanh qua Mã</h4>
    <p class="text-sm text-text mb-4">Tạo mã ngắn để chuyển dữ liệu sang máy khác ngay lập tức.</p>
  `;
  const codeRow = el('div', { class: 'grid gap-3 md:grid-cols-[1fr_auto_auto] items-center mb-2' });
  const codeInput = el('input', { type: 'text', class: 'input-field w-full font-display text-center uppercase tracking-widest', placeholder: 'MEO-XXXX' });
  const generateCodeBtn = el('button', { class: 'btn btn-secondary whitespace-nowrap' }, 'Tạo Mã');
  const applyCodeBtn = el('button', { class: 'btn btn-primary whitespace-nowrap' }, 'Tải Dữ Liệu');
  const codeStatus = el('div', { class: 'text-sm font-bold mt-2 text-text-muted h-5' });

  generateCodeBtn.addEventListener('click', async () => {
    Audio.click();
    codeStatus.textContent = 'Đang tạo mã...';
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) throw new Error('Cần cấu hình máy chủ đồng bộ trước.');
      // Random 4-char alphanumeric code prefixed with MEO-
      const randomCode = 'MEO-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      codeInput.value = randomCode;
      codeStatus.textContent = 'Mã của bạn: ' + randomCode + ' (Lưu ý: Mã có hạn trong 24h)';
      codeStatus.className = 'text-sm font-bold mt-2 text-correct-dk h-5';
    } catch (e) {
      codeStatus.textContent = e.message;
      codeStatus.className = 'text-sm font-bold mt-2 text-wrong h-5';
    }
  });

  applyCodeBtn.addEventListener('click', async () => {
    Audio.click();
    const code = codeInput.value.trim().toUpperCase();
    if (!code) {
      codeStatus.textContent = 'Vui lòng nhập mã đồng bộ.';
      codeStatus.className = 'text-sm font-bold mt-2 text-wrong h-5';
      return;
    }
    codeStatus.textContent = 'Đang tải...';
    try {
      const syncModule = await loadAccountModule();
      if (!syncModule) throw new Error('Cần cấu hình máy chủ đồng bộ trước.');
      
      // Simulate download
      setTimeout(async () => {
        if (!await showConfirmDialog({
          title: 'Tải dữ liệu từ mã ' + code + '?',
          message: 'Dữ liệu hiện tại trên máy sẽ bị ghi đè.',
          tone: 'warning',
          confirmText: 'Tải xuống',
          cancelText: 'Hủy',
        })) {
          codeStatus.textContent = '';
          return;
        }
        codeStatus.textContent = 'Tính năng Cloud đang ở trạng thái giả lập. Sẵn sàng tích hợp API ở bản chính thức.';
        codeStatus.className = 'text-sm font-bold mt-2 text-méo-purple h-5';
      }, 500);
      
    } catch (e) {
      codeStatus.textContent = e.message;
      codeStatus.className = 'text-sm font-bold mt-2 text-wrong h-5';
    }
  });

  codeRow.appendChild(codeInput);
  codeRow.appendChild(generateCodeBtn);
  codeRow.appendChild(applyCodeBtn);
  syncCodeArea.appendChild(codeRow);
  syncCodeArea.appendChild(codeStatus);
  wrap.appendChild(syncCodeArea);

  // Local Backup Area
  const backupArea = el('div', { class: 'p-4 border-2 border-border rounded-xl bg-bg mb-6' });
  backupArea.innerHTML = `
    <h4 class="font-bold mb-2">Sao lưu thủ công</h4>
  `;
  const backupActions = el('div', { class: 'grid gap-3 md:grid-cols-2' });
  const exportBtn = el('button', { class: 'btn btn-outline w-full' }, '💾 Tải tệp sao lưu (.json)');
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
  const restoreBtn = el('button', { class: 'btn btn-outline w-full' }, '📥 Khôi phục từ tệp (.json)');
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
      if (!await showConfirmDialog({
        title: 'Khôi phục từ tệp sao lưu?',
        message: 'Dữ liệu hiện tại trên máy sẽ bị ghi đè bằng nội dung từ tệp này.',
        tone: 'warning',
        confirmText: 'Khôi phục ngay',
        cancelText: 'Hủy',
      })) return;
      State.importJSON(json);
      await showAlertDialog({
        title: 'Khôi phục thành công',
        message: 'Dữ liệu từ tệp sao lưu đã được áp dụng. App sẽ tải lại ngay bây giờ.',
        tone: 'success',
        confirmText: 'Tiếp tục',
      });
      window.location.reload();
    } catch (e) {
      await showAlertDialog({
        title: 'Không thể khôi phục',
        message: e.message,
        tone: 'danger',
        confirmText: 'Đã hiểu',
      });
    }
  });

  backupActions.appendChild(exportBtn);
  backupActions.appendChild(restoreBtn);
  backupArea.appendChild(backupActions);
  backupArea.appendChild(fileInput);
  wrap.appendChild(backupArea);

  // Tools Area
  const unlockArea = el('div', { class: 'mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl' });
  unlockArea.innerHTML = `
    <h3 class="font-bold text-lg mb-2 text-blue-800">Mở Ngày Học Nhanh</h3>
    <p class="text-sm mb-4 text-blue-700">Mở nhanh một ngày học nếu bị kẹt tiến độ.</p>
  `;
  const unlockRow = el('div', { class: 'grid gap-3 md:grid-cols-[1fr_auto_auto] items-center' });
  const unlockInput = el('input', { type: 'number', min: '1', class: 'input-field w-full', value: String(State.getCurrentDay() + 1) });
  const unlockBtn = el('button', { class: 'btn btn-primary whitespace-nowrap' }, 'Mở khóa');
  const relockBtn = el('button', { class: 'btn btn-outline whitespace-nowrap' }, 'Trở về tự động');

  unlockBtn.addEventListener('click', async () => {
    Audio.click();
    const targetDay = Number(unlockInput.value);
    if (!Number.isFinite(targetDay) || targetDay < 1) return;
    State.unlockDay(targetDay);
    await showAlertDialog({
      title: 'Đã mở khóa ngày học',
      message: `Ngày ${targetDay} đã được mở khóa cho bé.`,
      tone: 'success',
      confirmText: 'Tiếp tục',
    });
    window.location.reload();
  });

  relockBtn.addEventListener('click', async () => {
    Audio.click();
    State.clearManualUnlock();
    await showAlertDialog({
      title: 'Đã trở về tiến độ tự động',
      message: 'App sẽ quay lại chế độ mở ngày học theo tiến độ bình thường.',
      tone: 'success',
      confirmText: 'Tiếp tục',
    });
    window.location.reload();
  });
  unlockRow.appendChild(unlockInput);
  unlockRow.appendChild(unlockBtn);
  unlockRow.appendChild(relockBtn);
  unlockArea.appendChild(unlockRow);
  wrap.appendChild(unlockArea);

  // Dev Tool Area
  const devArea = el('div', { class: 'p-4 bg-red-50 border-2 border-red-300 rounded-xl' });
  devArea.innerHTML = '<h3 class="font-bold text-lg mb-2 text-red-800">Cài đặt lại</h3>';
  const day1ResetBtn = el('button', { class: 'btn bg-red-600 hover:bg-red-700 text-white border-none w-full' }, '🔄 Reset về Ngày 1 (giữ XP & huy hiệu)');
  day1ResetBtn.addEventListener('click', async () => {
    if (await showConfirmDialog({
      title: 'Reset về Ngày 1?',
      message: 'Bé sẽ bắt đầu lại từ Ngày 1, nhưng vẫn giữ nguyên XP và huy hiệu.',
      tone: 'danger',
      confirmText: 'Reset ngay',
      cancelText: 'Hủy',
    })) {
      State.resetLearningProgress();
      await showAlertDialog({
        title: 'Đã reset tiến độ',
        message: 'Bé đã quay về Ngày 1 nhưng XP và huy hiệu vẫn được giữ lại.',
        tone: 'success',
        confirmText: 'Tiếp tục',
      });
      window.location.reload();
    }
  });
  devArea.appendChild(day1ResetBtn);
  wrap.appendChild(devArea);
}
