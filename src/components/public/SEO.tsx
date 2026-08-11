import { useEffect } from 'react';

export function SEO({ title, description, image }: { title?: string; description?: string; image?: string }) {
  useEffect(() => {
    if (title) document.title = `${title} | Shine Magics`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
    if (image) {
      let tag = document.querySelector('meta[property="og:image"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', 'og:image');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', image);
    }
  }, [title, description, image]);

  return null;
}
