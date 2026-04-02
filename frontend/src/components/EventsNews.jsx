import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function ArticleCard({ article, size = 'normal', accentColor = 'orange' }) {
  const accent = accentColor === 'blue' ? 'text-blue-500' : 'text-orange-500';
  const hover  = accentColor === 'blue' ? 'group-hover:text-blue-500' : 'group-hover:text-orange-500';

  if (size === 'featured') {
    return (
      <Link to={`/bai-viet/${article.id}`} className="block rounded-2xl overflow-hidden shadow-md group">
        <div className="h-52 overflow-hidden relative">
          {article.cover_image ? (
            <img src={article.cover_image} alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200" />
          )}
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Nổi bật</div>
        </div>
        <div className="p-4 bg-white">
          <div className={`text-xs ${accent} font-semibold mb-1.5`}>{formatDate(article.published_at)}</div>
          <h4 className={`font-bold text-gray-800 ${hover} transition-colors line-clamp-2`}>{article.title}</h4>
          {article.excerpt && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>}
        </div>
      </Link>
    );
  }

  if (size === 'grid') {
    return (
      <Link to={`/bai-viet/${article.id}`} className="block rounded-2xl overflow-hidden shadow-md group">
        <div className="h-36 overflow-hidden">
          {article.cover_image ? (
            <img src={article.cover_image} alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100" />
          )}
        </div>
        <div className="p-3 bg-white">
          <div className={`text-xs ${accent} font-semibold mb-1`}>{formatDate(article.published_at)}</div>
          <h4 className={`text-xs font-semibold text-gray-800 ${hover} transition-colors line-clamp-2`}>{article.title}</h4>
          <span className="text-xs text-orange-500 font-semibold mt-1 block">Xem chi tiết →</span>
        </div>
      </Link>
    );
  }

  // normal: horizontal row
  return (
    <Link to={`/bai-viet/${article.id}`} className="flex gap-4 group">
      <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        {article.cover_image && (
          <img src={article.cover_image} alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-xs ${accent} font-semibold mb-1`}>{formatDate(article.published_at)}</div>
        <h4 className={`text-sm font-semibold text-gray-800 leading-snug ${hover} transition-colors line-clamp-2`}>
          {article.title}
        </h4>
      </div>
    </Link>
  );
}

const fallbackEvents = [
  { id: 'fe1', title: 'Thông báo tuyển sinh khóa du học Nhật Bản tháng 5/2025', cover_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', excerpt: 'HCIT thông báo tuyển sinh khóa chuẩn bị du học Nhật Bản khai giảng tháng 5/2025. Ưu tiên hồ sơ nộp trước 30/4.', published_at: '2025-04-01' },
  { id: 'fe2', title: 'Tuyển sinh chương trình tiếng Hàn cấp tốc – Khai giảng tháng 6/2025', cover_image: 'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=600&q=80', excerpt: 'Lớp tiếng Hàn cấp tốc 4 tháng đạt TOPIK II cấp độ 3, cam kết đầu ra hoặc học lại miễn phí.', published_at: '2025-03-20' },
  { id: 'fe3', title: 'ABS tổ chức hội thảo du học Nhật Bản thu hút hơn 500 học viên', cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', excerpt: 'Sự kiện hội thảo du học Nhật Bản ngày 20/3/2025 đã thu hút hơn 500 học viên và phụ huynh tham dự.', published_at: '2025-03-21' },
  { id: 'fe4', title: 'Lễ tiễn 50 lao động Việt Nam sang Đài Loan làm việc', cover_image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600&q=80', excerpt: 'HCIT long trọng tổ chức lễ tiễn 50 lao động lên đường sang Đài Loan, đánh dấu đợt xuất cảnh lớn nhất quý I/2025.', published_at: '2025-03-15' },
];

const fallbackNews = [
  { id: 'fn1', title: 'Thị trường lao động Nhật Bản 2025: Cơ hội và thách thức cho lao động Việt Nam', cover_image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80', excerpt: 'Phân tích toàn diện thị trường lao động Nhật Bản 2025, xu hướng tuyển dụng và cơ hội cho lao động Việt Nam.', published_at: '2025-03-28', section: 'du-hoc' },
  { id: 'fn2', title: 'Xu hướng du học toàn cầu sau đại dịch – Dự báo 2025-2030', cover_image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80', excerpt: 'Các xu hướng du học quốc tế đang thay đổi mạnh mẽ sau COVID-19. Đâu là điểm đến và ngành học được ưu tiên?', published_at: '2025-03-25', section: 'du-hoc' },
  { id: 'fn3', title: 'Chi phí du học Hàn Quốc 2025 cập nhật mới nhất', cover_image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', excerpt: 'Tổng hợp chi phí du học Hàn Quốc 2025 bao gồm học phí, sinh hoạt phí và các khoản hỗ trợ từ chính phủ.', published_at: '2025-03-18', section: 'du-hoc' },
  { id: 'fn4', title: 'Chương trình xuất khẩu lao động Đài Loan 2025 mở rộng ngành nghề', cover_image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80', excerpt: 'Đài Loan mở rộng tiếp nhận lao động Việt Nam sang các ngành điện tử, chăm sóc sức khỏe và nông nghiệp.', published_at: '2025-03-10', section: 'xuat-khau-lao-dong' },
  { id: 'fn5', title: 'Học bổng du học Nhật Bản dành cho sinh viên Việt Nam 2025', cover_image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80', excerpt: 'Danh sách học bổng du học Nhật Bản 2025 từ chính phủ Nhật, trường đại học và tổ chức phi lợi nhuận.', published_at: '2025-03-05', section: 'du-hoc' },
];

export default function EventsNews() {
  const [events, setEvents] = useState(fallbackEvents);
  const [news, setNews] = useState(fallbackNews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/api/articles', { params: { section: 'tin-tuc' } }),
      api.get('/api/articles', { params: { section: 'du-hoc' } }),
      api.get('/api/articles', { params: { section: 'xuat-khau-lao-dong' } }),
    ]).then(([tinTuc, duHoc, xkld]) => {
      const evList = tinTuc.data.data || [];
      const newsList = [...(duHoc.data.data || []), ...(xkld.data.data || [])];
      newsList.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      if (evList.length) setEvents(evList);
      if (newsList.length) setNews(newsList);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const showEvents = events.length > 0;
  const showNews   = news.length > 0;

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

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-12">
            {[0, 1].map(i => (
              <div key={i} className="space-y-4">
                <div className="h-52 bg-gray-100 rounded-2xl animate-pulse" />
                {[0,1,2].map(j => <div key={j} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tin tức (tin-tuc section) */}
            {showEvents && (
              <div className="animate-on-scroll">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                    Sự kiện & hoạt động
                  </h3>
                  <Link to="/tin-tuc/tuyen-sinh"
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 group">
                    Xem tất cả
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
                <div className="space-y-5">
                  {events.slice(0, 1).map(e => (
                    <ArticleCard key={e.id} article={e} size="featured" accentColor="orange" />
                  ))}
                  <div className="divide-y divide-gray-100">
                    {events.slice(1, 4).map(e => (
                      <div key={e.id} className="py-4 first:pt-0 last:pb-0">
                        <ArticleCard article={e} size="normal" accentColor="orange" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Du học & XKLĐ */}
            {showNews && (
              <div className="animate-on-scroll">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full" />
                    Thông tin tuyển sinh
                  </h3>
                  <Link to="/du-hoc/nhat-ban"
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 group">
                    Xem tất cả
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {news.slice(0, 2).map(n => (
                    <ArticleCard key={n.id} article={n} size="grid" accentColor="blue" />
                  ))}
                </div>
                <div className="divide-y divide-gray-100">
                  {news.slice(2, 5).map(n => (
                    <div key={n.id} className="py-4 first:pt-0 last:pb-0">
                      <ArticleCard article={n} size="normal" accentColor="blue" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If only one column has data, show it full width */}
            {showEvents && !showNews && (
              <div className="animate-on-scroll">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full" />
                    Thông tin tuyển sinh
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">Chưa có bài viết.</p>
              </div>
            )}
          </div>
        )}

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
              <div key={i} className="overflow-hidden">
                <img src={src} alt={`Gallery ${i+1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
