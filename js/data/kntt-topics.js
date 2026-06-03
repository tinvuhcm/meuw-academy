/**
 * KNTT Topics Bridge
 *
 * Converts KNTT_LESSON_POOL entries into catalog-compatible topic objects
 * that fresh-curriculum.js can merge via mergeSupplemental().
 *
 * Key principles baked in:
 *  1. Source citations — every question explanation appended with KNTT ref
 *  2. Math routing — KNTT lesson titles mapped to generator ops
 *  3. Engagement — displayTitle is the child-facing label; not dry SGK prose
 *  4. Empty pools are fine — they'll grow when Direction 2 adds parsed questions
 */

import { KNTT_LESSON_POOL, formatSourceCitation } from './kntt-lesson-pool.js';
import { getBookPageUrl, getBookPageUrls } from './hts-book-pages.js';
import { getOfficialMathTheory, getOfficialVietnameseTheory } from './official-theory-snippets.js';
import { generateVietnameseQuestions } from './vie-question-generator.js';

const SUBJECT_LABELS = {
  math: 'Toán',
  vie: 'Tiếng Việt',
  sci: 'Khoa học',
  it: 'Tin học',
  histgeo: 'Lịch sử và Địa lí',
  music: 'Âm nhạc',
  art: 'Mĩ thuật',
  ethics: 'Đạo đức',
  tech: 'Công nghệ',
  life: 'Hoạt động trải nghiệm',
  pe: 'Giáo dục thể chất',
};

