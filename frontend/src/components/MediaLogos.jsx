const mediaLogos = [
  { name: 'Kalmbach Media', src: '/assets/company/Kalmbach_Media.png' },
  { name: 'Emerald Group',  src: '/assets/company/emerald_group.png' },
  { name: 'MediaPro',       src: '/assets/company/mediapro.jpg' },
  { name: 'Cốc Cốc Creative', src: '/assets/company/creative.png' },
  { name: 'Mắt Bão',       src: '/assets/company/mat_bao.png' },
  { name: 'Dân Trí',        src: '/assets/company/Dan_Tri.png' },
  { name: 'Nhân Dân',       src: '/assets/company/nhan_dan.png' },
  { name: 'VietnamNet',     src: '/assets/company/vietnamnet.png' },
];

export default function MediaLogos() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="section-title">Đối tác & Truyền thông</h2>
          <p className="section-subtitle">
            HCIT được các cơ quan truyền thông và đối tác uy tín trong và ngoài nước tin tưởng hợp tác
          </p>
        </div>

        {/* Media logos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 animate-on-scroll">
          {mediaLogos.map((m, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer h-24"
            >
              <img
                src={m.src}
                alt={m.name}
                className="max-h-16 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 animate-on-scroll">
          {[
            { title: 'Giấy phép XKLĐ', subtitle: 'Số 368/LĐTBXH-GP' },
            { title: 'Được cấp phép', subtitle: 'Bộ LĐ-TB và XH Việt Nam' },
            { title: 'Đối tác quốc tế', subtitle: 'Nhật Bản · Hàn Quốc · Đài Loan' },
            { title: '100% hài lòng', subtitle: 'Từ 1200+ học viên' }
          ].map(b => (
            <div key={b.title} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="font-bold text-gray-800 text-sm">{b.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{b.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
