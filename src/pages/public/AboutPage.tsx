import { useEffect, useState } from 'react';
import api, { fileUrl } from '../../api/publicClient';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './HomePage.css';

export default function AboutPage() {
  const { config } = useSiteConfig();
  const about = config?.about;
  const [servicesCount, setServicesCount] = useState<number | null>(null);

  useEffect(() => {
    api.get('/services').then((r) => setServicesCount(r.data.data.length));
  }, []);

  return (
    <div>
      <SEO title="About Us" description="Learn about Shine Magics — our story, our mission, and the experience behind every performance." />
      <PageHero eyebrow="Our Story" title="About Shine Magics" subtitle={about?.description?.slice(0, 140)} />

      <section className="section">
        <div className="container about-grid" style={{ flexDirection: about?.mediaPosition === 'Right' ? 'row-reverse' : 'row' }}>
          <div className="about-media">
            {about?.media?.[0]?.url ? <img src={fileUrl(about.media[0].url)} alt="Shine Magics" /> : <div className="card-media-placeholder" style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-lg)' }} />}
          </div>
          <div className="about-text fade-up">
            <div className="eyebrow">Who We Are</div>
            <h2>{about?.heading || 'A Team Devoted to Wonder'}</h2>
            <p>{about?.description || 'Shine Magics brings premium, cinematic magic and entertainment to weddings, corporate events, and celebrations across the region.'}</p>
            <div className="about-stats">
              {about?.experienceYears ? <StatBlock v={about.experienceYears} l="Years Experience" /> : null}
              {about?.eventsCompleted ? <StatBlock v={about.eventsCompleted} l="Events Completed" /> : null}
              {about?.happyCustomers ? <StatBlock v={about.happyCustomers} l="Happy Customers" /> : null}
              {servicesCount ? <StatBlock v={servicesCount} l="Signature Services" /> : null}
            </div>
          </div>
        </div>
      </section>

      {(about?.mission || about?.vision) && (
        <section className="section section-alt">
          <div className="container grid-2">
            {about.mission && (
              <div className="fade-up">
                <div className="eyebrow">Mission</div>
                <p style={{ fontSize: 15, color: 'var(--text-primary)' }}>{about.mission}</p>
              </div>
            )}
            {about.vision && (
              <div className="fade-up">
                <div className="eyebrow">Vision</div>
                <p style={{ fontSize: 15, color: 'var(--text-primary)' }}>{about.vision}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function StatBlock({ v, l }: { v: number; l: string }) {
  return (
    <div className="about-stat">
      <div className="about-stat-value">{v}+</div>
      <div className="about-stat-label">{l}</div>
    </div>
  );
}
