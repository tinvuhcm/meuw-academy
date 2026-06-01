import { MORE_ENGLISH_TOPICS } from './more-english-topics.js';
const TEACHER = 'Thầy Gâu lùn';

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

  return {
    topicKey,
    subject: 'eng',
    title,
    lessonBlocks: [{
      type: 'micro',
      teacherName: TEACHER,
      title: introTitle,
      points: introPoints,
      example,
    }],
    questionPool,
  };
}

export const CURATED_ENGLISH_TOPICS = [
  buildEnglishUnit({
    topicKey: 'eng:ff4-family',
    title: 'Tiếng Anh: Family & Friends 4 - Family',
    introTitle: 'Nhớ từ theo nhóm gia đình sẽ dễ hơn',
    introPoints: ['Đọc cả cụm từ thay vì chỉ nhìn từng chữ.', 'Liên tưởng tới người thật trong gia đình sẽ nhớ lâu hơn.'],
    example: 'This is my cousin. That is my aunt.',
    words: [
      { en: 'cousin', vi: 'anh/chị/em họ' }, { en: 'aunt', vi: 'cô/dì' }, { en: 'uncle', vi: 'chú/bác' },
      { en: 'grandparents', vi: 'ông bà' }, { en: 'daughter', vi: 'con gái' }, { en: 'son', vi: 'con trai' },
      { en: 'wife', vi: 'vợ' }, { en: 'husband', vi: 'chồng' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-school',
    title: 'Tiếng Anh: Family & Friends 4 - School things',
    introTitle: 'Từ vựng trường học thường đi thành bộ',
    introPoints: ['Hãy nhìn đồ vật thật rồi đọc tên tiếng Anh.', 'Nhóm từ giống nhau giúp bé trả lời nhanh hơn.'],
    example: 'I put my notebook in my school bag.',
    words: [
      { en: 'notebook', vi: 'vở' }, { en: 'eraser', vi: 'cục tẩy' }, { en: 'glue', vi: 'keo dán' },
      { en: 'scissors', vi: 'cái kéo' }, { en: 'school bag', vi: 'cặp sách' }, { en: 'ruler', vi: 'thước kẻ' },
      { en: 'marker', vi: 'bút lông' }, { en: 'crayons', vi: 'bút sáp màu' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-subjects',
    title: 'Tiếng Anh: Family & Friends 4 - School subjects',
    introTitle: 'Tên môn học xuất hiện rất nhiều trong hội thoại lớp học',
    introPoints: ['Nhớ tên môn gắn với hoạt động quen thuộc.', 'Ví dụ Science là lúc quan sát và khám phá.'],
    example: 'My favorite subject is Science.',
    words: [
      { en: 'Science', vi: 'môn Khoa học' }, { en: 'Math', vi: 'môn Toán' }, { en: 'Art', vi: 'môn Mỹ thuật' },
      { en: 'Music', vi: 'môn Âm nhạc' }, { en: 'English', vi: 'môn Tiếng Anh' }, { en: 'P.E.', vi: 'môn Thể dục' },
      { en: 'I.T.', vi: 'môn Tin học' }, { en: 'Vietnamese', vi: 'môn Tiếng Việt' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-routines',
    title: 'Tiếng Anh: Family & Friends 4 - Daily routines',
    introTitle: 'Động từ hằng ngày nên học cùng thời điểm trong ngày',
    introPoints: ['Sáng, trưa, chiều, tối là một cách nhớ tốt.', 'Nói thành câu hoàn chỉnh sẽ bền hơn học từ rời.'],
    example: 'I get up at six o’clock and brush my teeth.',
    words: [
      { en: 'get up', vi: 'thức dậy' }, { en: 'brush my teeth', vi: 'đánh răng' }, { en: 'have breakfast', vi: 'ăn sáng' },
      { en: 'go to school', vi: 'đi học' }, { en: 'do homework', vi: 'làm bài tập' }, { en: 'take a shower', vi: 'tắm' },
      { en: 'go to bed', vi: 'đi ngủ' }, { en: 'have dinner', vi: 'ăn tối' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-places',
    title: 'Tiếng Anh: Family & Friends 4 - Places in town',
    introTitle: 'Địa điểm nên học kèm với việc thường làm ở đó',
    introPoints: ['Ví dụ library là nơi mượn và đọc sách.', 'Hospital là nơi bác sĩ giúp người bệnh.'],
    example: 'We buy medicine at the hospital pharmacy.',
    words: [
      { en: 'library', vi: 'thư viện' }, { en: 'hospital', vi: 'bệnh viện' }, { en: 'museum', vi: 'bảo tàng' },
      { en: 'supermarket', vi: 'siêu thị' }, { en: 'park', vi: 'công viên' }, { en: 'cinema', vi: 'rạp chiếu phim' },
      { en: 'bakery', vi: 'tiệm bánh' }, { en: 'bookstore', vi: 'hiệu sách' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-food',
    title: 'Tiếng Anh: Family & Friends 4 - Food and drinks',
    introTitle: 'Tên đồ ăn thức uống nên gắn với bữa ăn quen thuộc',
    introPoints: ['Nhìn món ăn thật hoặc tranh sẽ nhớ nhanh hơn.', 'Có thể chia thành đồ uống và đồ ăn.'],
    example: 'I drink milk and eat bread for breakfast.',
    words: [
      { en: 'milk', vi: 'sữa' }, { en: 'juice', vi: 'nước ép' }, { en: 'bread', vi: 'bánh mì' },
      { en: 'noodles', vi: 'mì/bún' }, { en: 'rice', vi: 'cơm' }, { en: 'chicken', vi: 'thịt gà' },
      { en: 'vegetables', vi: 'rau' }, { en: 'fruit', vi: 'trái cây' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-weather',
    title: 'Tiếng Anh: Family & Friends 4 - Weather',
    introTitle: 'Từ thời tiết nên học kèm cách ăn mặc',
    introPoints: ['Sunny thường đi với mũ, rainy thường đi với ô.', 'Liên kết ngữ cảnh giúp nhớ tốt hơn.'],
    example: 'It’s rainy today, so I need an umbrella.',
    words: [
      { en: 'sunny', vi: 'nắng' }, { en: 'rainy', vi: 'mưa' }, { en: 'windy', vi: 'có gió' },
      { en: 'cloudy', vi: 'nhiều mây' }, { en: 'stormy', vi: 'có bão' }, { en: 'hot', vi: 'nóng' },
      { en: 'cold', vi: 'lạnh' }, { en: 'cool', vi: 'mát' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-clothes',
    title: 'Tiếng Anh: Family & Friends 4 - Clothes',
    introTitle: 'Quần áo là nhóm từ dễ học bằng tranh',
    introPoints: ['Hãy nhìn người mặc món đồ đó rồi gọi tên.', 'Có thể học theo bộ: head, body, feet.'],
    example: 'He is wearing a jacket and sneakers.',
    words: [
      { en: 'jacket', vi: 'áo khoác' }, { en: 'dress', vi: 'váy đầm' }, { en: 'skirt', vi: 'chân váy' },
      { en: 'jeans', vi: 'quần jean' }, { en: 'sneakers', vi: 'giày thể thao' }, { en: 'boots', vi: 'ủng' },
      { en: 'cap', vi: 'mũ lưỡi trai' }, { en: 'socks', vi: 'vớ' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-sports',
    title: 'Tiếng Anh: Family & Friends 4 - Sports and hobbies',
    introTitle: 'Động từ sở thích nên đi cùng play/go/do nếu phù hợp',
    introPoints: ['Play soccer, go swimming, do karate là các cụm quen thuộc.', 'Học theo cụm sẽ tự nhiên hơn.'],
    example: 'I play badminton after school.',
    words: [
      { en: 'badminton', vi: 'cầu lông' }, { en: 'soccer', vi: 'bóng đá' }, { en: 'swimming', vi: 'bơi lội' },
      { en: 'karate', vi: 'võ karate' }, { en: 'drawing', vi: 'vẽ tranh' }, { en: 'reading', vi: 'đọc sách' },
      { en: 'cycling', vi: 'đạp xe' }, { en: 'dancing', vi: 'nhảy múa' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-animals',
    title: 'Tiếng Anh: Family & Friends 4 - Wild animals',
    introTitle: 'Động vật hoang dã nên học cùng đặc điểm nổi bật',
    introPoints: ['Liên hệ từ với hình dáng hoặc nơi sống.', 'Ví dụ giraffe có chiếc cổ rất dài.'],
    example: 'A giraffe has a long neck.',
    words: [
      { en: 'giraffe', vi: 'hươu cao cổ' }, { en: 'elephant', vi: 'voi' }, { en: 'tiger', vi: 'hổ' },
      { en: 'monkey', vi: 'khỉ' }, { en: 'zebra', vi: 'ngựa vằn' }, { en: 'bear', vi: 'gấu' },
      { en: 'crocodile', vi: 'cá sấu' }, { en: 'kangaroo', vi: 'chuột túi' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-sea',
    title: 'Tiếng Anh: Family & Friends 4 - Sea animals',
    introTitle: 'Nhóm từ dưới biển giúp mở rộng vốn từ rất tốt',
    introPoints: ['Ghép từ với nơi sống dưới biển sẽ dễ nhớ hơn.', 'Có thể so sánh fish, dolphin, whale.'],
    example: 'A dolphin can swim fast.',
    words: [
      { en: 'dolphin', vi: 'cá heo' }, { en: 'whale', vi: 'cá voi' }, { en: 'shark', vi: 'cá mập' },
      { en: 'octopus', vi: 'bạch tuộc' }, { en: 'starfish', vi: 'sao biển' }, { en: 'seahorse', vi: 'cá ngựa' },
      { en: 'jellyfish', vi: 'sứa' }, { en: 'turtle', vi: 'rùa biển' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-transport',
    title: 'Tiếng Anh: Family & Friends 4 - Transport',
    introTitle: 'Phương tiện nên học theo nơi di chuyển',
    introPoints: ['Trên bộ, dưới nước, trên không là ba nhóm dễ nhớ.', 'Hỏi how do you go...? rất hay đi với nhóm này.'],
    example: 'I go to school by bus.',
    words: [
      { en: 'bus', vi: 'xe buýt' }, { en: 'train', vi: 'tàu hỏa' }, { en: 'motorbike', vi: 'xe máy' },
      { en: 'bicycle', vi: 'xe đạp' }, { en: 'airplane', vi: 'máy bay' }, { en: 'boat', vi: 'thuyền' },
      { en: 'ship', vi: 'tàu thủy' }, { en: 'subway', vi: 'tàu điện ngầm' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-house',
    title: 'Tiếng Anh: Family & Friends 4 - House and furniture',
    introTitle: 'Đồ đạc trong nhà nên học theo từng phòng',
    introPoints: ['Bed ở bedroom, sofa ở living room.', 'Chia phòng giúp nhớ lâu hơn.'],
    example: 'There is a sofa in the living room.',
    words: [
      { en: 'sofa', vi: 'ghế sofa' }, { en: 'bed', vi: 'cái giường' }, { en: 'wardrobe', vi: 'tủ quần áo' },
      { en: 'mirror', vi: 'gương' }, { en: 'stove', vi: 'bếp lò/bếp' }, { en: 'fridge', vi: 'tủ lạnh' },
      { en: 'table', vi: 'cái bàn' }, { en: 'lamp', vi: 'cái đèn' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-body-health',
    title: 'Tiếng Anh: Family & Friends 4 - Body and health',
    introTitle: 'Từ cơ thể nên gắn với chăm sóc sức khỏe',
    introPoints: ['Đau đầu, đau bụng là mẫu câu rất thường gặp.', 'Học body part cùng health words rất hiệu quả.'],
    example: 'My throat hurts, so I drink warm water.',
    words: [
      { en: 'throat', vi: 'cổ họng' }, { en: 'stomach', vi: 'bụng/dạ dày' }, { en: 'shoulder', vi: 'vai' },
      { en: 'knee', vi: 'đầu gối' }, { en: 'headache', vi: 'đau đầu' }, { en: 'toothache', vi: 'đau răng' },
      { en: 'fever', vi: 'sốt' }, { en: 'cough', vi: 'ho' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-holidays',
    title: 'Tiếng Anh: Family & Friends 4 - Holidays',
    introTitle: 'Kỳ nghỉ đi cùng hoạt động vui chơi',
    introPoints: ['Picture + action là cách học rất hợp cho chủ đề này.', 'Ví dụ beach đi với swim hoặc build sandcastles.'],
    example: 'We stay at a hotel and swim in the sea.',
    words: [
      { en: 'hotel', vi: 'khách sạn' }, { en: 'beach', vi: 'bãi biển' }, { en: 'mountain', vi: 'núi' },
      { en: 'camping', vi: 'cắm trại' }, { en: 'souvenir', vi: 'quà lưu niệm' }, { en: 'passport', vi: 'hộ chiếu' },
      { en: 'travel', vi: 'du lịch' }, { en: 'holiday', vi: 'kỳ nghỉ' },
    ],
  }),
  buildEnglishUnit({
    topicKey: 'eng:ff4-nature',
    title: 'Tiếng Anh: Family & Friends 4 - Nature',
    introTitle: 'Thiên nhiên là nhóm từ giúp bé mở rộng vốn từ rất nhanh',
    introPoints: ['Liên tưởng tranh phong cảnh rất hiệu quả.', 'Gom từ theo land, water, sky.'],
    example: 'We can see a waterfall in the forest.',
    words: [
      { en: 'waterfall', vi: 'thác nước' }, { en: 'river', vi: 'dòng sông' }, { en: 'lake', vi: 'hồ' },
      { en: 'forest', vi: 'rừng' }, { en: 'island', vi: 'hòn đảo' }, { en: 'hill', vi: 'đồi' },
      { en: 'rainbow', vi: 'cầu vồng' }, { en: 'cave', vi: 'hang động' },
    ],
  }),
  ...MORE_ENGLISH_TOPICS,
];
