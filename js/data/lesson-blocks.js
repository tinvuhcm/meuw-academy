const COMMON_TEACHER = 'Gâu tiên sinh';

function cloneBlock(block) {
  return JSON.parse(JSON.stringify(block));
}

function withFlowStage(block, flowStage) {
  if (!block) return block;
  return { ...block, flowStage };
}

// ─── Math topic-specific warm-up content ──────────────────────────────────────
// Returns { title, points, example } for each KNTT Toán 4 topic.
// Covers every op from MATH_OP_RULES in kntt-topics.js.
// Purpose: Child enters Bước 2 already knowing WHAT the lesson is about.

function getMathTopicContent(module) {
  const t = String(module.title || '').toLowerCase();
  const key = String(module.topicKey || '').toLowerCase();
  const combined = `${t} ${key}`;

  // ── Trung bình cộng (average) ─────────────────────────────────────────────
  if (/trung bình|average/.test(combined)) return {
    title: 'Khởi động: Trung bình cộng',
    points: [
      'Trung bình cộng là con số đại diện chung cho một nhóm số — như điểm "trung bình" của cả lớp.',
      'Công thức: CỘNG tất cả các số lại → CHIA cho SỐ LƯỢNG phần tử.',
    ],
    example: 'Ví dụ: 3 bạn cao 120 cm, 130 cm, 110 cm. Trung bình = (120+130+110)÷3 = 360÷3 = 120 cm.',
  };

  // ── Phân số (fractions) ───────────────────────────────────────────────────
  if (/phân số|frac/.test(combined)) return {
    title: 'Khởi động: Phân số',
    points: [
      'Phân số gồm tử số (trên) và mẫu số (dưới). Mẫu số cho biết chia thành mấy phần bằng nhau.',
      'Tử số cho biết lấy mấy phần trong tổng số phần đó.',
    ],
    example: 'Ví dụ: 3/4 = chia vật thành 4 phần bằng nhau, lấy 3 phần. 1/4 < 1/2 vì 1/4 nhỏ hơn 1/2 khi mẫu lớn hơn.',
  };

  // ── Chu vi / Diện tích / Hình học ─────────────────────────────────────────
  if (/chu vi/.test(combined)) return {
    title: 'Khởi động: Chu vi',
    points: [
      'Chu vi = TỔNG ĐỘ DÀI tất cả các cạnh bao quanh hình.',
      'Hình vuông: chu vi = cạnh × 4. Hình chữ nhật: chu vi = (dài + rộng) × 2.',
    ],
    example: 'Ví dụ: hình chữ nhật dài 8 cm, rộng 5 cm → chu vi = (8+5)×2 = 26 cm.',
  };

  if (/diện tích/.test(combined)) return {
    title: 'Khởi động: Diện tích',
    points: [
      'Diện tích = phần MẶT PHẲNG bên trong hình (khác với chu vi là đường bao quanh).',
      'Hình vuông: S = cạnh × cạnh. Hình chữ nhật: S = dài × rộng.',
    ],
    example: 'Ví dụ: căn phòng dài 6 m, rộng 4 m → diện tích = 6×4 = 24 m². Cần 24 m² sàn để lát nền.',
  };

  if (/góc|hình thoi|hình bình hành|song song|vuông góc/.test(combined)) return {
    title: 'Khởi động: Hình học',
    points: [
      'Góc là hình tạo bởi 2 tia chung gốc. Góc vuông = 90°, góc nhọn < 90°, góc tù > 90°.',
      'Hai đường thẳng vuông góc tạo thành góc 90°. Hai đường song song không cắt nhau dù kéo dài mãi.',
    ],
    example: 'Ví dụ: góc ở 4 góc của hình chữ nhật đều là góc vuông (90°).',
  };

  if (/hình học|hình|geo/.test(combined)) return {
    title: 'Khởi động: Hình học',
    points: [
      'Hình học lớp 4 học nhận dạng hình, đặc điểm và cách tính chu vi, diện tích.',
      'Hỏi bản thân: bài đang hỏi về đường bao (chu vi) hay phần bên trong (diện tích)?',
    ],
    example: 'Ví dụ: hình vuông cạnh 5 cm → chu vi = 5×4 = 20 cm, diện tích = 5×5 = 25 cm².',
  };

  // ── Biểu đồ / Thống kê ───────────────────────────────────────────────────
  if (/biểu đồ|thống kê|bảng số liệu|data-chart/.test(combined)) return {
    title: 'Khởi động: Biểu đồ và Thống kê',
    points: [
      'Biểu đồ cột biểu diễn số liệu bằng chiều cao của các cột — cột cao hơn = số lớn hơn.',
      '3 bước đọc biểu đồ: (1) đọc tên biểu đồ, (2) đọc trục số, (3) so sánh các cột với nhau.',
    ],
    example: 'Ví dụ: cột "Học sinh thích Toán" cao 25, cột "thích Văn" cao 18 → có 25-18 = 7 bạn thích Toán hơn Văn.',
  };

  // ── Biểu thức / Thứ tự phép tính ─────────────────────────────────────────
  if (/biểu thức|thứ tự phép tính|expression/.test(combined)) return {
    title: 'Khởi động: Thứ tự phép tính',
    points: [
      'Quy tắc ưu tiên: nhân/chia TRƯỚC, cộng/trừ SAU. Trong ngoặc thì làm TRƯỚC hết.',
      'Nếu chỉ có cộng/trừ (hoặc chỉ nhân/chia): làm từ TRÁI sang PHẢI theo thứ tự.',
    ],
    example: 'Ví dụ: 12 + 3 × 4 = 12 + 12 = 24 (không phải 15 × 4 = 60). Nhân trước, cộng sau!',
  };

  // ── Đo lường / Đơn vị ─────────────────────────────────────────────────────
  if (/đo|đơn vị|measurement|kg|lít|ml|cm|dm|km|m²|ha/.test(combined)) return {
    title: 'Khởi động: Đo lường và Đơn vị',
    points: [
      'Khi làm bài đo lường: bước 1 là ĐỔI tất cả về cùng một đơn vị, bước 2 mới tính.',
      'Bảng đổi hay nhầm: 1 km = 1 000 m, 1 m = 100 cm, 1 kg = 1 000 g, 1 lít = 1 000 ml.',
    ],
    example: 'Ví dụ: 2 km 500 m + 1 km 300 m = 2 500 m + 1 300 m = 3 800 m = 3 km 800 m.',
  };

  // ── Làm tròn số ───────────────────────────────────────────────────────────
  if (/làm tròn|rounding/.test(combined)) return {
    title: 'Khởi động: Làm tròn số',
    points: [
      'Làm tròn đến hàng nào thì nhìn chữ số liền sau hàng đó: nếu ≥ 5 thì làm tròn lên, < 5 thì làm tròn xuống.',
      'Sau khi làm tròn, các chữ số hàng thấp hơn đều trở thành 0.',
    ],
    example: 'Ví dụ: làm tròn 3 472 đến hàng trăm → xét chữ số hàng chục = 7 ≥ 5 → làm tròn lên → 3 500.',
  };

  // ── Giá trị chữ số / Số tự nhiên / So sánh ───────────────────────────────
  if (/giá trị chữ số|hàng|lớp|số tự nhiên|so sánh|place-value|1 000 000|100 000/.test(combined)) return {
    title: 'Khởi động: Giá trị chữ số và Số lớn',
    points: [
      'Mỗi chữ số có GIÁ TRỊ tùy vị trí: số 5 trong 500 có giá trị 500, trong 5 000 có giá trị 5 000.',
      'So sánh số: đếm chữ số trước (nhiều chữ số hơn = số lớn hơn). Nếu bằng nhau chữ số → so sánh từ trái sang phải.',
    ],
    example: 'Ví dụ: trong số 25 348, chữ số 5 ở hàng nghìn, có giá trị là 5 000.',
  };

  // ── Số chẵn / Số lẻ ──────────────────────────────────────────────────────
  if (/số chẵn|số lẻ|parity/.test(combined)) return {
    title: 'Khởi động: Số chẵn và Số lẻ',
    points: [
      'Số chẵn chia hết cho 2 — chữ số cuối là 0, 2, 4, 6 hoặc 8.',
      'Số lẻ không chia hết cho 2 — chữ số cuối là 1, 3, 5, 7 hoặc 9.',
    ],
    example: 'Ví dụ: 246 là số chẵn (tận cùng 6). 137 là số lẻ (tận cùng 7). Chỉ cần nhìn chữ số cuối!',
  };

  // ── Tìm x / Ẩn số / Thành phần ───────────────────────────────────────────
  if (/tìm x|ẩn số|thành phần|missing/.test(combined)) return {
    title: 'Khởi động: Tìm thành phần chưa biết',
    points: [
      'Để tìm x trong phép tính, con dùng phép tính NGƯỢC: x + 5 = 12 → x = 12 - 5.',
      'Quy tắc: Số hạng = Tổng - Số hạng kia. Số bị trừ = Hiệu + Số trừ. Thừa số = Tích ÷ Thừa số kia.',
    ],
    example: 'Ví dụ: x × 4 = 36 → x = 36 ÷ 4 = 9. Kiểm tra: 9 × 4 = 36 ✓',
  };

  // ── Gấp / Giảm đi / Nhiều hơn / Ít hơn ──────────────────────────────────
  if (/gấp|giảm đi|nhiều hơn|ít hơn|double-half/.test(combined)) return {
    title: 'Khởi động: Gấp lên và Giảm đi',
    points: [
      '"Gấp n lần" nghĩa là NHÂN n. "Giảm đi n lần" nghĩa là CHIA cho n.',
      '"Nhiều hơn n đơn vị" nghĩa là CỘNG n. "Ít hơn n đơn vị" nghĩa là TRỪ n.',
    ],
    example: 'Ví dụ: 12 gấp 3 lần = 12×3 = 36. 12 giảm đi 3 lần = 12÷3 = 4. 12 nhiều hơn 3 = 12+3 = 15.',
  };

  // ── Tiền ─────────────────────────────────────────────────────────────────
  if (/tiền|đồng|money/.test(combined)) return {
    title: 'Khởi động: Tính tiền',
    points: [
      'Bài toán về tiền thường hỏi: giá tiền, số tiền phải trả, số tiền còn lại hoặc số lượng mua được.',
      'Chú ý đơn vị: nghìn đồng. 1 tờ 10 000 đồng = 10 × 1 000 đồng = mười nghìn đồng.',
    ],
    example: 'Ví dụ: mua 3 quyển vở 4 500 đồng/quyển, trả 20 000 đồng → tiền thừa = 20 000 - 3×4 500 = 6 500 đồng.',
  };

  // ── Đồng hồ / Thời gian ───────────────────────────────────────────────────
  if (/đồng hồ|giờ phút|xem giờ|clock/.test(combined)) return {
    title: 'Khởi động: Xem giờ và Tính thời gian',
    points: [
      '1 giờ = 60 phút. Kim giờ chỉ giờ, kim phút chỉ phút (1 vạch nhỏ = 1 phút, 1 số = 5 phút).',
      'Tính thời gian kết thúc = giờ bắt đầu + thời gian kéo dài. Nhớ đổi khi phút ≥ 60.',
    ],
    example: 'Ví dụ: bắt đầu lúc 7 giờ 45 phút, kéo dài 30 phút → kết thúc lúc 7 giờ 75 phút = 8 giờ 15 phút.',
  };

  // ── Bài toán có lời văn ───────────────────────────────────────────────────
  if (/lời văn|word-problem/.test(combined)) return {
    title: 'Khởi động: Bài toán có lời văn',
    points: [
      'Bước 1: Đọc kỹ và tóm tắt — Biết gì? Tìm gì? Bước 2: Chọn phép tính phù hợp.',
      'Bước 3: Tính toán cẩn thận. Bước 4: Ghi đáp số có đơn vị. Bước 5: Kiểm tra lại.',
    ],
    example: 'Ví dụ: "Lớp có 32 HS, chia đều vào 4 tổ" → Biết: 32 HS, 4 tổ. Tìm: số HS/tổ. Phép tính: 32÷4 = 8 HS.',
  };

  // ── Nhân / Chia ───────────────────────────────────────────────────────────
  if (/nhân|chia|bảng nhân|bảng chia/.test(combined)) return {
    title: 'Khởi động: Nhân và Chia',
    points: [
      'Nhân là cộng nhanh nhiều lần bằng nhau. Chia là tách đều thành nhiều phần.',
      'Khi nhân số có nhiều chữ số: nhân từng hàng, chú ý "nhớ" khi kết quả ≥ 10.',
    ],
    example: 'Ví dụ: 47 × 6 = (40×6) + (7×6) = 240 + 42 = 282. Hoặc: đặt tính dọc, nhân từ hàng đơn vị.',
  };

  // ── Tính nhẩm nhanh ───────────────────────────────────────────────────────
  if (/nhẩm|quick/.test(combined)) return {
    title: 'Khởi động: Tính nhẩm nhanh',
    points: [
      'Tính nhẩm nhanh nhờ tách số tròn trước: 398 + 25 = 400 + 23 = 423.',
      'Hoặc dùng tính chất giao hoán: a + b = b + a; a × b = b × a.',
    ],
    example: 'Ví dụ: 46 + 37 = 46 + 4 + 33 = 50 + 33 = 83 (tách 37 = 4 + 33, cộng 4 trước để được số tròn 50).',
  };

  // ── Cộng / Trừ (fallback for + op) ───────────────────────────────────────
  if (/cộng|trừ/.test(combined)) return {
    title: 'Khởi động: Cộng và Trừ',
    points: [
      'Cộng trừ số lớn: giữ đúng hàng (đơn vị thẳng đơn vị, chục thẳng chục) khi đặt tính.',
      'Khi trừ: nếu chữ số hàng đơn vị ít hơn số trừ thì "mượn" 1 chục từ hàng chục.',
    ],
    example: 'Ví dụ: 4 023 - 1 587 → hàng đơn vị: 3 < 7, mượn 1 chục → 13 - 7 = 6. Tiếp tục từng hàng.',
  };

  // ── Generic math fallback ──────────────────────────────────────────────────
  const topicName = String(module.title || '').replace(/^Toán:\s*/i, '').trim() || 'Toán';
  return {
    title: `Khởi động: ${topicName}`,
    points: [
      `Hôm nay mình học về: ${topicName}. Đọc kỹ bài học ngắn của Gâu tiên sinh ở Bước 2 trước khi làm bài.`,
      'Trước khi chọn đáp án, hãy tự hỏi: bài đang yêu cầu tính gì và dùng phép tính nào?',
    ],
    example: `Ví dụ: với bài ${topicName}, hãy nhớ công thức hoặc quy tắc chính, rồi áp dụng từng bước.`,
  };
}

function getFlowTitle(module) {
  if (module.subject === 'math') {
    const content = getMathTopicContent(module);
    return content.title;
  }
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
    return getMathTopicContent(module).points;
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
  if (module.subject === 'math') return getMathTopicContent(module).example;
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
