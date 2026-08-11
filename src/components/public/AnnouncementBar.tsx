import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../../api/publicClient';
import './AnnouncementBar.css';

export function AnnouncementBar() {
  const [items, setItems] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    api.get('/announcements', { params: { location: 'header' } }).then((res) => setItems(res.data.data));
  }, []);

  const visible = items.filter((i) => !dismissed.includes(i._id));
  if (visible.length === 0) return null;
  const item = visible[0];

  return (
    <div className="ann-bar">
      <span>{item.title}{item.description ? ` — ${item.description}` : ''}</span>
      <button onClick={() => setDismissed((d) => [...d, item._id])}><FiX size={14} /></button>
    </div>
  );
}
