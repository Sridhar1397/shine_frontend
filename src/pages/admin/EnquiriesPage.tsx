import { useCallback, useEffect, useState } from 'react';
import { FiPhone, FiMessageCircle, FiMail, FiPlus, FiX, FiClock } from 'react-icons/fi';
import api from '../../api/adminClient';
import { DataTable } from '../../components/admin/DataTable';
import { Button, Card, StatusBadge } from '../../components/admin/ui';
import './EnquiriesPage.css';

const ENQUIRY_STATUSES = ['New', 'Contacted', 'Follow-up Required', 'Quotation Sent', 'Negotiation', 'Confirmed', 'Completed', 'Cancelled'];
const BOOKING_STATUSES = ['Enquiry', 'Quotation Sent', 'Booking Pending', 'Booking Confirmed', 'Advance Paid', 'Fully Paid', 'Event Completed', 'Cancelled'];

const columns = [
  { key: 'enquiryId', label: 'Enquiry ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'phone', label: 'Phone' },
  { key: 'eventType', label: 'Event Type' },
  { key: 'eventDate', label: 'Event Date' },
  { key: 'quotedPrice', label: 'Quoted Price' },
  { key: 'enquiryStatus', label: 'Status', isStatus: true },
  { key: 'paymentStatus', label: 'Payment', isStatus: true }
];

export default function EnquiriesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/enquiries', { params: { page, limit: 12, search: search || undefined, status: statusFilter || undefined, dateField: 'eventDate' } });
      setRows(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const openDetail = async (row: any) => {
    const res = await api.get(`/enquiries/${row._id}`);
    setSelected(res.data.data);
  };

  const download = async (kind: 'excel' | 'pdf') => {
    const res = await api.get(`/enquiries/export/${kind}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url; a.download = `enquiries.${kind === 'excel' ? 'xlsx' : 'pdf'}`; a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="eq-page">
      <div className="rm-header">
        <div>
          <h2>Booking / Enquiry Management</h2>
          <p className="rm-sub">{total} enquiries in your database</p>
        </div>
      </div>

      <Card className="rm-table-card">
        <DataTable
          columns={columns as any}
          rows={rows}
          total={total}
          page={page}
          pages={pages}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          statusOptions={ENQUIRY_STATUSES}
          onStatusFilterChange={setStatusFilter}
          onPageChange={setPage}
          onEdit={openDetail}
          onHardDelete={async (row) => {
            if (!confirm('Permanently delete this enquiry?')) return;
            await api.delete(`/enquiries/${row._id}`);
            load();
          }}
          onExportExcel={() => download('excel')}
          onExportPdf={() => download('pdf')}
          loading={loading}
        />
      </Card>

      {selected && (
        <EnquiryDetail
          enquiry={selected}
          onClose={() => setSelected(null)}
          onUpdated={() => { load(); }}
        />
      )}
    </div>
  );
}

function EnquiryDetail({ enquiry, onClose, onUpdated }: { enquiry: any; onClose: () => void; onUpdated: () => void }) {
  const [data, setData] = useState(enquiry);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    const res = await api.get(`/enquiries/${data._id}`);
    setData(res.data.data);
  };

  const changeStatus = async (field: 'enquiryStatus' | 'bookingStatus', value: string) => {
    setSaving(true);
    try {
      await api.put(`/enquiries/${data._id}/status`, { [field]: value });
      await refresh();
      onUpdated();
    } finally {
      setSaving(false);
    }
  };

  const addFollowUp = async () => {
    if (!note.trim()) return;
    await api.post(`/enquiries/${data._id}/followup`, { note });
    setNote('');
    await refresh();
    onUpdated();
  };

  const generateInvoice = async () => {
    try {
      await api.post(`/invoices/generate/${data._id}`);
      alert('Invoice generated successfully.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Could not generate invoice');
    }
  };

  const waLink = data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/\D/g, '')}` : undefined;

  return (
    <div className="rf-overlay" onMouseDown={onClose}>
      <div className="eq-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="rf-header">
          <div>
            <h3>{data.customerName}</h3>
            <span className="eq-id mono">{data.enquiryId}</span>
          </div>
          <button className="rf-close" onClick={onClose}><FiX size={18} /></button>
        </div>

        <div className="eq-quick-actions">
          <a className="eq-qa-btn" href={`tel:${data.phone}`}><FiPhone size={14} /> Call</a>
          {waLink && <a className="eq-qa-btn" href={waLink} target="_blank" rel="noreferrer"><FiMessageCircle size={14} /> WhatsApp</a>}
          {data.email && <a className="eq-qa-btn" href={`mailto:${data.email}`}><FiMail size={14} /> Email</a>}
          <button className="eq-qa-btn" onClick={generateInvoice}>Generate Invoice</button>
        </div>

        <div className="rf-body">
          <div className="eq-status-row">
            <div>
              <label>Enquiry Status</label>
              <select disabled={saving} value={data.enquiryStatus} onChange={(e) => changeStatus('enquiryStatus', e.target.value)}>
                {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Booking Status</label>
              <select disabled={saving} value={data.bookingStatus} onChange={(e) => changeStatus('bookingStatus', e.target.value)}>
                {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <DetailSection title="Customer Details">
            <Row label="Phone" value={data.phone} />
            <Row label="WhatsApp" value={data.whatsapp} />
            <Row label="Email" value={data.email} />
            <Row label="Company" value={data.companyName} />
          </DetailSection>

          <DetailSection title="Event Details">
            <Row label="Event Type" value={data.eventType} />
            <Row label="Event Date" value={data.eventDate ? new Date(data.eventDate).toLocaleDateString() : ''} />
            <Row label="Guests" value={data.expectedGuests} />
            <Row label="City" value={data.city} />
            <Row label="Venue" value={data.venueName} />
          </DetailSection>

          <DetailSection title="Requirement">
            <Row label="Message" value={data.message} full />
            <Row label="Special Requirements" value={data.specialRequirements} full />
          </DetailSection>

          <DetailSection title="Pricing">
            <Row label="Estimated Price" value={data.estimatedPrice} />
            <Row label="Quoted Price" value={data.quotedPrice} />
            <Row label="Final Price" value={data.finalPrice} />
            <Row label="Advance Amount" value={data.advanceAmount} />
            <Row label="Payment Status" value={<StatusBadge value={data.paymentStatus} />} />
          </DetailSection>

          <DetailSection title="Follow-ups">
            <div className="eq-followups">
              {(data.followUps || []).length === 0 && <div className="eq-empty">No follow-ups logged yet.</div>}
              {(data.followUps || []).map((f: any, i: number) => (
                <div className="eq-followup-item" key={i}>
                  <FiClock size={13} />
                  <div>
                    <div className="eq-followup-note">{f.note}</div>
                    <div className="eq-followup-meta">{f.by || 'Admin'} · {new Date(f.date).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="eq-followup-add">
              <input placeholder="Add a follow-up note..." value={note} onChange={(e) => setNote(e.target.value)} />
              <Button variant="secondary" onClick={addFollowUp}><FiPlus size={14} /> Add</Button>
            </div>
          </DetailSection>

          <DetailSection title="Admin Notes (internal only)">
            <Row label="Internal Notes" value={data.adminNotes} full />
            <Row label="Team Notes" value={data.teamNotes} full />
          </DetailSection>
        </div>
      </div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="eq-section">
      <div className="rf-section-title">{title}</div>
      <div className="eq-section-body">{children}</div>
    </div>
  );
}

function Row({ label, value, full }: { label: string; value: any; full?: boolean }) {
  return (
    <div className={`eq-row ${full ? 'eq-row-full' : ''}`}>
      <span className="eq-row-label">{label}</span>
      <span className="eq-row-value">{value || <span className="dt-dash">—</span>}</span>
    </div>
  );
}
