import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { enquiryApi } from '../../api/publicClient';
import api from '../../api/publicClient';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './ContactPage.css';

const initialForm = {
  customerName: '', phone: '', whatsapp: '', email: '', eventType: '', eventDate: '', eventStartTime: '',
  expectedGuests: '', venueName: '', city: '', selectedPackage: '', customerBudget: '', message: '', specialRequirements: ''
};

export default function BookPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.data));
    const svc = searchParams.get('service');
    if (svc) setForm((f) => ({ ...f, message: `Enquiring about: ${svc}\n${f.message}` }));
  }, [searchParams]);

  const setField = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await enquiryApi.post('/enquiries/public/create', {
        ...form,
        expectedGuests: form.expectedGuests ? Number(form.expectedGuests) : undefined,
        customerBudget: form.customerBudget ? Number(form.customerBudget) : undefined
      });
      setDone(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO title="Book Now / Enquire" description="Tell us about your event and get a personalized quote from Shine Magics." />
      <PageHero eyebrow="Book Now" title="Let's Plan Something Magical" subtitle="Share a few details about your event and our team will be in touch shortly." />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="contact-form-card">
            {done ? (
              <div className="bm-success">
                <div className="bm-success-icon">✦</div>
                <h3>Thank You</h3>
                <p>{done}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="bm-form">
                {error && <div className="bm-error">{error}</div>}
                <div className="bm-grid">
                  <input required placeholder="Your Name *" value={form.customerName} onChange={(e) => setField('customerName', e.target.value)} />
                  <input required placeholder="Phone Number *" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                  <input placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} />
                  <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                  <select value={form.eventType} onChange={(e) => setField('eventType', e.target.value)}>
                    <option value="">Event Type</option>
                    <option>Wedding</option><option>Birthday</option><option>Corporate Event</option>
                    <option>Anniversary</option><option>Private Party</option><option>Other</option>
                  </select>
                  <select value={form.selectedPackage} onChange={(e) => setField('selectedPackage', e.target.value)}>
                    <option value="">Preferred Service (optional)</option>
                    {services.map((s) => <option key={s._id} value={s.serviceName}>{s.serviceName}</option>)}
                  </select>
                  <input type="date" value={form.eventDate} onChange={(e) => setField('eventDate', e.target.value)} />
                  <input type="time" value={form.eventStartTime} onChange={(e) => setField('eventStartTime', e.target.value)} />
                  <input placeholder="Number of Guests" value={form.expectedGuests} onChange={(e) => setField('expectedGuests', e.target.value)} />
                  <input placeholder="City" value={form.city} onChange={(e) => setField('city', e.target.value)} />
                  <input placeholder="Venue Name" value={form.venueName} onChange={(e) => setField('venueName', e.target.value)} />
                  <input placeholder="Budget (optional)" value={form.customerBudget} onChange={(e) => setField('customerBudget', e.target.value)} />
                </div>
                <textarea rows={3} placeholder="Tell us about your event..." value={form.message} onChange={(e) => setField('message', e.target.value)} />
                <textarea rows={2} placeholder="Special requirements (optional)" value={form.specialRequirements} onChange={(e) => setField('specialRequirements', e.target.value)} />
                <button type="submit" className="btn-gold bm-submit" disabled={submitting}>
                  {submitting ? 'Sending...' : <>Send Enquiry <FiSend size={14} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
