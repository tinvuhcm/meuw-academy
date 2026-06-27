# App Hardening Program Plan

**Date**: 15-06-26  
**Complexity**: COMPLEX (Phase Program)  
**Status**: 🧪 TESTING  
**Execution Model**: Phase-by-phase theo `process/development-protocols/phase-programs.md`

## Overview

Đây là umbrella/orchestration plan cho chương trình chuẩn hóa Meuw Academy. Mục tiêu là đưa ứng dụng từ trạng thái “chạy được nhưng còn bug, còn log debug, còn rác repo và còn vài điểm yếu vận hành” sang trạng thái đủ sạch, đủ chắc, và đủ mượt để phục vụ khoảng 100 người dùng trên hạ tầng Vercel + Supabase hiện tại mà không cần thay kiến trúc nền.

## Quick Links

- [Context and Goals](#context-and-goals)
- [Program Goal Charter](#program-goal-charter)
- [Phase Completion Rules](#phase-completion-rules)
- [Execution Brief](#execution-brief)
- [Phased Delivery Plan](#phased-delivery-plan)
- [Touchpoints](#touchpoints)
- [Public Contracts](#public-contracts)
- [Blast Radius](#blast-radius)
- [Verification Evidence](#verification-evidence)
- [Resume and Execution Handoff](#resume-and-execution-handoff)

## Context and Goals

Nguồn gốc chương trình này là báo cáo [APP_AUDIT_2026-06-15.md](/F:/projects/meuw_academy/process/general-plans/reports/APP_AUDIT_2026-06-15.md), trong đó đã xác nhận:

- có bug chức năng chắc chắn trong `js/state.js`
- có debug log lọt vào runtime nội dung
- script audit nội dung chưa headless-safe
- có nợ vệ sinh repo/deploy
- parent PIN mặc định quá yếu
- hạ tầng hiện tại đủ cho 100 users, nhưng app chưa đủ sạch để tự tin mở rộng cộng đồng ngay

Mục tiêu của chương trình là sửa những vấn đề đó theo từng pha, có kiểm chứng, không phóng đại “đã ổn” trước khi có bằng chứng.

## Program Goal Charter

# App Hardening (Meuw Academy) — Program Goal Charter

North star:
- Chuẩn hóa Meuw Academy để agent tương lai có thể audit, sửa, kiểm chứng, và bàn giao app một cách trung thực trên hạ tầng Vercel + Supabase hiện tại, với bề mặt runtime sạch hơn, ít bug hơn, ít rác hơn, và đủ ổn để phục vụ khoảng 100 users.

Definition of done:
1. Các bug chức năng chắc chắn đã biết ở bề mặt runtime trọng yếu được sửa và có regression check hẹp đi kèm.
2. Runtime không còn log debug rò vào console ở các đường nội dung đã audit.
3. Script audit lõi chạy được trong môi trường headless/Node mà không phun lỗi môi trường giả tạo.
4. Repo root và bề mặt deploy được dọn tới mức không còn artefact thử nghiệm gây nhầm lẫn hoặc rác upload rõ rệt.
5. Parent/account/sync bớt yếu hơn mức hiện tại và có checklist xác minh môi trường Supabase thực tế.
6. Có ít nhất một vòng rà perceived performance/UX để giảm các điểm gây thiếu mượt dễ thấy.
7. Mọi pha đều có báo cáo và chỉ được nâng lên `✅ VERIFIED` khi phase gate và regression gate đều có bằng chứng.

What "verified" means (program level):
- Mỗi pha phải qua đúng gate của nó, có bằng chứng lệnh/chụp log/manual check, và không làm hỏng các bề mặt đã xanh ở pha trước. Chương trình chỉ được coi là hoàn tất khi các phase 01-05 đều đạt `✅ VERIFIED` hoặc đã được ghi rõ lane nào bị tách sang backlog.

Scope tiers → phase mapping:
- Tier 1 runtime correctness → Phases 01, 03
- Tier 2 hygiene and operational readiness → Phases 02, 04
- Tier 3 content-repeat and broader resilience → Phase 05
- This program retires Tiers 1-3.

Explicitly out of scope (deferred tier):
- Di cư kiến trúc lớn khỏi static SPA
- Thay toàn bộ Tailwind CDN bằng pipeline build mới nếu chưa thật sự cần
- Thiết kế lại toàn bộ curriculum cho lớp 1-5
- Tối ưu lên quy mô lớn hơn nhiều so với 100 users

Hard safety constraints (non-negotiable, per phase):
- Không xóa hay phá dữ liệu production trên Supabase.
- Không push deploy production như một phần tự động của chương trình này.
- Không tự ý xóa các file nghiên cứu hoặc doc lịch sử nếu chưa xác nhận đó là rác thật hoặc đã được archive an toàn.
- Mọi thay đổi làm dịch scope phase phải được ghi lại vào phase report hoặc phase plan trước khi tiếp tục.

## Phase Completion Rules

A phase is NOT complete until:

1. **Integration Test** - Works with other system pieces
2. **Manual Test** - User can perform the action
3. **Data Verification** - Database/state changes confirmed
4. **Error Handling** - Failure cases handled gracefully
5. **User Confirmation** - User says "it works"

Status meanings:
- ⏳ PLANNED - Not started
- 🔨 CODE DONE - Written but not E2E tested
- 🧪 TESTING - Currently being tested
- ✅ VERIFIED - Tested AND confirmed working
- 🚧 BLOCKED - Has issues

After each phase, document:
- [ ] What was tested manually
- [ ] Data verified in DB/state
- [ ] Errors encountered and fixed
- [ ] User confirmation received

## Execution Brief

### Phase 01 - Runtime Bugs and Log Hygiene
What happens:
- Sửa bug runtime chắc chắn, bỏ debug log lọt vào runtime, và làm sạch script audit headless.
Integration points:
- `js/state.js`, `js/data/fresh-curriculum.js`, `scripts/audit_content_quality.mjs`, `scripts/verify_long_range_schedule.mjs`
Test:
- syntax checks, rerun audit scripts, manual check bề mặt profile liên quan
Verify:
- bug không còn tái hiện, log debug biến mất, script audit chạy sạch hơn
Done when:
- phase report có bằng chứng sửa bug và user xác nhận lane fix hợp lý

### Phase 02 - Repo Cleanup and Deploy Hygiene
What happens:
- Dọn artefact rác/thử nghiệm, chuẩn hóa spec/doc canonical, thêm `.vercelignore` nếu phù hợp.
Integration points:
- repo root, docs, deploy packaging surface
Test:
- `git status`, `git diff --check`, dry review artifact, deploy-scope review
Verify:
- artefact thừa đã được gom/xóa/archive có kiểm soát
Done when:
- repo root sạch hơn rõ rệt và không còn artefact deploy-noise lớn

### Phase 03 - Sync/Auth Hardening
What happens:
- Siết parent PIN, rà sync overwrite flow, và thêm checklist xác minh Supabase thực tế.
Integration points:
- `js/state.js`, `js/modules/parent.js`, `js/modules/account-sync.js`, `docs/SUPABASE_SETUP.md`
Test:
- manual parent flow, sync flow, safety-path review
Verify:
- auth/sync không yếu như trước và có đường kiểm chứng rõ cho môi trường thật
Done when:
- phase report chứng minh được bề mặt phụ huynh/tài khoản an toàn hơn

### Phase 04 - Performance and UX Smoothing
What happens:
- Giảm các điểm gây khựng/thiếu mượt dễ thấy, ưu tiên dialog blocking và phụ thuộc runtime bên ngoài.
Integration points:
- `index.html`, `js/modules/*`, CSS, route-level UX
Test:
- local browser smoke trên dashboard/lesson/parent
Verify:
- hành vi mượt hơn ở các đường học chính, không phát sinh regression rõ
Done when:
- có bằng chứng UX/runtime đã bớt thô hơn ở các điểm ưu tiên cao

### Phase 05 - Content Duplication and Scenario Audit
What happens:
- Điều tra mức lặp topic/question, audit edge case cho learning + sync + curriculum, và tách lane tiếp theo nếu cần.
Integration points:
- `js/data/*`, `scripts/*`, report và references mới
Test:
- rerun content/schedule scripts, scenario review
Verify:
- có kết luận rõ đâu là lặp chấp nhận được và đâu là lỗi cần roadmap xử lý tiếp
Done when:
- phase report đưa ra phán quyết đủ rõ để quyết định giữ nguyên, sửa tiếp, hoặc tạo follow-up program

## Phased Delivery Plan

| Phase | File plan | Report path | Status | What green proves |
|---|---|---|---|---|
| 01 | `process/features/app-hardening/active/PHASE_01_RUNTIME_HARDENING_PLAN_15-06-26.md` | `process/features/app-hardening/reports/PHASE_01_RUNTIME_HARDENING_REPORT_15-06-26.md` | ✅ VERIFIED | runtime bug chắc chắn và debug log chính đã được xử lý có kiểm chứng |
| 02 | `process/features/app-hardening/active/PHASE_02_REPO_DEPLOY_HYGIENE_PLAN_15-06-26.md` | `process/features/app-hardening/reports/PHASE_02_REPO_DEPLOY_HYGIENE_REPORT_15-06-26.md` | ✅ VERIFIED | repo/deploy surface sạch hơn và ít artefact gây nhầm lẫn hơn |
| 03 | `process/features/app-hardening/active/PHASE_03_SYNC_AUTH_HARDENING_PLAN_15-06-26.md` | `process/features/app-hardening/reports/PHASE_03_SYNC_AUTH_HARDENING_REPORT_15-06-26.md` | ✅ VERIFIED | bề mặt parent/account/sync an toàn và rõ ràng hơn |
| 04 | `process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md` | `process/features/app-hardening/reports/PHASE_04_PERFORMANCE_UX_SMOOTHING_REPORT_15-06-26.md` | 🔨 CODE DONE | perceived performance và UX của các đường chính được cải thiện có kiểm chứng |
| 05 | `process/features/app-hardening/active/PHASE_05_CONTENT_DUPLICATION_AUDIT_PLAN_15-06-26.md` | `process/features/app-hardening/reports/PHASE_05_CONTENT_DUPLICATION_AUDIT_REPORT_15-06-26.md` | ⏳ PLANNED | có kết luận bền vững về mức lặp nội dung và edge cases trọng yếu |

## Acceptance Criteria

- Có feature folder `app-hardening` với đầy đủ umbrella plan và phase plans.
- Mỗi phase có report path riêng và ranh giới “green proves” riêng.
- Mỗi plan đều nhắc đọc `process/context/all-context.md`.
- Mỗi plan đều có gate test/xác minh đủ rõ để không green sai.
- Pha đầu tiên được chỉ ra rõ ràng là Phase 01.

## Touchpoints

- `process/general-plans/reports/APP_AUDIT_2026-06-15.md`
- `process/context/all-context.md`
- `process/context/tests/all-tests.md`
- `process/features/app-hardening/`
- các file runtime được phase plans chỉ định

## Public Contracts

- Không thay đổi kiến trúc public của app ở bước plan này.
- Contract chính ở bước này là contract vận hành: mọi pha phải có plan, report path, gate xác minh, và handoff rõ ràng.

## Blast Radius

- Chỉ chạm vào `process/features/app-hardening/` ở bước hiện tại.
- Không sửa code runtime ở bước tạo plan này.

## Verification Evidence

- `node .claude/skills/vc-generate-plan/scripts/validate-plan-artifact.mjs process/features/app-hardening/active/APP_HARDENING_PROGRAM_PLAN_15-06-26.md`
- validator cho toàn bộ 5 phase plan đi kèm

## Resume and Execution Handoff

Khi resume:

1. đọc `process/context/all-context.md`
2. đọc `process/general-plans/reports/APP_AUDIT_2026-06-15.md`
3. đọc file umbrella này
4. chỉ chọn đúng **một** phase plan để đưa vào vòng research -> approval -> execute -> validate

Pha đang là điểm tiếp nối gần nhất:

- `process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md`
- checkpoint resume mới nhất:
  - `process/features/app-hardening/reports/PHASE_04_ACTIVE_CHECKPOINT_18-06-26.md`

## Next Step

Phase 01, Phase 02, và Phase 03 đã `✅ VERIFIED`. Phase 04 đang ở `🔨 CODE DONE`.

Bước kế tiếp hợp lệ tốt nhất:

- hoàn tất manual smoke cho `process/features/app-hardening/active/PHASE_04_PERFORMANCE_UX_SMOOTHING_PLAN_15-06-26.md`
- khi handoff sang agent khác, đọc thêm:
  - `process/features/app-hardening/reports/PHASE_04_ACTIVE_CHECKPOINT_18-06-26.md`
- hoặc chỉ sau đó mới chuyển sang `ENTER RESEARCH MODE` cho `process/features/app-hardening/active/PHASE_05_CONTENT_DUPLICATION_AUDIT_PLAN_15-06-26.md`
