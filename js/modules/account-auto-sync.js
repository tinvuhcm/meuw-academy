import State from '../state.js';
import Router from '../router.js';

let started = false;
let syncTimer = null;
let syncInFlight = false;
let suppressNextCommit = false;
let lastHydratedCloudStamp = null;

function getLastSyncedAtMs() {
  const syncMeta = State.getSyncMeta();
  const value = Date.parse(syncMeta?.lastSyncedAt || 0);
  return Number.isFinite(value) ? value : 0;
}

function getLocalUpdatedAtMs() {
  const value = Date.parse(State.getLocalUpdatedAt() || 0);
  return Number.isFinite(value) ? value : 0;
}

async function loadSyncModule() {
  const syncModule = await import('./account-sync.js');
  if (!syncModule.isAccountSyncConfigured()) return null;
  return syncModule;
}

async function uploadLatestState() {
  if (syncInFlight) return;
  syncInFlight = true;
  try {
    const syncModule = await loadSyncModule();
    if (!syncModule) return;
    const session = await syncModule.getCurrentSession();
    if (!session?.user) return;
    await syncModule.saveCloudState(State.getState());
    State.markSynced();
  } catch (error) {
    console.warn('[AccountAutoSync] Upload failed:', error);
  } finally {
    syncInFlight = false;
  }
}

function scheduleUpload() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    uploadLatestState();
  }, 2500);
}

async function maybeHydrateFromCloud() {
  try {
    const syncModule = await loadSyncModule();
    if (!syncModule) return;
    const session = await syncModule.getCurrentSession();
    if (!session?.user) return;

    State.setAccountSession({ userId: session.user.id, email: session.user.email });

    const cloud = await syncModule.fetchCloudState();
    if (!cloud?.state) return;

    const cloudTime = Date.parse(cloud.updated_at || 0);
    const cloudStamp = cloud.updated_at || null;
    const localTime = getLocalUpdatedAtMs();
    const lastSyncedAt = getLastSyncedAtMs();
    const localIsClean = localTime <= lastSyncedAt + 1000;
    const cloudIsNewer = cloudTime > localTime + 1000;
    const localIsNewer = localTime > cloudTime + 1000;

    if (cloudIsNewer && localIsClean && cloudStamp !== lastHydratedCloudStamp) {
      suppressNextCommit = true;
      State.importJSON(JSON.stringify(cloud.state));
      State.setAccountSession({ userId: session.user.id, email: session.user.email });
      State.markSynced();
      lastHydratedCloudStamp = cloudStamp;
      const currentRoute = Router.currentRoute() || (window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '/') || '/';
      Router.replace(currentRoute);
      return;
    }

    if (cloudIsNewer) {
      window.toast?.('Cloud có dữ liệu mới hơn trên máy khác. Vào Phụ huynh > Dữ liệu để chọn tải xuống hoặc giữ dữ liệu máy này.', 'info');
      return;
    }

    if (localIsNewer) {
      window.toast?.('Máy này có dữ liệu local mới hơn cloud. App sẽ không tự ghi đè cloud ngay; phụ huynh có thể vào Dữ liệu để chủ động chọn đẩy lên.', 'info');
    }
  } catch (error) {
    console.warn('[AccountAutoSync] Hydration failed:', error);
  }
}

export function initAccountAutoSync() {
  if (started) return;
  started = true;

  window.addEventListener('meuw:state-committed', () => {
    if (suppressNextCommit) {
      suppressNextCommit = false;
      return;
    }
    scheduleUpload();
  });

  maybeHydrateFromCloud();
}
