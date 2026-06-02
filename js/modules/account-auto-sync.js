import State from '../state.js';

let started = false;
let syncTimer = null;
let syncInFlight = false;
let suppressNextCommit = false;

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
    const localTime = getLocalUpdatedAtMs();
    const lastSyncedAt = getLastSyncedAtMs();
    const localIsClean = localTime <= lastSyncedAt + 1000;
    const cloudIsNewer = cloudTime > localTime + 1000;
    const localIsNewer = localTime > cloudTime + 1000;

    if (cloudIsNewer && localIsClean) {
      suppressNextCommit = true;
      State.importJSON(JSON.stringify(cloud.state));
      State.setAccountSession({ userId: session.user.id, email: session.user.email });
      State.markSynced();
      window.location.reload();
      return;
    }

    if (cloudIsNewer) {
      window.toast?.('Cloud có dữ liệu mới hơn trên máy khác. Vào Phụ huynh > Dữ liệu để chọn tải xuống hoặc giữ dữ liệu máy này.', 'info');
      return;
    }

    if (localIsNewer) {
      scheduleUpload();
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
