# Thiết lập Supabase cho Meuw Academy

Ứng dụng này chỉ dùng Supabase cho 2 việc:

- đăng nhập tài khoản
- sao lưu cloud cho local state

App vẫn giữ mô hình `offline-first`: trong lúc học, `localStorage` vẫn là nguồn dữ liệu runtime chính.

## 1. Tạo project

1. Tạo một project Supabase.
2. Mở `Project Settings > API`.
3. Chép `Project URL` và `publishable anon key` vào `js/supabase-config.js`.
4. Trong `Authentication > Providers`, bật `Email`.

## 2. Tạo bảng đồng bộ

Chạy SQL sau trong `Supabase SQL Editor`:

```sql
create table if not exists public.user_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  device_id text,
  updated_at timestamptz not null default now()
);

alter table public.user_states enable row level security;

drop policy if exists "users can read own state" on public.user_states;
create policy "users can read own state"
on public.user_states
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own state" on public.user_states;
create policy "users can insert own state"
on public.user_states
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own state" on public.user_states;
create policy "users can update own state"
on public.user_states
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

## 3. Quy tắc conflict

Khi dữ liệu local và cloud khác nhau:

- `Dùng dữ liệu cloud`: ghi đè máy hiện tại bằng cloud
- `Giữ dữ liệu máy này`: không ghi đè gì ngay; phụ huynh có thể chủ động bấm đẩy lên cloud sau

Auto-sync hiện tại không tự ghi đè mù:

- nếu cloud mới hơn và local đang sạch, app có thể hydrate local từ cloud
- nếu local đã khác hoặc máy này mới hơn, app chỉ cảnh báo để phụ huynh tự quyết định

## 4. Luồng migrate

Với một thiết bị đang có tiến độ đúng:

1. Mở `Phụ huynh > Dữ liệu & Đám mây`.
2. Đăng nhập hoặc tạo tài khoản cho bé.
3. Dùng nút `Đẩy lên cloud` để lấy máy này làm mốc đúng ban đầu.

Với một thiết bị mới:

1. Đăng nhập bằng đúng email và mật khẩu đó.
2. Dùng nút `Dùng dữ liệu cloud` nếu muốn lấy tiến độ từ cloud về máy.

## 5. Checklist xác minh môi trường thật

Sau khi cấu hình xong, nên tự kiểm tra tối thiểu các bước sau:

1. Đăng ký hoặc đăng nhập thành công bằng email thật.
2. Đảm bảo bảng `public.user_states` đã tồn tại.
3. Kiểm tra đã bật `row level security` cho `public.user_states`.
4. Xác nhận user A có thể `select`, `insert`, `update` đúng bản ghi của chính mình.
5. Xác nhận user A không đọc được bản ghi của user B.
6. Từ app local, thử `Đẩy lên cloud` rồi kiểm tra `updated_at` trên Supabase có thay đổi.
7. Từ app local hoặc máy khác, thử `Dùng dữ liệu cloud` và xác nhận local state được nạp đúng.
8. Thử trường hợp Supabase chưa cấu hình để chắc UI báo lỗi rõ, không ghi đè im lặng.

## 6. Ghi chú an toàn vận hành

- Không dùng PIN phụ huynh mặc định `1234` khi bật tính năng cloud.
- Không coi cloud là nguồn sự thật tuyệt đối; app hiện vẫn là local-first.
- Nếu cần kiểm tra policy production, ưu tiên dùng tài khoản test riêng thay vì thao tác trên dữ liệu người dùng thật.
