import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { BookingModal } from './BookingModal';

interface BookingModalContextValue {
  openBooking: (opts?: { serviceId?: string; serviceName?: string }) => void;
}

const BookingModalContext = createContext<BookingModalContextValue | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; serviceId?: string; serviceName?: string }>({ open: false });

  const openBooking = useCallback((opts?: { serviceId?: string; serviceName?: string }) => {
    setState({ open: true, serviceId: opts?.serviceId, serviceName: opts?.serviceName });
  }, []);

  const close = () => setState({ open: false });

  return (
    <BookingModalContext.Provider value={{ openBooking }}>
      {children}
      {state.open && (
        <BookingModal onClose={close} prefillService={state.serviceId} prefillServiceName={state.serviceName} />
      )}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider');
  return ctx;
}
