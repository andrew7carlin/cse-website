import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from '../common/CookieBanner';

export default function Layout() {
  return (
    <div className="app-shell">
      <a
        href="#main-content"
        style={{
          position: 'absolute', top: '-100px', left: '1rem', zIndex: 99999,
          background: '#b87333', color: '#fff', padding: '0.75rem 1.25rem',
          fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
          borderRadius: '2px', transition: 'top 0.2s ease'
        }}
        onFocus={e => e.target.style.top = '1rem'}
        onBlur={e => e.target.style.top = '-100px'}
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
