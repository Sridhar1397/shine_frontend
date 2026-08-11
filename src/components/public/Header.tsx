import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { fileUrl } from '../../api/publicClient';
import './Header.css';

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Events', path: '/events' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Offers', path: '/offers' },
  { label: 'Contact', path: '/contact' }
];

export function Header() {
  const { config } = useSiteConfig();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logo = config?.branding?.websiteLogo || config?.branding?.mainLogo;
  const brandName = config?.branding?.brandName || 'Shine Magics';
  const whatsapp = config?.contact?.whatsapp;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="header-brand">
          {logo ? <img src={fileUrl(logo)} alt={brandName} /> : <span className="header-brand-text">{brandName}</span>}
        </NavLink>

        <nav className="header-nav">
          {NAV.map((n) => (
            <NavLink key={n.path} to={n.path} className={({ isActive }) => `header-link ${isActive ? 'header-link-active' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {whatsapp && (
            <a className="header-wa" href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
              <FaWhatsapp size={16} />
            </a>
          )}
          <button className="btn-gold header-cta" onClick={() => navigate('/book')}>Book Now</button>
          <button className="header-burger" onClick={() => setOpen(true)}><FiMenu size={22} /></button>
        </div>
      </div>

      {open && (
        <div className="header-mobile-overlay" onClick={() => setOpen(false)}>
          <div className="header-mobile-panel" onClick={(e) => e.stopPropagation()}>
            <button className="header-mobile-close" onClick={() => setOpen(false)}><FiX size={22} /></button>
            {NAV.map((n) => (
              <NavLink key={n.path} to={n.path} onClick={() => setOpen(false)} className="header-mobile-link">
                {n.label}
              </NavLink>
            ))}
            <button className="btn-gold" onClick={() => { setOpen(false); navigate('/book'); }}>Book Now</button>
          </div>
        </div>
      )}
    </header>
  );
}
