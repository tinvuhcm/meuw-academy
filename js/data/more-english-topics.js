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
];
