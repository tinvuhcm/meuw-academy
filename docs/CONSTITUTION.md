# MEUW ACADEMY — HIẾN PHÁP ỨNG DỤNG v1.0
> "Bộ luật tối cao chi phối mọi quyết định thiết kế, nội dung và kỹ thuật"
> Product Owner: DS. Mèo | Tech Lead: AI Agent | Ngày ban hành: 2025

---

## ĐIỀU 1: SỨ MỆNH

Méo Academy là nền tảng học hè **chủ động, vui vẻ, và đủ khó** cho bé Méo (Vũ Hoàng Khả Minh, 9→10 tuổi). App không thay thế trường học — nó là **người bạn học thông minh** giúp bé khám phá thế giới qua trò chơi có chiều sâu.

---

## ĐIỀU 2: NGUYÊN TẮC BẤT KHẢ XÂM PHẠM

### 2.1 — Luật về UX
1. **KHÔNG dark theme.** Màu sắc phải tươi sáng, sống động, ấm áp.
2. **KHÔNG bao giờ để học sinh cảm thấy ngu ngốc.** Sai → Méo động viên, không mắng.
3. **KHÔNG nhồi thông tin.** Mỗi màn hình chỉ 1 focal point duy nhất.
4. **KHÔNG có nút "Tiếp theo" bị vô hiệu hóa không rõ lý do.** Luôn cho biết cần làm gì.
5. **KHÔNG timer gây stress** trên bài học chính. Timer chỉ ở game tùy chọn.

### 2.2 Về Nội Dung (BẮT BUỘC TUÂN THỦ TUYỆT ĐỐI)
1. **Chất lượng và tương tác là số 1:** Số lượng bài học nhiều nhưng phải luôn đảm bảo đa dạng hình thức (interactive-svg, drag-match, fill-blank), tạo sự hào hứng cho trẻ. Không bao giờ lạm dụng độc nhất một loại câu hỏi (như trắc nghiệm). Điều này là bắt buộc để duy trì độ tương tác cao nhất.
2. **Không có "trắc nghiệm" (A B C D) đơn thuần.** Phải có hình ảnh, hoặc kéo thả, hoặc bấm vào vùng hình.
3. **Mỗi phiên (session) học tối đa 10 phút** để không hại mắt.
4. **Phải có yếu tố bất ngờ.** Lâu lâu có module hát, vẽ, hoặc đố mẹo.
5. **Độ khó tăng dần có kiểm soát.** Câu 1 dễ -> câu 3 thử thách. Không đột ngột khó.
6. **Câu hỏi phải có ngữ cảnh.** Không hỏi "2+2=?" -> phải là "2 con voi và 2 con voi nữa..."

### 2.3 — Luật về Kỹ thuật
1. **HTML/CSS/JS + Tailwind CDN:** Ứng dụng gốc bằng Vanilla JS, nhưng SỬ DỤNG Tailwind CSS qua CDN để xử lý responsive linh hoạt trên mobile/tablet. Tránh import thư viện nặng nào khác.
2. **Offline-first.** App phải hoạt động hoàn toàn sau lần load đầu.
3. **Tổng bundle < 500KB** (không tính ảnh cache từ CDN font).
4. **Không server, không database, không đăng ký.** LocalStorage là nguồn sự thật duy nhất.
5. **Responsive & Typography:** 
   - Thiết kế ưu tiên Mobile-first, tương thích iPad và Laptop.
   - BẮT BUỘC sử dụng UTF-8 và Font chữ hỗ trợ đầy đủ tiếng Việt (Vietnamese subset) như `Nunito` để không bao giờ bị lỗi hiển thị.
   
### 2.4 — Luật về Mascot Méo
1. **Méo phải xuất hiện ở MỌI interaction quan trọng.** Không có màn hình "câm".
2. **Méo không bao giờ nổi giận hoặc thất vọng về học sinh.** Chỉ ngạc nhiên và khuyến khích.
3. **Méo có tính cách:** Hài hước, đôi khi drama, luôn ở phe học sinh.
4. **Méo nói ngôn ngữ của bé:** Tiếng Việt tự nhiên, emoji, câu ngắn.

---

## ĐIỀU 3: ĐỐI TƯỢNG SỬ DỤNG

| Người dùng | Vai trò | Quyền hạn |
|---|---|---|
| Bé Méo (9-10t) | Học sinh chính | Full app, không PIN |
| Bố/Mẹ | Phụ huynh | Parent Dashboard (có PIN), cài đặt |
| Các bạn khác | Hỗ trợ đa profile | Profile riêng biệt |

### Hồ sơ Bé Méo
- **Tên gọi trong app:** Méo / Méo / em
- **Tính cách:** Mạnh mẽ, tếu táo, thích khám phá, không thích nhạt
- **Thích:** Động vật, vẽ, câu đố hóc búa, bí mật khoa học
- **Không thích:** Bài tập lặp đi lặp lại nhàm chán, bị coi thường

---

## ĐIỀU 4: HỆ THỐNG ĐIỂM VÀ PHẦN THƯỞNG

### XP Rules
```
Trả lời đúng lần đầu:    10 XP
Trả lời đúng lần 2:       5 XP  
Perfect module (100%):   ×1.5 bonus
Nộp Speech activity:     15 XP (không chấm điểm — khuyến khích thử)
Lưu tranh vào Gallery:   30 XP
Dùng hint: -5 XP từ bonus (không bao giờ âm tổng)
Daily target:           400 XP
Weekly target:         2000 XP
```

### Streak Rules
- Streak tính theo ngày học (ít nhất 1 module hoàn thành)
- Streak break nếu không học hôm đó (nhưng Méo không blame — chỉ nhắc nhở nhẹ)
- "Streak Shield" — mỗi tháng có 1 lần miễn trừ streak break