function stableHash(input) {
  let hash = 2166136261;
  const text = String(input || '');
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createRng(seedInput) {
  let seed = stableHash(seedInput) || 123456789;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function seededShuffle(list, seedInput) {
  const arr = [...list];
  const rand = createRng(seedInput);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Math lesson → generator op mapping ──────────────────────────────────────
// Match KNTT Toán 4 lesson titles to existing math generator ops
const MATH_OP_RULES = [
  { pattern: /phân số|phần bằng nhau/i,           op: 'frac' },
  { pattern: /chu vi|diện tích|hình học|hình vuông|hình chữ nhật/i, op: 'geo' },
  { pattern: /trung bình cộng|trung bình/i,        op: 'average' },
  { pattern: /biểu thức|thứ tự phép tính/i,        op: 'expression' },
  { pattern: /đo|đơn vị|km|dm|kg|lít|ml|cm|m²|ha/i, op: 'measurement' },
  { pattern: /bảng số liệu|biểu đồ|thống kê/i,    op: 'data-chart' },
  { pattern: /bài toán có lời văn|lời văn/i,       op: 'word-problem' },
  { pattern: /tính nhẩm|nhẩm nhanh/i,             op: 'quick' },
  { pattern: /làm tròn/i,                          op: 'rounding' },
  { pattern: /giá trị chữ số|hàng|lớp|số tự nhiên|so sánh số|số lớn|100 000|1 000 000/i, op: 'place-value' },
  { pattern: /số chẵn|số lẻ/i,                    op: 'parity' },
  { pattern: /tìm x|tìm thành phần|số còn thiếu|ẩn số/i, op: 'missing' },
  { pattern: /gấp|giảm đi|nhiều hơn|ít hơn/i,    op: 'double-half' },
  { pattern: /tiền|đồng/i,                         op: 'money' },
  { pattern: /đồng hồ|giờ phút|xem giờ/i,         op: 'clock' },
  { pattern: /nhân|chia|bảng nhân|bảng chia/i,    op: '*' },
  { pattern: /cộng|trừ/i,                          op: '+' },
];

function mathOpForLesson(title) {
  const t = title || '';
  for (const rule of MATH_OP_RULES) {
    if (rule.pattern.test(t)) return rule.op;
  }
  return '+'; // fallback: arithmetic
}

// ─── Engagement transforms ────────────────────────────────────────────────────
// Make non-math subject titles feel less like "school labels"
// Rules: short, specific, use the actual story/topic name

const SUBJECT_TITLE_TRANSFORMS = {
  vie: (entry) => {
    const { skillType, displayTitle } = entry;
    if (skillType === 'Đọc') return displayTitle; // "Đọc: Điều kì diệu" — already good
    if (skillType === 'Viết') return `Viết: ${entry.source.skill?.replace('Viết: ','') || displayTitle}`;
    if (skillType === 'Luyện từ và câu') return `Từ & câu: ${entry.source.skill?.replace('Luyện từ và câu: ','') || displayTitle}`;
    return displayTitle;
  },
  sci: (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  it:  (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  histgeo: (entry) => entry.ssgkTitle?.replace(/^Bài \d+[:.]\s*/, '') || entry.displayTitle,
  music: (entry) => entry.displayTitle,
  art:   (entry) => entry.displayTitle,
  ethics: (entry) => entry.ssgkTitle?.replace(/^(Bài|Chủ đề) \d+[:.]\s*/, '') || entry.displayTitle,
  tech:  (entry) => entry.displayTitle,
  life:  (entry) => entry.displayTitle,
  pe:    (entry) => entry.displayTitle,
};

function engagingTitle(subject, entry) {
  const fn = SUBJECT_TITLE_TRANSFORMS[subject];
  if (fn) {
    return fn(entry)
      .replace(/^Kể chuyện:\s*Kể chuyện:\s*/i, 'Kể chuyện: ')
      .replace(/^Đọc:\s*Đọc:\s*/i, 'Đọc: ')
      .replace(/^Viết:\s*Viết:\s*/i, 'Viết: ')
      .trim();
  }
  return entry.displayTitle;
}

// ─── Source citation suffix ───────────────────────────────────────────────────
// Appended to question explanations as a small traceable note

function citationNote(source) {
  if (!source) return '';
  const parts = [source.book];
  if (source.page) parts.push(`tr.${source.page}`);
  if (source.lesson) parts.push(source.lesson);
  return `(Nguồn: ${parts.join(', ')})`;
}

function withCitation(explanation, source) {
  if (!explanation || !source) return explanation || '';
  const note = citationNote(source);
  if (!note) return explanation;
  return `${explanation} ${note}`;
}

// ─── Math topic builder ───────────────────────────────────────────────────────

function buildKnttMathTopics(lessons) {
  return lessons.map((entry, index) => {
    const op = mathOpForLesson(entry.ssgkTitle);
    const title = `Toán: ${entry.displayTitle}`;
    const sourcePages = buildSourcePageRefs(lessons, index, entry);
    return {
      topicKey: entry.topicKey,
      subject: 'math',
      title,
      knttSource: entry.source,
      sequenceIndex: entry.sequenceIndex,
      // math generator will be attached by buildCatalog (it checks for 'math' + op)
      op,
      lessonBlocks: [buildSourceTheoryBlock(entry, sourcePages)],
      questionPool: [],
    };
  });
}

// ─── Non-math topic builder ───────────────────────────────────────────────────
// Empty question pools are OK — they'll be filled by Direction 2 (PPTX parsing)
// and immediately usable as session titles even without questions.

// Reading skill types that should show the actual SGK page before questions
const READING_SKILL_TYPES = new Set(['Đọc', 'Nói và nghe']);

/**
 * Build a reading-page lesson block for skills that have actual reading text.
 * Shows the CDN image of the SGK page so the child reads before answering.
 */
function buildReadingPageBlock(entry) {
  if (!READING_SKILL_TYPES.has(entry.skillType)) return null;
  const { bookId, page } = entry.source || {};
  if (!bookId || !page) return null;

  const page1 = getBookPageUrl(bookId, page);
  if (!page1) return null;

  // Reading lessons may span 2 pages — include the next page too
  const page2 = getBookPageUrl(bookId, page + 1);

  return {
    type: 'reading-page',
    title: cleanLessonTitle(entry),
    sourceLabel: `${entry.source.book || ''}, tr.${page}`,
    pages: [page1, page2].filter(Boolean),
  };
}

function inferLessonEndPage(lessons, index, entry) {
  const currentPage = Number(entry?.source?.page || 0);
  if (!currentPage) return currentPage;

  const nextEntry = lessons[index + 1];
  const nextPage = Number(nextEntry?.source?.page || 0);
  if (!nextPage || nextPage <= currentPage) {
    return currentPage + 1;
  }

  // Reading lessons often span multiple pages until just before the next skill.
  // Keep the window bounded so a single lesson does not dump a huge chapter.
  const inferredEnd = Math.max(currentPage, nextPage - 1);
  return Math.min(inferredEnd, currentPage + 3);
}

function buildSourcePageRefs(lessons, index, entry) {
  const { bookId, page } = entry.source || {};
  if (!bookId || !page) return null;
  const endPage = inferLessonEndPage(lessons, index, entry);
  const pages = getBookPageUrls(bookId, page, endPage);
  if (!pages.length) return null;
  return {
    startPage: page,
    endPage,
    pages,
  };
}

function buildFullReadingPageBlock(lessons, index, entry) {
  if (!READING_SKILL_TYPES.has(entry.skillType)) return null;
  const { bookId, page } = entry.source || {};
  if (!bookId || !page) return null;

  const endPage = inferLessonEndPage(lessons, index, entry);
  const pages = getBookPageUrls(bookId, page, endPage);
  if (!pages.length) {
    return buildReadingPageBlock(entry);
  }

  const sourceSuffix = endPage > page ? `, tr.${page}-${endPage}` : `, tr.${page}`;
  return {
    type: 'reading-page',
    title: cleanLessonTitle(entry),
    sourceLabel: `${entry.source.book || ''}${sourceSuffix}`,
    pages,
    startPage: page,
    endPage,
  };
}

function cleanLessonTitle(entry) {
  const raw = (entry.ssgkTitle || entry.displayTitle || '')
    .replace(/^Bài\s+\d+[:.]?\s*/i, '')
    .replace(/\s+—\s+/g, ' - ')
    .replace(/\s+-\s+:\s+/g, ': ')
    .trim();
  const collapsed = raw
    .replace(/^(.+?)\s+-\s+Đọc:\s+\1$/i, 'Đọc: $1')
    .replace(/^(.+?)\s+-\s+Nói và nghe:\s+\1$/i, 'Nói và nghe: $1')
    .replace(/^(.+?)\s+-\s+Viết:\s+\1$/i, 'Viết: $1')
    .replace(/^(.+?)\s+-\s+Luyện từ và câu:\s+(.+)$/i, 'Luyện từ và câu: $2')
    .replace(/^(.+?)\s+-\s+(Khám phá)$/i, '$1')
    .trim();
  return collapsed;
}

function buildTheoryPoints(entry) {
  const skill = entry.skillType || '';
  const title = cleanLessonTitle(entry);
  const officialMath = entry.subject === 'math' ? getOfficialMathTheory({ title, op: entry.op || mathOpForLesson(entry.ssgkTitle) }) : null;
  if (officialMath) return officialMath.points;
  const officialVie = entry.subject === 'vie' ? getOfficialVietnameseTheory({ skillType: skill, title }) : null;
  if (officialVie) return officialVie.points;

  if (entry.subject === 'math') {
    if (/chu vi/i.test(title)) {
      return [
        'Chu vi là độ dài đường bao quanh một hình.',
        'Muốn tính chu vi, con cộng độ dài các cạnh hoặc dùng công thức phù hợp.',
        'Trước khi bấm đáp án, nhớ kiểm tra đơn vị đo có giữ nguyên không.',
      ];
    }
    if (/diện tích/i.test(title)) {
      return [
        'Diện tích cho biết phần mặt phẳng bên trong hình rộng bao nhiêu.',
        'Mỗi hình có cách tính diện tích riêng, con cần nhớ đúng công thức.',
        'Đơn vị diện tích thường là cm², m² hoặc đơn vị vuông tương tự.',
      ];
    }
    if (/phân số/i.test(title)) {
      return [
        'Phân số gồm tử số và mẫu số, dùng để chỉ một hay nhiều phần bằng nhau.',
        'Nhìn mẫu số để biết vật được chia thành mấy phần bằng nhau.',
        'Nhìn tử số để biết có mấy phần được lấy ra.',
      ];
    }
    return [
      `Hôm nay mình học theo SGK: ${title}.`,
      'Con cần hiểu ý nghĩa của dạng toán trước khi tính đáp án.',
      'Làm chậm từng bước, giữ đúng hàng số và tự kiểm tra lại kết quả.',
    ];
  }

  if (entry.subject === 'vie') {
    if (/danh từ/i.test(title)) {
      return [
        'Danh từ là từ dùng để gọi tên sự vật.',
        'Sự vật ở đây có thể là người, con vật, đồ vật, hiện tượng hoặc khái niệm.',
        'Con hãy đặt từ vào câu để xem nó có đang làm nhiệm vụ gọi tên hay không.',
      ];
    }
    if (/dấu gạch ngang/i.test(title)) {
      return [
        'Dấu gạch ngang có thể dùng để đánh dấu lời nói của nhân vật.',
        'Dấu gạch ngang cũng dùng để đánh dấu các ý trong một đoạn liệt kê.',
        'Khi làm bài, con cần nhìn xem dấu gạch ngang đang đứng ở đâu và phục vụ việc gì.',
      ];
    }
    if (/đoạn văn và câu chủ đề/i.test(title)) {
      return [
        'Câu chủ đề là câu nêu ý chính của đoạn văn.',
        'Các câu còn lại thường làm rõ cho ý chính đó bằng chi tiết hoặc ví dụ.',
        'Muốn tìm câu chủ đề, con hãy xem câu nào bao quát nội dung nhất.',
      ];
    }
    if (/đoạn văn nêu ý kiến/i.test(title)) {
      return [
        'Đoạn văn nêu ý kiến cần có ý kiến rõ ràng và lí do để thuyết phục người đọc.',
        'Con hãy nói rõ mình đồng ý hay không đồng ý điều gì.',
        'Sau đó thêm một vài lí do ngắn gọn, dễ hiểu để làm sáng tỏ ý kiến của mình.',
      ];
    }
    if (skill === 'Luyện từ và câu') {
      return [
        `Bài SGK hôm nay là: ${title}.`,
        'Hãy hiểu chức năng của từ hoặc kiểu câu rồi mới chọn đáp án.',
        'Nếu phân vân, đặt đáp án vào câu để xem có tự nhiên và đúng nghĩa không.',
      ];
    }

    if (skill === 'Viết') {
      return [
        `Bài SGK hôm nay là: ${title}.`,
        'Viết tốt bắt đầu từ việc hiểu yêu cầu, tìm ý chính và sắp xếp ý rõ ràng.',
        'Con nên nghĩ ý trước rồi mới viết thành câu hoàn chỉnh.',
      ];
    }

    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Đọc chậm và chú ý các chi tiết quan trọng, từ khóa và ý chính.',
      'Nếu có câu hỏi về nhân vật hay sự việc, hãy quay lại đúng đoạn để tìm bằng chứng.',
    ];
  }

  if (entry.subject === 'it') {
    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Tin học cần làm đúng thao tác và hiểu vì sao thao tác đó được dùng.',
      'Con hãy nhớ tên lệnh, vị trí nút bấm và tác dụng của từng bước.',
    ];
  }

  if (entry.subject === 'histgeo') {
    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Lịch sử và Địa lí cần nhớ đúng tên, vị trí, nhân vật hoặc đặc điểm nổi bật.',
      'Khi làm bài, hãy gắn kiến thức với bản đồ, địa danh hoặc sự kiện cụ thể.',
    ];
  }

  if (entry.subject === 'tech') {
    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Công nghệ chú trọng quy trình, dụng cụ và thao tác an toàn.',
      'Con hãy nhớ làm theo thứ tự từng bước và quan sát vật liệu thật.',
    ];
  }

  if (entry.subject === 'ethics') {
    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Đạo đức không chỉ chọn đáp án đúng mà còn hiểu cách ứng xử đúng trong đời sống.',
      'Con hãy nghĩ xem trong tình huống thật, mình nên làm gì và vì sao.',
    ];
  }

  return [
    `Bài SGK hôm nay là: ${title}.`,
    'Con hãy nắm ý chính của bài trước khi làm câu hỏi.',
    'Nếu quên, có thể mở lại bài học để xem nhanh nội dung cốt lõi.',
  ];
}

