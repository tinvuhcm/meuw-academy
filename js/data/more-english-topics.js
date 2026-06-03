import { getOfficialEnglishTheory } from './official-theory-snippets.js';
const TEACHER = 'Gâu tiên sinh';

function buildEnglishUnit({ topicKey, title, introTitle, introPoints, example, words }) {
  const questionPool = [];

  words.forEach((word, index) => {
    const distractorWords = words.filter((_, otherIndex) => otherIndex !== index);
    const distractorsVi = distractorWords.slice(0, 3).map(item => item.vi);
    const distractorsEn = distractorWords.slice(0, 3).map(item => item.en);

    questionPool.push({
      type: 'multiple-choice',
      question: `Từ "${word.en}" có nghĩa là gì?`,
      options: [word.vi, ...distractorsVi],
      answer: word.vi,
      explanation: `"${word.en}" nghĩa là "${word.vi}". ${word.note || ''}`.trim(),
    });

    questionPool.push({
      type: 'multiple-choice',
      question: `Từ tiếng Anh nào đúng với nghĩa "${word.vi}"?`,
      options: [word.en, ...distractorsEn],
      answer: word.en,
      explanation: `Nghĩa "${word.vi}" đi với từ tiếng Anh "${word.en}". ${word.note || ''}`.trim(),
    });

    if (word.en.replace(/\s+/g, '').length >= 5) {
      const lettersOnly = word.en.replace(/[^A-Za-z]/g, '');
      const hiddenIndex = Math.min(2, lettersOnly.length - 2);
      const missing = lettersOnly[hiddenIndex].toLowerCase();
      const pattern = lettersOnly.slice(0, hiddenIndex) + '_' + lettersOnly.slice(hiddenIndex + 1);
      questionPool.push({
        type: 'multiple-choice',
        question: `Chữ cái nào còn thiếu trong từ "${pattern}" (${word.vi})?`,
        options: [missing, 'a', 'e', 'o'].filter((option, optionIndex, arr) => arr.indexOf(option) === optionIndex).slice(0, 4),
        answer: missing,
        explanation: `Từ đúng là "${lettersOnly}". ${word.note || ''}`.trim(),
      });
    }
  });

  const theory = getOfficialEnglishTheory(topicKey);
  return {
    topicKey,
    subject: 'eng',
    title,
    lessonBlocks: [{
      type: 'micro',
      teacherName: TEACHER,
      title: introTitle,
      sourceLabel: theory?.sourceLabel || 'Nguồn tham chiếu: Family & Friends 4 / English 4',
      points: theory?.points || introPoints,
      example: theory?.example || example,
    }],
    questionPool,
  };
}

function buildSentenceTopic({ topicKey, title, introTitle, introPoints, example, questionPool }) {
  const theory = getOfficialEnglishTheory(topicKey);
  return {
    topicKey,
    subject: 'eng',
    title,
    lessonBlocks: [{
      type: 'micro',
      teacherName: TEACHER,
      title: introTitle,
      sourceLabel: theory?.sourceLabel || 'Nguồn tham chiếu: Family & Friends 4 / English 4',
      points: theory?.points || introPoints,
      example: theory?.example || example,
    }],
    questionPool,
  };
}

