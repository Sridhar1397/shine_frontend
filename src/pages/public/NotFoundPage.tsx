import { Link } from 'react-router-dom';
import { SEO } from '../../components/public/SEO';

export default function NotFoundPage() {
  return (
    <div className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <SEO title="Page Not Found" />
      <div className="eyebrow" style={{ justifyContent: 'center' }}>404</div>
      <h1 style={{ marginBottom: 16 }}>This Page Vanished Like Magic</h1>
      <p style={{ marginBottom: 28 }}>The page you're looking for doesn't exist or has been moved.</p>
      <div>
        <Link to="/" className="btn-gold">Back to Home</Link>
      </div>
    </div>
  );
}