function buildTheoryExample(entry) {
  const lessonName = cleanLessonTitle(entry);
  const officialMath = entry.subject === 'math' ? getOfficialMathTheory({ title: lessonName, op: entry.op || mathOpForLesson(entry.ssgkTitle) }) : null;
  if (officialMath?.example) return officialMath.example;
  const officialVie = entry.subject === 'vie' ? getOfficialVietnameseTheory({ skillType: entry.skillType || '', title: lessonName }) : null;
  if (officialVie?.example) return officialVie.example;
  if (entry.subject === 'math') {
    return `Ví dụ: trước khi tính, hãy tự hỏi bài ${lessonName} đang yêu cầu cộng, trừ, nhân, chia hay tìm quy luật.`;
  }
  if (entry.subject === 'vie') {
    return `Ví dụ: với bài ${lessonName}, con hãy gạch nhẹ từ khóa rồi mới chọn đáp án.`;
  }
  if (entry.subject === 'it') {
    return `Ví dụ: với bài ${lessonName}, con nên nhớ thao tác nào làm trước và thao tác nào làm sau.`;
  }
  return `Ví dụ: với bài ${lessonName}, con hãy tìm đúng ý chính rồi mới trả lời câu hỏi.`;
}

function buildSourceTheoryBlock(entry, sourcePages = null) {
  const officialMath = entry.subject === 'math' ? getOfficialMathTheory({ title: cleanLessonTitle(entry), op: entry.op || mathOpForLesson(entry.ssgkTitle) }) : null;
  const officialVie = entry.subject === 'vie' ? getOfficialVietnameseTheory({ skillType: entry.skillType || '', title: cleanLessonTitle(entry) }) : null;
  const official = officialMath || officialVie;
  const pageSuffix = sourcePages && sourcePages.endPage > sourcePages.startPage
    ? `, tr.${sourcePages.startPage}-${sourcePages.endPage}`
    : (entry.source?.page ? `, tr.${entry.source.page}` : '');
  return {
    type: 'mini',
    teacherName: 'Gâu tiên sinh',
    title: cleanLessonTitle(entry),
    sourceLabel: official?.sourceLabel
      ? `${entry.source?.book || ''}${pageSuffix} • ${official.sourceLabel}`
      : `${entry.source?.book || ''}${pageSuffix}`,
    sourcePages: sourcePages?.pages || [],
    sourceStartPage: sourcePages?.startPage || null,
    sourceEndPage: sourcePages?.endPage || null,
    points: buildTheoryPoints(entry),
    example: buildTheoryExample(entry),
    cta: entry.skillType === 'Đọc' ? 'Đọc bài rồi làm tiếp' : 'Hiểu rồi — Làm bài!',
  };
}

