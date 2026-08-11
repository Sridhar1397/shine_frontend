import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import api from '../../api/publicClient';
import { TestimonialCard } from '../../components/public/Cards';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ListPage.css';
import './TestimonialsPage.css';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api.get('/testimonials').then((r) => { setTestimonials(r.data.data); setLoading(false); });
  }, []);

  return (
    <div>
      <SEO title="Testimonials" description="Read what clients say about their Shine Magics experience." />
      <PageHero eyebrow="Client Stories" title="Moments We're Proud Of" subtitle="Real feedback from weddings, corporate events, and celebrations we've had the honor of being part of." />

      <section className="section">
        <div className="container">
          <div className="section-cta" style={{ marginBottom: 44, marginTop: -10 }}>
            <button className="btn-outline" onClick={() => setShowForm(true)}>Share Your Experience</button>
          </div>

          {loading && <div className="list-empty">Loading testimonials...</div>}
          {!loading && testimonials.length === 0 && <div className="list-empty">No reviews published yet.</div>}

          <div className="grid-3">
            {testimonials.map((t) => <TestimonialCard key={t._id} t={t} />)}
          </div>
        </div>
      </section>

      {showForm && <ReviewFormModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

function ReviewFormModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ customerName: '', email: '', phone: '', eventType: '', rating: '5', review: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      const res = await api.post('/submit-review', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setDone(true);
      void res;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Could not submit your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bm-overlay" onMouseDown={onClose}>
      <div className="bm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="bm-close" onClick={onClose}>✕</button>
        {done ? (
          <div className="bm-success">
            <div className="bm-success-icon">✦</div>
            <h3>Thank You</h3>
            <p>Your review has been submitted and is awaiting approval.</p>
            <button className="btn-gold" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="eyebrow">Share Your Experience</div>
            <h3>Tell Us How It Went</h3>
            <form onSubmit={submit} className="bm-form">
              {error && <div className="bm-error">{error}</div>}
              <div className="bm-grid">
                <input required placeholder="Your Name *" value={form.customerName} onChange={(e) => setField('customerName', e.target.value)} />
                <input placeholder="Phone Number" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                <input placeholder="Event Type" value={form.eventType} onChange={(e) => setField('eventType', e.target.value)} />
              </div>
              <div className="testimonials-rating-picker">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setField('rating', String(n))} className={Number(form.rating) >= n ? 'rated' : ''}>
                    <FiStar size={20} fill={Number(form.rating) >= n ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
              <textarea required rows={4} placeholder="Your review..." value={form.review} onChange={(e) => setField('review', e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="testimonials-file-input" />
              <button type="submit" className="btn-gold bm-submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
