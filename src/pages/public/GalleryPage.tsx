import { useEffect, useState } from 'react';
import { FiX, FiPlay } from 'react-icons/fi';
import api, { fileUrl } from '../../api/publicClient';
import { SEO } from '../../components/public/SEO';
import { PageHero } from '../../components/public/PageHero';
import './GalleryPage.css';
import './ListPage.css';

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/gallery', { params: { eventType: category || undefined } }).then((r) => {
      setItems(r.data.data);
      if (!category) setCategories(r.data.categories || []);
      setLoading(false);
    });
  }, [category]);

  return (
    <div>
      <SEO title="Gallery" description="Browse photos and videos from Shine Magics performances — weddings, corporate events, and celebrations." />
      <PageHero eyebrow="Gallery" title="Moments Captured Mid-Magic" subtitle="A look behind the curtain at real performances, real reactions, real wonder." />

      <section className="section">
        <div className="container">
          <div className="list-filter-pills" style={{ marginBottom: 40 }}>
            <button className={`pill ${category === '' ? 'pill-active' : ''}`} onClick={() => setCategory('')}>All</button>
            {categories.map((c) => (
              <button key={c} className={`pill ${category === c ? 'pill-active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>

          {loading && <div className="list-empty">Loading gallery...</div>}
          {!loading && items.length === 0 && <div className="list-empty">No gallery items yet in this category.</div>}

          <div className="gallery-masonry">
            {items.map((item) => (
              <button key={item._id} className="gallery-item" onClick={() => setLightbox(item)}>
                <img src={fileUrl(item.fileUrl)} alt={item.title || item.eventType} />
                {item.mediaType === 'video' && <div className="gallery-play"><FiPlay size={20} /></div>}
                <div className="gallery-item-overlay">
                  <span>{item.title || item.eventType}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><FiX size={22} /></button>
          {lightbox.mediaType === 'video' ? (
            <video src={fileUrl(lightbox.fileUrl)} controls autoPlay className="lightbox-media" onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={fileUrl(lightbox.fileUrl)} alt={lightbox.title} className="lightbox-media" onClick={(e) => e.stopPropagation()} />
          )}
          {lightbox.description && <p className="lightbox-caption">{lightbox.description}</p>}
        </div>
      )}
    </div>
  );
}
