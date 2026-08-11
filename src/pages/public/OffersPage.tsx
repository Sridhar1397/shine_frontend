import { useEffect, useState } from 'react';
import api from '../../api/publicClient';
import { OfferCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ListPage.css';

export default function OffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/offers').then((r) => { setOffers(r.data.data); setLoading(false); });
  }, []);

  return (
    <div>
      <SEO title="Offers & Promotions" description="Current offers and promotions from Shine Magics." />
      <PageHero eyebrow="Limited Time" title="Offers & Promotions" subtitle="Special pricing and seasonal promotions on our most-loved experiences." />

      <section className="section">
        <div className="container">
          {loading && <div className="list-empty">Loading offers...</div>}
          {!loading && offers.length === 0 && <div className="list-empty">No active offers right now — check back soon.</div>}
          <div className="grid-3">
            {offers.map((o) => <OfferCard key={o._id} offer={o} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