function subjectLabel(subject) {
  return SUBJECT_LABELS[subject] || 'Bài học';
}

function buildSkillFocus(entry) {
  if (entry.subject === 'vie') {
    if (entry.skillType === 'Đọc') return 'đọc hiểu và tìm ý chính';
    if (entry.skillType === 'Luyện từ và câu') return 'nhận biết từ ngữ và kiểu câu';
    if (entry.skillType === 'Viết') return 'sắp xếp ý và viết câu rõ ràng';
    if (entry.skillType === 'Nói và nghe') return 'nghe kĩ và nói mạch lạc';
  }
  if (entry.subject === 'it') return 'thao tác đúng và hiểu công dụng của từng lệnh';
  if (entry.subject === 'histgeo') return 'nhớ đúng sự kiện, địa danh hoặc đặc điểm nổi bật';
  if (entry.subject === 'sci') return 'quan sát hiện tượng rồi giải thích bằng kiến thức khoa học';
  if (entry.subject === 'tech') return 'làm đúng quy trình và dùng vật liệu an toàn';
  if (entry.subject === 'ethics') return 'chọn cách ứng xử đúng trong đời sống';
  if (entry.subject === 'music') return 'nghe, cảm nhịp và nhận ra kí hiệu âm nhạc';
  if (entry.subject === 'art') return 'quan sát vẻ đẹp rồi thể hiện ý tưởng bằng hình và màu';
  if (entry.subject === 'life') return 'rèn thói quen tốt và hợp tác với mọi người';
  if (entry.subject === 'pe') return 'vận động đúng động tác và an toàn';
  return 'nắm ý chính của bài rồi thực hành đúng';
}

