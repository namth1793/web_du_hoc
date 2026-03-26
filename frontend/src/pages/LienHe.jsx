import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const PROVINCES = ['Hà Nội','Hồ Chí Minh','Đà Nẵng','Hải Phòng','Cần Thơ','An Giang','Bà Rịa-Vũng Tàu','Bắc Giang','Bắc Kạn','Bạc Liêu','Bắc Ninh','Bến Tre','Bình Định','Bình Dương','Bình Phước','Bình Thuận','Cà Mau','Cao Bằng','Đắk Lắk','Đắk Nông','Điện Biên','Đồng Nai','Đồng Tháp','Gia Lai','Hà Giang','Hà Nam','Hà Tĩnh','Hải Dương','Hậu Giang','Hòa Bình','Hưng Yên','Khánh Hòa','Kiên Giang','Kon Tum','Lai Châu','Lâm Đồng','Lạng Sơn','Lào Cai','Long An','Nam Định','Nghệ An','Ninh Bình','Ninh Thuận','Phú Thọ','Phú Yên','Quảng Bình','Quảng Nam','Quảng Ngãi','Quảng Ninh','Quảng Trị','Sóc Trăng','Sơn La','Tây Ninh','Thái Bình','Thái Nguyên','Thanh Hóa','Thừa Thiên Huế','Tiền Giang','Trà Vinh','Tuyên Quang','Vĩnh Long','Vĩnh Phúc','Yên Bái'];

const NEEDS = [
  'Du học Nhật Bản','Du học Hàn Quốc','Du học Đài Loan','Du học Đức','Du học Úc',
  'Xuất khẩu lao động Nhật Bản','Xuất khẩu lao động Hàn Quốc','Xuất khẩu lao động Đài Loan',
  'Đào tạo ngoại ngữ','Tư vấn nghề nghiệp'
];

const offices = [
  {
    abbr: 'VP',
    label: 'Văn phòng tư vấn',
    address: 'Số 27, Luis VIII, KĐT Luis City, Đại Mỗ, Nam Từ Liêm, Hà Nội',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-500'
  },
  {
    abbr: 'HN',
    label: 'Trụ sở chính',
    address: 'Số 56 Vũ Trọng Phụng, Phường Thanh Xuân Trung, Quận Thanh Xuân, Hà Nội',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-500'
  },
  {
    abbr: 'KR',
    label: 'Văn phòng đại diện Hàn Quốc',
    address: '7, Daegudeul 2-gil, Yangsan-si, Gyeongsangnam-do, Hàn Quốc',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-500'
  }
];

export default function LienHe() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', need: '', province: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post('/api/contact', form);
      setResult({ ok: true, msg: res.data.message });
      setForm({ name: '', phone: '', email: '', address: '', need: '', province: '', message: '' });
    } catch (err) {
      setResult({ ok: false, msg: err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 py-14 mb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-4 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <span className="text-white font-semibold">Liên hệ</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Liên hệ với HCIT</h1>
          <p className="text-white/90 text-base max-w-xl">
            Đội ngũ tư vấn viên HCIT luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Office cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {offices.map((o, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${o.color}`}>
              <div className={`w-10 h-10 ${o.iconBg} rounded-xl flex items-center justify-center text-white font-black text-xs mb-3`}>
                {o.abbr}
              </div>
              <h3 className="font-bold text-gray-800 mb-1.5">{o.label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{o.address}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form – wider */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full flex-shrink-0" />
                Đăng ký tư vấn miễn phí
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                      Điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                      placeholder="0912 345 678"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Địa chỉ</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange}
                    placeholder="Số nhà, đường, quận/huyện..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"/>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nhu cầu của bạn</label>
                    <select name="need" value={form.need} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white">
                      <option value="">-- Chọn nhu cầu --</option>
                      {NEEDS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Tỉnh thành</label>
                    <select name="province" value={form.province} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white">
                      <option value="">-- Chọn tỉnh thành --</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nội dung cần tư vấn</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Tôi muốn tìm hiểu về chương trình du học Hàn Quốc, điều kiện và chi phí..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"/>
                </div>

                {result && (
                  <div className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${result.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {result.ok
                      ? <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      : <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                    }
                    {result.msg}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      ĐĂNG KÝ NGAY
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Bằng cách gửi thông tin, bạn đồng ý với{' '}
                  <a href="#" className="text-orange-500 hover:underline">Chính sách bảo mật</a> của HCIT
                </p>
              </form>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Liên hệ trực tiếp
              </h3>
              <div className="space-y-4">
                {[
                  { abbr: 'VN', label: 'Hotline (VN)', value: '035.9966.168', href: 'tel:0359966168' },
                  { abbr: 'KR', label: 'Hotline (KR)', value: '010-8324-3185', href: 'tel:01083243185' },
                  { abbr: 'EM', label: 'Email', value: 'xkldcongthuong@gmail.com', href: 'mailto:xkldcongthuong@gmail.com' },
                  { abbr: 'WB', label: 'Website', value: 'hcit.com.vn', href: '#' }
                ].map(c => (
                  <a key={c.label} href={c.href}
                    className="flex items-center gap-3 group hover:bg-orange-50 rounded-xl p-2 -mx-2 transition-colors">
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0">{c.abbr}</span>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{c.label}</div>
                      <div className="text-sm font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium mb-3">Mạng xã hội</p>
                <div className="flex gap-2">
                  {[
                    { label: 'Facebook', color: 'bg-blue-600', icon: 'f' },
                    { label: 'Zalo', color: 'bg-blue-500', icon: 'Z' },
                    { label: 'YouTube', color: 'bg-red-600', icon: '▶' },
                    { label: 'TikTok', color: 'bg-gray-900', icon: '♪' }
                  ].map(s => (
                    <a key={s.label} href="#" aria-label={s.label}
                      className={`${s.color} text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity shadow-sm`}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Giờ làm việc
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Thứ 2 – Thứ 6', time: '08:00 – 17:30', active: true },
                  { day: 'Thứ 7', time: '08:00 – 12:00', active: true },
                  { day: 'Chủ nhật', time: 'Nghỉ', active: false }
                ].map(h => (
                  <div key={h.day} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{h.day}</span>
                    <span className={`font-semibold ${h.active ? 'text-green-600' : 'text-gray-400'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-5 bg-orange-500 rounded-full" />
                  Bản đồ
                </h3>
                <p className="text-xs text-gray-400 mt-1">Số 27, Luis VIII, KĐT Luis City, Đại Mỗ, Hà Nội</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.7600!3d20.9900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134536b0a!2zRGFpIE1v!5e0!3m2!1svi!2s!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HCIT Office Map"
              />
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-1">Cam kết tỷ lệ visa 100%</h3>
            <p className="text-orange-100">HCIT – Đồng hành cùng bạn trên mọi hành trình</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="tel:035.9966.168"
              className="bg-white text-orange-600 font-bold px-6 py-3 rounded-full text-sm hover:bg-orange-50 transition-colors shadow-md flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              035.9966.168
            </a>
            <a href="mailto:xkldcongthuong@gmail.com"
              className="bg-orange-700 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-orange-800 transition-colors shadow-md flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              Gửi email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
