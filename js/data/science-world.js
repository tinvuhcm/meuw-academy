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
   q('Rừng có vai trò gì với không khí?', 'Hút CO₂ và tạo ra oxy, điều hòa khí hậu', ['Không có vai trò','Chỉ tạo bóng mát','Hút CO₂ và tạo ra oxy, điều hòa khí hậu','Làm không khí ẩm'], 'Rừng là "lá phổi" của Trái Đất — rừng Amazon tạo ra 20% oxy của khí quyển!')]),

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
   q('Cây ăn thịt vẫn cần quang hợp không?', 'Vẫn cần — côn trùng chỉ bổ sung đạm, ánh sáng vẫn tạo ra năng lượng', ['Không cần, có côn trùng là đủ','Vẫn cần — côn trùng chỉ bổ sung đạm, ánh sáng vẫn tạo ra năng lượng','Chỉ cần nước','Không cần đất'], 'Côn trùng cung cấp đạm (protein) nhưng cây vẫn cần ánh sáng để tổng hợp đường — cả hai đều cần thiết.')]),

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
   q('Tại sao thân cây mọc hướng về phía ánh sáng?', 'Vì auxin (hormone thực vật) tập trung phía tối, làm tế bào đó dài ra', ['Vì gió thổi','Vì đất nghiêng','Vì auxin (hormone thực vật) tập trung phía tối, làm tế bào đó dài ra','Vì rễ kéo'], 'Auxin tập trung ở phía tối, kích thích tế bào phía đó phát triển nhanh hơn → thân cong về phía sáng.')]),

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
   q('Một số loài cây "nhờ" động vật như thế nào để phát tán hạt?', 'Quả ngon hấp dẫn động vật ăn, hạt ra ngoài theo phân ở nơi khác', ['Nhờ động vật mang hạt trong tổ','Quả ngon hấp dẫn động vật ăn, hạt ra ngoài theo phân ở nơi khác','Bám vào chân động vật','Cây chạm vào động vật'], 'Nhiều loài cây "trả công" cho động vật bằng quả ngon — động vật ăn và rải hạt khắp nơi!')]),

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
   q('Mất bao lâu để thức ăn đi qua toàn bộ hệ tiêu hóa?', '24-72 giờ', ['30 phút','2-3 giờ','24-72 giờ','1 tuần'], 'Từ miệng đến hậu môn mất 24-72 giờ tùy loại thức ăn — rau củ nhanh hơn, thịt chậm hơn.')]),

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
   q('Huyết áp là gì?', 'Áp lực máu tác động lên thành mạch máu khi tim bơm', ['Tốc độ máu chảy','Áp lực máu tác động lên thành mạch máu khi tim bơm','Lượng máu trong cơ thể','Nhiệt độ của máu'], 'Huyết áp bình thường là 120/80 mmHg. Quá cao lâu dài gây hại cho tim và mạch máu.')]),

