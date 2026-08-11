import { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import api from '../../api/adminClient';
import type { ResourceConfig } from '../../types/resource';
import { DataTable } from './DataTable';
import { ResourceForm } from './ResourceForm';
import { Button, Card } from './ui';
import './ResourceManager.css';

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/${config.key}`, {
        params: { page, limit: 12, search: search || undefined, status: statusFilter || undefined }
      });
      setRows(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [config.key, page, search, statusFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const handleSubmit = async (values: Record<string, any>) => {
    if (editing) {
      await api.put(`/${config.key}/${editing._id}`, values);
    } else {
      await api.post(`/${config.key}`, values);
    }
    await load();
  };

  const handleSoftDelete = async (row: any) => {
    if (!confirm(`Move "${row[config.columns[0].key] || 'this record'}" to trash?`)) return;
    await api.delete(`/${config.key}/${row._id}/soft`);
    load();
  };

  const handleHardDelete = async (row: any) => {
    if (!confirm(`Permanently delete this ${config.singular}? This cannot be undone.`)) return;
    await api.delete(`/${config.key}/${row._id}`);
    load();
  };

  const download = async (kind: 'excel' | 'pdf') => {
    const res = await api.get(`/${config.key}/export/${kind}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.key}.${kind === 'excel' ? 'xlsx' : 'pdf'}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="rm-page">
      <div className="rm-header">
        <div>
          <h2>{config.title}</h2>
          <p className="rm-sub">{total} {config.singular}{total === 1 ? '' : 's'} in your database</p>
        </div>
        <Button variant="primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          <FiPlus size={15} /> Add {config.singular}
        </Button>
      </div>

      <Card className="rm-table-card">
        <DataTable
          columns={config.columns}
          rows={rows}
          total={total}
          page={page}
          pages={pages}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          statusOptions={config.statusOptions}
          onStatusFilterChange={setStatusFilter}
          onPageChange={setPage}
          onEdit={(row) => { setEditing(row); setShowForm(true); }}
          onSoftDelete={config.hasSoftDelete ? handleSoftDelete : undefined}
          onHardDelete={handleHardDelete}
          onExportExcel={() => download('excel')}
          onExportPdf={() => download('pdf')}
          loading={loading}
        />
      </Card>

      {showForm && (
        <ResourceForm
          title={editing ? `Edit ${config.singular}` : `Add ${config.singular}`}
          fields={config.fields}
          initialValues={editing || undefined}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