### Level Titles
```
0–500 XP:       🐾 Thám Tử Nhí
500–2,000 XP:   🔭 Nhà Khám Phá  
2,000–5,000 XP: 🎓 Học Giả
5,000–10,000:   🌟 Nhà Khoa Học
10,000+:        👑 Thiên Tài Mùa Hè
```

---

## ĐIỀU 5: QUY CHUẨN NỘI DUNG

### Về Toán học
- Luôn kết nối với chủ đề tuần (động vật, thiên nhiên, khoa học)
- Bám sát chương trình Lớp 4 Bộ GDĐT nhưng mở rộng thêm
- Ưu tiên: Hiểu khái niệm > Tính thuần thục
- Mỗi khái niệm Toán có ít nhất 1 visual/interactive SVG

### Về Tiếng Anh
- Level: Elementary-Intermediate (tương đương A1-A2+)
- Ưu tiên: Vocabulary + Speaking > Grammar rules
- Mỗi từ vựng mới phải có câu ví dụ thực tế, không phải dịch đơn giản
- Speech activity: khuyến khích, không bao giờ fail vì "sai ngữ pháp"

### Về Khoa học
- Luôn bắt đầu bằng "Tại sao?" hoặc "Điều gì xảy ra nếu...?"
- Kết nối với Việt Nam và châu Á khi có thể
- Khuyến khích phản biện và đặt câu hỏi
- Không có "câu trả lời duy nhất đúng" cho câu hỏi mở

### Về Vẽ
- Không bao giờ nói tranh của bé "xấu"
- Hướng dẫn kỹ thuật, không áp đặt phong cách
- Gallery là bộ sưu tập riêng của bé — thiêng liêng
- Mỗi session vẽ có 1 "challenge bonus" tùy chọn

---

## ĐIỀU 6: NGUYÊN TẮC KỸ THUẬT

### State Management
- Tất cả state lưu vào `localStorage` key: `meoAcademy_v2`
- Backup: nút export/import JSON trong Parent Dashboard
- Không bao giờ reset state mà không có xác nhận phụ huynh + PIN

### Multi-Profile
- Mỗi profile có key riêng: `meoAcademy_v2_profile_{id}`
- Profile data: `{id, name, avatar_color, created_at, ...state}`
- Tối đa 5 profiles

### Performance Budget
```
First Contentful Paint:  < 1.5s (Chrome, 4G)
Time to Interactive:     < 3s
Bundle total:            < 500KB
SVG per file:            < 5KB
Animation FPS:           > 60fps (CSS preferred)
```

### Browser Support
- **Primary:** Chrome 90+ (Desktop & Android)  
- **Secondary:** Safari iOS 15+ (iPad với Chrome app)
- **Fallback:** Firefox (không có Speech API — text input fallback)

---

## ĐIỀU 7: TRIẾT LÝ ANIMATION

Animation là ngôn ngữ cảm xúc của app. Mỗi animation phải có ý nghĩa:

| Tình huống | Animation | Cảm xúc truyền đạt |
|---|---|---|
| Trả lời đúng | Confetti + Méo nhảy | Vui mừng, tự hào |
| Trả lời sai | Shake nhẹ + Méo lắc đầu | Không sao, thử lại |
| Hoàn thành module | Stars burst + Méo xoay | Thành tích lớn |
| Load bài mới | Méo thinking | Hệ thống đang chuẩn bị |
| Badge mới | Fanfare + zoom in | Cột mốc đặc biệt |
| Streak | Flame animation | Momentum |

**Quy tắc timing:**
- Micro-animation: < 0.3s
- Reaction animation: 0.3–0.8s  
- Celebration animation: 1–3s
- Không block user interaction sau 0.5s

---

## ĐIỀU 8: QUY ĐỊNH DEPLOY

### GitHub
- Repo: `méo-academy` (public)
- Branch: `main` (production), `dev` (development)
- Commit convention: `feat:`, `fix:`, `content:`, `style:`
- README phải có: demo link, screenshot, local setup

### Vercel
- Project name: `méo-academy`
- Domain: `méo-academy.vercel.app`
- Auto-deploy từ `main` branch
- Environment: static site (no server)

---

## ĐIỀU 9: QUY ĐỊNH MỞ RỘNG (tương lai)

Các tính năng được phép thêm sau khi hoàn thành v1:
- ✅ Thêm curriculum tháng 4, 5, 6
- ✅ Thêm subjects mới (lịch sử, âm nhạc)
- ✅ Multiplayer quiz với bạn bè (WebSocket)
- ✅ AI-generated questions (khi có backend)
- ✅ Parent notifications

Các tính năng KHÔNG được thêm nếu vi phạm Điều 2:
- ❌ Quảng cáo bất kỳ loại nào
- ❌ Timer gây stress trên bài học chính
- ❌ So sánh ranking với người dùng khác
- ❌ Lưu dữ liệu cá nhân lên cloud mà không có sự đồng ý

---

## ĐIỀU 10: SỬA ĐỔI HIẾN PHÁP

Hiến pháp chỉ được sửa đổi khi:
1. Product Owner (DS. Mèo) yêu cầu bằng văn bản rõ ràng
2. Lý do sửa đổi phải được ghi lại trong CHANGELOG
3. Các Điều 2.1–2.4 (Bất khả xâm phạm) chỉ được sửa đổi trong trường hợp đặc biệt với lý do thuyết phục

---
*Phê duyệt và ban hành: DS. Mèo, 2025*
*Phiên bản tiếp theo sẽ được review sau 3 tháng vận hành*
