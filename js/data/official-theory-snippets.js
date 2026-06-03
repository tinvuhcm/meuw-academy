const TOAN_SOURCE = 'Nguồn chính thức: Giới thiệu SGK Toán 4 (Cánh Diều), Hoc10';
const ENGLISH_SOURCE = 'Nguồn chính: Family & Friends 4; tư liệu hỗ trợ chính thức: teacher/support assets từ Hoc10 và Tập huấn';
const VIE_SOURCE = 'Nguồn chính thức: Tài liệu tập huấn SGK Tiếng Việt 4 (Cánh Diều), Hoc10';

function clean(text) {
  return String(text || '').trim();
}

export function getOfficialMathTheory({ title = '', op = '' } = {}) {
  const t = clean(title).toLowerCase();
  const ruleMap = [
    {
      match: /phân số|frac/,
      points: [
        'Phân số dùng để chỉ một hay nhiều phần bằng nhau của một đơn vị.',
        'Con cần nhìn tử số và mẫu số để biết lấy mấy phần trong tổng số mấy phần bằng nhau.',
        'Lên lớp 4, con còn học rút gọn, quy đồng và so sánh các phân số trong những trường hợp phù hợp.',
      ],
      example: 'Ví dụ: nếu một hình được chia thành 4 phần bằng nhau và tô 3 phần thì đó là phân số 3/4.',
    },
    {
      match: /place-value|số tự nhiên|giá trị chữ số|làm tròn|hàng|lớp/,
      points: [
        'Số tự nhiên lớp 4 cần đọc, viết đúng và nhận ra giá trị của từng chữ số theo vị trí của nó.',
        'Khi so sánh hoặc làm tròn số, con phải nhìn đúng hàng đang xét.',
        'Hiểu cấu tạo thập phân sẽ giúp con tính nhanh và tránh nhầm hàng đơn vị, chục, trăm, nghìn.',
      ],
      example: 'Ví dụ: trong số 12 345, chữ số 3 ở hàng trăm nên có giá trị là 300.',
    },
    {
      match: /data-chart|biểu đồ|thống kê/,
      points: [
        'Biểu đồ cột là một cách biểu diễn số liệu thống kê bằng các cột cao thấp khác nhau.',
        'Con cần đọc tên biểu đồ, tên các đối tượng và chiều cao của từng cột.',
        'Sau đó mới so sánh số liệu để trả lời câu hỏi nhiều nhất, ít nhất hoặc trung bình.',
      ],
      example: 'Ví dụ: nếu cột mèo cao hơn cột thỏ thì số bạn chọn mèo nhiều hơn số bạn chọn thỏ.',
    },
    {
      match: /geo|chu vi|diện tích|hình|góc|vuông góc|song song/,
      points: [
        'Phần hình học lớp 4 giúp con nhận dạng hình, mô tả đặc điểm và thực hành đo, vẽ hoặc lắp ghép.',
        'Chu vi là độ dài đường bao quanh hình, còn diện tích cho biết phần mặt phẳng bên trong hình rộng bao nhiêu.',
        'Khi làm bài, con hãy xác định đúng mình đang tính độ dài hay đang tính phần mặt phẳng của hình.',
      ],
      example: 'Ví dụ: chu vi hình chữ nhật tính theo tổng các cạnh, còn diện tích tính theo chiều dài nhân chiều rộng.',
    },
    {
      match: /measurement|đơn vị|đo lường|tiền|đồng hồ|giờ/,
      points: [
        'Đo lường lớp 4 yêu cầu con biết dùng đơn vị phù hợp và chuyển đổi đúng giữa các đơn vị quen thuộc.',
        'Khi tính với số đo, con cần giữ đúng đơn vị hoặc đổi về cùng một đơn vị trước khi cộng, trừ, nhân, chia.',
        'Ước lượng cũng rất quan trọng để tự kiểm tra xem kết quả có hợp lí hay không.',
      ],
      example: 'Ví dụ: trước khi cộng 1 m và 35 cm, con nên đổi về cùng đơn vị đo.',
    },
    {
      match: /average|trung bình cộng/,
      points: [
        'Số trung bình cộng cho biết mức đại diện chung của hai hay nhiều số.',
        'Muốn tính số trung bình cộng, con cộng các số lại rồi chia cho số lượng các số đó.',
        'Con nên đọc kĩ đề để biết có bao nhiêu số đang được tính trung bình.',
      ],
      example: 'Ví dụ: trung bình cộng của 6 và 8 là (6 + 8) : 2 = 7.',
    },
    {
      match: /expression|biểu thức|thứ tự phép tính/,
      points: [
        'Biểu thức giúp con luyện tính theo đúng thứ tự, không làm lẫn lộn các phép tính.',
        'Con cần làm trong ngoặc trước, rồi đến nhân chia, sau đó mới cộng trừ.',
        'Nếu có thể nhóm số thuận tiện, con sẽ tính nhanh và ít sai hơn.',
      ],
      example: 'Ví dụ: trong 12 + 3 × 4, con phải tính 3 × 4 trước rồi mới cộng 12.',
    },
  ];

  const found = ruleMap.find(rule => rule.match.test(`${t}|${op}`));
  if (!found) return null;
  return { ...found, sourceLabel: TOAN_SOURCE };
}

