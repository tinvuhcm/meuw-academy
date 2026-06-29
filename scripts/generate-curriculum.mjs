import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'js/data/grade-4');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const TOTAL_DAYS = 365;
const MODULES_PER_DAY = 24; // 14 AM, 10 PM

// Khung SGK Toán 4 - Kết nối tri thức
const MATH_TOPICS = [
  { key: 'math_t1', label: 'Ôn tập số tự nhiên', types: ['add', 'sub', 'seq'] },
  { key: 'math_t2', label: 'Số có nhiều chữ số', types: ['place_value', 'compare'] },
  { key: 'math_t3', label: 'Phép nhân', types: ['mul', 'mul_word_problem'] },
  { key: 'math_t4', label: 'Phép chia', types: ['div', 'div_word_problem'] },
  { key: 'math_t5', label: 'Dấu hiệu chia hết', types: ['div_rules_2', 'div_rules_5', 'div_rules_3'] },
  { key: 'math_t6', label: 'Phân số', types: ['fraction_compare', 'fraction_add', 'fraction_sub'] },
  { key: 'math_t7', label: 'Hình học', types: ['geometry_area', 'geometry_perimeter'] },
  { key: 'math_t8', label: 'Đo lường', types: ['measure_weight', 'measure_length'] }
];

// Khung Tiếng Việt 4 - KNTT
const VIE_TOPICS = [
  { key: 'vie_t1', label: 'Luyện từ và câu: Danh từ, Động từ, Tính từ', types: ['word_type'] },
  { key: 'vie_t2', label: 'Thành phần câu: Chủ ngữ, Vị ngữ', types: ['sentence_structure'] },
  { key: 'vie_t3', label: 'Mở rộng vốn từ: Nhân hậu, Đoàn kết', types: ['synonym', 'antonym'] },
  { key: 'vie_t4', label: 'Biện pháp tu từ: So sánh, Nhân hóa', types: ['rhetoric'] }
];

// Anh văn 4 - Family & Friends
const ENG_WORDS = [
  { word: 'Country', meaning: 'Đất nước' }, { word: 'Weekend', meaning: 'Cuối tuần' },
  { word: 'Hobby', meaning: 'Sở thích' }, { word: 'Monkey', meaning: 'Con khỉ' },
  { word: 'Library', meaning: 'Thư viện' }, { word: 'Museum', meaning: 'Bảo tàng' },
  { word: 'Playground', meaning: 'Sân chơi' }, { word: 'Cinema', meaning: 'Rạp chiếu phim' },
  { word: 'Cafe', meaning: 'Quán cà phê' }, { word: 'Shopping mall', meaning: 'Trung tâm mua sắm' },
  { word: 'Lake', meaning: 'Hồ nước' }, { word: 'Mountain', meaning: 'Ngọn núi' }
];

const ENG_TOPICS = [
  { key: 'eng_u1', label: 'Unit 1-3: Từ vựng & Hiện tại đơn', types: ['vocab', 'present_simple'] },
  { key: 'eng_u2', label: 'Unit 4-6: Hiện tại tiếp diễn', types: ['vocab', 'present_continuous'] },
  { key: 'eng_u3', label: 'Unit 7-9: Tính từ sở hữu', types: ['vocab', 'possessive'] }
];

const SCI_QUESTIONS = [
  { q: 'Nước có những tính chất gì?', a: 'Không màu, không mùi, không vị', w1: 'Màu xanh, có mùi thơm', w2: 'Màu trắng, vị ngọt' },
  { q: 'Không khí bao gồm các thành phần chính nào?', a: 'Khí nitơ, khí ô-xi', w1: 'Chỉ có khí ô-xi', w2: 'Khí các-bo-níc và bụi' },
  { q: 'Ánh sáng có thể truyền qua vật nào dưới đây?', a: 'Tấm kính trong', w1: 'Tấm gỗ', w2: 'Tấm nhôm' },
  { q: 'Thực vật cần gì để quang hợp?', a: 'Ánh sáng, nước, khí các-bo-níc', w1: 'Chỉ cần nước', w2: 'Bóng tối và khí ô-xi' },
  { q: 'Âm thanh truyền tốt nhất trong môi trường nào?', a: 'Chất rắn', w1: 'Chất khí', w2: 'Chân không' }
];

