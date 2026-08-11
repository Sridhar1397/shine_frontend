import { FaWhatsapp } from 'react-icons/fa';
import { useSiteConfig } from '../../context/SiteConfigContext';
import './WhatsAppFloat.css';

export function WhatsAppFloat({ contextMessage }: { contextMessage?: string }) {
  const { config } = useSiteConfig();
  const number = config?.contact?.whatsapp;
  if (!number) return null;

  const message = contextMessage
    ? `Hi Shine Magics, I'm interested in ${contextMessage}.`
    : "Hi Shine Magics, I'd like to know more about your services.";

  const link = `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a href={link} target="_blank" rel="noreferrer" className="wa-float" title="Chat on WhatsApp">
      <FaWhatsapp size={26} />
    </a>
  );
}
