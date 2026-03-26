import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import CoreValues from './components/CoreValues';
import Statistics from './components/Statistics';
import PromoBanner from './components/PromoBanner';
import Testimonials from './components/Testimonials';
import EventsNews from './components/EventsNews';
import MediaLogos from './components/MediaLogos';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import Admin from './pages/Admin';
import GioiThieu from './pages/GioiThieu';
import LienHe from './pages/LienHe';

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Intro />
      <CoreValues />
      <Statistics />
      <PromoBanner />
      <Testimonials />
      <EventsNews />
      <MediaLogos />
    </>
  );
}

function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      {!isAdmin && <Header />}
      {!isAdmin && <FloatingContact />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gioi-thieu/:slug" element={<GioiThieu />} />
          <Route path="/du-hoc/:subcategory" element={<ArticleList section="du-hoc" />} />
          <Route path="/xuat-khau-lao-dong/:subcategory" element={<ArticleList section="xuat-khau-lao-dong" />} />
          <Route path="/tin-tuc/:subcategory" element={<ArticleList section="tin-tuc" />} />
          <Route path="/lien-he" element={<LienHe />} />
          <Route path="/bai-viet/:id" element={<ArticleDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
