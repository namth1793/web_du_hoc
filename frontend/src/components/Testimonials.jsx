import { useState, useEffect } from 'react';
import api from '../lib/api';

const fallback = [
  {
    id: 1,
    name: 'Lê Thị Thu Trang',
    school: 'Du học Hàn Quốc',
    ielts: '',
    quote: 'Nhờ sự hỗ trợ tận tình của HCIT, em đã hoàn thành hồ sơ và xin được visa du học Hàn Quốc thành công. Đội ngũ tư vấn viên rất chuyên nghiệp, hướng dẫn em từng bước một. Em thực sự biết ơn trung tâm đã đồng hành cùng em.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80'
  },
  {
    id: 2,
    name: 'Vũ Thị Lan Anh',
    school: 'Du học Hàn Quốc',
    ielts: '',
    quote: 'Môi trường học tập tại Hàn Quốc tuyệt vời hơn những gì em tưởng tượng. HCIT đã giúp em chuẩn bị đầy đủ từ hồ sơ, học tiếng Hàn đến định hướng cuộc sống. Chương trình hỗ trợ rất toàn diện và chu đáo.',
    avatar: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=150&q=80'
  },
  {
    id: 3,
    name: 'Nguyễn Thị Kim Oanh',
    school: 'Xuất khẩu lao động Đài Loan',
    ielts: '',
    quote: 'Tôi rất hài lòng với dịch vụ của HCIT. Tư vấn viên xử lý hồ sơ nhanh chóng, hiệu quả và luôn phản hồi kịp thời mọi thắc mắc của tôi. Tôi đã sang Đài Loan làm việc thuận lợi và thu nhập ổn định.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80'
  }
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallback);
  const [active, setActive] = useState(0);

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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Cảm nhận học viên
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Học viên tiêu biểu</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Hàng trăm học viên đã tin tưởng HCIT và đang học tập, làm việc thành công tại Nhật Bản, Hàn Quốc, Đài Loan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`card-hover animate-on-scroll rounded-3xl p-7 bg-white border-2 transition-all duration-300 cursor-pointer ${
                active === i ? 'border-orange-400 shadow-xl ring-2 ring-orange-200' : 'border-gray-100 shadow-md'
              }`}
              onClick={() => setActive(i)}
            >
              <div className="text-5xl text-orange-200 font-serif leading-none mb-3">"</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">{t.quote}</p>
              <StarRating />
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-xs text-orange-500 font-semibold mt-0.5">{t.school}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${active === i ? 'w-6 h-2.5 bg-orange-500' : 'w-2.5 h-2.5 bg-gray-300'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
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
    </section>
  );
}
