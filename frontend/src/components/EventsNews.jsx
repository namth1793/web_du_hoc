import { useState, useEffect } from 'react';
import api from '../lib/api';

const fallbackEvents = [
  { id: 1, date: '28-03-2025', title: 'Học bổng, chuyên ngành đào tạo Trường đại học Curtin Singapore', description: 'Cùng tìm hiểu các chương trình học bổng hấp dẫn và chi phí thấp nhất tại Curtin Singapore.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80' },
  { id: 2, date: '09-03-2025', title: 'Học bổng du học Singapore trường Đại học Curtin Singapore 2024', description: 'Trường Curtin Singapore dành các suất học bổng hấp dẫn cho sinh viên Việt Nam.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80' },
  { id: 3, date: '25-03-2025', title: 'Hội thảo Tìm hiểu Curtin Singapore - Bộ trưởng Bộ Giáo dục', description: 'Hội thảo trực tuyến cùng chuyên gia giáo dục về cơ hội du học tại Singapore 2025.', image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80' },
  { id: 4, date: '15-02-2025', title: 'Đánh giá đại học Edumemo thêm Trường đại học Curtin Singapore', description: 'Đánh giá chi tiết chất lượng đào tạo và môi trường học tập tại Curtin Singapore.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80' }
];

const fallbackNews = [
  { id: 1, date: '08-03-2025', title: 'Học phí, chuyên ngành đào tạo Trường đại học Curtin Singapore', description: 'Chi tiết về học phí và các chuyên ngành hot nhất tại trường Curtin Singapore năm 2025.', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80' },
  { id: 2, date: '08-03-2025', title: 'Học bổng du học Singapore – Trường Curtin Singapore', description: 'Các loại học bổng và điều kiện xét duyệt dành cho sinh viên Việt Nam.', image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=80' },
  { id: 3, date: '05-03-2025', title: 'Học bổng du học Singapore: Học bổng 10% – 30% học phí', description: 'Tìm hiểu điều kiện nhận học bổng và quy trình nộp hồ sơ nhanh nhất.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80' },
  { id: 4, date: '01-03-2025', title: 'Chi phí du học Singapore và cơ hội việc làm sau tốt nghiệp', description: 'Phân tích tổng chi phí và cơ hội nghề nghiệp dành cho sinh viên sau khi tốt nghiệp.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80' }
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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events */}
          <div className="animate-on-scroll">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full" />
                Sự kiện du học
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
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Sự kiện</div>
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
                Tin tức du học
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
              'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&q=80',
              'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&q=80',
              'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&q=80',
              'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80',
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80'
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
