import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { SECTIONS } from '../constants';
import { lazy, Suspense } from 'react';
const RichTextEditor = lazy(() => import('../components/RichTextEditor'));

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryReady = CLOUD_NAME && CLOUD_NAME !== 'your_cloud_name';

async function uploadToCloudinary(file) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: fd
  });
  if (!res.ok) throw new Error('Upload thất bại');
  const data = await res.json();
  return data.secure_url;
}

const ALL_SUBCATEGORIES = Object.entries(SECTIONS).flatMap(([section, s]) =>
  Object.entries(s.subcategories).map(([sub, label]) => ({
    value: `${section}|${sub}`,
    section,
    subcategory: sub,
    label: `${s.label} › ${label}`
  }))
);

const emptyForm = { title:'', section:'du-hoc', subcategory:'nhat-ban', cover_image:'', excerpt:'', content:'', is_published:1 };

function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post('/api/admin/login', { password: pwd });
      if (r.data.success) { localStorage.setItem('abs_admin', r.data.token); onLogin(r.data.token); }
    } catch { setError('Sai mật khẩu. Vui lòng thử lại.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Trang quản trị</h1>
          <p className="text-gray-500 text-sm mt-1">ABS Du Học Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mật khẩu admin</label>
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required
              placeholder="Nhập mật khẩu..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            {loading ? <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Đang đăng nhập...</> : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-orange-500 transition-colors flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArticleModal({ article, onSave, onClose }) {
  const [form, setForm] = useState(article || emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!cloudinaryReady) {
      setUploadError('Chưa cấu hình Cloudinary. Vui lòng điền vào frontend/.env');
      return;
    }
    setUploading(true);
    setUploadError('');
    try {
      const url = await uploadToCloudinary(file);
      setForm(p => ({ ...p, cover_image: url }));
    } catch {
      setUploadError('Upload thất bại. Kiểm tra lại Cloudinary config.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const token = localStorage.getItem('abs_admin');
  const isEdit = !!article?.id;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
  };

  const handleCategoryChange = e => {
    const [section, subcategory] = e.target.value.split('|');
    setForm(p => ({ ...p, section, subcategory }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const cfg = { headers: { Authorization: `Bearer ${token}` } };
      if (isEdit) await api.put(`/api/articles/${article.id}`, form, cfg);
      else await api.post('/api/articles', form, cfg);
      onSave();
    } catch(err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally { setLoading(false); }
  };

  const currentCatValue = `${form.section}|${form.subcategory}`;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{isEdit ? '✏️ Chỉnh sửa bài viết' : '➕ Thêm bài viết mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tiêu đề <span className="text-red-500">*</span></label>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Nhập tiêu đề bài viết..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Chuyên mục <span className="text-red-500">*</span></label>
            <select value={currentCatValue} onChange={handleCategoryChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white">
              {ALL_SUBCATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Ảnh bìa</label>

            {/* Upload button + URL input */}
            <div className="flex gap-2">
              <input name="cover_image" value={form.cover_image} onChange={handleChange} placeholder="https://... hoặc upload ảnh →"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                  uploading
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200'
                }`}>
                {uploading ? (
                  <><span className="animate-spin w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full" />Đang tải...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>Upload</>
                )}
              </button>
            </div>

            {/* Cloudinary not configured warning */}
            {!cloudinaryReady && (
              <p className="mt-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                Chưa cấu hình Cloudinary — điền <code className="bg-amber-100 px-1 rounded">VITE_CLOUDINARY_CLOUD_NAME</code> và <code className="bg-amber-100 px-1 rounded">VITE_CLOUDINARY_UPLOAD_PRESET</code> trong <code className="bg-amber-100 px-1 rounded">frontend/.env</code>
              </p>
            )}

            {uploadError && (
              <p className="mt-1.5 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">{uploadError}</p>
            )}

            {/* Preview */}
            {form.cover_image && (
              <div className="mt-2 relative">
                <img src={form.cover_image} alt="preview"
                  className="h-36 w-full object-cover rounded-xl border border-gray-200"
                  onError={e => e.target.style.display='none'}/>
                <button type="button" onClick={() => setForm(p => ({ ...p, cover_image: '' }))}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tóm tắt</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} placeholder="Mô tả ngắn về bài viết..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"/>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nội dung</label>
            <Suspense fallback={<div className="h-52 border border-gray-200 rounded-xl bg-gray-50 animate-pulse" />}>
              <RichTextEditor
                value={form.content}
                onChange={(val) => setForm(p => ({ ...p, content: val }))}
              />
            </Suspense>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_published" id="is_published" checked={form.is_published === 1}
              onChange={handleChange} className="w-4 h-4 accent-orange-500"/>
            <label htmlFor="is_published" className="text-sm font-medium text-gray-700">Xuất bản ngay</label>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2">
              {loading ? <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Đang lưu...</> : (isEdit ? '💾 Lưu thay đổi' : '✅ Thêm bài viết')}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ article, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('abs_admin');

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/articles/${article.id}`, { headers: { Authorization: `Bearer ${token}` } });
      onConfirm();
    } catch { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Xóa bài viết?</h3>
        <p className="text-gray-500 text-sm mb-1 font-medium line-clamp-2">"{article.title}"</p>
        <p className="text-gray-400 text-xs mb-6">Hành động này không thể hoàn tác.</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : '🗑️'} Xóa
          </button>
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all">
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('abs_admin') || '');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState('');
  const [filterSub, setFilterSub] = useState('');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | { type:'add'|'edit'|'delete', article? }

  const fetchArticles = () => {
    setLoading(true);
    api.get('/api/articles/all', { params: { section: filterSection || undefined, subcategory: filterSub || undefined } })
      .then(r => setArticles(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (token) fetchArticles(); }, [token, filterSection, filterSub]);

  const handleLogin = (t) => setToken(t);
  const handleLogout = () => { localStorage.removeItem('abs_admin'); setToken(''); };

  if (!token) return <LoginScreen onLogin={handleLogin} />;

  const sectionOptions = Object.entries(SECTIONS);
  const subOptions = filterSection ? Object.entries(SECTIONS[filterSection]?.subcategories || {}) : [];

  const filtered = articles.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  const getSectionLabel = (section, sub) => {
    const sl = SECTIONS[section]?.label || section;
    const subl = SECTIONS[section]?.subcategories[sub] || sub;
    return `${sl} › ${subl}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {modal?.type === 'add' && <ArticleModal onSave={() => { setModal(null); fetchArticles(); }} onClose={() => setModal(null)} />}
      {modal?.type === 'edit' && <ArticleModal article={modal.article} onSave={() => { setModal(null); fetchArticles(); }} onClose={() => setModal(null)} />}
      {modal?.type === 'delete' && <DeleteConfirm article={modal.article} onConfirm={() => { setModal(null); fetchArticles(); }} onClose={() => setModal(null)} />}

      {/* Admin header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-base leading-none">A</span>
              </div>
            </Link>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-none">Quản trị bài viết</h1>
              <p className="text-xs text-gray-400 mt-0.5">ABS Du Học Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Trang chủ
            </Link>
            <button onClick={handleLogout}
              className="text-sm text-red-500 hover:bg-red-50 flex items-center gap-1 px-3 py-2 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tổng bài viết', value: articles.length, color: 'from-orange-400 to-orange-500', icon: '📝' },
            { label: 'Đã xuất bản', value: articles.filter(a => a.is_published).length, color: 'from-green-400 to-green-500', icon: '✅' },
            { label: 'Chưa xuất bản', value: articles.filter(a => !a.is_published).length, color: 'from-gray-400 to-gray-500', icon: '📋' },
            { label: 'Chuyên mục', value: Object.values(SECTIONS).reduce((s, v) => s + Object.keys(v.subcategories).length, 0), color: 'from-blue-400 to-blue-500', icon: '📂' }
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-md`}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-sm opacity-80 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bài viết..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 transition-all"/>
            </div>

            {/* Section filter */}
            <select value={filterSection} onChange={e => { setFilterSection(e.target.value); setFilterSub(''); }}
              className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 bg-white">
              <option value="">Tất cả chuyên mục</option>
              {sectionOptions.map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
            </select>

            {/* Sub filter */}
            {filterSection && (
              <select value={filterSub} onChange={e => setFilterSub(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 bg-white">
                <option value="">Tất cả</option>
                {subOptions.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            )}

            <button onClick={() => setModal({ type: 'add' })}
              className="ml-auto flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
              Thêm bài viết
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-gray-400">
                <div className="animate-spin w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-3" />
                Đang tải...
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                Không có bài viết nào
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Bài viết</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Chuyên mục</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Ngày đăng</th>
                    <th className="text-center px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(a => (
                    <tr key={a.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {a.cover_image && (
                            <img src={a.cover_image} alt="" className="w-14 h-10 object-cover rounded-lg flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{a.title}</p>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{a.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-medium">
                          {getSectionLabel(a.section, a.subcategory)}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-xs text-gray-500">
                          {new Date(a.published_at).toLocaleDateString('vi-VN')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${a.is_published ? 'bg-green-500' : 'bg-gray-400'}`} />
                          {a.is_published ? 'Xuất bản' : 'Nháp'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/bai-viet/${a.id}`} target="_blank"
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Xem">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          </Link>
                          <button onClick={() => setModal({ type: 'edit', article: a })}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Sửa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => setModal({ type: 'delete', article: a })}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
              Hiển thị {filtered.length}/{articles.length} bài viết
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
