# Official Text Corpus

Updated: `2026-06-03`

This folder stores machine-readable text extracted from official-source teaching materials already downloaded into the repo.

## Current extraction scope

Source lane currently extracted:

- `Hoc10`
  - teacher-training PDF
  - introduction DOCX

Subjects currently present:

- `toan`
- `tieng-viet`
- `tieng-anh`
- `tin-hoc`
- `lich-su-va-dia-li`
- `khoa-hoc`
- `am-nhac`
- `mi-thuat`
- `cong-nghe`
- `dao-duc`
- `hoat-dong-trai-nghiem`
- `giao-duc-the-chat`

## Why this exists

The app is moving away from using `PPTX-derived QA` for SGK-related subjects.

This corpus gives a cleaner official text lane for:

- short theory blocks for `Gâu tiên sinh`
- lesson lineage and subject structure
- future SGK-aligned question generation

## Important limitation

This corpus is **not** the same as exact SGK full text.

Current reality:

- `Hành Trang Số` gives the strongest exact-source lane through SGK page images.
- `official-text` here gives official teacher/training text that is machine-readable.
- This is useful for theory and lesson guidance, but should not be misrepresented as a full SGK text layer.

## Main artifacts

- [manifest.json](F:/projects/meuw_academy/docs/research/official-sources/notes/official-text/manifest.json)
- JSON files under each subject folder

Each extracted JSON stores:

- source file path
- source type
- source meta
- full text
- page or paragraph breakdown

## Regenerate

Run:

```powershell
$env:PYTHONIOENCODING='utf-8'
& 'C:\Users\vumin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts\extract_official_text_corpus.py
```

## Recommended usage

Use this corpus for:

- concise `theory snippet` extraction
- subject/unit/lesson structure lookup
- teacher-facing or pedagogy-aligned scaffolding

Do not use it blindly for:

- exact SGK reading text claims
- direct answer mining without validation
