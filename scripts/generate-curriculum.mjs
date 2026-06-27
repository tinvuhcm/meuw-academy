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
  { key: 'math_t1', label: 'Ôn tập số tự nhiên', types: ['add', 'sub'] },
  { key: 'math_t2', label: 'Số có nhiều chữ số', types: ['place_value'] },
  { key: 'math_t3', label: 'Phép nhân', types: ['mul'] },
  { key: 'math_t4', label: 'Phép chia', types: ['div'] },
  { key: 'math_t5', label: 'Dấu hiệu chia hết', types: ['div_rules'] },
  { key: 'math_t6', label: 'Phân số', types: ['fraction_compare', 'fraction_add', 'fraction_sub'] },
  { key: 'math_t7', label: 'Hình học', types: ['geometry'] },
  { key: 'math_t8', label: 'Đo lường', types: ['measure'] }
];

// Khung Tiếng Việt 4 - KNTT
const VIE_TOPICS = [
  { key: 'vie_t1', label: 'Luyện từ và câu: Danh từ, Động từ, Tính từ', types: ['word_type'] },
  { key: 'vie_t2', label: 'Đọc hiểu: Tình cảm gia đình, Quê hương', types: ['reading'] },
  { key: 'vie_t3', label: 'Tập làm văn: Miêu tả', types: ['writing'] },
  { key: 'vie_t4', label: 'Luyện từ và câu: Biện pháp tu từ', types: ['rhetoric'] }
];

// Anh văn 4 - Family & Friends
const ENG_TOPICS = [
  { key: 'eng_u1', label: 'Unit 1: They are from Egypt', types: ['countries', 'present_simple'] },
  { key: 'eng_u2', label: 'Unit 2: My weekend', types: ['hobbies', 'present_continuous'] },
  { key: 'eng_u3', label: 'Unit 3: My things', types: ['belongings', 'possessive'] },
  { key: 'eng_u4', label: 'Unit 4: We are having fun', types: ['sports', 'action'] },
  { key: 'eng_u5', label: 'Unit 5: A naughty monkey', types: ['animals', 'adjectives'] }
];

// Khoa học, Lịch sử, Địa lý, Tin học, Âm nhạc, Mỹ thuật (Mở rộng)
const SCI_TOPICS = [
  { key: 'sci_1', label: 'Khoa học: Nước và Không khí' },
  { key: 'sci_2', label: 'Khoa học: Âm thanh và Ánh sáng' },
  { key: 'sci_3', label: 'Khoa học: Nhu cầu sống của thực vật, động vật' }
];

