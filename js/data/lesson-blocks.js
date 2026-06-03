const COMMON_TEACHER = 'Gâu tiên sinh';

function cloneBlock(block) {
  return JSON.parse(JSON.stringify(block));
}

function withFlowStage(block, flowStage) {
  if (!block) return block;
  return { ...block, flowStage };
}

function getFlowTitle(module) {
  if (module.subject === 'math') return 'Khởi động toán vui';
  if (module.subject === 'eng') return 'Warm-up tiếng Anh';
  if (module.subject === 'vie') {
    const isReading = /đọc|bài đọc|doc/i.test(`${module.title || ''} ${module.topicKey || ''}`);
    return isReading ? 'Khởi động đọc hiểu' : 'Khởi động Tiếng Việt';
  }
  if (module.subject === 'it') return 'Khởi động Tin học';
  if (module.subject === 'histgeo') return 'Khởi động khám phá quê hương';
  if (module.subject === 'music') return 'Khởi động cùng nhịp điệu';
  if (module.subject === 'art') return 'Khởi động mắt nhìn, tay tưởng tượng';
  if (module.subject === 'ethics') return 'Khởi động ứng xử đẹp';
  if (module.subject === 'tech') return 'Khởi động làm đồ khéo tay';
  if (module.subject === 'life') return 'Khởi động trải nghiệm';
  return 'Khởi động bài học';
}

function getFlowPoints(module) {
  if (module.subject === 'math') {
    return [
      'Con thử đoán xem hôm nay mình đang làm việc với số, phân số, hình hay biểu đồ.',
      'Trước khi tính, hãy tự nói ngắn gọn: bài này đang hỏi điều gì.',
    ];
  }
  if (module.subject === 'eng') {
    return [
      'Con hãy thử nói thầm một câu mẫu ngắn trước khi làm bài.',
      'Nhìn từ khóa rồi đoán xem đây là bài về từ vựng, mẫu câu hay đọc hiểu.',
    ];
  }
  if (module.subject === 'vie') {
    const isReading = /đọc|bài đọc|doc/i.test(`${module.title || ''} ${module.topicKey || ''}`);
    if (isReading) {
      return [
        'Con hãy nhìn tên bài rồi đoán xem bài đọc nói về ai hoặc điều gì.',
        'Khi đọc, nhớ gạch nhẹ từ khóa để lát nữa tìm lại bằng chứng thật nhanh.',
      ];
    }
    return [
      'Con thử đoán xem bài này đang giúp mình hiểu về từ, câu, dấu câu hay cách viết.',
      'Nếu chưa chắc, đọc ví dụ của Gâu tiên sinh trước rồi mới làm bài.',
    ];
  }
  if (module.subject === 'it') {
    return [
      'Con thử tưởng tượng mình đang làm thao tác thật trên máy tính.',
      'Nghĩ trước: bước nào làm trước, bước nào làm sau.',
    ];
  }
  if (module.subject === 'histgeo') {
    return [
      'Con thử đoán xem bài này đang nói về nơi chốn, bản đồ hay một câu chuyện của đất nước mình.',
      'Nếu có tên vùng miền hay nhân vật, hãy nhớ nối với điều con đã biết ngoài đời.',
    ];
  }
  if (module.subject === 'music') {
    return [
      'Con thử gõ nhẹ nhịp trên bàn hoặc trong đầu trước khi trả lời.',
      'Nghe tên bài rồi đoán xem hôm nay mình học về nhịp, giai điệu hay âm sắc.',
    ];
  }
  if (module.subject === 'art') {
    return [
      'Con thử hình dung ngay màu sắc, đường nét hoặc sản phẩm mà bài học đang nhắc tới.',
      'Trong mĩ thuật không chỉ có đúng sai, mà còn có cách quan sát và cảm nhận.',
    ];
  }
  if (module.subject === 'ethics') {
    return [
      'Con thử tưởng tượng mình đang ở trong tình huống thật rồi nghĩ xem cách ứng xử nào đẹp nhất.',
      'Đạo đức không chỉ là nhớ đáp án, mà là hiểu vì sao hành động đó tốt.',
    ];
  }
  if (module.subject === 'tech') {
    return [
      'Con hãy tưởng tượng mình đang làm sản phẩm thật bằng tay hoặc bằng dụng cụ trước mặt.',
      'Trước khi làm, luôn nghĩ đến thứ tự bước và cách giữ an toàn.',
    ];
  }
  if (module.subject === 'life') {
    return [
      'Con thử nối bài học này với một việc con làm mỗi ngày ở nhà hoặc ở trường.',
      'Biết tự chăm mình và biết sắp xếp giúp việc học nhẹ đầu hơn nhiều.',
    ];
  }
  return [
    'Con hãy xem hôm nay mình đang nhận nhiệm vụ học gì.',
    'Hiểu nhiệm vụ trước rồi làm bài sẽ dễ hơn nhiều.',
  ];
}