export function getOfficialEnglishTheory(topicKey = '') {
  const key = clean(topicKey);
  const map = {
    'eng:ff4-jobs': {
      points: [
        'Chủ đề nghề nghiệp ở lớp 4 thường đi cùng nơi làm việc và việc làm tiêu biểu của mỗi nghề.',
        'Con nên học nghề theo cụm câu hỏi: What is the job? Where does he or she work?',
        'Khi trả lời, cố gắng nói thành câu ngắn hoàn chỉnh chứ không chỉ nói một từ.',
      ],
      example: 'Ví dụ: My mother is a doctor. She works in a hospital.',
    },
    'eng:ff4-present-simple': {
      points: [
        'Hiện tại đơn dùng để nói về thói quen, việc lặp lại hằng ngày hoặc sự thật quen thuộc.',
        'Với he hoặc she, động từ khẳng định thường thêm s hoặc es.',
        'Trong câu hỏi và câu phủ định, con nhớ quay về động từ nguyên mẫu sau do hoặc does.',
      ],
      example: 'Ví dụ: He walks to school. Does he walk to school? Yes, he does.',
    },
    'eng:ff4-be-have': {
      points: [
        'Động từ be giúp con nói về người, trạng thái hoặc đặc điểm.',
        'Have got giúp con nói ai có cái gì hoặc có đặc điểm gì.',
        'Con nên để ý chủ ngữ để chọn đúng am, is, are hoặc have got, has got.',
      ],
      example: 'Ví dụ: She is friendly. She has got a blue bag.',
    },
    'eng:ff4-reading-short': {
      points: [
        'Bài đọc ngắn lớp 4 thường rất ngắn nên con cần tìm đúng tên người, thời gian và hoạt động chính.',
        'Đọc câu hỏi trước sẽ giúp con biết cần tìm ý chính hay chi tiết.',
        'Nếu chưa chắc, quay lại đúng câu trong đoạn đọc để kiểm tra bằng chứng.',
      ],
      example: 'Ví dụ: nếu câu hỏi hỏi “How does Mai go to school?”, con tìm lại câu có từ go to school.',
    },
    'eng:ff4-classroom': {
      points: [
        'Classroom language là các câu lệnh và lời nhắc quen thuộc trong tiết học.',
        'Con nên nghe cả cụm từ như open your book, work in pairs, be quiet.',
        'Hiểu các câu này sẽ giúp con theo kịp hoạt động học trên lớp.',
      ],
      example: 'Ví dụ: Open your book nghĩa là mở sách ra, còn Work in pairs là làm việc theo cặp.',
    },
    'eng:ff4-routines': {
      points: [
        'Chủ đề sinh hoạt hằng ngày giúp con nói về thời gian và việc làm quen thuộc mỗi ngày.',
        'Học theo thứ tự buổi sáng, đi học, buổi chiều, buổi tối sẽ dễ nhớ hơn.',
        'Con nên tập nói cả câu có thời gian để dùng được ngay trong giao tiếp.',
      ],
      example: 'Ví dụ: I get up at six o’clock and go to school at seven.',
    },
    'eng:ff4-subjects': {
      points: [
        'Tên môn học thường đi cùng hoạt động quen thuộc của môn đó.',
        'Con có thể liên hệ Science với quan sát, Art với vẽ, Music với hát và nghe nhạc.',
        'Khi nói về sở thích, con có thể dùng mẫu: My favorite subject is ...',
      ],
      example: 'Ví dụ: My favorite subject is Science because I like experiments.',
    },
    'eng:ff4-feelings': {
      points: [
        'Từ chỉ cảm xúc giúp con nói về bản thân và phản ứng của mình trong các tình huống hằng ngày.',
        'Con nên gắn từ với nét mặt hoặc một tình huống thật để nhớ lâu hơn.',
        'Khi nói thành câu, con có thể dùng I feel ... hoặc She feels ...',
      ],
      example: 'Ví dụ: I feel excited on my birthday, but I feel tired after running.',
    },
  };

  const found = map[key];
  return found ? { ...found, sourceLabel: ENGLISH_SOURCE } : null;
}