t('nervous-system', 'Hệ thần kinh — Trung tâm điều khiển',
  ['Não là "trung tâm chỉ huy" — nặng khoảng 1.4 kg, chiếm 2% trọng lượng cơ thể nhưng dùng 20% năng lượng.',
   'Tủy sống kết nối não với toàn bộ cơ thể qua hàng tỷ sợi thần kinh.',
   'Thần kinh truyền tín hiệu với tốc độ 120 m/giây — nhanh hơn xe hơi trên đường cao tốc!',
   'Phản xạ là phản ứng tự động (không cần não) — như rụt tay khi chạm nóng.',
   '86 tỷ tế bào thần kinh trong não tạo ra 100 nghìn tỷ kết nối — nhiều hơn số ngôi sao trong dải Ngân Hà!'],
  'Trong khi em ngủ, não vẫn hoạt động — xử lý ký ức và "dọn dẹp" các chất thải tích tụ trong ngày!',
  [q('Não chiếm bao nhiêu phần trăm năng lượng cơ thể dù chỉ nặng 1.4 kg?', '20%', ['5%','20%','50%','2%'], 'Dù chỉ chiếm 2% trọng lượng, não "ngốn" tới 20% năng lượng — vì vậy học tập căng thẳng sẽ làm em đói nhanh hơn!'),
   q('Phản xạ là gì?', 'Phản ứng tự động của cơ thể không qua não — như rụt tay khi chạm nóng', ['Cảm xúc mạnh','Phản ứng tự động của cơ thể không qua não — như rụt tay khi chạm nóng','Ký ức lâu dài','Giấc ngủ sâu'], 'Phản xạ đi qua tủy sống (không cần não) để phản ứng nhanh hơn — giúp bảo vệ cơ thể khi nguy hiểm.'),
   q('Tốc độ truyền tín hiệu thần kinh nhanh đến mức nào?', 'Lên đến 120 m/giây', ['1 m/giây','120 m/giây','0.1 m/giây','1000 m/giây'], 'Tín hiệu thần kinh di chuyển từ 1-120 m/giây tùy loại sợi thần kinh — giúp bạn phản ứng gần như tức thời với thế giới xung quanh.'),
   q('Tại sao ngủ đủ giấc quan trọng cho trí nhớ?', 'Trong khi ngủ, não củng cố ký ức và loại bỏ chất thải tích tụ', ['Vì mệt mỏi cần nghỉ','Trong khi ngủ, não củng cố ký ức và loại bỏ chất thải tích tụ','Để tim đập chậm hơn','Vì không cần năng lượng lúc ngủ'], 'Giai đoạn ngủ sâu giúp "ghi" ký ức ngắn hạn vào bộ nhớ dài hạn — học bài trước khi ngủ thực sự rất hiệu quả!'),
   q('5 giác quan của con người là gì?', 'Thị giác, thính giác, khứu giác, vị giác và xúc giác', ['Thị giác, thính giác, khứu giác, vị giác và xúc giác','Chỉ thị giác và thính giác','Thị giác, xúc giác và nhiệt độ','Thị giác, thính giác và cân bằng'], 'Ngoài 5 giác quan cơ bản, con người còn có cảm giác đau, nhiệt, cân bằng, bản thể giác (biết tư thế cơ thể).')]),

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
   q('Con người không thở được trong bao lâu?', 'Hầu hết mọi người chỉ có thể nín thở 1-2 phút', ['10 phút','5 phút','Hầu hết mọi người chỉ có thể nín thở 1-2 phút','30 phút'], 'Não cần oxy liên tục — sau 4-6 phút thiếu oxy, tế bào não bắt đầu chết. Bơi lội giúp tăng dung tích phổi!')]),

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
   q('Tại sao đọc sách trên xe hay tàu dễ say tàu xe?', 'Mắt thấy tĩnh nhưng tai cảm nhận chuyển động — não nhận tín hiệu mâu thuẫn', ['Vì ánh sáng yếu','Vì ngồi không thoải mái','Mắt thấy tĩnh nhưng tai cảm nhận chuyển động — não nhận tín hiệu mâu thuẫn','Vì không khí trong xe ngột ngạt'], 'Say tàu xe xảy ra khi não nhận thông tin mâu thuẫn: mắt (nhìn thứ đứng yên) và tai (cảm nhận lắc lư) không khớp nhau.')]),

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
   q('Đàn kiến được ví như "siêu sinh vật" vì điều gì?', 'Hàng triệu cá thể hành động như một cơ thể thống nhất có trí tuệ tập thể', ['Kiến rất to','Hàng triệu cá thể hành động như một cơ thể thống nhất có trí tuệ tập thể','Kiến không bao giờ chết','Kiến có thể bay'], 'Đàn kiến có "trí tuệ tập thể" — không có cá thể nào điều khiển, nhưng cả đàn giải quyết vấn đề, tìm đường, xây tổ phức tạp.')]),

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
   q('Tại sao chim di cư theo mùa?', 'Tìm thức ăn và điều kiện sống tốt hơn — nhiều côn trùng và ánh sáng ở vùng ôn đới về mùa hè', ['Vì bị gió thổi','Để sinh sản','Tìm thức ăn và điều kiện sống tốt hơn — nhiều côn trùng và ánh sáng ở vùng ôn đới về mùa hè','Vì sợ tuyết'], 'Di cư là chiến lược tiến hóa xuất sắc: hưởng nguồn thức ăn phong phú mùa hè phương bắc, tránh mùa đông lạnh giá bằng cách bay về nam.')]),

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
   q('Bao nhiêu phần trăm đáy đại dương đã được khám phá?', 'Dưới 20%', ['100%','50%','80%','Dưới 20%'], 'Đại dương bao phủ 71% Trái Đất nhưng chúng ta biết ít hơn về đáy biển sâu so với bề mặt Mặt Trăng!')]),

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
   q('Hành động nào giúp bảo vệ rừng nhiệt đới?', 'Không dùng đồ dùng gỗ không nguồn gốc rõ ràng, ủng hộ bảo tồn rừng', ['Chặt cây có kiểm soát','Không dùng đồ dùng gỗ không nguồn gốc rõ ràng, ủng hộ bảo tồn rừng','Trồng nhiều cây ăn quả','Tưới nước cho rừng'], 'Mỗi người có thể góp phần: tiêu dùng có trách nhiệm, không lãng phí giấy, ủng hộ các tổ chức bảo vệ rừng.')]),

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
   q('Cá voi lưng gù "hát" để làm gì?', 'Giao tiếp, thu hút bạn đời và có thể tạo ra bản đồ âm thanh để định vị', ['Chỉ để vui','Giao tiếp, thu hút bạn đời và có thể tạo ra bản đồ âm thanh để định vị','Để báo nguy hiểm','Không rõ nguyên nhân'], '"Bài hát" cá voi đực có thể kéo dài 20 phút và phát ra ở cường độ 180 decibel — to hơn động cơ máy bay phản lực!')]),

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
   q('Tại sao da ếch cây độc có màu sặc sỡ?', 'Màu sắc cảnh báo kẻ thù "Đừng ăn tôi — tôi cực kỳ độc"', ['Để đẹp hơn','Màu sắc cảnh báo kẻ thù "Đừng ăn tôi — tôi cực kỳ độc"','Để thu hút con mồi','Vì sống trong bóng tối'], 'Trong tự nhiên, màu sắc sặc sỡ thường có nghĩa là "nguy hiểm" — gọi là "cảnh báo màu sắc" (aposematism).')]),

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
  [q('Khủng long sống trên Trái Đất trong bao lâu?', 'Khoảng 165 triệu năm', ['1 triệu năm','165 triệu năm','10 triệu năm','500 triệu năm'], 'So với đó, loài người chỉ tồn tại khoảng 300,000 năm — nhân loại còn rất "non trẻ" so với khủng long!'),
   q('Điều gì gây ra sự tuyệt chủng hàng loạt của khủng long?', 'Thiên thạch khổng lồ đâm vào Trái Đất + núi lửa phun trào', ['Bệnh dịch','Thiên thạch khổng lồ đâm vào Trái Đất + núi lửa phun trào','Lũ lụt toàn cầu','Chúng tự diệt nhau'], 'Thiên thạch 10km tạo mùa đông hạt nhân kéo dài nhiều năm — thực vật chết → động vật ăn cỏ chết → khủng long ăn thịt chết.'),
   q('Con vật nào ngày nay là hậu duệ của khủng long?', 'Chim', ['Cá sấu','Rắn','Chim','Rùa'], 'Chim tiến hóa từ khủng long chân chim (theropod) — T-Rex và gà có quan hệ họ hàng! ADN xác nhận điều này.'),
   q('Compsognathus khủng long nhỏ nhất bằng con gì?', 'Bằng con gà', ['Con voi','Con mèo','Con gà','Con chuột'], 'Compsognathus chỉ nặng khoảng 2 kg và dài 1 mét — chứng tỏ không phải mọi khủng long đều khổng lồ!'),
   q('T-Rex có thể chạy nhanh bao nhiêu?', 'Khoảng 20-25 km/h', ['100 km/h','5 km/h','Khoảng 20-25 km/h','50 km/h'], 'T-Rex không nhanh như phim Jurassic Park mô tả — xe đạp trung bình đã có thể thoát khỏi T-Rex! Nhưng bù lại sức mạnh cắn của nó gấp 3 lần sư tử.')]),

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
   q('Cá lên cạn và trở thành động vật đất liền như thế nào?', 'Qua hàng triệu năm tiến hóa, vây trước cá trở thành chân để bò trên đất', ['Cá đột nhiên mọc chân','Qua hàng triệu năm tiến hóa, vây trước cá trở thành chân để bò trên đất','Cá và thú là loài riêng biệt','Tiến hóa không liên quan cá và thú'], 'Hóa thạch Tiktaalik (375 triệu năm trước) cho thấy cá có vây dày, ngón sơ khai — mắt xích giữa cá và động vật đất liền.')]),

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
   q('Người Neanderthal liên quan đến người hiện đại như thế nào?', 'Đã giao phối với Homo sapiens — người ngoài châu Phi mang 1-4% ADN Neanderthal', ['Là tổ tiên trực tiếp','Đã giao phối với Homo sapiens — người ngoài châu Phi mang 1-4% ADN Neanderthal','Không liên quan gì','Là loài tiến bộ hơn người'], 'Xét nghiệm ADN cho thấy người châu Âu và châu Á có 1-4% gen Neanderthal — bằng chứng hai loài đã sống cùng và có con lai!')]),

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
   q('Điều gì xảy ra với Trái Đất nếu không có núi lửa trong lịch sử?', 'Bầu khí quyển và đại dương sẽ không hình thành như ngày nay', ['Không có gì thay đổi','Bầu khí quyển và đại dương sẽ không hình thành như ngày nay','Trái Đất lạnh hơn','Không có đất liền'], 'Núi lửa thời cổ đại phun ra CO₂, hơi nước và khí khác tạo thành bầu khí quyển đầu tiên của Trái Đất.')]),

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
   q('Nước nào có nhiều động đất nhất?', 'Nhật Bản', ['Mỹ','Trung Quốc','Nhật Bản','Nga'], 'Nhật Bản nằm trên giao điểm của 4 mảng kiến tạo — 10% động đất thế giới xảy ra ở Nhật Bản, với 1,500 trận nhỏ mỗi năm.')]),

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
   q('Tại sao biến đổi khí hậu là vấn đề nghiêm trọng?', 'CO₂ tăng làm hiệu ứng nhà kính mạnh hơn, nhiệt độ tăng gây băng tan, nước biển dâng', ['Trái Đất sẽ nổ','CO₂ tăng làm hiệu ứng nhà kính mạnh hơn, nhiệt độ tăng gây băng tan, nước biển dâng','Mặt Trời bị che khuất','Không khí bị ô nhiễm hóa chất'], 'Nhiệt độ Trái Đất tăng 1.5°C đã gây ra: băng tan, mực nước biển tăng, thời tiết cực đoan thường xuyên hơn.')]),

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
   q('Tại sao nước muối biển không bay hơi thành nước mặn?', 'Khi bay hơi, chỉ phân tử H₂O bay lên, muối ở lại trong nước', ['Muối nặng hơn','Khi bay hơi, chỉ phân tử H₂O bay lên, muối ở lại trong nước','Muối tan vào đất','Gió thổi muối đi'], 'Đây là nguyên lý chưng cất tự nhiên — nước biển bay hơi tạo mây mưa ngọt. Mưa không bao giờ mặn!')]),

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
   q('Hố đen là gì?', 'Vùng không gian có lực hút mạnh đến mức ánh sáng cũng không thoát ra được', ['Lỗ hổng trong vũ trụ','Vùng không gian có lực hút mạnh đến mức ánh sáng cũng không thoát ra được','Ngôi sao đã tắt','Hành tinh màu đen'], 'Hố đen hình thành khi ngôi sao khổng lồ sụp đổ — lực hút của nó nén vật chất đến mật độ vô cùng. Ảnh chụp hố đen đầu tiên công bố năm 2019!')]),

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
   q('Sao biển có khả năng đặc biệt nào?', 'Có thể tái tạo lại tay bị mất — thậm chí tay bị cắt có thể mọc thành sao biển mới', ['Bay được','Có thể tái tạo lại tay bị mất — thậm chí tay bị cắt có thể mọc thành sao biển mới','Bắn nước ra xa','Đổi màu như tắc kè hoa'], 'Khả năng tái sinh của sao biển rất mạnh — một số loài mọc lại hoàn toàn từ chỉ một tay bị cắt ra!')]),

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
   q('Bướm "nếm" bằng bộ phận nào?', 'Bằng chân — gai cảm vị giác trên chân tiếp xúc thức ăn', ['Vòi hút','Râu','Bằng chân — gai cảm vị giác trên chân tiếp xúc thức ăn','Cánh'], 'Khi bướm đậu lên hoa hay trái cây, chân tiếp xúc trực tiếp cho biết ngay đây có ngọt/axit không trước khi hút vòi vào!')]),

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
   q('Tại sao kháng sinh nhiều khi cần uống kèm men vi sinh?', 'Kháng sinh diệt cả vi khuẩn có lợi trong ruột, men vi sinh bổ sung lại', ['Để thuốc ngon hơn','Kháng sinh diệt cả vi khuẩn có lợi trong ruột, men vi sinh bổ sung lại','Để tăng tác dụng kháng sinh','Vì kháng sinh độc'], 'Kháng sinh không phân biệt vi khuẩn tốt/xấu — sau khi uống, cần bổ sung probiotic (men vi sinh) để khôi phục hệ vi sinh đường ruột.')]),

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
   q('Vật nào hấp thụ nhiệt nhất?', 'Vật màu đen', ['Vật màu trắng','Vật màu vàng','Vật màu đen'], 'Màu đen hấp thụ tất cả các bước sóng ánh sáng (và nhiệt) — vì vậy mặc đen nóng hơn mặc trắng khi nắng.')]),

