import { useState, useEffect } from 'react';
import api from '../lib/api';

const defaultBanner = {
  badge_text: 'Trung tâm Xúc tiến Du học HCIT',
  country: 'CAM KẾT VISA 100%',
  tagline: 'TUYỂN SINH DU HỌC',
  description: 'HCIT đồng hành cùng học sinh, sinh viên Việt Nam trên con đường chinh phục ước mơ du học Nhật Bản, Hàn Quốc, Đài Loan và xuất khẩu lao động với cam kết tỷ lệ visa 100%.',
  cta_text: 'Đăng ký ngay',
  scholarship_pct: '100',
  scholarship_label: 'Cam kết Visa',
  stat1_num: '1200+', stat1_label: 'Học viên theo học',
  stat2_num: '680+', stat2_label: 'Học viên đã bay',
  stat3_num: '100%', stat3_label: 'Tỷ lệ đỗ visa',
  img_main: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80',
  img_secondary: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80',
  img_tertiary: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=300&q=80'
};

export default function Hero() {
  const [banner, setBanner] = useState(defaultBanner);

  useEffect(() => {
    api.get('/api/settings/banner')
      .then(r => { if (r.data?.data && Object.keys(r.data.data).length > 0) setBanner(r.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24" aria-label="Hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-300 to-orange-300" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-200/30 rounded-full blur-2xl" />

      {/* Floating clouds */}
      <div className="absolute top-32 left-1/4 opacity-60">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
          <ellipse cx="60" cy="40" rx="55" ry="20"/>
          <ellipse cx="45" cy="30" rx="30" ry="22"/>
          <ellipse cx="75" cy="28" rx="25" ry="20"/>
        </svg>
      </div>
      <div className="absolute top-40 right-1/3 opacity-40">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="white">
          <ellipse cx="40" cy="28" rx="36" ry="13"/>
          <ellipse cx="30" cy="20" rx="20" ry="15"/>
          <ellipse cx="52" cy="18" rx="18" ry="14"/>
        </svg>
      </div>

      {/* Plane */}
      <div className="absolute top-36 right-1/4 animate-bounce-slow opacity-80">
        <svg width="60" height="60" viewBox="0 0 64 64" fill="white">
          <path d="M59.5,28.5l-18-4.5L24,6H18l8,18H10L6,18H2l4,14L2,46h4l4-6h16l-8,18h6l17.5-18l18-4.5c2.5-0.5,4.5-2.7,4.5-5.2 C64,31.2,62,29,59.5,28.5z"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="text-white space-y-5 animate-on-scroll">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
              {banner.badge_text}
            </div>

            {/* Main heading */}
            <div>
              <p className="text-xl md:text-2xl font-semibold opacity-90 mb-1">{banner.tagline}</p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none drop-shadow-lg">
                {banner.country}
              </h1>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  🇯🇵 Nhật Bản · 🇰🇷 Hàn Quốc · 🇹🇼 Đài Loan
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Hỗ trợ hồ sơ & visa A–Z
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg max-w-md leading-relaxed">
              {banner.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/lien-he"
                className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                {banner.cta_text}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#intro"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300"
              >
                Tìm hiểu thêm
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              {[
                { num: banner.stat1_num, label: banner.stat1_label },
                { num: banner.stat2_num, label: banner.stat2_label },
                { num: banner.stat3_num, label: banner.stat3_label }
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black">{s.num}</div>
                  <div className="text-xs text-white/80 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content – student images + scholarship badge */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Scholarship badge */}
            <div className="absolute top-0 right-0 z-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-4 shadow-2xl text-center animate-bounce-slow">
              <div className="text-3xl font-black">{banner.scholarship_pct}%</div>
              <div className="text-xs font-bold">HỌC BỔNG</div>
              <div className="text-xs opacity-80">{banner.scholarship_label}</div>
            </div>

            {/* Main student image */}
            <div className="relative z-10">
              <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img
                  src={banner.img_main}
                  alt="Du học sinh Nhật Bản Hàn Quốc Đài Loan"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Secondary image */}
              <div className="absolute -bottom-8 -right-10 w-44 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <img
                  src={banner.img_secondary}
                  alt="Sinh viên vui vẻ"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Third image */}
              <div className="absolute -top-6 -left-10 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
                <img
                  src={banner.img_tertiary}
                  alt="Sinh viên tốt nghiệp"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Quick info badge */}
            <div className="absolute bottom-20 left-0 z-30 bg-white rounded-2xl px-4 py-3 shadow-xl space-y-1 min-w-[200px]">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500">🌐</span>
                <span className="font-semibold">hcit.com.vn</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500">📍</span>
                <span>Số 6, Trịnh Văn Bô, Nam Từ Liêm</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-orange-500">📞</span>
                <a href="tel:0966198186" className="font-bold text-orange-500">0966 198 186</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>
  );
}
