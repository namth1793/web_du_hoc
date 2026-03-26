import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SLUGS = [
  { slug: 'gioi-thieu-chung', label: 'Giới thiệu chung' },
  { slug: 'tam-nhin-su-menh', label: 'Tầm nhìn & Sứ mệnh' },
  { slug: 'co-cau-to-chuc', label: 'Cơ cấu tổ chức' },
  { slug: 'ho-so-phap-ly', label: 'Hồ sơ pháp lý' }
];

// ─── Page: Giới thiệu chung ──────────────────────────────────────────────────
function GioiThieuChung() {
  const industries = [
    'Ngành cơ khí', 'Ngành logistics', 'Ngành nội thất', 'Ngành xây dựng',
    'Ngành CNTT', 'Ngành nhà hàng - khách sạn', 'Ngành điều dưỡng',
    'Ngành bán hàng', 'Ngành thẩm mỹ'
  ];
  const steps = [
    { num: '01', title: 'Tư vấn lựa chọn phương án', desc: 'Phân tích năng lực, nguyện vọng và tư vấn chương trình phù hợp nhất' },
    { num: '02', title: 'Lên kế hoạch, chuẩn bị hồ sơ', desc: 'Lập kế hoạch chi tiết và hỗ trợ chuẩn bị đầy đủ hồ sơ theo yêu cầu' },
    { num: '03', title: 'Tham gia khóa học & thi ngoại ngữ', desc: 'Đào tạo ngoại ngữ và bồi dưỡng kỹ năng cần thiết trước khi xuất cảnh' },
    { num: '04', title: 'Xin visa và hoàn thiện hồ sơ', desc: 'Hỗ trợ toàn diện quy trình xin visa và nộp hồ sơ nhập học/làm việc' },
    { num: '05', title: 'Bay và nhập cảnh', desc: 'Hướng dẫn chuẩn bị hành lý, thủ tục xuất cảnh và nhập cảnh tại nước đến' },
    { num: '06', title: 'Nhập học và trải nghiệm', desc: 'Hỗ trợ ổn định, định hướng cuộc sống và học tập/làm việc tại nước ngoài' }
  ];
  const advantages = [
    { icon: '👨‍💼', title: 'Tư vấn viên chuyên nghiệp', desc: 'Đội ngũ có kinh nghiệm tư vấn du học & xuất khẩu lao động, tận tình và trách nhiệm' },
    { icon: '🛠️', title: 'Dịch vụ toàn diện', desc: 'Hỗ trợ từ A-Z: từ chuẩn bị hồ sơ, xin visa đến nhập học và ổn định cuộc sống' },
    { icon: '✅', title: 'Tỷ lệ hồ sơ thành công cao', desc: 'Tư vấn đúng hướng, phù hợp năng lực học viên giúp tăng tỷ lệ đỗ visa' },
    { icon: '📊', title: 'Thông tin đầy đủ, chính xác', desc: 'Cung cấp thông tin minh bạch, cập nhật liên tục về thị trường du học & lao động' },
    { icon: '🎓', title: 'Đào tạo chuyên sâu', desc: 'Khóa học đa dạng với đội ngũ giảng viên giàu kinh nghiệm, cơ sở vật chất hiện đại' }
  ];

  return (
    <div className="space-y-10">
      {/* About */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
          Giới thiệu về HCIT., JSC
        </h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">
          <p>
            <strong className="text-orange-600">Công ty Cổ phần Cung ứng Xuất khẩu lao động Công thương Hà Nội (HCIT., JSC)</strong> được thành lập với mục tiêu nâng cao hiệu quả quá trình đào tạo, kết nối và tạo cơ hội học tập nâng cao trình độ, tìm kiếm việc làm cho học sinh, sinh viên.
          </p>
          <p>
            HCIT., JSC hoạt động trong lĩnh vực <strong>du học</strong> và <strong>xuất khẩu lao động</strong>, có giấy phép hoạt động xuất khẩu lao động được cấp bởi cơ quan chức năng tại Việt Nam (Số 368/LĐTBXH-GP).
          </p>
          <p>
            Với nhiều năm hoạt động và mạng lưới hợp tác rộng với các trường học quốc tế, doanh nghiệp nước ngoài tại Nhật Bản, Hàn Quốc, Đài Loan, HCIT tự hào là cầu nối tin cậy giúp học viên Việt Nam vươn tầm quốc tế.
          </p>
          <p>
            <strong>Tầm nhìn:</strong> Trở thành đơn vị hàng đầu trong lĩnh vực du học & xuất khẩu lao động.
          </p>
          <p>
            <strong>Sứ mệnh:</strong> Kết nối học viên Việt Nam với cơ hội quốc tế chất lượng cao, đồng hành trên mọi hành trình.
          </p>
        </div>
      </div>

      {/* Industries */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
          Ngành nghề đào tạo / định hướng
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {industries.map((ind, i) => (
            <div key={i} className="flex items-center gap-2 bg-orange-50 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 border border-orange-100">
              <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              {ind}
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
          Quy trình tư vấn tại HCIT
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">{s.num}</div>
              <div>
                <div className="font-bold text-gray-800 text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
          Lợi thế khi chọn HCIT
        </h2>
        <div className="space-y-4">
          {advantages.map((a, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl flex-shrink-0">{a.icon}</div>
              <div>
                <div className="font-bold text-gray-800 mb-1">{a.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Tầm nhìn, Sứ mệnh ────────────────────────────────────────────────
function TamNhinSuMenh() {
  const missions = [
    'Là cầu nối, kết nối cơ hội học tập, làm việc cho học sinh, sinh viên tiếp cận với môi trường học tập, làm việc tại các nước tiên tiến.',
    'Cung cấp nguồn nhân lực đã qua đào tạo, đáp ứng nhu cầu nguồn nhân lực của khách hàng và nước tiếp nhận.',
    'Góp phần nâng cao chất lượng nguồn nhân lực Việt đáp ứng nhu cầu việc làm trong và ngoài nước.'
  ];
  const values = [
    'Uy tín, chất lượng, linh hoạt và hiệu quả',
    'Đề cao lợi ích của Khách hàng trên cơ sở đôi bên cùng có lợi',
    'Tạo môi trường làm việc chuyên nghiệp và thân thiện để mỗi thành viên phát huy tối đa năng lực cá nhân',
    'Đóng góp trách nhiệm vào phát triển cộng đồng'
  ];
  const reasons = [
    'Dịch vụ uy tín và chất lượng, chương trình đa dạng',
    'Đội ngũ nhân viên tận tâm và chuyên nghiệp',
    'Chia sẻ hài hòa lợi ích của các bên',
    'Luôn đồng hành, hỗ trợ tận tình và chu đáo cho các đối tác, du học sinh và người lao động trong suốt quá trình học tập và làm việc ở nước ngoài'
  ];

  return (
    <div className="space-y-10">
      {/* Vision */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">🏆</div>
          <h2 className="text-xl font-bold text-gray-800">Tầm nhìn</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Trở thành <strong className="text-orange-600">Công ty uy tín hàng đầu</strong> về tư vấn du học, xuất khẩu lao động sang các nước khu vực Đông Bắc Á và vươn ra các khu vực trên toàn thế giới.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">🌏</div>
          <h2 className="text-xl font-bold text-gray-800">Sứ mệnh</h2>
        </div>
        <ul className="space-y-3">
          {missions.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 leading-relaxed">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              {m}
            </li>
          ))}
        </ul>
      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white text-xl">✅</div>
          <h2 className="text-xl font-bold text-gray-800">Giá trị cốt lõi</h2>
        </div>
        <ul className="space-y-3">
          {values.map((v, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 leading-relaxed">
              <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              {v}
            </li>
          ))}
        </ul>
      </div>

      {/* Why HCIT */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">⭐</div>
          <h2 className="text-xl font-bold text-gray-800">Vì sao chọn chúng tôi</h2>
        </div>
        <ul className="space-y-3">
          {reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700 leading-relaxed">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Page: Cơ cấu tổ chức ───────────────────────────────────────────────────
function CoCauToChuc() {
  return (
    <div className="space-y-10">
      {/* HCIT School */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm">HCIT</div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Trường Cao đẳng Công thương Hà Nội</h2>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">Cổ đông lớn</span>
          </div>
        </div>
        <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
          <p>
            Trường Cao đẳng Công thương Hà Nội (HCIT) là cổ đông lớn của Công ty Cổ phần Cung ứng Xuất khẩu lao động Công Thương Hà Nội.
          </p>
          <p>
            Trường được thành lập trên cơ sở nâng cấp từ Trường trung cấp Công thương theo quyết định số <strong>1260/QĐ-BGD ĐT ngày 15/4/2015</strong> của Bộ trưởng Bộ Giáo dục và Đào tạo.
          </p>
          <p>
            Hiện trường đào tạo <strong>59 ngành nghề</strong> như: công nghệ thông tin; công nghệ kỹ thuật điện-điện tử; điện dân dụng và công nghiệp; công nghệ ô tô; xây dựng công nghiệp và dân dụng; chăm sóc sức khỏe (dược, điều dưỡng, chăm sóc sắc đẹp); dịch vụ du lịch, nhà hàng khách sạn, giúp việc gia đình... theo các chương trình hệ cao đẳng, hệ trung cấp và sơ cấp.
          </p>
          <p>Mỗi năm Trường đào tạo cho ra trường hơn <strong>4.000 sinh viên</strong>.</p>
          <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
            <span className="text-blue-500">📍</span>
            <span><strong>Trụ sở chính:</strong> Số 54A1, phố Vũ Trọng Phụng, quận Thanh Xuân, thành phố Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Company HCIT JSC */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xs">JSC</div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Công ty Cổ phần Cung ứng Xuất khẩu lao động Công thương Hà Nội</h2>
          </div>
        </div>
        <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
          <p>
            Với mục tiêu nâng cao hiệu quả quá trình đào tạo, kết nối và tạo cơ hội học tập nâng cao trình độ, tìm kiếm việc làm cho học sinh sau khi tốt nghiệp, <strong>Công ty cổ phần Cung ứng Xuất khẩu lao động Công thương Hà Nội (HCIT., JSC)</strong> được thành lập.
          </p>
          <p>
            HCIT., JSC có chức năng kết nối các chương trình đào tạo sinh viên, du học nâng cao trình độ và tìm kiếm việc làm cho học sinh, sinh viên Nhà Trường tại các nước tiên tiến.
          </p>
          <p>
            Ngoài ra, HCIT., JSC cũng cung cấp dịch vụ tư vấn du học, xuất khẩu lao động cho học sinh, sinh viên và người lao động trên cả nước đi học tập, làm việc tại các nước như: <strong>Hàn Quốc, Nhật Bản, Đài Loan...</strong>
          </p>
          <div className="flex items-start gap-2 bg-orange-50 rounded-xl p-3">
            <span className="text-orange-500">📍</span>
            <span><strong>Trụ sở chính:</strong> Số 56, phố Vũ Trọng Phụng, quận Thanh Xuân, thành phố Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Training Facility */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white text-2xl">🏫</div>
          <h2 className="text-lg font-bold text-gray-800">Cơ sở đào tạo</h2>
        </div>
        <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
          <p>
            HCIT có cơ sở đào tạo rộng trên <strong>20.000 m²</strong> là cơ sở thực hiện các hoạt động đào tạo và liên kết đào tạo ngoại ngữ, bồi dưỡng nâng cao tay nghề và giáo dục định hướng cho du học sinh, người lao động trước khi đi học tập, làm việc ở nước ngoài.
          </p>
          <div className="flex items-start gap-2 bg-green-50 rounded-xl p-3">
            <span className="text-green-500">📍</span>
            <span><strong>Địa chỉ:</strong> Xã Đại Áng, huyện Thanh Trì, thành phố Hà Nội</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Hồ sơ pháp lý ────────────────────────────────────────────────────
function HoSoPhapLy() {
  const [activeTab, setActiveTab] = useState('xkld');
  const tabs = [
    { id: 'xkld', label: 'Giấy phép XKLĐ' },
    { id: 'du-hoc', label: 'Giấy phép du học' },
    { id: 'cb', label: 'Danh sách CB thực hiện XKLĐ' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-500'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Giấy phép XKLĐ */}
      {activeTab === 'xkld' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
            Giấy phép XKLĐ
          </h2>

          {/* Document card */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 font-mono text-sm">
            <div className="text-center space-y-1 mb-6 pb-4 border-b border-gray-300">
              <p className="font-bold text-gray-800 uppercase tracking-wide">BỘ LAO ĐỘNG - THƯƠNG BINH VÀ XÃ HỘI</p>
              <p className="font-bold text-gray-700">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p className="text-gray-600">Độc lập - Tự do - Hạnh phúc</p>
              <p className="text-gray-500">─────────────────────────</p>
              <p className="text-gray-600">Số: <strong className="text-orange-600">368/LĐTBXH-GP</strong></p>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-wider">GIẤY PHÉP</h3>
              <p className="font-bold text-gray-700 mt-2">GIẤY PHÉP HOẠT ĐỘNG</p>
              <p className="font-bold text-gray-700">DỊCH VỤ ĐƯA NGƯỜI LAO ĐỘNG VIỆT NAM ĐI LÀM VIỆC</p>
              <p className="font-bold text-gray-700">Ở NƯỚC NGOÀI THEO HỢP ĐỒNG</p>
              <p className="text-gray-500 mt-2 text-xs">Cấp ngày ... tháng ... năm 2024</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-700 mb-2">CĂN CỨ PHÁP LÝ</p>
                <ul className="space-y-1 text-gray-600 text-xs leading-relaxed">
                  <li>• Căn cứ Luật Người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng ngày 13 tháng 11 năm 2020</li>
                  <li>• Căn cứ Nghị định số 112/2021/NĐ-CP ngày 10 tháng 12 năm 2021 của Chính phủ quy định chi tiết một số điều và biện pháp thi hành Luật Người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">QUYẾT ĐỊNH</p>
                <p className="text-gray-600 text-xs mb-3">Điều 1. Cấp Giấy phép đối với:</p>
                <div className="bg-white rounded-xl p-4 space-y-2 border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-gray-500">Tên doanh nghiệp (tiếng Việt):</span>
                    <span className="font-bold text-gray-800">CÔNG TY CỔ PHẦN CUNG ỨNG XUẤT KHẨU LAO ĐỘNG CÔNG THƯƠNG HÀ NỘI</span>
                    <span className="text-gray-500">Tên tiếng Anh:</span>
                    <span className="font-semibold text-gray-700">HANOI INDUSTRIAL AND TRADING SUPPLY LABOR EXPORT JOINT STOCK COMPANY</span>
                    <span className="text-gray-500">Tên viết tắt:</span>
                    <span className="font-bold text-orange-600">HCIT., JSC</span>
                    <span className="text-gray-500">Mã số doanh nghiệp:</span>
                    <span className="font-semibold text-gray-700">0108648533</span>
                    <span className="text-gray-500">Ngày đăng ký lần đầu:</span>
                    <span className="font-semibold text-gray-700">14/3/2019</span>
                    <span className="text-gray-500">Nơi cấp:</span>
                    <span className="font-semibold text-gray-700">Sở Kế hoạch và Đầu tư thành phố Hà Nội</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-700 mb-2">NGƯỜI ĐẠI DIỆN</p>
                <p className="text-gray-600 text-xs">
                  Người đại diện theo pháp luật trong hoạt động dịch vụ đưa người lao động đi làm việc ở nước ngoài theo hợp đồng:
                </p>
                <p className="font-bold text-gray-800 text-sm mt-1">Ông Nguyễn Hoàng Hải – Tổng Giám đốc</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                <p className="font-bold text-yellow-800 text-xs mb-1">GHI CHÚ</p>
                <p className="text-yellow-700 text-xs">Được đổi từ Giấy phép số 1166/LĐTBXH-GP cấp ngày 25/10/2019 theo Luật Người lao động Việt Nam đi làm việc ở nước ngoài theo hợp đồng số 72/2006/QH11.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-sm">
            <p className="text-blue-700">
              <strong>Kiểm tra giấy phép:</strong> Quý khách có thể kiểm tra tính xác thực của Giấy phép Xuất khẩu Lao động tại cổng thông tin của Cục Quản lý Lao động ngoài nước (DOLAB) – Bộ LĐ-TBXH.
            </p>
          </div>
        </div>
      )}

      {/* Du học */}
      {activeTab === 'du-hoc' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
            Giấy phép du học
          </h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center text-gray-500">
            <div className="text-4xl mb-3">📄</div>
            <p className="font-medium">Tài liệu đang được cập nhật</p>
            <p className="text-sm mt-1">Vui lòng liên hệ hotline <strong className="text-orange-500">035.9966.168</strong> để được cung cấp thông tin chi tiết</p>
          </div>
        </div>
      )}

      {/* Danh sách CB */}
      {activeTab === 'cb' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
            Danh sách cán bộ thực hiện XKLĐ
          </h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center text-gray-500">
            <div className="text-4xl mb-3">👥</div>
            <p className="font-medium">Tài liệu đang được cập nhật</p>
            <p className="text-sm mt-1">Vui lòng liên hệ hotline <strong className="text-orange-500">035.9966.168</strong> để được cung cấp thông tin chi tiết</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONTENT MAP ─────────────────────────────────────────────────────────────
const CONTENT = {
  'gioi-thieu-chung': {
    title: 'Giới thiệu chung',
    cover: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    Component: GioiThieuChung
  },
  'tam-nhin-su-menh': {
    title: 'Tầm nhìn, Sứ mệnh & Giá trị cốt lõi',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    Component: TamNhinSuMenh
  },
  'co-cau-to-chuc': {
    title: 'Cơ cấu tổ chức',
    cover: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80',
    Component: CoCauToChuc
  },
  'ho-so-phap-ly': {
    title: 'Hồ sơ pháp lý',
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    Component: HoSoPhapLy
  }
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GioiThieu() {
  const { slug } = useParams();
  const page = CONTENT[slug];

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Trang không tồn tại.</p>
          <Link to="/" className="mt-4 inline-block text-orange-500 hover:underline">Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const { Component } = page;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-orange-500 font-medium">Giới thiệu</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          <span className="text-gray-800 font-semibold">{page.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-orange-500 px-4 py-3">
                <h3 className="text-white font-bold text-sm">Giới thiệu HCIT</h3>
              </div>
              <nav className="py-2">
                {SLUGS.map(item => (
                  <Link
                    key={item.slug}
                    to={`/gioi-thieu/${item.slug}`}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                      item.slug === slug
                        ? 'bg-orange-50 text-orange-600 font-semibold border-l-2 border-l-orange-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-orange-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.slug === slug ? 'bg-orange-500' : 'bg-gray-300'}`} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Cover image */}
            <div className="h-56 md:h-72 rounded-2xl overflow-hidden mb-6 shadow-md">
              <img src={page.cover} alt={page.title} className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              {/* Title */}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                <div className="w-1.5 h-10 bg-orange-500 rounded-full flex-shrink-0" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{page.title}</h1>
              </div>

              {/* Dynamic content */}
              <Component />
            </div>

            {/* CTA */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-lg">Bạn cần tư vấn?</p>
                <p className="text-orange-100 text-sm">Đội ngũ HCIT luôn sẵn sàng hỗ trợ bạn</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a href="tel:035.9966.168"
                  className="bg-white text-orange-600 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-orange-50 transition-colors shadow-md">
                  035.9966.168
                </a>
                <Link to="/lien-he"
                  className="bg-orange-700 text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-orange-800 transition-colors shadow-md">
                  Đăng ký tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
