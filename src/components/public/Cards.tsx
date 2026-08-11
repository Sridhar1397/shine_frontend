import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiMapPin, FiCalendar } from 'react-icons/fi';
import { fileUrl } from '../../api/publicClient';
import { useBookingModal } from './BookingModalContext';
import './Cards.css';

export function ServiceCard({ service }: { service: any }) {
  const { openBooking } = useBookingModal();
  return (
    <div className="card service-card fade-up">
      <div className="card-media">
        {service.mainImage ? <img src={fileUrl(service.mainImage)} alt={service.imageAltText || service.serviceName} /> : <div className="card-media-placeholder" />}
        {service.featured && <span className="card-badge">Featured</span>}
      </div>
      <div className="card-body">
        <div className="card-category">{service.serviceCategory}</div>
        <h3>{service.serviceName}</h3>
        <p className="card-desc">{service.shortDescription}</p>
        {service.startingPrice ? <div className="card-price">Starting from ₹{Number(service.startingPrice).toLocaleString('en-IN')}</div> : null}
        <div className="card-actions">
          <Link to={`/services/${service.slug}`} className="card-link">View Details <FiArrowRight size={14} /></Link>
          <button className="btn-outline card-btn-sm" onClick={() => openBooking({ serviceId: service._id, serviceName: service.serviceName })}>Enquire</button>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ event }: { event: any }) {
  return (
    <div className="card event-card fade-up">
      <div className="card-media">
        {event.poster || event.coverImage ? <img src={fileUrl(event.poster || event.coverImage)} alt={event.eventName} /> : <div className="card-media-placeholder" />}
        <span className={`card-badge card-badge-${event.status === 'Completed' ? 'muted' : 'gold'}`}>{event.status}</span>
      </div>
      <div className="card-body">
        <h3>{event.eventName}</h3>
        <div className="card-meta">
          {event.eventDate && <span><FiCalendar size={12} /> {new Date(event.eventDate).toLocaleDateString()}</span>}
          {event.city && <span><FiMapPin size={12} /> {event.city}</span>}
        </div>
        <p className="card-desc">{event.shortDescription}</p>
        <Link to={`/events/${event.slug}`} className="card-link">View Details <FiArrowRight size={14} /></Link>
      </div>
    </div>
  );
}

export function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="card testimonial-card fade-up">
      <div className="testimonial-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} size={13} fill={i < (t.rating || 5) ? 'currentColor' : 'none'} />
        ))}
      </div>
      <p className="testimonial-text">"{t.review}"</p>
      <div className="testimonial-footer">
        {t.customerPhoto && <img src={fileUrl(t.customerPhoto)} alt={t.customerName} className="testimonial-avatar" />}
        <div>
          <div className="testimonial-name">{t.customerName}</div>
          <div className="testimonial-meta">{t.eventType}{t.customerLocation ? ` · ${t.customerLocation}` : ''}</div>
        </div>
      </div>
    </div>
  );
}

export function OfferCard({ offer }: { offer: any }) {
  const { openBooking } = useBookingModal();
  return (
    <div className="card offer-card fade-up">
      {offer.offerImage && <div className="card-media"><img src={fileUrl(offer.offerImage)} alt={offer.offerName} /></div>}
      <div className="card-body">
        <div className="offer-discount">
          {offer.percentageDiscount ? `${offer.percentageDiscount}% OFF` : offer.fixedAmountDiscount ? `₹${offer.fixedAmountDiscount} OFF` : offer.offerType}
        </div>
        <h3>{offer.offerName}</h3>
        <p className="card-desc">{offer.offerDescription}</p>
        {offer.endDate && <div className="offer-validity">Valid until {new Date(offer.endDate).toLocaleDateString()}</div>}
        <button className="btn-gold card-btn-sm" onClick={() => openBooking()}>Claim Offer</button>
      </div>
    </div>
  );
}
