import { useEffect, useMemo, useState } from 'react';
import api from '../../api/publicClient';
import { ServiceCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ListPage.css';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/services').then((r) => { setServices(r.data.data); setLoading(false); });
  }, []);

  const categories = useMemo(() => Array.from(new Set(services.map((s) => s.serviceCategory).filter(Boolean))), [services]);

  const filtered = services.filter((s) => {
    if (category && s.serviceCategory !== category) return false;
    if (search && !s.serviceName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const featured = filtered.filter((s) => s.featured);
  const rest = filtered.filter((s) => !s.featured);

  return (
    <div>
      <SEO title="Our Services" description="Explore Shine Magics' full range of premium magic and entertainment services for weddings, corporate events, and celebrations." />
      <PageHero eyebrow="Our Services" title="Signature Entertainment, Tailored to You" subtitle="From intimate close-up magic to full stage productions, every performance is designed around your event." />

      <section className="section">
        <div className="container">
          <div className="list-filters">
            <input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="list-filter-pills">
              <button className={`pill ${category === '' ? 'pill-active' : ''}`} onClick={() => setCategory('')}>All</button>
              {categories.map((c) => (
                <button key={c} className={`pill ${category === c ? 'pill-active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          {loading && <div className="list-empty">Loading services...</div>}
          {!loading && filtered.length === 0 && <div className="list-empty">No services match your search yet.</div>}

          {featured.length > 0 && (
            <>
              <h3 className="list-subheading">Featured</h3>
              <div className="grid-3" style={{ marginBottom: 48 }}>
                {featured.map((s) => <ServiceCard key={s._id} service={s} />)}
              </div>
            </>
          )}

          {rest.length > 0 && (
            <>
              {featured.length > 0 && <h3 className="list-subheading">All Services</h3>}
              <div className="grid-3">
                {rest.map((s) => <ServiceCard key={s._id} service={s} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
