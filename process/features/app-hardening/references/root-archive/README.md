# Root Archive

Các file trong thư mục này được dời khỏi root repo trong Phase 02 của chương trình `app-hardening`.

Mục tiêu:

- giảm noise ở root
- giữ lại artefact cũ để còn tra cứu khi cần
- tránh xóa nhầm các file debug, snapshot, hoặc spec legacy vẫn còn giá trị tham khảo

Phân nhóm:

- `debug-scripts/`: script trace/test/ad-hoc từng nằm ở root và chủ yếu tự tham chiếu lẫn nhau
- `spec-legacy/`: bản spec cũ không còn là canonical root spec
- `audit-snapshots/`: snapshot audit cũ được giữ lại để đối chiếu lịch sử
- `local-tools/`: công cụ xử lý cục bộ không phục vụ runtime web

Canonical file vẫn giữ ở root:

- `MEUW_ACADEMY_SPEC.md`
