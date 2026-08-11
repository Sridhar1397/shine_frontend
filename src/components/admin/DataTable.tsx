import { FiSearch, FiDownload, FiFileText, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiArchive } from 'react-icons/fi';
import type { ColumnConfig } from '../../types/resource';
import { StatusBadge, IconButton } from './ui';
import { fileUrl } from '../../api/adminClient';
import './DataTable.css';

interface Props {
  columns: ColumnConfig[];
  rows: any[];
  total: number;
  page: number;
  pages: number;
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter?: string;
  statusOptions?: string[];
  onStatusFilterChange?: (v: string) => void;
  onPageChange: (p: number) => void;
  onEdit: (row: any) => void;
  onSoftDelete?: (row: any) => void;
  onHardDelete: (row: any) => void;
  onExportExcel: () => void;
  onExportPdf: () => void;
  loading?: boolean;
}

export function DataTable({
  columns, rows, total, page, pages, search, onSearchChange,
  statusFilter, statusOptions, onStatusFilterChange, onPageChange,
  onEdit, onSoftDelete, onHardDelete, onExportExcel, onExportPdf, loading
}: Props) {
  return (
    <div className="dt-wrap">
      <div className="dt-toolbar">
        <div className="dt-search">
          <FiSearch size={15} />
          <input placeholder="Search..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        {statusOptions && (
          <select className="dt-select" value={statusFilter || ''} onChange={(e) => onStatusFilterChange?.(e.target.value)}>
            <option value="">All statuses</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
        <div className="dt-toolbar-spacer" />
        <button className="dt-export-btn" onClick={onExportExcel}><FiDownload size={14} /> Excel</button>
        <button className="dt-export-btn" onClick={onExportPdf}><FiFileText size={14} /> PDF</button>
      </div>

      <div className="dt-table-scroll">
        <table className="dt-table">
          <thead>
            <tr>
              {columns.map((c) => <th key={c.key}>{c.label}</th>)}
              <th className="dt-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={columns.length + 1} className="dt-empty">Loading...</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="dt-empty">No records yet.</td></tr>
            )}
            {!loading && rows.map((row) => (
              <tr key={row._id}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.isMedia && row[c.key] ? (
                      <img className="dt-thumb" src={fileUrl(row[c.key])} alt="" />
                    ) : c.isStatus ? (
                      <StatusBadge value={row[c.key]} />
                    ) : c.render ? (
                      c.render(row)
                    ) : (
                      formatValue(row[c.key])
                    )}
                  </td>
                ))}
                <td>
                  <div className="dt-actions">
                    <IconButton title="Edit" onClick={() => onEdit(row)}><FiEdit2 size={14} /></IconButton>
                    {onSoftDelete && (
                      <IconButton title="Soft delete" onClick={() => onSoftDelete(row)}><FiArchive size={14} /></IconButton>
                    )}
                    <IconButton title="Delete permanently" tone="danger" onClick={() => onHardDelete(row)}><FiTrash2 size={14} /></IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dt-footer">
        <span className="dt-total">{total} total record{total === 1 ? '' : 's'}</span>
        <div className="dt-pagination">
          <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}><FiChevronLeft size={14} /></button>
          <span>Page {page} of {Math.max(pages, 1)}</span>
          <button disabled={page >= pages} onClick={() => onPageChange(page + 1)}><FiChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function formatValue(v: any) {
  if (v === undefined || v === null || v === '') return <span className="dt-dash">—</span>;
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (Array.isArray(v)) return v.join(', ') || <span className="dt-dash">—</span>;
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleDateString();
  return String(v);
}
