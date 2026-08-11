import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import api, { fileUrl } from '../../api/publicClient';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { useBookingModal } from '../../components/public/BookingModalContext';
import { ServiceCard, TestimonialCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { config } = useSiteConfig();
  const { openBooking } = useBookingModal();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.get(`/services/${slug}`)
      .then((r) => setData(r.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="list-empty">Loading...</div>;
  if (notFound || !data) return <div className="list-empty">Service not found.</div>;

  const { service, relatedServices, testimonials } = data;
  const whatsapp = config?.contact?.whatsapp;
  const gallery = [service.mainImage, ...(service.additionalPhotos || [])].filter(Boolean);

  return (
    <div>
      <SEO title={service.seoTitle || service.serviceName} description={service.seoDescription || service.shortDescription} image={fileUrl(service.socialImage || service.mainImage)} />

      <section className="sd-hero">
        {service.mainImage && <div className="sd-hero-bg" style={{ backgroundImage: `url(${fileUrl(service.mainImage)})` }} />}
        <div className="sd-hero-overlay" />
        <div className="container sd-hero-content fade-up">
          <div className="eyebrow">{service.serviceCategory}</div>
          <h1>{service.serviceName}</h1>
          <p className="sd-hero-desc">{service.shortDescription}</p>
          <div className="hero-actions">
            <button className="btn-gold" onClick={() => openBooking({ serviceId: service._id, serviceName: service.serviceName })}>
              Book This Service <FiArrowRight size={15} />
            </button>
            {whatsapp && (
              <a className="btn-outline" href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'd like a quote for ${service.serviceName}`)}`} target="_blank" rel="noreferrer">
                <FaWhatsapp size={15} /> WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container sd-grid">
          <div className="sd-main">
            {service.detailedDescription && (
              <div className="sd-block">
                <h2>Overview</h2>
                <p>{service.detailedDescription}</p>
              </div>
            )}

            {gallery.length > 1 && (
              <div className="sd-block">
                <h2>Gallery</h2>
                <div className="sd-gallery-grid">
                  {gallery.map((img: string, i: number) => (
                    <img key={i} src={fileUrl(img)} alt={`${service.serviceName} ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {(service.keyFeatures?.length > 0 || service.whatIsIncluded?.length > 0) && (
              <div className="sd-block sd-two-col">
                {service.keyFeatures?.length > 0 && (
                  <div>
                    <h3>Key Features</h3>
                    <ul className="sd-list">{service.keyFeatures.map((f: string, i: number) => <li key={i}><FiCheck size={14} /> {f}</li>)}</ul>
                  </div>
                )}
                {service.whatIsIncluded?.length > 0 && (
                  <div>
                    <h3>What's Included</h3>
                    <ul className="sd-list">{service.whatIsIncluded.map((f: string, i: number) => <li key={i}><FiCheck size={14} /> {f}</li>)}</ul>
                  </div>
                )}
              </div>
            )}

            {service.packages?.length > 0 && (
              <div className="sd-block">
                <h2>Packages</h2>
                <div className="sd-packages">
                  {service.packages.map((pkg: any) => (
                    <div className={`sd-package ${pkg.recommendedPackage ? 'sd-package-recommended' : ''}`} key={pkg._id}>
                      {pkg.recommendedPackage && <span className="sd-package-tag">Recommended</span>}
                      <h4>{pkg.packageName}</h4>
                      {pkg.packagePrice ? <div className="sd-package-price">₹{Number(pkg.packagePrice).toLocaleString('en-IN')}</div> : null}
                      <p>{pkg.packageDescription}</p>
                      {pkg.packageFeatures?.length > 0 && (
                        <ul className="sd-list">{pkg.packageFeatures.map((f: string, i: number) => <li key={i}><FiCheck size={13} /> {f}</li>)}</ul>
                      )}
                      <button className="btn-outline sd-package-btn" onClick={() => openBooking({ serviceId: service._id, serviceName: `${service.serviceName} — ${pkg.packageName}` })}>
                        Enquire About This Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {testimonials?.length > 0 && (
              <div className="sd-block">
                <h2>What Clients Say</h2>
                <div className="grid-2">
                  {testimonials.map((t: any) => <TestimonialCard key={t._id} t={t} />)}
                </div>
              </div>
            )}
          </div>

          <aside className="sd-sidebar">
            <div className="sd-info-card">
              {service.startingPrice ? <div className="sd-info-row"><span>Starting Price</span><strong>₹{Number(service.startingPrice).toLocaleString('en-IN')}</strong></div> : null}
              {service.eventDuration ? <div className="sd-info-row"><span>Duration</span><strong>{service.eventDuration}</strong></div> : null}
              {service.numberOfPerformers ? <div className="sd-info-row"><span>Performers</span><strong>{service.numberOfPerformers}</strong></div> : null}
              {service.indoorOutdoor ? <div className="sd-info-row"><span>Setting</span><strong>{service.indoorOutdoor}</strong></div> : null}
              {service.guestCapacity ? <div className="sd-info-row"><span>Guest Capacity</span><strong>{service.guestCapacity}</strong></div> : null}
              <button className="btn-gold sd-info-cta" onClick={() => openBooking({ serviceId: service._id, serviceName: service.serviceName })}>Request a Quote</button>
            </div>
          </aside>
        </div>
      </section>

      {relatedServices?.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading fade-up">
              <div className="eyebrow">You May Also Like</div>
              <h2>Related Services</h2>
            </div>
            <div className="grid-3">
              {relatedServices.map((s: any) => <ServiceCard key={s._id} service={s} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