export function getOfficialVietnameseTheory({ skillType = '', title = '' } = {}) {
  const skill = clean(skillType);
  const t = clean(title).toLowerCase();

  if (/danh từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Ở lớp 4, kiến thức tiếng Việt được dạy để con nhận biết và vận dụng vào đọc, viết, nói, nghe.',
        'Danh từ là từ gọi tên sự vật như người, con vật, đồ vật, hiện tượng hoặc khái niệm.',
        'Con nên đặt từ vào câu để kiểm tra xem nó có đang làm nhiệm vụ gọi tên hay không.',
      ],
      example: 'Ví dụ: trong câu “Lan đọc sách”, từ “Lan” và “sách” đều là danh từ.',
    };
  }

  if (/câu chủ đề|đoạn văn/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tiếng Việt 4 rèn cho con tìm ý chính rồi mới trả lời hoặc viết tiếp.',
        'Câu chủ đề là câu nêu ý khái quát nhất của cả đoạn văn.',
        'Các câu còn lại thường làm rõ cho ý chính bằng chi tiết, ví dụ hoặc lời giải thích.',
      ],
      example: 'Ví dụ: muốn tìm câu chủ đề, con xem câu nào bao quát được toàn bộ đoạn.',
    };
  }

  if (/dấu gạch ngang/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Kiến thức tiếng Việt lớp 4 không học theo kiểu nhớ định nghĩa khô cứng mà học để dùng đúng trong câu.',
        'Dấu gạch ngang có thể dùng để đánh dấu lời nói của nhân vật hoặc đánh dấu các ý trong đoạn liệt kê.',
        'Con cần nhìn vị trí của dấu câu trong ngữ cảnh để hiểu đúng tác dụng của nó.',
      ],
      example: 'Ví dụ: khi một nhân vật bắt đầu nói, dấu gạch ngang thường đứng ở đầu dòng lời thoại.',
    };
  }

  if (/động từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Động từ là từ chỉ hoạt động (chạy, viết, hát) hoặc trạng thái (ngủ, đứng) của người, vật.',
        'Muốn tìm động từ, con hỏi: ai đang làm gì? ai đang ở trạng thái nào?',
        'Động từ thường đứng sau chủ ngữ và có thể đi kèm các từ đang, sẽ, đã để chỉ thời gian.',
      ],
      example: 'Ví dụ: "Gió thổi nhẹ" — "thổi" là động từ chỉ hoạt động của gió.',
    };
  }

  if (/tính từ|tình từ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tính từ là từ chỉ đặc điểm, tính chất của người, vật, hiện tượng như màu sắc, hình dạng, phẩm chất.',
        'Muốn tìm tính từ, con hỏi: nó thế nào? màu gì? ra sao?',
        'Tính từ thường đứng sau danh từ để mô tả hoặc đứng sau từ rất, khá để tăng mức độ.',
      ],
      example: 'Ví dụ: "Bầu trời xanh thẳm" — "xanh thẳm" là tính từ mô tả màu sắc của bầu trời.',
    };
  }

  if (/trạng ngữ/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Trạng ngữ là thành phần phụ của câu, bổ sung thông tin về thời gian, nơi chốn, nguyên nhân, mục đích hoặc phương tiện.',
        'Trạng ngữ thường đứng ở đầu câu và được ngăn cách bằng dấu phẩy.',
        'Muốn tìm trạng ngữ, con hỏi: hành động xảy ra khi nào? ở đâu? vì sao? để làm gì?',
      ],
      example: 'Ví dụ: "Sáng sớm, em tập thể dục." — "Sáng sớm" là trạng ngữ chỉ thời gian.',
    };
  }

  if (/chủ ngữ|vị ngữ|hai thành phần/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Câu đầy đủ thường có hai thành phần chính: chủ ngữ (ai? cái gì?) và vị ngữ (làm gì? thế nào?).',
        'Chủ ngữ thường là danh từ hoặc cụm danh từ đứng ở đầu câu.',
        'Vị ngữ thường là động từ hoặc tính từ, cho biết chủ ngữ làm gì hoặc có đặc điểm gì.',
      ],
      example: 'Ví dụ: "Gió thổi mạnh." — Chủ ngữ: Gió; Vị ngữ: thổi mạnh.',
    };
  }

  if (/nhân hóa/.test(t)) {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Nhân hóa là biện pháp tu từ dùng từ ngữ chỉ người để miêu tả sự vật, con vật.',
        'Nhân hóa giúp sự vật trở nên gần gũi, sinh động như có tâm hồn, cảm xúc.',
        'Có thể nhân hóa bằng cách gọi tên (chú chim), hỏi thăm, hoặc gán hành động/cảm xúc của người.',
      ],
      example: 'Ví dụ: "Chú gió ơi, chú đi đâu thế?" — gọi gió bằng "chú" và hỏi như hỏi người.',
    };
  }

  if (skill === 'Đọc') {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Bài đọc lớp 4 thường yêu cầu con không chỉ nhớ chi tiết mà còn biết suy luận và rút ra ý nghĩa.',
        'Con nên đọc chậm, gạch nhẹ từ khóa và tự hỏi đoạn này nói chủ yếu về điều gì.',
        'Khi trả lời, hãy quay lại đúng câu hoặc đúng đoạn làm bằng chứng.',
      ],
      example: 'Ví dụ: nếu câu hỏi hỏi về nhân vật, con tìm lại câu nói rõ việc làm hoặc lời nói của nhân vật ấy.',
    };
  }

  if (skill === 'Viết') {
    return {
      sourceLabel: VIE_SOURCE,
      points: [
        'Tiếng Việt 4 rèn viết theo quy trình: hiểu yêu cầu, tìm ý, sắp xếp ý rồi mới viết thành câu.',
        'Con không cần viết thật dài, nhưng cần viết đúng ý và rõ ràng.',
        'Khi xong bài, con nên đọc lại để xem các câu đã nối với nhau mạch lạc chưa.',
      ],
      example: 'Ví dụ: trước khi viết đoạn văn, con có thể nói miệng ý chính của từng câu trước.',
    };
  }

  return null;
}

