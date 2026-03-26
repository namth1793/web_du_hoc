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

export default function EventsNews() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/articles', { params: { section: 'tin-tuc' } }),
      api.get('/api/articles', { params: { section: 'du-hoc' } }),
      api.get('/api/articles', { params: { section: 'xuat-khau-lao-dong' } }),
    ]).then(([tinTuc, duHoc, xkld]) => {
      const evList = tinTuc.data.data || [];
      const newsList = [...(duHoc.data.data || []), ...(xkld.data.data || [])];
      // sort newest first
      newsList.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      setEvents(evList);
      setNews(newsList);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const showEvents = events.length > 0;
  const showNews   = news.length > 0;

  if (!loading && !showEvents && !showNews) return null;

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
