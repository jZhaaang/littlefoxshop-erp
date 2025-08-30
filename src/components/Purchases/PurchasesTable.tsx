import type { PurchaseWithItems } from '../../lib/supabase/models';
import { GridTable, type GridCol, Badge } from '..';

type Props = {
  rows: PurchaseWithItems[];
  loading?: boolean;
  onEdit: (row: PurchaseWithItems) => void;
  onDelete: (row: PurchaseWithItems) => void;
};

const columns: GridCol<PurchaseWithItems>[] = [
  {
    header: 'Purchase Order #',
    span: 2,
    cell: (row) => (
      <div className="font-medium text-slate-800">
        {row.purchase.purchase_order_no}
      </div>
    ),
  },
  {
    header: 'Supplier',
    span: 2,
    cell: (row) => (
      <span className="text-slate-600">{row.purchase.supplier}</span>
    ),
  },
  {
    header: 'Status',
    span: 1,
    align: 'text-center',
    cell: (row) => {
      const completed = !!row.purchase.date_received;
      return (
        <Badge
          tone={completed ? 'green' : 'blue'}
          className="whitespace-nowrap"
        >
          {completed ? 'Completed' : 'In Transit'}
        </Badge>
      );
    },
  },
  {
    header: 'Order Date',
    span: 2,
    cell: (row) => (
      <span className="text-slate-700">{fmtDate(row.purchase.order_date)}</span>
    ),
  },
  {
    header: 'Received',
    span: 2,
    cell: (row) => (
      <span className="text-slate-700">
        {fmtDate(row.purchase.date_received) || '-'}
      </span>
    ),
  },
  {
    header: 'Items',
    span: 1,
    cell: (row) => (
      <span className="text-slate-600">{row.purchaseItems.length}</span>
    ),
  },
];

export function PurchasesTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <GridTable<PurchaseWithItems>
      columns={columns}
      rows={rows}
      loading={!!loading}
      keyFor={(row) => row.purchase.id}
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
