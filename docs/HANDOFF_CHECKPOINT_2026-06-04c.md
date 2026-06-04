# Meuw Academy Handoff Checkpoint

Updated: `2026-06-04 (session 8 — schedule & duration overhaul)`
Repo branch: `master`
Latest commit: `1844a52`

## What Works in Production Right Now

### Subject Distribution — Fixed (session 8)

Before (no-history simulation, Day 1):
- math:1, eng:8, sci:9, vie:1, secondary:5 — completely wrong

After (Day 1):
- math:8, vie:6, eng:5, sci:5, secondary:0 ✓

Pattern: `math → vie → eng → sci` cycling, truly interleaved. Summer phase: 100% core subjects, no histgeo/it/tech.

### Question Counts — Increased (session 8)

| Subject | Before | After | Target (4.5 min) |
|---------|--------|-------|-----------------|
| Math    | 20Q    | 26Q   | ✓               |
| Eng     | 18Q    | 24Q   | ✓               |
| Vie     | 6Q     | 12Q   | good (vocab/reading takes ~20s/Q) |
| Sci     | 5-6Q   | 11-12Q | good with lesson block |

### Content Quality — 0 findings (days 1-365)

(unchanged from session 7)

### Rest Break Reminders — Added

Session list now shows a 🌿 break reminder card after every 6 modules (~27 min at 4.5 min/module).

## Root Causes Fixed This Session

1. **Summer pattern interleaving**: Changed from clustered to strict m→v→e→s cycling.
   Also removed enrichment slot override for summer (no histgeo/it/tech).

2. **Zero-yield catalog entries**: KNTT math/vie/sci topics with empty pools
   were being selected by `chooseTopicEntry` (generator topics always return
   `remainingQuestions=999999`) but then producing 0Q in `buildQuestionsForEntry`,
   causing eng to fill those slots. Fixed: catalog filter in `buildCatalog` probes
   all KNTT generator topics and removes those with <4 questions.

3. **Đọc explanation dedup**: All 62 Đọc vie topics had identical explanations
   in `buildReadingSkillQuestions`. After slot 1 used a Đọc topic, its 6
   explanations were added to `explanationSeenDay`. Subsequent Đọc topics
   produced 0Q (all 6 explanations blocked). Fixed: embed `lessonTitle` in
   each explanation, making all 6 unique per topic.

4. **Review variants**: `generateReviewVariants()` added — 2-choice simplified
   re-asks from existing questions. Applied when pool/generator is exhausted
   before `TARGET_QUESTION_COUNT`. Doubles effective pool for vie/sci.

## Architecture Changes

```
buildCatalog() now runs a catalog filter after merging all topics:
  for subject in [math, vie, sci]:
    filter out entries with no generator AND questionPool.length < 4
    filter out KNTT generator entries whose probe returns < 4 questions

buildQuestionsForEntry() now pads with review variants:
  if (still short after generator loop) and (subject !== math):
    reviewPool = generateReviewVariants(selected, needed)
    processPool(reviewPool)
  if (still short after pool loop) and (questionPool.length):
    reviewPool = generateReviewVariants(questionPool, needed)
    processPool(reviewPool)
```

## Files Changed This Session (session 8)

- `js/data/fresh-curriculum.js`: summer pattern, enrichment suppression,
  TARGET_QUESTION_COUNT (math:26, eng:24), catalog filter, generateReviewVariants,
  buildQuestionsForEntry review variant padding
- `js/data/vie-question-generator.js`: embed lessonTitle in all 6 Đọc explanations
- `js/modules/session.js`: rest break card after every 6 modules

## Commits This Session

- `1844a52`: Fix schedule: proper subject interleaving, question counts, rest breaks

## Previous Sessions

See `docs/HANDOFF_CHECKPOINT_2026-06-04b.md` for sessions 1-7 details.
