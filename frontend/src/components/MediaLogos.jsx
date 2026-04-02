const mediaLogos = [
  { name: 'Kalmbach Media', color: '#1a4b8c', bg: '#e8f0fb' },
  { name: 'Emerald Group', color: '#00693e', bg: '#e6f4ed' },
  { name: 'MediaPro', color: '#1d2d50', bg: '#e8eaf6' },
  { name: 'Cốc Cốc Creative', color: '#e87722', bg: '#fff3e8' },
  { name: 'Mắt Bão', color: '#d62b2b', bg: '#fde8e8' },
  { name: 'Dân Trí', color: '#e65c00', bg: '#fff0e6' },
  { name: 'Nhân Dân', color: '#c0392b', bg: '#fdecea' },
  { name: 'VietnamNet', color: '#0059a6', bg: '#e6f0fb' },
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
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <span
                className="text-sm font-black tracking-tight text-center leading-tight"
                style={{ color: m.color }}
              >
                {m.name}
              </span>
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
