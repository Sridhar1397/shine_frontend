import type { ReactNode } from 'react';
import './ui.css';

export function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Active: 'success', Published: 'success', Approved: 'success', Confirmed: 'success',
    Completed: 'success', Paid: 'success', 'Booking Confirmed': 'success', 'Fully Paid': 'success',
    Inactive: 'neutral', Draft: 'neutral', Disabled: 'neutral',
    Pending: 'warning', Scheduled: 'warning', 'Follow-up Required': 'warning', 'Partially Paid': 'warning',
    Rejected: 'danger', Cancelled: 'danger', Expired: 'danger', Postponed: 'warning',
    New: 'info', Contacted: 'info', Upcoming: 'info', Ongoing: 'info'
  };
  const tone = map[value] || 'neutral';
  return <span className={`badge badge-${tone}`}>{value}</span>;
}

export function Button({
  children, onClick, variant = 'primary', type = 'button', disabled, title
}: {
  children: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  type?: 'button' | 'submit'; disabled?: boolean; title?: string;
}) {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  );
}

export function IconButton({ children, onClick, title, tone = 'neutral' }: { children: ReactNode; onClick?: () => void; title?: string; tone?: 'neutral' | 'danger' }) {
  return (
    <button type="button" className={`icon-btn icon-btn-${tone}`} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`sm-card ${className}`}>{children}</div>;
}