t('sound-waves', 'Âm thanh — Sóng mà tai bắt được',
  ['Âm thanh là sóng dao động của không khí (hoặc chất lỏng, chất rắn).',
   'Âm thanh không truyền được trong chân không — ngoài vũ trụ không có tiếng động!',
   'Tần số cao → âm thanh cao (bổng). Tần số thấp → âm thanh trầm.',
   'Âm thanh truyền trong nước nhanh gấp 4 lần trong không khí (1 480 m/s vs 340 m/s).'],
  'Sấm sét và tia chớp xảy ra cùng lúc — nhưng ta thấy chớp trước, nghe sấm sau vì ánh sáng (300 000 km/s) nhanh hơn âm thanh (0.34 km/s)!',
  [q('Âm thanh có thể truyền qua đâu?', 'Chất khí, chất lỏng và chất rắn — nhưng không qua chân không', ['Chỉ qua không khí','Chỉ qua nước','Chất khí, chất lỏng và chất rắn — nhưng không qua chân không'], 'Âm thanh cần môi trường vật chất để truyền — trong chân không (vũ trụ) không có âm thanh!'),
   q('Tại sao ta thấy chớp trước khi nghe sấm?', 'Ánh sáng nhanh hơn âm thanh rất nhiều', ['Sấm xảy ra sau chớp','Ánh sáng nhanh hơn âm thanh rất nhiều','Tai chúng ta chậm hơn mắt','Sấm đi vòng quanh'], 'Ánh sáng: 300 000 km/s. Âm thanh: 0.34 km/s. Cứ 3 giây giữa chớp và sấm → sét cách bạn khoảng 1 km!'),
   q('Âm thanh truyền nhanh hơn trong môi trường nào?', 'Trong chất rắn (kim loại) nhanh nhất', ['Trong không khí','Trong nước','Trong chất rắn (kim loại) nhanh nhất'], 'Thép: 5 100 m/s. Nước: 1 480 m/s. Không khí: 340 m/s. Vì vậy đặt tai vào đường ray tàu hỏa nghe tiếng tàu sớm hơn!'),
   q('Con vật nào dùng sóng âm để định vị (echolocation)?', 'Dơi và cá voi', ['Chó','Dơi và cá voi','Mèo'], 'Dơi phát ra sóng siêu âm (20 000 Hz+), nghe tiếng vang phản hồi để xác định vị trí con mồi ngay cả trong bóng tối hoàn toàn.')]),

