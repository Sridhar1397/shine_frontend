import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { enquiryApi } from '../../api/publicClient';
import './BookingModal.css';

interface Props {
  onClose: () => void;
  prefillService?: string;
  prefillServiceName?: string;
}

const initialForm = {
  customerName: '', phone: '', whatsapp: '', email: '', eventType: '', eventDate: '',
  eventStartTime: '', expectedGuests: '', venueName: '', city: '', selectedPackage: '',
  customerBudget: '', message: '', specialRequirements: ''
};

export function BookingModal({ onClose, prefillService, prefillServiceName }: Props) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setField = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await enquiryApi.post('/enquiries/public/create', {
        ...form,
        expectedGuests: form.expectedGuests ? Number(form.expectedGuests) : undefined,
        customerBudget: form.customerBudget ? Number(form.customerBudget) : undefined,
        selectedService: prefillService || undefined,
        requiredServices: prefillServiceName ? [prefillServiceName] : undefined
      });
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bm-overlay" onMouseDown={onClose}>
      <div className="bm-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="bm-close" onClick={onClose}><FiX size={20} /></button>

        {success ? (
          <div className="bm-success">
            <div className="bm-success-icon">✦</div>
            <h3>Thank You</h3>
            <p>{success}</p>
            <button className="btn-gold" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="eyebrow">Enquire Now</div>
            <h3>Let's Plan Something Magical</h3>
            {prefillServiceName && <p className="bm-prefill">Enquiring about: <strong>{prefillServiceName}</strong></p>}
            <form onSubmit={handleSubmit} className="bm-form">
              {error && <div className="bm-error">{error}</div>}
              <div className="bm-grid">
                <input required placeholder="Your Name *" value={form.customerName} onChange={(e) => setField('customerName', e.target.value)} />
                <input required placeholder="Phone Number *" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                <input placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} />
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setField('email', e.target.value)} />
                <input placeholder="Event Type (Wedding, Birthday...)" value={form.eventType} onChange={(e) => setField('eventType', e.target.value)} />
                <input type="date" placeholder="Event Date" value={form.eventDate} onChange={(e) => setField('eventDate', e.target.value)} />
                <input placeholder="Number of Guests" value={form.expectedGuests} onChange={(e) => setField('expectedGuests', e.target.value)} />
                <input placeholder="City" value={form.city} onChange={(e) => setField('city', e.target.value)} />
                <input placeholder="Venue Name" value={form.venueName} onChange={(e) => setField('venueName', e.target.value)} />
                <input placeholder="Budget (optional)" value={form.customerBudget} onChange={(e) => setField('customerBudget', e.target.value)} />
              </div>
              <textarea rows={3} placeholder="Tell us about your event..." value={form.message} onChange={(e) => setField('message', e.target.value)} />
              <button type="submit" className="btn-gold bm-submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
