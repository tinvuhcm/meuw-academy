# Meuw Academy Handoff Checkpoint

Updated: `2026-06-04 (session 9 — 27Q target + sci-world expansion)`
Repo branch: `master`
Latest commit: `54b309f`

## What Works in Production Right Now

### Question Counts — Raised to 27Q (session 9)

| Subject | Before | After | Mechanism |
|---------|--------|-------|-----------|
| Math    | 26Q    | 27Q   | Static pool ≥27Q |
| Eng     | 24Q    | 27Q   | Static pool ≥27Q |
| Vie     | 12Q    | 27Q   | 9 base + 9 Ôn lại + 9 Nhớ lại |
| Sci     | 11-12Q | 27Q   | 7 base + 7 Ôn lại + 7 Nhớ lại + 6 Kiểm tra |

Target duration: ~4.5 min/module at ~10s/Q.

### 3-Round Review Variants (session 9)

`generateReviewVariants(pool, needed, seedInput, round)` now has 3 rounds:

| Round | Prefix     | Wrong option used |
|-------|------------|-------------------|
| 0     | `Ôn lại`   | `wrong[0]`        |
| 1     | `Nhớ lại`  | `wrong[1]`        |
| 2     | `Kiểm tra` | `wrong[2]`        |

Each prefix is embedded in the `explanation` field → unique `explanationSignature` → dedup logic passes.

**baseSelected snapshot**: `const baseSelected = [...selected]` captured before the review loop in the generator path. Prevents round N reviewing round N-1's review variants (no "Nhớ lại: Ôn lại: ..." chains).

Pool path uses `entry.questionPool` directly — already immune to cascading.

### Vie Question Banks — All ≥9Q (session 9)

All 13 `QUESTION_BANKS` in `vie-question-generator.js` expanded to ≥9Q:
`danh-tu, dong-tu, tinh-tu, cau-chu-ngu-vi-ngu, trang-ngu, dau-gach-ngang, dau-ngoac-kep, nhan-hoa, doan-van-cau-chu-de, doan-van-y-kien, chinh-ta, doc-hieu, noi-nghe`

`buildReadingSkillQuestions`: pool expanded 6→10 Q, slice to `max(9, ...)`.

### Sci-World Topics — All 43 Topics at ≥7Q (session 9)

All 37 original topics expanded to ≥7Q. 6 new topics added across 3 new sections:

**SPACE_EXPLORATION (new):**
- `rockets-space-travel` — Tên lửa và Du hành vũ trụ (7Q)
- `space-inventions` — Công nghệ vũ trụ (7Q)

**ENVIRONMENT (new):**
- `climate-change` — Biến đổi khí hậu (7Q)
- `ecosystems-food-chain` — Hệ sinh thái và Chuỗi thức ăn (7Q)

**EVERYDAY_SCIENCE (new):**
- `food-science` — Khoa học Thực phẩm (7Q)
- `human-technology` — Công nghệ của Con người (7Q)

Total sci-world topics: **43** (was 37).

## Root Causes Fixed This Session

1. **TARGET_QUESTION_COUNT**: Raised to 27 for all subjects. Math/eng reach 27Q
   from static pool; vie/sci reach 27Q via 2-3 rounds of review variants.

2. **Cascading review (design fix)**: `buildQuestionsForEntry` generator path
   captured `const baseSelected = [...selected]` before the review loop.
   Without this, round 1 would review round 0's variants → garbled questions.

3. **Unique review explanations**: Each round's explanation gets the round prefix
   embedded (`Ôn lại — `, `Nhớ lại — `, `Kiểm tra — `) → different
   `explanationSignature` → dedup allows all 3 rounds through.

4. **Vie banks too small**: 9 banks had <9Q → couldn't fill 2 review rounds.
   All expanded to ≥9Q with curriculum-accurate content.

5. **Sci-world pools too small**: 24 topics had <7Q → couldn't fill 3 rounds.
   All expanded to ≥7Q; 6 entirely new topics added.

## Architecture Changes

```
TARGET_QUESTION_COUNT = { math:27, eng:27, vie:27, sci:27, ... }

REVIEW_ROUNDS = [
  { prefix:'Ôn lại',   wrongIdx:0 },
  { prefix:'Nhớ lại',  wrongIdx:1 },
  { prefix:'Kiểm tra', wrongIdx:2 },
]

generateReviewVariants(pool, needed, seedInput, round=0):
  uses REVIEW_ROUNDS[round % 3]
  embeds prefix in explanation → unique signature

buildQuestionsForEntry — generator path:
  const baseSelected = [...selected]   // snapshot before review loop
  for rv in 0..2: generateReviewVariants(baseSelected, needed, seed, rv)

buildQuestionsForEntry — pool path:
  for rv in 0..2: generateReviewVariants(entry.questionPool, needed, seed, rv)
```

## Files Changed This Session (session 9)

- `js/data/fresh-curriculum.js`: TARGET_QUESTION_COUNT → 27, REVIEW_ROUNDS,
  generateReviewVariants 3-round, baseSelected snapshot, 3-round loops in both paths
- `js/data/vie-question-generator.js`: all 13 banks → ≥9Q, buildReadingSkillQuestions pool 6→10
- `js/data/science-world.js`: all 37 topics → ≥7Q, 6 new topics, 3 new sections

## Commits This Session

- `54b309f`: Raise all subjects to 27Q/module + expand sci-world to 43 topics

## Previous Sessions

See `docs/HANDOFF_CHECKPOINT_2026-06-04c.md` for sessions 1-8 details.
