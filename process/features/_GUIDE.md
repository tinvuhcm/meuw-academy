# Thư Mục Feature

Thư mục này chứa phần lưu trữ theo từng feature cho các cụm công việc đủ lớn.

## Khi Nào Nên Tạo Feature Folder

Tạo feature folder khi:

- feature có từ 5 artifact liên quan trở lên
- công việc là một dự án nhiều pha mới
- người dùng nói rõ đây là một mảng sản phẩm đủ lớn
- artifact trong general-plans cho cùng một chủ đề đã vượt ngưỡng

Không tạo feature folder khi:

- công việc chỉ là một plan đơn lẻ và chưa có backlog
- phạm vi còn mơ hồ hoặc cắt ngang nhiều mảng
- công việc chỉ là bug nhỏ hoặc cải tiến vặt

## Cấu Trúc Thư Mục

Mỗi feature folder có các thư mục con sau:

```text
process/features/{feature-name}/
  active/       -- plan đang chạy
  completed/    -- plan đã hoàn tất và lưu trữ
  backlog/      -- plan hoặc việc bị hoãn
  reports/      -- báo cáo vận hành riêng của feature
  references/   -- tài liệu nghiên cứu và tham chiếu riêng của feature
```

## Cách Đặt Tên

Dùng kebab-case cho tên feature folder.
