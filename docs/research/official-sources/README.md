# Official Source Corpus

This folder is the canonical school-source corpus for grade 4 knowledge work in this app.

## Approved school sources

- `https://hanhtrangso.nxbgd.vn/`
- `https://www.hoc10.vn/`

## Book series policy

**Active series: Kết nối tri thức với cuộc sống (KNTT) only.**

Basis: Bộ GD&ĐT Quyết định số 3588/QĐ-BGDĐT — KNTT là bộ SGK thống nhất toàn quốc từ năm học 2026-2027.

Do not use "Chân trời sáng tạo" (CTST) content in app curriculum or knowledge pool. Both series are cataloged in `notes/hts-lop4-book-indexes.json` for reference, but only KNTT data feeds into app runtime.

## Policy

- For school-subject content, do not add other SGK aggregation sources unless the user explicitly approves them.
- Keep broader science expansion sources separate from the SGK lane.
- Store structured metadata and scripts in git.
- Keep large downloaded binaries local under `downloads/` and out of git.

## Artifacts

- `notes/official-source-registry.json`
  - Source policy, status, and official-source scope.
- `notes/hoc10-lop4-worksheet-index.json`
  - Public worksheet docs for grade 4 subjects.
- `notes/hoc10-lop4-slide-index.json`
  - Public slide-deck metadata for grade 4 subjects.
- `notes/hoc10-lop4-book-index.json`
  - Official Hoc10 SGK/SGV/VBT registry from the `list-book` API, grouped by subject.
- `notes/hoc10-lop4-bookshelf-index.json`
  - HTML-captured bookshelf metadata from Hoc10 as a fallback lane, with per-subject `status/error` when routes time out or only return a shell.
- `notes/hoc10-download-manifest.json`
  - Local binary files downloaded from public Hoc10 worksheet URLs, including ZIP bundles for slide decks, audio, and teacher packs.
- `scripts/fetch_official_sources.mjs`
  - Refreshes official Hoc10 SGK registry, worksheet/slide metadata, downloads public docs, and captures bookshelf HTML metadata as fallback.

## Current lane split

- School subjects:
  - Toan
  - Tieng Viet
  - Tieng Anh
  - Tin hoc
- Science extension:
  - Khoa hoc

## Notes on Hanh Trang So

Hanh Trang So remains an approved official source. Its frontend and route map were captured from official site assets, but public bulk extraction is currently blocked behind the site's bootstrap auth flow. The status is recorded in `notes/official-source-registry.json`.
