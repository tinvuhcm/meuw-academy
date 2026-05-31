import { firebaseConfig, isFirebaseEnabled } from '../firebase-config.js';

let app = null;
let db = null;
let isInitialized = false;

async function initFirebase() {
  if (isInitialized) return true;
  if (!isFirebaseEnabled()) return false;

  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js');
    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js');
    
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isInitialized = true;
    return true;
  } catch (err) {
    console.error("Firebase init failed:", err);
    return false;
  }
}

export async function cloudSyncPush(username, stateData) {
  const ready = await initFirebase();
  if (!ready) throw new Error('Firebase chưa được cấu hình (Thiếu API Key)');

  const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js');
  
  // Lưu state vào collection 'profiles' với ID là username
  const docRef = doc(db, "profiles", username);
  await setDoc(docRef, {
    data: JSON.stringify(stateData),
    updatedAt: new Date().toISOString()
  });
}

export async function cloudSyncPull(username) {
  const ready = await initFirebase();
  if (!ready) throw new Error('Firebase chưa được cấu hình (Thiếu API Key)');

  const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js');
  
  const docRef = doc(db, "profiles", username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return JSON.parse(docSnap.data().data);
  } else {
    throw new Error('Không tìm thấy dữ liệu đám mây cho người dùng này!');
  }
}
