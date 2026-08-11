import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import type { FieldConfig } from '../../types/resource';
import { Button } from './ui';
import { SingleFileUpload, MultiFileUpload } from './FileUpload';
import './ResourceForm.css';

interface Props {
  title: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => Promise<void>;
}

export function ResourceForm({ title, fields, initialValues, onClose, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const defaults: Record<string, any> = {};
    fields.forEach((f) => {
      if (initialValues && initialValues[f.key] !== undefined) {
        defaults[f.key] = initialValues[f.key];
      } else if (f.type === 'boolean') {
        defaults[f.key] = false;
      } else if (f.type === 'tags' || f.type === 'multi-image') {
        defaults[f.key] = [];
      } else {
        defaults[f.key] = '';
      }
    });
    setValues(defaults);
  }, [initialValues, fields]);

  const setField = (key: string, val: any) => setValues((v) => ({ ...v, [key]: val }));

  const sections = Array.from(new Set(fields.map((f) => f.section || 'General')));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please check the fields and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rf-overlay" onMouseDown={onClose}>
      <div className="rf-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="rf-header">
          <h3>{title}</h3>
          <button className="rf-close" onClick={onClose}><FiX size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="rf-body">
          {error && <div className="rf-error">{error}</div>}
          {sections.map((section) => (
            <div className="rf-section" key={section}>
              {sections.length > 1 && <div className="rf-section-title">{section}</div>}
              <div className="rf-grid">
                {fields.filter((f) => (f.section || 'General') === section).map((f) => (
                  <div className={`rf-field ${f.colSpan === 2 ? 'rf-span-2' : ''}`} key={f.key}>
                    <label>{f.label}{f.required && <span className="rf-required">*</span>}</label>
                    <FieldInput field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
                    {f.hint && <div className="rf-hint">{f.hint}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>
        <div className="rf-footer">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => handleSubmit({ preventDefault: () => {} } as any)} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case 'textarea':
      return <textarea rows={3} value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case 'number':
      return <input type="number" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />;
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
          placeholder="Comma-separated values"
          value={Array.isArray(value) ? value.join(', ') : (value ?? '')}
          onChange={(e) => onChange(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
        />
      );
    case 'date':
      return <input type="date" value={value ? String(value).slice(0, 10) : ''} onChange={(e) => onChange(e.target.value)} />;
    case 'datetime':
      return <input type="datetime-local" value={value ? String(value).slice(0, 16) : ''} onChange={(e) => onChange(e.target.value)} />;
    case 'image':
      return <SingleFileUpload folder={field.uploadFolder || 'documents'} value={value} onChange={onChange} accept="image/*" />;
    case 'video':
      return <SingleFileUpload folder={field.uploadFolder || 'documents'} value={value} onChange={onChange} accept="video/*" />;
    case 'multi-image':
      return <MultiFileUpload folder={field.uploadFolder || 'documents'} value={value || []} onChange={onChange} />;
    case 'password':
      return <input type="password" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
    default:
      return <input type="text" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }
}