const GEO_HIS_QUESTIONS = [
  { q: 'Đỉnh núi nào cao nhất Việt Nam?', a: 'Fansipan', w1: 'Trường Sơn', w2: 'Bạch Mã', subj: 'geo' },
  { q: 'Sông nào dài nhất chảy qua Việt Nam?', a: 'Sông Mê Kông', w1: 'Sông Hồng', w2: 'Sông Đồng Nai', subj: 'geo' },
  { q: 'Chiến thắng Bạch Đằng năm 938 do ai lãnh đạo?', a: 'Ngô Quyền', w1: 'Lý Thường Kiệt', w2: 'Trần Hưng Đạo', subj: 'his' },
  { q: 'Vị vua nào dời đô về Thăng Long năm 1010?', a: 'Lý Thái Tổ', w1: 'Đinh Tiên Hoàng', w2: 'Lê Lợi', subj: 'his' }
];

const MINOR_TOPICS = [
  { key: 'it_1', label: 'Tin học: Khám phá máy tính', subject: 'it' },
  { key: 'art_1', label: 'Mỹ thuật: Sắc màu quanh em', subject: 'art' },
  { key: 'music_1', label: 'Âm nhạc: Giai điệu tuổi thơ', subject: 'music' }
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMathQuestion(topic) {
  let q = { type: 'multiple-choice', isMath: true };
  const type = pickRandom(topic.types);
  
  if (type === 'add') {
    const a = randomInt(1000, 9999), b = randomInt(1000, 9999);
    q.question = `${a} + ${b} = ?`;
    q.answer = `${a + b}`;
    q.options = [q.answer, `${a + b + randomInt(1, 10)*10}`, `${a + b - randomInt(1, 10)*10}`].sort(() => Math.random() - 0.5);
    q.explanation = `Ta thực hiện phép cộng từ phải sang trái. Kết quả là ${a + b}.`;
  } else if (type === 'sub') {
    const a = randomInt(5000, 9999), b = randomInt(1000, 4999);
    q.question = `${a} - ${b} = ?`;
    q.answer = `${a - b}`;
    q.options = [q.answer, `${a - b + 100}`, `${a - b - 10}`].sort(() => Math.random() - 0.5);
    q.explanation = `Ta thực hiện phép trừ từ phải sang trái. Kết quả là ${a - b}.`;
  } else if (type === 'mul') {
    const a = randomInt(100, 999), b = randomInt(2, 9);
    q.question = `${a} × ${b} = ?`;
    q.answer = `${a * b}`;
    q.options = [q.answer, `${a * b + 10}`, `${(a+1) * b}`].sort(() => Math.random() - 0.5);
    q.explanation = `Thực hiện phép nhân: ${a} × ${b} = ${a * b}.`;
  } else if (type === 'mul_word_problem') {
    const a = randomInt(10, 50), b = randomInt(2, 9);
    q.question = `Một thùng có ${a} lít dầu. Hỏi ${b} thùng như thế có bao nhiêu lít dầu?`;
    q.answer = `${a * b}`;
    q.options = [q.answer, `${a * b + 10}`, `${a + b}`].sort(() => Math.random() - 0.5);
    q.explanation = `Lấy số dầu một thùng nhân với số thùng: ${a} × ${b} = ${a * b}.`;
  } else if (type === 'div') {
    const b = randomInt(2, 9), a = b * randomInt(100, 999);
    q.question = `${a} : ${b} = ?`;
    q.answer = `${a / b}`;
    q.options = [q.answer, `${a / b + 1}`, `${a / b - 1}`].sort(() => Math.random() - 0.5);
    q.explanation = `Thực hiện phép chia: ${a} : ${b} = ${a / b}.`;
  } else if (type === 'div_rules_2') {
    const a = randomInt(10, 99) * 2;
    const b = randomInt(10, 99) * 2 + 1;
    q.question = `Số nào sau đây chia hết cho 2?`;
    q.answer = `${a}`;
    q.options = [`${a}`, `${b}`, `${b+2}`].sort(() => Math.random() - 0.5);
    q.explanation = `Số chia hết cho 2 là số có chữ số tận cùng là 0, 2, 4, 6, 8.`;
  } else if (type === 'fraction_compare') {
    const a = randomInt(1, 5), b = randomInt(6, 10);
    const c = randomInt(1, 5), d = randomInt(6, 10);
    q.question = `Phân số nào lớn hơn: ${a}/${b} hay ${c}/${d}?`;
    const v1 = a/b, v2 = c/d;
    q.answer = v1 > v2 ? `${a}/${b}` : (v1 < v2 ? `${c}/${d}` : 'Bằng nhau');
    q.options = [`${a}/${b}`, `${c}/${d}`, 'Bằng nhau'];
    q.explanation = `Ta quy đồng mẫu số hoặc tính giá trị để tìm ra phân số lớn hơn.`;
  } else if (type === 'geometry_area') {
    const a = randomInt(5, 20), b = randomInt(5, 20);
    q.question = `Diện tích hình chữ nhật có chiều dài ${Math.max(a, b)}cm, chiều rộng ${Math.min(a, b)}cm là bao nhiêu?`;
    q.answer = `${a * b} cm²`;
    q.options = [`${a * b} cm²`, `${(a + b)*2} cm²`, `${a * b} cm`].sort(() => Math.random() - 0.5);
    q.explanation = `Diện tích hình chữ nhật = dài × rộng = ${Math.max(a,b)} × ${Math.min(a,b)} = ${a * b}.`;
  } else if (type === 'measure_weight') {
    const a = randomInt(2, 10);
    q.question = `${a} kg bằng bao nhiêu gam?`;
    q.answer = `${a * 1000} g`;
    q.options = [`${a * 1000} g`, `${a * 100} g`, `${a * 10} g`].sort(() => Math.random() - 0.5);
    q.explanation = `1 kg = 1000 g, nên ${a} kg = ${a * 1000} g.`;
  } else {
    // Fallback
    const a = randomInt(1, 100);
    q.question = `Số liền sau của ${a} là số nào?`;
    q.answer = `${a + 1}`;
    q.options = [q.answer, `${a - 1}`, `${a + 2}`].sort(() => Math.random() - 0.5);
    q.explanation = `Số liền sau lớn hơn số đó 1 đơn vị.`;
  }
  return q;
}

function generateVieQuestion(topic) {
  let q = { type: 'multiple-choice' };
  const type = pickRandom(topic.types);

  if (type === 'word_type') {
    const words = [
      { w: 'chạy', t: 'Động từ' }, { w: 'nhảy', t: 'Động từ' }, { w: 'hát', t: 'Động từ' },
      { w: 'xinh đẹp', t: 'Tính từ' }, { w: 'hiền lành', t: 'Tính từ' }, { w: 'cao lớn', t: 'Tính từ' },
      { w: 'ngôi nhà', t: 'Danh từ' }, { w: 'con mèo', t: 'Danh từ' }, { w: 'bầu trời', t: 'Danh từ' }
    ];
    const picked = pickRandom(words);
    q.question = `Từ "${picked.w}" thuộc từ loại nào?`;
    q.answer = picked.t;
    q.options = ['Danh từ', 'Động từ', 'Tính từ'].sort(() => Math.random() - 0.5);
    q.explanation = `Từ chỉ hoạt động là Động từ, chỉ đặc điểm là Tính từ, chỉ sự vật là Danh từ.`;
  } else if (type === 'sentence_structure') {
    const sentences = [
      { s: 'Con mèo đang bắt chuột.', cn: 'Con mèo', vn: 'đang bắt chuột' },
      { s: 'Bầu trời trong xanh.', cn: 'Bầu trời', vn: 'trong xanh' },
      { s: 'Mẹ em đang nấu cơm.', cn: 'Mẹ em', vn: 'đang nấu cơm' }
    ];
    const picked = pickRandom(sentences);
    const isSubject = Math.random() > 0.5;
    if (isSubject) {
      q.question = `Xác định Chủ ngữ trong câu: "${picked.s}"`;
      q.answer = picked.cn;
      q.options = [picked.cn, picked.vn, picked.s].sort(() => Math.random() - 0.5);
    } else {
      q.question = `Xác định Vị ngữ trong câu: "${picked.s}"`;
      q.answer = picked.vn;
      q.options = [picked.vn, picked.cn, picked.s].sort(() => Math.random() - 0.5);
    }
    q.explanation = `Chủ ngữ trả lời câu hỏi Ai/Cái gì. Vị ngữ trả lời câu hỏi Làm gì/Thế nào.`;
  } else if (type === 'synonym') {
    const pairs = [
      { w1: 'nhân hậu', w2: 'hiền lành', wrong: 'độc ác' },
      { w1: 'đoàn kết', w2: 'gắn bó', wrong: 'chia rẽ' },
      { w1: 'chăm chỉ', w2: 'siêng năng', wrong: 'lười biếng' }
    ];
    const picked = pickRandom(pairs);
    q.question = `Từ nào đồng nghĩa với từ "${picked.w1}"?`;
    q.answer = picked.w2;
    q.options = [picked.w2, picked.wrong, 'Cả hai từ trên'].sort(() => Math.random() - 0.5);
    q.explanation = `Từ đồng nghĩa là những từ có nghĩa giống nhau hoặc gần giống nhau.`;
  } else {
    q.question = `Đọc câu văn sau và cho biết nó dùng biện pháp tu từ gì: "Mặt trời rực rỡ như hòn lửa."`;
    q.answer = 'So sánh';
    q.options = ['So sánh', 'Nhân hóa', 'Ẩn dụ'];
    q.explanation = `Có từ "như" dùng để đối chiếu hai sự vật, đây là biện pháp So sánh.`;
  }
  return q;
}

function generateEngQuestion(topic) {
  let q = { type: 'multiple-choice' };
  const type = pickRandom(topic.types);

  if (type === 'vocab') {
    const picked = pickRandom(ENG_WORDS);
    q.question = `Nghĩa của từ "${picked.word}" là gì?`;
    q.answer = picked.meaning;
    
    let wrong1 = pickRandom(ENG_WORDS).meaning;
    while(wrong1 === picked.meaning) wrong1 = pickRandom(ENG_WORDS).meaning;
    let wrong2 = pickRandom(ENG_WORDS).meaning;
    while(wrong2 === picked.meaning || wrong2 === wrong1) wrong2 = pickRandom(ENG_WORDS).meaning;
    
    q.options = [q.answer, wrong1, wrong2].sort(() => Math.random() - 0.5);
    q.explanation = `Từ ${picked.word} có nghĩa là ${picked.meaning}.`;
  } else if (type === 'present_simple') {
    q.question = `Chọn từ đúng điền vào chỗ trống: "She ___ to school every day."`;
    q.answer = 'goes';
    q.options = ['goes', 'go', 'going'];
    q.explanation = `Chủ ngữ "She" ngôi thứ ba số ít, động từ chia ở thì hiện tại đơn thêm "es".`;
  } else {
    q.question = `Chọn từ đúng: "___ is reading a book." (Anh ấy)`;
    q.answer = 'He';
    q.options = ['He', 'She', 'They'];
    q.explanation = `Anh ấy trong tiếng Anh là "He".`;
  }
  return q;
}

function generateSciGeoHisQuestion(subj) {
  let q = { type: 'multiple-choice' };
  
  if (subj === 'sci') {
    const picked = pickRandom(SCI_QUESTIONS);
    q.question = picked.q;
    q.answer = picked.a;
    q.options = [picked.a, picked.w1, picked.w2].sort(() => Math.random() - 0.5);
    q.explanation = `Đây là kiến thức Khoa học lớp 4.`;
  } else if (subj === 'geo' || subj === 'his') {
    const filtered = GEO_HIS_QUESTIONS.filter(x => x.subj === subj);
    const picked = pickRandom(filtered.length > 0 ? filtered : GEO_HIS_QUESTIONS);
    q.question = picked.q;
    q.answer = picked.a;
    q.options = [picked.a, picked.w1, picked.w2].sort(() => Math.random() - 0.5);
    q.explanation = `Kiến thức Lịch sử & Địa lý.`;
  } else {
    const itArtMusic = ['Màu cơ bản gồm Đỏ, Vàng, Xanh dương.', 'Máy tính có bàn phím và chuột.', 'Nốt Đồ nằm ở dưới cùng của khuông nhạc.'];
    q.question = `Kiến thức: ${pickRandom(itArtMusic)}`;
    q.answer = 'Đúng';
    q.options = ['Đúng', 'Sai', 'Không biết'];
    q.explanation = `Kiến thức phổ thông.`;
  }
  return q;
}

function generateModule(dayIndex, modIndex, subjectDist) {
  const r = Math.random() * 100;
  let subj = '';
  let cumulative = 0;
  for (const [s, percent] of Object.entries(subjectDist)) {
    cumulative += percent;
    if (r <= cumulative) {
      subj = s;
      break;
    }
  }
  if (!subj) subj = 'math';

  const session = modIndex < 14 ? 'am' : 'pm';
  // V2 MIGRATION: Change ID prefix to avoid overlapping with user's old completed history!
  const id = `v2-d${dayIndex}-${session}-${modIndex}`;

  let moduleData = {
    id,
    session,
    subject: subj,
    xp: 50,
    questions: []
  };

  if (subj === 'math') {
    const topicIndex = Math.floor((dayIndex / TOTAL_DAYS) * MATH_TOPICS.length);
    const topic = MATH_TOPICS[Math.min(topicIndex, MATH_TOPICS.length - 1)];
    moduleData.topicKey = topic.key;
    moduleData.title = `Toán: ${topic.label}`;
    for (let i = 0; i < 5; i++) moduleData.questions.push(generateMathQuestion(topic));
  } else if (subj === 'vie') {
    const topicIndex = Math.floor((dayIndex / TOTAL_DAYS) * VIE_TOPICS.length);
    const topic = VIE_TOPICS[Math.min(topicIndex, VIE_TOPICS.length - 1)];
    moduleData.topicKey = topic.key;
    moduleData.title = `Tiếng Việt: ${topic.label}`;
    for (let i = 0; i < 5; i++) moduleData.questions.push(generateVieQuestion(topic));
  } else if (subj === 'eng') {
    const topicIndex = Math.floor((dayIndex / TOTAL_DAYS) * ENG_TOPICS.length);
    const topic = ENG_TOPICS[Math.min(topicIndex, ENG_TOPICS.length - 1)];
    moduleData.topicKey = topic.key;
    moduleData.title = `Anh Văn: ${topic.label}`;
    for (let i = 0; i < 5; i++) moduleData.questions.push(generateEngQuestion(topic));
  } else if (subj === 'sci') {
    moduleData.topicKey = 'sci';
    moduleData.title = 'Khoa học';
    for (let i = 0; i < 5; i++) moduleData.questions.push(generateSciGeoHisQuestion('sci'));
  } else {
    const subjs = ['geo', 'his', 'it', 'art', 'music'];
    const s = pickRandom(subjs);
    moduleData.subject = s;
    if (s === 'geo' || s === 'his') {
      moduleData.topicKey = s;
      moduleData.title = s === 'geo' ? 'Địa lý' : 'Lịch sử';
    } else {
      const topic = pickRandom(MINOR_TOPICS.filter(t => t.subject === s) || MINOR_TOPICS);
      moduleData.topicKey = topic.key;
      moduleData.title = topic.label;
    }
    for (let i = 0; i < 3; i++) moduleData.questions.push(generateSciGeoHisQuestion(s));
  }

  return moduleData;
}

const distribution = {
  math: 25,
  vie: 25,
  eng: 20,
  sci: 15,
  minor: 15
};

async function main() {
  const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let currentDay = 1;

  for (let m = 1; m <= 12; m++) {
    let monthData = {};
    const daysInMonth = daysPerMonth[m - 1];
    
    for (let d = 0; d < daysInMonth && currentDay <= TOTAL_DAYS; d++) {
      const dayKey = `day${currentDay}`;
      monthData[dayKey] = {
        title: `Ngày ${currentDay}: Hành trình tri thức (V2)`,
        modules: []
      };

      for (let mod = 1; mod <= MODULES_PER_DAY; mod++) {
        monthData[dayKey].modules.push(generateModule(currentDay, mod, distribution));
      }
      currentDay++;
    }

    const outputStr = `/**
 * MEUW ACADEMY — curriculum-m${m}.js
 * Month ${m}
 * Generated automatically by generate-curriculum.mjs (V2)
 */

export const M${m}_DATA = ${JSON.stringify(monthData, null, 2)};
`;
    
    fs.writeFileSync(path.join(OUT_DIR, `curriculum-m${m}.js`), outputStr);
    console.log(`Generated V2 curriculum-m${m}.js with ${daysInMonth} days.`);
  }

  console.log("Xong! Đã sinh đủ 365 ngày V2.");
}

main().catch(console.error);
