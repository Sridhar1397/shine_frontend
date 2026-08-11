import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api, { fileUrl } from '../../api/publicClient';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { useBookingModal } from '../../components/public/BookingModalContext';
import { SEO } from '../../components/public/SEO';
import './ServiceDetailPage.css';
import './ListPage.css';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { config } = useSiteConfig();
  const { openBooking } = useBookingModal();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.get(`/events/${slug}`).then((r) => setEvent(r.data.data)).catch(() => setNotFound(true)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="list-empty">Loading...</div>;
  if (notFound || !event) return <div className="list-empty">Event not found.</div>;

  const whatsapp = config?.contact?.whatsapp;
  const mapEmbed = event.googleMapsLocation;

  return (
    <div>
      <SEO title={event.seoTitle || event.eventName} description={event.seoDescription || event.shortDescription} image={fileUrl(event.socialImage || event.poster)} />

      <section className="sd-hero">
        {(event.poster || event.coverImage) && <div className="sd-hero-bg" style={{ backgroundImage: `url(${fileUrl(event.poster || event.coverImage)})` }} />}
        <div className="sd-hero-overlay" />
        <div className="container sd-hero-content fade-up">
          <div className="eyebrow">{event.status}</div>
          <h1>{event.eventName}</h1>
          <div className="card-meta" style={{ margin: '14px 0' }}>
            {event.eventDate && <span><FiCalendar size={13} /> {new Date(event.eventDate).toLocaleDateString()} {event.startTime}</span>}
            {event.venueName && <span><FiMapPin size={13} /> {event.venueName}, {event.city}</span>}
            {event.numberOfGuests && <span><FiUsers size={13} /> {event.numberOfGuests} guests</span>}
          </div>
          {event.enquiryAvailable && (
            <div className="hero-actions">
              <button className="btn-gold" onClick={() => openBooking()}>Enquire Now <FiArrowRight size={15} /></button>
              {whatsapp && (
                <a className="btn-outline" href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${event.eventName}`)}`} target="_blank" rel="noreferrer">
                  <FaWhatsapp size={15} /> WhatsApp Us
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container sd-grid">
          <div className="sd-main">
            {event.detailedDescription && (
              <div className="sd-block">
                <h2>About This Event</h2>
                <p>{event.detailedDescription}</p>
              </div>
            )}

            {event.eventHighlights?.length > 0 && (
              <div className="sd-block">
                <h2>Highlights</h2>
                <ul className="sd-list">{event.eventHighlights.map((h: string, i: number) => <li key={i}>✦ {h}</li>)}</ul>
              </div>
            )}

            {event.galleryPhotos?.length > 0 && (
              <div className="sd-block">
                <h2>Gallery</h2>
                <div className="sd-gallery-grid">
                  {event.galleryPhotos.map((img: string, i: number) => <img key={i} src={fileUrl(img)} alt={`${event.eventName} ${i + 1}`} />)}
                </div>
              </div>
            )}

            {mapEmbed && (
              <div className="sd-block">
                <h2>Venue</h2>
                <p>{event.fullAddress}</p>
              </div>
            )}
          </div>

          <aside className="sd-sidebar">
            <div className="sd-info-card">
              {event.venueName ? <div className="sd-info-row"><span>Venue</span><strong>{event.venueName}</strong></div> : null}
              {event.eventDuration ? <div className="sd-info-row"><span>Duration</span><strong>{event.eventDuration}</strong></div> : null}
              {event.ticketRequired ? <div className="sd-info-row"><span>Ticket Price</span><strong>₹{event.ticketPrice}</strong></div> : null}
              {event.maximumCapacity ? <div className="sd-info-row"><span>Capacity</span><strong>{event.maximumCapacity}</strong></div> : null}
              {event.enquiryAvailable && (
                <button className="btn-gold sd-info-cta" onClick={() => openBooking()}>Enquire Now</button>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
