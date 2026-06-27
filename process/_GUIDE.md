# Thư Mục Process

Đây là không gian làm việc vận hành của agent harness. Nó chứa ngữ cảnh, plan, feature, protocol, và seed.

## Cấu Trúc Thư Mục

process/
  _seeds/                  -- mẫu seed (tham chiếu chỉ đọc, không sửa trong setup)
  context/                 -- tri thức bền vững của dự án (`all-context.md` là router gốc)
  development-protocols/   -- doc phương pháp luận được quản lý
  features/                -- nơi lưu theo từng feature (plan, report, reference)
  general-plans/           -- plan, report, reference mang tính cắt ngang
    active/                -- plan đang chạy
    completed/             -- plan đã hoàn tất và lưu trữ
    backlog/               -- việc hoãn lại hoặc để sau
    reports/               -- báo cáo vận hành
    references/            -- tài liệu nghiên cứu và tham chiếu

## Quy Ước Chính

- file `all-*.md` là điểm vào định tuyến, nên đọc trước rồi mới đi sâu
- file `_GUIDE.md` giải thích thư mục đó dùng để chứa gì
- file `.seed` trong `_seeds/` là mẫu cấu trúc cho thấy hình dạng mong đợi của file thật
- feature folder nên được tạo khi một feature có từ 5 artifact trở lên hoặc có từ 3 pha plan trở lên
- plan dùng tên có đóng dấu ngày: `{feature}_PLAN_{dd-mm-yy}.md`
- thư mục seed của context group trong `_seeds/` dùng hậu tố `-seed`

## Phân Biệt Seed Và File Thật

- `_seeds/` chứa mẫu cấu trúc, chỉ đọc trong setup và không bị sửa
- file thật trong `context/`, `features/`, `general-plans/` chứa nội dung thực của dự án
- pha SCAFFOLD sao chép cấu trúc seed để tạo thư mục làm việc thật
- pha STUDY đọc seed để lấy khung mục, rồi ghi nội dung thật vào file làm việc
- seed được giữ lại để tham chiếu và để các lần cập nhật harness sau này có thể so đối chiếu
