import { useSiteConfig } from '../../context/SiteConfigContext';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';

export function PolicyPage({ field, title }: { field: 'privacyPolicyContent' | 'termsContent' | 'cancellationPolicyContent'; title: string }) {
  const { config } = useSiteConfig();
  const content = config?.footer?.[field];

  return (
    <div>
      <SEO title={title} />
      <PageHero eyebrow="Legal" title={title} />
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {content ? (
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 14.5 }}>{content}</div>
          ) : (
            <p>This page will be updated by the Shine Magics team soon. For any questions, please contact us directly.</p>
          )}
        </div>
      </section>
    </div>
  );
}
