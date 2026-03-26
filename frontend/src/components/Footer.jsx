import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Giới thiệu', href: '#intro' },
  { label: 'Du học các nước', to: '/du-hoc/nhat-ban' },
  { label: 'Xuất khẩu lao động', to: '/xuat-khau-lao-dong/nhat-ban' },
  { label: 'Tin tức', to: '/tin-tuc/tuyen-sinh' },
  { label: 'Liên hệ', to: '/lien-he' }
];

const programs = [
  { label: 'Du học Nhật Bản', to: '/du-hoc/nhat-ban' },
  { label: 'Du học Hàn Quốc', to: '/du-hoc/han-quoc' },
  { label: 'Du học Đài Loan', to: '/du-hoc/dai-loan' },
  { label: 'Du học Đức', to: '/du-hoc/duc' },
  { label: 'XKLĐ Nhật Bản', to: '/xuat-khau-lao-dong/nhat-ban' },
  { label: 'XKLĐ Hàn Quốc', to: '/xuat-khau-lao-dong/han-quoc' }
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top wave */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 60" fill="#111827" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-sm leading-none">HCIT</span>
              </div>
              <div>
                <div className="font-black text-orange-400 text-base leading-tight tracking-tight">TRUNG TÂM XKLĐ & DU HỌC</div>
                <div className="text-gray-500 text-[10px] leading-none font-medium tracking-wider">HCIT</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Công ty Cổ phần Cung ứng Xuất khẩu lao động Công thương Hà Nội (HCIT., JSC). Giấy phép XKLĐ số 368/LĐTBXH-GP.
            </p>
            <div className="flex gap-2">
              {[
                { label: 'Facebook', color: '#1877f2', icon: 'f' },
                { label: 'Zalo', color: '#0068ff', icon: 'Z' },
                { label: 'YouTube', color: '#ff0000', icon: '▶' },
                { label: 'TikTok', color: '#333', icon: '♪' }
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: s.color }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Thông tin liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <div>
                  <div className="text-gray-300 font-medium text-xs mb-0.5">VP tư vấn</div>
                  <span className="text-gray-400">Số 27, Luis VIII, KĐT Luis City, Đại Mỗ, Hà Nội</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <div>
                  <div className="text-gray-300 font-medium text-xs mb-0.5">Trụ sở chính</div>
                  <span className="text-gray-400">Số 56 Vũ Trọng Phụng, Thanh Xuân, Hà Nội</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <div>
                  <div className="text-gray-300 font-medium text-xs mb-0.5">VPĐD Hàn Quốc</div>
                  <span className="text-gray-400">7, Daegudeul 2-gil, Yangsan-si, Gyeongsangnam-do</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                <div>
                  <a href="tel:035.9966.168" className="text-gray-400 hover:text-orange-400 transition-colors">035.9966.168</a>
                  {' · '}
                  <a href="tel:010-8324-3185" className="text-gray-400 hover:text-orange-400 transition-colors">010-8324-3185</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                <a href="mailto:xkldcongthuong@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors">xkldcongthuong@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Thông tin chung</h4>
            <ul className="space-y-2.5 mb-6">
              {quickLinks.map(l => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                      <svg className="w-3 h-3 text-orange-500/50 group-hover:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                      <svg className="w-3 h-3 text-orange-500/50 group-hover:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0943989885053!2d105.7774!3d21.0047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzE2LjkiTiAxMDXCsDQ2JzM5LjMiRQ!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="130"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HCIT Location"
              />
            </div>
          </div>

          {/* Programs + Facebook */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Chương trình</h4>
            <ul className="space-y-2.5 mb-6">
              {programs.map(p => (
                <li key={p.label}>
                  <Link to={p.to} className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 text-orange-500/50 group-hover:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Facebook fanpage placeholder */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">f</div>
                <span className="text-sm font-semibold text-white">Fanpage HCIT</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Theo dõi fanpage để cập nhật thông tin mới nhất về du học và XKLĐ</p>
              <a href="#" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-xs py-2 rounded-lg font-semibold transition-colors">
                👍 Theo dõi trang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Bản quyền thuộc về HCIT - Trung Tâm XKLD & Du Học thuộc Công ty CP Cung ứng Xuất khẩu lao động Công thương Hà Nội.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Chính sách bảo mật</a>
            <span>·</span>
            <a href="#" className="hover:text-orange-400 transition-colors">Điều khoản sử dụng</a>
            <span>·</span>
            <Link to="/admin"
              className="text-gray-700 hover:text-orange-400 transition-colors flex items-center gap-1 opacity-30 hover:opacity-100"
              title="Quản trị">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
