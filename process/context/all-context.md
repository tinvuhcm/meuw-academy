# Meuw Academy - Toàn Bộ Ngữ Cảnh

Cập nhật lần cuối: 2026-06-15

Đây là file vào cửa ngữ cảnh gốc của repo.

Dùng file này cho 2 việc:

1. định tuyến nhanh tới đúng nhóm ngữ cảnh hoặc file gốc cần đọc
2. nắm kiến trúc tổng thể và cấu trúc repo

Hãy bắt đầu từ đây trước khi đọc các file ngữ cảnh sâu hơn.

---

## Mô Tả Dự Án

Meuw Academy là ứng dụng học tập cho trẻ em, hiện tập trung vào nội dung tiểu học lớp 4, với định hướng mở rộng cho cộng đồng cùng sử dụng và mở rộng dần sang các khối lớp 1 đến 5.

Theo mô tả của người dùng, 3 phần cốt lõi nhất của sản phẩm là:

- phần tạo nội dung học
- phần học bài thực tế
- phần hình thức tương tác của từng hoạt động học

Các luật cứng hiện tại là:

- nội dung bài học không được lệch khỏi chương trình chính khóa
- bài mới phải dạy trước rồi mới luyện
- ứng dụng phải nhẹ và chạy mượt

Ba luật này quan trọng hơn việc dọn style hoặc thay đổi framework cho đẹp.

## Quy Ước Ngôn Ngữ

- Ưu tiên dùng tiếng Việt trong trao đổi của agent và trong tài liệu hướng về repo.
- Chỉ giữ tiếng Anh cho các thuật ngữ kỹ thuật khó dịch gọn, tên thư viện, lệnh, định danh code, hoặc tên file/thư mục chuẩn.
- Nếu có thể viết câu tiếng Việt mà chỉ giữ lại đúng thuật ngữ kỹ thuật cần thiết, ưu tiên cách đó.

## Cách File Này Hoạt Động

Mỗi thư mục trong `process/context/` có một file vào cửa `all-*.md` đóng vai trò định tuyến nhanh cho một miền kiến thức. File gốc này (`all-context.md`) là router tầng cao nhất. Mỗi nhóm ngữ cảnh sẽ có file `all-{group}.md` riêng.

Cách agent nên dùng:

1. đọc `process/context/all-context.md` trước
2. chọn nhóm nhỏ nhất phù hợp từ các bảng định tuyến bên dưới
3. đọc file `all-{group}.md` của nhóm đó
4. chỉ sau đó mới mở file sâu hơn hoặc source path thật sự cần

Không nên mặc định tải toàn bộ cây `process/context/`.

## Cách Bắt Đầu Nhanh

Với hầu hết các tác vụ đáng kể:

1. đọc file này trước
2. chọn file gốc hoặc nhóm ngữ cảnh nhỏ nhất phù hợp
3. đi theo bảng định tuyến để mở đúng doc hoặc source file cần thiết

## Các Điểm Vào Gốc Hiện Có

| File | Đọc khi nào |
|---|---|
| `process/context/all-context.md` | mọi tác vụ nghiên cứu, lập kế hoạch, review, hoặc triển khai có độ đáng kể |
| `process/context/tests/all-tests.md` | kiểm thử, xác minh, audit bằng script, hoặc smoke check thủ công |
| `process/context/planning/all-planning.md` | cần cân form plan, quyết định SIMPLE hay COMPLEX, hoặc xem quy tắc lưu plan |
| `process/context/content-curriculum/all-content-curriculum.md` | cần xử lý độ đúng của bài học, pipeline curriculum, nguồn chính thống, hoặc mở rộng khối lớp |
| `process/context/uxui/all-uxui.md` | cần chỉnh hệ thống giao diện, kiểu tương tác, mascot, hoặc UX bài học |
| `process/context/sync-auth/all-sync-auth.md` | cần xử lý hồ sơ, local state, phụ huynh, đăng nhập Supabase, hoặc cloud backup |
| `process/context/platform/all-platform.md` | cần xử lý deploy, static hosting, ràng buộc PWA/runtime, hoặc browser API |

## Các Nhóm Ngữ Cảnh Hiện Có

| Nhóm | Điểm vào | Phạm vi |
|---|---|---|
| `planning/` | `process/context/planning/all-planning.md` | cách cân form plan và nơi lưu plan/report |
| `tests/` | `process/context/tests/all-tests.md` | xác minh bằng script, check cú pháp, kiểm thử trình duyệt thủ công, các khoảng trống hiện có |
| `content-curriculum/` | `process/context/content-curriculum/all-content-curriculum.md` | dữ liệu curriculum, bộ sinh bài học, ánh xạ nguồn chính thống, luật chất lượng nội dung |
| `uxui/` | `process/context/uxui/all-uxui.md` | design system, cấu trúc CSS, UX mascot, pattern tương tác hoạt động |
| `sync-auth/` | `process/context/sync-auth/all-sync-auth.md` | state offline-first, hồ sơ, PIN, import/export, đồng bộ tài khoản Supabase |
| `platform/` | `process/context/platform/all-platform.md` | runtime static SPA, cấu hình manifest/deploy, giả định về hỗ trợ trình duyệt |

