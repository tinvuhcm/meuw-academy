const TEACHER = 'Thầy Gâu lùn';

function buildTopic({ topicKey, title, introTitle, introPoints, example, facts }) {
  return {
    topicKey,
    subject: 'sci',
    title,
    lessonBlocks: [{
      type: introPoints.length > 2 ? 'mini' : 'micro',
      teacherName: TEACHER,
      title: introTitle,
      points: introPoints,
      example,
    }],
    facts,
  };
}

export const MORE_SCIENCE_TOPICS = [
  buildTopic({
    topicKey: 'sci:human-senses',
    title: 'Khoa Học: Năm giác quan',
    introTitle: 'Năm giác quan giúp con người nhận biết thế giới xung quanh',
    introPoints: ['Mắt nhìn, tai nghe, mũi ngửi, lưỡi nếm, da cảm nhận.', 'Các giác quan gửi thông tin về não để não xử lý.'],
    example: 'Nhờ mắt và tai, em có thể vừa nhìn thấy xe vừa nghe tiếng còi.',
    facts: [
      { q: 'Giác quan nào giúp chúng ta nhìn thấy màu sắc?', ans: 'Mắt', options: ['Mắt', 'Tai', 'Mũi', 'Da'], statement: 'Mắt giúp con người nhìn thấy ánh sáng và màu sắc.', explanation: 'Nhờ mắt, chúng ta nhận ra hình dạng, màu sắc và chuyển động của đồ vật.' },
      { q: 'Giác quan nào giúp nghe tiếng chim hót?', ans: 'Tai', options: ['Tai', 'Lưỡi', 'Da', 'Mũi'], statement: 'Tai giúp nghe âm thanh.', explanation: 'Âm thanh truyền tới tai và được não xử lý để chúng ta nhận biết.' },
      { q: 'Mũi có vai trò gì?', ans: 'Ngửi mùi', options: ['Ngửi mùi', 'Nhìn màu', 'Nếm vị', 'Đo nhiệt độ'], statement: 'Mũi giúp nhận biết mùi hương hoặc mùi khó chịu.', explanation: 'Mũi giúp phân biệt mùi thơm của hoa và mùi khét của đồ bị cháy.' },
      { q: 'Lưỡi giúp chúng ta làm gì?', ans: 'Nếm vị thức ăn', options: ['Nếm vị thức ăn', 'Nhìn đường', 'Nghe nhạc', 'Chạm đồ vật'], statement: 'Lưỡi giúp nhận biết vị của thức ăn.', explanation: 'Lưỡi có thể nhận ra vị ngọt, mặn, chua và đắng.' },
      { q: 'Da giúp cơ thể cảm nhận điều gì?', ans: 'Nóng, lạnh và sự chạm vào', options: ['Nóng, lạnh và sự chạm vào', 'Màu sắc', 'Tiếng nhạc', 'Mùi thơm'], statement: 'Da giúp cảm nhận nóng, lạnh và sự chạm vào.', explanation: 'Nhờ da, em biết nước đang ấm hay lạnh và đồ vật đang nhẵn hay sần.' },
      { q: 'Giác quan nào gửi thông tin về não để não xử lý?', ans: 'Tất cả các giác quan', options: ['Chỉ mắt', 'Chỉ tai', 'Tất cả các giác quan', 'Chỉ mũi'], statement: 'Tất cả các giác quan đều gửi thông tin về não.', explanation: 'Não là nơi tổng hợp thông tin từ các giác quan để giúp chúng ta hiểu điều đang xảy ra.' },
    ],
  }),
  buildTopic({
    topicKey: 'sci:teeth-care',
    title: 'Khoa Học: Răng và chăm sóc răng',
    introTitle: 'Răng giúp nhai thức ăn và giữ nụ cười khỏe đẹp',
    introPoints: ['Răng sữa sẽ được thay bằng răng vĩnh viễn.', 'Chăm sóc răng tốt giúp tránh sâu răng và đau nhức.'],
    example: 'Đánh răng sau khi ăn và trước khi ngủ là thói quen rất quan trọng.',
    facts: [
      { q: 'Răng giúp chúng ta làm gì?', ans: 'Nhai thức ăn', options: ['Nhai thức ăn', 'Nghe nhạc', 'Nhìn chữ', 'Giữ thăng bằng'], statement: 'Răng giúp cắn và nhai thức ăn.', explanation: 'Nhờ răng, thức ăn được nghiền nhỏ hơn trước khi vào dạ dày.' },
      { q: 'Nên đánh răng khi nào?', ans: 'Sau khi ăn và trước khi ngủ', options: ['Sau khi ăn và trước khi ngủ', 'Chỉ một lần mỗi tuần', 'Chỉ khi đau răng', 'Khi đang ngủ'], statement: 'Đánh răng sau khi ăn và trước khi ngủ giúp răng sạch hơn.', explanation: 'Đó là lúc cần làm sạch mảng bám và thức ăn còn sót lại trên răng.' },
      { q: 'Ăn quá nhiều kẹo ngọt dễ gây gì?', ans: 'Sâu răng', options: ['Sâu răng', 'Răng dài ra', 'Răng đổi màu xanh', 'Mọc thêm tai'], statement: 'Ăn quá nhiều đồ ngọt dễ gây sâu răng.', explanation: 'Vi khuẩn dùng đường để tạo axit làm hại men răng.' },
      { q: 'Loại bàn chải nào phù hợp với trẻ em?', ans: 'Bàn chải mềm vừa miệng', options: ['Bàn chải mềm vừa miệng', 'Bàn chải bằng kim loại', 'Bàn chải quá to', 'Không cần bàn chải'], statement: 'Bàn chải mềm vừa miệng phù hợp hơn cho trẻ em.', explanation: 'Bàn chải mềm giúp làm sạch mà ít làm đau lợi hơn.' },
      { q: 'Khi răng đau kéo dài, em nên làm gì?', ans: 'Đi khám nha sĩ', options: ['Đi khám nha sĩ', 'Không nói với ai', 'Ăn nhiều kẹo hơn', 'Tự nhổ răng'], statement: 'Khi đau răng kéo dài, nên đi khám nha sĩ.', explanation: 'Nha sĩ sẽ kiểm tra và giúp xử lý đúng cách, an toàn hơn.' },
      { q: 'Răng vĩnh viễn có ý nghĩa gì?', ans: 'Là răng thay cho răng sữa và cần giữ thật tốt', options: ['Là răng thay cho răng sữa và cần giữ thật tốt', 'Là răng có thể mọc lại mãi', 'Là răng chỉ dùng để cắn táo', 'Là răng của người lớn tuổi'], statement: 'Răng vĩnh viễn thay cho răng sữa và cần được giữ gìn cẩn thận.', explanation: 'Khi răng vĩnh viễn bị hỏng, việc điều trị sẽ khó hơn nên cần chăm sóc kỹ.' },
    ],
  }),
  buildTopic({
    topicKey: 'sci:birds-nests',
    title: 'Khoa Học: Chim và tổ chim',
    introTitle: 'Chim có nhiều cách bay, kiếm ăn và làm tổ khác nhau',
    introPoints: ['Mỏ và chân chim thay đổi theo thức ăn và nơi sống.', 'Tổ chim giúp giữ trứng và nuôi chim non an toàn hơn.'],
    example: 'Chim sẻ nhặt cỏ khô và cành nhỏ để làm tổ.',
    facts: [
      { q: 'Tổ chim dùng để làm gì?', ans: 'Giữ trứng và nuôi chim non', options: ['Giữ trứng và nuôi chim non', 'Làm thuyền', 'Tạo bóng điện', 'Đựng nước biển'], statement: 'Tổ chim giúp giữ trứng và nuôi chim non an toàn hơn.', explanation: 'Nhiều loài chim làm tổ trên cây, trong bụi hoặc trên vách đá.' },
      { q: 'Mỏ chim giúp ích gì?', ans: 'Giúp kiếm và ăn thức ăn', options: ['Giúp kiếm và ăn thức ăn', 'Giúp mọc lá', 'Giúp phát sáng', 'Giúp bơi như cá'], statement: 'Mỏ chim giúp chim kiếm và ăn thức ăn.', explanation: 'Mỗi loại mỏ phù hợp với một kiểu thức ăn khác nhau.' },
      { q: 'Vì sao không nên phá tổ chim?', ans: 'Vì có thể làm chim mất nơi ở và mất trứng', options: ['Vì có thể làm chim mất nơi ở và mất trứng', 'Vì tổ làm bằng kim loại', 'Vì tổ không bao giờ nằm trên cây', 'Vì chim không biết bay'], statement: 'Phá tổ chim có thể làm chim mất nơi ở và mất trứng.', explanation: 'Tổ chim rất quan trọng cho việc sinh sản và nuôi con của loài chim.' },
      { q: 'Loài chim nào nổi tiếng biết bắt chước tiếng nói?', ans: 'Vẹt', options: ['Vẹt', 'Đà điểu', 'Chim cút', 'Ngỗng'], statement: 'Vẹt nổi tiếng với khả năng bắt chước âm thanh.', explanation: 'Một số con vẹt có thể bắt chước tiếng người hoặc các âm thanh quen thuộc.' },
      { q: 'Chim non cần gì để lớn lên?', ans: 'Thức ăn, sự ấm áp và chăm sóc', options: ['Thức ăn, sự ấm áp và chăm sóc', 'Chỉ cần mưa', 'Chỉ cần ngủ cả ngày', 'Không cần bố mẹ'], statement: 'Chim non cần thức ăn, sự ấm áp và chăm sóc của chim bố mẹ.', explanation: 'Chim bố mẹ thường mớm mồi và che chở cho chim non khi chúng còn yếu.' },
      { q: 'Cánh chim giúp chim làm gì?', ans: 'Bay và giữ thăng bằng', options: ['Bay và giữ thăng bằng', 'Đào đất', 'Nhai thức ăn', 'Ngửi mùi'], statement: 'Cánh giúp chim bay và giữ thăng bằng trên không.', explanation: 'Nhờ cánh và lông, chim có thể lượn, vỗ cánh và đổi hướng khi bay.' },
    ],
  }),
  buildTopic({
    topicKey: 'sci:recycling',
    title: 'Khoa Học: Tái chế quanh em',
    introTitle: 'Tái chế giúp giảm rác và tiết kiệm tài nguyên',
    introPoints: ['Không phải mọi loại rác đều nên bỏ chung với nhau.', 'Phân loại rác đúng là bước đầu để tái chế hiệu quả.'],
    example: 'Chai nhựa sạch có thể được thu gom để làm ra đồ vật mới.',
    facts: [
      { q: 'Tái chế là gì?', ans: 'Biến vật đã dùng thành vật liệu hoặc đồ dùng mới', options: ['Biến vật đã dùng thành vật liệu hoặc đồ dùng mới', 'Đốt mọi thứ đi', 'Giấu rác xuống đất', 'Để rác ngoài đường'], statement: 'Tái chế là biến vật đã dùng thành vật liệu hoặc đồ dùng mới.', explanation: 'Tái chế giúp giảm lượng rác và tận dụng lại tài nguyên đã có.' },
      { q: 'Vì sao nên phân loại rác?', ans: 'Để dễ tái chế và xử lý đúng cách', options: ['Để dễ tái chế và xử lý đúng cách', 'Để rác nặng hơn', 'Để làm rác bẩn hơn', 'Để không cần thùng rác'], statement: 'Phân loại rác giúp việc tái chế và xử lý đúng cách dễ hơn.', explanation: 'Mỗi loại rác có thể cần một cách xử lý khác nhau.' },
      { q: 'Chai nhựa sạch có thể làm gì?', ans: 'Được thu gom để tái chế', options: ['Được thu gom để tái chế', 'Luôn phải vứt xuống sông', 'Phải đốt ngay trong nhà', 'Không bao giờ dùng lại được'], statement: 'Chai nhựa sạch có thể được thu gom để tái chế.', explanation: 'Nhiều loại chai nhựa có thể được xử lý để tạo thành vật liệu mới.' },
      { q: 'Giấy đã dùng một mặt nên làm gì trước khi bỏ?', ans: 'Xem có thể tận dụng lại mặt còn trống không', options: ['Xem có thể tận dụng lại mặt còn trống không', 'Xé vụn ngay', 'Ngâm nước', 'Ném ra cửa sổ'], statement: 'Giấy dùng một mặt có thể tận dụng mặt còn trống trước khi bỏ.', explanation: 'Dùng tiết kiệm là cách giảm rác ngay từ đầu.' },
      { q: 'Thói quen nào tốt cho môi trường?', ans: 'Mang chai nước cá nhân', options: ['Mang chai nước cá nhân', 'Dùng nhiều đồ nhựa dùng một lần', 'Vứt pin vào thùng rác thường', 'Mở vòi nước suốt ngày'], statement: 'Mang chai nước cá nhân là thói quen tốt cho môi trường.', explanation: 'Nó giúp giảm bớt ly và chai dùng một lần.' },
      { q: 'Rác điện tử như pin cũ cần xử lý thế nào?', ans: 'Bỏ đúng nơi thu gom riêng', options: ['Bỏ đúng nơi thu gom riêng', 'Ném xuống hồ', 'Cho vào cơm', 'Chôn dưới gốc cây'], statement: 'Pin cũ và rác điện tử cần bỏ đúng nơi thu gom riêng.', explanation: 'Một số thành phần trong pin có thể gây hại nếu xử lý sai cách.' },
    ],
  }),
  buildTopic({
    topicKey: 'sci:moon-phases',
    title: 'Khoa Học: Mặt Trăng thay đổi hình dạng',
    introTitle: 'Mặt Trăng không đổi hình, nhưng phần sáng ta nhìn thấy thay đổi',
    introPoints: ['Mặt Trăng phản chiếu ánh sáng Mặt Trời.', 'Khi vị trí thay đổi, ta thấy phần sáng khác nhau.'],
    example: 'Có đêm trăng tròn, có đêm chỉ thấy một mảnh trăng cong.',
    facts: [
      { q: 'Vì sao hình trăng ta thấy thay đổi theo đêm?', ans: 'Vì phần sáng nhìn thấy thay đổi', options: ['Vì phần sáng nhìn thấy thay đổi', 'Vì Mặt Trăng tự xé nhỏ mình', 'Vì có mây cắt bớt trăng mỗi ngày', 'Vì Trái Đất phát sáng'], statement: 'Hình trăng thay đổi vì phần sáng ta nhìn thấy thay đổi.', explanation: 'Mặt Trăng không tự phát sáng mà phản chiếu ánh sáng Mặt Trời.' },
      { q: 'Khi trăng tròn, ta thấy gì?', ans: 'Gần như toàn bộ mặt sáng của Mặt Trăng', options: ['Gần như toàn bộ mặt sáng của Mặt Trăng', 'Không thấy trăng', 'Chỉ thấy một chấm nhỏ', 'Thấy Mặt Trời vào ban đêm'], statement: 'Khi trăng tròn, ta thấy gần như toàn bộ mặt sáng của Mặt Trăng.', explanation: 'Đó là lúc phần sáng hướng về phía Trái Đất nhiều nhất.' },
      { q: 'Mặt Trăng sáng vì sao?', ans: 'Vì phản chiếu ánh sáng Mặt Trời', options: ['Vì phản chiếu ánh sáng Mặt Trời', 'Vì tự đốt lửa', 'Vì có bóng đèn', 'Vì làm bằng vàng'], statement: 'Mặt Trăng sáng vì phản chiếu ánh sáng Mặt Trời.', explanation: 'Ánh sáng từ Mặt Trời chiếu vào Mặt Trăng rồi phản xạ tới mắt chúng ta.' },
      { q: 'Có đêm chỉ thấy một phần mỏng của trăng gọi là gì?', ans: 'Trăng lưỡi liềm', options: ['Trăng lưỡi liềm', 'Mặt Trăng cháy', 'Trăng vuông', 'Trăng mưa'], statement: 'Khi chỉ thấy một phần cong mỏng, ta thường gọi là trăng lưỡi liềm.', explanation: 'Đó là một dạng quen thuộc trong các pha của Mặt Trăng.' },
      { q: 'Mặt Trăng quay quanh ai?', ans: 'Quanh Trái Đất', options: ['Quanh Trái Đất', 'Quanh Sao Hỏa', 'Quanh cây phượng', 'Quanh biển'], statement: 'Mặt Trăng quay quanh Trái Đất.', explanation: 'Vì vậy vị trí giữa Mặt Trời, Trái Đất và Mặt Trăng luôn thay đổi.' },
      { q: 'Quan sát pha Mặt Trăng giúp bé học điều gì?', ans: 'Hiểu bầu trời thay đổi theo quy luật', options: ['Hiểu bầu trời thay đổi theo quy luật', 'Biết cây nói chuyện', 'Làm trăng đứng yên', 'Ngăn mưa rơi'], statement: 'Quan sát pha Mặt Trăng giúp hiểu bầu trời thay đổi theo quy luật.', explanation: 'Khoa học bắt đầu từ việc quan sát đều đặn và nhận ra quy luật.' },
    ],
  }),
  buildTopic({
    topicKey: 'sci:bridges-and-forces',
    title: 'Khoa Học: Cầu và lực đỡ',
    introTitle: 'Cầu bền là nhờ nhiều bộ phận cùng chịu lực',
    introPoints: ['Vật muốn đứng vững cần có lực đỡ phù hợp.', 'Kỹ sư phải nghĩ cách phân bố lực để công trình an toàn.'],
    example: 'Chiếc bàn đứng vững nhờ mặt bàn và các chân bàn cùng đỡ trọng lượng đồ vật.',
    facts: [
      { q: 'Vì sao cây cầu cần trụ đỡ chắc?', ans: 'Để chịu trọng lượng và giữ cầu an toàn', options: ['Để chịu trọng lượng và giữ cầu an toàn', 'Để cầu biết bơi', 'Để làm cầu đổi màu', 'Để cầu mọc lá'], statement: 'Trụ đỡ chắc giúp cầu chịu trọng lượng và an toàn hơn.', explanation: 'Cầu phải chịu sức nặng của chính nó và của xe cộ, người đi qua.' },
      { q: 'Lực đỡ có tác dụng gì?', ans: 'Giúp vật không bị đổ hoặc rơi', options: ['Giúp vật không bị đổ hoặc rơi', 'Làm vật phát sáng', 'Làm nước mặn hơn', 'Biến giấy thành đá'], statement: 'Lực đỡ giúp vật không bị đổ hoặc rơi.', explanation: 'Bàn, ghế, kệ sách đều cần lực đỡ để giữ đồ vật ở đúng vị trí.' },
      { q: 'Kỹ sư xây cầu cần quan tâm điều gì?', ans: 'Cách phân bố lực và độ chắc chắn', options: ['Cách phân bố lực và độ chắc chắn', 'Màu của mây', 'Mùi của nước biển', 'Số lá trên cây'], statement: 'Kỹ sư cần tính cách phân bố lực và độ chắc chắn của cầu.', explanation: 'Nếu lực dồn quá nhiều vào một chỗ, công trình sẽ kém an toàn hơn.' },
      { q: 'Vì sao chân bàn thường có nhiều hơn một chiếc?', ans: 'Để chia đều trọng lượng', options: ['Để chia đều trọng lượng', 'Để bàn chạy nhanh', 'Để bàn biết nhảy', 'Để bàn nghe nhạc'], statement: 'Nhiều chân bàn giúp chia đều trọng lượng tốt hơn.', explanation: 'Khi trọng lượng được chia đều, bàn sẽ đứng vững hơn.' },
      { q: 'Điều gì có thể xảy ra nếu một bộ phận đỡ bị yếu?', ans: 'Công trình có thể mất an toàn', options: ['Công trình có thể mất an toàn', 'Công trình bay lên', 'Nước thành kẹo', 'Mây biến mất'], statement: 'Nếu bộ phận đỡ bị yếu, công trình có thể mất an toàn.', explanation: 'Một chỗ yếu có thể làm cả cấu trúc bị ảnh hưởng.' },
      { q: 'Quan sát đồ vật quanh em giúp học gì về lực?', ans: 'Hiểu vì sao vật đứng vững hoặc bị đổ', options: ['Hiểu vì sao vật đứng vững hoặc bị đổ', 'Biết cây biết hát', 'Làm đồ vật nhẹ hơn ngay', 'Biết trời đổi màu'], statement: 'Quan sát đồ vật quanh em giúp hiểu vì sao vật đứng vững hoặc bị đổ.', explanation: 'Khoa học có mặt ngay trong những vật rất quen thuộc hàng ngày.' },
    ],
  }),
];