t('magnetism', 'Nam châm — Lực vô hình kỳ diệu',
  ['Nam châm có 2 cực: Bắc (N) và Nam (S). Hai cực khác nhau hút nhau; cùng cực đẩy nhau.',
   'Trái Đất là một nam châm khổng lồ — đó là lý do la bàn hoạt động được.',
   'Trường từ bảo vệ Trái Đất khỏi gió mặt trời (solar wind) — không có nó, sự sống sẽ khó tồn tại.',
   'Máy MRI bệnh viện dùng nam châm siêu mạnh để chụp ảnh nội tạng mà không cần phẫu thuật.'],
  'Chim bồ câu và cá hồi có "la bàn sinh học" trong não — có thể cảm nhận từ trường Trái Đất để tìm đường!',
  [q('Hai cực nam châm nào thì hút nhau?', 'Cực Bắc và Cực Nam (khác cực hút nhau)', ['Cực Bắc và Cực Bắc','Cực Nam và Cực Nam','Cực Bắc và Cực Nam (khác cực hút nhau)'], 'Quy tắc từ trường: khác cực hút, cùng cực đẩy — giống như trong điện học (+ với −).'),
   q('Tại sao la bàn luôn chỉ hướng Bắc?', 'Kim la bàn là nam châm, bị từ trường Trái Đất hút về cực Bắc từ', ['Vì Bắc là hướng Mặt Trời mọc','Kim la bàn là nam châm, bị từ trường Trái Đất hút về cực Bắc từ','Vì quy ước quốc tế','Vì Bắc là hướng cao nhất'], 'Trái Đất có nhân sắt-niken tạo ra từ trường. Cực Bắc từ gần cực Bắc địa lý — đủ để la bàn chỉ hướng đúng.'),
   q('Cực quang (Aurora) hình thành như thế nào?', 'Gió mặt trời tương tác với từ trường Trái Đất, kích thích phân tử không khí phát sáng', ['Ánh sáng mặt trời phản chiếu từ băng tuyết','Gió mặt trời tương tác với từ trường Trái Đất, kích thích phân tử không khí phát sáng','Tia chớp trong khí quyển cực','Ánh sáng phản chiếu từ cực băng'], 'Cực quang (borealis ở Bắc, australis ở Nam) là màn trình diễn ánh sáng kỳ diệu nhất thiên nhiên, thường thấy gần các cực Trái Đất.')]),

