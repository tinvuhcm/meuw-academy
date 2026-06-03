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
import { getOfficialMathTheory, getOfficialVietnameseTheory, getOfficialItTheory, getOfficialHistgeoTheory } from './official-theory-snippets.js';
import { generateVietnameseQuestions } from './vie-question-generator.js';
import { generateItQuestions } from './it-question-generator.js';
import { generateHistgeoQuestions } from './histgeo-question-generator.js';
import { generateTechQuestions } from './tech-question-generator.js';
import { generateMusicQuestions, generateEthicsQuestions, generateLifeQuestions, generatePeQuestions, generateArtQuestions } from './remaining-subjects-generator.js';
import { generateSciKnttQuestions } from './sci-question-generator.js';
import { normalizeText } from '../utils.js';

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

function isSupplementaryBackmatter(entry) {
  const raw = normalizeText([
    entry.topicKey || '',
    entry.displayTitle || '',
    entry.ssgkTitle || '',
    entry.unit || '',
    entry.source?.unit || '',
  ].join(' '));

  return /thuat ngu|nguon anh|bang giai thich|mot so thuat ngu dung trong sach|giai thich khai niem/.test(raw);
}

function buildTheoryPoints(entry) {
  const skill = entry.skillType || '';
  const title = cleanLessonTitle(entry);
  const officialMath = entry.subject === 'math' ? getOfficialMathTheory({ title, op: entry.op || mathOpForLesson(entry.ssgkTitle) }) : null;
  if (officialMath) return officialMath.points;
  const officialVie = entry.subject === 'vie' ? getOfficialVietnameseTheory({ skillType: skill, title }) : null;
  if (officialVie) return officialVie.points;
  const officialIt = entry.subject === 'it' ? getOfficialItTheory({ title }) : null;
  if (officialIt) return officialIt.points;
  const officialHistgeo = entry.subject === 'histgeo' ? getOfficialHistgeoTheory({ title, unit: entry.source?.unit || '' }) : null;
  if (officialHistgeo) return officialHistgeo.points;

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

  if (entry.subject === 'sci') {
    if (/tính chất của nước|vòng tuần hoàn|sự chuyển thể của nước/i.test(title)) {
      return [
        'Nước có thể tồn tại ở thể lỏng, thể rắn và thể khí.',
        'Nước có thể bay hơi, ngưng tụ hoặc đông đặc khi điều kiện thay đổi.',
        'Trong tự nhiên, nước luôn di chuyển qua vòng tuần hoàn giữa mặt đất và không khí.',
      ];
    }
    if (/ô nhiễm|nguồn nước/i.test(title)) {
      return [
        'Nguồn nước sạch rất cần cho sinh hoạt và sức khỏe của con người.',
        'Nước bị ô nhiễm thường có rác, mùi lạ, màu lạ hoặc chứa chất gây hại.',
        'Muốn bảo vệ nguồn nước, con không xả bừa bãi và biết tiết kiệm nước.',
      ];
    }
    if (/không khí|bão/i.test(title)) {
      return [
        'Không khí có ở xung quanh chúng ta dù mắt thường không nhìn thấy.',
        'Không khí cần cho sự sống và có thể chuyển động tạo thành gió.',
        'Khi có gió mạnh, mưa to hoặc bão, con cần ưu tiên an toàn và làm theo hướng dẫn.',
      ];
    }
    if (/ánh sáng/i.test(title)) {
      return [
        'Ánh sáng giúp chúng ta nhìn thấy đồ vật và nhận biết thế giới xung quanh.',
        'Nhiều loài cây cần ánh sáng để lớn lên và tạo chất dinh dưỡng.',
        'Khi học về ánh sáng, con nên quan sát hiện tượng rồi nêu tác dụng hoặc điều kiện xảy ra.',
      ];
    }
    if (/âm thanh/i.test(title)) {
      return [
        'Âm thanh phát ra khi vật rung động.',
        'Âm thanh truyền qua một số môi trường như không khí, nước và chất rắn.',
        'Âm thanh giúp ta giao tiếp, nhưng tiếng ồn quá lớn có thể gây hại.',
      ];
    }
    if (/nhiệt độ|truyền nhiệt|dẫn nhiệt/i.test(title)) {
      return [
        'Nhiệt độ cho biết vật nóng hay lạnh.',
        'Nhiệt có thể truyền từ vật nóng sang vật lạnh.',
        'Có vật dẫn nhiệt tốt và có vật dẫn nhiệt kém, nên cần chọn vật liệu phù hợp để an toàn.',
      ];
    }
    if (/thực vật cần gì để sống|động vật cần gì để sống|chăm sóc cây trồng vật nuôi/i.test(title)) {
      return [
        'Cây và con vật đều cần điều kiện sống phù hợp để phát triển.',
        'Muốn chăm sóc tốt, con cần hiểu chúng cần gì: nước, ánh sáng, thức ăn hoặc nơi sống phù hợp.',
        'Quan sát sự thay đổi của cây và vật nuôi giúp con biết cách chăm sóc đúng hơn.',
      ];
    }
    if (/đặc điểm chung của nấm|nấm ăn|nấm gây hỏng thực phẩm|nấm độc/i.test(title)) {
      return [
        'Có nấm có ích trong chế biến thực phẩm, nhưng cũng có nấm làm hỏng thức ăn hoặc gây ngộ độc.',
        'Thực phẩm bị nấm mốc thường đổi màu, có mùi lạ hoặc không còn an toàn để ăn.',
        'Không tự ý hái hay ăn nấm lạ vì có loại nấm rất giống nấm ăn nhưng lại là nấm độc.',
      ];
    }
    if (/dinh dưỡng|ăn uống|thực phẩm an toàn|đuối nước|sức khỏe/i.test(title)) {
      return [
        'Ăn uống hợp lí và an toàn giúp cơ thể khỏe mạnh và phát triển tốt.',
        'Thực phẩm an toàn cần sạch, còn hạn dùng và có nguồn gốc rõ ràng.',
        'Khi gặp tình huống nguy hiểm như đuối nước, con cần bình tĩnh và tìm cách gọi người lớn giúp ngay.',
      ];
    }
    if (/chuỗi thức ăn|môi trường/i.test(title)) {
      return [
        'Sinh vật trong tự nhiên có mối liên hệ với nhau qua thức ăn và nơi sống.',
        'Thực vật thường là mắt xích quan trọng vì có thể tự tạo thức ăn.',
        'Khi một mắt xích thay đổi, các sinh vật khác trong chuỗi thức ăn cũng bị ảnh hưởng.',
      ];
    }
    return [
      `Bài SGK hôm nay là: ${title}.`,
      'Khoa học không chỉ nhớ đáp án mà cần quan sát, so sánh và giải thích hiện tượng.',
      'Con hãy gắn kiến thức trong bài với ví dụ thật trong đời sống hằng ngày.',
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
  const officialIt = entry.subject === 'it' ? getOfficialItTheory({ title: lessonName }) : null;
  if (officialIt?.example) return officialIt.example;
  const officialHistgeo = entry.subject === 'histgeo' ? getOfficialHistgeoTheory({ title: lessonName, unit: entry.source?.unit || '' }) : null;
  if (officialHistgeo?.example) return officialHistgeo.example;
  if (entry.subject === 'math') {
    return `Ví dụ: trước khi tính, hãy tự hỏi bài ${lessonName} đang yêu cầu cộng, trừ, nhân, chia hay tìm quy luật.`;
  }
  if (entry.subject === 'vie') {
    return `Ví dụ: với bài ${lessonName}, con hãy gạch nhẹ từ khóa rồi mới chọn đáp án.`;
  }
  if (entry.subject === 'it') {
    return `Ví dụ: với bài ${lessonName}, con nên nhớ thao tác nào làm trước và thao tác nào làm sau.`;
  }
  if (entry.subject === 'sci') {
    if (/nấm/i.test(lessonName)) {
      return 'Ví dụ: bánh mì có mốc xanh, mùi lạ thì phải bỏ đi, không nên cắt phần mốc rồi ăn tiếp.';
    }
    if (/ánh sáng/i.test(lessonName)) {
      return 'Ví dụ: chậu cây đặt nơi đủ sáng thường xanh tốt hơn chậu cây bị để trong góc tối.';
    }
    if (/thực phẩm an toàn|ăn uống|dinh dưỡng/i.test(lessonName)) {
      return 'Ví dụ: trước khi uống sữa, con xem hạn dùng và bao bì có còn nguyên hay không.';
    }
    return `Ví dụ: với bài ${lessonName}, con hãy tìm một hiện tượng thật trong đời sống rồi giải thích bằng điều vừa học.`;
  }
  return `Ví dụ: với bài ${lessonName}, con hãy tìm đúng ý chính rồi mới trả lời câu hỏi.`;
}

function buildSourceTheoryBlock(entry, sourcePages = null) {
  const lessonTitle = cleanLessonTitle(entry);
  const officialMath = entry.subject === 'math' ? getOfficialMathTheory({ title: lessonTitle, op: entry.op || mathOpForLesson(entry.ssgkTitle) }) : null;
  const officialVie = entry.subject === 'vie' ? getOfficialVietnameseTheory({ skillType: entry.skillType || '', title: lessonTitle }) : null;
  const officialIt = entry.subject === 'it' ? getOfficialItTheory({ title: lessonTitle }) : null;
  const officialHistgeo = entry.subject === 'histgeo' ? getOfficialHistgeoTheory({ title: lessonTitle, unit: entry.source?.unit || '' }) : null;
  const official = officialMath || officialVie || officialIt || officialHistgeo;
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
    'đoán nhanh khi chưa xem lại chi tiết cần thiết',
    'chọn theo cảm giác mà không dựa vào bài học',
    'làm quá vội nên bỏ sót dữ kiện',
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

function makeQuestion(question, options, answer, explanation, seedKey) {
  return {
    type: 'multiple-choice',
    question,
    options: seededShuffle(options, seedKey),
    answer,
    explanation,
  };
}

function buildScienceQuestions(topic, lessonName, citation, seedInput = '') {
  const topicKey = topic.topicKey || lessonName;
  const seed = suffix => `${seedInput}|${topicKey}|${suffix}`;

  if (/tính chất của nước|sự chuyển thể của nước|vòng tuần hoàn của nước/i.test(lessonName)) {
    return [
      makeQuestion(
        'Khi nước đá để ngoài bàn một lúc, điều gì thường xảy ra?',
        ['Nước đá tan thành nước lỏng', 'Nước đá biến thành gỗ', 'Nước đá phát ra âm thanh rất to', 'Nước đá tự biến mất không để lại gì'],
        'Nước đá tan thành nước lỏng',
        `Đó là một ví dụ về sự chuyển thể của nước. ${citation}`,
        seed('water-melt'),
      ),
      makeQuestion(
        'Hiện tượng nào cho thấy nước bay hơi?',
        ['Quần áo ướt phơi nắng rồi khô dần', 'Viên đá chìm xuống chậu nước', 'Cốc nước đổi từ trong sang xanh', 'Thìa nhôm phát ra tiếng kêu'],
        'Quần áo ướt phơi nắng rồi khô dần',
        `Khi bay hơi, nước chuyển từ thể lỏng sang thể khí. ${citation}`,
        seed('water-evaporate'),
      ),
      makeQuestion(
        'Mưa trong tự nhiên liên quan đến quá trình nào?',
        ['Hơi nước gặp lạnh rồi ngưng tụ thành giọt nước', 'Mọi đám mây đều làm bằng đá', 'Nước dưới sông tự bay lên thành mưa ngay lập tức', 'Cây tự tạo ra mưa mà không cần nước'],
        'Hơi nước gặp lạnh rồi ngưng tụ thành giọt nước',
        `Đó là một bước của vòng tuần hoàn của nước trong tự nhiên. ${citation}`,
        seed('water-rain'),
      ),
      makeQuestion(
        'Điều nào nói đúng về nước trong tự nhiên?',
        ['Nước luôn di chuyển qua vòng tuần hoàn', 'Nước chỉ ở mãi dưới sông và ao', 'Nước không bao giờ đổi thể', 'Mưa không liên quan gì đến hơi nước'],
        'Nước luôn di chuyển qua vòng tuần hoàn',
        `Nước có thể bay hơi, ngưng tụ rồi rơi xuống, tạo thành vòng tuần hoàn. ${citation}`,
        seed('water-cycle'),
      ),
      makeQuestion(
        'Bạn nào đang nêu ví dụ đúng về sự chuyển thể của nước?',
        ['Bạn Mai nói: hơi nước gặp lạnh đọng lại trên nắp nồi', 'Bạn Nam nói: cục đá biến thành giấy', 'Bạn Lan nói: nước lỏng luôn cứng như đá', 'Bạn Bin nói: nước không thể biến đổi'],
        'Bạn Mai nói: hơi nước gặp lạnh đọng lại trên nắp nồi',
        `Hơi nước gặp lạnh ngưng tụ thành giọt nước là ví dụ quen thuộc. ${citation}`,
        seed('water-condense'),
      ),
      makeQuestion(
        'Bài này chủ yếu giúp con hiểu điều gì?',
        ['Nước có thể đổi thể và tham gia vòng tuần hoàn trong tự nhiên', 'Nước chỉ dùng để uống', 'Nước không liên quan đến thời tiết', 'Nước chỉ tồn tại ở thể lỏng'],
        'Nước có thể đổi thể và tham gia vòng tuần hoàn trong tự nhiên',
        `Đó là ý chính của bài về sự chuyển thể và vòng tuần hoàn của nước. ${citation}`,
        seed('water-main'),
      ),
    ];
  }

  if (/ô nhiễm|nguồn nước/i.test(lessonName)) {
    return [
      makeQuestion(
        'Việc nào giúp bảo vệ nguồn nước tốt hơn?',
        ['Bỏ rác đúng nơi quy định', 'Đổ dầu mỡ xuống cống', 'Vứt pin cũ xuống ao', 'Xả nước bẩn thẳng ra suối'],
        'Bỏ rác đúng nơi quy định',
        `Không xả chất bẩn bừa bãi là cách quan trọng để bảo vệ nguồn nước. ${citation}`,
        seed('water-protect'),
      ),
      makeQuestion(
        'Dấu hiệu nào có thể cho thấy nước bị ô nhiễm?',
        ['Có mùi lạ hoặc nhiều rác nổi', 'Trong và sạch như nước mới lọc', 'Đựng trong chai còn niêm phong', 'Được đun sôi đúng cách'],
        'Có mùi lạ hoặc nhiều rác nổi',
        `Nước ô nhiễm thường có dấu hiệu bất thường về màu, mùi hoặc rác bẩn. ${citation}`,
        seed('water-polluted'),
      ),
      makeQuestion(
        'Vì sao cần tiết kiệm nước sạch?',
        ['Vì nước sạch rất cần cho sinh hoạt và sức khỏe', 'Vì nước sạch không bao giờ hết', 'Vì càng dùng phí càng tốt', 'Vì nước sạch chỉ dành cho người lớn'],
        'Vì nước sạch rất cần cho sinh hoạt và sức khỏe',
        `Bảo vệ và tiết kiệm nước sạch giúp ích cho mọi người. ${citation}`,
        seed('water-save'),
      ),
      makeQuestion(
        'Bạn nào đang làm bẩn nguồn nước?',
        ['Bạn đổ túi ni-lông xuống kênh', 'Bạn khóa vòi nước khi không dùng', 'Bạn nhắc người lớn bỏ rác đúng nơi', 'Bạn dùng nước vừa đủ để rửa tay'],
        'Bạn đổ túi ni-lông xuống kênh',
        `Xả rác xuống kênh, rạch là hành động làm ô nhiễm nguồn nước. ${citation}`,
        seed('water-dirty'),
      ),
      makeQuestion(
        'Nếu thấy vòi nước chảy mãi mà không ai dùng, con nên làm gì?',
        ['Khóa vòi lại hoặc báo người lớn', 'Để chảy tiếp cho vui', 'Bỏ đi vì không liên quan', 'Lấy đồ chơi thả dưới nước'],
        'Khóa vòi lại hoặc báo người lớn',
        `Đó là cách tiết kiệm và bảo vệ nguồn nước sạch. ${citation}`,
        seed('water-faucet'),
      ),
      makeQuestion(
        'Ý chính của bài về nguồn nước là gì?',
        ['Nước sạch cần được bảo vệ và sử dụng hợp lí', 'Nước bẩn cũng an toàn như nước sạch', 'Cứ xả rác xuống nước cũng không sao', 'Chỉ cần nước trong là uống ngay được'],
        'Nước sạch cần được bảo vệ và sử dụng hợp lí',
        `Đó là điều cốt lõi con cần nhớ sau bài học này. ${citation}`,
        seed('water-source-main'),
      ),
    ];
  }

  if (/vai trò của không khí/i.test(lessonName)) {
    return [
      makeQuestion(
        'Không khí có vai trò gì với con người và động vật?',
        ['Cần cho hô hấp để duy trì sự sống', 'Chỉ để làm bóng bay đẹp hơn', 'Không liên quan gì đến cơ thể', 'Chỉ dùng khi trời mưa'],
        'Cần cho hô hấp để duy trì sự sống',
        `Không khí rất cần cho sự sống của người và nhiều sinh vật. ${citation}`,
        seed('air-role-life'),
      ),
      makeQuestion(
        'Việc nào giúp giữ bầu không khí trong lành hơn?',
        ['Không đốt rác bừa bãi', 'Xả khói vào phòng kín', 'Để xe nổ máy lâu trong nhà', 'Đốt nhiều nhựa cho nhanh gọn'],
        'Không đốt rác bừa bãi',
        `Giữ không khí sạch giúp bảo vệ sức khỏe mọi người. ${citation}`,
        seed('air-role-protect'),
      ),
      makeQuestion(
        'Cây xanh giúp ích gì cho bầu không khí?',
        ['Giúp làm không khí trong lành hơn', 'Làm không khí biến mất', 'Làm khói bụi nhiều hơn', 'Không có tác dụng gì'],
        'Giúp làm không khí trong lành hơn',
        `Cây xanh góp phần cải thiện môi trường không khí. ${citation}`,
        seed('air-role-tree'),
      ),
      makeQuestion(
        'Nếu lớp học quá ngột ngạt, con nên làm gì phù hợp hơn?',
        ['Mở cửa cho thoáng khi an toàn', 'Đóng kín hết cửa suốt ngày', 'Xịt thật nhiều mùi hương nồng', 'Chạy nhảy làm bụi bay lên'],
        'Mở cửa cho thoáng khi an toàn',
        `Không khí thông thoáng giúp lớp học dễ chịu và tốt cho hô hấp hơn. ${citation}`,
        seed('air-role-class'),
      ),
      makeQuestion(
        'Bạn nào đang bảo vệ bầu không khí tốt hơn?',
        ['Bạn trồng và chăm sóc cây xanh', 'Bạn đốt rác trước cửa nhà', 'Bạn để khói bốc trong phòng kín', 'Bạn xịt sơn lung tung trong lớp'],
        'Bạn trồng và chăm sóc cây xanh',
        `Trồng cây và hạn chế nguồn khói bụi là việc làm tốt cho bầu không khí. ${citation}`,
        seed('air-role-friend'),
      ),
      makeQuestion(
        'Bài này chủ yếu nhắc con điều gì?',
        ['Không khí cần cho sự sống và cần được giữ trong lành', 'Không khí không quan trọng', 'Chỉ người lớn mới cần không khí sạch', 'Bầu không khí bẩn cũng như sạch'],
        'Không khí cần cho sự sống và cần được giữ trong lành',
        `Đó là ý chính của bài về vai trò của không khí và bảo vệ bầu không khí trong lành. ${citation}`,
        seed('air-role-main'),
      ),
    ];
  }

  if (/không khí|bão/i.test(lessonName)) {
    return [
      makeQuestion(
        'Điều nào cho thấy không khí có ở xung quanh ta?',
        ['Bóng bay phồng lên khi được bơm', 'Viên đá tự phát sáng', 'Bát cơm tự biết đi', 'Cái bàn tự tan ra'],
        'Bóng bay phồng lên khi được bơm',
        `Không khí tuy không nhìn thấy rõ nhưng chiếm chỗ và có thật quanh ta. ${citation}`,
        seed('air-balloon'),
      ),
      makeQuestion(
        'Không khí có vai trò gì đối với sự sống?',
        ['Cần cho người và nhiều sinh vật hô hấp', 'Chỉ dùng để làm bóng bay đẹp hơn', 'Không liên quan gì đến cây cối', 'Chỉ có dưới nước'],
        'Cần cho người và nhiều sinh vật hô hấp',
        `Không khí rất quan trọng đối với sự sống. ${citation}`,
        seed('air-breath'),
      ),
      makeQuestion(
        'Khi có bão, việc nào an toàn hơn?',
        ['Ở nơi trú an toàn và nghe hướng dẫn của người lớn', 'Ra ngoài xem cây đổ cho rõ', 'Đứng gần cửa sổ để nhìn gió mạnh', 'Chạy ra sông xem nước dâng'],
        'Ở nơi trú an toàn và nghe hướng dẫn của người lớn',
        `Khi có bão, an toàn là ưu tiên số một. ${citation}`,
        seed('storm-safe'),
      ),
      makeQuestion(
        'Gió được tạo ra khi nào?',
        ['Khi không khí chuyển động', 'Khi đất tự phát sáng', 'Khi mọi đồ vật cùng đứng yên', 'Khi nước đá tan'],
        'Khi không khí chuyển động',
        `Gió chính là không khí chuyển động từ nơi này sang nơi khác. ${citation}`,
        seed('air-wind'),
      ),
      makeQuestion(
        'Bạn nào đang làm đúng để bảo vệ bầu không khí?',
        ['Bạn nhắc không đốt rác bừa bãi', 'Bạn đốt lá ngay sát cửa lớp', 'Bạn để xe nổ máy rất lâu trong nhà kín', 'Bạn xịt mùi nồng vào phòng đóng kín'],
        'Bạn nhắc không đốt rác bừa bãi',
        `Giữ không khí trong lành giúp bảo vệ sức khỏe. ${citation}`,
        seed('air-protect'),
      ),
      makeQuestion(
        'Bài này muốn con hiểu điều gì?',
        ['Không khí có thật, có ích và cần được giữ an toàn khi thời tiết xấu', 'Không khí không tồn tại', 'Bão là lúc ra ngoài chơi rất tốt', 'Chỉ có người lớn mới cần không khí'],
        'Không khí có thật, có ích và cần được giữ an toàn khi thời tiết xấu',
        `Đó là ý chính của nhóm bài về không khí và bão. ${citation}`,
        seed('air-main'),
      ),
    ];
  }

  if (/nấm gây hỏng thực phẩm|nấm độc/i.test(lessonName)) {
    return [
      makeQuestion(
        'Khi thấy bánh mì có mốc xanh và mùi lạ, con nên làm gì?',
        ['Bỏ đi và không ăn nữa', 'Cắt phần mốc rồi ăn phần còn lại', 'Rửa qua nước cho sạch rồi ăn', 'Để thêm vài ngày xem có đỡ không'],
        'Bỏ đi và không ăn nữa',
        `Thực phẩm bị nấm mốc có thể không còn an toàn, nên phải bỏ đi. ${citation}`,
        seed('mold-action'),
      ),
      makeQuestion(
        'Vì sao con không nên tự hái nấm lạ ngoài vườn để ăn?',
        ['Vì có thể đó là nấm độc dù nhìn giống nấm ăn', 'Vì nấm lạ luôn quá cứng để nhai', 'Vì mọi loại nấm đều không có chất dinh dưỡng', 'Vì nấm chỉ được ăn vào mùa hè'],
        'Vì có thể đó là nấm độc dù nhìn giống nấm ăn',
        `Có loại nấm trông giống nấm ăn nhưng lại là nấm độc, rất nguy hiểm. ${citation}`,
        seed('wild-mushroom'),
      ),
      makeQuestion(
        'Dấu hiệu nào cho thấy thực phẩm có thể đã bị nấm làm hỏng?',
        ['Đổi màu, có mốc hoặc mùi lạ', 'Còn nguyên bao bì và hạn dùng', 'Được cất trong tủ lạnh từ sáng', 'Có hình dạng đẹp mắt'],
        'Đổi màu, có mốc hoặc mùi lạ',
        `Mốc, màu lạ và mùi lạ là dấu hiệu thực phẩm có thể đã hỏng. ${citation}`,
        seed('spoiled-sign'),
      ),
      makeQuestion(
        'Điều nào nói đúng về nấm trong đời sống?',
        ['Có nấm có ích, có nấm làm hỏng thức ăn và có nấm độc', 'Mọi loại nấm đều ăn được', 'Nấm chỉ sống dưới nước', 'Nấm không ảnh hưởng gì đến thực phẩm'],
        'Có nấm có ích, có nấm làm hỏng thức ăn và có nấm độc',
        `Không phải nấm nào cũng giống nhau; có loại có ích và có loại rất nguy hiểm. ${citation}`,
        seed('mushroom-types'),
      ),
      makeQuestion(
        'Bạn nào đang xử lí thực phẩm an toàn hơn?',
        ['Bạn Lan bỏ hộp thức ăn đã mốc', 'Bạn Minh ngửi thấy mùi lạ nhưng vẫn ăn thử', 'Bạn An cắt bỏ phần mốc rồi đem phần còn lại cho em', 'Bạn Nam hái nấm lạ ngoài sân để nấu canh'],
        'Bạn Lan bỏ hộp thức ăn đã mốc',
        `Khi thực phẩm đã mốc, cách an toàn là không ăn nữa. ${citation}`,
        seed('safe-friend'),
      ),
      makeQuestion(
        'Bài học này nhắc con điều gì quan trọng nhất?',
        ['Không ăn thực phẩm bị nấm mốc và không thử nấm lạ', 'Cứ thấy thức ăn ngon mắt là có thể ăn ngay', 'Chỉ cần ngửi thơm là chắc chắn an toàn', 'Nấm nào mọc ngoài tự nhiên cũng là nấm ăn'],
        'Không ăn thực phẩm bị nấm mốc và không thử nấm lạ',
        `Ý quan trọng là biết nhận ra nguy hiểm và tránh ngộ độc do nấm. ${citation}`,
        seed('main-idea'),
      ),
    ];
  }

  if (/đặc điểm chung của nấm/i.test(lessonName)) {
    return [
      makeQuestion(
        'Điều nào đúng về nấm?',
        ['Nấm là sinh vật sống, có loại có ích và có loại gây hại', 'Nấm là đồ vật không sống', 'Nấm chỉ có ở dưới biển', 'Nấm nào cũng ăn được'],
        'Nấm là sinh vật sống, có loại có ích và có loại gây hại',
        `Nấm là sinh vật sống rất đa dạng trong tự nhiên. ${citation}`,
        seed('fungi-true'),
      ),
      makeQuestion(
        'Nấm thường mọc tốt ở nơi như thế nào?',
        ['Ẩm và có chất hữu cơ', 'Rất khô và nắng gắt cả ngày', 'Trên đá nóng đỏ', 'Trong chân không'],
        'Ẩm và có chất hữu cơ',
        `Nhiều loại nấm ưa nơi ẩm và có nguồn dinh dưỡng phù hợp. ${citation}`,
        seed('fungi-place'),
      ),
      makeQuestion(
        'Ví dụ nào cho thấy có nấm có ích?',
        ['Một số nấm dùng làm thực phẩm', 'Mọi nấm đều làm hỏng thức ăn', 'Nấm làm nhựa cây biến thành sắt', 'Nấm làm đá tan chảy'],
        'Một số nấm dùng làm thực phẩm',
        `Không phải nấm nào cũng có hại; có loại nấm có ích cho con người. ${citation}`,
        seed('fungi-useful'),
      ),
      makeQuestion(
        'Vì sao không nên chạm hoặc ăn nấm lạ bừa bãi?',
        ['Vì có thể gặp nấm gây hại hoặc nấm độc', 'Vì nấm lạ luôn quá cứng', 'Vì nấm chỉ người lớn mới được nhìn', 'Vì nấm không phải sinh vật'],
        'Vì có thể gặp nấm gây hại hoặc nấm độc',
        `Biết phân biệt và cẩn thận với nấm lạ là rất quan trọng. ${citation}`,
        seed('fungi-care'),
      ),
      makeQuestion(
        'Khi thấy thực phẩm có nấm mốc, điều nào đúng hơn?',
        ['Cần cẩn thận vì có loại nấm làm hỏng thức ăn', 'Chắc chắn đó là nấm ăn ngon', 'Cứ rửa nước là ăn được', 'Không ảnh hưởng gì đến thực phẩm'],
        'Cần cẩn thận vì có loại nấm làm hỏng thức ăn',
        `Có loại nấm mốc làm thực phẩm không còn an toàn. ${citation}`,
        seed('fungi-mold'),
      ),
      makeQuestion(
        'Bài này giúp con hiểu điều gì trước hết?',
        ['Nấm có những đặc điểm chung và vai trò khác nhau', 'Nấm nào cũng giống nhau hoàn toàn', 'Chỉ cần nhớ tên nấm là đủ', 'Nấm không liên quan gì đến đời sống'],
        'Nấm có những đặc điểm chung và vai trò khác nhau',
        `Đó là ý chính của bài về đặc điểm chung của nấm. ${citation}`,
        seed('fungi-main'),
      ),
    ];
  }

  if (/thực phẩm an toàn/i.test(lessonName)) {
    return [
      makeQuestion(
        'Khi chọn mua sữa hộp, con nên kiểm tra điều gì trước?',
        ['Hạn dùng và bao bì còn nguyên', 'Hộp có màu sáng nhất', 'Hộp đặt ở kệ cao nhất', 'Tên sản phẩm có dài hay không'],
        'Hạn dùng và bao bì còn nguyên',
        `Thực phẩm an toàn cần còn hạn dùng và bao bì không bị rách, phồng hay rò rỉ. ${citation}`,
        seed('food-safe-check'),
      ),
      makeQuestion(
        'Thực phẩm nào an toàn hơn để dùng cho bữa ăn?',
        ['Rau tươi được rửa sạch', 'Thịt có mùi lạ để qua đêm ngoài bàn', 'Bánh mì đã mốc một góc', 'Sữa đã quá hạn'],
        'Rau tươi được rửa sạch',
        `Thực phẩm an toàn cần sạch, tươi và được bảo quản đúng cách. ${citation}`,
        seed('food-safe-choice'),
      ),
      makeQuestion(
        'Vì sao không nên ăn thức ăn đã ôi thiu?',
        ['Vì có thể gây đau bụng hoặc ngộ độc', 'Vì sẽ làm thức ăn đổi màu đẹp hơn', 'Vì chỉ người lớn mới được ăn', 'Vì ăn vào sẽ giúp no lâu hơn'],
        'Vì có thể gây đau bụng hoặc ngộ độc',
        `Thức ăn ôi thiu có thể chứa vi sinh vật hoặc chất gây hại cho cơ thể. ${citation}`,
        seed('stale-food'),
      ),
      makeQuestion(
        'Bạn nào đang giữ an toàn thực phẩm tốt hơn?',
        ['Bạn Hoa rửa tay trước khi ăn', 'Bạn Bình ăn quà khi tay còn bẩn', 'Bạn Vân uống sữa đã quá hạn', 'Bạn Long để cơm cạnh thùng rác'],
        'Bạn Hoa rửa tay trước khi ăn',
        `Rửa tay sạch là một bước quan trọng để giữ an toàn thực phẩm và phòng bệnh. ${citation}`,
        seed('food-safe-habit'),
      ),
      makeQuestion(
        'Dấu hiệu nào cho thấy một hộp sữa có thể không an toàn?',
        ['Hộp bị phồng lên bất thường', 'Hộp còn nguyên niêm phong', 'Hộp mới được lấy từ tủ mát', 'Hộp có in hạn dùng rõ ràng'],
        'Hộp bị phồng lên bất thường',
        `Bao bì phồng, móp mạnh hoặc rò rỉ là dấu hiệu cần tránh. ${citation}`,
        seed('food-bulge'),
      ),
      makeQuestion(
        'Điều quan trọng nhất của bài "Thực phẩm an toàn" là gì?',
        ['Chọn thực phẩm sạch, còn hạn và dùng đúng cách', 'Chọn món đắt tiền nhất', 'Chỉ cần nhìn đẹp mắt là đủ', 'Món nào có quảng cáo nhiều thì chắc chắn an toàn'],
        'Chọn thực phẩm sạch, còn hạn và dùng đúng cách',
        `Bài này giúp con biết chọn và sử dụng thực phẩm an toàn cho sức khỏe. ${citation}`,
        seed('food-main'),
      ),
    ];
  }

  if (/ánh sáng/i.test(lessonName)) {
    return [
      makeQuestion(
        'Ánh sáng giúp ích điều gì rõ nhất trong đời sống hằng ngày?',
        ['Giúp chúng ta nhìn thấy đồ vật', 'Làm nước biến thành đá ngay lập tức', 'Khiến mọi đồ vật phát ra tiếng kêu', 'Làm mọi vật nhẹ hơn'],
        'Giúp chúng ta nhìn thấy đồ vật',
        `Ánh sáng giúp mắt ta nhận biết đồ vật và thế giới xung quanh. ${citation}`,
        seed('light-see'),
      ),
      makeQuestion(
        'Cây nào thường phát triển tốt hơn?',
        ['Cây được đặt nơi có ánh sáng phù hợp', 'Cây luôn bị nhốt trong hộp kín tối om', 'Cây không cần nước và cũng không cần sáng', 'Cây bị phủ kín bằng chăn dày'],
        'Cây được đặt nơi có ánh sáng phù hợp',
        `Nhiều cây cần ánh sáng để sống và phát triển. ${citation}`,
        seed('light-plant'),
      ),
      makeQuestion(
        'Khi học về vai trò của ánh sáng, cách quan sát nào phù hợp hơn?',
        ['So sánh chậu cây đặt sáng và chậu cây đặt tối', 'Nhắm mắt rồi đoán cây nào xanh hơn', 'Chỉ nhớ đáp án mà không nhìn hiện tượng', 'Đổi sang làm bài môn khác'],
        'So sánh chậu cây đặt sáng và chậu cây đặt tối',
        `Khoa học cần quan sát hiện tượng thật rồi mới rút ra nhận xét. ${citation}`,
        seed('light-observe'),
      ),
      makeQuestion(
        'Ban ngày, vì sao trong phòng tối ta cần bật đèn để đọc sách?',
        ['Vì cần đủ ánh sáng để nhìn rõ chữ', 'Vì đèn làm sách nhẹ hơn', 'Vì đèn giúp chữ tự chạy ra ngoài', 'Vì bật đèn thì không cần mở mắt'],
        'Vì cần đủ ánh sáng để nhìn rõ chữ',
        `Muốn đọc rõ, mắt cần có đủ ánh sáng. ${citation}`,
        seed('light-read'),
      ),
      makeQuestion(
        'Điều nào nói đúng về ánh sáng?',
        ['Ánh sáng rất cần cho đời sống của người và nhiều loài cây', 'Ánh sáng chỉ có ích vào ban đêm', 'Ánh sáng làm mọi vật đều phát ra mùi', 'Không có ánh sáng ta vẫn nhìn rõ như thường'],
        'Ánh sáng rất cần cho đời sống của người và nhiều loài cây',
        `Ánh sáng có vai trò quan trọng trong sinh hoạt và sự sống. ${citation}`,
        seed('light-true'),
      ),
      makeQuestion(
        'Bài học này chủ yếu muốn con hiểu điều gì?',
        ['Ánh sáng có vai trò trong nhìn thấy và sự sống', 'Mọi đồ vật tự phát sáng như Mặt Trời', 'Càng tối thì cây càng lớn nhanh', 'Chỉ có máy tính mới cần ánh sáng'],
        'Ánh sáng có vai trò trong nhìn thấy và sự sống',
        `Đó là ý chính của bài về vai trò của ánh sáng. ${citation}`,
        seed('light-main'),
      ),
    ];
  }

  if (/âm thanh/i.test(lessonName)) {
    const isLifeSound = /trong cuộc sống/i.test(lessonName);
    return [
      makeQuestion(
        isLifeSound ? 'Âm thanh nào có ích trong cuộc sống hằng ngày?' : 'Âm thanh phát ra khi nào?',
        isLifeSound
          ? ['Tiếng còi báo cháy giúp cảnh báo nguy hiểm', 'Tiếng loa mở quá to sát tai', 'Tiếng khoan ầm ầm bên tai', 'Tiếng quát rất lớn trong lớp']
          : ['Khi vật rung động', 'Khi vật đứng yên hoàn toàn', 'Khi mọi thứ tối đi', 'Khi nước đông thành đá'],
        isLifeSound ? 'Tiếng còi báo cháy giúp cảnh báo nguy hiểm' : 'Khi vật rung động',
        isLifeSound
          ? `Có những âm thanh rất có ích vì giúp con nhận biết thông tin và cảnh báo nguy hiểm. ${citation}`
          : `Đó là kiến thức cơ bản về âm thanh. ${citation}`,
        seed('sound-vibrate'),
      ),
      makeQuestion(
        isLifeSound ? 'Âm thanh nào nên hạn chế vì dễ trở thành tiếng ồn?' : 'Ví dụ nào cho thấy âm thanh đang truyền qua không khí?',
        isLifeSound
          ? ['Mở loa thật to khi mọi người đang nghỉ', 'Nghe hiệu lệnh trong lớp', 'Nghe chuông báo giờ vào lớp', 'Nghe bạn kể chuyện với âm lượng vừa phải']
          : ['Con nghe tiếng trống từ sân trường', 'Con nhìn thấy đèn sáng', 'Con thấy nước đá tan', 'Con sờ thấy bàn lạnh'],
        isLifeSound ? 'Mở loa thật to khi mọi người đang nghỉ' : 'Con nghe tiếng trống từ sân trường',
        isLifeSound
          ? `Âm thanh quá lớn, không đúng lúc có thể trở thành tiếng ồn gây khó chịu. ${citation}`
          : `Âm thanh có thể truyền qua không khí đến tai ta. ${citation}`,
        seed('sound-air'),
      ),
      makeQuestion(
        'Tiếng ồn quá lớn có thể gây điều gì?',
        ['Làm khó chịu hoặc hại tai', 'Giúp tai nghe tốt hơn mãi mãi', 'Làm cây mọc nhanh ngay lập tức', 'Biến nước thành đường'],
        'Làm khó chịu hoặc hại tai',
        `Cần tránh tiếng ồn quá lớn để bảo vệ sức khỏe. ${citation}`,
        seed('sound-noise'),
      ),
      makeQuestion(
        isLifeSound ? 'Bạn nào đang sử dụng âm thanh đúng cách hơn?' : 'Bạn nào đang tạo ra âm thanh nhờ rung động?',
        isLifeSound
          ? ['Bạn nói vừa đủ nghe trong thư viện', 'Bạn hét to trong lớp đang học', 'Bạn gõ bàn liên tục cho vui', 'Bạn mở video cực to ở nơi công cộng']
          : ['Bạn gảy dây đàn', 'Bạn nhìn vào tranh', 'Bạn ngửi bông hoa', 'Bạn cất bút vào hộp'],
        isLifeSound ? 'Bạn nói vừa đủ nghe trong thư viện' : 'Bạn gảy dây đàn',
        isLifeSound
          ? `Biết dùng âm thanh đúng lúc, đúng chỗ là ứng dụng tốt của bài học. ${citation}`
          : `Dây đàn rung lên sẽ phát ra âm thanh. ${citation}`,
        seed('sound-example'),
      ),
      makeQuestion(
        'Cách nào giúp lớp học yên tĩnh hơn?',
        ['Nói vừa đủ nghe và không hét to', 'Kéo bàn ghế thật mạnh liên tục', 'Vỗ bàn cho thật vui', 'Mở loa rất to khi cô đang giảng'],
        'Nói vừa đủ nghe và không hét to',
        `Biết giảm tiếng ồn là một ứng dụng tốt của bài học về âm thanh. ${citation}`,
        seed('sound-class'),
      ),
      makeQuestion(
        'Bài về âm thanh giúp con hiểu điều gì?',
        ['Âm thanh do rung động tạo ra và cần dùng âm thanh hợp lí', 'Âm thanh không truyền được đi đâu cả', 'Âm thanh chỉ có trong nhạc cụ', 'Tiếng ồn càng lớn càng tốt'],
        'Âm thanh do rung động tạo ra và cần dùng âm thanh hợp lí',
        `Đó là điều cốt lõi của nhóm bài về âm thanh. ${citation}`,
        seed('sound-main'),
      ),
    ];
  }

  if (/nhiệt độ|truyền nhiệt|dẫn nhiệt/i.test(lessonName)) {
    const isConduct = /dẫn nhiệt/i.test(lessonName);
    return [
      makeQuestion(
        isConduct ? 'Vật nào thường dẫn nhiệt tốt hơn?' : 'Nhiệt độ cho biết điều gì?',
        isConduct
          ? ['Thìa kim loại', 'Khăn bông khô', 'Miếng xốp', 'Cục bông gòn']
          : ['Vật nóng hay lạnh', 'Vật nặng hay nhẹ', 'Vật to hay nhỏ', 'Vật phát ra tiếng gì'],
        isConduct ? 'Thìa kim loại' : 'Vật nóng hay lạnh',
        isConduct
          ? `Kim loại thường dẫn nhiệt tốt hơn nhiều vật liệu khác. ${citation}`
          : `Nhiệt độ giúp ta biết mức độ nóng, lạnh của vật. ${citation}`,
        seed('heat-temp'),
      ),
      makeQuestion(
        isConduct ? 'Vì sao cán nồi thường làm bằng nhựa hoặc gỗ?' : 'Nhiệt thường truyền theo hướng nào?',
        isConduct
          ? ['Vì những vật đó dẫn nhiệt kém hơn kim loại', 'Vì nhựa làm nồi chín nhanh hơn', 'Vì gỗ làm lửa to hơn', 'Vì kim loại không bao giờ nóng']
          : ['Từ vật nóng sang vật lạnh hơn', 'Từ vật lạnh sang vật nóng hơn mãi mãi', 'Không truyền giữa các vật', 'Chỉ truyền từ giấy sang gỗ'],
        isConduct ? 'Vì những vật đó dẫn nhiệt kém hơn kim loại' : 'Từ vật nóng sang vật lạnh hơn',
        isConduct
          ? `Chọn vật dẫn nhiệt kém giúp cầm nắm an toàn hơn. ${citation}`
          : `Đó là nguyên tắc cơ bản của sự truyền nhiệt. ${citation}`,
        seed('heat-transfer'),
      ),
      makeQuestion(
        isConduct ? 'Vật nào thích hợp hơn để làm quai cầm chảo nóng?' : 'Vì sao cán nồi thường làm bằng nhựa hoặc gỗ?',
        isConduct
          ? ['Nhựa chịu nhiệt', 'Thép trơn không bọc', 'Nhôm nguyên khối', 'Đồng mỏng']
          : ['Vì những vật đó dẫn nhiệt kém hơn kim loại', 'Vì nhựa làm nồi chín nhanh hơn', 'Vì gỗ làm lửa to hơn', 'Vì kim loại không bao giờ nóng'],
        isConduct ? 'Nhựa chịu nhiệt' : 'Vì những vật đó dẫn nhiệt kém hơn kim loại',
        isConduct
          ? `Vật dẫn nhiệt kém thường an toàn hơn khi cầm nắm đồ nóng. ${citation}`
          : `Chọn vật dẫn nhiệt kém giúp cầm nắm an toàn hơn. ${citation}`,
        seed('heat-handle'),
      ),
      ...(isConduct ? [makeQuestion(
        'Bạn nào chọn vật liệu hợp lí hơn để cầm đồ nóng?',
        ['Bạn dùng miếng lót vải khô khi nhấc nồi', 'Bạn chạm tay trần vào quai nồi kim loại nóng', 'Bạn ôm sát cốc nước sôi vào má', 'Bạn thử độ nóng bằng đầu ngón tay'],
        'Bạn dùng miếng lót vải khô khi nhấc nồi',
        `Hiểu về dẫn nhiệt giúp con chọn cách cầm nắm an toàn hơn. ${citation}`,
        seed('heat-conduct-safe'),
      )] : []),
      ...(isConduct ? [] : [makeQuestion(
        'Vật nào thường dẫn nhiệt tốt hơn?',
        ['Thìa kim loại', 'Khăn bông khô', 'Miếng xốp', 'Cục bông gòn'],
        'Thìa kim loại',
        `Kim loại thường dẫn nhiệt tốt hơn nhiều vật liệu khác. ${citation}`,
        seed('heat-metal'),
      )]),
      makeQuestion(
        'Khi cốc nước nóng vừa rót xong, con nên làm gì?',
        ['Cẩn thận vì cốc có thể nóng', 'Ôm chặt ngay vào má', 'Đổ lên tay để thử', 'Thổi thật mạnh là cốc hết nóng ngay'],
        'Cẩn thận vì cốc có thể nóng',
        `Hiểu về nhiệt giúp con biết cách giữ an toàn. ${citation}`,
        seed('heat-safe'),
      ),
      makeQuestion(
        'Ý chính của nhóm bài về nhiệt là gì?',
        ['Biết vật nóng lạnh thế nào và chọn cách dùng an toàn', 'Mọi vật đều có nhiệt độ như nhau', 'Kim loại luôn mát lạnh', 'Nhiệt không liên quan đến đời sống'],
        'Biết vật nóng lạnh thế nào và chọn cách dùng an toàn',
        `Đó là điều quan trọng của bài về nhiệt độ và truyền nhiệt. ${citation}`,
        seed('heat-main'),
      ),
    ];
  }

  if (/thực vật cần gì để sống|động vật cần gì để sống|chăm sóc cây trồng vật nuôi/i.test(lessonName)) {
    const isAnimal = /động vật/i.test(lessonName);
    const isCare = /chăm sóc/i.test(lessonName);
    return [
      makeQuestion(
        isAnimal
          ? 'Con vật nuôi thường cần điều gì để sống khỏe?'
          : isCare
            ? 'Việc nào giúp chăm sóc cây tốt hơn?'
            : 'Cây thường cần điều gì để sống và lớn lên?',
        isAnimal
          ? ['Thức ăn, nước uống và nơi sống phù hợp', 'Chỉ cần đồ chơi đắt tiền', 'Không cần nước', 'Chỉ cần ngủ cả ngày']
          : isCare
            ? ['Tưới nước vừa đủ và đặt cây nơi phù hợp', 'Bẻ lá non cho vui', 'Khóa cây trong tủ tối', 'Đổ nước ngập chậu cả ngày']
            : ['Nước, ánh sáng và điều kiện phù hợp', 'Chỉ cần đá sỏi', 'Chỉ cần ở trong hộp kín tối', 'Không cần gì cả'],
        isAnimal ? 'Thức ăn, nước uống và nơi sống phù hợp' : isCare ? 'Tưới nước vừa đủ và đặt cây nơi phù hợp' : 'Nước, ánh sáng và điều kiện phù hợp',
        isAnimal
          ? `Động vật cũng cần được chăm sóc đúng để khỏe mạnh. ${citation}`
          : isCare
            ? `Chăm sóc đúng giúp cây phát triển tốt. ${citation}`
            : `Cây cần những điều kiện sống phù hợp để phát triển. ${citation}`,
        seed('plant-needs'),
      ),
      makeQuestion(
        isAnimal
          ? 'Nếu vật nuôi thiếu thức ăn và nước uống, điều gì có thể xảy ra?'
          : isCare
            ? 'Bạn nào đang chăm sóc vật nuôi đúng hơn?'
            : 'Con vật nuôi cần điều gì quan trọng?',
        isAnimal
          ? ['Vật nuôi yếu đi và chậm lớn', 'Vật nuôi khỏe hơn ngay', 'Vật nuôi biết tự nấu ăn', 'Không có gì thay đổi']
          : isCare
            ? ['Bạn cho vật nuôi ăn đúng bữa và dọn chỗ ở sạch', 'Bạn quên cho vật nuôi uống nước nhiều ngày', 'Bạn chọc vật nuôi khi nó đang ăn', 'Bạn để chuồng bẩn lâu ngày']
            : ['Thức ăn, nước uống và nơi sống phù hợp', 'Chỉ cần đồ chơi đắt tiền', 'Không cần nước', 'Chỉ cần ngủ cả ngày'],
        isAnimal ? 'Vật nuôi yếu đi và chậm lớn' : isCare ? 'Bạn cho vật nuôi ăn đúng bữa và dọn chỗ ở sạch' : 'Thức ăn, nước uống và nơi sống phù hợp',
        isAnimal
          ? `Thiếu điều kiện sống cần thiết sẽ ảnh hưởng xấu đến vật nuôi. ${citation}`
          : isCare
            ? `Chăm sóc vật nuôi là cho ăn uống đúng và giữ nơi ở sạch. ${citation}`
            : `Động vật cũng cần được chăm sóc đúng để khỏe mạnh. ${citation}`,
        seed('animal-needs'),
      ),
      makeQuestion(
        isAnimal
          ? 'Quan sát vật nuôi giúp con biết điều gì?'
          : isCare
            ? 'Vì sao cần quan sát cây hoặc vật nuôi hằng ngày?'
            : 'Bạn nào đang chăm sóc cây đúng hơn?',
        isAnimal
          ? ['Biết vật nuôi khỏe hay đang cần chăm sóc thêm', 'Biến vật nuôi thành đồ chơi', 'Để khỏi cần cho ăn', 'Không có tác dụng gì']
          : isCare
            ? ['Để biết chúng khỏe hay cần giúp đỡ thêm', 'Để không cần tưới nước nữa', 'Để mặc kệ khi cây héo', 'Để khỏi dọn chỗ ở của vật nuôi']
            : ['Bạn tưới nước vừa đủ và đặt cây nơi có ánh sáng', 'Bạn khóa cây trong tủ tối cả tuần', 'Bạn đổ nước ngập chậu mãi không ngừng', 'Bạn bẻ lá non cho vui'],
        isAnimal ? 'Biết vật nuôi khỏe hay đang cần chăm sóc thêm' : isCare ? 'Để biết chúng khỏe hay cần giúp đỡ thêm' : 'Bạn tưới nước vừa đủ và đặt cây nơi có ánh sáng',
        isAnimal
          ? `Quan sát là cách quan trọng để chăm sóc vật nuôi tốt hơn. ${citation}`
          : isCare
            ? `Quan sát thường xuyên giúp con chăm sóc đúng hơn. ${citation}`
            : `Chăm sóc đúng giúp cây phát triển tốt. ${citation}`,
        seed('plant-care'),
      ),
      makeQuestion(
        'Quan sát cây hoặc vật nuôi giúp con làm gì?',
        ['Biết chúng đang khỏe hay cần chăm sóc thêm', 'Làm chúng biến màu ngay', 'Giúp không cần cho ăn nữa', 'Không có ích gì'],
        'Biết chúng đang khỏe hay cần chăm sóc thêm',
        `Quan sát là cách rất quan trọng trong môn Khoa học. ${citation}`,
        seed('observe-living'),
      ),
      makeQuestion(
        isAnimal
          ? 'Bạn nào đang chăm sóc vật nuôi chưa đúng?'
          : isCare
            ? 'Khi thấy cây héo lá, con nên làm gì trước?'
            : 'Việc nào giúp cây hoặc con vật phát triển tốt hơn?',
        isAnimal
          ? ['Bạn bỏ quên không cho vật nuôi uống nước nhiều ngày', 'Bạn dọn chỗ ở sạch sẽ cho vật nuôi', 'Bạn cho vật nuôi ăn đúng bữa', 'Bạn quan sát xem vật nuôi có khỏe không']
          : isCare
            ? ['Quan sát nguyên nhân rồi chăm sóc lại cho phù hợp', 'Bẻ bỏ hết lá cho gọn', 'Để mặc vì cây tự hồi phục được', 'Đổ thật nhiều nước liên tục dù chưa biết cây cần gì']
            : ['Cho cây hoặc con vật điều kiện sống phù hợp', 'Nhốt kín mãi trong chỗ tối', 'Để thiếu nước nhiều ngày', 'Mặc kệ không quan sát gì'],
        isAnimal ? 'Bạn bỏ quên không cho vật nuôi uống nước nhiều ngày' : isCare ? 'Quan sát nguyên nhân rồi chăm sóc lại cho phù hợp' : 'Cho cây hoặc con vật điều kiện sống phù hợp',
        isAnimal
          ? `Bỏ quên những nhu cầu cơ bản sẽ làm vật nuôi bị ảnh hưởng xấu. ${citation}`
          : isCare
            ? `Muốn chăm sóc đúng, con cần quan sát rồi xử lí phù hợp. ${citation}`
            : `Điều kiện sống phù hợp giúp sinh vật phát triển tốt hơn. ${citation}`,
        seed('living-extra'),
      ),
      makeQuestion(
        'Bài học này muốn con hiểu điều gì?',
        ['Sinh vật cần điều kiện sống phù hợp và cần được chăm sóc đúng', 'Cây và con vật không cần nước', 'Chăm sóc thế nào cũng như nhau', 'Không cần quan sát cây và vật nuôi'],
        'Sinh vật cần điều kiện sống phù hợp và cần được chăm sóc đúng',
        `Đó là ý chính của nhóm bài về thực vật và động vật. ${citation}`,
        seed('living-main'),
      ),
    ];
  }

  if (/đuối nước/i.test(lessonName)) {
    return [
      makeQuestion(
        'Khi thấy bạn có dấu hiệu nguy hiểm dưới nước, con nên làm gì?',
        ['Gọi người lớn hoặc người biết cứu hộ giúp ngay', 'Nhảy xuống cứu dù mình không biết bơi', 'Đứng cười rồi bỏ đi', 'Ném cặp sách xuống nước cho bạn tự bám'],
        'Gọi người lớn hoặc người biết cứu hộ giúp ngay',
        `Trong tình huống đuối nước, con cần ưu tiên gọi người lớn giúp đỡ. ${citation}`,
        seed('drowning-help'),
      ),
      makeQuestion(
        'Việc nào giúp phòng tránh đuối nước tốt hơn?',
        ['Không chơi gần ao hồ khi không có người lớn trông', 'Tự ra sông bơi một mình', 'Đùa nghịch ở mép hồ trơn trượt', 'Nhảy xuống nước sâu để thử gan'],
        'Không chơi gần ao hồ khi không có người lớn trông',
        `Giữ an toàn và không ở gần nước nguy hiểm khi thiếu người lớn là rất quan trọng. ${citation}`,
        seed('drowning-prevent'),
      ),
      makeQuestion(
        'Nếu không biết bơi, con nên làm gì khi đi gần sông hoặc hồ?',
        ['Đi cùng người lớn và tránh xa chỗ nguy hiểm', 'Tiến sát mép nước để nhìn cho rõ', 'Tự xuống thử xem sâu hay nông', 'Rủ bạn thi xem ai dám đứng gần mép hơn'],
        'Đi cùng người lớn và tránh xa chỗ nguy hiểm',
        `Biết tránh nguy hiểm là cách bảo vệ bản thân tốt nhất. ${citation}`,
        seed('drowning-safe'),
      ),
      makeQuestion(
        'Điều nào đúng về phòng tránh đuối nước?',
        ['Phải ưu tiên an toàn, không chủ quan', 'Chỉ cần biết chạy nhanh là đủ', 'Ai cũng tự cứu được mình', 'Ao hồ nông luôn an toàn tuyệt đối'],
        'Phải ưu tiên an toàn, không chủ quan',
        `Không chủ quan với môi trường nước là điều rất quan trọng. ${citation}`,
        seed('drowning-true'),
      ),
      makeQuestion(
        'Bạn nào đang xử lí đúng hơn?',
        ['Bạn gọi người lớn khi thấy em nhỏ đến gần mép ao', 'Bạn cổ vũ bạn khác nhảy xuống nước', 'Bạn xô đùa trên cầu trơn', 'Bạn bỏ mặc bạn nhỏ chơi một mình ở bờ kênh'],
        'Bạn gọi người lớn khi thấy em nhỏ đến gần mép ao',
        `Biết gọi người lớn giúp là phản ứng an toàn và đúng. ${citation}`,
        seed('drowning-friend'),
      ),
      makeQuestion(
        'Bài này chủ yếu muốn con nhớ điều gì?',
        ['Biết phòng tránh đuối nước và gọi người lớn khi nguy hiểm', 'Cứ thấy nước là nhảy xuống chơi', 'Nước nông thì không bao giờ nguy hiểm', 'Ai cũng cứu hộ được dù không biết bơi'],
        'Biết phòng tránh đuối nước và gọi người lớn khi nguy hiểm',
        `Đó là điều quan trọng nhất của bài về phòng tránh đuối nước. ${citation}`,
        seed('drowning-main'),
      ),
    ];
  }

  if (/dinh dưỡng|ăn uống|bệnh|sức khỏe/i.test(lessonName)) {
    return [
      makeQuestion(
        'Ăn uống hợp lí giúp điều gì?',
        ['Giúp cơ thể khỏe mạnh và phát triển tốt', 'Làm con không cần ngủ', 'Biến mọi món ăn thành kẹo', 'Giúp con không bao giờ phải vận động'],
        'Giúp cơ thể khỏe mạnh và phát triển tốt',
        `Chế độ ăn uống hợp lí rất quan trọng với sức khỏe. ${citation}`,
        seed('nutrition-health'),
      ),
      makeQuestion(
        'Bữa ăn cân bằng nên như thế nào?',
        ['Có nhiều nhóm thực phẩm phù hợp, không chỉ một món', 'Chỉ ăn kẹo và nước ngọt', 'Chỉ ăn thịt mà không ăn rau', 'Bỏ bữa sáng để đỡ mất thời gian'],
        'Có nhiều nhóm thực phẩm phù hợp, không chỉ một món',
        `Ăn đa dạng và hợp lí giúp cơ thể nhận đủ chất dinh dưỡng. ${citation}`,
        seed('nutrition-balanced'),
      ),
      makeQuestion(
        'Thiếu chất dinh dưỡng trong thời gian dài có thể gây điều gì?',
        ['Cơ thể chậm lớn hoặc dễ mệt', 'Giúp cơ thể khỏe lên ngay', 'Làm không cần ngủ nữa', 'Biến mọi món ăn thành rau'],
        'Cơ thể chậm lớn hoặc dễ mệt',
        `Cơ thể cần đủ chất để phát triển và hoạt động tốt. ${citation}`,
        seed('nutrition-lack'),
      ),
      makeQuestion(
        'Thói quen nào tốt cho sức khỏe hơn?',
        ['Ăn đúng bữa và ngủ đủ giấc', 'Uống nước ngọt thay nước lọc cả ngày', 'Chỉ ăn món chiên rán mọi bữa', 'Thức rất khuya mỗi ngày'],
        'Ăn đúng bữa và ngủ đủ giấc',
        `Những thói quen tốt giúp cơ thể khỏe mạnh hơn. ${citation}`,
        seed('health-habit'),
      ),
      makeQuestion(
        'Vì sao không nên ăn quá nhiều đồ ngọt và đồ chiên rán?',
        ['Vì dễ ảnh hưởng không tốt đến sức khỏe nếu ăn quá nhiều', 'Vì càng ăn càng thông minh ngay', 'Vì những món đó luôn là thuốc', 'Vì ăn vào sẽ giúp không cần vận động'],
        'Vì dễ ảnh hưởng không tốt đến sức khỏe nếu ăn quá nhiều',
        `Ăn uống cần cân bằng, không nên thiên quá nhiều về một loại thực phẩm. ${citation}`,
        seed('health-sweets'),
      ),
      makeQuestion(
        'Bài học này chủ yếu nhắc con điều gì?',
        ['Biết giữ an toàn và chăm sóc sức khỏe hằng ngày', 'Muốn khỏe chỉ cần ăn thật nhiều', 'Không cần quan tâm đến an toàn', 'Chỉ người lớn mới cần học về sức khỏe'],
        'Biết giữ an toàn và chăm sóc sức khỏe hằng ngày',
        `Đó là tinh thần chung của nhóm bài về con người và sức khỏe. ${citation}`,
        seed('health-main'),
      ),
    ];
  }

  if (/vai trò của thực vật trong chuỗi thức ăn/i.test(lessonName)) {
    return [
      makeQuestion(
        'Vì sao thực vật rất quan trọng trong chuỗi thức ăn?',
        ['Vì thực vật có thể tự tạo thức ăn', 'Vì thực vật chỉ ăn thịt', 'Vì thực vật không liên quan đến con vật nào', 'Vì thực vật không cần ánh sáng'],
        'Vì thực vật có thể tự tạo thức ăn',
        `Thực vật là mắt xích quan trọng mở đầu cho nhiều chuỗi thức ăn. ${citation}`,
        seed('plant-role'),
      ),
      makeQuestion(
        'Con vật nào thường nhận thức ăn trực tiếp từ thực vật?',
        ['Con vật ăn cỏ', 'Con vật chỉ ăn thịt', 'Hòn đá', 'Đám mây'],
        'Con vật ăn cỏ',
        `Nhiều con vật ăn cỏ lấy thức ăn trực tiếp từ thực vật. ${citation}`,
        seed('plant-herbivore'),
      ),
      makeQuestion(
        'Nếu nhiều cây cỏ bị mất đi, điều gì có thể xảy ra trước?',
        ['Các con vật ăn cỏ thiếu thức ăn', 'Mặt Trời tắt sáng', 'Nước biển khô ngay', 'Âm thanh biến mất hết'],
        'Các con vật ăn cỏ thiếu thức ăn',
        `Khi thực vật giảm đi, những sinh vật ăn thực vật thường bị ảnh hưởng sớm. ${citation}`,
        seed('plant-effect'),
      ),
      makeQuestion(
        'Điều nào đúng về thực vật trong tự nhiên?',
        ['Thực vật giúp duy trì nhiều chuỗi thức ăn', 'Thực vật không cần nước hay ánh sáng', 'Thực vật không liên quan đến động vật', 'Thực vật chỉ sống trong sách'],
        'Thực vật giúp duy trì nhiều chuỗi thức ăn',
        `Bài này nhấn mạnh vai trò rất quan trọng của thực vật. ${citation}`,
        seed('plant-true'),
      ),
      makeQuestion(
        'Việc nào góp phần bảo vệ vai trò của thực vật trong môi trường?',
        ['Chăm sóc cây và không phá hoại cây xanh', 'Bẻ cây non hàng loạt', 'Đốt cỏ cho vui', 'Vứt rác phủ kín gốc cây'],
        'Chăm sóc cây và không phá hoại cây xanh',
        `Bảo vệ thực vật cũng là bảo vệ môi trường sống của nhiều sinh vật. ${citation}`,
        seed('plant-protect'),
      ),
      makeQuestion(
        'Bài này muốn con hiểu điều gì rõ nhất?',
        ['Thực vật là mắt xích quan trọng trong chuỗi thức ăn', 'Thực vật không có vai trò gì', 'Động vật tự tạo được thức ăn như cây', 'Chuỗi thức ăn không cần thực vật'],
        'Thực vật là mắt xích quan trọng trong chuỗi thức ăn',
        `Đó là ý chính của bài về vai trò của thực vật trong chuỗi thức ăn. ${citation}`,
        seed('plant-main'),
      ),
    ];
  }

  if (/chuỗi thức ăn|môi trường/i.test(lessonName)) {
    return [
      makeQuestion(
        'Trong chuỗi thức ăn, thực vật thường có vai trò gì?',
        ['Là mắt xích quan trọng vì có thể tự tạo thức ăn', 'Luôn ăn thịt các con vật khác', 'Không liên quan gì đến chuỗi thức ăn', 'Chỉ sống dưới đáy biển sâu'],
        'Là mắt xích quan trọng vì có thể tự tạo thức ăn',
        `Thực vật giữ vai trò rất quan trọng trong nhiều chuỗi thức ăn. ${citation}`,
        seed('foodchain-plant'),
      ),
      makeQuestion(
        'Nếu cỏ trên đồng bị giảm nhiều, con vật nào dễ bị ảnh hưởng trước?',
        ['Những con vật ăn cỏ', 'Những hòn đá', 'Mây trên trời', 'Những đồ dùng trong lớp'],
        'Những con vật ăn cỏ',
        `Khi một mắt xích thay đổi, các mắt xích liên quan cũng bị ảnh hưởng. ${citation}`,
        seed('foodchain-effect'),
      ),
      makeQuestion(
        'Điều nào đúng về chuỗi thức ăn?',
        ['Các sinh vật có mối liên hệ với nhau qua thức ăn', 'Mỗi sinh vật sống hoàn toàn tách biệt', 'Thực vật không liên quan đến động vật', 'Chuỗi thức ăn chỉ có trong sách'],
        'Các sinh vật có mối liên hệ với nhau qua thức ăn',
        `Đó là ý cơ bản của bài về chuỗi thức ăn. ${citation}`,
        seed('foodchain-true'),
      ),
      makeQuestion(
        'Việc nào giúp bảo vệ môi trường sống của sinh vật?',
        ['Không xả rác bừa bãi và giữ nơi sống sạch', 'Phá tổ chim để xem vui', 'Bẻ cây non hàng loạt', 'Đổ rác xuống ao hồ'],
        'Không xả rác bừa bãi và giữ nơi sống sạch',
        `Bảo vệ môi trường cũng là bảo vệ các sinh vật trong chuỗi thức ăn. ${citation}`,
        seed('foodchain-protect'),
      ),
      makeQuestion(
        'Bạn nào hiểu đúng hơn về môi trường sống?',
        ['Bạn nói mỗi loài cần nơi sống phù hợp', 'Bạn nói mọi loài đều sống tốt ở mọi nơi', 'Bạn nói cây không cần đất hay nước', 'Bạn nói động vật không cần thức ăn'],
        'Bạn nói mỗi loài cần nơi sống phù hợp',
        `Mỗi loài sinh vật đều cần môi trường sống phù hợp với nó. ${citation}`,
        seed('foodchain-habitat'),
      ),
      makeQuestion(
        'Bài học này muốn con thấy điều gì?',
        ['Sinh vật liên hệ với nhau và cần môi trường sống được bảo vệ', 'Sinh vật sống không cần nhau', 'Môi trường thay đổi cũng không ảnh hưởng gì', 'Chỉ con người mới cần nơi sống sạch'],
        'Sinh vật liên hệ với nhau và cần môi trường sống được bảo vệ',
        `Đó là điều cốt lõi của nhóm bài về sinh vật và môi trường. ${citation}`,
        seed('foodchain-main'),
      ),
    ];
  }

  const theoryPoints = buildTheoryPoints({
    subject: 'sci',
    skillType: topic.knttSource?.skill || '',
    displayTitle: lessonName,
    ssgkTitle: lessonName,
  });
  const keyIdea = theoryPoints[0] || 'Khoa học giúp con quan sát và hiểu hiện tượng';
  const secondIdea = theoryPoints[1] || 'Con cần dùng kiến thức để giải thích điều mình quan sát được';
  const thirdIdea = theoryPoints[2] || 'Con nên liên hệ bài học với ví dụ thật trong đời sống';

  return [
    makeQuestion(
      `Điều nào nói đúng nhất về bài "${lessonName}"?`,
      [keyIdea, 'Chỉ cần nhớ số trang là đủ', 'Không cần quan sát hiện tượng', 'Đáp án đúng luôn là đáp án dài nhất'],
      keyIdea,
      `${keyIdea} ${citation}`,
      seed('generic-key'),
    ),
    makeQuestion(
      `Khi học bài "${lessonName}", con nên làm gì?`,
      [secondIdea, 'Đoán đáp án cho nhanh', 'Bỏ qua ví dụ thực tế', 'Chọn theo cảm tính'],
      secondIdea,
      `${secondIdea} ${citation}`,
      seed('generic-second'),
    ),
    makeQuestion(
      `Ví dụ nào gần với điều bài "${lessonName}" muốn con làm nhất?`,
      [thirdIdea, 'Chép lại đáp án mà không hiểu', 'Chỉ nhìn tiêu đề rồi bấm tiếp', 'Đổi sang học môn khác'],
      thirdIdea,
      `${thirdIdea} ${citation}`,
      seed('generic-third'),
    ),
    makeQuestion(
      'Khi học Khoa học, con nên làm gì để hiểu hiện tượng chắc hơn?',
      ['Quan sát, so sánh rồi giải thích', 'Chỉ nhìn một chi tiết rồi kết luận ngay', 'Chọn đáp án theo cảm giác', 'Bỏ qua phần hiện tượng rồi đoán luôn'],
      'Quan sát, so sánh rồi giải thích',
      `Đó là cách học đúng tinh thần môn Khoa học. ${citation}`,
      seed('generic-method'),
    ),
    makeQuestion(
      'Khi thấy một hiện tượng lạ, con nên làm gì trước?',
      ['Quan sát kĩ rồi nghĩ xem nguyên nhân là gì', 'Kết luận ngay khi chưa nhìn rõ', 'Hỏi đáp án đúng là gì rồi chép lại', 'Bỏ qua vì hiện tượng nào cũng giống nhau'],
      'Quan sát kĩ rồi nghĩ xem nguyên nhân là gì',
      `Bài Khoa học luôn khuyến khích con quan sát trước khi giải thích. ${citation}`,
      seed('generic-observe'),
    ),
    makeQuestion(
      `Ý nào phù hợp nhất với bài "${lessonName}"?`,
      [keyIdea, secondIdea, thirdIdea, 'Không cần liên hệ kiến thức với cuộc sống'],
      keyIdea,
      `${keyIdea} ${citation}`,
      seed('generic-summary'),
    ),
  ];
}

function buildGenericLessonQuestions(topic, lessonName, citation, seedInput = '') {
  const topicKey = topic.topicKey || lessonName;
  const seed = suffix => `${seedInput}|${topicKey}|${suffix}`;
  const theoryPoints = buildTheoryPoints({
    subject: topic.subject,
    skillType: topic.knttSource?.skill || '',
    displayTitle: lessonName,
    ssgkTitle: lessonName,
  });
  const keyIdea = theoryPoints[0] || `Bài ${lessonName} có một ý chính cần nắm trước khi làm bài`;
  const supportIdea = theoryPoints[1] || 'Con nên hiểu kiến thức rồi mới chọn đáp án';
  const applyIdea = theoryPoints[2] || 'Con nên gắn bài học với ví dụ thật để nhớ lâu hơn';
  const subjectName = subjectLabel(topic.subject);

  return [
    makeQuestion(
      `Ý nào đúng với bài "${lessonName}" của môn ${subjectName}?`,
      [keyIdea, 'Chỉ cần nhớ vị trí nút bấm là đủ', 'Không cần hiểu nội dung bài học', 'Cứ chọn đáp án dài nhất'],
      keyIdea,
      `${keyIdea} ${citation}`,
      seed('generic-key'),
    ),
    makeQuestion(
      `Khi học bài "${lessonName}", con nên chú ý điều gì?`,
      [supportIdea, 'Làm thật nhanh để xong sớm', 'Bỏ qua ví dụ trong bài học', 'Đổi sang câu khác nếu thấy hơi khó'],
      supportIdea,
      `${supportIdea} ${citation}`,
      seed('generic-support'),
    ),
    makeQuestion(
      `Ví dụ nào cho thấy con đang học bài "${lessonName}" đúng cách?`,
      [applyIdea, 'Chỉ chờ xem đáp án đúng là gì', 'Chép lại câu hỏi rồi bỏ trống đáp án', 'Không cần xem lại bài học ngắn'],
      applyIdea,
      `${applyIdea} ${citation}`,
      seed('generic-apply'),
    ),
    makeQuestion(
      `Điều nào phù hợp với cách học môn ${subjectName}?`,
      ['Hiểu ý chính rồi mới luyện tập', 'Chọn đại một đáp án cho nhanh', 'Học thuộc từng chữ mà không hiểu', 'Làm bài mà không đọc yêu cầu'],
      'Hiểu ý chính rồi mới luyện tập',
      `Học đúng cách sẽ giúp con nhớ lâu và làm bài chắc hơn. ${citation}`,
      seed('generic-method'),
    ),
    makeQuestion(
      `Khi phân vân ở bài "${lessonName}", con nên làm gì trước?`,
      ['Xem lại ý chính và ví dụ trong bài học', 'Bấm ngẫu nhiên rồi xem may mắn', 'Bỏ qua luôn vì chắc chắn quá khó', 'Đổi đáp án liên tục mà không suy nghĩ'],
      'Xem lại ý chính và ví dụ trong bài học',
      `Khi chưa chắc, con nên quay lại ý chính và ví dụ để hiểu lại bài. ${citation}`,
      seed('generic-review'),
    ),
    makeQuestion(
      `Bài "${lessonName}" muốn con làm được điều gì?`,
      [keyIdea, supportIdea, applyIdea, 'Không cần liên hệ kiến thức với thực tế'],
      keyIdea,
      `${keyIdea} ${citation}`,
      seed('generic-main'),
    ),
  ];
}

export function generateKnttLessonQuestions(topic, count = 8, seedInput = '') {
  const source = topic.knttSource || {};
  const lessonName = cleanLessonTitle({
    ssgkTitle: source.lesson || topic.title,
    displayTitle: topic.title,
  }) || topic.title;
  const citation = citationNote(source);
  const questions = topic.subject === 'sci'
    ? buildScienceQuestions(topic, lessonName, citation, seedInput)
    : buildGenericLessonQuestions(topic, lessonName, citation, seedInput);

  return questions.slice(0, Math.max(6, Math.min(count, questions.length)));
}

function buildKnttNonMathTopics(subject, lessons) {
  return lessons
    .filter(entry => !isSupplementaryBackmatter(entry))
    .map((entry, index, filteredLessons) => {
    const readingBlock = buildFullReadingPageBlock(filteredLessons, index, entry);
    const sourcePages = buildSourcePageRefs(filteredLessons, index, entry);
    const theoryBlock = buildSourceTheoryBlock(entry, sourcePages);

    // Choose the best question generator for this subject/skill.
    // generateKnttLessonQuestions is NEVER used — it produces meta study-habit
    // questions ("con đang học nội dung nào?") that have zero educational value.
    // If a subject has no specific generator, generator = null → topic relies
    // on its questionPool (which gets filled by PPTX/supplemental sources).
    let generator = null;
    if (subject === 'vie')     generator = generateVietnameseQuestions;
    else if (subject === 'sci')     generator = generateSciKnttQuestions;
    else if (subject === 'it')      generator = generateItQuestions;
    else if (subject === 'histgeo') generator = generateHistgeoQuestions;
    else if (subject === 'tech')    generator = generateTechQuestions;
    else if (subject === 'music')   generator = generateMusicQuestions;
    else if (subject === 'ethics')  generator = generateEthicsQuestions;
    else if (subject === 'life')    generator = generateLifeQuestions;
    else if (subject === 'pe')      generator = generatePeQuestions;
    else if (subject === 'art')     generator = generateArtQuestions;

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
      result.push(...buildKnttMathTopics(lessons.filter(entry => !isSupplementaryBackmatter(entry))));
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
