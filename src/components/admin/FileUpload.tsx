import { useRef, useState } from 'react';
import { FiUploadCloud, FiX, FiFile } from 'react-icons/fi';
import api, { fileUrl } from '../../api/adminClient';
import './FileUpload.css';

function isImage(url: string) {
  return /\.(jpe?g|png|gif|webp)$/i.test(url);
}

export function SingleFileUpload({
  folder, value, onChange, accept = 'image/*'
}: { folder: string; value?: string; onChange: (url: string) => void; accept?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await api.post(`/upload/${folder}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      onChange(res.data.url);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-box">
      {value ? (
        <div className="upload-preview">
          {isImage(value) ? <img src={fileUrl(value)} alt="" /> : <div className="upload-file-chip"><FiFile /> file uploaded</div>}
          <button type="button" className="upload-remove" onClick={() => onChange('')}><FiX /></button>
        </div>
      ) : (
        <button type="button" className="upload-dropzone" onClick={() => inputRef.current?.click()} disabled={uploading}>
          <FiUploadCloud size={20} />
          <span>{uploading ? 'Uploading...' : 'Click to upload'}</span>
        </button>
      )}
      <input
        ref={inputRef} type="file" accept={accept} hidden
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}

export function MultiFileUpload({
  folder, value = [], onChange
}: { folder: string; value?: string[]; onChange: (urls: string[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const form = new FormData();
      Array.from(files).forEach((f) => form.append('files', f));
      const res = await api.post(`/upload/${folder}/multiple`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      onChange([...value, ...res.data.urls]);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="upload-grid">
        {value.map((url, i) => (
          <div className="upload-preview upload-preview-sm" key={i}>
            {isImage(url) ? <img src={fileUrl(url)} alt="" /> : <div className="upload-file-chip"><FiFile /></div>}
            <button type="button" className="upload-remove" onClick={() => onChange(value.filter((_, idx) => idx !== i))}><FiX /></button>
          </div>
        ))}
        <button type="button" className="upload-dropzone upload-dropzone-sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
          <FiUploadCloud size={16} />
          <span>{uploading ? '...' : 'Add'}</span>
        </button>
      </div>
      <input
        ref={inputRef} type="file" multiple hidden
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
    </div>
  );
}