t('electricity-static', 'Điện và Tĩnh điện — Bí ẩn của tia sét',
  ['Tĩnh điện hình thành khi electron di chuyển từ vật này sang vật khác khi cọ xát.',
   'Sét là tia tĩnh điện khổng lồ — phóng điện giữa đám mây và mặt đất hoặc giữa hai đám mây.',
   'Điện trong nhà là dòng electron chuyển động có định hướng qua dây dẫn.',
   'Ben Franklin (1752) thả diều trong bão để chứng minh sét là điện — rất nguy hiểm!'],
  'Mỗi giây trên Trái Đất có khoảng 100 tia sét đánh xuống! Sét có thể nóng tới 30 000°C — gấp 5 lần bề mặt Mặt Trời!',
  [q('Tại sao tóc dựng lên khi chải bằng lược nhựa?', 'Cọ xát tạo tĩnh điện — các sợi tóc cùng dấu điện đẩy nhau', ['Vì lược hút tóc','Cọ xát tạo tĩnh điện — các sợi tóc cùng dấu điện đẩy nhau','Vì lược từ tính','Vì tóc khô'], 'Khi chải, electron từ tóc chuyển sang lược → tóc mang điện tích dương, cùng dấu nên đẩy nhau.'),
   q('Cột thu lôi bảo vệ công trình như thế nào?', 'Dẫn điện sét an toàn xuống đất, bảo vệ công trình', ['Ngăn không cho sét hình thành','Dẫn điện sét an toàn xuống đất, bảo vệ công trình','Phản chiếu sét đi nơi khác','Hấp thụ điện sét vào cột'], 'Cột thu lôi (Benjamin Franklin phát minh) là cột kim loại nhọn nối dây đất — sét ưu tiên đi qua đường dẫn điện tốt nhất.'),
   q('Vật nào dẫn điện tốt nhất?', 'Bạc, đồng, vàng (kim loại)', ['Nhựa','Cao su','Bạc, đồng, vàng (kim loại)'], 'Kim loại có nhiều electron tự do dễ di chuyển → dẫn điện tốt. Đồng phổ biến vì rẻ hơn bạc/vàng nhưng vẫn dẫn điện rất tốt.')]),

t('gravity-forces', 'Trọng lực và Lực — Tại sao mọi thứ đều rơi?',
  ['Trọng lực (gravity) là lực hút giữa hai vật có khối lượng — Trái Đất hút mọi vật về phía nó.',
   'Newton phát hiện trọng lực khi thấy quả táo rơi (khoảng 1666).',
   'Mặt Trăng quay quanh Trái Đất do trọng lực — không có nó Mặt Trăng sẽ bay thẳng ra ngoài vũ trụ.',
   'Trên Mặt Trăng, trọng lực chỉ bằng 1/6 Trái Đất — con người có thể nhảy cao gấp 6 lần!'],
  'Nếu không có không khí, lông chim và viên đạn rơi cùng tốc độ! (Galileo chứng minh tại Tháp nghiêng Pisa)',
  [q('Tại sao mọi vật đều rơi xuống?', 'Vì Trái Đất có trọng lực hút mọi vật về phía nó', ['Vì không khí đẩy xuống','Vì Trái Đất có trọng lực hút mọi vật về phía nó','Vì vật nặng hơn không khí','Vì gió thổi'], 'Trọng lực tỷ lệ với khối lượng — Trái Đất khổng lồ nên hút tất cả mọi thứ xung quanh nó.'),
   q('Trên Mặt Trăng, con người nặng hơn hay nhẹ hơn?', 'Nhẹ hơn — chỉ bằng 1/6 khối lượng trên Trái Đất', ['Nặng hơn vì gần không khí hơn','Nhẹ hơn — chỉ bằng 1/6 khối lượng trên Trái Đất','Bằng nhau','Không có khối lượng'], 'Khối lượng không đổi, nhưng trọng lượng (lực hút) thay đổi. Trên Mặt Trăng, người 60 kg chỉ "nặng" 10 kg!'),
   q('Tại sao phi hành gia nổi lơ lửng trên trạm vũ trụ?', 'Họ đang rơi tự do quanh Trái Đất — gọi là trạng thái không trọng lực', ['Vì không có không khí','Họ đang rơi tự do quanh Trái Đất — gọi là trạng thái không trọng lực','Vì xa Mặt Trời','Vì trạm có máy triệt trọng lực'], 'Trạm vũ trụ quay quanh Trái Đất ở tốc độ 28 000 km/h — cả trạm và người đều "rơi" cùng tốc độ nên cảm giác không trọng lực!'),
   q('Ai phát hiện ra lực hút trái đất?', 'Isaac Newton (khoảng 1666)', ['Albert Einstein','Galileo Galilei','Isaac Newton (khoảng 1666)'], 'Newton quan sát quả táo rơi và đặt câu hỏi: nếu Trái Đất kéo quả táo, có phải nó cũng kéo Mặt Trăng? → Phát hiện ra vạn vật hấp dẫn.')]),

