import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SECTIONS, GIOI_THIEU_MENU } from '../constants';

const ChevronDown = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

function DropdownMenu({ items, onClose }) {
  return (
    <div className="absolute top-full left-0 mt-1 min-w-[230px] bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
      {items.map((item, i) => (
        <div key={i}>
          {item.href ? (
            <a
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              {item.label}
            </a>
          ) : (
            <Link
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function NavItem({ label, to, dropdown, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!dropdown) {
    return (
      <li>
        {to ? (
          <Link to={to} className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
            {label}
          </Link>
        ) : (
          <a href="#contact" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
            {label}
          </a>
        )}
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${open ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
        onClick={() => setOpen(p => !p)}
      >
        {label}
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      {open && <DropdownMenu items={dropdown} onClose={() => setOpen(false)} />}
    </li>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('VI');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setMobileExpanded(null); }, [location]);

  const duHocMenu = Object.entries(SECTIONS['du-hoc'].subcategories).map(([key, label]) => ({
    label, to: `/du-hoc/${key}`
  }));
  const xklDMenu = Object.entries(SECTIONS['xuat-khau-lao-dong'].subcategories).map(([key, label]) => ({
    label, to: `/xuat-khau-lao-dong/${key}`
  }));
  const tinTucMenu = Object.entries(SECTIONS['tin-tuc'].subcategories).map(([key, label]) => ({
    label, to: `/tin-tuc/${key}`
  }));

  const navItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Giới thiệu', dropdown: GIOI_THIEU_MENU },
    { label: 'Du học các nước', dropdown: duHocMenu },
    { label: 'Xuất khẩu lao động', dropdown: xklDMenu },
    { label: 'Tin tức', dropdown: tinTucMenu },
    { label: 'Liên hệ' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top bar */}
      <div className="bg-orange-500 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="mailto:info@absduhoc.edu.vn" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              info@absduhoc.edu.vn
            </a>
            <a href="tel:19001899" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              1900 1899
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">EduonlineCenter</span>
            <div className="flex gap-1 ml-3">
              {['VI', 'EN'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${lang === l ? 'bg-white text-orange-500' : 'text-white hover:bg-orange-400'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg leading-none">A</span>
            </div>
            <div>
              <div className="font-black text-orange-500 text-lg leading-none tracking-tight">ABS</div>
              <div className="text-gray-500 text-[10px] leading-none font-medium tracking-wider">DU HỌC</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden xl:flex items-center gap-0.5">
            {navItems.map(item => (
              <NavItem key={item.label} {...item} />
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a href="#contact"
              className="hidden md:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
              Đăng ký
            </a>

            {/* Hamburger */}
            <button className="xl:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`xl:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {navItems.map(item => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-all"
                    >
                      {item.label}
                      <span className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}><ChevronDown /></span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${mobileExpanded === item.label ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="ml-4 flex flex-col gap-0.5 py-1">
                        {item.dropdown.map((sub, i) => (
                          sub.href ? (
                            <a key={i} href={sub.href} onClick={() => setMenuOpen(false)}
                              className="py-2 px-4 text-sm text-gray-600 hover:text-orange-500 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />{sub.label}
                            </a>
                          ) : (
                            <Link key={i} to={sub.to} onClick={() => setMenuOpen(false)}
                              className="py-2 px-4 text-sm text-gray-600 hover:text-orange-500 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-300" />{sub.label}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  </>
                ) : item.to ? (
                  <Link to={item.to} onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
                    {item.label}
                  </Link>
                ) : (
                  <a href="#contact" onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-4 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="mt-2 bg-orange-500 text-white text-center py-2.5 rounded-full text-sm font-semibold">
              Đăng ký tư vấn
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
