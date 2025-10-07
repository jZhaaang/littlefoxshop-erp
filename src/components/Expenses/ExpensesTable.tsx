import type { Expense } from '../../lib/supabase/models';
import { GridTable, type GridCol } from '../common';

type Props = {
  rows: Expense[];
  loading?: boolean;
  onEdit: (row: Expense) => void;
  onDelete: (row: Expense) => void;
};

const columns: GridCol<Expense>[] = [
  {
    header: 'Expense Name',
    span: 2,
    cell: (row) => <div className="font-medium text-slate-800">{row.name}</div>,
  },
  {
    header: 'Description',
    span: 2,
    align: 'text-center',
    cell: (row) => (
      <div className="font-medium text-slate-800">{row.description}</div>
    ),
  },
  {
    header: 'Cost',
    span: 1,
    align: 'text-center',
    cell: (supply) => (
      <div className="text-slate-700">
        <div className="font-medium">¥{supply.cost_rmb.toFixed(2)}</div>
      </div>
    ),
  },
  {
    header: 'Expense Date',
    span: 2,
    cell: (row) => (
      <span className="text-slate-700">{fmtDate(row.created_at)}</span>
    ),
  },
];

export function ExpensesTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <GridTable<Expense>
      columns={columns}
      rows={rows}
      loading={!!loading}
      keyFor={(row) => row.id}
      leadingSpan={1}
      actions={(row) => (
        <div className="flex justify-center items-center gap-2">
          <button
            title="Edit"
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100"
            onClick={() => onEdit(row)}
          >
            ✏️
          </button>
          <button
            title="Delete"
            className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-100"
            onClick={() => onDelete(row)}
          >
            🗑️
          </button>
        </div>
      )}
      actionsSpan={1}
    />
  );
}

function fmtDate(iso?: string | null) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso ?? '';
  }
}