t('states-of-matter', 'Ba trạng thái của vật chất — Rắn, Lỏng, Khí',
  ['Vật chất tồn tại ở 3 trạng thái chính: rắn (phân tử xếp chặt), lỏng (lỏng lẻo hơn), khí (phân tử chuyển động tự do).',
   'Nhiệt độ quyết định trạng thái: đun nóng → rắn→lỏng→khí; làm lạnh → ngược lại.',
   'Nước là ví dụ kỳ diệu: tồn tại cả 3 dạng trong tự nhiên — băng, nước, hơi nước.',
   'Plasma (plasma) là "trạng thái thứ 4" — khí bị ion hóa cực nóng, tồn tại trong mặt trời và sét.'],
  'Không khí xung quanh ta gồm 78% Nitrogen (N₂) và 21% Oxygen (O₂) — những phân tử vô hình đang nảy xung quanh ta hàng tỉ lần mỗi giây!',
  [q('Khi đun nóng nước, nó chuyển sang trạng thái gì?', 'Khí (hơi nước)', ['Rắn','Plasma','Khí (hơi nước)'], 'Nước sôi ở 100°C (ở mực nước biển) → chuyển thành hơi nước. Trên núi cao, nước sôi dưới 100°C vì áp suất thấp hơn!'),
   q('Băng nổi trên nước vì lý do gì?', 'Phân tử nước ở dạng đặc (băng) xếp thành cấu trúc mạng hở, nhẹ hơn nước lỏng', ['Vì băng nhẹ hơn','Phân tử nước ở dạng đặc (băng) xếp thành cấu trúc mạng hở, nhẹ hơn nước lỏng','Vì nhiệt nổi lên','Vì áp suất nước'], 'Nước là chất hiếm khi đông đặc lại NỔI — hầu hết chất khác đông cứng thì chìm. Điều này rất quan trọng: băng nổi bảo vệ sinh vật dưới nước mùa đông!'),
   q('Trạng thái nào của vật chất có hình dạng và thể tích cố định?', 'Chất rắn', ['Chất lỏng','Chất khí','Chất rắn'], 'Chất rắn: phân tử liên kết chặt → hình dạng cố định. Chất lỏng: hình dạng theo vật chứa. Chất khí: lấp đầy toàn bộ không gian.'),
   q('Tại sao nước bốc hơi ngay cả khi chưa sôi?', 'Các phân tử nước có đủ năng lượng để thoát ra khỏi bề mặt bất kỳ lúc nào', ['Chỉ sôi mới bốc hơi','Vì nhiệt độ môi trường cao hơn 100°C','Các phân tử nước có đủ năng lượng để thoát ra khỏi bề mặt bất kỳ lúc nào','Vì áp suất'], 'Bay hơi (evaporation) khác sôi (boiling): bay hơi xảy ra ở mọi nhiệt độ khi phân tử đủ nhanh để thoát bề mặt. Đó là lý do quần áo phơi khô!')]),

t('human-brain', 'Não người — Siêu máy tính sinh học',
  ['Não người nặng ~1.4 kg nhưng chứa ~86 tỷ tế bào thần kinh (neuron).',
   'Mỗi neuron có thể kết nối với 10 000 neuron khác → số kết nối = hơn số ngôi sao trong dải Ngân Hà!',
   'Não tiêu thụ ~20% năng lượng của cơ thể dù chỉ chiếm 2% khối lượng.',
   'Trong khi ngủ, não vẫn hoạt động: củng cố ký ức, loại bỏ chất thải, tái tạo tế bào.'],
  'Cảm giác "ngứa" trong đầu khi nghe một giai điệu quen = neuron âm nhạc kích hoạt lại ký ức — não thật sự "replay" âm nhạc!',
  [q('Não người có bao nhiêu tế bào thần kinh?', 'Khoảng 86 tỷ neuron', ['Khoảng 1 triệu','Khoảng 86 tỷ neuron','Khoảng 1 nghìn tỷ','Khoảng 1 tỷ'], 'Con số này ấn tượng nhưng số KẾT NỐI (synapse) giữa chúng mới thực sự choáng ngợp: ước tính 100 nghìn tỷ kết nối!'),
   q('Tại sao ngủ đủ giấc quan trọng cho việc học?', 'Khi ngủ, não củng cố ký ức và chuyển thông tin từ ký ức ngắn hạn sang dài hạn', ['Vì não không hoạt động khi ngủ nên cần nghỉ','Khi ngủ, não củng cố ký ức và chuyển thông tin từ ký ức ngắn hạn sang dài hạn','Vì mắt nghỉ ngơi','Vì cơ thể cần năng lượng'], 'Hippocampus (hải mã) trong não "phát lại" các sự kiện trong ngày lúc ngủ sâu, giúp chuyển thông tin vào ký ức dài hạn.'),
   q('Não phải và não trái kiểm soát điều gì?', 'Não trái: ngôn ngữ, logic. Não phải: sáng tạo, âm nhạc, không gian', ['Não trái: cảm xúc, não phải: lý trí','Não trái: ngôn ngữ, logic. Não phải: sáng tạo, âm nhạc, không gian','Hai bán cầu giống hệt nhau','Não phải kiểm soát hết'], 'Não là cơ quan chéo: bán cầu trái điều khiển nửa phải cơ thể và ngược lại. 90% người thuận tay phải có trung tâm ngôn ngữ ở não TRÁI.'),
   q('Não tiêu thụ bao nhiêu phần trăm năng lượng cơ thể?', 'Khoảng 20% dù chỉ chiếm 2% khối lượng', ['Khoảng 5%','Khoảng 50%','Khoảng 20% dù chỉ chiếm 2% khối lượng'], 'Não cần nhiều oxy và glucose liên tục — mất máu não 4 phút là có thể gây tổn thương không phục hồi được!')]),

