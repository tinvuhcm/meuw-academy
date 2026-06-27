# Ngữ Cảnh Platform

Đây là file vào cửa chuẩn của nhóm ngữ cảnh platform cho Meuw Academy.

Hãy dùng file này sau `process/context/all-context.md` khi tác vụ liên quan tới deploy, static hosting, PWA/runtime, hoặc giả định về hỗ trợ trình duyệt.

## Phạm Vi

Nhóm này bao phủ:

- cách app static SPA khởi động và route được rewrite
- manifest và các giả định runtime trên trình duyệt
- cách serve local để phát triển và xác minh
- hình thức deploy hiện tại và các ràng buộc platform

Nhóm này không bao phủ:

- chi tiết nội bộ của curriculum
- logic sản phẩm của dashboard/profile
- hướng dẫn thuần về design-system hình ảnh

## Đọc Khi Nào

Đọc file này khi:

- deploy hoặc thay đổi hành vi hosting
- debug lỗi refresh route
- thay đổi giả định manifest/runtime trên trình duyệt
- chuẩn bị cho việc mở rộng dùng công khai/cộng đồng

## Định Tuyến Nhanh

- dùng `README.md` cho hướng dẫn chạy repo theo kiểu người đọc và phần tóm tắt sản phẩm
- dùng `index.html` cho đường boot thật và các runtime dependency nạp trên trình duyệt
- dùng `manifest.json` cho metadata của app có thể cài
- dùng `vercel.json` cho hành vi rewrite route ở môi trường production
- dùng `docs/TECHNICAL_SPEC.md` cho ghi chú kiến trúc/deploy cũ, nhưng phải đối chiếu với filesystem trước khi hành động

## Source Paths

- `README.md`
- `index.html`
- `manifest.json`
- `vercel.json`
- `docs/TECHNICAL_SPEC.md`
- `docs/CONSTITUTION.md`

## Khi Nào Cần Cập Nhật

Hãy cập nhật nhóm này khi:

- platform hosting hoặc hành vi rewrite thay đổi
- có thêm hoặc bỏ service worker thật
- hướng dẫn chạy local thay đổi
- việc mở rộng cho cộng đồng làm thay đổi giả định runtime/trình duyệt

## Ghi Chú Chuẩn

- Repo này hiện vận hành như một static SPA, không phải web app quản lý bằng package manager chuẩn.
- `TECHNICAL_SPEC.md` có nhắc `sw.js`, nhưng checkout hiện tại không có file `sw.js`; hãy tin filesystem hiện tại hơn doc lịch sử.