function buildBestAction(entry) {
  if (entry.skillType === 'Đọc') return 'đọc chậm, gạch nhẹ từ khóa rồi tìm ý chính';
  if (entry.skillType === 'Luyện từ và câu') return 'đặt từ vào câu để kiểm tra nghĩa và cách dùng';
  if (entry.skillType === 'Viết') return 'nghĩ ý trước rồi viết thành câu rõ ràng';
  if (entry.skillType === 'Nói và nghe') return 'nghe hết ý bạn nói rồi mới trả lời';
  if (entry.subject === 'it') return 'nhớ đúng thứ tự thao tác trước khi bấm';
  if (entry.subject === 'histgeo') return 'gắn kiến thức với tên nơi chốn hay sự kiện cụ thể';
  if (entry.subject === 'sci') return 'quan sát hiện tượng rồi nêu nguyên nhân hoặc công dụng';
  if (entry.subject === 'tech') return 'làm theo từng bước và kiểm tra an toàn';
  if (entry.subject === 'ethics') return 'đặt mình vào tình huống thật để chọn cách cư xử';
  if (entry.subject === 'music') return 'nghe mẫu, đếm nhịp hoặc nhìn kĩ kí hiệu';
  if (entry.subject === 'art') return 'quan sát mẫu rồi mới chọn màu, nét hay bố cục';
  if (entry.subject === 'life') return 'liên hệ việc này với thói quen hằng ngày';
  if (entry.subject === 'pe') return 'khởi động và làm đúng động tác mẫu';
  return 'hiểu yêu cầu rồi mới chọn đáp án';
}

