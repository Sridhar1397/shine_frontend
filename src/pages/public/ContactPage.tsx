import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { enquiryApi } from '../../api/publicClient';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ContactPage.css';

export default function ContactPage() {
  const { config } = useSiteConfig();
  const contact = config?.contact || {};
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await enquiryApi.post('/enquiries/public/create', {
        customerName: form.name, email: form.email, phone: form.phone,
        message: `${form.subject ? `[${form.subject}] ` : ''}${form.message}`
      });
      setDone(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { url: contact.social?.instagram?.enabled ? contact.social.instagram.url : null, Icon: FaInstagram },
    { url: contact.social?.facebook?.enabled ? contact.social.facebook.url : null, Icon: FaFacebookF },
    { url: contact.social?.youtube?.enabled ? contact.social.youtube.url : null, Icon: FaYoutube },
    { url: contact.social?.whatsapp?.enabled ? contact.social.whatsapp.url : null, Icon: FaWhatsapp }
  ].filter((s) => s.url);

  return (
    <div>
      <SEO title="Contact Us" description={contact.contactPageDescription || 'Get in touch with Shine Magics to plan your next event.'} />
      <PageHero eyebrow="Get In Touch" title={contact.contactPageTitle || "Let's Start Planning"} subtitle={contact.contactPageDescription} />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info-col fade-up">
            {contact.phone && <ContactRow icon={<FiPhone size={16} />} label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />}
            {contact.whatsapp && <ContactRow icon={<FaWhatsapp size={16} />} label="WhatsApp" value={contact.whatsapp} href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} />}
            {contact.email && <ContactRow icon={<FiMail size={16} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />}
            {(contact.addressLine1 || contact.city) && (
              <ContactRow icon={<FiMapPin size={16} />} label="Address" value={[contact.addressLine1, contact.addressLine2, contact.city, contact.state, contact.pincode].filter(Boolean).join(', ')} />
            )}
            {contact.businessHours?.length > 0 && (
              <div className="contact-row">
                <div className="contact-row-icon"><FiClock size={16} /></div>
                <div>
                  <div className="contact-row-label">Business Hours</div>
                  {contact.businessHours.map((bh: any, i: number) => (
                    <div key={i} className="contact-hours-row">
                      <span>{bh.day}</span>
                      <span>{bh.isClosed ? 'Closed' : `${bh.openTime} – ${bh.closeTime}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {socials.length > 0 && (
              <div className="footer-socials" style={{ marginTop: 20 }}>
                {socials.map(({ url, Icon }, i) => <a key={i} href={url!} target="_blank" rel="noreferrer"><Icon size={14} /></a>)}
              </div>
            )}

            {contact.googleMapsEmbed ? (
              <div className="contact-map" dangerouslySetInnerHTML={{ __html: contact.googleMapsEmbed }} />
            ) : contact.googleMapsUrl ? (
              <a className="btn-outline" style={{ marginTop: 20, display: 'inline-flex' }} href={contact.googleMapsUrl} target="_blank" rel="noreferrer">
                <FiMapPin size={14} /> Get Directions
              </a>
            ) : null}
          </div>

          <div className="contact-form-col fade-up">
            <div className="contact-form-card">
              <h3>{contact.contactFormHeading || 'Send Us a Message'}</h3>
              {done ? (
                <div className="bm-success">
                  <div className="bm-success-icon">✦</div>
                  <p>{contact.thankYouMessage || 'Thank you for contacting Shine Magics. Our team will contact you shortly.'}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="bm-form">
                  {error && <div className="bm-error">{error}</div>}
                  <div className="bm-grid">
                    <input required placeholder="Name *" value={form.name} onChange={(e) => setField('name', e.target.value)} />
                    <input required placeholder="Phone *" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                  </div>
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                  <input placeholder="Subject" value={form.subject} onChange={(e) => setField('subject', e.target.value)} />
                  <textarea required rows={4} placeholder="Message" value={form.message} onChange={(e) => setField('message', e.target.value)} />
                  <button type="submit" className="btn-gold bm-submit" disabled={submitting}>
                    {submitting ? 'Sending...' : <>Send Message <FiSend size={14} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = <><div className="contact-row-label">{label}</div><div className="contact-row-value">{value}</div></>;
  return (
    <div className="contact-row">
      <div className="contact-row-icon">{icon}</div>
      {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a> : <div>{content}</div>}
    </div>
  );
}
