import type { Supply } from '../../lib/supabase/models';
import { GridTable, type GridCol } from '../common';

type Props = {
  rows: Supply[];
  loading?: boolean;
  onEdit: (supply: Supply) => void;
  onDelete: (supply: Supply) => void;
};

const columns: GridCol<Supply>[] = [
  {
    header: 'Supply',
    span: 2,
    cell: (supply) => (
      <div className="font-medium text-slate-800">{supply.name}</div>
    ),
  },
  {
    header: 'SKU',
    span: 1,
    cell: (supply) => <span className="text-slate-600">{supply.sku}</span>,
  },
  {
    header: 'Supplier',
    span: 2,
    cell: (supply) => <span className="text-slate-600">{supply.supplier}</span>,
  },
  {
    header: 'Cost',
    span: 1,
    align: 'text-center',
    cell: (supply) => (
      <div className="text-slate-700">
        <div className="font-medium">${supply.cost_rmb.toFixed(2)}</div>
        <div className="text-xs text-slate-500">
          ¥{(supply.cost_rmb * 0.14).toFixed(2)}
        </div>
      </div>
    ),
  },
  {
    header: 'Stock',
    span: 1,
    align: 'text-center',
    cell: (supply) => (
      <div className="flex justify-center items-center gap-1">
        <span
          className={
            supply.stock <= supply.min_stock
              ? 'text-amber-600 font-medium'
              : 'text-slate-700'
          }
        >
          {supply.stock}
        </span>
        {supply.stock <= supply.min_stock && (
          <span className="text-amber-500">⚠️</span>
        )}
      </div>
    ),
  },
];

export function SuppliesTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <GridTable<Supply>
      columns={columns}
      rows={rows}
      loading={!!loading}
      keyFor={(supply) => supply.id}
      leading={() => (
        <div className="w-10 h-10 rounded-xl bg-slate-100 grid place-items-center text-slate-500">
          📦
        </div>
      )}
      leadingSpan={1}
      actions={(supply) => (
        <div className="flex justify-center items-center gap-2">
          <button
            title="Edit"
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100"
            onClick={() => onEdit(supply)}
          >
            ✏️
          </button>
          <button
            title="Delete"
            className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-100"
            onClick={() => onDelete(supply)}
          >
            🗑️
          </button>
        </div>
      )}
      actionsSpan={1}
    />
  );
}
