import { Badge } from '../Badge';
import type { Product } from '../../lib/supabase/models';

type ProductRowProps = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
};

export function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  return (
    <div className="py-4 px-2 grid grid-cols-12 text-center items-center gap-2">
      {/* Image */}
      <div className="col-span-1">
        <div className="w-10 h-10 rounded-xl bg-slate-100 grid place-items-center text-center text-slate-500">
          📦
        </div>
      </div>
      {/* Name */}
      <div className="col-span-4">
        <div className="font-medium text-slate-800 text-left">
          {product.name}
        </div>
      </div>
      {/* SKU */}
      <div className="col-span-2 text-slate-600 text-left">{product.sku}</div>
      {/* Type */}
      <div className="col-span-1 whitespace-nowrap">
        <Badge tone="gray">{product.type}</Badge>
      </div>
      {/* Cost */}
      <div className="col-span-1 text-slate-700">
        <div className="font-medium">${product.cost_rmb.toFixed(2)}</div>
        <div className="text-sm text-slate-500">
          ¥{(product.cost_rmb * 0.14).toFixed(2)}
        </div>
      </div>
      {/* Price */}
      <div className="col-span-1 font-semibold">
        ${product.price_usd.toFixed(2)}
      </div>
      {/* Stock */}
      <div className="col-span-1 flex justify-center items-center gap-1">
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
      {/* Actions */}
      <div className="col-span-1 flex justify-center items-center gap-2">
        <button
          title="Edit"
          className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100"
          onClick={onEdit}
        >
          ✏️
        </button>
        <button
          title="Delete"
          className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-slate-100"
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
