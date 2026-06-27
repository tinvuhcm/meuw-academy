/**
 * MEUW ACADEMY — it-question-generator.js
 *
 * Generates real Tin học 4 (KNTT) questions from SGK content.
 *
 * Source: Tin học 4 KNTT — 13 lessons across 6 units:
 *   1. Máy tính và em (Bài 1-2)
 *   2. Mạng máy tính và Internet (Bài 3)
 *   3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin (Bài 4-5)
 *   4. Đạo đức, pháp luật và văn hóa trong môi trường số (Bài 6)
 *   5. Ứng dụng tin học (Bài 7-12)
 *   6. Giải quyết vấn đề với sự trợ giúp của máy tính (Bài 13)
 *
 * Pedagogy principle (from NXBGD teacher guide):
 *   - Học sinh tiểu học lớp 4 chủ yếu học sử dụng phần mềm đơn giản
 *   - Kết nối thực tiễn: mỗi thao tác phải biết "dùng để làm gì"
 *   - Thực hành xen lý thuyết; an toàn và đạo đức là yêu cầu xuyên suốt
 */

function stableHash(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function createRng(seed) {
  let s = stableHash(String(seed)) || 123456789;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function seededShuffle(list, seed) {
  const arr = [...list];
  const rng = createRng(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function q(question, answer, others, explanation) {
  const uniqueOthers = others.filter((opt, i, arr) => opt !== answer && arr.indexOf(opt) === i);
  return { type: 'multiple-choice', question, options: [answer, ...uniqueOthers].slice(0, 4), answer, explanation };
}

// ─── Lesson-specific question banks ────────────────────────────────────────────

const BANKS = {

  // ── Bài 1: Phần cứng và phần mềm máy tính ─────────────────────────────
  'phan-cung-phan-mem': [
    q('Phần cứng máy tính là gì?',
      'Các bộ phận vật lý của máy tính mà con có thể nhìn thấy và sờ vào được',
      ['Chương trình hoặc ứng dụng chạy trên máy tính', 'Đường truyền Internet', 'Màn hình hiển thị kết quả'],
      'Phần cứng (hardware) gồm: màn hình, bàn phím, chuột, CPU, ổ đĩa... — những thứ có thể cầm nắm được.'),
    q('Phần mềm máy tính là gì?',
      'Tập hợp các chương trình, ứng dụng để điều khiển máy tính thực hiện công việc',
      ['Bộ phận điện tử bên trong máy', 'Màn hình và bàn phím', 'Cáp kết nối các thiết bị'],
      'Phần mềm (software) là các chương trình như hệ điều hành Windows, Word, trò chơi... — không thể sờ vào được.'),
    q('Bộ phận nào là phần cứng của máy tính?',
      'Bàn phím, chuột, màn hình',
      ['Microsoft Word', 'Windows 11', 'Trò chơi học toán'],
      'Bàn phím, chuột, màn hình là thiết bị vật lý → phần cứng. Phần mềm là các chương trình chạy trên máy.'),
    q('Bộ phận nào là trung tâm xử lý của máy tính?',
      'CPU (bộ xử lý trung tâm)',
      ['Màn hình', 'Bàn phím', 'Loa'],
      'CPU (Central Processing Unit) là bộ não của máy tính — nó xử lý mọi tính toán và điều khiển các bộ phận khác.'),
    q('Thiết bị nào dùng để nhập thông tin vào máy tính?',
      'Bàn phím và chuột',
      ['Màn hình', 'Loa', 'Máy in'],
      'Bàn phím và chuột là thiết bị nhập (input). Màn hình và máy in là thiết bị xuất (output).'),
    q('Thiết bị nào dùng để xuất kết quả ra ngoài máy tính?',
      'Màn hình và máy in',
      ['Bàn phím', 'Chuột', 'Ổ đĩa USB'],
      'Màn hình hiển thị và máy in in kết quả ra → đây là thiết bị xuất. Bàn phím, chuột dùng để nhập.'),
    q('Phần mềm hệ điều hành có vai trò gì?',
      'Điều phối hoạt động của tất cả các thiết bị và phần mềm khác',
      ['Chỉ để xem phim và nghe nhạc', 'Chỉ để kết nối Internet', 'Chỉ để in tài liệu'],
      'Hệ điều hành (Windows, macOS...) là phần mềm nền tảng, giúp phần cứng và các phần mềm khác hoạt động cùng nhau.'),
    q('Ổ đĩa USB dùng để làm gì?',
      'Lưu trữ và chuyển dữ liệu giữa các máy tính',
      ['Nhập văn bản vào máy', 'Hiển thị hình ảnh', 'Phát âm thanh'],
      'USB (ổ nhớ flash) là thiết bị lưu trữ di động — có thể cắm vào máy để sao chép, lưu hoặc chuyển file.'),
  ],

  // ── Bài 2: Gõ bàn phím đúng cách ─────────────────────────────────────
  'go-ban-phim': [
    q('Khi gõ bàn phím đúng cách, tay nên đặt ở đâu?',
      'Đặt tay ở hàng phím cơ bản: ngón trỏ trái trên F, ngón trỏ phải trên J',
      ['Đặt hai tay bất kỳ vào vị trí thuận tiện nhất', 'Chỉ dùng hai ngón trỏ để gõ', 'Đặt cả bàn tay lên bàn phím'],
      'Hàng phím cơ bản (home row): tay trái đặt ở A-S-D-F, tay phải đặt ở J-K-L-;. Đây là vị trí xuất phát chuẩn.'),
    q('Phím nào giúp gõ chữ hoa?',
      'Phím Shift',
      ['Phím Enter', 'Phím Ctrl', 'Phím Alt'],
      'Giữ Shift + gõ một chữ → chữ hoa. Caps Lock bật thì toàn bộ chữ gõ ra đều hoa.'),
    q('Phím nào dùng để xuống dòng mới hoặc xác nhận lệnh?',
      'Phím Enter',
      ['Phím Shift', 'Phím Space', 'Phím Backspace'],
      'Phím Enter (↵) vừa xuống dòng trong văn bản, vừa xác nhận lệnh trong hộp thoại.'),
    q('Phím nào dùng để xóa ký tự bên trái con trỏ?',
      'Phím Backspace',
      ['Phím Delete', 'Phím Escape', 'Phím Insert'],
      'Backspace xóa ký tự ĐỨng TRƯỚC (bên trái) con trỏ. Delete xóa ký tự ĐỨng SAU (bên phải) con trỏ.'),
    q('Lợi ích của việc gõ bàn phím đúng cách là gì?',
      'Gõ nhanh hơn, ít mỏi tay hơn và hạn chế chấn thương',
      ['Làm máy tính chạy nhanh hơn', 'Tiết kiệm điện', 'Màn hình sáng hơn'],
      'Gõ 10 ngón đúng tư thế giúp tốc độ gõ tăng đáng kể và bảo vệ cổ tay, vai, lưng.'),
    q('Phần mềm luyện gõ bàn phím có tác dụng gì?',
      'Giúp luyện tập gõ đúng phím, đúng ngón tay qua các bài tập có hướng dẫn',
      ['Sửa lỗi văn bản tự động', 'Dịch văn bản sang tiếng Anh', 'Tạo bài trình chiếu'],
      'Phần mềm luyện gõ (như Mario Types, TypingClub...) có bài tập cụ thể, phản hồi ngay về tốc độ và độ chính xác.'),
    q('Khi gõ các phím ở hàng trên (như Q, W, E, R), con cần chú ý điều gì?',
      'Vươn ngón tay lên gõ rồi thu tay về lại hàng phím cơ bản',
      ['Giữ nguyên tay ở hàng trên luôn', 'Nhìn bàn phím liên tục', 'Dùng một ngón tay gõ hết'],
      'Nguyên tắc gõ 10 ngón: sau khi gõ xong phím ở hàng trên hoặc dưới, các ngón tay luôn quay về vị trí chuẩn (A-S-D-F và J-K-L-;).'),
  ],

  // ── Bài 3: Thông tin trên trang web ──────────────────────────────────
  'trang-web': [
    q('Trang web (website) là gì?',
      'Tập hợp các trang thông tin trên Internet, có thể xem qua trình duyệt web',
      ['Phần mềm soạn thảo văn bản', 'Ứng dụng chỉnh sửa ảnh', 'Màn hình của máy tính'],
      'Website là tập hợp các trang thông tin (văn bản, hình ảnh, video) được lưu trên máy chủ và xem qua Internet.'),
    q('Trình duyệt web dùng để làm gì?',
      'Xem các trang web trên Internet',
      ['Soạn thảo văn bản Word', 'Chỉnh sửa ảnh', 'Gõ bàn phím'],
      'Trình duyệt web (Chrome, Firefox, Edge...) là phần mềm để mở và xem trang web.'),
    q('Địa chỉ trang web gọi là gì?',
      'URL (đường dẫn, ví dụ: https://www.google.com)',
      ['Tên file', 'Tên thư mục', 'Mật khẩu'],
      'URL (Uniform Resource Locator) là địa chỉ duy nhất của mỗi trang web, thường bắt đầu bằng https://'),
    q('Khi xem thông tin trên trang web, cần chú ý điều gì?',
      'Kiểm tra độ tin cậy của nguồn thông tin và không chia sẻ thông tin cá nhân',
      ['Xem thật nhanh để tiết kiệm thời gian', 'Chép toàn bộ nội dung mà không cần đọc kỹ', 'Chỉ xem trang web có nhiều quảng cáo'],
      'Internet có nhiều thông tin sai lệch. Hãy kiểm tra nguồn đáng tin (báo chính thức, trang giáo dục) và bảo vệ thông tin cá nhân.'),
    q('Liên kết (link) trên trang web thường có dạng nào?',
      'Chữ có màu khác hoặc được gạch chân, khi nhấn sẽ dẫn đến trang khác',
      ['Chữ in hoa, màu đỏ, không thể nhấn được', 'Hình ảnh nền của trang', 'Tiêu đề bài viết'],
      'Liên kết (hyperlink) thường màu xanh có gạch chân. Khi di chuột qua, con trỏ đổi thành bàn tay.'),
    q('Khi sử dụng Internet, siêu liên kết (hyperlink) giúp ích gì?',
      'Giúp di chuyển nhanh chóng từ trang web này sang trang web khác chỉ bằng một cú nhấp chuột',
      ['Giúp tải file nhanh hơn', 'Ngăn chặn virus máy tính', 'Sửa lỗi bàn phím'],
      'Siêu liên kết kết nối các trang web lại với nhau thành mạng lưới, giúp người dùng dễ dàng duyệt thông tin.'),
    q('Nut "Back" (Quay lại) trên trình duyệt dùng để làm gì?',
      'Quay lại trang web con vừa xem trước đó',
      ['Đóng trình duyệt', 'Chuyển sang trang tiếp theo', 'Lưu trang web vào máy'],
      'Nut Back (mũi tên hướng trái) rất hữu ích để trở về trang trước nếu con vô tình nhấp nhầm liên kết.'),
  ],

  // ── Bài 4: Tìm kiếm thông tin trên Internet ───────────────────────────
  'tim-kiem-internet': [
    q('Công cụ tìm kiếm phổ biến nhất hiện nay là gì?',
      'Google (google.com)',
      ['Microsoft Word', 'Notepad', 'Paint'],
      'Google là công cụ tìm kiếm phổ biến nhất thế giới. Bing, Yahoo cũng là công cụ tìm kiếm.'),
    q('Để tìm kiếm thông tin trên Internet hiệu quả, con nên làm gì?',
      'Gõ từ khóa rõ ràng, ngắn gọn và cụ thể vào ô tìm kiếm',
      ['Gõ toàn bộ câu hỏi dài dòng', 'Chỉ nhấn Enter mà không gõ gì', 'Gõ tên bài hát yêu thích'],
      'Từ khóa tốt là ngắn gọn, đúng chủ đề. Ví dụ: thay vì gõ "tôi muốn biết thủ đô của Việt Nam là ở đâu" hãy gõ "thủ đô Việt Nam".'),
    q('Sau khi tìm kiếm, danh sách kết quả hiện ra gọi là gì?',
      'Kết quả tìm kiếm (search results)',
      ['Danh sách phần cứng', 'Menu phần mềm', 'Thư mục trên máy tính'],
      'Kết quả tìm kiếm là danh sách các trang web phù hợp với từ khóa, được xếp theo mức độ liên quan.'),
    q('Khi tìm kiếm thông tin, con nên làm gì với kết quả tìm được?',
      'Đọc kỹ từ nhiều nguồn để so sánh và kiểm tra độ chính xác',
      ['Tin ngay kết quả đầu tiên mà không cần kiểm tra', 'Chép lại toàn bộ mà không đọc', 'Chỉ dùng kết quả có nhiều hình ảnh nhất'],
      'Thông tin trên Internet có thể sai. Hãy đọc nhiều nguồn, ưu tiên nguồn uy tín như trang giáo dục, báo chính thống.'),
    q('Làm thế nào để tìm hình ảnh thay vì văn bản trên Google?',
      'Nhấp vào thẻ "Hình ảnh" (Images) ngay dưới ô tìm kiếm',
      ['Gõ chữ thật to', 'Đóng trình duyệt mở lại', 'Chỉ gõ tên màu sắc'],
      'Công cụ tìm kiếm có các thẻ riêng cho Hình ảnh, Video, Tin tức... giúp con lọc đúng loại thông tin cần tìm.'),
    q('Nếu từ khóa đầu tiên không ra kết quả như ý, con nên làm gì?',
      'Thay đổi từ khóa khác sát nghĩa hơn hoặc thêm bớt các từ',
      ['Tắt máy tính nghỉ chơi', 'Gõ lại chính xác từ khóa đó 10 lần', 'Khóc và nhờ bạn khác'],
      'Tìm kiếm là kỹ năng thử nghiệm. Nếu không thấy, hãy đổi cách gọi tên sự vật hoặc dùng từ ngắn hơn.'),
    q('Tại sao không nên sao chép 100% bài văn tìm được trên mạng làm bài tập của mình?',
      'Vì đó là sao chép công sức người khác và mình sẽ không học được gì',
      ['Vì bài trên mạng hay bị sai chính tả', 'Vì in ra tốn giấy', 'Vì thầy cô không có Internet'],
      'Thông tin trên mạng dùng để tham khảo, lấy ý tưởng, sau đó con phải tự viết lại bằng lời và hiểu biết của mình.'),
  ],

  // ── Bài 5: Thao tác với tệp và thư mục ───────────────────────────────
  'tep-thu-muc': [
    q('Tệp (file) máy tính là gì?',
      'Đơn vị lưu trữ thông tin trên máy tính, như tài liệu, ảnh, bài hát...',
      ['Một bộ phận vật lý của máy tính', 'Phần mềm hệ điều hành', 'Dây kết nối các thiết bị'],
      'Tệp (file) chứa dữ liệu như văn bản (.docx), ảnh (.jpg), âm thanh (.mp3). Tên tệp thường có phần mở rộng.'),
    q('Thư mục (folder) máy tính dùng để làm gì?',
      'Chứa và sắp xếp các tệp, giúp dễ tìm kiếm và quản lý',
      ['Lưu trữ phần mềm hệ điều hành', 'Kết nối với Internet', 'Điều khiển màn hình'],
      'Thư mục như tủ hồ sơ — giúp nhóm các tệp liên quan lại với nhau. Con có thể tạo thư mục con bên trong thư mục.'),
    q('Khi sao chép (copy) tệp, điều gì xảy ra?',
      'Tạo ra một bản sao của tệp ở vị trí mới, tệp gốc vẫn còn',
      ['Tệp gốc bị xóa đi', 'Tệp được di chuyển sang nơi mới', 'Tệp bị thu nhỏ kích thước'],
      'Copy (Ctrl+C) → Paste (Ctrl+V) tạo bản sao. Cut (Ctrl+X) → Paste di chuyển tệp và xóa bản gốc.'),
    q('Khi xóa một tệp, tệp đó được đưa về đâu trước?',
      'Thùng rác (Recycle Bin), chưa xóa vĩnh viễn',
      ['Bị xóa vĩnh viễn ngay lập tức', 'Được gửi ra Internet', 'Được nén thành file ZIP'],
      'Khi xóa, file vào Thùng rác. Con có thể phục hồi từ đó. Muốn xóa vĩnh viễn, phải làm trống Thùng rác.'),
    q('Cách tổ chức tệp nào giúp con dễ tìm lại tài liệu nhất?',
      'Tạo thư mục theo chủ đề và đặt tên tệp rõ ràng, có ý nghĩa',
      ['Để tất cả tệp trên màn hình desktop', 'Đặt tên tệp ngẫu nhiên số như 1, 2, 3', 'Không cần sắp xếp, tìm bằng thanh tìm kiếm'],
      'Ví dụ: thư mục "Toán lớp 4" → thư mục con "Bài tập" và "Ôn tập". Tên tệp như "bai-tap-phan-so-tuan-5.docx" dễ tìm hơn "abc.docx".'),
    q('Đuôi của tệp (ví dụ .docx, .jpg) cho con biết điều gì?',
      'Loại tệp và phần mềm cần dùng để mở nó',
      ['Dung lượng tệp lớn hay nhỏ', 'Ngày tệp được tạo', 'Mật khẩu của tệp'],
      'Phần đuôi tệp (extension) rất quan trọng: .docx là văn bản Word, .jpg là hình ảnh, .mp3 là âm thanh.'),
    q('Thao tác Đổi tên (Rename) thư mục hoặc tệp được thực hiện như thế nào?',
      'Nhấn chuột phải vào tệp/thư mục, chọn Rename và gõ tên mới',
      ['Kéo thả tệp vào Thùng rác', 'Nhấn đúp chuột thật nhanh', 'Nhấn phím Shift liên tục'],
      'Nhấn chuột phải để mở menu ngữ cảnh, sau đó chọn Rename (Đổi tên). Hoặc có thể chọn tệp rồi nhấn phím F2.'),
  ],

  // ── Bài 6: Sử dụng phần mềm khi được phép ────────────────────────────
  'dao-duc-phap-luat': [
    q('Tại sao không nên sử dụng phần mềm lậu (không có bản quyền)?',
      'Vì đó là hành vi vi phạm pháp luật và có thể mang virus gây hại cho máy tính',
      ['Vì phần mềm lậu chạy chậm hơn', 'Vì không có màu đẹp', 'Vì chiếm nhiều dung lượng hơn'],
      'Phần mềm có bản quyền bảo vệ công sức người tạo ra. Phần mềm lậu vi phạm luật sở hữu trí tuệ và thường chứa virus.'),
    q('Khi dùng máy tính ở trường, con nên làm gì?',
      'Chỉ mở phần mềm và tệp được thầy cô cho phép; giữ gìn máy tính cẩn thận',
      ['Mở bất kỳ phần mềm nào mình thích', 'Xem phim trực tuyến trong giờ học', 'Thay đổi cài đặt hệ thống tùy ý'],
      'Thiết bị trường học là tài sản chung. Sử dụng đúng mục đích, không tải/cài phần mềm lạ, không thay đổi cài đặt.'),
    q('Thông tin cá nhân nào cần bảo mật khi dùng Internet?',
      'Họ tên, địa chỉ nhà, số điện thoại và mật khẩu tài khoản',
      ['Tên môn học yêu thích', 'Màu sắc yêu thích', 'Tên sách giáo khoa đang dùng'],
      'Không cung cấp thông tin cá nhân (địa chỉ, số điện thoại gia đình, mật khẩu) cho người lạ trên mạng.'),
    q('Khi gặp nội dung xấu hoặc không phù hợp trên Internet, con nên làm gì?',
      'Tắt trang web đó ngay và báo cho cha mẹ hoặc thầy cô',
      ['Tiếp tục xem và không nói với ai', 'Chia sẻ với bạn bè để mọi người biết', 'Lưu lại để xem sau'],
      'Nếu gặp nội dung gây khó chịu hoặc không phù hợp, thoát ngay và báo người lớn đáng tin cậy.'),
    q('Phần mềm độc hại (virus) có thể lây lan qua đường nào?',
      'Qua các tệp tải từ Internet không rõ nguồn gốc hoặc USB bị nhiễm',
      ['Qua việc gõ phím quá nhanh', 'Qua màn hình sáng chói', 'Qua quạt tản nhiệt máy tính'],
      'Virus thường ẩn trong phần mềm lạ, link lạ. Hãy luôn cẩn thận khi tải tệp và không cắm USB lạ vào máy tính.'),
    q('Bắt nạt qua mạng (Cyberbullying) là hành vi như thế nào?',
      'Dùng tin nhắn, hình ảnh trên mạng để chê bai, đe dọa làm tổn thương người khác',
      ['Đánh nhau ở sân trường', 'Tắt máy tính của bạn', 'Làm rách sách giáo khoa'],
      'Bắt nạt trên mạng rất nguy hiểm vì nó lan truyền nhanh. Cần báo người lớn ngay nếu con hoặc bạn bè bị bắt nạt.'),
    q('Mật khẩu máy tính mạnh thường có đặc điểm gì?',
      'Có cả chữ hoa, chữ thường, số và không dễ đoán (như ngày sinh)',
      ['Chỉ dùng các số 123456', 'Dùng tên gọi của mình ở nhà', 'Chỉ dùng đúng một chữ cái'],
      'Mật khẩu an toàn giúp bảo vệ tài khoản khỏi kẻ xấu. Không nên chia sẻ mật khẩu (trừ cha mẹ).'),
  ],

  // ── Bài 7-9: Tạo bài trình chiếu (Presentation) ──────────────────────
  'trinh-chieu': [
    q('Phần mềm trình chiếu thường dùng để làm gì?',
      'Tạo các trang chiếu (slide) có văn bản, hình ảnh để trình bày trước lớp',
      ['Soạn thảo văn bản dài', 'Tính toán số liệu', 'Vẽ tranh kỹ thuật số'],
      'Phần mềm trình chiếu (PowerPoint, Google Slides...) giúp tạo bài thuyết trình có hình ảnh, tiêu đề và nội dung theo trang.'),
    q('Một trang trong bài trình chiếu được gọi là gì?',
      'Trang chiếu (slide)',
      ['Đoạn văn (paragraph)', 'Tệp (file)', 'Thư mục (folder)'],
      'Slide là đơn vị cơ bản của bài trình chiếu. Một bài thuyết trình có thể gồm nhiều slide khác nhau.'),
    q('Định dạng văn bản trên slide bao gồm những gì?',
      'Thay đổi cỡ chữ, kiểu chữ (đậm, nghiêng), màu sắc và căn lề',
      ['Chỉ thay đổi màu nền', 'Chỉ thêm hình ảnh', 'Chỉ xóa chữ'],
      'Định dạng văn bản giúp bài trình chiếu trông đẹp và rõ ràng hơn. Tránh dùng quá nhiều màu và kiểu chữ khác nhau.'),
    q('Hiệu ứng chuyển trang (slide transition) là gì?',
      'Hiệu ứng chuyển động khi chuyển từ slide này sang slide tiếp theo',
      ['Màu sắc của tiêu đề', 'Kích thước của hình ảnh trên slide', 'Tên file bài trình chiếu'],
      'Transition effect tạo chuyển động khi chuyển slide (bay vào, mờ dần...). Chọn hiệu ứng phù hợp, không quá rườm rà.'),
    q('Bài trình chiếu tốt cần đảm bảo điều gì?',
      'Nội dung ngắn gọn, rõ ràng; chữ đủ to để đọc; hình ảnh phù hợp với nội dung',
      ['Càng nhiều chữ trên slide càng tốt', 'Mỗi slide phải có đủ 10 hình ảnh', 'Dùng toàn bộ màu sắc khác nhau'],
      'Nguyên tắc thiết kế slide: ít chữ, nhiều ý; hình ảnh minh họa; màu sắc hài hòa; chữ đủ to để nhìn rõ từ xa.'),
    q('Chức năng Trình chiếu (Slide Show) dùng để làm gì?',
      'Hiển thị slide toàn màn hình để người nghe xem dễ dàng khi thuyết trình',
      ['In slide ra giấy', 'Xóa toàn bộ slide', 'Tìm kiếm trên mạng'],
      'Chế độ Slide Show (phím tắt F5) phóng to bài làm ra toàn màn hình để bắt đầu trình bày trước người xem.'),
    q('Khi thêm hình ảnh vào slide, con nên chú ý điều gì?',
      'Kéo các góc ảnh để thu phóng, tránh kéo cạnh bên làm ảnh bị méo',
      ['Chỉ được kéo ở chính giữa ảnh', 'Phải làm ảnh che hết cả chữ', 'Luôn phải cắt đôi bức ảnh'],
      'Kéo ở các góc giúp giữ đúng tỷ lệ hình ảnh. Nếu kéo ở các cạnh dọc/ngang, ảnh sẽ bị dẹt hoặc lùn đi.'),
  ],

  // ── Bài 10-11: Phần mềm soạn thảo văn bản ────────────────────────────
  'soan-thao-van-ban': [
    q('Phần mềm soạn thảo văn bản dùng để làm gì?',
      'Nhập, chỉnh sửa, định dạng và lưu các tài liệu văn bản',
      ['Tính toán số liệu', 'Vẽ sơ đồ kỹ thuật', 'Tạo bài trình chiếu'],
      'Phần mềm soạn thảo (Word, Google Docs...) dùng để viết bài luận, báo cáo, thư, truyện ngắn...'),
    q('Phím tắt Ctrl+S dùng để làm gì?',
      'Lưu tệp văn bản',
      ['Sao chép (copy)', 'Dán (paste)', 'Hoàn tác thao tác vừa làm'],
      'Ctrl+S = Save (lưu). Ctrl+C = Copy, Ctrl+V = Paste, Ctrl+Z = Undo (hoàn tác). Nhớ lưu thường xuyên để không mất dữ liệu!'),
    q('Để làm cho một đoạn chữ in đậm, con dùng phím tắt nào?',
      'Ctrl+B (Bold)',
      ['Ctrl+I', 'Ctrl+U', 'Ctrl+D'],
      'Ctrl+B = Bold (đậm), Ctrl+I = Italic (nghiêng), Ctrl+U = Underline (gạch chân). Chọn chữ trước rồi mới bấm phím tắt.'),
    q('Khi chỉnh sửa văn bản, Ctrl+Z dùng để làm gì?',
      'Hoàn tác thao tác vừa thực hiện (Undo)',
      ['Lưu văn bản', 'Xóa toàn bộ nội dung', 'In văn bản'],
      'Ctrl+Z = Undo (hoàn tác). Nếu lỡ xóa nhầm hoặc thay đổi sai, Ctrl+Z giúp quay lại bước trước.'),
    q('Căn lề phải của văn bản bằng phím tắt nào?',
      'Ctrl+R (Right align)',
      ['Ctrl+L', 'Ctrl+E', 'Ctrl+J'],
      'Ctrl+L = Left (trái), Ctrl+R = Right (phải), Ctrl+E = Center (giữa), Ctrl+J = Justify (đều hai bên).'),
    q('Khi gõ tiếng Việt, phím Space (dấu cách) dùng để làm gì?',
      'Tạo một khoảng trắng giữa hai chữ',
      ['Xuống dòng mới', 'Xóa chữ cái', 'Lưu tài liệu'],
      'Giữa các chữ chỉ nên gõ MỘT phím Space. Không nên gõ nhiều Space liên tiếp để căn chỉnh chữ.'),
    q('Để chèn một hình ảnh vào văn bản Word, con chọn thẻ nào?',
      'Thẻ Insert (Chèn)',
      ['Thẻ Home (Trang chủ)', 'Thẻ View (Xem)', 'Thẻ File (Tệp)'],
      'Thẻ Insert chứa các lệnh để chèn hình ảnh, bảng biểu, hình vẽ vào văn bản.'),
  ],

  // ── Bài 13: Chơi với máy tính (lập trình trực quan) ──────────────────
  'lap-trinh-truc-quan': [
    q('Lập trình trực quan (visual programming) là gì?',
      'Lập trình bằng cách kéo thả các khối lệnh có màu sắc, không cần viết mã chữ',
      ['Viết chương trình bằng ngôn ngữ tiếng Anh thuần túy', 'Vẽ tranh trên máy tính', 'Sửa phần cứng máy tính'],
      'Lập trình trực quan (như Scratch) dùng các khối lệnh màu sắc để kéo, ghép thành chương trình — phù hợp cho học sinh tiểu học.'),
    q('Chương trình máy tính làm gì?',
      'Thực hiện một loạt các lệnh theo thứ tự để giải quyết một nhiệm vụ cụ thể',
      ['Tự vẽ tranh không cần lệnh', 'Chỉ hiển thị chữ số', 'Chỉ phát nhạc'],
      'Chương trình (program) là chuỗi lệnh mà máy tính sẽ thực hiện theo đúng thứ tự, từng bước một.'),
    q('Trong lập trình, lệnh lặp (loop) dùng để làm gì?',
      'Thực hiện một nhóm lệnh nhiều lần mà không cần viết lại lệnh đó',
      ['Xóa tất cả lệnh đã viết', 'Chỉ thực hiện lệnh một lần duy nhất', 'Dừng chương trình'],
      'Ví dụ: muốn nhân vật đi 10 bước 5 lần, dùng vòng lặp "lặp 5 lần: đi 10 bước" thay vì viết 5 lần lệnh "đi 10 bước".'),
    q('Trong Scratch hoặc lập trình trực quan, "sprite" là gì?',
      'Nhân vật hoặc hình ảnh được điều khiển bằng chương trình',
      ['Màu nền của sân khấu', 'Khối lệnh màu xanh', 'File âm thanh'],
      'Sprite là đối tượng (nhân vật, con vật, xe cộ...) trên màn hình mà chương trình điều khiển để chuyển động, nói chuyện, thay đổi hình dạng.'),
    q('Khi lập trình, nếu nhân vật làm sai ý con, con nên làm gì?',
      'Kiểm tra lại từng khối lệnh xem lỗi ở đâu rồi sửa lại (gỡ lỗi)',
      ['Khóc và tắt máy tính', 'Gõ mạnh vào bàn phím', 'Xóa sạch tất cả và không làm nữa'],
      'Gỡ lỗi (debugging) là kỹ năng rất quan trọng. Bất kỳ lập trình viên nào cũng có lúc làm sai, chỉ cần kiên nhẫn tìm và sửa.'),
    q('Sân khấu (Stage) trong Scratch là gì?',
      'Nơi các nhân vật hoạt động, biểu diễn để người xem nhìn thấy',
      ['Khu vực để kéo thả các lệnh', 'Hộp lưu trữ file âm thanh', 'Thùng rác'],
      'Sân khấu là nơi kết quả chương trình hiện ra. Con có thể thay đổi phông nền (backdrop) cho sân khấu.'),
    q('Khối lệnh sự kiện (thường có lá cờ xanh) có tác dụng gì?',
      'Kích hoạt bắt đầu cho toàn bộ chương trình chạy',
      ['Làm nhân vật biến mất', 'Tắt phần mềm Scratch', 'Thay đổi màu máy tính'],
      'Khối lệnh sự kiện báo cho nhân vật biết khi nào thì nên bắt đầu thực hiện các lệnh bên dưới nó.'),
  ],
};

// ─── Lesson title → bank key mapping ───────────────────────────────────────────

function pickBank(lessonTitle) {
  const t = String(lessonTitle || '').toLowerCase();
  if (/phần cứng|phần mềm|hardware|software/.test(t)) return BANKS['phan-cung-phan-mem'];
  if (/gõ bàn phím|bàn phím|luyện gõ|typing/.test(t)) return BANKS['go-ban-phim'];
  if (/trang web|trình duyệt|internet.*thông tin|thông tin.*web/.test(t)) return BANKS['trang-web'];
  if (/tìm kiếm|search/.test(t)) return BANKS['tim-kiem-internet'];
  if (/tệp|thư mục|file|folder|lưu trữ/.test(t)) return BANKS['tep-thu-muc'];
  if (/đạo đức|pháp luật|bản quyền|an toàn|văn hóa.*số/.test(t)) return BANKS['dao-duc-phap-luat'];
  if (/trình chiếu|slide|hiệu ứng|transition/.test(t)) return BANKS['trinh-chieu'];
  if (/soạn thảo|văn bản|word|chỉnh sửa văn/.test(t)) return BANKS['soan-thao-van-ban'];
  if (/lập trình|chơi với máy|scratch|robot|vấn đề.*máy|chương trình của em/.test(t)) return BANKS['lap-trinh-truc-quan'];
  // Generic IT fallback: mix of hardware/file/ethics
  return [...BANKS['phan-cung-phan-mem'].slice(0, 3), ...BANKS['tep-thu-muc'].slice(0, 3), ...BANKS['dao-duc-phap-luat'].slice(0, 2)];
}

/**
 * Main export: generate Tin học 4 KNTT questions.
 *
 * @param {object} topic    - Catalog topic with knttSource, subject, topicKey
 * @param {number} count    - Desired number of questions
 * @param {string} seedInput - Seed for deterministic shuffle
 */
export function generateItQuestions(topic, count = 8, seedInput = '') {
  const source = topic.knttSource || {};
  const lessonTitle = source.lesson || topic.title || '';
  const bank = pickBank(lessonTitle);
  if (!bank || !bank.length) return [];
  const shuffled = seededShuffle(bank, `${seedInput}|${topic.topicKey}|it`);
  return shuffled.slice(0, Math.max(6, Math.min(count, shuffled.length)));
}
