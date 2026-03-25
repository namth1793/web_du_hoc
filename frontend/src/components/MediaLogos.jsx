const partners = [
  { name: 'Hanyang Univ.', abbr: 'HY', color: '#c41e3a' },
  { name: 'Sejong Univ.', abbr: 'SJ', color: '#004B9E' },
  { name: 'Inha Univ.', abbr: 'IN', color: '#0033A0' },
  { name: 'Konkuk Univ.', abbr: 'KK', color: '#002868' },
  { name: 'NTU Taiwan', abbr: 'NTU', color: '#8B0000' },
  { name: 'NCKU', abbr: 'NK', color: '#003087' },
  { name: 'NTUST', abbr: 'NT', color: '#1B4F72' },
  { name: 'FCU Taiwan', abbr: 'FC', color: '#6B2D8B' },
  { name: 'Keio Univ.', abbr: 'KU', color: '#003087' },
  { name: 'Waseda Univ.', abbr: 'WU', color: '#820000' }
];

export default function MediaLogos() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="section-title">Đối tác liên kết</h2>
          <p className="section-subtitle">
            HCIT hợp tác với các trường đại học, tổ chức giáo dục uy tín tại Nhật Bản, Hàn Quốc và Đài Loan
          </p>
        </div>

        {/* Partner logos grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12 animate-on-scroll">
          {partners.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                  style={{ backgroundColor: p.color }}
                >
                  {p.abbr}
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{p.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Country partners */}
        <div className="animate-on-scroll">
          <p className="text-center text-sm text-gray-500 mb-6 font-medium">Quốc gia đối tác</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: '🇯🇵 Nhật Bản', bg: 'bg-red-50 text-red-600 border-red-200' },
              { name: '🇰🇷 Hàn Quốc', bg: 'bg-blue-50 text-blue-600 border-blue-200' },
              { name: '🇹🇼 Đài Loan', bg: 'bg-green-50 text-green-600 border-green-200' },
              { name: '🏫 Trường đại học Hàn Quốc', bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
              { name: '🏫 Trường đại học Đài Loan', bg: 'bg-purple-50 text-purple-600 border-purple-200' },
              { name: '🏢 Doanh nghiệp Nhật Bản', bg: 'bg-orange-50 text-orange-600 border-orange-200' },
              { name: '🏢 Doanh nghiệp Hàn Quốc', bg: 'bg-sky-50 text-sky-600 border-sky-200' },
              { name: '📋 Tổ chức giáo dục quốc tế', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200' }
            ].map(m => (
              <span
                key={m.name}
                className={`px-4 py-2 rounded-full border text-sm font-medium ${m.bg} hover:scale-105 transition-transform cursor-pointer`}
              >
                {m.name}
              </span>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 animate-on-scroll">
          {[
            { icon: '🏆', title: 'Giấy phép XKLĐ', subtitle: 'Số 368/LĐTBXH-GP' },
            { icon: '✅', title: 'Được cấp phép', subtitle: 'Bộ LĐ-TB và XH Việt Nam' },
            { icon: '🌏', title: 'Đối tác quốc tế', subtitle: 'Nhật Bản · Hàn Quốc · Đài Loan' },
            { icon: '⭐', title: '100% hài lòng', subtitle: 'Từ 1200+ học viên' }
          ].map(b => (
            <div key={b.title} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-bold text-gray-800 text-sm">{b.title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{b.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