t('microbes-germs', 'Vi khuẩn và Virus — Thế giới vô hình xung quanh ta',
  ['Vi khuẩn: sinh vật đơn bào không có nhân, sống khắp nơi — đất, nước, cơ thể người.',
   'Virus: không phải tế bào — chỉ là vỏ protein chứa DNA/RNA, cần tế bào chủ để sinh sản.',
   'Không phải vi khuẩn đều có hại — 90% vi khuẩn trong cơ thể ta là có lợi hoặc vô hại.',
   'Kháng sinh giết vi khuẩn nhưng KHÔNG giết virus — cảm cúm do virus nên không dùng kháng sinh!'],
  '1 ml nước biển chứa tới 1 triệu vi khuẩn! Và trên bàn tay chưa rửa có thể có hàng triệu vi khuẩn các loại.',
  [q('Tại sao kháng sinh không trị được cúm?', 'Cúm do virus gây ra; kháng sinh chỉ tác dụng với vi khuẩn', ['Vì virus mạnh hơn vi khuẩn','Cúm do virus gây ra; kháng sinh chỉ tác dụng với vi khuẩn','Vì cần liều cao hơn','Vì virus ẩn trong nhân tế bào'], 'Dùng kháng sinh sai sẽ: (1) không có tác dụng, (2) tạo vi khuẩn kháng kháng sinh — một trong những vấn đề y tế nghiêm trọng nhất hiện nay.'),
   q('Vi khuẩn và virus khác nhau thế nào?', 'Vi khuẩn là tế bào sống; virus không phải tế bào, chỉ là vật liệu di truyền bọc protein', ['Đều là tế bào nhưng kích thước khác','Vi khuẩn là tế bào sống; virus không phải tế bào, chỉ là vật liệu di truyền bọc protein','Virus lớn hơn vi khuẩn','Chỉ khác ở màu sắc'], 'Virus nhỏ hơn vi khuẩn 100 lần. Đại dịch COVID-19 do virus SARS-CoV-2 — một hạt nhỏ 0.1 micromet, nhỏ hơn 1/1000 đường kính sợi tóc!'),
   q('Cơ chế nào giúp cơ thể nhận ra và chống lại mầm bệnh?', 'Hệ miễn dịch: bạch cầu, kháng thể nhận diện và tiêu diệt mầm bệnh', ['Tim phổi lọc máu','Gan giải độc','Hệ miễn dịch: bạch cầu, kháng thể nhận diện và tiêu diệt mầm bệnh'], 'Vaccine "dạy" hệ miễn dịch nhận diện mầm bệnh trước — khi gặp thật, cơ thể đã sẵn sàng phản ứng nhanh!'),
   q('Penicillin (kháng sinh đầu tiên) được phát hiện như thế nào?', 'Alexander Fleming tình cờ thấy nấm mốc giết vi khuẩn trong đĩa cấy (1928)', ['Tổng hợp hóa học từ đầu','Alexander Fleming tình cờ thấy nấm mốc giết vi khuẩn trong đĩa cấy (1928)','Chiết xuất từ cây thuốc','Thí nghiệm có kế hoạch'], 'Khám phá tình cờ vĩ đại nhất lịch sử y học: Fleming quên đĩa cấy đi nghỉ, về thấy nấm mốc Penicillium đã giết sạch vi khuẩn xung quanh nó!')]),

