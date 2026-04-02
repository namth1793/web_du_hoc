import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { SECTIONS } from '../constants';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/articles/${id}`)
      .then(r => {
        setArticle(r.data.data);
        // Fetch related articles
        return api.get('/api/articles', { params: { section: r.data.data.section, subcategory: r.data.data.subcategory } });
      })
      .then(r => setRelated((r.data.data || []).filter(a => a.id !== parseInt(id)).slice(0, 3)))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm p-8 animate-pulse space-y-4">
            <div className="h-72 bg-gray-200 rounded-2xl" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="space-y-2">
              {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-200 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) return null;

  const sectionData = SECTIONS[article.section];
  const subcategoryLabel = sectionData?.subcategories[article.subcategory] || article.subcategory;
  const sectionLabel = sectionData?.label || article.section;
  const sectionPath = `/${article.section}/${article.subcategory}`;
  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <Link to={sectionPath} className="hover:text-orange-500 transition-colors">{sectionLabel}</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <Link to={sectionPath} className="hover:text-orange-500 transition-colors text-orange-500">{subcategoryLabel}</Link>
        </nav>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {/* Cover image */}
          {article.cover_image && (
            <div className="h-72 md:h-96 overflow-hidden">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">{sectionLabel}</span>
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">{subcategoryLabel}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-4">{article.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                {dateStr}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                {article.author || 'Admin'}
              </span>
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-gray-600 text-base leading-relaxed italic border-l-4 border-orange-400 pl-4 mb-6 bg-orange-50 py-3 pr-4 rounded-r-xl">
                {article.excerpt}
              </p>
            )}

            {/* Content */}
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed
                prose-h2:text-xl prose-h2:font-bold prose-h2:text-gray-800 prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-700
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-1.5
                prose-ol:mb-4 prose-ol:pl-6
                prose-strong:text-orange-600
                prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                prose-table:w-full prose-table:border-collapse
                prose-th:bg-orange-50 prose-th:p-3 prose-th:border prose-th:border-gray-200 prose-th:text-sm prose-th:font-semibold
                prose-td:p-3 prose-td:border prose-td:border-gray-200 prose-td:text-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Chia sẻ bài viết:</span>
              {[
                { label: 'Facebook', color: 'bg-blue-600', icon: 'f' },
                { label: 'Zalo', color: 'bg-blue-500', icon: 'Z' },
                { label: 'Copy link', color: 'bg-gray-500', icon: '🔗' }
              ].map(s => (
                <button key={s.label}
                  className={`${s.color} text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity`}
                  onClick={() => s.label === 'Copy link' && navigator.clipboard?.writeText(window.location.href)}
                >
                  <span>{s.icon}</span> {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full" />
              Bài viết liên quan
            </h2>
            <div className="flex flex-col gap-4">
              {related.map(a => (
                <Link key={a.id} to={`/bai-viet/${a.id}`}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group border border-gray-100">
                  <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={a.cover_image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&q=80'}
                      alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-orange-500 font-semibold mb-1">
                      {new Date(a.published_at).toLocaleDateString('vi-VN')}
                    </p>
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors line-clamp-2">{a.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}