function getFlowExample(module) {
  if (module.subject === 'math') return 'Ví dụ: nếu đề hỏi chu vi, con phải nghĩ đến độ dài đường bao quanh hình chứ không phải phần bên trong hình.';
  if (module.subject === 'eng') return 'Ví dụ: nếu bài có từ works in, con thử nghĩ ngay đến nơi làm việc phù hợp với nghề đó.';
  if (module.subject === 'vie') return 'Ví dụ: nếu câu hỏi hỏi về ý chính, con đừng chọn theo cảm giác mà hãy quay lại đúng câu trong bài.';
  if (module.subject === 'it') return 'Ví dụ: nếu bài về thư mục, con thử hình dung thư mục như một ngăn chứa nhiều tệp.';
  if (module.subject === 'histgeo') return 'Ví dụ: nếu bài nhắc đến hướng Đông, con thử nhớ Mặt Trời mọc ở đâu vào buổi sáng.';
  if (module.subject === 'music') return 'Ví dụ: nếu bài về nhịp, con có thể thử đếm 1-2 hoặc 1-2-3 đều đều trong đầu.';
  if (module.subject === 'art') return 'Ví dụ: nếu bài nhắc đến màu nóng, con thử nghĩ ngay đến đỏ, cam, vàng.';
  if (module.subject === 'ethics') return 'Ví dụ: nếu nhặt được đồ của bạn, con thử nghĩ xem cách nào vừa trung thực vừa tử tế nhất.';
  if (module.subject === 'tech') return 'Ví dụ: nếu dùng kéo, con phải nghĩ ngay đến việc cầm chắc tay và hướng lưỡi kéo ra xa người.';
  if (module.subject === 'life') return 'Ví dụ: chuẩn bị sách vở từ tối hôm trước sẽ giúp sáng hôm sau đỡ cuống hơn.';
  return 'Ví dụ: đọc nhiệm vụ trước sẽ giúp con biết nên chú ý điều gì khi học.';
}

function buildPlayfulWarmupBlock(module) {
  const sourceLabel = module.lessonBlocks?.[0]?.sourceLabel || '';
  return {
    type: 'micro',
    flowStage: 'warmup',
    teacherName: COMMON_TEACHER,
    title: getFlowTitle(module),
    sourceLabel,
    points: getFlowPoints(module),
    example: getFlowExample(module),
    cta: 'Bắt đầu nhiệm vụ',
  };
}

function applyLessonFlowPattern(module) {
  if (!module.lessonBlocks?.length) return module;
  const first = module.lessonBlocks[0];
  if (first?.__flowWarmup) return module;
  const warmup = buildPlayfulWarmupBlock(module);
  warmup.__flowWarmup = true;
  const normalizedBlocks = module.lessonBlocks.map(block => {
    const copied = cloneBlock(block);
    if (copied.flowStage) return copied;
    if (copied.type === 'reading-page') return withFlowStage(copied, 'reading');
    return withFlowStage(copied, 'theory');
  });
  return {
    ...module,
    lessonBlocks: [warmup, ...normalizedBlocks],
  };
}

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
    match: module => module.subject === 'math',
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Toán cần quan sát mẫu trước khi tính',
      points: [
        'Nhìn xem đề đang hỏi cộng, trừ, so sánh hay tìm quy luật.',
        'Làm từng bước ngắn sẽ ít nhầm hơn làm vội.',
      ],
      example: 'Nếu dãy số tăng đều, hãy tìm xem mỗi lần tăng thêm bao nhiêu.',
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
    match: module => module.subject === 'vie' && /bài đọc|bai.?doc/i.test(`${module.title || ''} ${module.topicKey || ''}`),
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Đọc kỹ bài trước rồi mới làm câu hỏi',
      points: [
        'Mở sách Tiếng Việt lớp 4, đọc bài đọc trong bài học này.',
        'Chú ý các từ in đậm, ghi chú giải nghĩa và câu hỏi cuối bài.',
      ],
      example: 'Khi đọc, gạch nhẹ dưới những chi tiết quan trọng để dễ tìm lại khi làm bài.',
      cta: 'Đã đọc xong — Làm bài!',
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
    match: module => module.subject === 'vie',
    block: {
      type: 'micro',
      teacherName: COMMON_TEACHER,
      title: 'Tiếng Việt cần hiểu nghĩa rồi mới chọn đáp án',
      points: [
        'Đọc chậm câu hỏi để biết mình đang tìm nghĩa, từ loại hay dấu câu.',
        'Nếu phân vân, hãy đặt đáp án vào câu để kiểm tra xem có hợp lý không.',
      ],
      example: 'Đặt đáp án vào câu thường giúp mình nhận ra đáp án nào nghe tự nhiên nhất.',
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
  if (!dayData?.modules) return dayData;

  return {
    ...dayData,
    modules: dayData.modules.map(module => {
      let enriched = module;
      if (!enriched.lessonBlocks?.length) {
        const found = LESSON_LIBRARY.find(item => item.match(enriched));
        if (found) {
          enriched = {
            ...enriched,
            lessonBlocks: [cloneBlock(found.block)],
          };
        }
      }
      if (!enriched.lessonBlocks?.length) return enriched;
      return applyLessonFlowPattern(enriched);
    }),
  };
}
