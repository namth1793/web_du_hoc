import { useState, useEffect } from 'react';
import api from '../lib/api';

const fallbackEvents = [
  { id: 1, date: '15-03-2026', title: 'HCIT tổ chức thành công tuyển thực tập sinh (visa E7-3)', description: 'Buổi tuyển dụng thực tập sinh diện visa E7-3 tại Hàn Quốc đã diễn ra thành công với sự tham gia của hơn 50 ứng viên tiềm năng.', image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80' },
  { id: 2, date: '10-03-2026', title: 'Workshop du học Hàn Quốc – Nhật Bản tháng 3/2026', description: 'Hội thảo trực tiếp chia sẻ kinh nghiệm du học và cơ hội học bổng tại Hàn Quốc và Nhật Bản năm 2026.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80' },
  { id: 3, date: '05-03-2026', title: 'Hoạt động tư vấn du học trực tuyến tháng 3', description: 'HCIT tổ chức tư vấn trực tuyến miễn phí về các chương trình du học và xuất khẩu lao động mới nhất.', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80' },
  { id: 4, date: '25-02-2026', title: 'Sự kiện khai giảng khóa tiếng Hàn K12', description: 'Khai giảng khóa tiếng Hàn K12 chuẩn bị cho học viên trước khi xuất cảnh sang Hàn Quốc.', image: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=400&q=80' }
];

const fallbackNews = [
  { id: 1, date: '20-03-2026', title: 'Thông tin visa E7: Điều kiện và cơ hội làm việc tại Hàn Quốc', description: 'Hướng dẫn chi tiết về visa E7 dành cho lao động có tay nghề tại Hàn Quốc năm 2026.', image: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=80' },
  { id: 2, date: '18-03-2026', title: 'Thông tin lớp học và lịch khai giảng tháng 4/2026', description: 'Danh sách các khóa học ngoại ngữ và bồi dưỡng kỹ năng sắp khai giảng tại HCIT.', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80' },
  { id: 3, date: '15-03-2026', title: 'Cập nhật chương trình du học Đài Loan 2026 – Học bổng hấp dẫn', description: 'Đài Loan mở rộng chính sách học bổng cho sinh viên Việt Nam với nhiều ưu đãi mới.', image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&q=80' },
  { id: 4, date: '10-03-2026', title: 'Hoạt động đào tạo ngoại ngữ và định hướng nghề nghiệp tại HCIT', description: 'HCIT đẩy mạnh chương trình đào tạo ngoại ngữ và định hướng nghề nghiệp cho học viên trước khi xuất cảnh.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80' }
];

function ItemCard({ item, size = 'normal' }) {
  return (
    <div className={`flex gap-4 group cursor-pointer ${size === 'large' ? 'flex-col' : ''}`}>
      <div className={`rounded-xl overflow-hidden flex-shrink-0 ${size === 'large' ? 'h-52 w-full' : 'w-28 h-24'}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-orange-500 font-semibold mb-1">{item.date}</div>
        <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">
          {item.title}
        </h4>
        {size === 'large' && (
          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export default function EventsNews() {
  const [events, setEvents] = useState(fallbackEvents);
  const [news, setNews] = useState(fallbackNews);

  useEffect(() => {
    api.get('/api/events').then(r => { if (r.data.data?.length) setEvents(r.data.data); }).catch(() => {});
    api.get('/api/news').then(r => { if (r.data.data?.length) setNews(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Cập nhật mới nhất
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Tin tức hoạt động</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events */}
          <div className="animate-on-scroll">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full" />
                Sự kiện & hoạt động
              </h2>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 group">
                Xem tất cả
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="space-y-5">
              {events.slice(0, 1).map(e => (
                <div key={e.id} className="rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <div className="h-52 overflow-hidden relative">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Nổi bật</div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="text-xs text-orange-500 font-semibold mb-1.5">{e.date}</div>
                    <h4 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors">{e.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{e.description}</p>
                  </div>
                </div>
              ))}

              <div className="divide-y divide-gray-100">
                {events.slice(1).map(e => (
                  <div key={e.id} className="py-4 first:pt-0 last:pb-0">
                    <ItemCard item={e} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* News */}
          <div className="animate-on-scroll">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                Thông tin tuyển sinh
              </h2>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 group">
                Xem tất cả
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {news.slice(0, 2).map(n => (
                <div key={n.id} className="rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <div className="h-36 overflow-hidden">
                    <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>
                  </div>
                  <div className="p-3 bg-white">
                    <div className="text-xs text-blue-500 font-semibold mb-1">{n.date}</div>
                    <h4 className="text-xs font-semibold text-gray-800 group-hover:text-blue-500 transition-colors line-clamp-2">{n.title}</h4>
                    <a href="#" className="text-xs text-orange-500 font-semibold mt-1 block hover:underline">XEM CHI TIẾT →</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-gray-100">
              {news.slice(2).map(n => (
                <div key={n.id} className="py-4">
                  <ItemCard item={n} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="mt-14 animate-on-scroll">
          <div className="grid grid-cols-5 gap-2 rounded-2xl overflow-hidden h-36">
            {[
              'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=300&q=80',
              'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&q=80',
              'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=300&q=80',
              'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=300&q=80',
              'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=300&q=80'
            ].map((src, i) => (
              <div key={i} className="overflow-hidden group cursor-pointer">
                <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