## Bảng Định Tuyến Tác Vụ

| Loại tác vụ | Đọc trước | Sau đó đọc |
|---|---|---|
| nghiên cứu repo nói chung | `all-context.md` | file miền kiến thức ứng với tác vụ |
| lập kế hoạch triển khai | `all-context.md`, `planning/all-planning.md` | active plan hoặc feature folder nếu đã có |
| lập kế hoạch kiểm thử hoặc xác minh | `all-context.md`, `tests/all-tests.md` | script audit hẹp nhất hoặc đường xác minh runtime thủ công |
| thay đổi bài học hoặc nội dung | `all-context.md`, `content-curriculum/all-content-curriculum.md` | file generator/data liên quan và các doc hỗ trợ |
| công việc UI/UX | `all-context.md`, `uxui/all-uxui.md` | file CSS liên quan cộng với file route/module |
| hồ sơ, sync, phụ huynh, backup | `all-context.md`, `sync-auth/all-sync-auth.md` | `js/state.js`, `js/modules/parent.js`, các module sync |
| deploy hoặc runtime-platform | `all-context.md`, `platform/all-platform.md` | `index.html`, `manifest.json`, `vercel.json`, doc hosting |
| bảo trì hệ ngữ cảnh | `all-context.md` | cập nhật nhóm nhỏ nhất liên quan, rồi chạy `vc-audit-context` |

## Vòng Đời Nhóm Ngữ Cảnh

Nhóm ngữ cảnh là các miền tri thức bền vững, không phải feature folder.

Tạo mới hoặc tách nhóm khi:

- một chủ đề có từ 3 doc bền vững trở lên hoặc có nhiều source hotspot lặp lại
- một file context lớn bắt đầu trộn nhiều miền không liên quan
- nhiều agent liên tục chỉ cần một lát nhỏ của cùng một miền kiến thức

Không tạo nhóm khi:

- nội dung chỉ là report triển khai hoặc checkpoint
- nội dung chỉ là plan tạm thời của một feature
- chủ đề đó chỉ thuộc về đúng một feature folder

## Cấu Trúc Repo

```text
meuw_academy/
  index.html                 -- vỏ SPA, bootstrap Tailwind CDN, điểm vào CSS
  manifest.json              -- manifest PWA
  vercel.json                -- cấu hình rewrite cho static SPA
  assets/                    -- ảnh mascot, phụ kiện, media assets
  css/
    base.css
    animations.css
    components.css
    mascot.css
    question-types.css
    responsive.css
  js/
    app.js                   -- điểm vào chính và đăng ký route
    router.js                -- hash router
    state.js                 -- localStorage state, hồ sơ, tiến độ, sync metadata
    mascot.js                -- render mascot và điều khiển speech bubble
    audio.js                 -- helper âm thanh
    schedule-calendar.js     -- lịch học và ánh xạ ngày
    supabase-config.js       -- cấu hình account-sync nếu dùng
    data/                    -- dữ liệu curriculum, generator, ánh xạ nguồn chính thống
    modules/                 -- view theo route và module tính năng
      question-types/        -- renderer cho các dạng hoạt động tương tác
  docs/
    CONSTITUTION.md
    TECHNICAL_SPEC.md
    DESIGN_SYSTEM.md
    SUPABASE_SETUP.md
    HANDOFF_*.md
    research/
      official-sources/      -- ghi chú tải nguồn chính thống và các manifest
  scripts/                   -- script audit nội dung, crawl nguồn, build curriculum
  process/
    context/                 -- router ngữ cảnh bền vững và các nhóm miền kiến thức
    development-protocols/   -- doc giao thức RIPER-5 dùng chung
    features/                -- plan, report, reference theo từng feature
    general-plans/           -- plan, report, reference mang tính cắt ngang
```

## Công Nghệ Và Kiến Trúc Chính

