import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { fileUrl } from '../../api/publicClient';
import './Footer.css';

export function Footer() {
  const { config } = useSiteConfig();
  const footer = config?.footer || {};
  const brandName = config?.branding?.brandName || 'Shine Magics';

  const socials = [
    { key: 'instagram', url: footer.socialInstagram, Icon: FaInstagram },
    { key: 'facebook', url: footer.socialFacebook, Icon: FaFacebookF },
    { key: 'youtube', url: footer.socialYoutube, Icon: FaYoutube },
    { key: 'whatsapp', url: footer.socialWhatsapp, Icon: FaWhatsapp }
  ].filter((s) => s.url);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {footer.showLogo !== false && (
          <div className="footer-col footer-brand-col">
            {footer.logo ? <img src={fileUrl(footer.logo)} alt={brandName} className="footer-logo" /> : <div className="footer-brand-text">{brandName}</div>}
            {footer.showDescription !== false && <p>{footer.description || 'Premium magic and entertainment for weddings, corporate events, and celebrations.'}</p>}
            {socials.length > 0 && footer.showSocialMedia !== false && (
              <div className="footer-socials">
                {socials.map(({ key, url, Icon }) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer"><Icon size={14} /></a>
                ))}
              </div>
            )}
          </div>
        )}

        {footer.showQuickLinks !== false && (
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/events">Events</Link>
            <Link to="/contact">Contact</Link>
          </div>
        )}

        {footer.showContactInfo !== false && (
          <div className="footer-col">
            <h4>Contact</h4>
            {footer.phone && <div>{footer.phone}</div>}
            {footer.email && <div>{footer.email}</div>}
            {footer.address && <div>{footer.address}</div>}
            {footer.businessHoursText && <div>{footer.businessHoursText}</div>}
          </div>
        )}

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link to="/cancellation-policy">Cancellation Policy</Link>
        </div>
      </div>

      {footer.showCopyright !== false && (
        <div className="footer-bottom">
          {footer.copyrightText || `© ${footer.copyrightYear || new Date().getFullYear()} ${brandName}. All rights reserved.`}
        </div>
      )}
    </footer>
  );
}