const IT_SOURCE = 'Nguồn: SGK Tin học 4 (KNTT), Hoc10 tập huấn GV';
const HISTGEO_SOURCE = 'Nguồn: SGK Lịch sử và Địa lí 4 (KNTT)';

/**
 * Get SGK-based theory for Tin học 4 topics.
 * Wired in by kntt-topics.js buildSourceTheoryBlock for it entries.
 */
export function getOfficialItTheory({ title = '' } = {}) {
  const t = clean(title).toLowerCase();

  if (/phần cứng|phần mềm|hardware|software/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Máy tính gồm hai phần: phần cứng (hardware) là các bộ phận vật lý như màn hình, bàn phím, chuột, CPU.',
        'Phần mềm (software) là các chương trình chạy trên máy như hệ điều hành, Word, trò chơi — không sờ vào được.',
        'Hai phần này phối hợp với nhau để máy tính hoạt động và giúp ích cho người dùng.',
      ],
      example: 'Ví dụ: bàn phím là phần cứng (con sờ vào được); Microsoft Word là phần mềm (con dùng để soạn thảo).',
    };
  }

  if (/gõ bàn phím|luyện gõ|typing/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Gõ bàn phím đúng cách giúp con gõ nhanh hơn và bảo vệ cổ tay, vai, lưng.',
        'Đặt tay ở hàng cơ bản: ngón trỏ trái trên F, ngón trỏ phải trên J — mỗi ngón chịu trách nhiệm một nhóm phím.',
        'Nhìn màn hình, không nhìn bàn phím khi gõ là kỹ năng quan trọng cần luyện tập.',
      ],
      example: 'Ví dụ: Shift + chữ thường = chữ hoa; Ctrl+S = lưu file; Ctrl+Z = hoàn tác.',
    };
  }

  if (/tìm kiếm|internet|trang web/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Internet là mạng máy tính toàn cầu, kết nối hàng tỉ người và thiết bị với nhau.',
        'Muốn tìm kiếm thông tin, con dùng công cụ tìm kiếm (Google) và gõ từ khóa ngắn gọn, chính xác.',
        'Khi đọc thông tin trên mạng, cần kiểm tra độ tin cậy của nguồn và không chia sẻ thông tin cá nhân.',
      ],
      example: 'Ví dụ: thay vì gõ "tôi muốn biết sông dài nhất Việt Nam là gì", hãy gõ "sông dài nhất Việt Nam".',
    };
  }

  if (/tệp|thư mục|file|folder|lưu trữ/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Tệp (file) là đơn vị lưu trữ dữ liệu: văn bản (.docx), ảnh (.jpg), bài hát (.mp3)...',
        'Thư mục (folder) giúp nhóm các tệp liên quan lại, giống như tủ hồ sơ nhiều ngăn.',
        'Sắp xếp tệp có tổ chức (đặt tên rõ ràng, phân loại vào thư mục) giúp con dễ tìm lại về sau.',
      ],
      example: 'Ví dụ: tạo thư mục "Toán 4" → thư mục con "Bài tập" và "Ôn tập" → đặt tệp đúng chỗ.',
    };
  }

  if (/đạo đức|pháp luật|bản quyền|an toàn|văn hóa.*số/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Sử dụng phần mềm có bản quyền là tôn trọng công sức người tạo ra và tuân thủ pháp luật.',
        'Trên Internet, con cần bảo vệ thông tin cá nhân: không chia sẻ địa chỉ, số điện thoại cho người lạ.',
        'Khi gặp nội dung không phù hợp, con nên tắt ngay và báo cho cha mẹ hoặc thầy cô.',
      ],
      example: 'Ví dụ: phần mềm miễn phí hợp pháp (như Google Docs, LibreOffice) là lựa chọn tốt thay cho phần mềm lậu.',
    };
  }

  if (/trình chiếu|slide|powerpoint|hiệu ứng/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Bài trình chiếu (presentation) giúp trình bày ý tưởng có hình ảnh, màu sắc rõ ràng trước người xem.',
        'Mỗi trang gọi là slide; nên dùng ít chữ, nhiều ý chính và hình ảnh minh họa phù hợp.',
        'Hiệu ứng chuyển trang giúp bài sinh động hơn — chọn vừa phải, không quá rườm rà.',
      ],
      example: 'Ví dụ: tiêu đề slide dùng chữ to (36-40pt), nội dung dùng gạch đầu dòng ngắn gọn, không quá 5-6 dòng/slide.',
    };
  }

  if (/soạn thảo|văn bản|word|chỉnh sửa văn/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Phần mềm soạn thảo văn bản (Word, Google Docs) giúp nhập, chỉnh sửa và định dạng tài liệu.',
        'Các phím tắt quan trọng: Ctrl+S (lưu), Ctrl+B (đậm), Ctrl+I (nghiêng), Ctrl+Z (hoàn tác).',
        'Lưu tệp thường xuyên để tránh mất dữ liệu khi mất điện hoặc máy gặp sự cố.',
      ],
      example: 'Ví dụ: viết bài xong, con nhấn Ctrl+S để lưu, rồi đọc lại từ đầu để kiểm tra lỗi chính tả.',
    };
  }

  if (/lập trình|chơi với máy|scratch/.test(t)) {
    return {
      sourceLabel: IT_SOURCE,
      points: [
        'Lập trình là viết các lệnh để máy tính thực hiện theo ý muốn — như ra lệnh cho một người trợ lý.',
        'Lập trình trực quan (Scratch) dùng khối lệnh màu sắc, kéo thả — không cần nhớ câu lệnh phức tạp.',
        'Tư duy lập trình giúp con chia bài toán khó thành các bước nhỏ, giải quyết từng bước một.',
      ],
      example: 'Ví dụ: "Con mèo đi 5 bước, rồi quay phải 90°, rồi nói Xin chào!" — đây là một chương trình đơn giản.',
    };
  }

  // Generic IT fallback
  return {
    sourceLabel: IT_SOURCE,
    points: [
      'Tin học lớp 4 giúp con học cách dùng máy tính một cách an toàn, hiệu quả và có đạo đức.',
      'Quan trọng nhất: hiểu rõ một thao tác dùng để làm gì, rồi mới thực hành — đừng bấm thử liên tục mà không biết mục đích.',
      'An toàn thông tin và đạo đức khi dùng máy tính là kỹ năng quan trọng suốt cuộc đời.',
    ],
    example: 'Ví dụ: trước khi xóa một tệp, con nên kiểm tra đây có phải tệp quan trọng không và có thể phục hồi từ Thùng rác không.',
  };
}