- **Dạng app:** static single-page app dùng ES modules chạy trực tiếp trên trình duyệt
- **Tầng framework:** không dùng build system kiểu React/Vue/Next; routing và rendering là custom
- **Tầng giao diện:** HTML + CSS tự viết, có nạp Tailwind từ CDN cho utility classes
- **Runtime:** ưu tiên trình duyệt; chạy local bằng HTTP server đơn giản như `python -m http.server 3000` hoặc VS Code Live Server
- **State:** `localStorage` qua `js/state.js`, gồm multi-profile, tiến độ học, settings, badge, gallery, và sync metadata
- **Máy tạo nội dung:** lớp dữ liệu/generator JavaScript lớn trong `js/data/`
- **Tài khoản và cloud backup:** Supabase email/password auth và state sync là tùy chọn, nạp trực tiếp qua CDN ESM trong `js/modules/account-sync.js`
- **Triển khai:** Vercel static hosting với rewrite về `index.html`
- **Bề mặt PWA/runtime:** có `manifest.json`; doc cũ nhắc `sw.js`, nhưng checkout hiện tại không có file `sw.js` tính đến 2026-06-15
- **Package manager:** không phát hiện ở root repo; không có `package.json` hoặc lockfile

## Pattern Và Quy Ước Quan Trọng

**Sư phạm lesson-first**

- luồng runtime của bài học hỗ trợ rõ việc dạy trước rồi mới tới câu hỏi luyện tập
- `js/modules/lesson.js` xử lý lesson blocks và questions như một luồng dẫn dắt thống nhất
- mọi thay đổi nội dung phải giữ nguyên nguyên tắc "dạy trước rồi luyện"

**Cấu trúc route/module**

- `js/app.js` đăng ký hash routes và mount từng route module một
- module cấp route nằm trong `js/modules/`
- renderer cho dạng câu hỏi tương tác nằm trong `js/modules/question-types/` với tên file PascalCase

**Mô hình state**

- `js/state.js` là singleton state service, không phải reducer/store framework
- tiến độ hồ sơ, lịch học, badge, gallery, và sync metadata đều commit qua `State.commit()`
- trong lúc học, `localStorage` vẫn là nguồn sự thật của runtime

**Kiến trúc nội dung**

- `js/data/curriculum-loader.js` và `js/data/fresh-curriculum.js` materialize curriculum theo ngày
- phần bám nguồn chính thống được phân tán qua các file `kntt-*`, `official-*`, và generator theo môn
- khi lỗi nội dung lặp lại, phải sửa generator hoặc source mapping, không vá từng output riêng lẻ

**Offline-first với cloud backup tùy chọn**

- account sync bổ sung cho local state chứ không thay thế local state
- Supabase chỉ dùng cho đăng nhập tài khoản bé và cloud backup
- UI phụ huynh/tài khoản nằm trong `js/modules/parent.js`

**Quy ước đặt tên**

- file route và utility chủ yếu dùng kebab-case hoặc lowercase đơn giản
- component cho question-type dùng tên file PascalCase
- hàm export và state methods dùng camelCase

**Ngôn ngữ tài liệu**

- mặc định tài liệu repo và handoff artifacts nên viết bằng tiếng Việt
- chỉ giữ ngoại lệ kỹ thuật khi dịch ra sẽ làm giảm độ rõ ràng hoặc làm sai thuật ngữ

## Môi Trường Và Cấu Hình

**Các file cấu hình**

- `index.html` bootstrap fonts, cấu hình Tailwind CDN, các gói CSS, và điểm vào app module
- `manifest.json` định nghĩa metadata của app có thể cài
- `vercel.json` rewrite mọi path về `index.html`
- `js/supabase-config.js` giữ URL Supabase và anon key nếu dùng

**Kiểu cấu hình**

- không có `.env.example` hoặc env schema có kiểu ở root repo
- các nút điều khiển chính của deploy/runtime hiện thiên về file-based config hơn là env var phức tạp

**Các phụ thuộc runtime quan trọng về mặt vận hành**

- trình duyệt phải hỗ trợ ES modules
- trình duyệt phải hỗ trợ `localStorage`
- phần luyện nói phụ thuộc vào `window.SpeechRecognition` hoặc `window.webkitSpeechRecognition`
- cloud sync phụ thuộc vào cấu hình Supabase hợp lệ và kết nối mạng

## Các Vùng Tính Năng Hiện Tại

- `learning` -- lesson flow, session flow, practice flow, tiến trình ngày học
- `content-curriculum` -- bài học sinh ra từ generator, bám nguồn chính thống, mở rộng môn, roadmap theo khối lớp
- `extra` -- gallery, tô màu, thẻ kiến thức, phụ kiện mascot, phần thưởng phụ
- `dashboard-settings` -- dashboard, khu vực phụ huynh, hồ sơ, settings, account controls

## Metadata Của Lần Quét

- Generated: 2026-06-15T00:00:00+07:00
- HEAD: `547d04199cde3b122a2ed3d03789ca71a440bb42`
- Mode: `refresh`
- Package manager: none detected
