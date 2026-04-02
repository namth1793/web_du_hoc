import { useState, useEffect } from 'react';
import api from '../lib/api';

const fallback = [
  { id: 1, name: 'Lê Thị Thu Trang', school: 'Du học Hàn Quốc', quote: 'Nhờ sự hỗ trợ tận tình của HCIT, em đã hoàn thành hồ sơ và xin được visa du học Hàn Quốc thành công. Đội ngũ tư vấn viên rất chuyên nghiệp, hướng dẫn em từng bước một. Em thực sự biết ơn trung tâm đã đồng hành cùng em trên con đường chinh phục ước mơ du học.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80' },
  { id: 2, name: 'Vũ Thị Lan Anh', school: 'Du học Hàn Quốc', quote: 'Môi trường học tập tại Hàn Quốc tuyệt vời hơn những gì em tưởng tượng. HCIT đã giúp em chuẩn bị đầy đủ từ hồ sơ, học tiếng Hàn đến định hướng cuộc sống. Chương trình hỗ trợ rất toàn diện và chu đáo, các anh chị tư vấn luôn nhiệt tình giải đáp mọi thắc mắc.', avatar: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=150&q=80' },
  { id: 3, name: 'Nguyễn Thị Kim Oanh', school: 'Xuất khẩu lao động Đài Loan', quote: 'Tôi rất hài lòng với dịch vụ của HCIT. Tư vấn viên xử lý hồ sơ nhanh chóng, hiệu quả và luôn phản hồi kịp thời mọi thắc mắc của tôi. Tôi đã sang Đài Loan làm việc thuận lợi với thu nhập ổn định, vượt xa kỳ vọng ban đầu của gia đình tôi.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' },
  { id: 4, name: 'Trần Văn Minh', school: 'Du học Nhật Bản', quote: 'Anh ấy đã hỗ trợ em rất nhiệt tình từ khâu chọn trường cho đến khi em cầm visa trên tay. Nhờ HCIT em biết cách chuẩn bị hồ sơ đúng chuẩn, tiết kiệm được rất nhiều thời gian và tiền bạc so với tự làm. Hiện tại em đang học tại Tokyo và rất hài lòng với cuộc sống ở đây.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
  { id: 5, name: 'Phạm Thị Hương', school: 'Du học Đài Loan', quote: 'HCIT không chỉ hỗ trợ hồ sơ mà còn định hướng cho em rất rõ ràng về ngành học phù hợp với năng lực và mục tiêu tương lai. Nhờ đó em chọn được trường tốt với học bổng một phần. Em vô cùng cảm ơn các thầy cô tại trung tâm đã tận tâm đồng hành.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
  { id: 6, name: 'Nguyễn Văn Hùng', school: 'Xuất khẩu lao động Nhật Bản', quote: 'Tôi đã thử nhiều trung tâm khác nhau nhưng chỉ ở HCIT mới cảm thấy được tư vấn thực sự chu đáo và minh bạch. Mọi chi phí đều được giải thích rõ ràng, không phát sinh bất ngờ. Sau 2 năm làm việc tại Nhật, tôi đã tích lũy được vốn để mở doanh nghiệp khi về nước.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
  { id: 7, name: 'Lê Thị Mai', school: 'Du học Úc', quote: 'Ban đầu tôi rất lo lắng vì điều kiện tài chính hạn chế, nhưng HCIT đã tư vấn cho tôi các phương án học bổng phù hợp và lộ trình tiết kiệm chi phí. Giờ tôi đang học ngành Y tế cộng đồng tại Melbourne với học bổng 40% từ trường. Đây là giấc mơ tôi không dám nghĩ đến.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
  { id: 8, name: 'Hoàng Văn Tuấn', school: 'Xuất khẩu lao động Đài Loan', quote: 'Quy trình hỗ trợ của HCIT rất chuyên nghiệp và bài bản. Từ khâu kiểm tra sức khỏe, làm hồ sơ đến khóa học định hướng trước khi đi, tất cả đều được tổ chức chu đáo. Thu nhập tại Đài Loan giúp tôi trả hết nợ nhà và còn gửi tiền về quê cho gia đình.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
  { id: 9, name: 'Đỗ Thị Ngọc', school: 'Du học Hàn Quốc', quote: 'Em rất thích cách HCIT tiếp cận — họ không chỉ bán dịch vụ mà thực sự quan tâm đến tương lai của từng học viên. Tư vấn viên đã phân tích kỹ hồ sơ của em và đề xuất phương án tối ưu. Kết quả là em đậu vào đại học top 10 Hàn Quốc với học bổng toàn phần.', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&q=80' },
  { id: 10, name: 'Bùi Văn Nam', school: 'Du học Nhật Bản', quote: 'Tôi đặc biệt ấn tượng với đội ngũ hỗ trợ sau khi xuất cảnh của HCIT. Khi gặp khó khăn ở Nhật, tôi chỉ cần nhắn tin là được hỗ trợ ngay. Đây là điểm khác biệt lớn so với các trung tâm khác mà tôi từng nghe. Cảm ơn HCIT đã không bỏ rơi tôi sau khi ký hợp đồng.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80' },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallback);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/api/testimonials')
      .then(r => { if (r.data.data?.length) setTestimonials(r.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Cảm nhận học viên
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Học viên tiêu biểu</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Hàng trăm học viên đã tin tưởng HCIT và đang học tập, làm việc thành công tại Nhật Bản, Hàn Quốc, Đài Loan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="animate-on-scroll rounded-2xl p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
              onClick={() => setSelected(t)}
            >
              <div className="text-4xl text-orange-200 font-serif leading-none mb-2">"</div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{t.quote}</p>
              <button className="mt-3 text-xs text-orange-500 font-semibold group-hover:underline self-start">
                Xem chi tiết →
              </button>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-800 text-xs">{t.name}</div>
                  <div className="text-xs text-orange-500 font-semibold mt-0.5">{t.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/lien-he"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Bắt đầu hành trình của bạn
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Modal xem chi tiết */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl text-orange-200 font-serif leading-none mb-4">"</div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">{selected.quote}</p>
            <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
              <img
                src={selected.avatar}
                alt={selected.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-200"
              />
              <div>
                <div className="font-bold text-gray-800">{selected.name}</div>
                <div className="text-sm text-orange-500 font-semibold mt-0.5">{selected.school}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Đóng"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
