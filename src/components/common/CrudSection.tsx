import type { Dispatch, SetStateAction } from 'react';
import {
  Card,
  SearchBar,
  PageHeader,
  ConfirmDialog,
  Modal,
  LoadingModal,
} from '../common';

type CrudSectionProps<T extends { id: string }> = {
  title: string;
  description: string;
  addButtonText: string;

  tableTitle: string;
  rows: T[];
  loading?: boolean;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchPlaceholder: string;

  Table: React.ComponentType<{
    rows: T[];
    loading?: boolean;
    onEdit: (row: T) => void;
    onDelete: (row: T) => void;
  }>;
  Form: React.ComponentType<{
    type: 'create' | 'edit';
    initial?: T;
    onCancel: () => void;
    onSubmit: (values: any) => Promise<void> | void;
  }>;

  getTitleForRow: (row: T) => string;
  getFilterForRow: (row: T) => string;

  dialogs: ReturnType<
    typeof import('../../lib/hooks/useCrudDialogs').useCrudDialogs
  >;

  onCreate: (values: any) => Promise<void>;
  onUpdate: (id: string, values: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function CrudSection<T extends { id: string }>(
  props: CrudSectionProps<T>
) {
  const {
    title,
    description,
    addButtonText,
    tableTitle,
    rows,
    loading,
    search,
    setSearch,
    searchPlaceholder,
    Table,
    Form,
    getTitleForRow,
    getFilterForRow,
    dialogs,
    onCreate,
    onUpdate,
    onDelete,
  } = props;

  const filtered = rows.filter((r) =>
    (getTitleForRow(r) + getFilterForRow(r))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const current = rows.find((r) => r.id === dialogs.currentId) || null;

  async function handleAdd(values: any) {
    dialogs.setLoadingText(
      `Adding ${getTitleForRow({ ...(values as any), id: 'temp' } as T)}`
    );
    await onCreate(values);
    dialogs.setLoadingText(null);
    dialogs.closeAdd();
  }

  async function handleEdit(values: any) {
    if (!dialogs.currentId) return;
    dialogs.setLoadingText(`Editing ${getTitleForRow(current as T)}`);
    await onUpdate(dialogs.currentId, values);
    dialogs.setLoadingText(null);
    dialogs.closeEdit();
    dialogs.clearCurrent();
  }

  async function handleDelete() {
    if (!dialogs.currentId) return;
    dialogs.setLoadingText(`Deleting ${getTitleForRow(current as T)}`);
    await onDelete(dialogs.currentId);
    dialogs.setLoadingText(null);
    dialogs.closeDelete();
    dialogs.clearCurrent();
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={title}
        description={description}
        buttonText={addButtonText}
        onClick={dialogs.startAdd}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder={searchPlaceholder}
      />

      <Card title={`${tableTitle} (${filtered.length})`}>
        <Table
          rows={filtered}
          loading={loading}
          onEdit={(row) => dialogs.startEdit(row.id)}
          onDelete={(row) => dialogs.startDelete(row.id)}
        />
      </Card>

      {/* Add */}
      <Modal
        open={dialogs.openAdd}
        onClose={dialogs.closeAdd}
        title={`Add New`}
      >
        <Form type="create" onCancel={dialogs.closeAdd} onSubmit={handleAdd} />
      </Modal>

      {/* Edit */}
      <Modal
        open={dialogs.openEdit && !!current}
        onClose={() => {
          dialogs.closeEdit();
          dialogs.clearCurrent();
        }}
        title={current ? `Edit ${getTitleForRow(current)}` : 'Edit'}
      >
        {current && (
          <Form
            type="edit"
            initial={current}
            onCancel={() => {
              dialogs.closeEdit();
              dialogs.clearCurrent();
            }}
            onSubmit={handleEdit}
          />
        )}
      </Modal>

      {/* Delete */}
      <ConfirmDialog
        open={dialogs.openDelete}
        onCancel={() => {
          dialogs.closeDelete();
          dialogs.clearCurrent();
        }}
        onConfirm={handleDelete}
        title={current ? `Delete ${getTitleForRow(current)}?` : 'Delete?'}
        description={
          current
            ? `This will permanently remove ${getTitleForRow(current)}.`
            : ''
        }
        confirmText="Delete"
      />

      <LoadingModal
        open={!!dialogs.loadingText}
        text={dialogs.loadingText ?? ''}
      />
    </div>
  );
}