export const MORE_ENGLISH_TOPICS = [
  buildEnglishUnit({
    topicKey: 'eng:ff4-jobs',
    title: 'Tiếng Anh: Family & Friends 4 - Jobs',
    introTitle: 'Nghề nghiệp nên học gắn với nơi làm việc và việc làm',
    introPoints: ['Doctor works in a hospital.', 'Teacher teaches students at school.'],
    example: 'My mother is a nurse. She helps sick people.',
    words: [
      { en: 'doctor', vi: 'bác sĩ' }, { en: 'teacher', vi: 'giáo viên' }, { en: 'farmer', vi: 'nông dân' }, { en: 'nurse', vi: 'y tá' },
      { en: 'cook', vi: 'đầu bếp' }, { en: 'driver', vi: 'tài xế' }, { en: 'pilot', vi: 'phi công' }, { en: 'firefighter', vi: 'lính cứu hỏa' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-feelings',
    title: 'Tiếng Anh: Family & Friends 4 - Feelings',
    introTitle: 'Từ chỉ cảm xúc giúp bé nói về bản thân',
    introPoints: ['Happy là vui, sad là buồn.', 'Hãy gắn từ với nét mặt để nhớ nhanh hơn.'],
    example: 'I feel excited because today is my birthday.',
    words: [
      { en: 'happy', vi: 'vui' }, { en: 'sad', vi: 'buồn' }, { en: 'angry', vi: 'giận dữ' }, { en: 'scared', vi: 'sợ hãi' },
      { en: 'excited', vi: 'háo hức' }, { en: 'tired', vi: 'mệt' }, { en: 'hungry', vi: 'đói' }, { en: 'thirsty', vi: 'khát' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-classroom',
    title: 'Tiếng Anh: Family & Friends 4 - Classroom language',
    introTitle: 'Cụm từ lớp học xuất hiện nhiều trong tiết học',
    introPoints: ['Nghe hiểu classroom language giúp bé theo kịp giáo viên.', 'Học theo mệnh lệnh ngắn rất hiệu quả.'],
    example: 'Open your book and listen carefully.',
    words: [
      { en: 'open your book', vi: 'mở sách ra' }, { en: 'close your book', vi: 'đóng sách lại' }, { en: 'listen carefully', vi: 'nghe cẩn thận' }, { en: 'work in pairs', vi: 'làm việc theo cặp' },
      { en: 'sit down', vi: 'ngồi xuống' }, { en: 'stand up', vi: 'đứng lên' }, { en: 'raise your hand', vi: 'giơ tay lên' }, { en: 'be quiet', vi: 'giữ im lặng' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-kitchen',
    title: 'Tiếng Anh: Family & Friends 4 - Kitchen and cooking',
    introTitle: 'Đồ dùng nhà bếp nên học cùng hoạt động nấu ăn',
    introPoints: ['Bowl, spoon, plate là đồ rất quen thuộc.', 'Có thể tưởng tượng đang phụ giúp trong bếp.'],
    example: 'Put the soup in the bowl and use a spoon.',
    words: [
      { en: 'bowl', vi: 'cái bát' }, { en: 'plate', vi: 'cái đĩa' }, { en: 'spoon', vi: 'cái muỗng' }, { en: 'fork', vi: 'cái nĩa' },
      { en: 'knife', vi: 'con dao' }, { en: 'pan', vi: 'cái chảo' }, { en: 'pot', vi: 'cái nồi' }, { en: 'cook', vi: 'nấu ăn' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-time-calendar',
    title: 'Tiếng Anh: Family & Friends 4 - Time and calendar',
    introTitle: 'Thời gian cần gắn với lịch sinh hoạt hằng ngày',
    introPoints: ['Today, tomorrow, yesterday là bộ rất quen thuộc.', 'Weekdays giúp bé nói lịch học và kế hoạch.'],
    example: 'Tomorrow is Tuesday and I have English.',
    words: [
      { en: 'today', vi: 'hôm nay' }, { en: 'tomorrow', vi: 'ngày mai' }, { en: 'yesterday', vi: 'hôm qua' }, { en: 'Monday', vi: 'thứ Hai' },
      { en: 'Tuesday', vi: 'thứ Ba' }, { en: 'Wednesday', vi: 'thứ Tư' }, { en: 'weekend', vi: 'cuối tuần' }, { en: 'calendar', vi: 'lịch' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-community',
    title: 'Tiếng Anh: Family & Friends 4 - Community places',
    introTitle: 'Địa điểm cộng đồng nên đi cùng chức năng',
    introPoints: ['Post office là nơi gửi thư.', 'Police station là nơi cảnh sát làm việc.'],
    example: 'My father goes to the bank to get money.',
    words: [
      { en: 'bank', vi: 'ngân hàng' }, { en: 'post office', vi: 'bưu điện' }, { en: 'police station', vi: 'đồn cảnh sát' }, { en: 'bus stop', vi: 'trạm xe buýt' },
      { en: 'market', vi: 'chợ' }, { en: 'zoo', vi: 'sở thú' }, { en: 'stadium', vi: 'sân vận động' }, { en: 'bridge', vi: 'cây cầu' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-pets',
    title: 'Tiếng Anh: Family & Friends 4 - Pets',
    introTitle: 'Thú cưng là chủ đề dễ gắn cảm xúc',
    introPoints: ['Nhắc đến thú cưng thật ở nhà sẽ rất dễ nhớ.', 'Có thể học thêm hoạt động của từng con vật.'],
    example: 'My puppy is playful and my kitten is sleepy.',
    words: [
      { en: 'puppy', vi: 'chó con' }, { en: 'kitten', vi: 'mèo con' }, { en: 'parrot', vi: 'con vẹt' }, { en: 'goldfish', vi: 'cá vàng' },
      { en: 'hamster', vi: 'chuột hamster' }, { en: 'rabbit', vi: 'thỏ' }, { en: 'cage', vi: 'cái lồng' }, { en: 'pet food', vi: 'thức ăn cho thú cưng' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-opposites',
    title: 'Tiếng Anh: Family & Friends 4 - Opposites',
    introTitle: 'Học từ trái nghĩa theo cặp giúp nhớ bền hơn',
    introPoints: ['Big đi với small, fast đi với slow.', 'Nói cả cặp sẽ dễ bật ra hơn khi làm bài.'],
    example: 'The elephant is big, but the mouse is small.',
    words: [
      { en: 'big', vi: 'to' }, { en: 'small', vi: 'nhỏ' }, { en: 'fast', vi: 'nhanh' }, { en: 'slow', vi: 'chậm' },
      { en: 'strong', vi: 'khỏe' }, { en: 'weak', vi: 'yếu' }, { en: 'clean', vi: 'sạch' }, { en: 'dirty', vi: 'bẩn' },
    ],
  }),
  buildSentenceTopic({
    topicKey: 'eng:ff4-be-have',
    title: 'Tiếng Anh: Family & Friends 4 - be / have got',
    introTitle: 'Hai mẫu câu rất quan trọng là be và have got',
    introPoints: ['I am / He is dùng để nói về người, trạng thái.', 'Have got dùng để nói có cái gì hoặc có bộ phận gì.'],
    example: 'She is kind. He has got a blue backpack.',
    questionPool: [
      { type: 'multiple-choice', question: 'Chọn câu đúng: ____ my best friend.', options: ['She is', 'She are', 'She am', 'She have'], answer: 'She is', explanation: 'Với chủ ngữ she, động từ be đúng là is.' },
      { type: 'multiple-choice', question: 'Chọn câu đúng: I ____ a new ruler.', options: ['have got', 'has got', 'is got', 'am got'], answer: 'have got', explanation: 'Với chủ ngữ I, ta dùng have got.' },
      { type: 'multiple-choice', question: 'Câu nào đúng?', options: ['He has got two cats.', 'He have got two cats.', 'He is got two cats.', 'He got has two cats.'], answer: 'He has got two cats.', explanation: 'Với he, have got đổi thành has got.' },
      { type: 'multiple-choice', question: 'Điền từ đúng: They ____ happy today.', options: ['are', 'is', 'am', 'has'], answer: 'are', explanation: 'Với they, động từ be đúng là are.' },
      { type: 'multiple-choice', question: 'Câu "Lan có mái tóc dài" viết đúng là:', options: ['Lan has got long hair.', 'Lan have got long hair.', 'Lan is got long hair.', 'Lan am long hair.'], answer: 'Lan has got long hair.', explanation: 'Với Lan/she, ta dùng has got.' },
      { type: 'multiple-choice', question: 'Câu hỏi đúng là:', options: ['Have you got a bike?', 'Has you got a bike?', 'Are you got a bike?', 'Do you is a bike?'], answer: 'Have you got a bike?', explanation: 'Với you, câu hỏi have got bắt đầu bằng Have.' },
      { type: 'multiple-choice', question: 'Chọn câu phủ định đúng:', options: ['She is not tired.', 'She not is tired.', 'She are not tired.', 'She has not tired.'], answer: 'She is not tired.', explanation: 'Phủ định của is là is not.' },
      { type: 'multiple-choice', question: 'Chọn câu đúng:', options: ['We have got a small garden.', 'We has got a small garden.', 'We is a small garden.', 'We are got a small garden.'], answer: 'We have got a small garden.', explanation: 'Với we, dùng have got.' },
    ],
  }),
  buildSentenceTopic({
    topicKey: 'eng:ff4-present-simple',
    title: 'Tiếng Anh: Family & Friends 4 - Present simple',
    introTitle: 'Thì hiện tại đơn dùng cho thói quen hằng ngày',
    introPoints: ['I/You/We/They dùng động từ nguyên mẫu.', 'He/She dùng động từ thêm s hoặc es trong câu khẳng định.'],
    example: 'I walk to school. My brother walks to school.',
    questionPool: [
      { type: 'multiple-choice', question: 'Chọn câu đúng:', options: ['He plays football after school.', 'He play football after school.', 'He playing football after school.', 'He is play football after school.'], answer: 'He plays football after school.', explanation: 'Với he, động từ ở hiện tại đơn thêm s: plays.' },
      { type: 'multiple-choice', question: 'Điền từ đúng: They ____ breakfast at 6:30.', options: ['eat', 'eats', 'is eating', 'ate'], answer: 'eat', explanation: 'Với they, dùng động từ nguyên mẫu eat.' },
      { type: 'multiple-choice', question: 'Câu hỏi đúng là:', options: ['Does she like music?', 'Do she like music?', 'Is she like music?', 'Does she likes music?'], answer: 'Does she like music?', explanation: 'Câu hỏi với she ở hiện tại đơn dùng Does + động từ nguyên mẫu.' },
      { type: 'multiple-choice', question: 'Chọn câu phủ định đúng:', options: ['I do not watch TV in the morning.', 'I does not watch TV in the morning.', 'I not watch TV in the morning.', 'I am not watch TV in the morning.'], answer: 'I do not watch TV in the morning.', explanation: 'Với I, phủ định hiện tại đơn là do not + động từ nguyên mẫu.' },
      { type: 'multiple-choice', question: 'Câu "Mẹ em nấu bữa tối mỗi ngày" viết đúng là:', options: ['My mother cooks dinner every day.', 'My mother cook dinner every day.', 'My mother is cook dinner every day.', 'My mother cooking dinner every day.'], answer: 'My mother cooks dinner every day.', explanation: 'Với My mother/she, động từ thêm s: cooks.' },
      { type: 'multiple-choice', question: 'Điền từ đúng: ____ your friends walk to school?', options: ['Do', 'Does', 'Is', 'Has'], answer: 'Do', explanation: 'Với your friends/they, câu hỏi hiện tại đơn dùng Do.' },
      { type: 'multiple-choice', question: 'Chọn câu đúng:', options: ['Nam brushes his teeth before bed.', 'Nam brush his teeth before bed.', 'Nam brushing his teeth before bed.', 'Nam do brush his teeth before bed.'], answer: 'Nam brushes his teeth before bed.', explanation: 'Brush với he/she/Nam thêm es thành brushes.' },
      { type: 'multiple-choice', question: 'Câu nào đúng về thói quen?', options: ['We go to the park on Sundays.', 'We goes to the park on Sundays.', 'We is going to the park on Sundays.', 'We going to the park on Sundays.'], answer: 'We go to the park on Sundays.', explanation: 'Với we, dùng động từ nguyên mẫu go.' },
    ],
  }),
  buildSentenceTopic({
    topicKey: 'eng:ff4-reading-short',
    title: 'Tiếng Anh: Family & Friends 4 - Short reading',
    introTitle: 'Đọc hiểu ngắn giúp nối từ vựng với câu thật',
    introPoints: ['Đọc câu hỏi trước để biết cần tìm thông tin gì.', 'Để ý tên người, thời gian và hoạt động chính.'],
    example: 'Tom gets up at six. He goes to school by bus.',
    questionPool: [
      { type: 'multiple-choice', passage: 'Mai gets up at six o’clock. She has breakfast with her family and goes to school by bike.', question: 'How does Mai go to school?', options: ['By bike', 'By bus', 'On foot', 'By train'], answer: 'By bike', explanation: 'The passage says Mai goes to school by bike.' },
      { type: 'multiple-choice', passage: 'Ben likes animals. On Sundays he visits the zoo with his dad and takes photos of monkeys and elephants.', question: 'Where does Ben go on Sundays?', options: ['The zoo', 'The museum', 'The beach', 'The library'], answer: 'The zoo', explanation: 'The passage says he visits the zoo on Sundays.' },
      { type: 'multiple-choice', passage: 'Lucy is hungry after school. She drinks milk and eats bread before doing her homework.', question: 'What does Lucy drink?', options: ['Milk', 'Juice', 'Water', 'Tea'], answer: 'Milk', explanation: 'The passage says Lucy drinks milk.' },
      { type: 'multiple-choice', passage: 'My classroom is big and bright. There are twenty desks, a board, and two windows.', question: 'How many windows are there?', options: ['Two', 'Three', 'Twenty', 'One'], answer: 'Two', explanation: 'The passage says there are two windows.' },
      { type: 'multiple-choice', passage: 'It is rainy today, so Sam wears boots and takes an umbrella to school.', question: 'Why does Sam take an umbrella?', options: ['Because it is rainy', 'Because it is sunny', 'Because it is windy', 'Because it is hot'], answer: 'Because it is rainy', explanation: 'The first sentence says it is rainy today.' },
      { type: 'multiple-choice', passage: 'Emma has got a pet rabbit. It is white and small. It likes carrots.', question: 'What color is the rabbit?', options: ['White', 'Black', 'Brown', 'Grey'], answer: 'White', explanation: 'The passage says the rabbit is white and small.' },
      { type: 'multiple-choice', passage: 'Dad is a firefighter. He works at the fire station and helps people when there is a fire.', question: 'What is Dad’s job?', options: ['A firefighter', 'A doctor', 'A teacher', 'A cook'], answer: 'A firefighter', explanation: 'The passage says Dad is a firefighter.' },
      { type: 'multiple-choice', passage: 'On Saturday, my family goes to the market. We buy vegetables, fish, and fruit for the week.', question: 'What do they buy?', options: ['Vegetables, fish, and fruit', 'Books and pencils', 'Shoes and hats', 'Toys and games'], answer: 'Vegetables, fish, and fruit', explanation: 'The last sentence lists what they buy.' },
    ],
  }),
];
