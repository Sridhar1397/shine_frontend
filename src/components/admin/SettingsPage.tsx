import { useEffect, useState } from 'react';
import api from '../../api/adminClient';
import type { FieldConfig } from '../../types/resource';
import { Button, Card } from './ui';
import { SingleFileUpload, MultiFileUpload } from './FileUpload';
import './SettingsPage.css';

export function SettingsPage({
  apiPath, title, description, fields
}: { apiPath: string; title: string; description?: string; fields: FieldConfig[] }) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get(`/${apiPath}`).then((res) => {
      setValues(res.data.data || {});
      setLoading(false);
    });
  }, [apiPath]);

  const setField = (key: string, val: any) => setValues((v) => ({ ...v, [key]: val }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await api.put(`/${apiPath}`, values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const sections = Array.from(new Set(fields.map((f) => f.section || 'General')));

  if (loading) return <div className="sp-loading">Loading...</div>;

  return (
    <div className="sp-page">
      <div className="sp-header">
        <div>
          <h2>{title}</h2>
          {description && <p className="sp-sub">{description}</p>}
        </div>
        <Button variant="primary" onClick={save} disabled={saving}>
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
        </Button>
      </div>

      {sections.map((section) => (
        <Card className="sp-card" key={section}>
          {sections.length > 1 && <div className="sp-section-title">{section}</div>}
          <div className="sp-grid">
            {fields.filter((f) => (f.section || 'General') === section).map((f) => (
              <div className={`sp-field ${f.colSpan === 2 ? 'sp-span-2' : ''}`} key={f.key}>
                <label>{f.label}</label>
                <SettingsFieldInput field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function SettingsFieldInput({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case 'textarea':
      return <textarea rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
    case 'number':
      return <input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />;
    case 'boolean':
      return (
        <label className="rf-switch">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="rf-switch-track"><span className="rf-switch-thumb" /></span>
        </label>
      );
    case 'select':
      return (
        <select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select...</option>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    case 'tags':
      return (
        <input
          type="text"
          value={Array.isArray(value) ? value.join(', ') : (value ?? '')}
          onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
        />
      );
    case 'image':
      return <SingleFileUpload folder={field.uploadFolder || 'branding'} value={value} onChange={onChange} accept="image/*" />;
    case 'video':
      return <SingleFileUpload folder={field.uploadFolder || 'branding'} value={value} onChange={onChange} accept="video/*" />;
    case 'multi-image':
      return <MultiFileUpload folder={field.uploadFolder || 'branding'} value={value || []} onChange={onChange} />;
    default:
      return <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
  }
}