const GEO_HIS_TOPICS = [
  { key: 'geo_1', label: 'Địa lý: Thiên nhiên Việt Nam' },
  { key: 'his_1', label: 'Lịch sử: Buổi đầu độc lập' }
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
    const a = randomInt(1000, 9000);
    const b = randomInt(1000, 9000);
    q.question = `${a} + ${b} = ?`;
    q.answer = `${a + b}`;
    q.options = [q.answer, `${a + b + 10}`, `${a + b - 100}`].sort(() => Math.random() - 0.5);
    q.explanation = `Ta thực hiện phép cộng từ phải sang trái. ${a} + ${b} = ${a + b}.`;
  } else if (type === 'mul') {
    const a = randomInt(10, 99);
    const b = randomInt(2, 9);
    q.question = `${a} × ${b} = ?`;
    q.answer = `${a * b}`;
    q.options = [q.answer, `${a * b + 10}`, `${(a+1) * b}`].sort(() => Math.random() - 0.5);
    q.explanation = `Thực hiện phép nhân: ${a} × ${b} = ${a * b}.`;
  } else if (type === 'fraction_compare') {
    const a = randomInt(1, 5), b = randomInt(6, 10);
    const c = randomInt(1, 5), d = randomInt(6, 10);
    q.question = `Phân số nào lớn hơn: ${a}/${b} hay ${c}/${d}? (Giả sử quy đồng)`;
    // Cấp độ 4: simplifying
    const v1 = a/b, v2 = c/d;
    q.answer = v1 > v2 ? `${a}/${b}` : (v1 < v2 ? `${c}/${d}` : 'Bằng nhau');
    q.options = [`${a}/${b}`, `${c}/${d}`, 'Bằng nhau'];
    q.explanation = `Ta quy đồng mẫu số hoặc so sánh với 1 để tìm ra phân số lớn hơn.`;
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
  if (topic.types.includes('word_type')) {
    const words = ['chạy', 'nhảy', 'xinh đẹp', 'hiền lành', 'ngôi nhà', 'con mèo'];
    const w = pickRandom(words);
    q.question = `Từ "${w}" thuộc từ loại nào?`;
    if (['chạy', 'nhảy'].includes(w)) q.answer = 'Động từ';
    else if (['xinh đẹp', 'hiền lành'].includes(w)) q.answer = 'Tính từ';
    else q.answer = 'Danh từ';
    q.options = ['Danh từ', 'Động từ', 'Tính từ'].sort(() => Math.random() - 0.5);
    q.explanation = `Từ chỉ hoạt động là Động từ, chỉ đặc điểm là Tính từ, chỉ sự vật là Danh từ.`;
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
  q.question = `Chọn nghĩa đúng của từ: "Country"`;
  q.answer = 'Đất nước / Quốc gia';
  q.options = ['Đất nước / Quốc gia', 'Thành phố', 'Trường học'];
  q.explanation = `Country có nghĩa là Đất nước.`;
  return q;
}

function generateSciGeoHisQuestion(subj) {
  let q = { type: 'multiple-choice' };
  if (subj === 'sci') {
    q.question = `Nước có những tính chất gì?`;
    q.answer = 'Không màu, không mùi, không vị';
    q.options = ['Không màu, không mùi, không vị', 'Có màu xanh, có vị ngọt', 'Màu trắng, có mùi thơm'];
    q.explanation = `Nước tinh khiết trong suốt, không màu, không mùi và không vị.`;
  } else if (subj === 'geo') {
    q.question = `Đỉnh núi nào cao nhất Việt Nam?`;
    q.answer = 'Fansipan';
    q.options = ['Fansipan', 'Trường Sơn', 'Hoàng Liên Sơn'];
    q.explanation = `Fansipan là đỉnh núi cao nhất Việt Nam và toàn Đông Dương.`;
  } else if (subj === 'his') {
    q.question = `Chiến thắng Bạch Đằng năm 938 do ai lãnh đạo?`;
    q.answer = 'Ngô Quyền';
    q.options = ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo'];
    q.explanation = `Ngô Quyền lãnh đạo nhân dân đánh bại quân Nam Hán trên sông Bạch Đằng.`;
  } else {
    q.question = `Câu hỏi vui về ${subj}`;
    q.answer = 'Đúng';
    q.options = ['Đúng', 'Sai'];
    q.explanation = `Đây là kiến thức chung.`;
  }
  return q;
}

function generateModule(dayIndex, modIndex, subjectDist) {
  // Determine subject based on distribution
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
  const id = `d${dayIndex}-${session}-${modIndex}`;

  let moduleData = {
    id,
    session,
    subject: subj,
    xp: 50,
    questions: []
  };

  // Assign Topic based on subject
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
    const topic = pickRandom(SCI_TOPICS);
    moduleData.topicKey = topic.key;
    moduleData.title = topic.label;
    for (let i = 0; i < 5; i++) moduleData.questions.push(generateSciGeoHisQuestion('sci'));
  } else {
    // Minor subjects
    const subjs = ['geo', 'his', 'it', 'art', 'music'];
    const s = pickRandom(subjs);
    moduleData.subject = s;
    if (s === 'geo' || s === 'his') {
      const topic = pickRandom(GEO_HIS_TOPICS);
      moduleData.topicKey = topic.key;
      moduleData.title = topic.label;
    } else {
      const topic = pickRandom(MINOR_TOPICS);
      moduleData.topicKey = topic.key;
      moduleData.title = topic.label;
      moduleData.subject = topic.subject;
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
        title: `Ngày ${currentDay}: Hành trình tri thức`,
        modules: []
      };

      for (let mod = 1; mod <= MODULES_PER_DAY; mod++) {
        monthData[dayKey].modules.push(generateModule(currentDay, mod, distribution));
      }
      currentDay++;
    }

    const outputStr = `/**
 * Méo ACADEMY — curriculum-m${m}.js
 * Month ${m}
 * Generated automatically by generate-curriculum.mjs
 */

export const M${m}_DATA = ${JSON.stringify(monthData, null, 2)};
`;
    
    fs.writeFileSync(path.join(OUT_DIR, `curriculum-m${m}.js`), outputStr);
    console.log(`Generated curriculum-m${m}.js with ${daysInMonth} days.`);
  }

  console.log("Xong! Đã sinh đủ 365 ngày.");
}

main().catch(console.error);