function buildWrongActions(entry) {
  const generic = [
    'đoán nhanh mà không nhìn lại bài học',
    'chọn đáp án vì thấy quen mắt',
    'làm thật vội để xong trước',
  ];
  if (entry.subject === 'it') {
    return ['bấm thử liên tục mà không biết nút nào dùng để làm gì', ...generic.slice(0, 2)];
  }
  if (entry.subject === 'vie' && entry.skillType === 'Viết') {
    return ['viết ngay khi chưa nghĩ ý chính', ...generic.slice(0, 2)];
  }
  if (entry.subject === 'sci') {
    return ['trả lời theo phỏng đoán mà không dựa vào hiện tượng', ...generic.slice(0, 2)];
  }
  return generic;
}

function buildReviewObject(entry) {
  return entry.skillType === 'Đọc'
    ? 'đoạn bài đọc và các chi tiết quan trọng'
    : 'ý chính của bài học và ví dụ Gâu tiên sinh đã nhắc';
}

export function generateKnttLessonQuestions(topic, count = 8, seedInput = '') {
  const source = topic.knttSource || {};
  const lessonName = cleanLessonTitle({
    ssgkTitle: source.lesson || topic.title,
    displayTitle: topic.title,
  }) || topic.title;
  const unitName = source.unit || lessonName;
  const bookName = source.book || subjectLabel(topic.subject);
  const pageNumber = source.page;
  const focus = buildSkillFocus({
    subject: topic.subject,
    skillType: source.skill?.split(':')[0] || null,
  });
  const bestAction = buildBestAction({
    subject: topic.subject,
    skillType: source.skill?.split(':')[0] || null,
  });
  const wrongActions = buildWrongActions({
    subject: topic.subject,
    skillType: source.skill?.split(':')[0] || null,
  });
  const reviewObject = buildReviewObject({
    subject: topic.subject,
    skillType: source.skill?.split(':')[0] || null,
  });
  const label = subjectLabel(topic.subject);
  const pageLabel = pageNumber ? `trang ${pageNumber}` : 'trang của bài học';
  const skillLabel = source.skill || source.lesson || lessonName;
  const citation = citationNote(source);

  const questions = [
    {
      type: 'multiple-choice',
      question: `Trong bài "${lessonName}", con đang học nội dung nào của môn ${label}?`,
      options: seededShuffle([
        focus,
        'làm bài thật nhanh để xong sớm',
        'ghi nhớ đáp án mà không cần hiểu',
        'đổi sang học một môn khác',
      ], `${seedInput}|${topic.topicKey}|focus`),
      answer: focus,
      explanation: `Bài này tập trung vào việc ${focus}. ${citation}`,
    },
    {
      type: 'multiple-choice',
      question: `Cách làm nào phù hợp nhất với bài "${lessonName}"?`,
      options: seededShuffle([bestAction, ...wrongActions], `${seedInput}|${topic.topicKey}|action`),
      answer: bestAction,
      explanation: `Với bài "${lessonName}", con nên ${bestAction}. ${citation}`,
    },
    {
      type: 'multiple-choice',
      question: `Nếu cần xem lại bài "${lessonName}", con nên mở lại phần nào?`,
      options: seededShuffle([
        reviewObject,
        'một đáp án con đã chọn đại',
        'một câu hỏi của môn khác',
        'chỉ nhìn nút nộp bài',
      ], `${seedInput}|${topic.topicKey}|review`),
      answer: reviewObject,
      explanation: `Khi quên, con nên xem lại ${reviewObject}. ${citation}`,
    },
    {
      type: 'multiple-choice',
      question: `Bài "${lessonName}" thuộc phần nào trong SGK?`,
      options: seededShuffle([
        unitName,
        'Ôn tập cuối năm',
        'Phần thưởng cuối bài',
        'Tên một môn học khác',
      ], `${seedInput}|${topic.topicKey}|unit`),
      answer: unitName,
      explanation: `Bài này nằm trong phần "${unitName}" của SGK. ${citation}`,
    },
    {
      type: 'multiple-choice',
      question: `Gâu tiên sinh nhắc con điều gì trước khi làm bài "${lessonName}"?`,
      options: seededShuffle([
        `Hiểu yêu cầu của ${skillLabel} rồi mới trả lời`,
        'Chọn ngay đáp án đầu tiên nhìn thấy',
        'Bỏ qua bài học và làm theo cảm tính',
        'Chỉ ghi nhớ số trang mà không học nội dung',
      ], `${seedInput}|${topic.topicKey}|teacher`),
      answer: `Hiểu yêu cầu của ${skillLabel} rồi mới trả lời`,
      explanation: `Phần bài học ngắn luôn nhắc con hiểu đúng yêu cầu trước khi làm. ${citation}`,
    },
    {
      type: 'multiple-choice',
      question: `Muốn tìm lại bài "${lessonName}" trong SGK, con nên xem ở đâu?`,
      options: seededShuffle([
        `${bookName}, ${pageLabel}`,
        `${label} 4, trang cuối sách`,
        'một quyển sách không liên quan',
        'không cần xem lại SGK',
      ], `${seedInput}|${topic.topicKey}|page`),
      answer: `${bookName}, ${pageLabel}`,
      explanation: `Bài này gắn với ${bookName}${pageNumber ? `, tr.${pageNumber}` : ''}. ${citation}`,
    },
  ];

  return questions.slice(0, Math.max(6, Math.min(count, questions.length)));
}

