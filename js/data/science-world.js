/**
 * Meuw Academy — Science World
 * Bách khoa thiên nhiên: sinh vật, cơ thể, tiến hóa, rừng, biển, vũ trụ
 *
 * Target: Grade 4 students (age 9-10)
 * Format: engaging, wonder-inspiring, age-appropriate facts
 * Each topic: 1 lesson block + 6-8 MC questions with explanations
 */

function q(question, answer, options, explanation) {
  return { type: 'multiple-choice', question, answer, options, explanation };
}
function t(key, title, points, example, questions) {
  return {
    topicKey: `sci:world:${key}`,
    subject: 'sci',
    title: `Khoa học: ${title}`,
    lessonBlocks: [{ type: 'micro', teacherName: 'Gâu tiên sinh', title, points, example }],
    questionPool: questions,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 1: THỰC VẬT KỲ DIỆU
// ════════════════════════════════════════════════════════════════════════════

const PLANTS = [

t('photosynthesis', 'Quang hợp — Phép màu của lá cây',
  ['Quang hợp là quá trình cây xanh tạo ra thức ăn từ ánh sáng, nước và CO₂.',
   'Diệp lục (chlorophyll) là chất màu xanh trong lá, hấp thụ ánh sáng Mặt Trời.',
   'Sản phẩm: đường glucose (thức ăn cho cây) + oxy (chúng ta thở).',
   'Công thức: 6CO₂ + 6H₂O + ánh sáng → C₆H₁₂O₆ + 6O₂',
   'Cây xanh là "nhà máy oxy" của Trái Đất!'],
  'Nếu không có cây xanh, không có oxy để thở — mọi động vật sẽ chết trong vài phút!',
  [q('Quang hợp tạo ra gì?', 'Đường (glucose) và oxy', ['Đường (glucose) và oxy','Nước và CO₂','Muối và khoáng','Chỉ CO₂'], 'Cây dùng năng lượng ánh sáng để kết hợp CO₂ và H₂O tạo đường (thức ăn) và thải O₂.'),
   q('Chất gì trong lá cây hấp thụ ánh sáng Mặt Trời?', 'Diệp lục (chlorophyll)', ['Nhựa cây','Diệp lục (chlorophyll)','Nước trong lá','Tinh bột'], 'Diệp lục (màu xanh lá) hấp thụ ánh sáng đỏ và xanh lam, phản chiếu ánh xanh lá — vì vậy lá trông màu xanh!'),
   q('Cây lấy CO₂ từ đâu?', 'Không khí xung quanh qua các lỗ nhỏ trên lá (khí khổng)', ['Từ đất','Không khí xung quanh qua các lỗ nhỏ trên lá (khí khổng)','Từ nước tưới','Từ phân bón'], 'Khí khổng (stomata) là hàng nghìn lỗ li ti trên lá, dùng để hút CO₂ và thải O₂.'),
   q('Tại sao lá cây vàng vào mùa thu?', 'Diệp lục bị phá vỡ, lộ ra màu vàng/đỏ của các sắc tố khác', ['Vì lá khô nước','Diệp lục bị phá vỡ, lộ ra màu vàng/đỏ của các sắc tố khác','Vì trời lạnh làm lá đổi màu','Vì sâu bệnh'], 'Khi ngày ngắn và lạnh, cây ngừng sản xuất diệp lục xanh, các sắc tố vàng/đỏ (carotenoid) vốn có từ trước mới lộ ra.'),
   q('Cây không có ánh sáng sẽ thế nào?', 'Không quang hợp được, không có thức ăn, cây chết dần', ['Phát triển nhanh hơn','Không quang hợp được, không có thức ăn, cây chết dần','Hút nhiều nước hơn','Không thay đổi'], 'Không có ánh sáng, cây không thể tạo ra đường — "đói" dần và chết.'),
   q('Rừng có vai trò gì với không khí?', 'Hút CO₂ và tạo ra oxy, điều hòa khí hậu', ['Không có vai trò','Chỉ tạo bóng mát','Hút CO₂ và tạo ra oxy, điều hòa khí hậu','Làm không khí ẩm'], 'Rừng là "lá phổi" của Trái Đất — rừng Amazon tạo ra 20% oxy của khí quyển!'),
   q('Điều gì xảy ra với quang hợp vào ban đêm?', 'Cây ngừng quang hợp vì không có ánh sáng, chỉ hô hấp', ['Quang hợp nhanh hơn','Cây ngừng quang hợp vì không có ánh sáng, chỉ hô hấp','Cây tự tạo ra ánh sáng','Quang hợp chậm hơn nhưng vẫn xảy ra'], 'Ban đêm không có ánh sáng — cây chỉ hô hấp (hút O₂, thải CO₂). Ban ngày, quang hợp tạo ra nhiều O₂ hơn lượng hô hấp dùng.')]),

t('carnivorous-plants', 'Cây ăn thịt — Thực vật săn mồi',
  ['Một số loài cây sống ở vùng đất nghèo dinh dưỡng, nên phải "ăn thịt" côn trùng để lấy đạm.',
   'Cây bắt ruồi Venus có bẫy hai lá — đóng lại khi côn trùng chạm vào lông cảm nhận.',
   'Cây nắp ấm (Nepenthes) có bình chứa dịch tiêu hóa để "chìm" côn trùng.',
   'Cây Sundew có lá phủ nhựa dính — côn trùng dính vào và bị tiêu hóa từ từ.',
   'Có hơn 800 loài cây ăn thịt trên thế giới!'],
  'Cây bắt ruồi Venus đóng bẫy trong 1/10 giây — nhanh nhất thế giới thực vật!',
  [q('Tại sao một số cây lại "ăn" côn trùng?', 'Vì sống ở đất nghèo dinh dưỡng, cần lấy đạm từ côn trùng', ['Vì thích mùi của côn trùng','Vì sống ở đất nghèo dinh dưỡng, cần lấy đạm từ côn trùng','Vì không có ánh sáng','Vì sợ côn trùng phá lá'], 'Cây ăn thịt thường mọc ở đầm lầy hoặc đất nghèo nitơ — chúng tiến hóa bẫy côn trùng để bổ sung dinh dưỡng.'),
   q('Cây bắt ruồi Venus bẫy côn trùng bằng cách nào?', 'Hai lá có lông cảm ứng — khi côn trùng chạm vào, lá đóng lại', ['Phun nhựa dính','Hút vào bằng chân không','Hai lá có lông cảm ứng — khi côn trùng chạm vào, lá đóng lại','Dùng mùi thơm làm tê liệt'], 'Khi côn trùng chạm vào 2 lông trigger trong 20 giây, bẫy đóng với lực mạnh để côn trùng không thoát được.'),
   q('Cây Sundew bắt côn trùng như thế nào?', 'Lá phủ nhựa dính như giọt sương, côn trùng bị kẹt và tiêu hóa', ['Đóng lá lại','Phun nước lên','Lá phủ nhựa dính như giọt sương, côn trùng bị kẹt và tiêu hóa','Mọc gai nhọn'], 'Sundew có hàng trăm lông nhỏ tiết nhựa dính — côn trùng tưởng là sương nhưng bị bắt và tiêu hóa trong vài ngày.'),
   q('Cây nắp ấm (Nepenthes) hoạt động thế nào?', 'Bình chứa đầy dịch tiêu hóa, côn trùng trượt vào và bị tiêu hóa', ['Bắn côn trùng ra xa','Bình chứa đầy dịch tiêu hóa, côn trùng trượt vào và bị tiêu hóa','Mọc rễ bắt côn trùng','Đổ nước lên côn trùng'], 'Miệng bình trơn trượt và mép cong vào trong — côn trùng không thể thoát ra khỏi dịch tiêu hóa.'),
   q('Cây ăn thịt vẫn cần quang hợp không?', 'Vẫn cần — côn trùng chỉ bổ sung đạm, ánh sáng vẫn tạo ra năng lượng', ['Không cần, có côn trùng là đủ','Vẫn cần — côn trùng chỉ bổ sung đạm, ánh sáng vẫn tạo ra năng lượng','Chỉ cần nước','Không cần đất'], 'Côn trùng cung cấp đạm (protein) nhưng cây vẫn cần ánh sáng để tổng hợp đường — cả hai đều cần thiết.'),
   q('Trên thế giới có bao nhiêu loài cây ăn thịt?', 'Hơn 800 loài', ['5 loài','Khoảng 50 loài','Hơn 800 loài','Hàng triệu loài'], 'Dù nhiều loài nhưng tất cả đều tiến hóa "độc lập" ở những vùng đất nghèo dinh dưỡng — minh chứng cho sức mạnh của chọn lọc tự nhiên!'),
   q('Cây bắt ruồi Venus sẽ làm gì nếu chạm vào sợi lông kích thích nhưng không có côn trùng?', 'Bẫy đóng lại nhưng mở ra sau vài giây-phút vì không có thức ăn để tiêu hóa', ['Bẫy đóng mãi mãi','Bẫy không đóng','Bẫy đóng lại nhưng mở ra sau vài giây-phút vì không có thức ăn để tiêu hóa','Cây bị tổn thương'], 'Cây bắt ruồi Venus cần cả hai kích thích trong 20 giây mới đóng chắc. Nếu không có con mồi, bẫy mở ra sau 8-12 giờ để tiết kiệm năng lượng.')]),

t('plant-growth', 'Cây từ hạt đến cây — Vòng đời của thực vật',
  ['Hạt giống chứa phôi (cây nhỏ) và chất dinh dưỡng để nảy mầm.',
   'Nảy mầm cần 3 yếu tố: nước, không khí và nhiệt độ phù hợp.',
   'Rễ cây mọc xuống để hút nước và khoáng chất; thân mọc lên tìm ánh sáng.',
   'Hoa thu hút ong bướm thụ phấn → tạo ra hạt mới → vòng đời tiếp tục.',
   'Cây tre có thể mọc 90 cm mỗi ngày — nhanh nhất thế giới thực vật!'],
  'Một cây sồi từ hạt nhỏ có thể sống 1000 năm và tạo ra hàng triệu hạt sồi!',
  [q('Hạt giống cần gì để nảy mầm?', 'Nước, không khí và nhiệt độ phù hợp', ['Chỉ cần nước','Đất và phân bón','Nước, không khí và nhiệt độ phù hợp','Ánh sáng Mặt Trời'], 'Trước khi mọc lá đầu tiên, hạt chỉ cần nước (để kích hoạt enzym), oxy (để hô hấp) và nhiệt độ ấm áp.'),
   q('Rễ cây có chức năng gì?', 'Hút nước và khoáng chất từ đất, giữ cây đứng vững', ['Chỉ giữ cây đứng vững','Tạo ra oxy','Hút nước và khoáng chất từ đất, giữ cây đứng vững','Hút ánh sáng'], 'Rễ cái giữ cây vững, rễ con hút nước, rễ lông hút khoáng chất — hệ rễ có thể dài hàng km!'),
   q('Hoa có vai trò gì trong đời cây?', 'Sinh sản — thu hút ong bướm thụ phấn để tạo hạt mới', ['Chỉ để đẹp','Hút ánh sáng','Sinh sản — thu hút ong bướm thụ phấn để tạo hạt mới','Lưu trữ nước'], 'Màu sắc và mùi thơm của hoa thu hút côn trùng mang phấn hoa từ hoa này sang hoa khác — thụ phấn tạo ra hạt.'),
   q('Cây nào mọc nhanh nhất thế giới?', 'Cây tre', ['Cây dừa','Cây tre','Cây bạch đàn','Cây chuối'], 'Cây tre có thể mọc tới 90 cm mỗi ngày (gần 4 cm/giờ!) — bạn có thể nhìn thấy nó mọc nếu kiên nhẫn ngồi quan sát!'),
   q('Tại sao thân cây mọc hướng về phía ánh sáng?', 'Vì auxin (hormone thực vật) tập trung phía tối, làm tế bào đó dài ra', ['Vì gió thổi','Vì đất nghiêng','Vì auxin (hormone thực vật) tập trung phía tối, làm tế bào đó dài ra','Vì rễ kéo'], 'Auxin tập trung ở phía tối, kích thích tế bào phía đó phát triển nhanh hơn → thân cong về phía sáng.'),
   q('Loại cây nào mọc nhanh nhất trên Trái Đất?', 'Cây tre — có thể mọc tới 90 cm mỗi ngày', ['Cây dừa','Cây lúa','Cây tre — có thể mọc tới 90 cm mỗi ngày','Cây bạch đàn'], 'Tốc độ mọc 90 cm/ngày tương đương 3.75 cm mỗi giờ — bạn có thể nhìn thấy nó lớn nếu ngồi quan sát đủ lâu!'),
   q('Tại sao hoa có hương thơm và màu sắc đẹp?', 'Thu hút côn trùng và chim để thụ phấn — một "hợp đồng" tiến hóa', ['Để con người thích','Thu hút côn trùng và chim để thụ phấn — một "hợp đồng" tiến hóa','Tự bảo vệ khỏi sâu bệnh','Vì nhiệt độ cao'], 'Hoa và côn trùng cùng tiến hóa — hoa cung cấp mật và phấn, côn trùng vô tình mang phấn giúp thụ phấn. Win-win!')]),

t('seeds-dispersal', 'Hạt đi xa — Cách thực vật phát tán hạt giống',
  ['Cây cần phát tán hạt xa để con cái không cạnh tranh dinh dưỡng với bố mẹ.',
   'Bằng gió: hạt bồ công anh có "ô dù" lông bay xa, hạt cây phong có cánh quay như trực thăng.',
   'Bằng nước: hạt dừa có vỏ nổi, trôi theo biển đến đảo mới.',
   'Bằng động vật: quả ngon được ăn, hạt qua đường tiêu hóa; hoặc quả có móc bám vào lông thú.',
   'Bằng cách "bắn": cây bắn hạt (Squirting cucumber) bắn hạt ra xa đến 12 mét!'],
  'Một quả bồ công anh có thể bay xa tới 10 km nhờ gió!',
  [q('Tại sao cây cần phát tán hạt xa?', 'Để con cái không cạnh tranh đất, ánh sáng và nước với bố mẹ', ['Vì hạt nặng','Để con cái không cạnh tranh đất, ánh sáng và nước với bố mẹ','Để chống sâu bệnh','Để tìm đất tốt hơn'], 'Nếu tất cả hạt rơi ngay dưới gốc, chúng sẽ tranh nhau dinh dưỡng — phát tán xa giúp cả bố mẹ lẫn con cái phát triển tốt hơn.'),
   q('Hạt cây bồ công anh bay xa nhờ đặc điểm gì?', 'Có "ô dù" bằng lông mịn bắt gió', ['Có cánh cứng','Có "ô dù" bằng lông mịn bắt gió','Rất nhẹ và tròn','Có thể nổi trên nước'], 'Mỗi hạt bồ công anh gắn với một chùm lông nhỏ như ô dù mini — giúp nó bay xa hàng km theo gió.'),
   q('Hạt dừa phát tán bằng cách nào?', 'Trôi theo biển — vỏ dày và đầy xơ giúp nổi được', ['Bay theo gió','Trôi theo biển — vỏ dày và đầy xơ giúp nổi được','Bị chim ăn','Bắn ra xa'], 'Quả dừa có vỏ xơ đặc biệt giúp nó nổi và chống mặn — có thể trôi dạt hàng ngàn km trên biển!'),
   q('Một số loài cây "nhờ" động vật như thế nào để phát tán hạt?', 'Quả ngon hấp dẫn động vật ăn, hạt ra ngoài theo phân ở nơi khác', ['Nhờ động vật mang hạt trong tổ','Quả ngon hấp dẫn động vật ăn, hạt ra ngoài theo phân ở nơi khác','Bám vào chân động vật','Cây chạm vào động vật'], 'Nhiều loài cây "trả công" cho động vật bằng quả ngon — động vật ăn và rải hạt khắp nơi!'),
   q('Tại sao cây bắn hạt ra xa lại có lợi?', 'Hạt rơi xa gốc sẽ không cạnh tranh đất và ánh sáng với cây bố mẹ', ['Vì hạt nặng nên cần bắn xa','Hạt rơi xa gốc sẽ không cạnh tranh đất và ánh sáng với cây bố mẹ','Để trông ấn tượng hơn','Vì gió mạnh'], 'Cây squirting cucumber "bắn" hạt 12 mét khi quả chín — cơ chế tương tự như bình xịt nước áp suất cao!'),
   q('Hạt của quả ổi, dưa hấu được phát tán chủ yếu bằng cách nào?', 'Qua đường tiêu hóa của động vật — ăn xong thải ra nơi khác', ['Bay theo gió','Trôi theo nước','Qua đường tiêu hóa của động vật — ăn xong thải ra nơi khác','Bám vào lông thú'], 'Hạt ổi, dưa hấu có vỏ cứng chịu được tiêu hóa — khi ra ngoài theo phân, chúng nảy mầm ở nơi mới.'),
   q('Cây bồ công anh có thể bay xa bao nhiêu km nhờ gió?', 'Tới 10 km', ['10 mét','100 mét','Tới 10 km','1 000 km'], 'Hạt bồ công anh nhẹ chỉ 0.5 mg với "ô dù" 16 cọng — trong điều kiện gió tốt có thể bay hàng chục km!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 2: CƠ THỂ NGƯỜI — CỖ MÁY SỐNG ĐỘNG
// ════════════════════════════════════════════════════════════════════════════

const HUMAN_BODY = [

t('digestive-system', 'Hệ tiêu hóa — Hành trình của thức ăn',
  ['Thức ăn đi qua: miệng → thực quản → dạ dày → ruột non → ruột già → hậu môn.',
   'Miệng: răng nghiền nát, nước bọt bắt đầu tiêu hóa tinh bột.',
   'Dạ dày: nhào trộn với axit và enzym, thức ăn biến thành "cháo".',
   'Ruột non dài 6-7 mét: hấp thụ hầu hết chất dinh dưỡng vào máu.',
   'Toàn bộ hành trình mất khoảng 24-72 giờ!'],
  'Ruột non trải ra có diện tích bằng sân tennis (250 m²) — nhờ hàng triệu nhung mao nhỏ!',
  [q('Thức ăn đi qua các cơ quan theo thứ tự nào?', 'Miệng → thực quản → dạ dày → ruột non → ruột già', ['Miệng → dạ dày → ruột → thực quản','Miệng → thực quản → dạ dày → ruột non → ruột già','Miệng → ruột → dạ dày → thực quản','Thực quản → miệng → dạ dày'], 'Đây là trình tự chuẩn của hệ tiêu hóa — mỗi cơ quan có nhiệm vụ riêng trong quá trình xử lý thức ăn.'),
   q('Ruột non có chức năng gì chính?', 'Hấp thụ chất dinh dưỡng vào máu', ['Nghiền nát thức ăn','Hấp thụ chất dinh dưỡng vào máu','Lưu trữ thức ăn','Thải chất thải'], 'Ruột non dài 6-7m với hàng triệu nhung mao nhỏ giúp tăng diện tích hấp thụ, đưa chất dinh dưỡng vào máu.'),
   q('Dạ dày tiêu hóa thức ăn bằng cách nào?', 'Nhào trộn với axit và enzym tiêu hóa', ['Đun nóng thức ăn','Nghiền bằng răng','Nhào trộn với axit và enzym tiêu hóa','Lọc qua màng'], 'Dạ dày tiết axit clohydric và pepsin — cùng với cử động nhào trộn mạnh, biến thức ăn thành chất lỏng.'),
   q('Nước bọt trong miệng có tác dụng gì?', 'Bắt đầu tiêu hóa tinh bột và làm ẩm thức ăn để dễ nuốt', ['Chỉ làm ẩm thức ăn','Bắt đầu tiêu hóa tinh bột và làm ẩm thức ăn để dễ nuốt','Diệt khuẩn hoàn toàn','Không có tác dụng gì'], 'Nước bọt chứa enzyme amylase — bắt đầu phân hủy tinh bột ngay trong miệng. Vì vậy cơm nhai kỹ sẽ ngọt hơn!'),
   q('Tại sao nên nhai kỹ trước khi nuốt?', 'Giúp tiêu hóa dễ hơn — thức ăn nhỏ hơn, enzym tiêu hóa dễ tiếp cận hơn', ['Vì lịch sự','Giúp tiêu hóa dễ hơn — thức ăn nhỏ hơn, enzym tiêu hóa dễ tiếp cận hơn','Để không bị mập','Vì nhai lâu mới biết ngon'], 'Nhai kỹ = tăng diện tích bề mặt thức ăn = enzyme tiêu hóa hiệu quả hơn = hấp thụ dinh dưỡng tốt hơn.'),
   q('Mất bao lâu để thức ăn đi qua toàn bộ hệ tiêu hóa?', '24-72 giờ', ['30 phút','2-3 giờ','24-72 giờ','1 tuần'], 'Từ miệng đến hậu môn mất 24-72 giờ tùy loại thức ăn — rau củ nhanh hơn, thịt chậm hơn.'),
   q('Tại sao uống nhiều nước tốt cho hệ tiêu hóa?', 'Nước giúp thức ăn di chuyển trơn tru qua hệ tiêu hóa và hòa tan chất dinh dưỡng', ['Vì nước ngon','Nước giúp thức ăn di chuyển trơn tru qua hệ tiêu hóa và hòa tan chất dinh dưỡng','Vì tiêu hóa cần nhiều nhiệt','Để bao tử không bị nóng'], 'Nước chiếm khoảng 70% trọng lượng cơ thể — cần để hòa tan enzym, vận chuyển chất dinh dưỡng và loại bỏ chất thải.')]),

t('circulatory-system', 'Hệ tuần hoàn — Tim và dòng máu',
  ['Tim là máy bơm cơ bắp, đập ~70 lần/phút, bơm khoảng 5 lít máu mỗi phút.',
   'Động mạch mang máu đỏ (giàu oxy) từ tim đến các cơ quan.',
   'Tĩnh mạch mang máu tím (ít oxy) từ cơ quan về tim.',
   'Mao mạch là mạch máu nhỏ nhất — chỉ bằng 1/10 sợi tóc!',
   'Nếu nối tất cả mạch máu của một người lại, sẽ vòng quanh Trái Đất 2.5 vòng!'],
  'Tim em đập 100,000 lần mỗi ngày mà không bao giờ nghỉ — từ khi sinh ra đến khi mất!',
  [q('Tim có nhiệm vụ gì?', 'Bơm máu đi khắp cơ thể để mang oxy và chất dinh dưỡng', ['Lọc máu','Tạo ra máu','Bơm máu đi khắp cơ thể để mang oxy và chất dinh dưỡng','Tiêu hóa thức ăn'], 'Tim là máy bơm không ngừng — bơm máu qua hàng triệu km mạch máu để nuôi mọi tế bào trong cơ thể.'),
   q('Máu đỏ (trong động mạch) và máu tím (trong tĩnh mạch) khác nhau điểm gì?', 'Máu đỏ giàu oxy, máu tím đã cung cấp oxy cho tế bào', ['Màu sắc khác nhau do loại tế bào','Máu đỏ giàu oxy, máu tím đã cung cấp oxy cho tế bào','Không khác gì','Máu đỏ ngọt hơn'], 'Hemoglobin trong tế bào hồng cầu kết hợp với oxy → màu đỏ tươi. Sau khi cung cấp oxy → màu đỏ sẫm (nhìn qua da thấy tím).'),
   q('Mao mạch là gì?', 'Mạch máu nhỏ nhất, chỉ một tế bào máu đi qua được', ['Tĩnh mạch lớn nhất','Mạch máu nhỏ nhất, chỉ một tế bào máu đi qua được','Mạch bạch huyết','Tim phụ'], 'Mao mạch chỉ rộng 5-10 micromet — nơi trao đổi oxy và CO₂ trực tiếp với các tế bào cơ thể.'),
   q('Tại sao vận động thể thao làm tim đập nhanh hơn?', 'Cơ bắp cần nhiều oxy hơn khi hoạt động, tim bơm nhanh hơn để đáp ứng', ['Vì sợ hãi','Cơ bắp cần nhiều oxy hơn khi hoạt động, tim bơm nhanh hơn để đáp ứng','Vì mệt mỏi','Tim thích chạy'], 'Khi chạy, cơ bắp tiêu thụ oxy nhanh hơn — tim tăng nhịp đập để bơm thêm máu giàu oxy đến cơ bắp.'),
   q('Huyết áp là gì?', 'Áp lực máu tác động lên thành mạch máu khi tim bơm', ['Tốc độ máu chảy','Áp lực máu tác động lên thành mạch máu khi tim bơm','Lượng máu trong cơ thể','Nhiệt độ của máu'], 'Huyết áp bình thường là 120/80 mmHg. Quá cao lâu dài gây hại cho tim và mạch máu.'),
   q('Tại sao tập thể dục đều đặn tốt cho tim?', 'Tim là cơ bắp — vận động thường xuyên giúp tim mạnh hơn, bơm hiệu quả hơn', ['Để tim nghỉ ngơi nhiều hơn','Tim là cơ bắp — vận động thường xuyên giúp tim mạnh hơn, bơm hiệu quả hơn','Vì tim cần nhiều máu hơn','Để tim đập nhanh hơn mãi'], 'Tim của vận động viên đập chậm hơn người bình thường (50-60 lần/phút vs 70) vì mỗi nhịp bơm được nhiều máu hơn.'),
   q('Máu của cơ thể người có bao nhiêu lít?', 'Khoảng 4.7-5.5 lít (trung bình 5 lít)', ['500 ml','Khoảng 4.7-5.5 lít (trung bình 5 lít)','20 lít','1 lít'], 'Tim bơm 5 lít máu/phút — nghĩa là toàn bộ lượng máu trong cơ thể chạy vòng quanh một lần mỗi phút!')]),

t('nervous-system', 'Hệ thần kinh — Trung tâm điều khiển',
  ['Não là "trung tâm chỉ huy" — nặng khoảng 1.4 kg, chiếm 2% trọng lượng cơ thể nhưng dùng 20% năng lượng.',
   'Tủy sống kết nối não với toàn bộ cơ thể qua hàng tỷ sợi thần kinh.',
   'Thần kinh truyền tín hiệu với tốc độ 120 m/giây — nhanh hơn xe hơi trên đường cao tốc!',
   'Phản xạ là phản ứng tự động (không cần não) — như rụt tay khi chạm nóng.',
   '86 tỷ tế bào thần kinh trong não tạo ra 100 nghìn tỷ kết nối — nhiều hơn số ngôi sao trong dải Ngân Hà!'],
  'Trong khi em ngủ, não vẫn hoạt động — xử lý ký ức và "dọn dẹp" các chất thải tích tụ trong ngày!',
  [q('Não chiếm bao nhiêu phần trăm năng lượng cơ thể dù chỉ nặng 1.4 kg?', '20%', ['5%','20%','50%','2%'], 'Dù chỉ chiếm 2% trọng lượng, não "ngốn" tới 20% năng lượng — vì vậy học tập căng thẳng sẽ làm em đói nhanh hơn!'),
   q('Phản xạ là gì?', 'Phản ứng tự động của cơ thể không qua não — như rụt tay khi chạm nóng', ['Cảm xúc mạnh','Phản ứng tự động của cơ thể không qua não — như rụt tay khi chạm nóng','Ký ức lâu dài','Giấc ngủ sâu'], 'Phản xạ đi qua tủy sống (không cần não) để phản ứng nhanh hơn — giúp bảo vệ cơ thể khi nguy hiểm.'),
   q('Tốc độ truyền tín hiệu thần kinh nhanh đến mức nào?', '120 m/giây', ['1 m/giây','120 m/giây','0.1 m/giây','1000 m/giây'], 'Tín hiệu thần kinh di chuyển từ 1-120 m/giây tùy loại sợi thần kinh — giúp bạn phản ứng gần như tức thời với thế giới xung quanh.'),
   q('Tại sao ngủ đủ giấc quan trọng cho trí nhớ?', 'Trong khi ngủ, não củng cố ký ức và loại bỏ chất thải tích tụ', ['Vì mệt mỏi cần nghỉ','Trong khi ngủ, não củng cố ký ức và loại bỏ chất thải tích tụ','Để tim đập chậm hơn','Vì không cần năng lượng lúc ngủ'], 'Giai đoạn ngủ sâu giúp "ghi" ký ức ngắn hạn vào bộ nhớ dài hạn — học bài trước khi ngủ thực sự rất hiệu quả!'),
   q('5 giác quan của con người là gì?', 'Thị giác, thính giác, khứu giác, vị giác và xúc giác', ['Thị giác, thính giác, khứu giác, vị giác và xúc giác','Chỉ thị giác và thính giác','Thị giác, xúc giác và nhiệt độ','Thị giác, thính giác và cân bằng'], 'Ngoài 5 giác quan cơ bản, con người còn có cảm giác đau, nhiệt, cân bằng, bản thể giác (biết tư thế cơ thể).'),
   q('Tại sao học trước khi ngủ giúp nhớ bài tốt hơn?', 'Não củng cố ký ức trong khi ngủ — thông tin mới được "chuyển" vào ký ức dài hạn', ['Vì buổi tối yên tĩnh hơn','Não củng cố ký ức trong khi ngủ — thông tin mới được "chuyển" vào ký ức dài hạn','Vì não nghỉ ngơi','Vì không bị phân tâm'], 'Giai đoạn ngủ REM (ngủ chuyển động mắt nhanh) đặc biệt quan trọng cho việc ghi nhớ — não "replay" những gì đã học trong ngày.'),
   q('Điều gì xảy ra khi bạn cảm thấy sợ hãi?', 'Amygdala (hạch hạnh nhân) báo động, cơ thể tiết adrenaline: tim đập nhanh, cơ bắp sẵn sàng', ['Não ngừng hoạt động','Amygdala (hạch hạnh nhân) báo động, cơ thể tiết adrenaline: tim đập nhanh, cơ bắp sẵn sàng','Chỉ có cảm giác tâm lý','Hệ tiêu hóa dừng lại'], 'Phản ứng "chiến đấu hay bỏ chạy" (fight-or-flight) là tự động — adrenaline tăng, mắt giãn đồng tử, cơ bắp căng sẵn sàng hành động.')]),

t('respiratory-system', 'Hệ hô hấp — Oxy cho cơ thể',
  ['Phổi hít oxy từ không khí và thải CO₂ — mỗi ngày hít thở khoảng 20,000 lần.',
   'Phế nang là túi khí nhỏ trong phổi — có 300 triệu cái, diện tích trao đổi khí bằng một sân tennis.',
   'Cơ hoành (cơ bụng lớn dưới phổi) là cơ quan chính giúp hít thở.',
   'Khói thuốc và ô nhiễm phá hủy phế nang — giảm khả năng hô hấp vĩnh viễn.',
   'Khi hắt hơi, không khí phóng ra với tốc độ 160 km/h!'],
  'Cá mập không có phổi — chúng thở bằng mang, hút oxy tan trong nước!',
  [q('Phổi trao đổi khí như thế nào?', 'Phế nang hấp thụ oxy vào máu và thải CO₂ ra ngoài', ['Lọc không khí như màng lọc','Phế nang hấp thụ oxy vào máu và thải CO₂ ra ngoài','Đốt oxy để tạo nhiệt','Nén không khí lại'], 'Tại phế nang, oxy khuếch tán vào mao mạch máu và CO₂ khuếch tán ra ngoài — trao đổi khí cực nhanh chỉ trong phần giây.'),
   q('Tại sao cơ thể cần oxy liên tục?', 'Tế bào cần oxy để tạo ra năng lượng từ thức ăn (hô hấp tế bào)', ['Để giữ ấm','Tế bào cần oxy để tạo ra năng lượng từ thức ăn (hô hấp tế bào)','Để tim đập','Để não suy nghĩ'], 'Oxy + glucose → năng lượng (ATP) + CO₂ + nước. Mọi tế bào đều cần quá trình này 24/7.'),
   q('Cơ quan nào giúp điều khiển hít thở?', 'Cơ hoành (cơ bụng) — co lại khi hít vào, giãn ra khi thở ra', ['Phổi tự co giãn','Tim','Cơ hoành (cơ bụng) — co lại khi hít vào, giãn ra khi thở ra','Não điều khiển trực tiếp'], 'Cơ hoành là cơ mỏng như tấm thảm ngăn ngực và bụng. Khi co, nó hạ xuống tạo chân không, không khí ùa vào phổi.'),
   q('Tại sao hắt xì hơi quan trọng?', 'Giúp tống xuất chất lạ/vi khuẩn ra khỏi đường hô hấp', ['Chỉ vì phản xạ','Giúp tống xuất chất lạ/vi khuẩn ra khỏi đường hô hấp','Để làm lạnh phổi','Để thải CO₂'], 'Hắt hơi là cơ chế bảo vệ — không khí bắn ra 160 km/h để tống xuất bụi, vi khuẩn, chất kích thích ra khỏi mũi.'),
   q('Con người không thở được trong bao lâu?', 'Hầu hết mọi người chỉ có thể nín thở 1-2 phút', ['10 phút','5 phút','Hầu hết mọi người chỉ có thể nín thở 1-2 phút','30 phút'], 'Não cần oxy liên tục — sau 4-6 phút thiếu oxy, tế bào não bắt đầu chết. Bơi lội giúp tăng dung tích phổi!'),
   q('Tại sao ô nhiễm không khí gây hại cho phổi?', 'Hạt bụi mịn và khí độc phá hủy phế nang, giảm khả năng hấp thụ oxy vĩnh viễn', ['Vì mùi khó chịu','Hạt bụi mịn và khí độc phá hủy phế nang, giảm khả năng hấp thụ oxy vĩnh viễn','Chỉ gây hắt hơi','Vì không khí lạnh'], 'Hạt PM2.5 (nhỏ hơn 2.5 micromet) đi thẳng vào phế nang — quá nhỏ để lông mũi lọc, tích tụ dần gây viêm phổi mãn tính.'),
   q('Tại sao cơ hoành (diaphragm) quan trọng với hơi thở?', 'Cơ hoành tạo áp suất âm khi co, kéo không khí vào phổi', ['Phổi tự phồng lên','Cơ hoành tạo áp suất âm khi co, kéo không khí vào phổi','Tim bơm khí vào phổi','Lồng ngực tự giãn ra'], 'Phổi không tự co giãn — chúng thụ động. Khi cơ hoành hạ xuống, không gian ngực tăng, khí ùa vào. Đây là lý do bơi lội tăng sức mạnh hô hấp!')]),

t('senses-eyes-ears', 'Mắt và Tai — Cửa sổ của thế giới',
  ['Mắt người có thể phân biệt tới 10 triệu màu sắc khác nhau.',
   'Giác mạc và thủy tinh thể hội tụ ánh sáng lên võng mạc — hình ảnh bị lật ngược, não tự điều chỉnh lại.',
   'Tai không chỉ nghe — ốc tai trong cũng giữ thăng bằng cho cơ thể.',
   'Tần số âm thanh con người nghe được: 20 Hz đến 20,000 Hz.',
   'Chó nghe được âm tần số cao hơn người — vì vậy còi chó (dog whistle) người không nghe được nhưng chó nghe rõ!'],
  'Mắt người chụp ảnh nhanh hơn camera 500 megapixel tốt nhất — não xử lý hình ảnh trong 0.013 giây!',
  [q('Mắt người có thể phân biệt bao nhiêu màu?', 'Khoảng 10 triệu màu', ['100 màu','10,000 màu','Khoảng 10 triệu màu','Vô hạn'], 'Nhờ 3 loại tế bào nón (đỏ, xanh lá, xanh lam) trong võng mạc, não kết hợp tạo ra 10 triệu màu khác nhau!'),
   q('Hình ảnh trên võng mạc ban đầu như thế nào?', 'Bị lật ngược — não tự đảo lại để thấy đúng chiều', ['Đúng chiều','Bị lật ngược — não tự đảo lại để thấy đúng chiều','Bị thu nhỏ','Bị mờ'], 'Thủy tinh thể hội tụ ánh sáng tạo ảnh lộn ngược trên võng mạc — não chúng ta học được cách "lật" ảnh lại từ khi còn bé!'),
   q('Ngoài nghe, tai còn có chức năng gì?', 'Giữ thăng bằng cho cơ thể', ['Điều chỉnh nhiệt độ','Giữ thăng bằng cho cơ thể','Hít thở','Không có chức năng nào khác'], 'Trong tai có 3 ống bán khuyên chứa chất lỏng — chúng phát hiện hướng và chuyển động, giúp ta không bị ngã.'),
   q('Tại sao khi bơi nước vào tai có thể làm chóng mặt?', 'Nước thay đổi cân bằng chất lỏng trong ốc tai, làm mất cảm giác thăng bằng', ['Vì lạnh','Nước thay đổi cân bằng chất lỏng trong ốc tai, làm mất cảm giác thăng bằng','Vì nước bẩn','Vì áp suất'], 'Hệ thống cân bằng trong tai nhạy cảm với áp suất và vị trí chất lỏng — nước vào tai phá vỡ cân bằng này.'),
   q('Tại sao đọc sách trên xe hay tàu dễ say tàu xe?', 'Mắt thấy tĩnh nhưng tai cảm nhận chuyển động — não nhận tín hiệu mâu thuẫn', ['Vì ánh sáng yếu','Vì ngồi không thoải mái','Mắt thấy tĩnh nhưng tai cảm nhận chuyển động — não nhận tín hiệu mâu thuẫn','Vì không khí trong xe ngột ngạt'], 'Say tàu xe xảy ra khi não nhận thông tin mâu thuẫn: mắt (nhìn thứ đứng yên) và tai (cảm nhận lắc lư) không khớp nhau.'),
   q('Tại sao mắt người có thể nhìn trong bóng tối?', 'Tế bào que (rod cells) nhạy cảm với ánh sáng yếu, hoạt động khi tối', ['Vì mắt tự phát sáng','Tế bào que (rod cells) nhạy cảm với ánh sáng yếu, hoạt động khi tối','Mắt mở rộng ra','Vì não tự đoán hình ảnh'], 'Võng mạc có tế bào que (nhìn tối) và tế bào nón (nhìn màu). Ban đêm, tế bào que hoạt động chính — vì vậy ban đêm ta ít phân biệt được màu sắc.'),
   q('Âm thanh nào có thể gây tổn thương tai lâu dài?', 'Âm thanh trên 85 decibel trong thời gian dài — máy bay, ca nhạc to, công trường', ['Tiếng rì rào','Tiếng nói chuyện bình thường','Âm thanh trên 85 decibel trong thời gian dài — máy bay, ca nhạc to, công trường','Tiếng nhạc nhẹ nhàng'], 'Tế bào lông trong ốc tai không tái sinh sau tổn thương — điếc do tiếng ồn là vĩnh viễn. Nghe nhạc quá to thường xuyên sẽ gây điếc sớm!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 3: THẾ GIỚI ĐỘNG VẬT
// ════════════════════════════════════════════════════════════════════════════

const ANIMALS = [

t('insects-bees', 'Côn trùng kỳ diệu — Ong và kiến',
  ['Ong mật tạo ra mật ong: một con ong làm việc cả đời chỉ tạo được 1/12 thìa cà phê mật ong.',
   'Ong giao tiếp bằng "điệu nhảy" — báo hướng và khoảng cách đến nguồn hoa.',
   'Kiến có thể nâng vật nặng gấp 50 lần trọng lượng bản thân.',
   'Đàn kiến là "siêu sinh vật" — hàng triệu cá thể hoạt động như một cơ thể thống nhất.',
   '80% lương thực của con người phụ thuộc vào ong thụ phấn!'],
  'Nếu ong tuyệt chủng, nhân loại chỉ tồn tại được 4 năm — theo câu nói của Einstein!',
  [q('Ong giao tiếp để báo vị trí hoa bằng cách nào?', 'Nhảy điệu "waggle dance" — hướng và thời gian nhảy cho biết hướng và khoảng cách', ['Tiếng kêu','Nhảy điệu "waggle dance" — hướng và thời gian nhảy cho biết hướng và khoảng cách','Mùi hương','Chạm râu'], 'Ong sử dụng "waggle dance" (điệu nhảy lắc đít) để báo cho đồng loại biết hướng, khoảng cách đến nguồn mật — chính xác đến hàng trăm mét!'),
   q('Một con ong mật làm việc cả đời tạo ra bao nhiêu mật ong?', 'Chỉ khoảng 1/12 thìa cà phê', ['1 hủ mật ong','1 kg mật','1 thìa cà phê','Chỉ khoảng 1/12 thìa cà phê'], 'Vì vậy, một hủ mật ong đại diện cho hàng nghìn con ong làm việc cả đời! Đó là lý do mật ong quý giá.'),
   q('Tại sao ong thụ phấn quan trọng với thức ăn của con người?', '80% cây lương thực cần ong thụ phấn để tạo ra quả và hạt', ['Ong tạo ra phân bón','80% cây lương thực cần ong thụ phấn để tạo ra quả và hạt','Ong ăn sâu bọ hại cây','Ong làm cho đất màu mỡ'], 'Không có ong thụ phấn, táo, dâu, cà phê, hạnh nhân và hàng trăm loại cây trồng sẽ không ra quả.'),
   q('Kiến có thể nâng vật nặng gấp bao nhiêu lần so với bản thân?', 'Lên đến 50 lần', ['2 lần','10 lần','Lên đến 50 lần','100 lần'], 'Kiến có cơ bắp tương đối (so với kích thước) mạnh hơn người rất nhiều — cấu trúc cơ thể nhỏ cho phép lực tương đối lớn hơn.'),
   q('Đàn kiến được ví như "siêu sinh vật" vì điều gì?', 'Hàng triệu cá thể hành động như một cơ thể thống nhất có trí tuệ tập thể', ['Kiến rất to','Hàng triệu cá thể hành động như một cơ thể thống nhất có trí tuệ tập thể','Kiến không bao giờ chết','Kiến có thể bay'], 'Đàn kiến có "trí tuệ tập thể" — không có cá thể nào điều khiển, nhưng cả đàn giải quyết vấn đề, tìm đường, xây tổ phức tạp.'),
   q('Loài côn trùng nào đã sống trên Trái Đất lâu nhất?', 'Gián — đã tồn tại hơn 300 triệu năm, sống sót qua nhiều sự kiện tuyệt chủng', ['Ong','Bướm','Gián — đã tồn tại hơn 300 triệu năm, sống sót qua nhiều sự kiện tuyệt chủng','Kiến'], 'Gián là "kẻ sống sót" của tiến hóa — thích nghi được với hầu hết môi trường. Chúng tồn tại cả trước khi khủng long xuất hiện!'),
   q('Nếu ong bị tuyệt chủng, hậu quả gì xảy ra với con người?', 'Nhiều loại cây lương thực ngừng đậu quả vì thiếu thụ phấn, đe dọa nguồn thực phẩm', ['Không có hậu quả','Chỉ mất mật ong','Nhiều loại cây lương thực ngừng đậu quả vì thiếu thụ phấn, đe dọa nguồn thực phẩm','Côn trùng khác thay thế ngay'], '80% cây trồng cần thụ phấn nhờ ong — táo, cà phê, bông cải, hạnh nhân... Mất ong = thiếu lương thực toàn cầu.')]),

t('migration-birds', 'Chim di cư — Cuộc hành trình vĩ đại',
  ['Hàng tỷ con chim di cư hàng nghìn km mỗi năm theo thay đổi mùa.',
   'Nhạn Arctic (Arctic Tern) bay xa nhất: 80,000 km/năm — từ Bắc Cực đến Nam Cực và ngược lại.',
   'Chim dùng nhiều cách định hướng: từ trường Trái Đất, vị trí sao, Mặt Trời và mốc địa lý.',
   'Chim bay theo đàn hình chữ V để tiết kiệm năng lượng — chim sau hưởng luồng gió nâng từ chim trước.',
   'Một số loài chim ngủ khi bay — não ngủ nửa, nửa còn lại điều khiển bay!'],
  'Chim hummingbird (chim ruồi) đập cánh 80 lần/giây và bay ngược — loài chim duy nhất làm được điều này!',
  [q('Con chim nào di cư xa nhất thế giới?', 'Nhạn Arctic — bay 80,000 km/năm từ Bắc Cực đến Nam Cực', ['Đại bàng','Sếu','Nhạn Arctic — bay 80,000 km/năm từ Bắc Cực đến Nam Cực','Vịt trời'], 'Nhạn Arctic trong cuộc đời 30 năm bay tổng cộng hơn 2 triệu km — bằng 3 lần đi về Mặt Trăng!'),
   q('Tại sao chim bay theo đàn hình chữ V?', 'Chim sau hưởng luồng khí nâng từ cánh chim trước, tiết kiệm 20% năng lượng', ['Để trông đẹp','Để không lạc nhau','Chim sau hưởng luồng khí nâng từ cánh chim trước, tiết kiệm 20% năng lượng','Để dễ hạ cánh'], 'Cánh chim tạo ra "dòng khí nâng" ở hai bên — chim đứng sau và lệch sang một bên được nâng lên, giảm lực cản rất nhiều.'),
   q('Chim định hướng khi di cư bằng cách nào?', 'Từ trường Trái Đất, vị trí Mặt Trời và sao, mốc địa lý quen thuộc', ['Chỉ nhờ Mặt Trời','Từ trường Trái Đất, vị trí Mặt Trời và sao, mốc địa lý quen thuộc','Theo mùi hương','Nhờ GPS tự nhiên'], 'Chim có "la bàn từ tính" trong não giúp cảm nhận từ trường, kết hợp với quan sát thiên văn tạo hệ định vị chính xác.'),
   q('Điều gì đặc biệt về chim hummingbird (chim ruồi)?', 'Đập cánh 80 lần/giây và có thể bay lùi — loài chim duy nhất bay ngược', ['Bay cao nhất','Đập cánh 80 lần/giây và có thể bay lùi — loài chim duy nhất bay ngược','To nhất','Hát hay nhất'], 'Chim ruồi chỉ nặng 2g nhưng có tim đập 1,200 lần/phút và cần ăn 2 lần trọng lượng cơ thể mỗi ngày để có năng lượng!'),
   q('Tại sao chim di cư theo mùa?', 'Tìm thức ăn và điều kiện sống tốt hơn — nhiều côn trùng và ánh sáng ở vùng ôn đới về mùa hè', ['Vì bị gió thổi','Để sinh sản','Tìm thức ăn và điều kiện sống tốt hơn — nhiều côn trùng và ánh sáng ở vùng ôn đới về mùa hè','Vì sợ tuyết'], 'Di cư là chiến lược tiến hóa xuất sắc: hưởng nguồn thức ăn phong phú mùa hè phương bắc, tránh mùa đông lạnh giá bằng cách bay về nam.'),
   q('Chim hummingbird (chim ruồi) ăn gì để có đủ năng lượng?', 'Mật hoa — ăn lượng tương đương 2 lần trọng lượng cơ thể mỗi ngày', ['Sâu bọ','Hạt nhỏ','Mật hoa — ăn lượng tương đương 2 lần trọng lượng cơ thể mỗi ngày','Trái cây nhỏ'], 'Tim chim ruồi đập 1 200 lần/phút và cánh 80 lần/giây — tiêu thụ năng lượng cực lớn. Nếu nhịn ăn 2 giờ, chúng có thể chết vì thiếu năng lượng!'),
   q('Việt Nam nằm trên đường di cư nào của chim?', 'Đường bay Đông Á - Úc — nơi hàng triệu chim dừng chân qua lại mỗi năm', ['Đường bay Bắc Mỹ','Đường bay Đông Á - Úc — nơi hàng triệu chim dừng chân qua lại mỗi năm','Chim không qua Việt Nam','Đường bay Châu Phi'], 'Các vùng đất ngập nước của Việt Nam (Cần Giờ, Đồng Tháp) là trạm dừng quan trọng cho chim di cư giữa Siberia và Úc!')]),

t('deep-sea', 'Đáy biển — Thế giới tối tăm kỳ bí',
  ['Vùng biển sâu (dưới 200m) không có ánh sáng — sinh vật ở đây tự phát quang.',
   'Áp suất ở đáy đại dương gấp 1,100 lần áp suất trên mặt đất.',
   'Cá mực khổng lồ (Giant Squid) dài đến 13m và có mắt to bằng đĩa ăn (27cm).',
   'Ống giun ở miệng núi lửa biển dài đến 2m, sống được ở 80°C không cần ánh sáng.',
   'Hơn 80% đáy đại dương chưa được khám phá!'],
  'Con người đã lên Mặt Trăng năm 1969, nhưng chỉ có 3 người từng xuống điểm sâu nhất đại dương!',
  [q('Tại sao nhiều sinh vật đáy biển phát sáng?', 'Để săn mồi, giao tiếp và thu hút con mồi trong bóng tối hoàn toàn', ['Vì nước biển có điện','Để săn mồi, giao tiếp và thu hút con mồi trong bóng tối hoàn toàn','Vì nhiệt độ cao','Vì phóng xạ'], 'Sinh vật biển sâu tiến hóa khả năng phát quang sinh học (bioluminescence) — ánh sáng xanh do phản ứng hóa học trong cơ thể.'),
   q('Áp suất ở đáy đại dương sâu nhất so với mặt biển là bao nhiêu?', 'Gấp 1,100 lần', ['Bằng nhau','Gấp 10 lần','Gấp 1,100 lần','Gấp 2 lần'], 'Áp suất 1,100 atm ở Rãnh Mariana tương đương 50 chiếc máy bay Boeing đặt lên 1 cm² — vì vậy cần tàu ngầm đặc biệt để xuống đây!'),
   q('Tại sao cá mực khổng lồ cần mắt rất to?', 'Để phát hiện ánh sáng mờ nhạt trong vùng nước sâu tối tăm', ['Để trông đáng sợ hơn','Để phát hiện ánh sáng mờ nhạt trong vùng nước sâu tối tăm','Để bơi nhanh hơn','Vì tiến hóa ngẫu nhiên'], 'Mắt 27cm là mắt lớn nhất trong vương quốc động vật — thu gom ánh sáng cực kỳ hiệu quả trong bóng tối đại dương.'),
   q('Sinh vật nào sống ở miệng núi lửa biển trong điều kiện cực đoan?', 'Ống giun khổng lồ (tube worms) và vi khuẩn chịu nhiệt', ['Cá heo','Ống giun khổng lồ (tube worms) và vi khuẩn chịu nhiệt','Rùa biển','Cá mập'], 'Tại miệng núi lửa nhiệt địa, vi khuẩn tổng hợp hóa học (không cần ánh sáng), ống giun sống nhờ vi khuẩn — hệ sinh thái không phụ thuộc Mặt Trời!'),
   q('Bao nhiêu phần trăm đáy đại dương đã được khám phá?', 'Dưới 20%', ['100%','50%','80%','Dưới 20%'], 'Đại dương bao phủ 71% Trái Đất nhưng chúng ta biết ít hơn về đáy biển sâu so với bề mặt Mặt Trăng!'),
   q('Điểm sâu nhất của đại dương là ở đâu?', 'Rãnh Mariana (Thái Bình Dương) — sâu khoảng 11 km', ['Đại Tây Dương','Ấn Độ Dương','Rãnh Mariana (Thái Bình Dương) — sâu khoảng 11 km','Biển Đông'], 'Nếu đặt núi Everest xuống Rãnh Mariana, đỉnh vẫn còn cách mặt biển 1.6 km! Chỉ 3 người từng xuống đến đây.'),
   q('Tại sao phần lớn sinh vật biển sâu không thể sống ở vùng nước nông?', 'Áp suất thấp ở vùng nông không phù hợp với cơ thể thích nghi áp suất cực cao ở biển sâu', ['Vì quá lạnh','Áp suất thấp ở vùng nông không phù hợp với cơ thể thích nghi áp suất cực cao ở biển sâu','Vì ánh sáng quá mạnh','Vì không có thức ăn'], 'Cơ thể sinh vật biển sâu được tối ưu hóa cho áp suất 1 000+ atm — khi đưa lên mặt biển, áp suất giảm đột ngột gây chết vì nội tạng không chịu được.')]),

t('forest-ecosystem', 'Rừng nhiệt đới — Kho báu xanh của Trái Đất',
  ['Rừng nhiệt đới chỉ chiếm 6% diện tích Trái Đất nhưng chứa 50% số loài sinh vật.',
   'Rừng Amazon tạo ra lượng mưa của chính mình — cây thoát hơi nước, hơi nước tạo mây và mưa.',
   'Trong 1 hectare rừng nhiệt đới có thể có 400 loài cây và 1500 loài côn trùng.',
   'Canopy (tán rừng) ở độ cao 30-40m là "tầng thứ tư" — nhiều loài chưa được khám phá sống ở đây.',
   'Nạn phá rừng = mất đa dạng sinh học + biến đổi khí hậu + mất nguồn thuốc chữa bệnh.'],
  '25% thuốc chữa bệnh hiện đại có nguồn gốc từ rừng nhiệt đới — và 99% loài thực vật ở đây chưa được nghiên cứu!',
  [q('Rừng nhiệt đới chiếm bao nhiêu % diện tích Trái Đất nhưng chứa bao nhiêu % số loài?', '6% diện tích nhưng chứa 50% số loài', ['50% diện tích và 50% số loài','6% diện tích nhưng chứa 50% số loài','10% diện tích, 10% số loài','50% diện tích, 90% số loài'], 'Điều này cho thấy rừng nhiệt đới có mật độ đa dạng sinh học cực kỳ cao — mỗi hectare như một kho báu thiên nhiên.'),
   q('Tại sao rừng Amazon tạo ra mưa cho chính mình?', 'Cây thoát hơi nước qua lá, hơi nước bốc lên tạo mây và mưa trở lại', ['Vì gần biển','Cây thoát hơi nước qua lá, hơi nước bốc lên tạo mây và mưa trở lại','Vì đất ẩm','Vì sông Amazon lớn'], 'Rừng Amazon "bơm" hơn 20 tỷ tấn nước vào khí quyển mỗi ngày — tạo ra "những con sông bay" trên bầu trời.'),
   q('Canopy (tán rừng) quan trọng vì sao?', 'Là nơi sinh sống của phần lớn loài động vật rừng và thu hút ánh sáng Mặt Trời', ['Chỉ là cành cây','Là nơi sinh sống của phần lớn loài động vật rừng và thu hút ánh sáng Mặt Trời','Không quan trọng','Chỉ tạo bóng mát'], 'Tán rừng như "tầng thứ tư" với cả một hệ sinh thái riêng — khỉ, chim, côn trùng, thằn lằn sống trên cao ít khi chạm đất!'),
   q('Tại sao nạn phá rừng ảnh hưởng đến thuốc chữa bệnh?', '25% thuốc hiện đại có nguồn gốc từ thực vật rừng nhiệt đới', ['Thuốc làm từ gỗ cây','25% thuốc hiện đại có nguồn gốc từ thực vật rừng nhiệt đới','Rừng không liên quan đến thuốc','Vì bác sĩ ở rừng'], 'Aspirin từ vỏ cây liễu, morphine từ anh túc, nhiều thuốc ung thư từ thực vật nhiệt đới — mất rừng = mất nguồn thuốc tiềm năng.'),
   q('Hành động nào giúp bảo vệ rừng nhiệt đới?', 'Không dùng đồ dùng gỗ không nguồn gốc rõ ràng, ủng hộ bảo tồn rừng', ['Chặt cây có kiểm soát','Không dùng đồ dùng gỗ không nguồn gốc rõ ràng, ủng hộ bảo tồn rừng','Trồng nhiều cây ăn quả','Tưới nước cho rừng'], 'Mỗi người có thể góp phần: tiêu dùng có trách nhiệm, không lãng phí giấy, ủng hộ các tổ chức bảo vệ rừng.'),
   q('Việt Nam có những khu rừng đặc biệt nào nổi tiếng?', 'Vườn Quốc gia Cúc Phương, Pù Mát, Cát Tiên — nơi bảo tồn nhiều loài quý hiếm', ['Chỉ có rừng trồng','Không còn rừng nguyên sinh','Vườn Quốc gia Cúc Phương, Pù Mát, Cát Tiên — nơi bảo tồn nhiều loài quý hiếm','Rừng Việt Nam là nhỏ nhất Đông Nam Á'], 'Việt Nam có 33 vườn quốc gia — nơi trú ngụ của hổ Đông Dương, voi châu Á, vooc đen má trắng và nhiều loài đặc hữu quý hiếm.'),
   q('Tại sao phá rừng làm tăng lũ lụt?', 'Rừng giúp đất thấm nước và giảm tốc độ chảy tràn — mất rừng, nước không thấm được, chảy tràn gây lũ', ['Vì mưa nhiều hơn','Rừng giúp đất thấm nước và giảm tốc độ chảy tràn — mất rừng, nước không thấm được, chảy tràn gây lũ','Vì trời nóng hơn','Vì sông bị tắc'], 'Cây rừng "bắt" mưa bằng tán lá, rễ cây giữ đất và tạo kênh thấm nước — mất rừng = mất "bọt biển" tự nhiên.')]),

t('ocean-life', 'Sinh vật biển — Thế giới dưới sóng',
  ['Đại dương có 3 tầng: tầng photic (có ánh sáng, 0-200m), tầng mesopelagic (200-1000m), và tầng abyssal (1000m+).',
   'San hô là "rừng nhiệt đới của biển" — 25% cá biển sống nhờ san hô dù chỉ chiếm 0.1% diện tích đại dương.',
   'Cá voi lưng gù hát "bài hát" dài nhất và phức tạp nhất trong vương quốc động vật.',
   'Bạch tuộc có 3 trái tim, máu xanh (do hemocyanin thay vì hemoglobin), và não phân tán vào các tentacle.',
   'Rùa biển quay về đúng bãi biển nơi chúng sinh ra để đẻ trứng — sau hàng chục năm!'],
  'Một con cá voi xanh tim đập tạo ra âm thanh to đến mức có thể nghe từ 3 km dưới nước!',
  [q('Tại sao rạn san hô được gọi là "rừng nhiệt đới của biển"?', 'Dù chiếm 0.1% đại dương, nuôi dưỡng 25% tất cả các loài cá biển', ['Vì đẹp như rừng','Dù chiếm 0.1% đại dương, nuôi dưỡng 25% tất cả các loài cá biển','Vì màu xanh','Vì có nhiều cây'], 'Rạn san hô là hệ sinh thái đa dạng nhất đại dương — như siêu đô thị của cá, tôm, cua, bạch tuộc.'),
   q('Bạch tuộc có đặc điểm nào khác biệt so với phần lớn động vật?', '3 trái tim, máu xanh và não phân tán vào 8 tentacle', ['Không có xương sống','3 trái tim, máu xanh và não phân tán vào 8 tentacle','Thở bằng phổi','Sống trên cạn'], 'Bạch tuộc thực sự là sinh vật rất thú vị: 2/3 tế bào thần kinh ở trong tentacle, mỗi cánh tay có thể hành động độc lập!'),
   q('Tại sao rùa biển có thể quay về đúng bãi biển sinh ra dù sau nhiều thập kỷ?', 'Dùng từ trường Trái Đất như "dấu vân tay" để nhớ địa điểm', ['Nhớ đường như người','Dùng từ trường Trái Đất như "dấu vân tay" để nhớ địa điểm','Theo mùi nước biển','Nhờ tàu thuyền hướng dẫn'], 'Rùa biển "ghi nhớ" từ trường đặc trưng của bãi biển khi sinh ra — như GPS tự nhiên cực kỳ chính xác sau hàng chục năm.'),
   q('San hô là gì?', 'Động vật nhỏ (polyp) sống thành tập đoàn, tạo ra xương canxi', ['Loài rong biển','Loài đá có màu','Động vật nhỏ (polyp) sống thành tập đoàn, tạo ra xương canxi','Nấm biển'], 'San hô là động vật! Mỗi "polyp" là một cơ thể nhỏ có miệng và xúc tu — hàng nghìn cá thể cùng tạo ra rạn san hô khổng lồ.'),
   q('Cá voi lưng gù "hát" để làm gì?', 'Giao tiếp, thu hút bạn đời và có thể tạo ra bản đồ âm thanh để định vị', ['Chỉ để vui','Giao tiếp, thu hút bạn đời và có thể tạo ra bản đồ âm thanh để định vị','Để báo nguy hiểm','Không rõ nguyên nhân'], '"Bài hát" cá voi đực có thể kéo dài 20 phút và phát ra ở cường độ 180 decibel — to hơn động cơ máy bay phản lực!'),
   q('Cá voi xanh to hơn khủng long T-Rex bao nhiêu?', 'To hơn nhiều lần — cá voi xanh dài 30m, nặng 150 tấn; T-Rex dài 13m, nặng 7 tấn', ['Bằng nhau','Nhỏ hơn T-Rex','To hơn nhiều lần — cá voi xanh dài 30m, nặng 150 tấn; T-Rex dài 13m, nặng 7 tấn','Chỉ to hơn một chút'], 'Cá voi xanh là động vật lớn nhất từng tồn tại trên Trái Đất — to hơn bất kỳ khủng long nào và bất kỳ sinh vật đất liền nào!'),
   q('Bạch tuộc thuộc nhóm động vật nào?', 'Thân mềm (mollusca) — cùng nhóm với sò, hến, ốc', ['Cá','Thân mềm (mollusca) — cùng nhóm với sò, hến, ốc','Giáp xác như tôm cua','Bò sát'], 'Mặc dù không xương sống và thân mềm, bạch tuộc được coi là thông minh nhất trong các động vật không xương sống — giải câu đố và mở hộp!')]),

t('reptiles-amphibians', 'Bò sát và Lưỡng cư — Sinh vật máu lạnh',
  ['Bò sát (rắn, kỳ nhông, cá sấu) là động vật có vảy, máu lạnh — nhiệt độ cơ thể theo môi trường.',
   'Rắn "nghe" bằng xương hàm — rung động từ mặt đất truyền qua xương đến tai trong.',
   'Cá sấu dù trông hung dữ lại là "bố mẹ tốt" — mang trứng và con trong miệng để bảo vệ.',
   'Tắc kè hoa đổi màu không phải để ngụy trang mà để giao tiếp cảm xúc và điều chỉnh nhiệt độ.',
   'Ếch cây độc là sinh vật độc nhất trên cạn — đủ chất độc trên da để giết 10 người!'],
  'Một số loài thằn lằn đứt đuôi và đuôi mọc lại hoàn toàn — khả năng tái sinh kỳ diệu!',
  [q('Tại sao bò sát là "máu lạnh"?', 'Nhiệt độ cơ thể không tự điều chỉnh — phụ thuộc vào môi trường xung quanh', ['Máu thực sự lạnh như nước đá','Nhiệt độ cơ thể không tự điều chỉnh — phụ thuộc vào môi trường xung quanh','Không có cảm xúc','Sống ở vùng lạnh'], 'Khác với chim và thú (máu ấm), bò sát không tạo nhiệt bên trong — nên chúng cần phơi nắng để ấm người vào buổi sáng.'),
   q('Rắn "nghe" bằng bộ phận nào?', 'Xương hàm cảm nhận rung động từ mặt đất', ['Tai ngoài','Xương hàm cảm nhận rung động từ mặt đất','Lưỡi chẻ đôi','Vảy da'], 'Rắn không có tai ngoài, nhưng xương hàm tiếp xúc với mặt đất "nghe" rung động — cảm nhận con mồi hoặc nguy hiểm sắp đến.'),
   q('Tắc kè hoa đổi màu chủ yếu để làm gì?', 'Giao tiếp cảm xúc và điều chỉnh nhiệt độ cơ thể', ['Trốn kẻ thù','Giao tiếp cảm xúc và điều chỉnh nhiệt độ cơ thể','Vui chơi','Thu hút con mồi'], 'Tắc kè hoa "nói chuyện" bằng màu sắc: sáng rực = hứng thú/hung hăng; màu tối = tức giận; màu nhợt = sợ hãi.'),
   q('Điều gì đặc biệt về cá sấu so với hình ảnh hung dữ của chúng?', 'Là bố mẹ tốt — mang con trong miệng để bảo vệ sau khi nở', ['Không ăn động vật nhỏ','Là bố mẹ tốt — mang con trong miệng để bảo vệ sau khi nở','Không nguy hiểm','Ăn cây cỏ'], 'Cá sấu mẹ cẩn thận ngậm trứng và con con trong miệng — dù có hàm mạnh nhất thế giới — nhẹ nhàng để không làm tổn thương con!'),
   q('Tại sao da ếch cây độc có màu sặc sỡ?', 'Màu sắc cảnh báo kẻ thù "Đừng ăn tôi — tôi cực kỳ độc"', ['Để đẹp hơn','Màu sắc cảnh báo kẻ thù "Đừng ăn tôi — tôi cực kỳ độc"','Để thu hút con mồi','Vì sống trong bóng tối'], 'Trong tự nhiên, màu sắc sặc sỡ thường có nghĩa là "nguy hiểm" — gọi là "cảnh báo màu sắc" (aposematism).'),
   q('Cá sấu có thể sống bao lâu không ăn?', 'Vài tháng đến một năm — máu lạnh giúp tiết kiệm năng lượng rất hiệu quả', ['3 ngày','1 tuần','Vài tháng đến một năm — máu lạnh giúp tiết kiệm năng lượng rất hiệu quả','Không thể nhịn ăn'], 'Động vật máu lạnh không cần năng lượng để giữ ấm cơ thể — chuyển hóa cơ bản rất thấp, có thể nhịn ăn rất lâu.'),
   q('Rắn hổ mang phun nọc độc như thế nào?', 'Phun nọc từ kẽ hở trong răng độc, nhắm vào mắt kẻ thù với độ chính xác cao', ['Cắn vào da','Phun nọc từ kẽ hở trong răng độc, nhắm vào mắt kẻ thù với độ chính xác cao','Phun từ miệng','Xịt từ cơ thể'], 'Rắn hổ mang phun (spitting cobra) phun nọc chính xác vào mắt kẻ thù từ khoảng cách 1-2.5m — gây mù tạm thời hoặc vĩnh viễn nếu không rửa kịp.')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 4: TIẾN HÓA VÀ NGUỒN GỐC SỰ SỐNG
// ════════════════════════════════════════════════════════════════════════════

const EVOLUTION = [

t('dinosaurs', 'Khủng long — Chủ nhân của Trái Đất trong 165 triệu năm',
  ['Khủng long sống từ 230 đến 66 triệu năm trước — chiếm ưu thế trong kỷ Mesozoic.',
   'Không phải mọi khủng long đều to — Compsognathus nhỏ bằng con gà!',
   'T-Rex có tầm nhìn tốt hơn diều hâu và tốc độ chạy 20-25 km/h.',
   '66 triệu năm trước, thiên thạch đường kính 10 km đâm vào Mexico — xóa sổ 75% sinh vật.',
   'Chim ngày nay là hậu duệ trực tiếp của khủng long — chúng là "khủng long có lông"!'],
  'Các nhà khoa học tìm thấy xương khủng long nhưng chưa bao giờ thấy ADN nguyên vẹn — Jurassic Park vẫn là viễn tưởng!',
  [q('Khủng long sống trên Trái Đất trong bao lâu?', '165 triệu năm', ['1 triệu năm','165 triệu năm','10 triệu năm','500 triệu năm'], 'So với đó, loài người chỉ tồn tại khoảng 300,000 năm — nhân loại còn rất "non trẻ" so với khủng long!'),
   q('Điều gì gây ra sự tuyệt chủng hàng loạt của khủng long?', 'Thiên thạch khổng lồ đâm vào Trái Đất + núi lửa phun trào', ['Bệnh dịch','Thiên thạch khổng lồ đâm vào Trái Đất + núi lửa phun trào','Lũ lụt toàn cầu','Chúng tự diệt nhau'], 'Thiên thạch 10km tạo mùa đông hạt nhân kéo dài nhiều năm — thực vật chết → động vật ăn cỏ chết → khủng long ăn thịt chết.'),
   q('Con vật nào ngày nay là hậu duệ của khủng long?', 'Chim', ['Cá sấu','Rắn','Chim','Rùa'], 'Chim tiến hóa từ khủng long chân chim (theropod) — T-Rex và gà có quan hệ họ hàng! ADN xác nhận điều này.'),
   q('Compsognathus khủng long nhỏ nhất bằng con gì?', 'Con gà', ['Con voi','Con mèo','Con gà','Con chuột'], 'Compsognathus chỉ nặng khoảng 2 kg và dài 1 mét — chứng tỏ không phải mọi khủng long đều khổng lồ!'),
   q('T-Rex có thể chạy nhanh bao nhiêu?', 'Khoảng 20-25 km/h', ['100 km/h','5 km/h','Khoảng 20-25 km/h','50 km/h'], 'T-Rex không nhanh như phim Jurassic Park mô tả — xe đạp trung bình đã có thể thoát khỏi T-Rex! Nhưng bù lại sức mạnh cắn của nó gấp 3 lần sư tử.'),
   q('Tại sao khủng long không thể được tái tạo từ ADN trong hổ phách?', 'ADN phân hủy sau vài triệu năm — 66 triệu năm đủ để mọi ADN khủng long biến mất', ['Vì ADN trong hổ phách bị đóng băng','ADN phân hủy sau vài triệu năm — 66 triệu năm đủ để mọi ADN khủng long biến mất','Vì chúng ta chưa tìm được hổ phách','Vì kỹ thuật chưa đủ tốt'], 'Jurassic Park là khoa học viễn tưởng hấp dẫn nhưng ADN sống không thể tồn tại 66 triệu năm — nó phân hủy trong vài triệu năm ngay cả trong điều kiện tốt nhất.'),
   q('Khủng long đã sống qua bao nhiêu kỷ địa chất?', 'Kỷ Triassic, Jurassic và Cretaceous (cả kỷ Mesozoic)', ['Chỉ kỷ Jurassic','Kỷ Triassic, Jurassic và Cretaceous (cả kỷ Mesozoic)','Chỉ kỷ Cretaceous','Kỷ Paleozoic và Mesozoic'], 'Khủng long xuất hiện cuối kỷ Triassic (~230 triệu năm), thống trị suốt Jurassic và biến mất ở cuối Cretaceous (66 triệu năm trước).')]),

t('evolution-life', 'Thuyết tiến hóa — Bí ẩn của sự sống',
  ['Darwin đề xuất thuyết tiến hóa năm 1859: sinh vật thay đổi qua nhiều thế hệ để thích nghi với môi trường.',
   'Chọn lọc tự nhiên: cá thể có đặc điểm tốt hơn sẽ sống sót và sinh sản nhiều hơn.',
   'Sự sống trên Trái Đất bắt đầu khoảng 3.8 tỷ năm trước từ vi khuẩn đơn giản.',
   'Từ vi khuẩn đến cá, từ cá lên đất liền thành lưỡng cư, rồi bò sát, rồi thú và người.',
   'ADN là bằng chứng quan trọng nhất — người và tinh tinh có ADN giống nhau 98.7%!'],
  'Mọi sinh vật trên Trái Đất, từ vi khuẩn đến cá voi, đều có chung tổ tiên — cách đây 3.8 tỷ năm!',
  [q('Darwin đề xuất thuyết tiến hóa vào năm nào?', '1859', ['1859','1960','1750','1900'], 'Cuốn "Nguồn gốc các loài" (On the Origin of Species) năm 1859 thay đổi hoàn toàn cách nhân loại hiểu về sự sống.'),
   q('Chọn lọc tự nhiên có nghĩa là gì?', 'Cá thể thích nghi tốt hơn có nhiều cơ hội sống sót và sinh sản', ['Mạnh sẽ thắng yếu','Cá thể thích nghi tốt hơn có nhiều cơ hội sống sót và sinh sản','Người thông minh nhất tồn tại','Sinh vật to lớn hơn sẽ thắng'], 'Darwin gọi đây là "survival of the fittest" — không phải mạnh nhất mà là thích nghi tốt nhất với môi trường.'),
   q('ADN của người và tinh tinh giống nhau bao nhiêu phần trăm?', '98.7%', ['50%','75%','90%','98.7%'], 'Sự tương đồng ADN 98.7% xác nhận người và tinh tinh có chung tổ tiên khoảng 6-7 triệu năm trước.'),
   q('Sự sống xuất hiện trên Trái Đất khoảng bao lâu trước?', 'Khoảng 3.8 tỷ năm trước', ['6000 năm trước','1 triệu năm trước','Khoảng 3.8 tỷ năm trước','100 triệu năm trước'], 'Bằng chứng hóa thạch và địa chất cho thấy sự sống đầu tiên là vi khuẩn đơn giản trong đại dương nóng cách đây 3.8 tỷ năm.'),
   q('Cá lên cạn và trở thành động vật đất liền như thế nào?', 'Qua hàng triệu năm tiến hóa, vây trước cá trở thành chân để bò trên đất', ['Cá đột nhiên mọc chân','Qua hàng triệu năm tiến hóa, vây trước cá trở thành chân để bò trên đất','Cá và thú là loài riêng biệt','Tiến hóa không liên quan cá và thú'], 'Hóa thạch Tiktaalik (375 triệu năm trước) cho thấy cá có vây dày, ngón sơ khai — mắt xích giữa cá và động vật đất liền.'),
   q('Tại sao tiến hóa không có hướng định sẵn?', 'Đột biến gen xảy ra ngẫu nhiên — môi trường quyết định đột biến nào được giữ lại', ['Có thần linh điều khiển','Đột biến gen xảy ra ngẫu nhiên — môi trường quyết định đột biến nào được giữ lại','Sinh vật tự chọn đặc điểm muốn có','Tiến hóa luôn hướng đến hoàn hảo hơn'], 'Tiến hóa không có "mục tiêu" — đột biến ngẫu nhiên, và môi trường "chọn" những gì hoạt động tốt hơn. Không có sinh vật nào là "tiến hóa hoàn hảo".'),
   q('Bằng chứng nào mạnh nhất cho thuyết tiến hóa?', 'Hóa thạch, ADN tương đồng, cơ quan thoái hóa và tiến hóa quan sát được trong thực nghiệm', ['Chỉ có sách của Darwin','Hóa thạch, ADN tương đồng, cơ quan thoái hóa và tiến hóa quan sát được trong thực nghiệm','Ý kiến của nhà khoa học','Hình ảnh vẽ cây tiến hóa'], 'Con người có xương cụt (đuôi thoái hóa), răng khôn (hàm thoái hóa) — bằng chứng về tổ tiên chung. Vi khuẩn tiến hóa kháng kháng sinh là tiến hóa đang xảy ra ngay trước mắt ta!')]),

t('human-origins', 'Nguồn gốc loài người — Hành trình 7 triệu năm',
  ['Tổ tiên chung của người và tinh tinh sống khoảng 6-7 triệu năm trước ở châu Phi.',
   'Homo sapiens — người hiện đại — xuất hiện khoảng 300,000 năm trước ở châu Phi.',
   'Người đi thẳng đứng (Homo erectus) biết dùng lửa và công cụ đá từ 1.9 triệu năm trước.',
   'Người Neanderthal sống cùng Homo sapiens và một số còn có ADN Neanderthal trong gen!',
   'Ngôn ngữ và nghệ thuật làm cho Homo sapiens thống trị — 40,000 năm trước có tranh hang động.'],
  'Mọi người trên Trái Đất đều có chung tổ tiên châu Phi — chúng ta là một gia đình!',
  [q('Homo sapiens (người hiện đại) xuất hiện khoảng bao lâu trước?', 'Khoảng 300,000 năm trước ở châu Phi', ['6,000 năm trước','Khoảng 300,000 năm trước ở châu Phi','1 triệu năm trước','6 triệu năm trước'], 'ADN và hóa thạch xác nhận Homo sapiens xuất hiện ở châu Phi khoảng 300,000 năm trước, sau đó lan rộng ra toàn thế giới.'),
   q('Điều gì giúp Homo sapiens thống trị thế giới?', 'Ngôn ngữ phức tạp và tư duy trừu tượng cho phép hợp tác quy mô lớn', ['Sức mạnh thể lực','Ngôn ngữ phức tạp và tư duy trừu tượng cho phép hợp tác quy mô lớn','Chạy nhanh nhất','Ăn được nhiều thứ nhất'], 'Ngôn ngữ cho phép truyền đạt thông tin, lập kế hoạch, kể chuyện — tạo ra văn hóa, khoa học và xã hội.'),
   q('Tranh hang động cổ xưa nhất được tìm thấy ở đâu và có từ bao lâu?', 'Khoảng 40,000-45,000 năm tuổi, tìm thấy ở châu Âu và Indonesia', ['100 năm tuổi ở Ai Cập','Khoảng 40,000-45,000 năm tuổi, tìm thấy ở châu Âu và Indonesia','1 triệu năm tuổi ở châu Phi','6000 năm tuổi ở Trung Quốc'], 'Tranh hang Sulawesi (Indonesia) 45,000 năm tuổi là nghệ thuật lâu đời nhất biết được — chứng tỏ tư duy nghệ thuật xuất hiện rất sớm.'),
   q('Người Neanderthal liên quan đến người hiện đại như thế nào?', 'Đã giao phối với Homo sapiens — người ngoài châu Phi mang 1-4% ADN Neanderthal', ['Là tổ tiên trực tiếp','Đã giao phối với Homo sapiens — người ngoài châu Phi mang 1-4% ADN Neanderthal','Không liên quan gì','Là loài tiến bộ hơn người'], 'Xét nghiệm ADN cho thấy người châu Âu và châu Á có 1-4% gen Neanderthal — bằng chứng hai loài đã sống cùng và có con lai!'),
   q('Điều gì giúp Homo sapiens lan rộng ra khỏi châu Phi?', 'Ngôn ngữ, kỹ năng hợp tác quy mô lớn và khả năng thích nghi với nhiều môi trường', ['Sức mạnh thể lực','Ngôn ngữ, kỹ năng hợp tác quy mô lớn và khả năng thích nghi với nhiều môi trường','Kích thước to lớn','Tốc độ chạy nhanh'], 'Homo sapiens ra khỏi châu Phi ~70,000 năm trước và lan ra toàn thế giới trong 50,000 năm — nhanh hơn bất kỳ loài động vật lớn nào khác.'),
   q('Nông nghiệp xuất hiện từ khi nào và thay đổi loài người như thế nào?', 'Khoảng 10,000 năm trước — từ đó dân số tăng vọt và nền văn minh hình thành', ['1,000 năm trước','Khoảng 10,000 năm trước — từ đó dân số tăng vọt và nền văn minh hình thành','500,000 năm trước','Con người luôn biết trồng trọt'], 'Từ săn bắt hái lượm → nông nghiệp là bước nhảy vọt lớn nhất trong lịch sử loài người. Thặng dư lương thực → chuyên môn hóa → thành phố → chữ viết → văn minh.'),
   q('Vì sao não người lớn hơn so với thể trọng so với các loài linh trưởng khác?', 'Ăn thịt nấu chín cung cấp nhiều protein và năng lượng hơn, não phát triển nhanh trong tiến hóa', ['Vì người sống lâu hơn','Ăn thịt nấu chín cung cấp nhiều protein và năng lượng hơn, não phát triển nhanh trong tiến hóa','Vì người có hai chân thẳng','Vì người biết nói chuyện'], 'Lửa → nấu chín thức ăn → dễ tiêu hóa hơn, nhiều calo hơn → năng lượng dư để nuôi não lớn. Đây là giả thuyết "lửa tạo ra người" của Richard Wrangham.')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 5: HIỆN TƯỢNG THIÊN NHIÊN VÀ TRÁI ĐẤT
// ════════════════════════════════════════════════════════════════════════════

const EARTH_NATURE = [

t('volcanoes', 'Núi lửa — Khi Trái Đất "thở"',
  ['Núi lửa hình thành khi magma (đá nóng chảy) từ lòng đất phun lên bề mặt.',
   'Có khoảng 1,500 núi lửa hoạt động trên thế giới — 90% dọc theo "Vành đai Lửa" Thái Bình Dương.',
   'Núi lửa tạo ra đất màu mỡ — người dân Hawaii và Java sống gần núi lửa vì đất rất tốt.',
   'Krakatau (Indonesia) phun năm 1883 — tiếng nổ nghe được ở cách 5,000 km!',
   'Sự sống đầu tiên trên Trái Đất có thể hình thành gần miệng núi lửa dưới biển.'],
  'Núi lửa trên Io (mặt trăng của Sao Mộc) phun cao 500 km — núi lửa mạnh nhất trong Hệ Mặt Trời!',
  [q('Núi lửa hình thành như thế nào?', 'Magma (đá nóng chảy) từ lòng đất tìm đường phun lên bề mặt', ['Gió mạnh tạo ra','Magma (đá nóng chảy) từ lòng đất tìm đường phun lên bề mặt','Băng tan làm nổ đất','Mưa axit ăn mòn đất'], 'Magma hình thành ở lớp manto của Trái Đất — áp suất đủ lớn thì nó tìm đường lên mặt đất qua các vết nứt.'),
   q('Vành đai Lửa Thái Bình Dương là gì?', 'Vùng có nhiều núi lửa và động đất nhất, bao quanh Thái Bình Dương', ['Một hòn đảo','Vùng có nhiều núi lửa và động đất nhất, bao quanh Thái Bình Dương','Chuỗi đảo san hô','Dòng hải lưu ấm'], 'Ring of Fire (Vành đai Lửa) bao gồm Nhật Bản, Philippines, Indonesia, Chile — 90% địa chấn thế giới xảy ra ở đây.'),
   q('Tại sao người dân sống gần núi lửa dù nguy hiểm?', 'Đất núi lửa cực kỳ màu mỡ vì giàu khoáng chất', ['Vì không biết nguy hiểm','Đất núi lửa cực kỳ màu mỡ vì giàu khoáng chất','Vì không có đất khác','Vì được trả tiền'], 'Tro và dung nham núi lửa phân hủy thành đất giàu khoáng chất như phospho, kali, canxi — lý tưởng cho nông nghiệp.'),
   q('Điều gì xảy ra với Trái Đất nếu không có núi lửa trong lịch sử?', 'Bầu khí quyển và đại dương sẽ không hình thành như ngày nay', ['Không có gì thay đổi','Bầu khí quyển và đại dương sẽ không hình thành như ngày nay','Trái Đất lạnh hơn','Không có đất liền'], 'Núi lửa thời cổ đại phun ra CO₂, hơi nước và khí khác tạo thành bầu khí quyển đầu tiên của Trái Đất.'),
   q('Núi lửa cao nhất Hệ Mặt Trời là núi nào?', 'Núi Olympus Mons trên Sao Hỏa — cao 22 km, gấp 3 lần Everest', ['Núi Everest trên Trái Đất','Núi Olympus Mons trên Sao Hỏa — cao 22 km, gấp 3 lần Everest','Núi lửa trên Sao Kim','Núi Mauna Kea trên Hawaii'], 'Olympus Mons rộng 600 km và cao 22 km — lớn đến mức nếu đứng ở chân núi, bạn sẽ không thấy đỉnh vì đường chân trời che mất!'),
   q('Dung nham núi lửa di chuyển nhanh như thế nào?', 'Từ chậm như người đi bộ đến nhanh như ô tô — tùy độ nhớt của dung nham', ['Nhanh hơn máy bay','Từ chậm như người đi bộ đến nhanh như ô tô — tùy độ nhớt của dung nham','Luôn đứng yên một chỗ','Nhanh như sóng thần'], 'Dung nham loãng Hawaii chảy 60 km/h, nhưng dung nham đặc ở núi lửa khác chỉ vài cm/giờ — có thể bước qua được!'),
   q('Tro núi lửa ảnh hưởng đến khí hậu Trái Đất như thế nào?', 'Tro và SO₂ bay cao vào khí quyển → che ánh sáng mặt trời → nhiệt độ Trái Đất giảm tạm thời', ['Làm ấm hơn vì nhiều CO₂','Tro và SO₂ bay cao vào khí quyển → che ánh sáng mặt trời → nhiệt độ Trái Đất giảm tạm thời','Không ảnh hưởng gì','Gây mưa acid toàn cầu'], 'Núi lửa Tambora (1815) phun ra 160 km³ tro — năm 1816 được gọi là "năm không có mùa hè": mùa màng thất bát, nạn đói khắp châu Âu và châu Á!')]),

t('earthquakes', 'Động đất — Khi mặt đất rung chuyển',
  ['Trái Đất có 7 mảng kiến tạo lớn — chúng luôn dịch chuyển, va chạm hoặc tách rời nhau.',
   'Khi các mảng bị kẹt rồi đột ngột trượt, năng lượng giải phóng → động đất.',
   'Thang Richter đo cường độ: mỗi đơn vị = gấp 10 lần năng lượng (magnitude 7 mạnh hơn magnitude 6 tới 10 lần).',
   'Sóng thần (tsunami) thường do động đất dưới đáy biển tạo ra.',
   'Nhật Bản có khoảng 1,500 trận động đất nhỏ mỗi năm!'],
  'Thành phố Los Angeles và San Francisco đang di chuyển lại gần nhau 5 cm mỗi năm dọc đứt gãy San Andreas!',
  [q('Động đất xảy ra vì lý do gì?', 'Các mảng kiến tạo va chạm, tách rời hoặc trượt dọc theo nhau', ['Trái Đất đang nguội','Các mảng kiến tạo va chạm, tách rời hoặc trượt dọc theo nhau','Gió mạnh','Trái Đất tự co lại'], 'Lớp vỏ Trái Đất gồm các mảng khổng lồ di chuyển chậm — khi năng lượng tích lũy đủ lớn và giải phóng đột ngột → động đất.'),
   q('Sóng thần (tsunami) thường hình thành như thế nào?', 'Động đất dưới đáy biển đẩy cột nước lên tạo sóng lan ra xa', ['Gió bão','Động đất dưới đáy biển đẩy cột nước lên tạo sóng lan ra xa','Núi lửa trên đảo','Tàu thuyền lớn'], 'Sóng thần ở giữa đại dương chỉ cao vài cm nhưng di chuyển 800 km/h — khi vào bờ nông thì tăng cao đột ngột.'),
   q('Thang Richter đo gì?', 'Năng lượng giải phóng của động đất', ['Thiệt hại do động đất','Năng lượng giải phóng của động đất','Độ sâu của tâm chấn','Thời gian kéo dài của rung lắc'], 'Mỗi đơn vị tăng = 10 lần năng lượng: động đất 7.0 mạnh hơn 6.0 là 10 lần, mạnh hơn 5.0 là 100 lần!'),
   q('Nước nào có nhiều động đất nhất?', 'Nhật Bản', ['Mỹ','Trung Quốc','Nhật Bản','Nga'], 'Nhật Bản nằm trên giao điểm của 4 mảng kiến tạo — 10% động đất thế giới xảy ra ở Nhật Bản, với 1,500 trận nhỏ mỗi năm.'),
   q('Việt Nam có thường xuyên xảy ra động đất không?', 'Có, nhưng hầu hết nhỏ — vùng Tây Bắc và Trung Bộ dễ xảy ra động đất nhất', ['Không bao giờ','Có, nhưng hầu hết nhỏ — vùng Tây Bắc và Trung Bộ dễ xảy ra động đất nhất','Chỉ ở ven biển','Chỉ ở miền Nam'], 'Việt Nam nằm gần mảng kiến tạo Đông Nam Á — không thường xuyên như Nhật Bản nhưng có rủi ro, đặc biệt khu vực biên giới Tây Bắc.'),
   q('Khi có động đất, hành động an toàn nhất là gì?', 'Núp dưới bàn chắc, tránh xa cửa sổ và đứng tại chỗ — không chạy ra ngoài khi đang rung', ['Chạy ra ngoài ngay lập tức','Núp dưới bàn chắc, tránh xa cửa sổ và đứng tại chỗ — không chạy ra ngoài khi đang rung','Leo lên tầng cao nhất','Nhảy ra cửa sổ'], 'Nguy hiểm nhất khi động đất là vật rơi từ trên cao và kính vỡ. "Drop, cover, hold on" (cúi xuống, núp lại, bám chặt) là nguyên tắc sống còn!'),
   q('Tại sao các tòa nhà ở Tokyo được thiết kế đặc biệt?', 'Thiết kế chống động đất: sàn rung lắc được, cơ cấu hấp thụ dao động', ['Để trông đẹp hơn','Thiết kế chống động đất: sàn rung lắc được, cơ cấu hấp thụ dao động','Vì gió mạnh','Vì thời tiết lạnh'], 'Nhà chống động đất dùng "con lắc ngược" để hấp thụ dao động, móng cách ly với đất — tốn kém nhưng cứu sống nhiều người!')]),

t('climate-weather', 'Thời tiết và Khí hậu — Bầu không khí sống động',
  ['Thời tiết là trạng thái khí quyển hàng ngày; khí hậu là xu hướng trung bình trong nhiều thập kỷ.',
   'Bão nhiệt đới (typhoon/hurricane) hình thành khi nước biển ấm trên 26°C cung cấp năng lượng.',
   'Sấm sét là phóng điện giữa đám mây và mặt đất — nhiệt độ tia sét 30,000°C, nóng hơn bề mặt Mặt Trời!',
   'Mây được tạo ra khi hơi nước nguội đi và ngưng tụ trên các hạt bụi siêu nhỏ.',
   'Hiệu ứng nhà kính tự nhiên giữ nhiệt độ Trái Đất +33°C ấm hơn — không có nó, Trái Đất đông băng.'],
  'Một cơn bão Category 5 có năng lượng tương đương 10,000 quả bom hạt nhân mỗi ngày!',
  [q('Điểm khác biệt giữa thời tiết và khí hậu là gì?', 'Thời tiết thay đổi hàng ngày; khí hậu là xu hướng trung bình nhiều thập kỷ', ['Không có gì khác nhau','Thời tiết thay đổi hàng ngày; khí hậu là xu hướng trung bình nhiều thập kỷ','Thời tiết là nhiệt độ, khí hậu là gió','Thời tiết xảy ra ban ngày, khí hậu ban đêm'], '"Khí hậu là tính cách, thời tiết là tâm trạng" — câu ngạn ngữ hay để nhớ sự khác biệt này!'),
   q('Tia sét nóng bao nhiêu độ?', 'Khoảng 30,000°C — nóng hơn bề mặt Mặt Trời 5 lần', ['100°C','1,000°C','Khoảng 30,000°C — nóng hơn bề mặt Mặt Trời 5 lần','300°C'], 'Bề mặt Mặt Trời chỉ khoảng 5,500°C — tia sét nóng hơn 5 lần! Vì vậy đứng dưới bóng cây khi có sấm sét rất nguy hiểm.'),
   q('Mây hình thành như thế nào?', 'Hơi nước bốc lên nguội dần và ngưng tụ thành giọt nước nhỏ trên hạt bụi', ['Do gió tạo ra','Hơi nước bốc lên nguội dần và ngưng tụ thành giọt nước nhỏ trên hạt bụi','Khí oxy kết hợp với nước','Do lạnh đột ngột của không khí'], 'Mỗi đám mây thực ra là triệu triệu giọt nước siêu nhỏ (0.01mm) lơ lửng trong không khí — quá nhẹ để rơi xuống.'),
   q('Tại sao biến đổi khí hậu là vấn đề nghiêm trọng?', 'CO₂ tăng làm hiệu ứng nhà kính mạnh hơn, nhiệt độ tăng gây băng tan, nước biển dâng', ['Trái Đất sẽ nổ','CO₂ tăng làm hiệu ứng nhà kính mạnh hơn, nhiệt độ tăng gây băng tan, nước biển dâng','Mặt Trời bị che khuất','Không khí bị ô nhiễm hóa chất'], 'Nhiệt độ Trái Đất tăng 1.5°C đã gây ra: băng tan, mực nước biển tăng, thời tiết cực đoan thường xuyên hơn.'),
   q('Việt Nam bị ảnh hưởng bởi biến đổi khí hậu như thế nào?', 'Nước biển dâng đe dọa đồng bằng sông Cửu Long, bão mạnh hơn và hạn hán khắc nghiệt hơn', ['Không ảnh hưởng','Chỉ ảnh hưởng miền Bắc','Nước biển dâng đe dọa đồng bằng sông Cửu Long, bão mạnh hơn và hạn hán khắc nghiệt hơn','Chỉ bị lạnh hơn'], 'Đồng bằng sông Cửu Long chỉ cao 0.5-1m so với mực biển — nơi 20 triệu người sinh sống đang bị đe dọa nghiêm trọng bởi nước biển dâng.'),
   q('Hoạt động nào của con người thải ra nhiều CO₂ nhất?', 'Đốt nhiên liệu hóa thạch: than, dầu mỏ, khí đốt để sản xuất điện và vận tải', ['Nông nghiệp','Đốt nhiên liệu hóa thạch: than, dầu mỏ, khí đốt để sản xuất điện và vận tải','Công nghiệp thực phẩm','Chăn nuôi gia súc'], 'Đốt nhiên liệu hóa thạch chiếm 75% lượng khí thải nhà kính — chuyển sang điện mặt trời, gió, và xe điện là giải pháp then chốt.'),
   q('Tại sao cầu vồng thường xuất hiện sau cơn mưa?', 'Ánh sáng mặt trời chiếu vào các giọt nước trong không khí, tách thành 7 màu', ['Vì trời trong xanh','Ánh sáng mặt trời chiếu vào các giọt nước trong không khí, tách thành 7 màu','Vì gió tạo ra màu sắc','Vì bầu trời phản chiếu ánh sáng'], 'Mỗi giọt nước là lăng kính mini — bẻ cong ánh sáng theo góc khác nhau tùy màu. Cầu vồng luôn xuất hiện ở phía đối diện mặt trời với người xem.')]),

t('water-cycle', 'Vòng tuần hoàn nước — Hành trình của giọt nước',
  ['Nước trên Trái Đất đã tồn tại hàng tỷ năm — nước em uống hôm nay có thể từng là nước uống của khủng long!',
   'Bay hơi: nước từ biển/hồ/sông → hơi nước (nhờ nhiệt Mặt Trời).',
   'Ngưng tụ: hơi nước lên cao, nguội thành mây.',
   'Giáng thủy: mưa, tuyết, sương từ mây.',
   'Thấm: nước vào đất → mạch nước ngầm → sông → biển → vòng lại.'],
  'Mỗi phân tử nước đã tồn tại từ khi Trái Đất hình thành 4.5 tỷ năm trước — không tăng không giảm!',
  [q('Vòng tuần hoàn nước gồm những bước nào?', 'Bay hơi → ngưng tụ → giáng thủy → chảy tràn → thấm → bay hơi trở lại', ['Bay hơi → mưa','Bay hơi → ngưng tụ → giáng thủy → chảy tràn → thấm → bay hơi trở lại','Mưa → biển → mưa','Đất → sông → biển'], 'Vòng tuần hoàn nước là chu trình liên tục — nước không bao giờ biến mất, chỉ thay đổi dạng và vị trí.'),
   q('Năng lượng gì làm bay hơi nước từ biển và sông?', 'Năng lượng từ ánh sáng Mặt Trời', ['Gió','Năng lượng từ ánh sáng Mặt Trời','Điện từ sấm sét','Nhiệt từ lòng đất'], 'Mặt Trời là "động cơ" của vòng tuần hoàn nước — chiếu năng lượng làm nước bay hơi liên tục từ đại dương.'),
   q('Nước ngầm hình thành như thế nào?', 'Mưa thấm qua đất và đá, tích tụ trong các tầng ngậm nước dưới lòng đất', ['Do núi lửa tạo ra','Mưa thấm qua đất và đá, tích tụ trong các tầng ngậm nước dưới lòng đất','Từ sông chảy vào hang','Do băng tan thấm xuống'], 'Nước ngầm là nguồn nước quan trọng — khoảng 30% nước ngọt thế giới dự trữ dưới đất trong các tầng đá rỗng.'),
   q('Tại sao nước muối biển không bay hơi thành nước mặn?', 'Khi bay hơi, chỉ phân tử H₂O bay lên, muối ở lại trong nước', ['Muối nặng hơn','Khi bay hơi, chỉ phân tử H₂O bay lên, muối ở lại trong nước','Muối tan vào đất','Gió thổi muối đi'], 'Đây là nguyên lý chưng cất tự nhiên — nước biển bay hơi tạo mây mưa ngọt. Mưa không bao giờ mặn!'),
   q('Tại sao nước ngọt sạch ngày càng trở nên quý hiếm?', 'Dân số tăng, ô nhiễm nguồn nước, và biến đổi khí hậu làm mưa thất thường', ['Vì biển hút hết','Dân số tăng, ô nhiễm nguồn nước, và biến đổi khí hậu làm mưa thất thường','Vì cây hút hết','Nước không còn bay hơi'], 'Chỉ 2.5% nước Trái Đất là nước ngọt, và 70% trong đó bị đóng băng. Con người chỉ có thể dùng khoảng 1% nước trên Trái Đất!'),
   q('Nước trong cơ thể người chiếm bao nhiêu phần trăm?', 'Khoảng 60-70% trọng lượng cơ thể', ['10%','Khoảng 60-70% trọng lượng cơ thể','90%','30%'], 'Não chứa 75% nước, máu 83%, phổi 90%. Mất 2% nước = giảm 20% hiệu suất nhận thức — vì vậy uống đủ nước khi học rất quan trọng!'),
   q('Nước được tạo ra như thế nào trên Trái Đất?', 'Phần lớn được mang đến từ thiên thạch băng khi Trái Đất còn non trẻ', ['Từ phản ứng hóa học trong đất','Phần lớn được mang đến từ thiên thạch băng khi Trái Đất còn non trẻ','Từ Mặt Trăng','Từ sao chổi và phản ứng núi lửa'], 'Nước trên Trái Đất cũ đến 4.4 tỷ năm tuổi — mỗi phân tử H₂O bạn uống đã tồn tại từ khi Trái Đất hình thành!')]),

t('space-phenomena', 'Hiện tượng thiên văn — Kỳ quan vũ trụ',
  ['Nhật thực toàn phần xảy ra khi Mặt Trăng che khuất hoàn toàn Mặt Trời — kỳ diệu vì Mặt Trời to hơn 400 lần nhưng cũng xa hơn 400 lần!',
   'Sao băng là bụi vũ trụ cháy khi vào khí quyển — không phải sao thật rơi.',
   'Bắc cực quang (Aurora) xảy ra khi hạt điện tích từ Mặt Trời va chạm với khí quyển Trái Đất.',
   'Hố đen là vùng không gian có lực hút cực lớn — ngay cả ánh sáng cũng không thoát ra được.',
   'Vũ trụ đang giãn nở — các thiên hà ngày càng xa nhau hơn!'],
  'Ánh sáng từ Mặt Trời mất 8 phút để đến Trái Đất — nếu Mặt Trời biến mất, chúng ta chỉ biết sau 8 phút!',
  [q('Nhật thực toàn phần xảy ra khi nào?', 'Mặt Trăng che khuất hoàn toàn Mặt Trời khi quan sát từ một điểm trên Trái Đất', ['Trái Đất che Mặt Trăng','Mặt Trăng che khuất hoàn toàn Mặt Trời khi quan sát từ một điểm trên Trái Đất','Mặt Trời tắt tạm thời','Mây dày che Mặt Trời'], 'Điều kỳ diệu là Mặt Trăng nhỏ hơn Mặt Trời 400 lần, nhưng cũng gần hơn 400 lần — kết quả là trông to bằng nhau trên bầu trời!'),
   q('Sao băng thực ra là gì?', 'Bụi và đá vũ trụ nhỏ cháy sáng khi ma sát với khí quyển Trái Đất', ['Sao thật rơi xuống','Bụi và đá vũ trụ nhỏ cháy sáng khi ma sát với khí quyển Trái Đất','Mảnh vỡ từ Mặt Trăng','Tia laser vũ trụ'], 'Hầu hết sao băng chỉ to bằng hạt cát — không bao giờ chạm tới mặt đất. Tên gọi "sao băng" thực ra là meteor (thiên thạch).'),
   q('Bắc cực quang (Aurora Borealis) hình thành như thế nào?', 'Hạt điện tích từ Mặt Trời va chạm khí oxy và nitơ trong khí quyển, phát sáng', ['Ánh sáng phản chiếu từ băng tuyết','Hạt điện tích từ Mặt Trời va chạm khí oxy và nitơ trong khí quyển, phát sáng','Tia laser từ vũ trụ','Bụi không khí phát sáng'], 'Từ trường Trái Đất hướng hạt điện tích về hai cực — chúng kích thích khí oxy (màu xanh lá) và nitơ (màu đỏ/tím) phát sáng.'),
   q('Hố đen là gì?', 'Vùng không gian có lực hút mạnh đến mức ánh sáng cũng không thoát ra được', ['Lỗ hổng trong vũ trụ','Vùng không gian có lực hút mạnh đến mức ánh sáng cũng không thoát ra được','Ngôi sao đã tắt','Hành tinh màu đen'], 'Hố đen hình thành khi ngôi sao khổng lồ sụp đổ — lực hút của nó nén vật chất đến mật độ vô cùng. Ảnh chụp hố đen đầu tiên công bố năm 2019!'),
   q('Bắc cực quang thường xuất hiện ở đâu trên Trái Đất?', 'Gần hai cực — Na Uy, Canada, Alaska, Phần Lan, Iceland', ['Gần xích đạo','Gần hai cực — Na Uy, Canada, Alaska, Phần Lan, Iceland','Khắp nơi bầu trời','Chỉ ở Nam Cực'], 'Từ trường Trái Đất có hình phễu ở hai cực — gió mặt trời bị hướng vào đây, va chạm khí quyển và tạo cực quang rực rỡ.'),
   q('Tại sao nhìn lên bầu trời đêm là "nhìn vào quá khứ"?', 'Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới đến Trái Đất', ['Vì đêm tối hơn ngày','Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới đến Trái Đất','Vì bầu trời rất xa','Vì mắt xử lý chậm'], 'Sao Sirius cách 8.6 năm ánh sáng — ánh sáng ta thấy xuất phát từ năm 2017. Sao Andromeda gần nhất: 2.5 triệu năm ánh sáng — ta nhìn nó từ thời người tiền sử!'),
   q('Vũ trụ đang giãn nở hay co lại?', 'Đang giãn nở — các thiên hà ngày càng xa nhau hơn', ['Co lại','Đang giãn nở — các thiên hà ngày càng xa nhau hơn','Đứng yên không thay đổi','Lúc giãn lúc co'], 'Edwin Hubble (1929) phát hiện tất cả thiên hà đều đang xa ra — bằng chứng Vũ Trụ đang giãn nở và từng bắt đầu từ một điểm (Big Bang).')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 6: CƠ THỂ ĐỘNG VẬT — THÍCH NGHI KỲ DIỆU
// ════════════════════════════════════════════════════════════════════════════

const ANIMAL_BODIES = [

t('camouflage', 'Ngụy trang và Bảo vệ — Nghệ thuật ẩn thân',
  ['Ngụy trang là kỹ năng "ẩn mình" bằng cách bắt chước màu sắc và hình dạng môi trường.',
   'Bạch tuộc có thể đổi màu và kết cấu da trong chưa đầy 1 giây!',
   'Con sâu đo (walking stick) bắt chước hình dạng cành cây hoàn hảo.',
   'Tắc kè rồng lá (leafy seadragon) trông y hệt rong biển — không ai nhận ra.',
   'Một số con vật ngụy trang bằng cách giả chết (playing dead) khi gặp kẻ thù.'],
  'Bạch tuộc mimic bắt chước được 15 loài động vật nguy hiểm khác nhau — thiên tài ngụy trang!',
  [q('Bạch tuộc đổi màu nhanh như thế nào?', 'Trong chưa đến 1 giây, thay đổi cả màu sắc lẫn kết cấu da', ['Vài phút','Trong chưa đến 1 giây, thay đổi cả màu sắc lẫn kết cấu da','Vài giờ','Không tự đổi được'], 'Bạch tuộc có tế bào sắc tố chromatophore — hàng triệu ô nhỏ chứa màu, điều khiển bằng cơ bắp để đổi màu tức thì.'),
   q('Tại sao ngụy trang có lợi cho sinh vật?', 'Giúp trốn kẻ thù và/hoặc tiếp cận con mồi mà không bị phát hiện', ['Trông đẹp hơn','Giúp trốn kẻ thù và/hoặc tiếp cận con mồi mà không bị phát hiện','Giữ ấm','Hút ánh sáng mặt trời'], 'Ngụy trang là chiến lược tiến hóa hai chiều: con mồi trốn kẻ săn, kẻ săn cũng ngụy trang để tiếp cận con mồi.'),
   q('Con vật nào "chơi chết" để tự bảo vệ?', 'Chuột túi (Virginia Opossum) và một số loài rắn', ['Báo','Chuột túi (Virginia Opossum) và một số loài rắn','Cá heo','Sư tử'], 'Opossum ngã ra "chết" khi gặp nguy hiểm, kể cả tiết ra mùi hôi như xác thối — kẻ săn mồi thường không ăn con vật đã chết.'),
   q('Sao biển có khả năng đặc biệt nào?', 'Có thể tái tạo lại tay bị mất — thậm chí tay bị cắt có thể mọc thành sao biển mới', ['Bay được','Có thể tái tạo lại tay bị mất — thậm chí tay bị cắt có thể mọc thành sao biển mới','Bắn nước ra xa','Đổi màu như tắc kè hoa'], 'Khả năng tái sinh của sao biển rất mạnh — một số loài mọc lại hoàn toàn từ chỉ một tay bị cắt ra!'),
   q('Động vật nào có khả năng ngụy trang nhanh nhất?', 'Bạch tuộc và mực nang — đổi màu và kết cấu da trong dưới 1 giây', ['Tắc kè hoa','Bạch tuộc và mực nang — đổi màu và kết cấu da trong dưới 1 giây','Kỳ nhông','Cá bơn'], 'Mực nang có thể tạo "sóng màu" chạy khắp thân — dùng để giao tiếp, tán tỉnh và ngụy trang, tất cả cùng lúc!'),
   q('Tại sao một số loài côn trùng trông giống chiếc lá?', 'Ngụy trang bảo vệ — giống lá giúp tránh bị ăn thịt bởi chim và thằn lằn', ['Vì thích màu xanh','Ngụy trang bảo vệ — giống lá giúp tránh bị ăn thịt bởi chim và thằn lằn','Vì lá mát hơn','Để hút ánh sáng tốt hơn'], 'Bọ que (stick insects) và bọ lá (leaf insects) là ví dụ tiến hóa hoàn hảo — giống lá đến mức có cả "gân lá" và màu nâu giả "bị sâu ăn"!'),
   q('Kỹ thuật "chơi chết" (playing dead) có hiệu quả không?', 'Hiệu quả với nhiều kẻ săn mồi không ăn xác thối, nhưng không phải tất cả', ['Không hiệu quả','Hiệu quả với nhiều kẻ săn mồi không ăn xác thối, nhưng không phải tất cả','Hiệu quả 100%','Chỉ hiệu quả với người'], 'Opossum (chuột túi Virginia) tiết ra mùi hôi như xác thối khi "chết" — giả mạo hoàn hảo với các động vật ăn thịt tươi sống.')]),

t('animal-senses', 'Giác quan động vật — Nghe thấy những gì người không thể',
  ['Chó có thể ngửi mùi tốt hơn người 10,000-100,000 lần — phát hiện ung thư qua mùi hơi thở!',
   'Dơi dùng siêu âm (echolocation) — phát ra sóng âm và nghe âm vang để "nhìn" trong bóng tối.',
   'Cá mập cảm nhận điện trường yếu của tim con mồi từ xa hàng trăm mét.',
   'Bướm "nếm" bằng chân — khi đậu lên thức ăn, chân tiếp xúc để nhận biết vị.',
   'Rắn pit viper có thể phát hiện nhiệt độ chênh lệch 0.002°C — "nhìn" nhiệt hồng ngoại!'],
  'Con mèo nhà có thính giác nghe được âm tần số cao gấp 2 lần chó và 5 lần người!',
  [q('Dơi dùng giác quan đặc biệt nào để "nhìn" trong bóng tối?', 'Siêu âm (echolocation) — phát sóng âm và nghe âm vang phản lại', ['Thị giác ban đêm đặc biệt','Siêu âm (echolocation) — phát sóng âm và nghe âm vang phản lại','Từ trường Trái Đất','Hóa chất trong không khí'], 'Dơi phát ra sóng siêu âm 20-200 kHz (người chỉ nghe đến 20 kHz) — âm vang cho biết khoảng cách và kích thước vật cản chính xác đến mm.'),
   q('Cá mập phát hiện con mồi bằng cách nào?', 'Cảm nhận điện trường yếu do hoạt động cơ bắp và tim con mồi tạo ra', ['Ngửi mùi máu','Cảm nhận điện trường yếu do hoạt động cơ bắp và tim con mồi tạo ra','Nhìn màu sắc','Nghe tiếng động'], 'Hố Lorenzini ở mõm cá mập là cơ quan cảm biến điện — nhạy đến mức phát hiện điện trường yếu bằng 1 tỷ phần volt!'),
   q('Tại sao chó giỏi đánh hơi ma túy và thuốc nổ?', 'Mũi chó có 300 triệu tế bào khứu giác, so với 6 triệu ở người — nhạy hơn 10,000 lần', ['Chó được huấn luyện đặc biệt','Mũi chó có 300 triệu tế bào khứu giác, so với 6 triệu ở người — nhạy hơn 10,000 lần','Chó thông minh hơn người','Chó nghe được tiếng thuốc nổ'], 'Ngoài tế bào khứu giác nhiều hơn, phần não xử lý mùi của chó cũng lớn hơn người 40 lần tính theo tỷ lệ.'),
   q('Bướm "nếm" bằng bộ phận nào?', 'Bằng chân — gai cảm vị giác trên chân tiếp xúc thức ăn', ['Vòi hút','Râu','Bằng chân — gai cảm vị giác trên chân tiếp xúc thức ăn','Cánh'], 'Khi bướm đậu lên hoa hay trái cây, chân tiếp xúc trực tiếp cho biết ngay đây có ngọt/axit không trước khi hút vòi vào!'),
   q('Loài vật nào có thính giác nhạy nhất?', 'Dơi — có thể nghe siêu âm tần số 20,000-200,000 Hz (người chỉ đến 20,000 Hz)', ['Chó','Dơi — có thể nghe siêu âm tần số 20,000-200,000 Hz (người chỉ đến 20,000 Hz)','Cú','Mèo'], 'Dơi không chỉ "nghe" — chúng dùng siêu âm như radar sống. Tai dơi có cấu trúc phức tạp để lọc tiếng vang chính xác đến milimét!'),
   q('Rắn pit viper "nhìn thấy" mồi trong bóng tối bằng cách nào?', 'Cơ quan cảm nhiệt (pit organ) phát hiện nhiệt hồng ngoại từ cơ thể con mồi', ['Mắt đặc biệt','Cơ quan cảm nhiệt (pit organ) phát hiện nhiệt hồng ngoại từ cơ thể con mồi','Mũi rất nhạy','Cảm nhận rung động'], 'Pit organ nằm giữa mắt và lỗ mũi — nhạy đến mức phát hiện chênh lệch nhiệt độ 0.002°C, cho phép "nhìn nhiệt" trong bóng tối hoàn toàn.'),
   q('Con người có thể ngửi được bao nhiêu mùi khác nhau?', 'Hơn 1 nghìn tỷ mùi khác nhau — nhiều hơn số màu sắc ta nhìn thấy được', ['100 mùi','1,000 mùi','10,000 mùi','Hơn 1 nghìn tỷ mùi khác nhau — nhiều hơn số màu sắc ta nhìn thấy được'], 'Nghiên cứu 2014 của Rockefeller University cho thấy mũi người nhạy hơn ta nghĩ rất nhiều — nhưng vẫn kém chó 10,000-100,000 lần!')]),

t('symbiosis', 'Cộng sinh — Khi hai loài cần nhau',
  ['Cộng sinh là mối quan hệ giữa hai loài sinh vật khác nhau cùng sống với nhau.',
   'Cá hề và hải quỳ: cá hề sống trong xúc tu độc của hải quỳ; hải quỳ được cá bảo vệ và làm sạch.',
   'Cá mổ và cá lớn: cá nhỏ vào miệng cá lớn để nhặt thức ăn thừa và ký sinh trùng — cả hai đều có lợi.',
   'Vi khuẩn trong ruột người: 38 nghìn tỷ vi khuẩn sống trong ruột, giúp tiêu hóa và tạo vitamin.',
   'Tảo và nấm trong địa y: tảo quang hợp cung cấp thức ăn, nấm cung cấp nước và khoáng chất.'],
  'Không có vi khuẩn trong ruột, con người không thể tiêu hóa nhiều loại thức ăn — chúng ta cần chúng!',
  [q('Cá hề và hải quỳ có mối quan hệ cộng sinh như thế nào?', 'Cả hai cùng có lợi: cá hề được bảo vệ, hải quỳ được cá làm sạch và bảo vệ', ['Chỉ cá hề có lợi','Cả hai cùng có lợi: cá hề được bảo vệ, hải quỳ được cá làm sạch và bảo vệ','Chỉ hải quỳ có lợi','Cả hai đều thiệt hại'], 'Đây là cộng sinh hỗ lợi (mutualism) — cá hề miễn dịch với nọc độc hải quỳ nhờ màng nhầy đặc biệt.'),
   q('Vi khuẩn trong ruột người có vai trò gì?', 'Giúp tiêu hóa chất xơ, tổng hợp vitamin B và K, và bảo vệ khỏi vi khuẩn có hại', ['Gây bệnh','Giúp tiêu hóa chất xơ, tổng hợp vitamin B và K, và bảo vệ khỏi vi khuẩn có hại','Không có vai trò','Lưu trữ chất dinh dưỡng'], '38 nghìn tỷ vi khuẩn đường ruột nặng khoảng 1-2 kg — nhiều bằng số tế bào người! Chúng là "cơ quan ẩn" quan trọng.'),
   q('Địa y là gì?', 'Sinh vật gồm tảo + nấm sống cộng sinh — tảo quang hợp, nấm cung cấp nước', ['Loài rêu đặc biệt','Sinh vật gồm tảo + nấm sống cộng sinh — tảo quang hợp, nấm cung cấp nước','Loại san hô','Nấm đặc biệt'], 'Địa y là ví dụ tuyệt vời về cộng sinh — hai sinh vật hoàn toàn khác nhau tạo thành một "siêu sinh vật" duy nhất.'),
   q('Tại sao kháng sinh nhiều khi cần uống kèm men vi sinh?', 'Kháng sinh diệt cả vi khuẩn có lợi trong ruột, men vi sinh bổ sung lại', ['Để thuốc ngon hơn','Kháng sinh diệt cả vi khuẩn có lợi trong ruột, men vi sinh bổ sung lại','Để tăng tác dụng kháng sinh','Vì kháng sinh độc'], 'Kháng sinh không phân biệt vi khuẩn tốt/xấu — sau khi uống, cần bổ sung probiotic (men vi sinh) để khôi phục hệ vi sinh đường ruột.'),
   q('Tại sao cá hề không bị hải quỳ đốt?', 'Cá hề có lớp nhầy đặc biệt trên da giúp "lừa" hải quỳ không nhận ra là mồi', ['Vì cá hề miễn dịch với mọi chất độc','Cá hề có lớp nhầy đặc biệt trên da giúp "lừa" hải quỳ không nhận ra là mồi','Vì hải quỳ thích cá hề','Vì cá hề bơi rất nhanh'], 'Cá hề "lăn" vào xúc tu hải quỳ để thích nghi từ từ — mỗi lần tiếp xúc ít bị đốt hơn, và lớp nhầy tự điều chỉnh để ngụy trang ngày càng tốt hơn.'),
   q('Ký sinh trùng (parasitism) khác cộng sinh (mutualism) như thế nào?', 'Ký sinh: một bên có lợi, một bên bị hại. Cộng sinh: cả hai đều có lợi', ['Cả hai đều giống nhau','Ký sinh: một bên có lợi, một bên bị hại. Cộng sinh: cả hai đều có lợi','Ký sinh thì hai bên đều có lợi','Cộng sinh thì một bên bị hại'], 'Sán lá, ve, rận là ký sinh trùng — sống nhờ vật chủ mà làm hại vật chủ. Cá hề-hải quỳ, ong-hoa là cộng sinh — cả hai cùng hưởng lợi.'),
   q('Có bao nhiêu vi khuẩn sống trong cơ thể người?', 'Khoảng 38 nghìn tỷ — gần bằng số tế bào người', ['100','1 triệu','1 tỷ','Khoảng 38 nghìn tỷ — gần bằng số tế bào người'], 'Các vi khuẩn đường ruột nặng khoảng 1-2 kg và hoạt động như "cơ quan ẩn" — ảnh hưởng đến hệ miễn dịch, tâm trạng và tiêu hóa!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 6: VẬT LÝ VÀ HÓA HỌC THƯỜNG NGÀY
// ════════════════════════════════════════════════════════════════════════════

const PHYSICS_CHEMISTRY = [

t('light-color', 'Ánh sáng và Màu sắc — Tại sao cầu vồng có 7 màu?',
  ['Ánh sáng trắng thực ra gồm 7 màu: đỏ, cam, vàng, lục, lam, chàm, tím.',
   'Khi ánh sáng đi qua lăng kính hay giọt nước, mỗi màu bị bẻ cong khác nhau → tách ra.',
   'Vật có màu nào thì phản chiếu màu đó; hấp thụ các màu còn lại.',
   'Màu đỏ có bước sóng dài nhất; màu tím có bước sóng ngắn nhất.'],
  'Cầu vồng hình thành khi ánh sáng mặt trời đi qua hàng triệu giọt nước sau mưa — mỗi giọt như một lăng kính nhỏ!',
  [q('Tại sao lá cây màu xanh?', 'Diệp lục hấp thụ ánh đỏ và lam, phản chiếu ánh xanh lá', ['Vì lá chứa nước màu xanh','Diệp lục hấp thụ ánh đỏ và lam, phản chiếu ánh xanh lá','Vì trời xanh','Vì đất màu nâu bón'], 'Màu sắc ta thấy là màu BỊ PHẢN CHIẾU lại, không phải màu bị hấp thụ.'),
   q('Cầu vồng xuất hiện khi nào?', 'Khi ánh mặt trời chiếu vào giọt nước mưa sau cơn mưa', ['Khi trời nhiều mây','Khi ánh mặt trời chiếu vào giọt nước mưa sau cơn mưa','Khi trời nắng gắt','Khi có sấm sét'], 'Để thấy cầu vồng, cần mặt trời ở phía sau lưng bạn và mưa (hoặc sương) ở phía trước.'),
   q('Màu nào có bước sóng dài nhất?', 'Đỏ', ['Tím','Vàng','Đỏ'], 'Màu đỏ (700 nm) có bước sóng dài nhất trong quang phổ nhìn thấy được.'),
   q('Tại sao bầu trời màu xanh?', 'Phân tử không khí tán xạ ánh xanh nhiều hơn màu đỏ', ['Vì biển phản chiếu lên','Phân tử không khí tán xạ ánh xanh nhiều hơn màu đỏ','Vì mây màu xanh','Vì ánh mặt trời màu xanh'], 'Hiện tượng Rayleigh: phân tử N₂ và O₂ tán xạ ánh sáng bước sóng ngắn (xanh) nhiều hơn bước sóng dài (đỏ) → bầu trời xanh.'),
   q('Vật nào hấp thụ nhiệt nhất?', 'Vật màu đen', ['Vật màu trắng','Vật màu vàng','Vật màu đen'], 'Màu đen hấp thụ tất cả các bước sóng ánh sáng (và nhiệt) — vì vậy mặc đen nóng hơn mặc trắng khi nắng.'),
   q('Ánh sáng có thể đi qua vật nào?', 'Vật trong suốt (kính, nước) — ánh sáng xuyên qua hoàn toàn', ['Tất cả mọi vật','Vật trong suốt (kính, nước) — ánh sáng xuyên qua hoàn toàn','Chỉ không khí','Chỉ kim loại'], 'Vật liệu chia 3 loại: trong suốt (xuyên ánh sáng), trong mờ (một phần), đục (không cho ánh sáng qua). Vì sao kính hiệu thuốc trong suốt mà tường nhà thì không?'),
   q('Tại sao gương phản chiếu ánh sáng?', 'Bề mặt nhẵn bóng của gương phản chiếu ánh sáng theo góc xác định', ['Vì gương chứa ánh sáng','Bề mặt nhẵn bóng của gương phản chiếu ánh sáng theo góc xác định','Vì gương có màu trắng','Vì gương hút ánh sáng và tái tạo'], 'Gương có lớp bạc hoặc nhôm phía sau kính — bề mặt siêu nhẵn phản chiếu ánh sáng theo định luật: góc tới = góc phản xạ.')]),

t('sound-waves', 'Âm thanh — Sóng mà tai bắt được',
  ['Âm thanh là sóng dao động của không khí (hoặc chất lỏng, chất rắn).',
   'Âm thanh không truyền được trong chân không — ngoài vũ trụ không có tiếng động!',
   'Tần số cao → âm thanh cao (bổng). Tần số thấp → âm thanh trầm.',
   'Âm thanh truyền trong nước nhanh gấp 4 lần trong không khí (1 480 m/s vs 340 m/s).'],
  'Sấm sét và tia chớp xảy ra cùng lúc — nhưng ta thấy chớp trước, nghe sấm sau vì ánh sáng (300 000 km/s) nhanh hơn âm thanh (0.34 km/s)!',
  [q('Âm thanh có thể truyền qua đâu?', 'Chất khí, chất lỏng và chất rắn — nhưng không qua chân không', ['Chỉ qua không khí','Chỉ qua nước','Chất khí, chất lỏng và chất rắn — nhưng không qua chân không'], 'Âm thanh cần môi trường vật chất để truyền — trong chân không (vũ trụ) không có âm thanh!'),
   q('Tại sao ta thấy chớp trước khi nghe sấm?', 'Ánh sáng nhanh hơn âm thanh rất nhiều', ['Sấm xảy ra sau chớp','Ánh sáng nhanh hơn âm thanh rất nhiều','Tai chúng ta chậm hơn mắt','Sấm đi vòng quanh'], 'Ánh sáng: 300 000 km/s. Âm thanh: 0.34 km/s. Cứ 3 giây giữa chớp và sấm → sét cách bạn khoảng 1 km!'),
   q('Âm thanh truyền nhanh hơn trong môi trường nào?', 'Trong chất rắn (kim loại) nhanh nhất', ['Trong không khí','Trong nước','Trong chất rắn (kim loại) nhanh nhất'], 'Thép: 5 100 m/s. Nước: 1 480 m/s. Không khí: 340 m/s. Vì vậy đặt tai vào đường ray tàu hỏa nghe tiếng tàu sớm hơn!'),
   q('Con vật nào dùng sóng âm để định vị (echolocation)?', 'Dơi và cá voi', ['Chó','Dơi và cá voi','Mèo'], 'Dơi phát ra sóng siêu âm (20 000 Hz+), nghe tiếng vang phản hồi để xác định vị trí con mồi ngay cả trong bóng tối hoàn toàn.'),
   q('Tại sao trong phòng trống không có đồ đạc thì tiếng vang nhiều hơn?', 'Không có vật liệu hấp thụ âm thanh — sóng âm phản chiếu nhiều lần', ['Vì phòng lớn hơn','Không có vật liệu hấp thụ âm thanh — sóng âm phản chiếu nhiều lần','Vì sàn nhà cứng','Vì không khí rỗng'], 'Đồ đạc, thảm, rèm hấp thụ sóng âm. Phòng thu âm được bọc vật liệu xốp mềm để triệt tiêu tiếng vang.'),
   q('Tốc độ âm thanh thay đổi theo nhiệt độ như thế nào?', 'Nhiệt độ cao → âm thanh truyền nhanh hơn (không khí nóng phân tử dao động nhanh hơn)', ['Không thay đổi','Nhiệt độ cao → âm thanh truyền nhanh hơn (không khí nóng phân tử dao động nhanh hơn)','Nhiệt độ cao → chậm hơn','Tốc độ phụ thuộc gió, không phải nhiệt độ'], 'Ở 0°C, âm thanh đi 331 m/s. Ở 30°C, đi 349 m/s. Lý do: nhiệt độ cao → phân tử không khí chuyển động nhanh hơn → truyền dao động nhanh hơn.'),
   q('Siêu âm y tế (ultrasound) dùng trong bệnh viện hoạt động như thế nào?', 'Phát sóng âm tần số cao vào cơ thể, nghe âm vang phản lại để tạo hình ảnh nội tạng', ['Dùng tia X để chụp','Phát sóng âm tần số cao vào cơ thể, nghe âm vang phản lại để tạo hình ảnh nội tạng','Dùng nam châm','Dùng ánh sáng hồng ngoại'], 'Siêu âm dùng tần số 1-20 MHz — cao hơn ngưỡng nghe 1000 lần. An toàn hơn tia X vì không bức xạ ion hóa — thường dùng để xem thai nhi!')]),

t('magnetism', 'Nam châm — Lực vô hình kỳ diệu',
  ['Nam châm có 2 cực: Bắc (N) và Nam (S). Hai cực khác nhau hút nhau; cùng cực đẩy nhau.',
   'Trái Đất là một nam châm khổng lồ — đó là lý do la bàn hoạt động được.',
   'Trường từ bảo vệ Trái Đất khỏi gió mặt trời (solar wind) — không có nó, sự sống sẽ khó tồn tại.',
   'Máy MRI bệnh viện dùng nam châm siêu mạnh để chụp ảnh nội tạng mà không cần phẫu thuật.'],
  'Chim bồ câu và cá hồi có "la bàn sinh học" trong não — có thể cảm nhận từ trường Trái Đất để tìm đường!',
  [q('Hai cực nam châm nào thì hút nhau?', 'Cực Bắc và Cực Nam (khác cực hút nhau)', ['Cực Bắc và Cực Bắc','Cực Nam và Cực Nam','Cực Bắc và Cực Nam (khác cực hút nhau)'], 'Quy tắc từ trường: khác cực hút, cùng cực đẩy — giống như trong điện học (+ với −).'),
   q('Tại sao la bàn luôn chỉ hướng Bắc?', 'Kim la bàn là nam châm, bị từ trường Trái Đất hút về cực Bắc từ', ['Vì Bắc là hướng Mặt Trời mọc','Kim la bàn là nam châm, bị từ trường Trái Đất hút về cực Bắc từ','Vì quy ước quốc tế','Vì Bắc là hướng cao nhất'], 'Trái Đất có nhân sắt-niken tạo ra từ trường. Cực Bắc từ gần cực Bắc địa lý — đủ để la bàn chỉ hướng đúng.'),
   q('Cực quang (Aurora) hình thành như thế nào?', 'Gió mặt trời tương tác với từ trường Trái Đất, kích thích phân tử không khí phát sáng', ['Ánh sáng mặt trời phản chiếu từ băng tuyết','Gió mặt trời tương tác với từ trường Trái Đất, kích thích phân tử không khí phát sáng','Tia chớp trong khí quyển cực','Ánh sáng phản chiếu từ cực băng'], 'Cực quang (borealis ở Bắc, australis ở Nam) là màn trình diễn ánh sáng kỳ diệu nhất thiên nhiên, thường thấy gần các cực Trái Đất.'),
   q('Từ trường Trái Đất bảo vệ sự sống như thế nào?', 'Làm lệch hướng gió mặt trời — tránh cho khí quyển và nước bị thổi bay vào vũ trụ', ['Giữ nhiệt độ ổn định','Làm lệch hướng gió mặt trời — tránh cho khí quyển và nước bị thổi bay vào vũ trụ','Tạo ra oxy','Ngăn thiên thạch'], 'Sao Hỏa mất từ trường → gió mặt trời thổi bay khí quyển và nước → hành tinh chết. Trái Đất có từ trường → sự sống được bảo vệ!'),
   q('Nam châm có thể được tạo ra bằng điện không?', 'Có — điện từ (electromagnet): cuộn dây dẫn điện tạo ra từ trường', ['Không, nam châm tự nhiên mới có','Có — điện từ (electromagnet): cuộn dây dẫn điện tạo ra từ trường','Chỉ khi kết hợp với ánh sáng','Chỉ ở nhiệt độ rất thấp'], 'Điện từ quan trọng hơn ta nghĩ: loa, máy phát điện, động cơ điện, đầu đọc ổ cứng — tất cả đều dùng điện từ!'),
   q('Tại sao la bàn không hoạt động chính xác gần đường điện cao thế?', 'Dòng điện tạo ra từ trường riêng, làm lệch kim la bàn khỏi cực Bắc từ', ['Vì la bàn bị điện giật','Dòng điện tạo ra từ trường riêng, làm lệch kim la bàn khỏi cực Bắc từ','Vì nhiệt độ cao','Vì đường điện tạo ra sóng radio'], 'Oersted (1820) tình cờ phát hiện dây điện làm kim la bàn lệch — khám phá liên hệ giữa điện và từ, mở đầu kỷ nguyên điện từ học!'),
   q('Tàu đệm từ (maglev) hoạt động như thế nào?', 'Nam châm siêu dẫn tạo lực đẩy nâng tàu lên khỏi đường ray — không ma sát, tốc độ rất cao', ['Dùng bánh xe đặc biệt','Nam châm siêu dẫn tạo lực đẩy nâng tàu lên khỏi đường ray — không ma sát, tốc độ rất cao','Dùng hơi nước nâng lên','Dùng quạt thổi'], 'Tàu Maglev Nhật Bản đạt 603 km/h — kỷ lục thế giới! Không tiếp xúc đường ray → không ma sát → êm và nhanh hơn tàu thường nhiều lần.')]),

t('electricity-static', 'Điện và Tĩnh điện — Bí ẩn của tia sét',
  ['Tĩnh điện hình thành khi electron di chuyển từ vật này sang vật khác khi cọ xát.',
   'Sét là tia tĩnh điện khổng lồ — phóng điện giữa đám mây và mặt đất hoặc giữa hai đám mây.',
   'Điện trong nhà là dòng electron chuyển động có định hướng qua dây dẫn.',
   'Ben Franklin (1752) thả diều trong bão để chứng minh sét là điện — rất nguy hiểm!'],
  'Mỗi giây trên Trái Đất có khoảng 100 tia sét đánh xuống! Sét có thể nóng tới 30 000°C — gấp 5 lần bề mặt Mặt Trời!',
  [q('Tại sao tóc dựng lên khi chải bằng lược nhựa?', 'Cọ xát tạo tĩnh điện — các sợi tóc cùng dấu điện đẩy nhau', ['Vì lược hút tóc','Cọ xát tạo tĩnh điện — các sợi tóc cùng dấu điện đẩy nhau','Vì lược từ tính','Vì tóc khô'], 'Khi chải, electron từ tóc chuyển sang lược → tóc mang điện tích dương, cùng dấu nên đẩy nhau.'),
   q('Cột thu lôi bảo vệ công trình như thế nào?', 'Dẫn điện sét an toàn xuống đất, bảo vệ công trình', ['Ngăn không cho sét hình thành','Dẫn điện sét an toàn xuống đất, bảo vệ công trình','Phản chiếu sét đi nơi khác','Hấp thụ điện sét vào cột'], 'Cột thu lôi (Benjamin Franklin phát minh) là cột kim loại nhọn nối dây đất — sét ưu tiên đi qua đường dẫn điện tốt nhất.'),
   q('Vật nào dẫn điện tốt nhất?', 'Bạc, đồng, vàng (kim loại)', ['Nhựa','Cao su','Bạc, đồng, vàng (kim loại)'], 'Kim loại có nhiều electron tự do dễ di chuyển → dẫn điện tốt. Đồng phổ biến vì rẻ hơn bạc/vàng nhưng vẫn dẫn điện rất tốt.'),
   q('Tại sao không nên sờ vào ổ điện tay ướt?', 'Nước là chất dẫn điện — tay ướt tăng nguy cơ bị điện giật nghiêm trọng', ['Vì ổ điện sẽ hỏng','Nước là chất dẫn điện — tay ướt tăng nguy cơ bị điện giật nghiêm trọng','Vì tay ướt trơn trượt','Vì ổ điện sẽ gỉ'], 'Nước tinh khiết không dẫn điện nhưng nước trong cơ thể chứa muối khoáng → dẫn điện rất tốt. Điện 220V có thể gây tử vong!'),
   q('Sét thường đánh vào vật nào cao nhất gần đó?', 'Vật cao nhất và nhọn nhất — cây cao, cột điện, tòa nhà cao', ['Vật thấp nhất','Vật cao nhất và nhọn nhất — cây cao, cột điện, tòa nhà cao','Vật màu tối','Vật nặng nhất'], 'Sét chọn đường đi ngắn nhất từ đám mây xuống đất — vật cao nhọn tạo "đường dẫn" ngắn nhất. Không trú dưới cây cao khi có sấm sét!'),
   q('Điện trong nhà (AC) khác điện pin (DC) như thế nào?', 'AC: dòng điện đảo chiều liên tục (50Hz). DC: dòng điện một chiều (pin, acquy)', ['Chúng hoàn toàn giống nhau','AC: dòng điện đảo chiều liên tục (50Hz). DC: dòng điện một chiều (pin, acquy)','DC mạnh hơn AC','AC chỉ dùng cho đèn'], 'Tesla (AC) và Edison (DC) từng tranh luận dữ dội về loại điện nào tốt hơn. AC thắng vì truyền tải xa hiệu quả hơn!'),
   q('Vì sao không nên dùng điện thoại khi đang sạc trong bồn tắm?', 'Nước dẫn điện — nếu sạc đoản mạch hoặc rơi vào nước, dòng điện chạy qua cơ thể người', ['Điện thoại bị hỏng','Nước dẫn điện — nếu sạc đoản mạch hoặc rơi vào nước, dòng điện chạy qua cơ thể người','Sóng điện thoại ảnh hưởng nước','Điện thoại hỏng nhanh hơn'], 'Tai nạn điện giật trong bồn tắm xảy ra khi điện thoại đang sạc rơi vào nước — dòng điện đi qua nước vào cơ thể có thể gây tử vong!')]),

t('gravity-forces', 'Trọng lực và Lực — Tại sao mọi thứ đều rơi?',
  ['Trọng lực (gravity) là lực hút giữa hai vật có khối lượng — Trái Đất hút mọi vật về phía nó.',
   'Newton phát hiện trọng lực khi thấy quả táo rơi (khoảng 1666).',
   'Mặt Trăng quay quanh Trái Đất do trọng lực — không có nó Mặt Trăng sẽ bay thẳng ra ngoài vũ trụ.',
   'Trên Mặt Trăng, trọng lực chỉ bằng 1/6 Trái Đất — con người có thể nhảy cao gấp 6 lần!'],
  'Nếu không có không khí, lông chim và viên đạn rơi cùng tốc độ! (Galileo chứng minh tại Tháp nghiêng Pisa)',
  [q('Tại sao mọi vật đều rơi xuống?', 'Vì Trái Đất có trọng lực hút mọi vật về phía nó', ['Vì không khí đẩy xuống','Vì Trái Đất có trọng lực hút mọi vật về phía nó','Vì vật nặng hơn không khí','Vì gió thổi'], 'Trọng lực tỷ lệ với khối lượng — Trái Đất khổng lồ nên hút tất cả mọi thứ xung quanh nó.'),
   q('Trên Mặt Trăng, con người nặng hơn hay nhẹ hơn?', 'Nhẹ hơn — chỉ bằng 1/6 khối lượng trên Trái Đất', ['Nặng hơn vì gần không khí hơn','Nhẹ hơn — chỉ bằng 1/6 khối lượng trên Trái Đất','Bằng nhau','Không có khối lượng'], 'Khối lượng không đổi, nhưng trọng lượng (lực hút) thay đổi. Trên Mặt Trăng, người 60 kg chỉ "nặng" 10 kg!'),
   q('Tại sao phi hành gia nổi lơ lửng trên trạm vũ trụ?', 'Họ đang rơi tự do quanh Trái Đất — gọi là trạng thái không trọng lực', ['Vì không có không khí','Họ đang rơi tự do quanh Trái Đất — gọi là trạng thái không trọng lực','Vì xa Mặt Trời','Vì trạm có máy triệt trọng lực'], 'Trạm vũ trụ quay quanh Trái Đất ở tốc độ 28 000 km/h — cả trạm và người đều "rơi" cùng tốc độ nên cảm giác không trọng lực!'),
   q('Ai phát hiện ra lực hút trái đất?', 'Isaac Newton (khoảng 1666)', ['Albert Einstein','Galileo Galilei','Isaac Newton (khoảng 1666)'], 'Newton quan sát quả táo rơi và đặt câu hỏi: nếu Trái Đất kéo quả táo, có phải nó cũng kéo Mặt Trăng? → Phát hiện ra vạn vật hấp dẫn.'),
   q('Tại sao Mặt Trăng không rơi xuống Trái Đất?', 'Mặt Trăng chuyển động ngang đủ nhanh — trọng lực kéo nhưng Mặt Trăng cứ "rơi qua" Trái Đất mãi', ['Vì Mặt Trăng quá nhẹ','Vì không có không khí','Mặt Trăng chuyển động ngang đủ nhanh — trọng lực kéo nhưng Mặt Trăng cứ "rơi qua" Trái Đất mãi','Vì Mặt Trăng đẩy lại'], 'Quỹ đạo là trạng thái rơi liên tục nhưng "trượt qua" vì tốc độ ngang quá lớn — như ném bóng đủ mạnh quanh Trái Đất!'),
   q('Vật nặng và vật nhẹ rơi cùng tốc độ hay khác tốc độ?', 'Cùng tốc độ nếu không có không khí — Galileo chứng minh điều này', ['Vật nặng rơi nhanh hơn','Vật nhẹ rơi nhanh hơn','Cùng tốc độ nếu không có không khí — Galileo chứng minh điều này','Phụ thuộc vào hình dạng'], 'Galileo thả vật từ Tháp nghiêng Pisa và chứng minh Aristotle sai: trọng lực gia tốc mọi vật như nhau. Không khí mới làm lông chim rơi chậm hơn viên đá!'),
   q('Lực nào giữ cho Trái Đất quay quanh Mặt Trời?', 'Trọng lực của Mặt Trời hút Trái Đất, kết hợp tốc độ quỹ đạo → quỹ đạo ổn định', ['Từ trường','Lực đẩy từ vũ trụ','Trọng lực của Mặt Trời hút Trái Đất, kết hợp tốc độ quỹ đạo → quỹ đạo ổn định','Gió mặt trời'], 'Trái Đất quay với tốc độ 107 000 km/h quanh Mặt Trời — đủ để không bị kéo vào Mặt Trời, cũng không đủ để bay ra ngoài!')]),

t('states-of-matter', 'Ba trạng thái của vật chất — Rắn, Lỏng, Khí',
  ['Vật chất tồn tại ở 3 trạng thái chính: rắn (phân tử xếp chặt), lỏng (lỏng lẻo hơn), khí (phân tử chuyển động tự do).',
   'Nhiệt độ quyết định trạng thái: đun nóng → rắn→lỏng→khí; làm lạnh → ngược lại.',
   'Nước là ví dụ kỳ diệu: tồn tại cả 3 dạng trong tự nhiên — băng, nước, hơi nước.',
   'Plasma (plasma) là "trạng thái thứ 4" — khí bị ion hóa cực nóng, tồn tại trong mặt trời và sét.'],
  'Không khí xung quanh ta gồm 78% Nitrogen (N₂) và 21% Oxygen (O₂) — những phân tử vô hình đang nảy xung quanh ta hàng tỉ lần mỗi giây!',
  [q('Khi đun nóng nước, nó chuyển sang trạng thái gì?', 'Khí (hơi nước)', ['Rắn','Plasma','Khí (hơi nước)'], 'Nước sôi ở 100°C (ở mực nước biển) → chuyển thành hơi nước. Trên núi cao, nước sôi dưới 100°C vì áp suất thấp hơn!'),
   q('Băng nổi trên nước vì lý do gì?', 'Phân tử nước ở dạng đặc (băng) xếp thành cấu trúc mạng hở, nhẹ hơn nước lỏng', ['Vì băng nhẹ hơn','Phân tử nước ở dạng đặc (băng) xếp thành cấu trúc mạng hở, nhẹ hơn nước lỏng','Vì nhiệt nổi lên','Vì áp suất nước'], 'Nước là chất hiếm khi đông đặc lại NỔI — hầu hết chất khác đông cứng thì chìm. Điều này rất quan trọng: băng nổi bảo vệ sinh vật dưới nước mùa đông!'),
   q('Trạng thái nào của vật chất có hình dạng và thể tích cố định?', 'Chất rắn', ['Chất lỏng','Chất khí','Chất rắn'], 'Chất rắn: phân tử liên kết chặt → hình dạng cố định. Chất lỏng: hình dạng theo vật chứa. Chất khí: lấp đầy toàn bộ không gian.'),
   q('Tại sao nước bốc hơi ngay cả khi chưa sôi?', 'Các phân tử nước có đủ năng lượng để thoát ra khỏi bề mặt bất kỳ lúc nào', ['Chỉ sôi mới bốc hơi','Vì nhiệt độ môi trường cao hơn 100°C','Các phân tử nước có đủ năng lượng để thoát ra khỏi bề mặt bất kỳ lúc nào','Vì áp suất'], 'Bay hơi (evaporation) khác sôi (boiling): bay hơi xảy ra ở mọi nhiệt độ khi phân tử đủ nhanh để thoát bề mặt. Đó là lý do quần áo phơi khô!'),
   q('Plasma là gì và tìm thấy ở đâu?', 'Trạng thái vật chất thứ 4: khí bị ion hóa cực nóng — có trong mặt trời, sét, đèn neon', ['Chất lỏng đặc biệt','Trạng thái vật chất thứ 4: khí bị ion hóa cực nóng — có trong mặt trời, sét, đèn neon','Chất rắn ở nhiệt độ cao','Khí nén'], 'Plasma chiếm hơn 99% vật chất nhìn thấy trong vũ trụ — mặt trời và hầu hết các ngôi sao đều là plasma!'),
   q('Tại sao đá đặc hơn nước lỏng nhưng băng lại nổi?', 'Phân tử nước ở dạng rắn xếp thành mạng lục giác mở rộng hơn nước lỏng → mật độ thấp hơn', ['Vì băng nhẹ hơn đá','Phân tử nước ở dạng rắn xếp thành mạng lục giác mở rộng hơn nước lỏng → mật độ thấp hơn','Vì băng chứa không khí bên trong','Vì nhiệt độ lạnh làm nhẹ hơn'], 'Nước là vật chất CỰC HIẾM: đông đặc lại nổi. Điều này cứu sinh vật mùa đông — hồ đóng băng từ trên xuống, sinh vật sống được dưới lớp băng!'),
   q('Vì sao đun nước sôi trên núi cao cần ít nhiệt hơn?', 'Áp suất khí quyển thấp hơn trên núi — điểm sôi của nước giảm', ['Vì núi lạnh hơn nên nước nguội hơn','Vì nước trên núi nhẹ hơn','Áp suất khí quyển thấp hơn trên núi — điểm sôi của nước giảm','Vì gió thổi làm bốc hơi'], 'Everest (8849 m): nước sôi ở khoảng 70°C — mì gói không chín được vì không đủ nhiệt! Nồi áp suất ngược lại: tăng áp để nấu nhanh hơn.')]),

t('human-brain', 'Não người — Siêu máy tính sinh học',
  ['Não người nặng ~1.4 kg nhưng chứa ~86 tỷ tế bào thần kinh (neuron).',
   'Mỗi neuron có thể kết nối với 10 000 neuron khác → số kết nối = hơn số ngôi sao trong dải Ngân Hà!',
   'Não tiêu thụ ~20% năng lượng của cơ thể dù chỉ chiếm 2% khối lượng.',
   'Trong khi ngủ, não vẫn hoạt động: củng cố ký ức, loại bỏ chất thải, tái tạo tế bào.'],
  'Cảm giác "ngứa" trong đầu khi nghe một giai điệu quen = neuron âm nhạc kích hoạt lại ký ức — não thật sự "replay" âm nhạc!',
  [q('Não người có bao nhiêu tế bào thần kinh?', 'Khoảng 86 tỷ neuron', ['Khoảng 1 triệu','Khoảng 86 tỷ neuron','Khoảng 1 nghìn tỷ','Khoảng 1 tỷ'], 'Con số này ấn tượng nhưng số KẾT NỐI (synapse) giữa chúng mới thực sự choáng ngợp: ước tính 100 nghìn tỷ kết nối!'),
   q('Tại sao ngủ đủ giấc quan trọng cho việc học?', 'Khi ngủ, não củng cố ký ức và chuyển thông tin từ ký ức ngắn hạn sang dài hạn', ['Vì não không hoạt động khi ngủ nên cần nghỉ','Khi ngủ, não củng cố ký ức và chuyển thông tin từ ký ức ngắn hạn sang dài hạn','Vì mắt nghỉ ngơi','Vì cơ thể cần năng lượng'], 'Hippocampus (hải mã) trong não "phát lại" các sự kiện trong ngày lúc ngủ sâu, giúp chuyển thông tin vào ký ức dài hạn.'),
   q('Não phải và não trái kiểm soát điều gì?', 'Não trái: ngôn ngữ, logic. Não phải: sáng tạo, âm nhạc, không gian', ['Não trái: cảm xúc, não phải: lý trí','Não trái: ngôn ngữ, logic. Não phải: sáng tạo, âm nhạc, không gian','Hai bán cầu giống hệt nhau','Não phải kiểm soát hết'], 'Não là cơ quan chéo: bán cầu trái điều khiển nửa phải cơ thể và ngược lại. 90% người thuận tay phải có trung tâm ngôn ngữ ở não TRÁI.'),
   q('Não tiêu thụ bao nhiêu phần trăm năng lượng cơ thể?', 'Khoảng 20% dù chỉ chiếm 2% khối lượng', ['Khoảng 5%','Khoảng 50%','Khoảng 20% dù chỉ chiếm 2% khối lượng'], 'Não cần nhiều oxy và glucose liên tục — mất máu não 4 phút là có thể gây tổn thương không phục hồi được!'),
   q('Serotonin và dopamine là gì?', 'Chất dẫn truyền thần kinh (neurotransmitter) kiểm soát tâm trạng, cảm xúc và động lực', ['Loại protein trong máu','Chất dẫn truyền thần kinh (neurotransmitter) kiểm soát tâm trạng, cảm xúc và động lực','Hormone tuyến tụy','Enzym tiêu hóa'], 'Dopamine tạo cảm giác vui khi đạt thành tích, ăn ngon, nghe nhạc thích. Serotonin liên quan đến cảm giác bình yên, hài lòng — thiếu serotonin gây trầm cảm!'),
   q('Tại sao não người lớn hơn não các loài khác?', 'Vỏ não trước trán (prefrontal cortex) phát triển lớn — trung tâm tư duy, lập kế hoạch, kiểm soát cảm xúc', ['Vì đầu người lớn hơn','Vỏ não trước trán (prefrontal cortex) phát triển lớn — trung tâm tư duy, lập kế hoạch, kiểm soát cảm xúc','Vì người ăn nhiều hơn','Vì người sống lâu hơn'], 'Vỏ não trước trán (PFC) của người lớn gấp đôi so với tỷ lệ não tinh tinh — đây là nền tảng ngôn ngữ, đạo đức, sáng tạo, lập kế hoạch dài hạn.'),
   q('Tại sao não luyện tập nhiều thì "giỏi hơn"?', 'Neuroplasticity: não tạo thêm kết nối mới khi luyện tập, đường truyền thần kinh trở nên nhanh hơn', ['Vì não to ra','Neuroplasticity: não tạo thêm kết nối mới khi luyện tập, đường truyền thần kinh trở nên nhanh hơn','Vì tế bào não nhiều hơn','Vì não nhẹ hơn'], 'Tính dẻo thần kinh (neuroplasticity) nghĩa là não thay đổi theo kinh nghiệm — học đàn violin → vùng não điều khiển ngón tay trái phát triển lớn hơn!')]),

t('microbes-germs', 'Vi khuẩn và Virus — Thế giới vô hình xung quanh ta',
  ['Vi khuẩn: sinh vật đơn bào không có nhân, sống khắp nơi — đất, nước, cơ thể người.',
   'Virus: không phải tế bào — chỉ là vỏ protein chứa DNA/RNA, cần tế bào chủ để sinh sản.',
   'Không phải vi khuẩn đều có hại — 90% vi khuẩn trong cơ thể ta là có lợi hoặc vô hại.',
   'Kháng sinh giết vi khuẩn nhưng KHÔNG giết virus — cảm cúm do virus nên không dùng kháng sinh!'],
  '1 ml nước biển chứa tới 1 triệu vi khuẩn! Và trên bàn tay chưa rửa có thể có hàng triệu vi khuẩn các loại.',
  [q('Tại sao kháng sinh không trị được cúm?', 'Cúm do virus gây ra; kháng sinh chỉ tác dụng với vi khuẩn', ['Vì virus mạnh hơn vi khuẩn','Cúm do virus gây ra; kháng sinh chỉ tác dụng với vi khuẩn','Vì cần liều cao hơn','Vì virus ẩn trong nhân tế bào'], 'Dùng kháng sinh sai sẽ: (1) không có tác dụng, (2) tạo vi khuẩn kháng kháng sinh — một trong những vấn đề y tế nghiêm trọng nhất hiện nay.'),
   q('Vi khuẩn và virus khác nhau thế nào?', 'Vi khuẩn là tế bào sống; virus không phải tế bào, chỉ là vật liệu di truyền bọc protein', ['Đều là tế bào nhưng kích thước khác','Vi khuẩn là tế bào sống; virus không phải tế bào, chỉ là vật liệu di truyền bọc protein','Virus lớn hơn vi khuẩn','Chỉ khác ở màu sắc'], 'Virus nhỏ hơn vi khuẩn 100 lần. Đại dịch COVID-19 do virus SARS-CoV-2 — một hạt nhỏ 0.1 micromet, nhỏ hơn 1/1000 đường kính sợi tóc!'),
   q('Cơ chế nào giúp cơ thể nhận ra và chống lại mầm bệnh?', 'Hệ miễn dịch: bạch cầu, kháng thể nhận diện và tiêu diệt mầm bệnh', ['Tim phổi lọc máu','Gan giải độc','Hệ miễn dịch: bạch cầu, kháng thể nhận diện và tiêu diệt mầm bệnh'], 'Vaccine "dạy" hệ miễn dịch nhận diện mầm bệnh trước — khi gặp thật, cơ thể đã sẵn sàng phản ứng nhanh!'),
   q('Penicillin (kháng sinh đầu tiên) được phát hiện như thế nào?', 'Alexander Fleming tình cờ thấy nấm mốc giết vi khuẩn trong đĩa cấy (1928)', ['Tổng hợp hóa học từ đầu','Alexander Fleming tình cờ thấy nấm mốc giết vi khuẩn trong đĩa cấy (1928)','Chiết xuất từ cây thuốc','Thí nghiệm có kế hoạch'], 'Khám phá tình cờ vĩ đại nhất lịch sử y học: Fleming quên đĩa cấy đi nghỉ, về thấy nấm mốc Penicillium đã giết sạch vi khuẩn xung quanh nó!'),
   q('Tại sao rửa tay xà phòng hiệu quả hơn chỉ rửa nước?', 'Xà phòng phá vỡ màng lipid của virus và vi khuẩn; nước chỉ rửa trôi cơ học', ['Vì xà phòng thơm hơn','Xà phòng phá vỡ màng lipid của virus và vi khuẩn; nước chỉ rửa trôi cơ học','Vì xà phòng nóng hơn','Vì vi khuẩn sợ bọt'], 'Coronavirus có vỏ lipid (chất béo) — xà phòng hòa tan lớp vỏ đó, phá hủy virus hoàn toàn. Đây là lý do rửa tay 20 giây bằng xà phòng rất hiệu quả!'),
   q('Vi khuẩn có thể sống ở những điều kiện khắc nghiệt nào?', 'Trong suối nước nóng 100°C, băng Nam Cực, độ sâu đại dương, trong lòng đất sâu', ['Chỉ trong điều kiện ấm áp bình thường','Trong suối nước nóng 100°C, băng Nam Cực, độ sâu đại dương, trong lòng đất sâu','Chỉ trên bề mặt','Chỉ trong cơ thể sinh vật'], '"Extremophile" (sinh vật ưa cực đoan) có thể sống ở điều kiện con người không thể. Điều này gợi ý sự sống có thể tồn tại trên các hành tinh khác!'),
   q('Vaccine hoạt động như thế nào?', 'Đưa mầm bệnh đã chết/yếu hoặc mảnh protein vào cơ thể để hệ miễn dịch học cách nhận diện', ['Giết trực tiếp vi khuẩn','Đưa mầm bệnh đã chết/yếu hoặc mảnh protein vào cơ thể để hệ miễn dịch học cách nhận diện','Bổ sung kháng thể từ ngoài','Tăng nhiệt độ cơ thể để diệt mầm bệnh'], 'Hệ miễn dịch "ghi nhớ" — sau khi gặp mầm bệnh lần đầu (vaccine), lần sau gặp thật, cơ thể phản ứng nhanh gấp nhiều lần và tiêu diệt trước khi phát bệnh!')]),

t('genetics-dna', 'DNA và Di truyền — Bản thiết kế của sự sống',
  ['DNA (Axit deoxyribonucleic) là phân tử mang toàn bộ thông tin di truyền của sinh vật.',
   'DNA có dạng xoắn kép — như cái thang xoắn. Mỗi "bậc thang" là một cặp nucleotide.',
   'Nếu kéo thẳng DNA trong 1 tế bào người ra → dài khoảng 2 mét! Toàn bộ cơ thể: 150 tỷ km!',
   'Gen là đoạn DNA mã hóa để tạo ra protein — protein xây dựng và điều khiển mọi thứ trong cơ thể.'],
  'Con người và tinh tinh có DNA giống nhau tới 98.7%! Con người và chuối có DNA giống 60%!',
  [q('DNA có hình dạng gì?', 'Xoắn kép (double helix) — như cái thang xoắn', ['Vòng tròn','Tam giác','Xoắn kép (double helix) — như cái thang xoắn'], 'Watson và Crick (1953) phát hiện cấu trúc xoắn kép của DNA — một trong những khám phá khoa học quan trọng nhất thế kỷ 20.'),
   q('DNA được tìm thấy ở đâu trong tế bào?', 'Trong nhân tế bào (nucleus)', ['Trong màng tế bào','Trong nhân tế bào (nucleus)','Ngoài tế bào'], 'DNA được cuộn chặt thành nhiễm sắc thể (chromosome) bên trong nhân. Con người có 46 nhiễm sắc thể (23 cặp).'),
   q('Tại sao con cái giống cha mẹ?', 'Di truyền gen: nhận 50% DNA từ bố, 50% từ mẹ', ['Vì sống cùng môi trường','Di truyền gen: nhận 50% DNA từ bố, 50% từ mẹ','Vì ăn cùng thức ăn','Vì học hỏi từ cha mẹ'], 'Mỗi người nhận 23 nhiễm sắc thể từ tinh trùng bố + 23 từ trứng mẹ = 46 nhiễm sắc thể → đây là lý do bạn vừa giống bố vừa giống mẹ!'),
   q('Con người và tinh tinh có DNA giống nhau bao nhiêu phần trăm?', '98.7%', ['70%','98.7%','50%'], 'Điều này cho thấy chúng ta có tổ tiên chung với tinh tinh khoảng 6 triệu năm trước. Sự khác biệt nhỏ trong DNA tạo ra sự khác biệt lớn về thể chất và trí tuệ!'),
   q('Đột biến gen (mutation) là gì?', 'Thay đổi ngẫu nhiên trong trình tự DNA — có thể vô hại, có lợi, hoặc có hại', ['Lỗi khi nhân bản tế bào và không thể sửa','Thay đổi ngẫu nhiên trong trình tự DNA — có thể vô hại, có lợi, hoặc có hại','Bệnh di truyền từ bố mẹ','Sự tổng hợp protein sai'], 'Phần lớn đột biến vô hại hoặc bị sửa chữa. Đột biến có lợi là động cơ của tiến hóa — sinh vật đột biến phù hợp hơn → sống sót → truyền gen đó lại!'),
   q('Tại sao sinh đôi cùng trứng (identical twins) có DNA giống hệt nhau?', 'Một trứng thụ tinh tách đôi → hai phôi có cùng bộ DNA ban đầu', ['Vì bố mẹ giống nhau','Một trứng thụ tinh tách đôi → hai phôi có cùng bộ DNA ban đầu','Vì cùng tử cung','Vì trứng nhân bản'], 'Sinh đôi cùng trứng có DNA gần như giống hệt — nhưng không y hệt hoàn toàn vì đột biến nhỏ xảy ra trong quá trình phát triển sau khi tách.'),
   q('ADN được dùng để xác định tội phạm như thế nào?', 'Mỗi người có DNA duy nhất — để lại mẫu (máu, tóc, da) tại hiện trường giúp nhận dạng', ['Bằng cách nhìn hình dạng DNA','Mỗi người có DNA duy nhất — để lại mẫu (máu, tóc, da) tại hiện trường giúp nhận dạng','Bằng màu sắc DNA','Bằng cân nặng DNA'], 'Phân tích DNA pháp y (forensic DNA) so sánh đoạn DNA từ hiện trường với nghi phạm — xác suất trùng ngẫu nhiên là 1 trong hàng tỷ người!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 7: VŨ TRỤ VÀ THIÊN VĂN
// ════════════════════════════════════════════════════════════════════════════

const UNIVERSE = [

t('solar-system', 'Hệ Mặt Trời — Gia đình của chúng ta trong vũ trụ',
  ['Hệ Mặt Trời gồm Mặt Trời + 8 hành tinh + vành đai tiểu hành tinh + nhiều vệ tinh và sao chổi.',
   '8 hành tinh (gần→xa): Thủy Tinh, Kim Tinh, Trái Đất, Hỏa Tinh, Mộc Tinh, Thổ Tinh, Thiên Vương Tinh, Hải Vương Tinh.',
   'Mặt Trời chiếm 99.86% khối lượng toàn Hệ Mặt Trời.',
   'Ánh sáng từ Mặt Trời mất 8 phút 20 giây để đến Trái Đất.'],
  'Nếu Mặt Trời to bằng quả bóng đá, Trái Đất chỉ to bằng hạt vừng cách 26 mét! Hải Vương Tinh sẽ cách hơn 800 mét!',
  [q('Hành tinh nào lớn nhất trong Hệ Mặt Trời?', 'Mộc Tinh (Jupiter)', ['Thổ Tinh','Mặt Trời (không phải hành tinh)','Mộc Tinh (Jupiter)'], 'Mộc Tinh lớn hơn Trái Đất 1 321 lần! Vết đỏ lớn trên Mộc Tinh là cơn bão khổng lồ đã kéo dài hơn 350 năm.'),
   q('Hành tinh nào có vành đai đẹp nhất?', 'Thổ Tinh (Saturn)', ['Hải Vương Tinh','Mộc Tinh','Thổ Tinh (Saturn)'], 'Vành đai Thổ Tinh gồm hàng tỷ mảnh băng và đá từ hạt cát đến nhà 3 tầng, rộng 282 000 km nhưng chỉ dày 20-200 mét!'),
   q('Ánh sáng mặt trời mất bao lâu đến Trái Đất?', 'Khoảng 8 phút 20 giây', ['1 giây','1 giờ','Khoảng 8 phút 20 giây'], 'Ánh sáng đi 300 000 km/giây. Trái Đất cách Mặt Trời 150 triệu km → 150 triệu ÷ 300 000 = 500 giây = ~8,3 phút.'),
   q('Tại sao Sao Diêm Vương không còn là hành tinh?', 'Năm 2006, IAU phân loại lại thành "hành tinh lùn" vì chưa dọn sạch quỹ đạo', ['Vì quá nhỏ','Năm 2006, IAU phân loại lại thành "hành tinh lùn" vì chưa dọn sạch quỹ đạo','Vì quá xa','Vì không có vệ tinh'], 'Theo định nghĩa 2006: hành tinh phải (1) quay quanh Mặt Trời, (2) đủ khối lượng để hình cầu, (3) dọn sạch quỹ đạo. Sao Diêm Vương thiếu điều kiện 3.'),
   q('Sao Hỏa (Mars) có điểm gì đặc biệt?', 'Núi lửa Olympus Mons cao 22 km — cao nhất Hệ Mặt Trời; và có dấu hiệu từng có nước', ['Có nhiều mặt trăng nhất','Núi lửa Olympus Mons cao 22 km — cao nhất Hệ Mặt Trời; và có dấu hiệu từng có nước','Nóng nhất Hệ Mặt Trời','Có vòng đai lớn nhất'], 'Sao Hỏa là mục tiêu thám hiểm và định cư tiềm năng — ngày trên Sao Hỏa dài 24h37 phút, rất gần với Trái Đất!'),
   q('Tại sao Kim Tinh (Venus) là hành tinh nóng nhất dù không gần Mặt Trời nhất?', 'Hiệu ứng nhà kính cực mạnh: khí CO₂ dày giữ nhiệt, bề mặt đạt 465°C', ['Vì gần Mặt Trời hơn Thủy Tinh','Hiệu ứng nhà kính cực mạnh: khí CO₂ dày giữ nhiệt, bề mặt đạt 465°C','Vì núi lửa hoạt động','Vì không có ban đêm'], 'Kim Tinh là bài học của hiệu ứng nhà kính — không khí CO₂ đặc giữ nhiệt như chăn dày khổng lồ. Trái Đất cần cẩn thận với CO₂!'),
   q('Sao chổi (comet) là gì?', 'Khối đá và băng di chuyển quanh Mặt Trời — khi đến gần Mặt Trời, băng bay hơi tạo đuôi sáng', ['Mảnh thiên thạch vỡ ra','Khối đá và băng di chuyển quanh Mặt Trời — khi đến gần Mặt Trời, băng bay hơi tạo đuôi sáng','Hành tinh nhỏ','Vệ tinh tự nhiên'], 'Đuôi sao chổi luôn hướng ngược chiều Mặt Trời (bị gió mặt trời đẩy) — nên khi sao chổi đi ra xa, đuôi ở phía trước! Halley\'s Comet xuất hiện mỗi 75-76 năm.')]),

t('stars-black-holes', 'Sao và Lỗ đen — Vũ trụ vô tận',
  ['Mặt Trời là một ngôi sao bình thường — ở giữa vòng đời, còn khoảng 5 tỷ năm nữa mới "chết".',
   'Các ngôi sao sinh ra từ đám mây khí và bụi (tinh vân), sống hàng triệu đến hàng tỷ năm.',
   'Lỗ đen (black hole): vật chất cực kỳ đặc, lực hút mạnh đến nỗi ánh sáng cũng không thoát được.',
   'Vũ trụ có khoảng 2 nghìn tỷ thiên hà, mỗi thiên hà có hàng trăm tỷ ngôi sao!'],
  'Ánh sáng từ các ngôi sao ta nhìn thấy đêm nay xuất phát từ hàng ngàn năm trước — ta đang nhìn vào quá khứ của vũ trụ!',
  [q('Tại sao các ngôi sao nhấp nháy?', 'Ánh sáng qua các lớp khí quyển không đều của Trái Đất bị bẻ cong liên tục', ['Vì sao thực sự nhấp nháy','Ánh sáng qua các lớp khí quyển không đều của Trái Đất bị bẻ cong liên tục','Vì sao đang quay','Vì kính mắt yếu'], 'Ngoài không gian, sao không nhấp nháy! Telescope Hubble chụp ảnh sao sắc nét vì ở trên khí quyển. Trên Trái Đất, không khí chuyển động làm ánh sáng "rung".'),
   q('Lỗ đen là gì?', 'Vùng không gian với lực hút cực mạnh, kể cả ánh sáng cũng không thoát ra được', ['Lỗ hổng trong vũ trụ','Vùng không gian với lực hút cực mạnh, kể cả ánh sáng cũng không thoát ra được','Sao tắt','Hành tinh đặc'], 'Lỗ đen hình thành khi ngôi sao khổng lồ nổ (supernova) rồi sụp vào chính nó. Ranh giới gọi là "chân trời sự kiện" (event horizon) — qua đó không gì thoát ra được.'),
   q('Mặt Trời sẽ thế nào sau khoảng 5 tỷ năm nữa?', 'Phồng thành "sao khổng lồ đỏ" nuốt Trái Đất, rồi co lại thành "sao lùn trắng"', ['Nổ thành lỗ đen','Tắt lạnh đột ngột','Phồng thành "sao khổng lồ đỏ" nuốt Trái Đất, rồi co lại thành "sao lùn trắng"'], 'Các sao cỡ Mặt Trời không đủ khối lượng để thành lỗ đen. Cuối đời chúng trở thành sao lùn trắng — cực đặc, cỡ Trái Đất nhưng nặng bằng Mặt Trời.'),
   q('Tại sao đêm nhìn sao ta thực ra nhìn vào quá khứ?', 'Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới tới Trái Đất', ['Vì kính thiên văn chỉnh ngược thời gian','Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới tới Trái Đất','Vì não người xử lý chậm','Vì sao đã di chuyển'], 'Sao Sirius (sao sáng nhất đêm) cách 8.6 năm ánh sáng — ánh sáng ta thấy xuất phát từ năm 2017! Sao Andromeda: 2.5 triệu năm ánh sáng — ta nhìn nó từ thời người tiền sử!'),
   q('Supernova (siêu tân tinh) là gì?', 'Vụ nổ khổng lồ khi ngôi sao lớn hết nhiên liệu — sáng hơn cả thiên hà trong vài ngày', ['Sao mới được tạo ra','Vụ nổ khổng lồ khi ngôi sao lớn hết nhiên liệu — sáng hơn cả thiên hà trong vài ngày','Hai sao va chạm','Lỗ đen nuốt sao'], 'Supernova tạo ra các nguyên tố nặng (sắt, vàng, uranium) và phân tán vào vũ trụ — nguyên tử sắt trong máu bạn từng nằm bên trong một ngôi sao cách đây tỷ năm!'),
   q('Dải Ngân Hà (Milky Way) là gì?', 'Thiên hà chứa Hệ Mặt Trời của chúng ta — có ~200-400 tỷ ngôi sao, đường kính 100 000 năm ánh sáng', ['Đường trắng trên bầu trời là khói','Thiên hà chứa Hệ Mặt Trời của chúng ta — có ~200-400 tỷ ngôi sao, đường kính 100 000 năm ánh sáng','Mây khổng lồ trong vũ trụ','Vành đai tiểu hành tinh'], 'Ta ở cách tâm Ngân Hà khoảng 26 000 năm ánh sáng — ở rìa ngoài. Ánh sáng đêm mờ đục trên bầu trời chính là ánh sáng từ hàng tỷ ngôi sao Ngân Hà!'),
   q('Năng lượng tối (dark energy) là gì?', 'Lực bí ẩn chiếm 68% vũ trụ, khiến vũ trụ giãn nở ngày càng nhanh hơn', ['Năng lượng từ lỗ đen','Lực bí ẩn chiếm 68% vũ trụ, khiến vũ trụ giãn nở ngày càng nhanh hơn','Năng lượng phát ra từ sao','Năng lượng tích trữ trong thiên hà'], 'Năng lượng tối (68%) + vật chất tối (27%) = 95% vũ trụ không ai biết là gì. Mọi thứ ta thấy được (sao, hành tinh, bạn) chỉ là 5% vũ trụ!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 8: KHÁM PHÁ VŨ TRỤ — CON NGƯỜI LÊN KHÔNG GIAN
// ════════════════════════════════════════════════════════════════════════════

const SPACE_EXPLORATION = [

t('rockets-space-travel', 'Tên lửa và Du hành vũ trụ — Thoát khỏi Trái Đất',
  ['Để thoát khỏi lực hút Trái Đất, tên lửa phải đạt vận tốc vũ trụ cấp 1: 7.9 km/s (~28 000 km/h).',
   'Yuri Gagarin (1961) là người đầu tiên lên vũ trụ; Neil Armstrong (1969) là người đầu tiên đặt chân lên Mặt Trăng.',
   'Trạm Vũ Trụ Quốc Tế (ISS) bay quanh Trái Đất ở độ cao ~400 km, tốc độ 28 000 km/h.',
   'Tên lửa đẩy bằng cách đốt nhiên liệu và phun khí mạnh về phía sau — phản lực đẩy tên lửa tiến về phía trước.'],
  'ISS bay xung quanh Trái Đất 16 lần mỗi ngày — phi hành gia thấy 16 lần mặt trời mọc và lặn trong 24 giờ!',
  [q('Tại sao tên lửa cần nhiên liệu khổng lồ để lên vũ trụ?', 'Phải thắng lực hút Trái Đất và đạt vận tốc ~28 000 km/h để vào quỹ đạo', ['Vì tên lửa rất nặng','Phải thắng lực hút Trái Đất và đạt vận tốc ~28 000 km/h để vào quỹ đạo','Vì hành trình dài','Vì không khí cản trở'], 'Tên lửa Saturn V (Apollo 11) nặng 2 950 tấn, trong đó 2 100 tấn là nhiên liệu! Chỉ 3 người và capsule nhỏ lên Mặt Trăng.'),
   q('Ai là người đầu tiên đặt chân lên Mặt Trăng?', 'Neil Armstrong (ngày 20/7/1969, sứ mệnh Apollo 11)', ['Yuri Gagarin','Buzz Aldrin','Neil Armstrong (ngày 20/7/1969, sứ mệnh Apollo 11)'], '"Đây là một bước nhỏ của con người, nhưng là một bước tiến khổng lồ của nhân loại" — câu nói nổi tiếng nhất lịch sử khám phá vũ trụ.'),
   q('Trạm ISS bay ở độ cao và tốc độ bao nhiêu?', 'Khoảng 400 km, tốc độ 28 000 km/h — một vòng quanh Trái Đất mất 90 phút', ['10 km, 1 000 km/h','Khoảng 400 km, tốc độ 28 000 km/h — một vòng quanh Trái Đất mất 90 phút','1 000 km, 10 000 km/h','36 000 km, 3 000 km/h'], 'ISS lớn bằng sân bóng đá Mỹ và là dự án hợp tác quốc tế lớn nhất trong lịch sử — 15 quốc gia tham gia xây dựng và vận hành.'),
   q('Phi hành gia ăn uống như thế nào trong không gian?', 'Thức ăn được đóng gói kín, hút chân không hoặc đông khô — ăn bằng muỗng đặc biệt tránh vụn bay', ['Không cần ăn trong không gian','Thức ăn được đóng gói kín, hút chân không hoặc đông khô — ăn bằng muỗng đặc biệt tránh vụn bay','Uống thuốc thay thức ăn','Trạm có nhà hàng riêng'], 'Vụn thức ăn bay lơ lửng trong không gian có thể vào máy thiết bị và gây hỏng hóc! Phi hành gia phải rất cẩn thận khi ăn.'),
   q('Tại sao tên lửa tái sử dụng (như SpaceX Falcon 9) tiết kiệm chi phí?', 'Tên lửa truyền thống bị bỏ sau 1 lần dùng — Falcon 9 hạ cánh và dùng lại được nhiều lần', ['Vì rẻ hơn khi sản xuất','Tên lửa truyền thống bị bỏ sau 1 lần dùng — Falcon 9 hạ cánh và dùng lại được nhiều lần','Vì cần ít nhiên liệu hơn','Vì nhỏ gọn hơn'], 'SpaceX Falcon 9 đã bay trên 20 lần — mỗi lần phóng tiết kiệm hàng triệu USD so với tên lửa một lần. Đây là bước ngoặt làm rẻ du hành vũ trụ!'),
   q('Tại sao phi hành gia trên ISS không cảm thấy trọng lực?', 'ISS và phi hành gia đều rơi tự do quanh Trái Đất với cùng tốc độ → trạng thái không trọng lực', ['Vì quá xa Trái Đất','ISS và phi hành gia đều rơi tự do quanh Trái Đất với cùng tốc độ → trạng thái không trọng lực','Vì trạm có máy triệt trọng lực','Vì vũ trụ không có lực hút'], 'ISS không xa đến mức trọng lực bằng 0 — thực ra trọng lực ở đó vẫn ~90% ở Trái Đất. "Không trọng lực" là vì trạm đang rơi xung quanh Trái Đất!'),
   q('Robot thám hiểm (rover) trên Sao Hỏa có tác dụng gì?', 'Nghiên cứu địa chất, tìm dấu hiệu sự sống cũ, phân tích không khí và đất đá', ['Xây căn cứ cho người ở','Nghiên cứu địa chất, tìm dấu hiệu sự sống cũ, phân tích không khí và đất đá','Chụp ảnh phong cảnh cho du khách','Khai thác khoáng sản'], 'Curiosity và Perseverance rover của NASA đang hoạt động trên Sao Hỏa — tìm kiếm bằng chứng vi sinh vật cổ đại trong hàng tỷ năm trước!')]),

t('space-inventions', 'Công nghệ vũ trụ — Khám phá vũ trụ giúp ích cuộc sống',
  ['Nhiều công nghệ hàng ngày bắt nguồn từ nghiên cứu vũ trụ: GPS, máy chụp MRI, bộ lọc nước.',
   'Vệ tinh GPS giúp định vị chính xác đến vài mét — điện thoại, tàu thuyền, máy bay đều dùng.',
   'Kính viễn vọng Hubble (phóng 1990) chụp ảnh vũ trụ cách 13 tỷ năm ánh sáng.',
   'Tấm pin mặt trời trên ISS cung cấp toàn bộ điện cho trạm — không cần xăng dầu!'],
  'Áo phi hành gia (spacesuit) có hơn 18 000 bộ phận — phải chịu được chênh lệch nhiệt -157°C đến +121°C và bức xạ!',
  [q('GPS hoạt động như thế nào?', 'Mạng lưới vệ tinh gửi tín hiệu, điện thoại đo thời gian nhận để tính khoảng cách → vị trí chính xác', ['Tín hiệu radio từ đài phát','Cảm biến trong điện thoại','Mạng lưới vệ tinh gửi tín hiệu, điện thoại đo thời gian nhận để tính khoảng cách → vị trí chính xác','Internet tra cứu bản đồ'], 'Cần tín hiệu từ ít nhất 4 vệ tinh GPS để tính vị trí 3D chính xác. Có hơn 30 vệ tinh GPS Mỹ hoạt động liên tục trên quỹ đạo!'),
   q('Kính viễn vọng Hubble đặt ở đâu và tại sao?', 'Ngoài khí quyển Trái Đất (559 km) — không bị không khí làm mờ ảnh', ['Trên đỉnh núi cao nhất','Ngoài khí quyển Trái Đất (559 km) — không bị không khí làm mờ ảnh','Dưới đáy biển sâu','Ở Nam Cực'], 'Khí quyển hấp thụ và làm méo ánh sáng sao — kính thiên văn trong vũ trụ thấy rõ gấp 10 lần kính mặt đất lớn nhất!'),
   q('Công nghệ nào phát triển cho NASA lại hữu ích trong y tế?', 'Máy chụp MRI, bộ lọc nước, nhiệt kế hồng ngoại — đều từ nghiên cứu vũ trụ', ['Chỉ rocket engine','Máy chụp MRI, bộ lọc nước, nhiệt kế hồng ngoại — đều từ nghiên cứu vũ trụ','Màn hình máy tính','Lò vi sóng'], 'Foam bảo vệ mũ bảo hiểm xe máy, bộ lọc không khí trong nhà, nhiệt kế tai — nhiều sản phẩm hàng ngày là "spin-off" từ công nghệ NASA!'),
   q('Tại sao vệ tinh thời tiết giúp dự báo bão chính xác hơn?', 'Chụp ảnh mây và đo nhiệt độ đại dương từ vũ trụ — theo dõi bão từ hàng ngàn km', ['Vì vệ tinh đo mưa trực tiếp','Chụp ảnh mây và đo nhiệt độ đại dương từ vũ trụ — theo dõi bão từ hàng ngàn km','Vì vệ tinh trong bão','Vì vệ tinh đo gió'], 'Trước 1960 (vệ tinh thời tiết đầu tiên), siêu bão đổ bộ bờ biển không báo trước được. Giờ dự báo 3-5 ngày trước với độ chính xác cao!'),
   q('Pin mặt trời (solar panel) hoạt động như thế nào?', 'Tế bào quang điện chuyển đổi ánh sáng thành điện — tế bào silicon hấp thụ photon và giải phóng electron', ['Tích trữ nhiệt và chuyển thành điện','Tế bào quang điện chuyển đổi ánh sáng thành điện — tế bào silicon hấp thụ photon và giải phóng electron','Sử dụng từ trường mặt trời','Pin nước mặt trời'], 'Hiệu ứng quang điện (photoelectric effect) — Einstein giải thích hiện tượng này năm 1905 và được giải Nobel 1921. ISS có 8 cánh pin mặt trời, mỗi cánh rộng 73 mét!'),
   q('Tại sao áo phi hành gia rất nặng và cồng kềnh?', 'Phải bảo vệ khỏi chân không, bức xạ, nhiệt độ cực đoan, và cung cấp oxy, áp suất', ['Vì làm từ vật liệu đặc biệt rất nặng','Phải bảo vệ khỏi chân không, bức xạ, nhiệt độ cực đoan, và cung cấp oxy, áp suất','Vì phi hành gia cần nhiều túi đựng đồ','Vì cần chống va chạm'], 'Áo phi hành gia EMU nặng 127 kg — nhưng trong không gian không trọng lực, phi hành gia di chuyển dễ dàng. Trên Trái Đất, mặc áo này phải ngồi xe lăn!'),
   q('Cuộc đua vào vũ trụ (Space Race) là gì?', 'Cuộc cạnh tranh Mỹ-Liên Xô (1957-1969) trong thời Chiến Tranh Lạnh — đỉnh điểm: Apollo 11 lên Mặt Trăng', ['Giải đua tên lửa thể thao quốc tế','Cuộc cạnh tranh Mỹ-Liên Xô (1957-1969) trong thời Chiến Tranh Lạnh — đỉnh điểm: Apollo 11 lên Mặt Trăng','Giải thưởng khoa học NASA','Chương trình vũ trụ của 10 nước'], 'Sputnik (1957) — vệ tinh nhân tạo đầu tiên của Liên Xô — làm Mỹ choáng váng và bắt đầu đầu tư khổng lồ vào khoa học vũ trụ. Kết quả: Apollo 11 năm 1969!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 9: MÔI TRƯỜNG VÀ KHÍ HẬU — TRÁI ĐẤT CẦN ĐƯỢC BẢO VỆ
// ════════════════════════════════════════════════════════════════════════════

const ENVIRONMENT = [

t('climate-change', 'Biến đổi khí hậu — Thách thức của thế kỷ',
  ['Nhiệt độ Trái Đất đã tăng ~1.1°C kể từ thời kỳ tiền công nghiệp (trước 1850).',
   'CO₂ từ đốt than, dầu, khí đốt là nguyên nhân chính của hiệu ứng nhà kính nhân tạo.',
   'Biến đổi khí hậu gây ra: mực nước biển dâng, bão mạnh hơn, hạn hán và lũ lụt cực đoan.',
   'Hiệp định Paris (2015): 196 quốc gia cam kết giữ nhiệt độ không tăng quá 1.5-2°C.'],
  'Nếu băng ở Greenland và Nam Cực tan hết, mực nước biển dâng hơn 65 mét — nhấn chìm hầu hết các thành phố ven biển!',
  [q('Hiệu ứng nhà kính là gì?', 'Các khí CO₂, CH₄ trong khí quyển giữ nhiệt từ Mặt Trời — giống như kính nhà kính giữ ấm cây', ['Nhiệt độ trong nhà kính trồng rau','Các khí CO₂, CH₄ trong khí quyển giữ nhiệt từ Mặt Trời — giống như kính nhà kính giữ ấm cây','Lớp ozone hấp thụ tia UV','Băng Nam Cực phản chiếu nhiệt'], 'Hiệu ứng nhà kính tự nhiên là cần thiết — không có nó Trái Đất lạnh -18°C! Vấn đề là con người tăng CO₂ quá nhanh, làm quá trình này mạnh lên.'),
   q('Hoạt động nào tạo ra nhiều khí CO₂ nhất?', 'Đốt nhiên liệu hóa thạch (than, dầu, khí đốt) trong giao thông, công nghiệp, điện', ['Hô hấp của con người','Đốt nhiên liệu hóa thạch (than, dầu, khí đốt) trong giao thông, công nghiệp, điện','Núi lửa phun','Động vật thải khí'], 'Đốt nhiên liệu hóa thạch chiếm ~75% lượng khí thải CO₂ toàn cầu. Phá rừng đứng thứ 2 — rừng là "bể chứa carbon" tự nhiên khổng lồ.'),
   q('Tại sao san hô đang chết hàng loạt?', 'Nhiệt độ đại dương tăng và axit hóa đại dương (CO₂ hòa vào nước) phá hủy san hô', ['Vì đánh bắt cá quá nhiều','Nhiệt độ đại dương tăng và axit hóa đại dương (CO₂ hòa vào nước) phá hủy san hô','Vì ô nhiễm rác thải nhựa','Vì thiếu ánh sáng mặt trời'], '"Tẩy trắng san hô" (coral bleaching) xảy ra khi nước quá nóng → san hô đuổi tảo cộng sinh → mất màu và chết. Great Barrier Reef đã mất 50% san hô từ 1995!'),
   q('Năng lượng tái tạo nào đang phát triển nhanh nhất?', 'Điện mặt trời (solar) và điện gió (wind) — chi phí giảm 90% trong 10 năm', ['Điện hạt nhân','Thủy điện','Điện mặt trời (solar) và điện gió (wind) — chi phí giảm 90% trong 10 năm','Địa nhiệt'], 'Chi phí điện mặt trời giảm từ 350 USD/watt (1970) xuống dưới 0.03 USD/watt (2023) — rẻ hơn cả than! Trong 30 năm tới, phần lớn điện thế giới sẽ là tái tạo.'),
   q('Tại sao lỗ hổng ozone nguy hiểm?', 'Ozone bảo vệ Trái Đất khỏi tia UV có hại — lỗ hổng cho phép UV qua gây ung thư da và hại sinh vật', ['Vì ozone là khí độc','Ozone bảo vệ Trái Đất khỏi tia UV có hại — lỗ hổng cho phép UV qua gây ung thư da và hại sinh vật','Vì thời tiết xấu hơn','Vì không khí thoát ra ngoài vũ trụ'], 'CFC trong tủ lạnh, bình xịt cũ phá hủy ozone. Sau Nghị định thư Montreal (1987) cấm CFC, lỗ hổng ozone đang phục hồi — thành công môi trường lớn nhất!'),
   q('Mực nước biển dâng ảnh hưởng đến Việt Nam như thế nào?', 'Đồng bằng sông Cửu Long thấp, nguy cơ ngập mặn và mất đất canh tác lớn', ['Việt Nam trên cao không bị ảnh hưởng','Đồng bằng sông Cửu Long thấp, nguy cơ ngập mặn và mất đất canh tác lớn','Chỉ miền Bắc bị ảnh hưởng','Nước biển mặn sẽ làm đất màu mỡ hơn'], 'Đồng bằng Cửu Long trung bình chỉ cao ~0.5-2 m so với mực nước biển — dễ bị ngập. Đây là vựa lúa của Việt Nam, nuôi sống hàng chục triệu người!'),
   q('Trẻ em có thể làm gì để giảm biến đổi khí hậu?', 'Tiết kiệm điện, không lãng phí thức ăn, đi bộ/xe đạp thay ô tô, tái chế rác', ['Chỉ người lớn mới có thể làm','Tiết kiệm điện, không lãng phí thức ăn, đi bộ/xe đạp thay ô tô, tái chế rác','Trồng một cây cũng không đủ','Không có gì làm được'], 'Mỗi kg thức ăn lãng phí = ~2.5 kg CO₂ thải. Tắt đèn khi ra khỏi phòng, ăn hết thức ăn, chọn sản phẩm ít đóng gói — những hành động nhỏ tạo ra sự thay đổi lớn!')]),

t('ecosystems-food-chain', 'Hệ sinh thái và Chuỗi thức ăn — Ai ăn ai?',
  ['Hệ sinh thái là cộng đồng sinh vật sống + môi trường vật lý tương tác với nhau.',
   'Chuỗi thức ăn: cây cỏ → sâu → chim → rắn → đại bàng (năng lượng truyền từ dưới lên).',
   'Chỉ ~10% năng lượng truyền sang bậc dinh dưỡng tiếp theo — vì vậy cần rất nhiều cây để nuôi ít thú ăn thịt.',
   'Loài then chốt (keystone species): một loài quan trọng đến mức nếu mất, cả hệ sinh thái sụp đổ.'],
  'Khi sói bị tái thả vào Yellowstone (1995), hành vi hươu thay đổi → cây mọc trở lại → sông thay đổi hướng chảy! Sự kỳ diệu của chuỗi thức ăn.',
  [q('Sinh vật sản xuất (producer) trong chuỗi thức ăn là gì?', 'Thực vật và tảo — quang hợp tạo ra năng lượng từ ánh sáng mặt trời', ['Động vật ăn cỏ','Thực vật và tảo — quang hợp tạo ra năng lượng từ ánh sáng mặt trời','Nấm và vi khuẩn phân hủy','Động vật ăn thịt'], 'Thực vật là "nhà máy năng lượng" của mọi hệ sinh thái — không có chúng, không có sự sống nào có thể tồn tại!'),
   q('Tại sao cần nhiều cây/cỏ hơn là nhiều động vật ăn thịt?', 'Chỉ 10% năng lượng truyền sang bậc tiếp theo — cần 1000 kg cỏ nuôi 100 kg hươu nuôi 10 kg hổ', ['Cây cỏ sinh sản nhanh hơn','Chỉ 10% năng lượng truyền sang bậc tiếp theo — cần 1000 kg cỏ nuôi 100 kg hươu nuôi 10 kg hổ','Động vật ăn thịt dễ bệnh hơn','Thực vật cần diện tích lớn hơn'], 'Quy tắc 10%: 90% năng lượng mất đi ở mỗi bậc dinh dưỡng (do hô hấp, chất thải). Đây là lý do sinh khối giảm nhanh khi lên cao trong tháp thức ăn!'),
   q('Loài then chốt (keystone species) là gì?', 'Loài có ảnh hưởng lớn không tương xứng với số lượng — mất chúng, cả hệ sinh thái sụp đổ', ['Loài có số lượng nhiều nhất','Loài có ảnh hưởng lớn không tương xứng với số lượng — mất chúng, cả hệ sinh thái sụp đổ','Loài to lớn nhất','Loài đầu chuỗi thức ăn'], 'Sao biển tím (Pisaster) là keystone species của rạn đá ven biển Mỹ — khi bị loại bỏ thực nghiệm, hà (mussels) chiếm hết chỗ và 25 loài biến mất!'),
   q('Tại sao cần bảo tồn đa dạng sinh học?', 'Hệ sinh thái đa dạng bền vững hơn — nếu một loài mất, loài khác có thể bù đắp; đơn dạng dễ sụp đổ', ['Chỉ vì các loài đẹp','Hệ sinh thái đa dạng bền vững hơn — nếu một loài mất, loài khác có thể bù đắp; đơn dạng dễ sụp đổ','Vì con người cần thức ăn đa dạng','Vì luật pháp yêu cầu'], 'Ireland 1845: trồng độc nhất một giống khoai tây → nấm bệnh xóa sổ hoàn toàn → 1 triệu người chết đói. Đa dạng sinh học là bảo hiểm của tự nhiên!'),
   q('Phân hủy (decomposition) đóng vai trò gì trong hệ sinh thái?', 'Vi khuẩn và nấm phân hủy xác chết → giải phóng dinh dưỡng trở lại đất → cây cỏ hấp thụ', ['Chỉ làm sạch môi trường','Vi khuẩn và nấm phân hủy xác chết → giải phóng dinh dưỡng trở lại đất → cây cỏ hấp thụ','Tạo ra đất mới','Ngăn dịch bệnh'], 'Nếu không có sinh vật phân hủy, Trái Đất sẽ chìm trong xác chết và chất thải hàng triệu năm — và đất sẽ cạn dinh dưỡng không có gì mọc được!'),
   q('Tại sao ong mật quan trọng với nông nghiệp?', 'Ong thụ phấn cho 75% cây trồng lương thực — không có ong, nhiều loại rau quả không có hạt và trái', ['Ong tạo ra mật cho người','Ong thụ phấn cho 75% cây trồng lương thực — không có ong, nhiều loại rau quả không có hạt và trái','Ong ăn sâu bệnh','Ong tạo đất màu mỡ'], 'Einstein được cho là nói: "Nếu ong biến mất, con người chỉ sống thêm 4 năm". Ong đang chết hàng loạt do thuốc trừ sâu và mất môi trường sống — đây là khủng hoảng thực sự!'),
   q('Rừng nhiệt đới đóng góp gì cho khí hậu Trái Đất?', 'Hấp thụ CO₂, tạo mưa, điều hòa nhiệt độ — là "lá phổi" của Trái Đất', ['Chỉ cung cấp gỗ','Hấp thụ CO₂, tạo mưa, điều hòa nhiệt độ — là "lá phổi" của Trái Đất','Ngăn động đất','Lọc nước sông'], 'Amazon (Brazil) tạo ra ~50% lượng mưa của chính mình qua vòng tuần hoàn nước nội bộ. Phá rừng Amazon → giảm mưa Amazon → rừng càng khô → chết thêm — vòng xoáy nguy hiểm!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// PHẦN 10: KHOA HỌC VUI — THỰC PHẨM VÀ ĐỜI SỐNG
// ════════════════════════════════════════════════════════════════════════════

const EVERYDAY_SCIENCE = [

t('food-science', 'Khoa học Thực phẩm — Tại sao thức ăn có vị?',
  ['Vị giác nhận biết 5 vị cơ bản: ngọt, mặn, chua, đắng, và umami (vị ngọt thịt).',
   'Mùi thức ăn (90% "vị") cảm nhận qua khứu giác — khi nghẹt mũi, thức ăn mất nhiều hương vị.',
   'Nấu chín thức ăn: nhiệt phá vỡ cấu trúc protein, tinh bột, diệt vi khuẩn.',
   'Muối bảo quản thực phẩm bằng cách hút nước ra khỏi vi khuẩn — vi khuẩn bị mất nước và chết.'],
  'Tại sao kem lạnh ngon hơn kem tan chảy? Cấu trúc tinh thể băng tạo ra cảm giác mịn — tan chảy phá vỡ cấu trúc này!',
  [q('Tại sao khi nghẹt mũi thức ăn mất vị?', 'Phần lớn "vị" thực ra là mùi — khứu giác đóng góp 70-90% trải nghiệm hương vị', ['Vì mũi và miệng gần nhau','Phần lớn "vị" thực ra là mùi — khứu giác đóng góp 70-90% trải nghiệm hương vị','Vì khi bệnh ăn không ngon','Vì lưỡi cũng bị ảnh hưởng khi nghẹt mũi'], 'Thử kẹp mũi khi ăn: khoai tây và táo sẽ rất giống nhau! Chỉ có vị (ngọt/chua/mặn) phân biệt được, không có mùi thơm đặc trưng.'),
   q('Tại sao ớt cay?', 'Capsaicin — hợp chất trong ớt — kích hoạt cùng thụ thể cảm giác đau/nhiệt trong miệng', ['Vì ớt axit','Capsaicin — hợp chất trong ớt — kích hoạt cùng thụ thể cảm giác đau/nhiệt trong miệng','Vì lưỡi bị bỏng thật','Vì ớt chứa chất độc nhẹ'], 'Lưỡi không thực sự bị đốt — não nhận tín hiệu "nhiệt" giả. Uống nước không giảm cay (capsaicin không tan trong nước). Uống sữa (casein trong sữa phá vỡ capsaicin) mới hiệu quả!'),
   q('Maillard reaction (phản ứng Maillard) là gì?', 'Phản ứng hóa học giữa protein và đường khi gia nhiệt — tạo màu nâu và hương vị thơm', ['Quá trình lên men thức ăn','Phản ứng hóa học giữa protein và đường khi gia nhiệt — tạo màu nâu và hương vị thơm','Protein bị phân hủy','Đường bị đốt cháy thành than'], 'Vỏ bánh mì nâu, thịt nướng vàng, cà phê rang — đều nhờ phản ứng Maillard! Xảy ra trên 140°C, tạo ra hàng trăm hợp chất hương thơm phức tạp.'),
   q('Tại sao hành và tỏi làm chảy nước mắt?', 'Cắt hành giải phóng syn-propanethial-S-oxide bay lên mắt, phản ứng với nước tạo axit nhẹ', ['Vì mùi hành rất mạnh','Cắt hành giải phóng syn-propanethial-S-oxide bay lên mắt, phản ứng với nước tạo axit nhẹ','Vì hành lạnh làm mắt nhạy cảm','Vì hành có tinh dầu đặc biệt'], 'Để giảm chảy nước mắt: cắt hành dưới nước, để hành trong tủ lạnh trước, hoặc cắt dưới quạt hút. Hóa chất bay ít hơn khi lạnh!'),
   q('Tại sao bánh mì nở to khi nướng?', 'Nấm men (yeast) ăn đường, thải CO₂ — bong bóng khí làm bột nở; nhiệt cố định cấu trúc', ['Vì bột mì có không khí','Nấm men (yeast) ăn đường, thải CO₂ — bong bóng khí làm bột nở; nhiệt cố định cấu trúc','Vì nước bốc hơi','Vì gluten giãn ra'], 'Nấm men Saccharomyces cerevisiae — cùng loài dùng để ủ bia! Quá trình lên men tạo CO₂ + cồn, nhưng cồn bốc hơi khi nướng nóng.'),
   q('Vitamin C trong rau quả bị mất khi nào?', 'Khi đun nóng lâu và tiếp xúc không khí — Vitamin C không bền với nhiệt và oxy', ['Chỉ khi nấu chín hoàn toàn','Khi đun nóng lâu và tiếp xúc không khí — Vitamin C không bền với nhiệt và oxy','Không bao giờ mất','Khi ăn lạnh'], 'Hấp rau ngắn (5-7 phút) giữ được 60-70% Vitamin C. Luộc lâu trong nhiều nước mất 50-90%! Ăn sống hoặc hấp nhanh là cách giữ dinh dưỡng tốt nhất.'),
   q('Tại sao sôcôla tốt cho sức khỏe?', 'Sôcôla đen chứa flavonoid — chất chống oxy hóa giúp tim mạch và giảm viêm', ['Vì chứa nhiều đường','Sôcôla đen chứa flavonoid — chất chống oxy hóa giúp tim mạch và giảm viêm','Vì ngọt làm vui','Vì chứa caffeine'], 'Sôcôla đen (70%+ cacao) có nhiều flavonoid hơn trà xanh! Nhưng sôcôla sữa và trắng thì không — đường và sữa loãng mất tác dụng tốt.')]),

t('human-technology', 'Công nghệ của Con người — Sáng kiến thay đổi thế giới',
  ['Bánh xe (khoảng 3500 TCN) và chữ viết (3400 TCN) là hai phát minh thay đổi văn minh nhân loại.',
   'Internet kết nối hơn 5 tỷ người và hơn 15 tỷ thiết bị toàn cầu.',
   'Điện thoại thông minh hiện đại có tính toán mạnh hơn máy tính NASA đưa người lên Mặt Trăng 1 triệu lần.',
   'AI (Trí tuệ nhân tạo) học từ dữ liệu — giống như não người học từ kinh nghiệm.'],
  'Một chip bán dẫn hiện đại chứa hàng tỷ transistor trên diện tích bằng móng tay — nhỏ hơn tế bào hồng cầu!',
  [q('Internet hoạt động như thế nào ở cơ bản?', 'Dữ liệu được chia thành "gói" nhỏ, gửi qua mạng lưới máy tính và tái lắp ráp khi đến nơi', ['Tín hiệu điện thoại nối dài','Dữ liệu được chia thành "gói" nhỏ, gửi qua mạng lưới máy tính và tái lắp ráp khi đến nơi','Sóng radio toàn cầu','Vệ tinh trực tiếp kết nối mọi người'], 'Gói dữ liệu có thể đi theo nhiều đường khác nhau từ A đến B — nếu một đường hỏng, đường khác thay thế. Đây là lý do Internet "không bao giờ chết hoàn toàn".'),
   q('Tại sao điện thoại cảm ứng nhận biết ngón tay?', 'Màn hình cảm ứng điện dung: ngón tay dẫn điện làm thay đổi điện trường, cảm biến ghi lại vị trí', ['Vì màn hình nhận nhiệt cơ thể','Màn hình cảm ứng điện dung: ngón tay dẫn điện làm thay đổi điện trường, cảm biến ghi lại vị trí','Vì áp lực của ngón tay','Vì màn hình nhận dạng hình ảnh ngón tay'], 'Cầm điện thoại bằng bút gỗ không hoạt động! Ngón tay dẫn điện tốt → thay đổi điện trường → cảm biến ghi nhận. Đeo găng tay cách điện: màn hình "không thấy" ngón tay.'),
   q('Máy in 3D hoạt động như thế nào?', 'Đắp vật liệu (nhựa, kim loại) từng lớp mỏng theo thiết kế số 3D — "in" từ dưới lên', ['Khắc từ khối vật liệu đặc','Đắp vật liệu (nhựa, kim loại) từng lớp mỏng theo thiết kế số 3D — "in" từ dưới lên','Đúc trong khuôn','Sao chép từ vật mẫu'], 'Máy in 3D đang cách mạng hóa y tế: in xương nhân tạo, mô sinh học, thậm chí cơ quan nội tạng đơn giản. Tương lai: in tim thay thế cho người cần ghép!'),
   q('AI (Trí tuệ nhân tạo) học như thế nào?', 'Phân tích hàng triệu/tỷ ví dụ để tìm mẫu — giống não học từ kinh nghiệm nhưng nhanh hơn nhiều', ['Lập trình từng quy tắc cụ thể','Phân tích hàng triệu/tỷ ví dụ để tìm mẫu — giống não học từ kinh nghiệm nhưng nhanh hơn nhiều','Sao chép não người','Kết nối vào internet để học mọi thứ'], 'ChatGPT học từ hàng trăm tỷ từ văn bản — nhiều hơn một người đọc trong 10 000 năm! Nhưng AI vẫn không "hiểu" thực sự như con người.'),
   q('Tại sao xe điện thân thiện với môi trường hơn xe xăng?', 'Không thải CO₂ trực tiếp khi chạy — dù điện từ than vẫn ít thải hơn xăng theo vòng đời', ['Vì pin lithium sạch hoàn toàn','Không thải CO₂ trực tiếp khi chạy — dù điện từ than vẫn ít thải hơn xăng theo vòng đời','Vì im lặng hơn','Vì không cần nhớt'], 'Hiệu suất động cơ điện ~90% (điện → chuyển động). Động cơ đốt trong ~25-35% (xăng → chuyển động, 65-75% mất thành nhiệt). Xe điện dùng năng lượng hiệu quả hơn nhiều!'),
   q('Tại sao vaccine mRNA (như Pfizer COVID-19) là công nghệ đột phá?', 'Dùng mRNA dạy tế bào tự sản xuất protein kháng nguyên — nhanh hơn vaccine truyền thống', ['Vì chứa virus thật nhiều hơn','Dùng mRNA dạy tế bào tự sản xuất protein kháng nguyên — nhanh hơn vaccine truyền thống','Vì được làm từ máu người khỏi bệnh','Vì chứa kháng thể trực tiếp'], 'Vaccine mRNA chỉ cần biết trình tự gene của virus → có thể thiết kế vaccine trong vài ngày! Pfizer COVID-19 hoàn thành thiết kế trong 2 ngày — kỷ lục lịch sử y học!'),
   q('Năng lượng hạt nhân khác năng lượng hóa học như thế nào?', 'Hạt nhân: phân tách (fission) hoặc hợp nhất (fusion) nguyên tử → năng lượng khổng lồ (E=mc²)', ['Không khác gì — đều là đốt','Hạt nhân: phân tách (fission) hoặc hợp nhất (fusion) nguyên tử → năng lượng khổng lồ (E=mc²)','Hạt nhân dùng từ trường','Hóa học mạnh hơn hạt nhân'], '1 kg uranium phân hạch tạo ra năng lượng bằng 3 000 tấn than — đây là lý do nhà máy điện hạt nhân rất hiệu quả nhưng cũng cần kiểm soát cực kỳ nghiêm ngặt!')]),

];

// ════════════════════════════════════════════════════════════════════════════
// EXPORT ALL
// ════════════════════════════════════════════════════════════════════════════

export const ALL_SCIENCE_WORLD_TOPICS = [
  ...PLANTS,
  ...HUMAN_BODY,
  ...ANIMALS,
  ...EVOLUTION,
  ...EARTH_NATURE,
  ...ANIMAL_BODIES,
  ...PHYSICS_CHEMISTRY,
  ...UNIVERSE,
  ...SPACE_EXPLORATION,
  ...ENVIRONMENT,
  ...EVERYDAY_SCIENCE,
];
