# Phase 02 Repo Deploy Hygiene Report

**Date**: 15-06-26  
**Plan**: [PHASE_02_REPO_DEPLOY_HYGIENE_PLAN_15-06-26.md](/F:/projects/meuw_academy/process/features/app-hardening/active/PHASE_02_REPO_DEPLOY_HYGIENE_PLAN_15-06-26.md)  
**Status**: ✅ VERIFIED

## Summary

Phase 02 đã dọn bề mặt root repo và deploy surface theo hướng archive có kiểm soát, không xóa bừa artefact cũ.

Các thay đổi chính:

- chuyển nhóm script trace/test/ad-hoc khỏi root vào `process/features/app-hardening/references/root-archive/debug-scripts/`
- giữ `MEUW_ACADEMY_SPEC.md` làm spec canonical ở root
- chuyển `MEO_ACADEMY_SPEC.md` sang `spec-legacy/`
- đổi tên và archive snapshot `Ftmp_audit.json` sang `audit-snapshots/tmp_audit_2026-06-04.json`
- chuyển `inpaint.py` sang `local-tools/`
- chuyển `vie.traineddata` từ root sang `tools/tessdata/`
- thêm `.vercelignore` để loại khỏi deploy các nhóm doc/process/tooling không phục vụ runtime

## Files Changed

- `.vercelignore`
- `process/features/app-hardening/references/root-archive/README.md`
- root repo tree
- `tools/tessdata/vie.traineddata`

## Archive Decisions

Archive theo nhóm:

- `debug-scripts/`: `trace.js`, `trace2.js`, `trace3.js`, `test-choose.js`, `test-size.js`, `test-vie.js`, `fresh.js`, `fresh-eval.js`, `fresh-curriculum.trace.js`, `replace.js`
- `spec-legacy/`: `MEO_ACADEMY_SPEC.md`
- `audit-snapshots/`: `tmp_audit_2026-06-04.json`
- `local-tools/`: `inpaint.py`

Giữ lại ở root:

- `MEUW_ACADEMY_SPEC.md`
- `index.html`
- `manifest.json`
- `vercel.json`
- `README.md`
- các thư mục runtime chính như `js/`, `css/`, `assets/`, `images/`, `scripts/`

## Verification Evidence

Đã kiểm tra:

- `git status --short`
- `git diff --check`
- review tree root trước/sau
- review nội dung `.vercelignore`

Kết quả đáng chú ý:

- root repo đã gọn hơn rõ rệt, không còn nhóm file trace/test/spec legacy nằm lẫn trực tiếp
- `.vercelignore` hiện loại các nhóm không phục vụ runtime: `.agents/`, `.claude/`, `.codex/`, `.gemini/`, `docs/`, `process/`, `tools/`, cùng metadata harness
- `git diff --check` không báo lỗi patch mới; chỉ còn cảnh báo line ending ở các file Phase 01 đã chỉnh trước đó

## Manual Testing

- Đã có xác nhận của người dùng rằng cleanup/deploy intent hiện tại là phù hợp
- Chưa có deploy smoke thực tế trên Vercel, nhưng phase này đã đủ điều kiện xác nhận theo phạm vi cleanup đã chốt

## Data / State Verification

- Không có thay đổi dữ liệu runtime hoặc schema
- Xác minh bằng review tree rằng root đã chỉ còn canonical surface cần thiết hơn trước

## Errors Encountered and Fixed

- `Ftmp_audit.json` ban đầu trông giống file rác, nhưng kiểm tra nội dung cho thấy đây là snapshot audit cũ còn giá trị tham chiếu
- Cách xử lý: archive và đổi tên sạch thay vì xóa

## Archive Readiness

Phân loại hiện tại: **Ready to archive when convenient**

Lý do:

- cleanup kỹ thuật đã hoàn tất
- đã có xác nhận người dùng cho intent cleanup/deploy của phase này

## Next Valid State

- Có thể archive phase này khi muốn dọn `active/`
- Hoặc tiếp tục chương trình ở Phase 03
