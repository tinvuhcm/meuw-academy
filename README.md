# Méo Academy

> 🐱 Ứng dụng học hè cho bé Méo (Vũ Hoàng Khả Minh / Vũ Minh Méo) — học vui, học sâu, học cùng Méo!

## 🌟 Demo

**Live:** https://mew-academy.vercel.app

## 📸 Screenshots

*(Coming soon after deployment)*

## ✨ Tính năng

- **90 ngày học** đầy đủ — 3 tháng hè không nhàm chán
- **8 loại bài tập** interactive: trắc nghiệm, điền chỗ trống, kéo thả, SVG tương tác, luyện nói, vẽ, tô màu, mini quiz
- **Mascot Méo** — con mèo chibi với 9 trạng thái animation, phản ứng theo từng tương tác
- **Gamification:** XP, streak, 28 huy hiệu, 5 cấp độ
- **Gallery:** lưu tranh vẽ của bé vào bộ sưu tập riêng
- **Parent Dashboard:** theo dõi tiến trình, cài đặt, báo cáo
- **Offline:** hoạt động hoàn toàn sau lần tải đầu tiên
- **PWA:** cài vào iPad/laptop như app thật

## 📚 Nội dung 3 tháng

| Tháng | Chủ đề | Tuần |
|-------|--------|------|
| 1 | 🦁 Vương Quốc Động Vật | Châu Phi, Đại Dương, Rừng nhiệt đới, Review |
| 2 | 🌋 Trái Đất & Thiên Nhiên | Núi lửa, Thời tiết, Sông ngòi, Review |
| 3 | ⚡ Khoa Học & Phát Minh | Ánh sáng, Lực, Điện, Grand Finale |

**Môn học:** Toán (lớp 4) · Tiếng Anh (A1-A2+) · Khoa học · Đọc hiểu · Vẽ

## 🚀 Chạy local

Không cần build! Mở trực tiếp:

```bash
# Clone
git clone https://github.com/vuminhtin/méo-academy.git
cd méo-academy

# Mở bằng live server (VSCode Live Server extension)
# Hoặc dùng Python:
python -m http.server 3000

# Truy cập: http://localhost:3000
```

> **Lưu ý:** Cần chạy qua HTTP (không phải file://) để Speech API và Service Worker hoạt động.

## 🏗️ Kiến trúc

```
méo-academy/
├── index.html              # SPA shell
├── css/                    # Design system, animations, components
├── js/                     # Core: state, router, mascot, audio...
├── modules/                # Dashboard, lesson, question types...
├── data/                   # Curriculum 84 ngày (Month 1-3)
└── assets/                 # SVG mascot, icons, illustrations
```

**Stack:** Vanilla HTML + CSS + JS · No frameworks · No build step · < 500KB total

## 📋 Tài liệu

- [Hiến pháp App](docs/CONSTITUTION.md) — Nguyên tắc bất khả xâm phạm
- [Technical Spec](docs/TECHNICAL_SPEC.md) — Kiến trúc kỹ thuật chi tiết
- [Design System](docs/DESIGN_SYSTEM.md) — UI/UX components và màu sắc
- [Curriculum 84 ngày](docs/CURRICULUM_84_DAYS.md) — Nội dung học đầy đủ
- [Build Plan](docs/BUILD_PLAN.md) — Kế hoạch xây dựng

## 🎮 Gameplay

1. **Mở app** → Dashboard với Méo chờ
2. **Chọn module** sáng/chiều
3. **Hoàn thành** bài học + câu hỏi interactive
4. **Méo phản ứng** theo mỗi câu trả lời
5. **Thu thập XP** → tăng cấp → nhận huy hiệu
6. **Vẽ tranh** → lưu vào Gallery
7. **Streak** mỗi ngày → badge tuần/tháng

## 👨‍👩‍👧 Phụ huynh

Truy cập Parent Dashboard bằng PIN (mặc định: 1234):
- Theo dõi tiến trình từng ngày
- Xem lịch học calendar view
- Điều chỉnh cài đặt
- Xuất báo cáo

## 📱 Hỗ trợ thiết bị

| Thiết bị | Hỗ trợ | Ghi chú |
|----------|---------|---------|
| Laptop (Chrome) | ✅ Đầy đủ | Recommended |
| iPad (Chrome app) | ✅ Đầy đủ | Touch optimized |
| Android (Chrome) | ✅ Tốt | |
| iPhone (Safari) | ⚠️ Giới hạn | Không có Speech API |
| Firefox | ⚠️ Giới hạn | Không có Speech API |

## 🐱 Về Méo

Méo là linh vật của app — con mèo chibi màu vàng-hồng với 9 trạng thái cảm xúc. Méo sẽ:
- Nhảy lên vui mừng khi em trả lời đúng 🎉
- Lắc đầu nhẹ nhàng khi sai và nói "Thử lại nhé!" 💪
- Ngủ gật khi em quên học 😴
- Xoay tròn khi hoàn thành module 🌟

---

*Made with 💜 for Méo, by DS. Mèo + AI*
