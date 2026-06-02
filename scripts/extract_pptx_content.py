#!/usr/bin/env python3
"""
Extract structured content from Hoc10 KNTT Grade 4 PPTX slides.

Reads:  docs/research/official-sources/downloads/hoc10/lop4/<subject>/slides/*.pptx
Writes: docs/research/official-sources/notes/pptx-content/<subject>/<slide_file>.json

Each output JSON contains:
  - meta: { file, subject, title (from filename), slideCount }
  - slides: [ { slideNo, type, paragraphs, questions, vocab, summary } ]
  - extracted: { title, lessonKey, questions[], vocab[], keyPoints[] }

Usage:
  python3 scripts/extract_pptx_content.py                  # all subjects
  python3 scripts/extract_pptx_content.py --subject toan   # one subject
  python3 scripts/extract_pptx_content.py --limit 5        # first 5 files per subject
"""

import sys, io, os, re, json, zipfile, argparse
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

REPO = Path(__file__).parent.parent
SLIDES_ROOT = REPO / 'docs/research/official-sources/downloads/hoc10/lop4'
OUT_ROOT    = REPO / 'docs/research/official-sources/notes/pptx-content'

SUBJECTS = [
    'toan', 'tieng-viet', 'tieng-anh', 'tin-hoc',
    'khoa-hoc', 'lich-su-va-dia-li', 'dao-duc',
    'am-nhac', 'mi-thuat', 'cong-nghe', 'hoat-dong-trai-nghiem',
    'giao-duc-the-chat',
]

# ─── XML helpers ──────────────────────────────────────────────────────────────

def extract_paragraphs(xml_text):
    """
    Parse PPTX slide XML and return list of paragraph strings.
    Joins all <a:t> runs within each <a:p> paragraph.
    """
    paragraphs = []
    # Find all paragraphs
    for para_xml in re.findall(r'<a:p\b[^>]*>(.*?)</a:p>', xml_text, re.DOTALL):
        # Join all text runs within this paragraph
        runs = re.findall(r'<a:t[^>]*>([^<]*)</a:t>', para_xml)
        text = ''.join(runs).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def extract_notes(xml_text):
    """Extract speaker notes from slide."""
    notes = []
    for note_xml in re.findall(r'<a:p\b[^>]*>(.*?)</a:p>', xml_text, re.DOTALL):
        runs = re.findall(r'<a:t[^>]*>([^<]*)</a:t>', note_xml)
        text = ''.join(runs).strip()
        if text and len(text) > 5:
            notes.append(text)
    return notes


# ─── Slide classifier ────────────────────────────────────────────────────────

COVER_PATTERNS = [
    r'^(TOÁN|TIẾNG VIỆT|TIẾNG ANH|TIN HỌC|KHOA HỌC|ĐẠO ĐỨC|ÂM NHẠC|MĨ THUẬT|CÔNG NGHỆ|LỊCH SỬ)',
    r'^Tuần \d+',
    r'^Bài (đọc|viết|học|số) \d+',
]
QUESTION_PATTERNS  = [r'\?$', r'^[A-ZĐÂ].*\?', r'^Câu \d', r'^Hỏi:', r'^Em hãy']
VOCAB_PATTERNS     = [r'GIẢI NGHĨA', r'Từ ngữ', r'Nghĩa của từ']
ACTIVITY_PATTERNS  = [r'^(Hoạt động|Luyện tập|Thực hành|Khám phá|Vận dụng)', r'^(BÀI TẬP|ÔN TẬP)']
THEORY_PATTERNS    = [r'^(Ghi nhớ|Kết luận|Nhận xét|Chú ý)', r'GHI NHỚ', r'KẾT LUẬN']
REFLECTION_PATTERNS = [r'em biết được điều gì', r'em học được gì', r'em rút ra']

def classify_slide(paragraphs):
    if not paragraphs:
        return 'empty'
    full = ' '.join(paragraphs)
    if any(re.search(p, full, re.IGNORECASE) for p in VOCAB_PATTERNS):
        return 'vocab'
    if any(re.search(p, full, re.IGNORECASE) for p in THEORY_PATTERNS):
        return 'theory'
    if any(re.search(p, full, re.IGNORECASE) for p in REFLECTION_PATTERNS):
        return 'reflection'
    if any(re.search(p, paragraphs[0], re.IGNORECASE) for p in COVER_PATTERNS):
        return 'cover'
    if any(re.search(p, full, re.IGNORECASE) for p in ACTIVITY_PATTERNS):
        return 'activity'
    q_count = sum(1 for line in paragraphs if any(re.search(p, line) for p in QUESTION_PATTERNS))
    if q_count >= 1:
        return 'questions'
    return 'content'


# ─── Content extractors ───────────────────────────────────────────────────────

def extract_vocab(paragraphs):
    """Extract vocabulary: term = definition pairs."""
    vocab = []
    heading = None
    i = 0
    while i < len(paragraphs):
        p = paragraphs[i]
        # Skip section headers
        if any(re.search(pat, p, re.IGNORECASE) for pat in VOCAB_PATTERNS):
            i += 1
            continue
        # Look for "Term = Definition" or "Term: Definition" patterns
        m = re.match(r'^(.+?)\s*[=:]\s*(.+)$', p)
        if m:
            vocab.append({'term': m.group(1).strip(), 'definition': m.group(2).strip()})
            i += 1
            continue
        # Two consecutive lines: term + definition (if term is short)
        if len(p) < 40 and i + 1 < len(paragraphs) and not p.endswith('?'):
            next_p = paragraphs[i+1]
            if len(next_p) > len(p) and not next_p.endswith('?'):
                vocab.append({'term': p, 'definition': next_p})
                i += 2
                continue
        i += 1
    return vocab


