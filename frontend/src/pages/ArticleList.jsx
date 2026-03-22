import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { SECTIONS } from '../constants';

function ArticleCard({ article }) {
  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' })
    : '';

  return (
    <div className="flex flex-col sm:flex-row gap-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Cover image – horizontal layout */}
      <div className="sm:w-64 flex-shrink-0 h-48 sm:h-auto overflow-hidden">
        <img
          src={article.cover_image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            {dateStr}
            <span>·</span>
            <span className="text-gray-400">{article.author || 'Admin'}</span>
          </div>

          <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <Link
            to={`/bai-viet/${article.id}`}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Xem chi tiết
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>

          <button className="text-gray-400 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-orange-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ArticleList({ section }) {
  const { subcategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionData = SECTIONS[section];
  const subcategoryLabel = sectionData?.subcategories[subcategory] || subcategory;
  const sectionLabel = sectionData?.label || section;

  useEffect(() => {
    setLoading(true);
    api.get('/api/articles', { params: { section, subcategory } })
      .then(r => setArticles(r.data.data || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [section, subcategory]);

  // Subcategory tabs
  const subcategoryEntries = Object.entries(sectionData?.subcategories || {});

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-orange-500 font-medium">{sectionLabel}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-gray-800 font-semibold">{subcategoryLabel}</span>
        </nav>

        {/* Page title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-orange-500 rounded-full" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{sectionLabel}</h1>
          </div>
          <p className="text-gray-500 ml-4">Danh sách bài viết về <strong className="text-orange-500">{subcategoryLabel}</strong></p>
        </div>

        {/* Subcategory tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {subcategoryEntries.map(([key, label]) => (
            <Link
              key={key}
              to={`/${section}/${key}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                key === subcategory
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Articles */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-sm h-48 animate-pulse flex gap-0 overflow-hidden">
                <div className="w-64 bg-gray-200 flex-shrink-0" />
                <div className="flex-1 p-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p className="text-lg font-medium">Chưa có bài viết nào</p>
            <p className="text-sm mt-1">Vui lòng quay lại sau</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
