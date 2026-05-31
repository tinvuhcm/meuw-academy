// HƯỚNG DẪN CÀI ĐẶT FIREBASE:
// 1. Truy cập https://console.firebase.google.com/ và đăng nhập bằng Google.
// 2. Bấm "Add project" (Tạo dự án mới), đặt tên ví dụ: "Meuw Academy". Tắt Google Analytics cho nhanh.
// 3. Khi dự án tạo xong, ở màn hình chính, bấm vào biểu tượng Web (</>) để thêm ứng dụng web.
// 4. Đặt tên app (ví dụ "Meuw Web"), bấm "Register app".
// 5. Bạn sẽ thấy một đoạn mã chứa đối tượng `firebaseConfig`. Hãy Copy các giá trị đó và dán vào biến `firebaseConfig` bên dưới.
// 6. Trở lại Console, ở menu bên trái chọn Build -> Firestore Database -> Bấm "Create database".
// 7. Chọn vị trí máy chủ (mặc định) -> Chọn "Start in test mode" (rất quan trọng) -> Bấm Enable.
// 8. Đã xong! Quay lại ứng dụng và lưu trình trình.

export const firebaseConfig = {
  apiKey: "AIzaSyCRbH5dAAetuXDd7H7Mxw9rMVsg8TdP9D8",
  authDomain: "meuw-academy.firebaseapp.com",
  projectId: "meuw-academy",
  storageBucket: "meuw-academy.firebasestorage.app",
  messagingSenderId: "327995840721",
  appId: "1:327995840721:web:e415ff02b3de70b1ba0df0"
};

export const isFirebaseEnabled = () => {
  return firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5;
};
