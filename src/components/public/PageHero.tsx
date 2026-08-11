import './PageHero.css';

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-sparkles">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="sparkle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            width: '3px', height: '3px', animationDelay: `${Math.random() * 3}s`
          }} />
        ))}
      </div>
      <div className="container fade-up">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
