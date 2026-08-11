import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnnouncementBar } from './AnnouncementBar';
import { WhatsAppFloat } from './WhatsAppFloat';
import { trackVisit } from '../../api/publicClient';

export function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="public-shell">
      <AnnouncementBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
