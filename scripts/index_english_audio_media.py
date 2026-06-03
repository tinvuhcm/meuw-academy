from __future__ import annotations

import json
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE_DIR = ROOT / "docs" / "research" / "official-sources" / "downloads" / "hoc10" / "lop4" / "tieng-anh" / "worksheets"
OUTPUT = ROOT / "docs" / "research" / "official-sources" / "notes" / "english-audio-media-manifest.json"

ZIPS = [
    ("teacher_audio", "07_Audio_SGV.zip"),
    ("workbook_audio", "08_Audio_SBT.zip"),
    ("student_book_audio", "09_Audio_SHS.zip"),
]


def build_entry(kind: str, zip_name: str) -> dict:
    zip_path = BASE_DIR / zip_name
    entries: list[dict] = []
    with zipfile.ZipFile(zip_path) as zf:
      for info in zf.infolist():
          if info.is_dir():
              continue
          entries.append(
              {
                  "name": info.filename,
                  "bytes": info.file_size,
              }
          )
    return {
        "kind": kind,
        "zipPath": str(zip_path.relative_to(ROOT)).replace("\\", "/"),
        "entryCount": len(entries),
        "entries": entries,
    }


def main() -> None:
    manifest = {
        "source": "hoc10",
        "subject": "tieng-anh",
        "note": "Audio ZIP inventory for Tiếng Anh 4 - Explore Our World; use this to map tracks into runtime listening activities.",
        "items": [build_entry(kind, zip_name) for kind, zip_name in ZIPS],
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
