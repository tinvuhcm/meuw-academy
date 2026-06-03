from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader
import docx


REPO = Path(__file__).resolve().parents[1]
DOWNLOADS = REPO / "docs" / "research" / "official-sources" / "downloads"
OUT_DIR = REPO / "docs" / "research" / "official-sources" / "notes" / "official-text"


def clean_text(text: str) -> str:
    text = text.replace("\ufeff", " ")
    text = text.replace("\u00a0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "file"


def extract_pdf(path: Path) -> dict:
    reader = PdfReader(str(path))
    pages = []
    for index, page in enumerate(reader.pages, start=1):
        page_text = clean_text(page.extract_text() or "")
        pages.append(
            {
                "page": index,
                "text": page_text,
                "chars": len(page_text),
            }
        )
    full_text = "\n\n".join(page["text"] for page in pages if page["text"])
    return {
        "kind": "pdf",
        "path": str(path.relative_to(REPO)).replace("\\", "/"),
        "pages": pages,
        "fullText": full_text,
        "pageCount": len(pages),
        "nonEmptyPages": sum(1 for page in pages if page["text"]),
    }


def extract_docx(path: Path) -> dict:
    document = docx.Document(str(path))
    paragraphs = []
    for index, para in enumerate(document.paragraphs, start=1):
        para_text = clean_text(para.text)
        if para_text:
            paragraphs.append(
                {
                    "index": index,
                    "text": para_text,
                    "chars": len(para_text),
                }
            )
    full_text = "\n\n".join(para["text"] for para in paragraphs)
    return {
        "kind": "docx",
        "path": str(path.relative_to(REPO)).replace("\\", "/"),
        "paragraphs": paragraphs,
        "fullText": full_text,
        "paragraphCount": len(paragraphs),
    }


def classify_source(path: Path) -> dict:
    parts = [part.lower() for part in path.parts]
    source = "unknown"
    if "hoc10" in parts:
      source = "hoc10"
    elif "hts" in parts:
      source = "hanhtrangso"

    subject = next(
        (
            part
            for part in parts
            if part
            in {
                "toan",
                "tieng-viet",
                "tieng-anh",
                "tin-hoc",
                "lich-su-va-dia-li",
                "khoa-hoc",
                "dao-duc",
                "am-nhac",
                "mi-thuat",
                "cong-nghe",
                "giao-duc-the-chat",
                "hoat-dong-trai-nghiem",
            }
        ),
        "unknown",
    )

    category = next(
        (
            part
            for part in parts
            if part in {"worksheets", "slides", "pages"}
        ),
        "unknown",
    )

    return {
        "source": source,
        "subject": subject,
        "category": category,
    }


def write_entry(entry: dict, path: Path) -> None:
    meta = classify_source(path)
    stem = slugify(path.stem)
    out_dir = OUT_DIR / meta["source"] / meta["subject"]
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"{stem}.json"
    entry["meta"] = meta
    entry["sourceName"] = path.name
    out_file.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []

    for path in sorted(DOWNLOADS.rglob("*")):
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        try:
            if suffix == ".pdf":
                entry = extract_pdf(path)
            elif suffix == ".docx":
                entry = extract_docx(path)
            else:
                continue
            write_entry(entry, path)
            manifest.append(
                {
                    "path": entry["path"],
                    "kind": entry["kind"],
                    "meta": entry["meta"],
                    "textChars": len(entry["fullText"]),
                }
            )
        except Exception as exc:  # pragma: no cover - best effort extraction lane
            manifest.append(
                {
                    "path": str(path.relative_to(REPO)).replace("\\", "/"),
                    "kind": suffix.lstrip("."),
                    "error": repr(exc),
                }
            )

    manifest_path = OUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps({"items": manifest}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Extracted {len(manifest)} official text entries -> {manifest_path}")


if __name__ == "__main__":
    main()