t('genetics-dna', 'DNA và Di truyền — Bản thiết kế của sự sống',
  ['DNA (Axit deoxyribonucleic) là phân tử mang toàn bộ thông tin di truyền của sinh vật.',
   'DNA có dạng xoắn kép — như cái thang xoắn. Mỗi "bậc thang" là một cặp nucleotide.',
   'Nếu kéo thẳng DNA trong 1 tế bào người ra → dài khoảng 2 mét! Toàn bộ cơ thể: 150 tỷ km!',
   'Gen là đoạn DNA mã hóa để tạo ra protein — protein xây dựng và điều khiển mọi thứ trong cơ thể.'],
  'Con người và tinh tinh có DNA giống nhau tới 98.7%! Con người và chuối có DNA giống 60%!',
  [q('DNA có hình dạng gì?', 'Xoắn kép (double helix) — như cái thang xoắn', ['Vòng tròn','Tam giác','Xoắn kép (double helix) — như cái thang xoắn'], 'Watson và Crick (1953) phát hiện cấu trúc xoắn kép của DNA — một trong những khám phá khoa học quan trọng nhất thế kỷ 20.'),
   q('DNA được tìm thấy ở đâu trong tế bào?', 'Trong nhân tế bào (nucleus)', ['Trong màng tế bào','Trong nhân tế bào (nucleus)','Ngoài tế bào'], 'DNA được cuộn chặt thành nhiễm sắc thể (chromosome) bên trong nhân. Con người có 46 nhiễm sắc thể (23 cặp).'),
   q('Tại sao con cái giống cha mẹ?', 'Di truyền gen: nhận 50% DNA từ bố, 50% từ mẹ', ['Vì sống cùng môi trường','Di truyền gen: nhận 50% DNA từ bố, 50% từ mẹ','Vì ăn cùng thức ăn','Vì học hỏi từ cha mẹ'], 'Mỗi người nhận 23 nhiễm sắc thể từ tinh trùng bố + 23 từ trứng mẹ = 46 nhiễm sắc thể → đây là lý do bạn vừa giống bố vừa giống mẹ!'),
   q('Con người và tinh tinh có DNA giống nhau bao nhiêu phần trăm?', '98.7%', ['70%','98.7%','50%'], 'Điều này cho thấy chúng ta có tổ tiên chung với tinh tinh khoảng 6 triệu năm trước. Sự khác biệt nhỏ trong DNA tạo ra sự khác biệt lớn về thể chất và trí tuệ!')]),

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
   q('Tại sao Sao Diêm Vương không còn là hành tinh?', 'Năm 2006, IAU phân loại lại thành "hành tinh lùn" vì chưa dọn sạch quỹ đạo', ['Vì quá nhỏ','Năm 2006, IAU phân loại lại thành "hành tinh lùn" vì chưa dọn sạch quỹ đạo','Vì quá xa','Vì không có vệ tinh'], 'Theo định nghĩa 2006: hành tinh phải (1) quay quanh Mặt Trời, (2) đủ khối lượng để hình cầu, (3) dọn sạch quỹ đạo. Sao Diêm Vương thiếu điều kiện 3.')]),

t('stars-black-holes', 'Sao và Lỗ đen — Vũ trụ vô tận',
  ['Mặt Trời là một ngôi sao bình thường — ở giữa vòng đời, còn khoảng 5 tỷ năm nữa mới "chết".',
   'Các ngôi sao sinh ra từ đám mây khí và bụi (tinh vân), sống hàng triệu đến hàng tỷ năm.',
   'Lỗ đen (black hole): vật chất cực kỳ đặc, lực hút mạnh đến nỗi ánh sáng cũng không thoát được.',
   'Vũ trụ có khoảng 2 nghìn tỷ thiên hà, mỗi thiên hà có hàng trăm tỷ ngôi sao!'],
  'Ánh sáng từ các ngôi sao ta nhìn thấy đêm nay xuất phát từ hàng ngàn năm trước — ta đang nhìn vào quá khứ của vũ trụ!',
  [q('Tại sao các ngôi sao nhấp nháy?', 'Ánh sáng qua các lớp khí quyển không đều của Trái Đất bị bẻ cong liên tục', ['Vì sao thực sự nhấp nháy','Ánh sáng qua các lớp khí quyển không đều của Trái Đất bị bẻ cong liên tục','Vì sao đang quay','Vì kính mắt yếu'], 'Ngoài không gian, sao không nhấp nháy! Telescope Hubble chụp ảnh sao sắc nét vì ở trên khí quyển. Trên Trái Đất, không khí chuyển động làm ánh sáng "rung".'),
   q('Lỗ đen là gì?', 'Vùng không gian với lực hút cực mạnh, kể cả ánh sáng cũng không thoát ra được', ['Lỗ hổng trong vũ trụ','Vùng không gian với lực hút cực mạnh, kể cả ánh sáng cũng không thoát ra được','Sao tắt','Hành tinh đặc'], 'Lỗ đen hình thành khi ngôi sao khổng lồ nổ (supernova) rồi sụp vào chính nó. Ranh giới gọi là "chân trời sự kiện" (event horizon) — qua đó không gì thoát ra được.'),
   q('Mặt Trời sẽ thế nào sau khoảng 5 tỷ năm nữa?', 'Phồng thành "sao khổng lồ đỏ" nuốt Trái Đất, rồi co lại thành "sao lùn trắng"', ['Nổ thành lỗ đen','Tắt lạnh đột ngột','Phồng thành "sao khổng lồ đỏ" nuốt Trái Đất, rồi co lại thành "sao lùn trắng"'], 'Các sao cỡ Mặt Trời không đủ khối lượng để thành lỗ đen. Cuối đời chúng trở thành sao lùn trắng — cực đặc, cỡ Trái Đất nhưng nặng bằng Mặt Trời.'),
   q('Tại sao đêm nhìn sao ta thực ra nhìn vào quá khứ?', 'Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới tới Trái Đất', ['Vì kính thiên văn chỉnh ngược thời gian','Ánh sáng từ sao mất hàng năm đến hàng triệu năm mới tới Trái Đất','Vì não người xử lý chậm','Vì sao đã di chuyển'], 'Sao Sirius (sao sáng nhất đêm) cách 8.6 năm ánh sáng — ánh sáng ta thấy xuất phát từ năm 2017! Sao Andromeda: 2.5 triệu năm ánh sáng — ta nhìn nó từ thời người tiền sử!')]),

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
];
