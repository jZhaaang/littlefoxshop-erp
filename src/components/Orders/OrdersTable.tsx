import type { OrderWithItems } from '../../lib/supabase/models';
import { GridTable, type GridCol } from '../common';

type Props = {
  rows: OrderWithItems[];
  loading?: boolean;
  onEdit: (row: OrderWithItems) => void;
  onDelete: (row: OrderWithItems) => void;
};

const columns: GridCol<OrderWithItems>[] = [
  {
    header: 'Order #',
    span: 2,
    cell: (row) => (
      <div className="font-medium text-slate-800">{row.order_no}</div>
    ),
  },
  {
    header: 'Order Date',
    span: 2,
    cell: (row) => (
      <span className="text-slate-700">{fmtDate(row.order_date)}</span>
    ),
  },
  {
    header: 'Items',
    span: 1,
    cell: (row) => (
      <span className="text-slate-600">{row.orderItems.length}</span>
    ),
  },
];

export function OrdersTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <GridTable<OrderWithItems>
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
