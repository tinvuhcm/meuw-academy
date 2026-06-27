# Méo Academy

> 🐱 Ứng dụng học tập toàn diện cho bé Méo (Vũ Hoàng Khả Minh) — học vui, học sâu, học cùng Méo!

## 🌟 Demo

**Live:** https://mew-academy.vercel.app

## 📸 Screenshots

*(Coming soon after deployment)*

## ✨ Tính năng Nổi bật

- **Lộ trình trọn vẹn 354 ngày:** Bao phủ từ kỳ nghỉ Hè (ôn nền tảng) kéo dài xuyên suốt toàn bộ Học kỳ 1 và Học kỳ 2 của lớp 4.
- **Bám sát SGK Mới:** Nội dung được biên soạn chuẩn theo chương trình phổ thông mới (Kết nối tri thức, Chân trời sáng tạo, Cánh diều...).
- **Đa dạng môn học:** Toán, Tiếng Việt, Tiếng Anh (A1-A2+), Khoa học, Lịch sử & Địa lý, Tin học, Đạo đức, Công nghệ, Âm nhạc, Mỹ thuật.
- **Đa dạng bài tập interactive:** Trắc nghiệm, điền chỗ trống, kéo thả (drag-match), SVG tương tác, luyện nói, vẽ, tô màu, mini quiz.
- **Mascot Méo:** Con mèo chibi với 9 trạng thái animation sinh động, phản ứng thông minh theo từng tương tác học tập của bé.
- **Gamification:** Hệ thống điểm XP, duy trì chuỗi ngày học (streak), 28 huy hiệu độc quyền và 5 cấp độ tiến trình.
- **Gallery:** Nơi lưu trữ tự động các tác phẩm tranh vẽ của bé vào bộ sưu tập cá nhân.
- **Parent Dashboard:** Quản lý bằng mã PIN, theo dõi sát sao tiến trình học, thời lượng, và xuất báo cáo học tập.
- **Bảo mật & Offline:** Dữ liệu học được mã hóa (Anti-cheat) chống sửa đổi. Hỗ trợ PWA hoạt động mượt mà ngay cả khi không có mạng (offline-first).

## 📚 Lộ trình Học tập (Lớp 4)

Lộ trình được chia thành 3 giai đoạn chính dựa trên thời gian biểu thực tế:

| Giai đoạn | Trọng tâm | Mô tả |
|-----------|-----------|-------|
| **Hè (Tăng tốc nền tảng)** | Toán, Tiếng Việt, Tiếng Anh, Khoa học, Tin học | Ôn tập kiến thức cốt lõi, khám phá thế giới tự nhiên trước thềm năm học mới. |
| **Học kỳ 1 (Đồng hành)** | Các môn trọng tâm + Lịch sử & Địa lý | Bám sát mạch SGK mới trên lớp, giữ nhịp độ học đều đặn mỗi ngày. |
| **Học kỳ 2 (Mở rộng)** | Các môn trọng tâm + Công nghệ | Tăng cường toán tư duy nhiều bước, đọc hiểu nâng cao và mở rộng kỹ năng. |

*Mỗi ngày hệ thống sẽ tự động phân bổ khoảng 24 modules (Sáng / Chiều) với thời lượng vừa phải (~10 phút/module) đảm bảo sự tập trung của trẻ.*

## 🚀 Chạy local

Ứng dụng được thiết kế siêu tinh gọn, **không cần build!** Bạn chỉ cần clone và chạy trực tiếp:

```bash
# Clone repository
git clone https://github.com/tinvuhcm/meuw-academy.git
cd meuw-academy

# Khởi chạy server local (dùng Python)
python -m http.server 3000

# Hoặc dùng Live Server extension trên VSCode.
# Sau đó truy cập: http://localhost:3000
```

> **Lưu ý:** Bắt buộc chạy qua môi trường server (`http://`) thay vì mở file tĩnh (`file://`) để các tính năng nâng cao như Speech API, Service Worker và Modules hoạt động.

## 🏗️ Kiến trúc

```
meuw-academy/
├── index.html              # SPA shell
├── css/                    # Design system, animations, theme
├── js/                     # Core logic: state management, curriculum engine, audio...
├── modules/                # Các loại bài học, UI components (Dashboard, Lesson, Quiz...)
├── data/                   # Ngân hàng câu hỏi khổng lồ theo SGK mới
└── assets/                 # SVGs, animations, illustrations
```

**Tech Stack:** Vanilla HTML + CSS + JS thuần túy · No frameworks · No build step · Tối ưu hiệu năng & dung lượng (< 500KB tổng).

## 📋 Tài liệu Kỹ thuật

- [Hiến pháp App](docs/CONSTITUTION.md) — Nguyên tắc thiết kế bất khả xâm phạm
- [Technical Spec](docs/TECHNICAL_SPEC.md) — Kiến trúc kỹ thuật và luồng dữ liệu chi tiết
- [Design System](docs/DESIGN_SYSTEM.md) — Hệ thống UI/UX components và mã màu
- [Curriculum Toàn khóa](docs/CURRICULUM_84_DAYS.md) — Kế hoạch giáo án tham khảo

## 🎮 Gameplay Flow

1. **Mở app** → Chào mừng từ Dashboard cùng bé Méo.
2. **Chọn buổi học** (Sáng / Chiều) theo phân bổ của hệ thống.
3. **Thực hiện nhiệm vụ** → Hoàn thành bài học lý thuyết kết hợp câu hỏi tương tác.
4. **Phản ứng từ Méo** → Méo sẽ vui mừng khi đúng, và động viên khi sai.
5. **Thu thập phần thưởng** → Nhận XP, lên cấp, mở khóa huy hiệu mới.
6. **Giải trí** → Tham gia các module vẽ tranh và lưu vào Gallery.
7. **Duy trì thói quen** → Giữ chuỗi (streak) mỗi ngày để đạt huy hiệu tuần/tháng.

## 👨‍👩‍👧 Dành cho Phụ huynh

Góc phụ huynh (Parent Dashboard) được bảo vệ bằng mã PIN (mặc định: 1234):
- Theo dõi biểu đồ tiến trình học của con từng ngày.
- Xem lịch học trực quan qua Calendar view.
- Tùy chỉnh cài đặt cá nhân, giới hạn thời gian.

## 📱 Hỗ trợ Thiết bị

| Thiết bị | Mức độ Hỗ trợ | Ghi chú |
|----------|---------|---------|
| Laptop (Chrome/Edge) | ✅ Đầy đủ | Trải nghiệm tốt nhất (Khuyên dùng) |
| iPad (Chrome app / Safari) | ✅ Đầy đủ | Tối ưu chạm (Touch optimized) |
| Android (Chrome) | ✅ Tốt | |
| iPhone (Safari) | ⚠️ Giới hạn | API nhận diện giọng nói có thể bị hạn chế |

## 🐱 Về Méo (Mascot)

Méo là người bạn đồng hành ảo của ứng dụng — một bé mèo chibi màu vàng-hồng với 9 trạng thái cảm xúc phong phú:
- Nhảy múa vui mừng khi bé Minh trả lời xuất sắc 🎉
- Lắc đầu nhẹ nhàng khích lệ "Thử lại nhé!" khi sai 💪
- Ngủ gật nếu bé lơ là việc học quá lâu 😴
- Xoay vòng phấn khích khi hoàn thành toàn bộ module trong ngày 🌟

---

*Made with 💜 for Méo, by DS. Mèo + AI*