function buildKnttNonMathTopics(subject, lessons) {
  return lessons.map((entry, index) => {
    const readingBlock = buildFullReadingPageBlock(lessons, index, entry);
    const sourcePages = buildSourcePageRefs(lessons, index, entry);
    const theoryBlock = buildSourceTheoryBlock(entry, sourcePages);

    // Choose the best question generator for this subject/skill
    let generator = generateKnttLessonQuestions;
    if (subject === 'vie') {
      generator = generateVietnameseQuestions;
    }

    return {
      topicKey: entry.topicKey,
      subject,
      title: engagingTitle(subject, entry),
      knttSource: entry.source,
      sequenceIndex: entry.sequenceIndex,
      generator,
      lessonBlocks: readingBlock ? [theoryBlock, readingBlock] : [theoryBlock],
      questionPool: [],
      _citationNote: citationNote(entry.source),
    };
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

let _cached = null;

/**
 * Returns all KNTT catalog topics ready for mergeSupplemental().
 * Cached after first call.
 */
export function buildKnttCatalogTopics() {
  if (_cached) return _cached;

  const result = [];

  for (const [subject, lessons] of Object.entries(KNTT_LESSON_POOL)) {
    if (!lessons.length) continue;
    if (subject === 'math') {
      result.push(...buildKnttMathTopics(lessons));
    } else {
      result.push(...buildKnttNonMathTopics(subject, lessons));
    }
  }

  // Sort by sequenceIndex within each subject to get book order
  result.sort((a, b) => (a.sequenceIndex ?? 0) - (b.sequenceIndex ?? 0));

  _cached = result;
  return result;
}

/**
 * Enrich a question's explanation with KNTT source citation.
 * Call this when adding questions derived from KNTT content.
 */
export function enrichExplanationWithSource(question, source) {
  if (!question || !source) return question;
  return {
    ...question,
    explanation: withCitation(question.explanation, source),
  };
}

/**
 * Get the KNTT source citation for a specific topicKey.
 * Useful in lesson.js / session.js when displaying module info.
 */
export function getKnttSourceForTopic(topicKey) {
  for (const lessons of Object.values(KNTT_LESSON_POOL)) {
    const match = lessons.find(l => l.topicKey === topicKey);
    if (match) return match.source;
  }
  return null;
}

/**
 * Format a source for user-visible attribution (short form).
 * e.g. "Toán 4 T1 (KNTT), tr.6"
 */
export function shortCitation(source) {
  if (!source) return '';
  const bookShort = source.book
    ?.replace('Kết nối tri thức với cuộc sống', 'KNTT')
    ?.replace(' (KNTT)', ' KNTT')
    ?.replace('Tập một', 'T1')
    ?.replace('Tập hai', 'T2');
  return [bookShort, source.page ? `tr.${source.page}` : ''].filter(Boolean).join(', ');
}
