import type { Product } from '../../lib/supabase/models';
import { GridTable, type GridCol, Badge } from '../common';

type Props = {
  rows: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

const columns: GridCol<Product>[] = [
  {
    header: 'Product',
    span: 2,
    cell: (product) => (
      <div className="font-medium text-slate-800">{product.name}</div>
    ),
  },
  {
    header: 'SKU',
    span: 1,
    cell: (product) => <span className="text-slate-600">{product.sku}</span>,
  },
  {
    header: 'Type',
    span: 1,
    align: 'text-center',
    cell: (product) => (
      <Badge tone="gray" className="whitespace-nowrap">
        {product.type}
      </Badge>
    ),
  },
  {
    header: 'Supplier',
    span: 2,
    cell: (product) => (
      <span className="text-slate-600">{product.supplier}</span>
    ),
  },
  {
    header: 'Cost',
    span: 1,
    align: 'text-center',
    cell: (product) => (
      <div className="text-slate-700">
        <div className="font-medium">
          ${(product.cost_rmb * 0.14).toFixed(2)}
        </div>
        <div className="text-xs text-slate-500">
          ¥{product.cost_rmb.toFixed(2)}
        </div>
      </div>
    ),
  },
  {
    header: 'Price',
    span: 1,
    align: 'text-center',
    cell: (product) => (
      <span className="font-semibold">
        ${product.price_usd ? product.price_usd.toFixed(2) : '0.00'}
      </span>
    ),
  },
  {
    header: 'Stock',
    span: 1,
    align: 'text-center',
    cell: (product) => (
      <div className="flex justify-center items-center gap-1">
        <span
          className={
            product.stock <= product.min_stock
              ? 'text-amber-600 font-medium'
              : 'text-slate-700'
          }
        >
          {product.stock}
        </span>
        {product.stock <= product.min_stock && (
          <span className="text-amber-500">⚠️</span>
        )}
      </div>
    ),
  },
];

export function ProductsTable({ rows, loading, onEdit, onDelete }: Props) {
  return (
    <GridTable<Product>
      columns={columns}
      rows={rows}
      loading={!!loading}
      keyFor={(product) => product.id}
      leading={(product) =>
        product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover"
          ></img>
        ) : (
          <div className="w-16 h-16 rounded-xl text-2xl bg-slate-100 grid place-items-center">
            📦
          </div>
        )
      }
      leadingSpan={1}
      actions={(product) => (
        <div className="flex justify-center items-center gap-2">
          <button
            title="Edit"
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100"
            onClick={() => onEdit(product)}
          >
            ✏️
          </button>
          <button
            title="Delete"
            className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-100"
            onClick={() => onDelete(product)}
          >
            🗑️
          </button>
        </div>
      )}
      actionsSpan={1}
    />
  );
}
