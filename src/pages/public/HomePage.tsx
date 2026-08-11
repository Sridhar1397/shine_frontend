import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api, { fileUrl } from '../../api/publicClient';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { useBookingModal } from '../../components/public/BookingModalContext';
import { ServiceCard, TestimonialCard, EventCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import './HomePage.css';

export default function HomePage() {
  const { config } = useSiteConfig();
  const { openBooking } = useBookingModal();
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get('/services', { params: { homepage: 'true' } }).then((r) => setServices(r.data.data.slice(0, 6)));
    api.get('/testimonials', { params: { homepage: 'true' } }).then((r) => setTestimonials(r.data.data.slice(0, 3)));
    api.get('/events', { params: { section: 'upcoming' } }).then((r) => setUpcomingEvents(r.data.data.slice(0, 3)));
  }, []);

  const hero = config?.hero;
  const about = config?.about;
  const whatsapp = config?.contact?.whatsapp;

  return (
    <div className="home-page">
      <SEO title="Premium Magic & Entertainment for Unforgettable Events" description="Shine Magics brings cinematic, luxury magic shows and entertainment to weddings, corporate events, and celebrations." />

      {/* Hero */}
      <section className="hero">
        {hero?.backgroundImage && <div className="hero-bg" style={{ backgroundImage: `url(${fileUrl(hero.backgroundImage)})` }} />}
        <div className="hero-overlay" />
        <div className="hero-sparkles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="sparkle" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 3}s`
            }} />
          ))}
        </div>
        <div className="container hero-content fade-up">
          <div className="eyebrow">Shine Magics</div>
          <h1>{hero?.heading || 'Where Every Event Becomes a Spectacle'}</h1>
          <p className="hero-desc">{hero?.description || 'Cinematic magic and entertainment, crafted for weddings, corporate events, and celebrations that deserve to be unforgettable.'}</p>
          <div className="hero-actions">
            <button className="btn-gold" onClick={() => openBooking()}>{hero?.bookNowText || 'Book Now'} <FiArrowRight size={15} /></button>
            {whatsapp && (
              <a className="btn-outline" href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                <FaWhatsapp size={15} /> {hero?.whatsappText || 'WhatsApp Us'}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      {about && (
        <section className="section about-section">
          <div className="container about-grid" style={{ flexDirection: about.mediaPosition === 'Right' ? 'row-reverse' : 'row' }}>
            <div className="about-media">
              {about.media?.[0]?.url && <img src={fileUrl(about.media[0].url)} alt="About Shine Magics" />}
            </div>
            <div className="about-text fade-up">
              <div className="eyebrow">About Us</div>
              <h2>{about.heading || 'The Art of Wonder, Perfected'}</h2>
              <p>{about.description}</p>
              <div className="about-stats">
                {about.experienceYears ? <Stat value={about.experienceYears} label="Years Experience" /> : null}
                {about.eventsCompleted ? <Stat value={about.eventsCompleted} label="Events Completed" /> : null}
                {about.happyCustomers ? <Stat value={about.happyCustomers} label="Happy Customers" /> : null}
                {about.citiesServed ? <Stat value={about.citiesServed} label="Cities Served" /> : null}
              </div>
              <Link to="/about" className="card-link">Learn More <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading fade-up">
              <div className="eyebrow">What We Offer</div>
              <h2>Signature Services</h2>
            </div>
            <div className="grid-3">
              {services.map((s) => <ServiceCard key={s._id} service={s} />)}
            </div>
            <div className="section-cta">
              <Link to="/services" className="btn-outline">View All Services <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading fade-up">
              <div className="eyebrow">Don't Miss Out</div>
              <h2>Upcoming Events</h2>
            </div>
            <div className="grid-3">
              {upcomingEvents.map((e) => <EventCard key={e._id} event={e} />)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading fade-up">
              <div className="eyebrow">Client Stories</div>
              <h2>Moments We're Proud Of</h2>
            </div>
            <div className="grid-3">
              {testimonials.map((t) => <TestimonialCard key={t._id} t={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section final-cta">
        <div className="container final-cta-inner fade-up">
          <h2>Ready to Create Something Unforgettable?</h2>
          <p>Tell us about your event and let's bring a little magic to it.</p>
          <button className="btn-gold" onClick={() => openBooking()}>Enquire Now <FiArrowRight size={15} /></button>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="about-stat">
      <div className="about-stat-value">{value}+</div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}