def extract_questions_from_slides(slides):
    """Extract question-like content from activity/question slides."""
    questions = []
    for slide in slides:
        if slide['type'] not in ('questions', 'activity', 'content', 'reflection'):
            continue
        paras = slide['paragraphs']
        for p in paras:
            p = p.strip()
            if not p or len(p) < 10:
                continue
            # Direct questions
            if p.endswith('?') and len(p) > 15:
                questions.append({'type': 'question', 'text': p, 'slide': slide['slideNo']})
            # Instruction-style tasks
            elif re.match(r'^(Em hãy|Hãy|Tìm|Chọn|Điền|Tính|So sánh|Đọc|Viết|Vẽ|Kể)', p):
                questions.append({'type': 'task', 'text': p, 'slide': slide['slideNo']})
    return questions


def extract_key_points(slides):
    """Extract key points from theory/ghi nhớ/kết luận slides."""
    points = []
    for slide in slides:
        if slide['type'] not in ('theory', 'reflection'):
            continue
        for p in slide['paragraphs']:
            if len(p) > 20:
                points.append(p)
    return points


# ─── Per-file processor ───────────────────────────────────────────────────────

def process_pptx(pptx_path, subject):
    fname = pptx_path.name
    result = {
        'meta': {
            'file': fname,
            'subject': subject,
            'path': str(pptx_path.relative_to(REPO)),
        },
        'slides': [],
        'extracted': {
            'title': '',
            'questions': [],
            'vocab': [],
            'keyPoints': [],
        }
    }

    try:
        with zipfile.ZipFile(pptx_path) as z:
            slide_files = sorted(
                [n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml', n)],
                key=lambda x: int(re.search(r'slide(\d+)', x).group(1))
            )
            result['meta']['slideCount'] = len(slide_files)

            for sname in slide_files:
                slide_no = int(re.search(r'slide(\d+)', sname).group(1))
                xml = z.read(sname).decode('utf-8', errors='replace')
                paras = extract_paragraphs(xml)
                # Filter out noise: very short paragraphs (single chars)
                paras = [p for p in paras if len(p) >= 2]
                stype = classify_slide(paras)

                slide_data = {
                    'slideNo': slide_no,
                    'type': stype,
                    'paragraphs': paras,
                }

                if stype == 'vocab':
                    slide_data['vocab'] = extract_vocab(paras)
                    result['extracted']['vocab'].extend(slide_data['vocab'])

                result['slides'].append(slide_data)

            # Title from cover slide (first non-empty)
            for slide in result['slides']:
                if slide['type'] == 'cover' and slide['paragraphs']:
                    result['extracted']['title'] = ' '.join(slide['paragraphs'][:3])
                    break
            if not result['extracted']['title']:
                # Derive from filename
                result['extracted']['title'] = fname.replace('_', ' ').replace('.pptx', '')

            # Extract questions and key points from all slides
            result['extracted']['questions'] = extract_questions_from_slides(result['slides'])
            result['extracted']['keyPoints'] = extract_key_points(result['slides'])

    except Exception as e:
        result['error'] = str(e)

    return result


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--subject', help='Process one subject only (e.g. toan)')
    parser.add_argument('--limit', type=int, default=0, help='Max files per subject (0=all)')
    args = parser.parse_args()

    subjects = [args.subject] if args.subject else SUBJECTS

    total_files = 0
    total_questions = 0
    total_vocab = 0

    for subject in subjects:
        slides_dir = SLIDES_ROOT / subject / 'slides'
        if not slides_dir.exists():
            print(f'  skip {subject}: no slides dir')
            continue

        out_dir = OUT_ROOT / subject
        out_dir.mkdir(parents=True, exist_ok=True)

        pptx_files = sorted(slides_dir.glob('*.pptx'))
        if args.limit:
            pptx_files = pptx_files[:args.limit]

        print(f'\n── {subject} ({len(pptx_files)} files) ──')
        subj_q = 0
        subj_v = 0

        for pptx_path in pptx_files:
            data = process_pptx(pptx_path, subject)
            out_path = out_dir / (pptx_path.stem + '.json')
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            q = len(data['extracted']['questions'])
            v = len(data['extracted']['vocab'])
            subj_q += q
            subj_v += v
            total_files += 1
            if q > 0 or v > 0:
                print(f'  ✓ {pptx_path.name[:55]:55s} {data["meta"]["slideCount"]:3d} slides | {q:3d} Q | {v:2d} vocab')

        total_questions += subj_q
        total_vocab += subj_v
        print(f'  → {subject}: {subj_q} questions, {subj_v} vocab terms extracted')

    print(f'\n── Summary ──────────────────────────────────────────────')
    print(f'  Files processed : {total_files}')
    print(f'  Questions found : {total_questions}')
    print(f'  Vocab terms     : {total_vocab}')
    print(f'  Output          : {OUT_ROOT}')
    print(f'─────────────────────────────────────────────────────────')


if __name__ == '__main__':
    main()
