import { useEffect, useState } from 'react';
import api from '../../api/publicClient';
import { EventCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ListPage.css';

export default function EventsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/events', { params: { section: tab } }).then((r) => { setEvents(r.data.data); setLoading(false); });
  }, [tab]);

  return (
    <div>
      <SEO title="Events" description="See what's coming up and relive past Shine Magics performances and shows." />
      <PageHero eyebrow="Events" title="Where the Magic Happens" subtitle="From public shows to private celebrations — see what's on and what's already left audiences amazed." />

      <section className="section">
        <div className="container">
          <div className="list-filter-pills" style={{ marginBottom: 40 }}>
            <button className={`pill ${tab === 'upcoming' ? 'pill-active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming Events</button>
            <button className={`pill ${tab === 'past' ? 'pill-active' : ''}`} onClick={() => setTab('past')}>Past Events</button>
          </div>

          {loading && <div className="list-empty">Loading events...</div>}
          {!loading && events.length === 0 && <div className="list-empty">No {tab} events right now — check back soon.</div>}

          <div className="grid-3">
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
