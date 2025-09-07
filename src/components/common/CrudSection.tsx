import { useMemo, useState } from 'react';
import {
  Card,
  SearchBar,
  PageHeader,
  ConfirmDialog,
  Modal,
  LoadingModal,
  type Mode,
} from '../common';

export type TableProps<T> = {
  rows: T[];
  loading?: boolean;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
};

export type FormProps<T> = {
  type: Mode;
  initial?: T;
  onCancel: () => void;
  onSubmit: (values: any, file?: File | null) => Promise<void>;
};

type FilterProps<T> = {
  getRowLabel: (row: T) => string;
  getSearchParams: (row: T) => (string | null)[];
  searchParams: string[];
};

type CrudSectionProps<T extends { id: string }> = {
  title: string;
  description: string;
  addButtonText: string;

  tableTitle: string;
  rows: T[];
  loading?: boolean;

  Table: React.ComponentType<TableProps<T>>;
  Form: React.ComponentType<FormProps<T>>;
  filters: FilterProps<T>;

  onCreate: (values: any, file?: File | null) => Promise<void>;
  onUpdate: (id: string, values: any, file?: File | null) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function CrudSection<T extends { id: string }>({
  title,
  description,
  addButtonText,
  tableTitle,
  rows,
  loading,
  Table,
  Form,
  filters,
  onCreate,
  onUpdate,
  onDelete,
}: CrudSectionProps<T>) {
  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEditId, setOpenEditId] = useState<string | null>(null);
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter((r) =>
        (filters.getRowLabel(r) + filters.getSearchParams(r).join(''))
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [rows, search, filters]
  );

  const currentEdit = rows.find((r) => r.id === openEditId) || null;
  const currentDelete = rows.find((r) => r.id === openDeleteId) || null;

  async function handleAdd(values: any, file?: File | null) {
    if (!openAdd) return;
    try {
      setLoadingText(`Adding ${filters.getRowLabel(values)}`);
      await onCreate(values, file);
      setOpenAdd(false);
    } finally {
      setLoadingText(null);
    }
  }

  async function handleEdit(values: any, file?: File | null) {
    if (!openEditId || !currentEdit) return;
    try {
      setLoadingText(`Editing ${filters.getRowLabel(currentEdit)}`);
      await onUpdate(openEditId, values, file);
      setOpenEditId(null);
    } finally {
      setLoadingText(null);
    }
  }

  async function handleDelete() {
    if (!openDeleteId || !currentDelete) return;
    try {
      setLoadingText(`Deleting ${filters.getRowLabel(currentDelete)}`);
      await onDelete(openDeleteId);
      setOpenDeleteId(null);
    } finally {
      setLoadingText(null);
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={title}
        description={description}
        buttonText={addButtonText}
        onClick={() => setOpenAdd(true)}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder={`Search by ${filters.searchParams.join(', ')}`}
      />

      <Card title={`${tableTitle} (${filtered.length})`}>
        <Table
          rows={filtered}
          loading={loading}
          onEdit={(row) => setOpenEditId(row.id)}
          onDelete={(row) => setOpenDeleteId(row.id)}
        />
      </Card>

      {/* Add */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title={`Add New`}>
        <Form
          type="create"
          onCancel={() => setOpenAdd(false)}
          onSubmit={handleAdd}
        />
      </Modal>

      {/* Edit */}
      <Modal
        open={!!openEditId}
        onClose={() => setOpenEditId(null)}
        title={
          currentEdit ? `Edit ${filters.getRowLabel(currentEdit)}` : 'Edit'
        }
      >
        {currentEdit && (
          <Form
            type="edit"
            initial={currentEdit}
            onCancel={() => setOpenEditId(null)}
            onSubmit={handleEdit}
          />
        )}
      </Modal>

      {/* Delete */}
      <ConfirmDialog
        open={!!openDeleteId}
        onCancel={() => setOpenDeleteId(null)}
        onConfirm={handleDelete}
        title={
          currentDelete
            ? `Delete ${filters.getRowLabel(currentDelete)}?`
            : 'Delete?'
        }
        description={
          currentDelete
            ? `This will permanently remove ${filters.getRowLabel(currentDelete)}.`
            : ''
        }
        confirmText="Delete"
      />

      <LoadingModal open={!!loadingText} text={loadingText ?? ''} />
    </div>
  );
}
