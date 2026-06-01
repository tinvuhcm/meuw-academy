const COMMON_TEACHER = 'Thầy Gâu lùn';

const LESSON_LIBRARY = [
  {
    match: module => module.subject === 'math' && module.title.includes('Phân số'),
    block: {
      type: 'mini',
      teacherName: COMMON_TEACHER,
      title: 'Phân số là chia một vật thành các phần bằng nhau',
      points: [
        'Số ở dưới cho biết vật được chia thành mấy phần bằng nhau.',
        'Số ở trên cho biết mình đang lấy mấy phần.',
        'Khi cùng lấy 1 phần, mẫu số càng lớn thì mỗi phần càng nhỏ.',
      ],
      example: 'Ví dụ: 1/2 là lấy 1 trong 2 phần. 1/10 là lấy 1 trong 10 phần, nên 1/10 nhỏ hơn 1/2.',
    },
  },
  {
    match: module => module.subject === 'math' && module.title.includes('Chu vi'),
    block: {
      type: 'mini',
      teacherName: COMMON_TEACHER,
      title: 'Chu vi và diện tích khác nhau',
      points: [
        'Chu vi là độ dài đường bao quanh một hình.',
        'Diện tích là phần mặt phẳng nằm bên trong hình.',
        'Hình vuông có 4 cạnh bằng nhau: chu vi = cạnh x 4, diện tích = cạnh x cạnh.',
      ],
      example: 'Ví dụ: hình vuông cạnh 6m thì chu vi = 6 x 4 = 24m, diện tích = 6 x 6 = 36m².',
    },
  },
  {
    match: module => module.subject === 'math' && module.title.includes('Bảng nhân'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Nhân là cộng nhanh nhiều lần bằng nhau',
      points: [
        '3 x 4 nghĩa là có 3 nhóm, mỗi nhóm 4 cái.',
        'Có thể nghĩ là 4 + 4 + 4 = 12.',
      ],
      example: 'Khi gặp phép nhân, hãy hỏi: có mấy nhóm, mỗi nhóm có mấy?',
    },
  },
  {
    match: module => module.subject === 'math' && module.title.includes('Phép chia'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Chia là tách đều thành các nhóm',
      points: [
        'Phép chia giúp biết mỗi nhóm có bao nhiêu, hoặc chia được bao nhiêu nhóm.',
        'Chia đều nghĩa là các nhóm nhận số lượng bằng nhau.',
      ],
      example: '12 cái kẹo chia đều cho 3 bạn: 12 : 3 = 4, mỗi bạn được 4 cái.',
    },
  },
  {
    match: module => module.subject === 'math' && (module.title.includes('Phép cộng') || module.title.includes('Phép trừ') || module.title.includes('Tính nhẩm')),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Tính số lớn cần giữ đúng hàng',
      points: [
        'Hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục.',
        'Khi nhẩm, có thể tách số tròn trước rồi cộng hoặc trừ phần còn lại.',
      ],
      example: 'Ví dụ: 398 + 20 = 418 vì chỉ tăng thêm 2 chục.',
    },
  },
  {
    match: module => module.subject === 'eng',
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Nhìn mẫu câu trước khi chọn đáp án',
      points: [
        'Tiếng Anh dễ hơn khi mình nhớ theo cụm ngắn.',
        'Đọc câu hỏi, tìm từ khóa, rồi so với các lựa chọn.',
      ],
      example: 'Ví dụ: "This is my mother" nghĩa là "Đây là mẹ của em".',
    },
  },
  {
    match: module => module.subject === 'vie' && module.title.includes('Đọc hiểu'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Đọc hiểu là tìm bằng chứng trong bài',
      points: [
        'Đọc câu hỏi trước để biết mình cần tìm gì.',
        'Quay lại đoạn văn để tìm chi tiết đúng, đừng đoán vội.',
      ],
      example: 'Nếu hỏi "nhân vật làm gì?", hãy tìm câu có tên nhân vật và hành động của bạn ấy.',
    },
  },
  {
    match: module => module.subject === 'vie' && module.title.includes('Cấu tạo câu'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Một câu thường nói ai làm gì',
      points: [
        'Chủ ngữ trả lời câu hỏi: ai, con gì, cái gì?',
        'Vị ngữ cho biết người hoặc vật đó làm gì, như thế nào.',
      ],
      example: 'Ví dụ: "Méo học bài." Méo là chủ ngữ, học bài là vị ngữ.',
    },
  },
  {
    match: module => module.subject === 'vie' && module.title.includes('Từ trái nghĩa'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Từ trái nghĩa có ý nghĩa ngược nhau',
      points: [
        'Một cặp từ trái nghĩa diễn tả hai ý đối lập.',
        'Hãy đặt từ vào câu để kiểm tra nghĩa.',
      ],
      example: 'Ví dụ: cao - thấp, nóng - lạnh, nhanh - chậm.',
    },
  },
  {
    match: module => module.subject === 'vie' && module.title.includes('Chính tả'),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Chính tả cần nghe âm và nhớ mặt chữ',
      points: [
        'Một số âm nghe gần giống nhau nên dễ viết nhầm.',
        'Đọc chậm từng tiếng rồi kiểm tra lại từ quen thuộc.',
      ],
      example: 'Ví dụ: "chăm chỉ" viết bằng ch, không phải tr.',
    },
  },
  {
    match: module => module.subject === 'it',
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Máy tính làm theo lệnh của con người',
      points: [
        'Chuột giúp chọn và bấm vào đồ vật trên màn hình.',
        'Bàn phím giúp nhập chữ, số và lệnh.',
      ],
      example: 'Khi muốn mở một nút, mình đưa chuột tới nút đó rồi bấm.',
    },
  },
  {
    match: module => module.subject === 'sci',
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Khoa học bắt đầu từ quan sát',
      points: [
        'Trước khi trả lời, hãy nhìn hiện tượng và hỏi: vì sao chuyện đó xảy ra?',
        'Nếu chưa chắc, chọn đáp án hợp lý nhất rồi đọc phần bài học sau đáp án.',
      ],
      example: 'Khoa học không chỉ nhớ đáp án, mà còn hiểu nguyên nhân.',
    },
  },
];

export function enrichLessonBlocks(dayKey, dayData) {
  if (dayKey !== 'day1' || !dayData?.modules) return dayData;

  return {
    ...dayData,
    modules: dayData.modules.map(module => {
      if (module.lessonBlocks?.length) return module;
      const found = LESSON_LIBRARY.find(item => item.match(module));
      if (!found) return module;
      return {
        ...module,
        lessonBlocks: [found.block],
      };
    }),
  };
}