/**
 * Get SGK-based theory for Lịch sử và Địa lí 4 topics.
 */
export function getOfficialHistgeoTheory({ title = '', unit = '' } = {}) {
  const t = clean(title).toLowerCase();
  const u = clean(unit).toLowerCase();

  if (/sông hồng|văn minh.*hồng|hồng.*văn minh/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Sông Hồng bắt nguồn từ Vân Nam (Trung Quốc), chảy vào Việt Nam qua Lào Cai, đổ ra biển ở Nam Định và Thái Bình.',
        'Nước sông màu đỏ do phù sa sét đỏ — phù sa này bồi đắp tạo nên Đồng bằng Bắc Bộ màu mỡ.',
        'Văn minh sông Hồng là cái nôi của dân tộc Việt: nông nghiệp lúa nước, trống đồng Đông Sơn, các làng nghề thủ công.',
      ],
      example: 'Ví dụ: nhờ phù sa sông Hồng, Đồng bằng Bắc Bộ là vùng đất nông nghiệp màu mỡ, nuôi sống hàng chục triệu người.',
    };
  }

  if (/thăng long|hà nội|văn miếu|quốc tử giám|hồ gươm|hồ hoàn kiếm/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Thăng Long (nay là Hà Nội) được vua Lý Thái Tổ chọn làm kinh đô năm 1010 vì vị trí trung tâm, đất rộng, cao ráo.',
        'Văn Miếu - Quốc Tử Giám (thành lập 1070-1076) là trường đại học đầu tiên của Việt Nam.',
        'Hồ Hoàn Kiếm gắn với truyền thuyết vua Lê Lợi trả gươm thần cho Rùa Vàng sau khi đánh đuổi giặc Minh.',
      ],
      example: 'Ví dụ: mỗi năm vào tháng 3 âm lịch, học sinh cả nước hướng về Phú Thọ để nhớ ơn các Vua Hùng dựng nước.',
    };
  }

  if (/đền hùng|hùng vương/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Đền Hùng ở tỉnh Phú Thọ là nơi thờ các Vua Hùng — những người dựng nên nhà nước đầu tiên của Việt Nam.',
        'Lễ giỗ Tổ Hùng Vương (10/3 âm lịch) là ngày Quốc giỗ, nhắc nhở con cháu nhớ về cội nguồn.',
        '"Dù ai đi ngược về xuôi / Nhớ ngày giỗ Tổ mùng mười tháng ba" — câu ca dao nổi tiếng về truyền thống uống nước nhớ nguồn.',
      ],
      example: 'Ví dụ: câu chuyện Lạc Long Quân và Âu Cơ sinh ra 100 người con — 50 xuống biển, 50 lên núi — giải thích nguồn gốc cộng đồng người Việt.',
    };
  }

  if (/tây nguyên|cồng chiêng/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Tây Nguyên là cao nguyên rộng lớn, đất đỏ bazan màu mỡ, rất phù hợp trồng cà phê, cao su và hồ tiêu.',
        'Đây là vùng sinh sống của nhiều dân tộc thiểu số (Ê Đê, Mnông, Ba Na, Gia Rai...) với văn hóa cồng chiêng độc đáo.',
        'Lễ hội cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản văn hóa phi vật thể thế giới năm 2005.',
      ],
      example: 'Ví dụ: cồng chiêng vang lên trong các lễ cúng thần, đám cưới, lễ mừng lúa mới — là "tiếng nói của tâm hồn" dân tộc Tây Nguyên.',
    };
  }

  if (/nam bộ|mê kông|cửu long|đồng bằng nam/.test(t)) {
    return {
      sourceLabel: HISTGEO_SOURCE,
      points: [
        'Đồng bằng Nam Bộ được bồi đắp bởi phù sa sông Mê Kông — vựa lúa lớn nhất Việt Nam, chiếm hơn 50% sản lượng lúa cả nước.',
        'Vùng sông nước Nam Bộ có hệ thống kênh rạch chằng chịt, chợ nổi và cuộc sống gắn liền với thuyền, ghe.',
        'TP. Hồ Chí Minh là đô thị lớn nhất Việt Nam, trung tâm kinh tế - thương mại phía Nam.',
      ],
      example: 'Ví dụ: chợ nổi Cái Răng (Cần Thơ) là nơi mua bán trên sông, người dùng sào treo mẫu hàng để khách dễ nhận biết.',
    };
  }

  // Generic histgeo fallback
  return {
    sourceLabel: HISTGEO_SOURCE,
    points: [
      'Mỗi vùng địa lý Việt Nam có đặc điểm thiên nhiên, dân cư và văn hóa riêng biệt — tạo nên sự đa dạng phong phú của đất nước.',
      'Khi học địa lý, con hãy gắn kiến thức với bản đồ: xác định vị trí, vùng giáp ranh và đặc điểm nổi bật.',
      'Khi học lịch sử, con hãy nhớ: ai? ở đâu? khi nào? kết quả gì? — bốn câu hỏi giúp con nắm chắc sự kiện.',
    ],
    example: 'Ví dụ: Đền Hùng ở Phú Thọ (ai: Vua Hùng; ở đâu: Phú Thọ; khi nào: hàng nghìn năm trước; kết quả: lập nước Văn Lang).',
  };
}
