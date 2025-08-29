import { useState } from 'react';
import type {
  Product,
  ProductType,
  ProductValues,
} from '../../lib/supabase/models';
type ProductFormProps = {
  type: 'create' | 'edit';
  initial?: Partial<Product>;
  onCancel: () => void;
  onSubmit: (values: ProductValues) => Promise<void> | void;
};

const PRODUCT_TYPES = [
  'Socks',
  'Cupholder',
  'AirPods Case',
  'Packaging',
  'Uncategorized',
] as const satisfies readonly ProductType[];

const EMPTY: ProductValues = {
  sku: '',
  name: '',
  type: 'Uncategorized',
  price_usd: 0,
  cost_rmb: 0,
  image_url: null,
  description: null,
  details: null,
  min_stock: 0,
  stock: 0,
};

export function ProductForm({
  type,
  initial,
  onCancel,
  onSubmit,
}: ProductFormProps) {
  const [values, setValues] = useState<ProductValues>({
    ...EMPTY,
    ...(initial ?? {}),
  });
  const isEdit = type === 'edit';

  function handleChange<K extends keyof Product>(key: K, val: Product[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(values);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Ceramic Mug"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">SKU</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
            value={values.sku}
            onChange={(e) => handleChange('sku', e.target.value)}
            placeholder="e.g. MUG-001"
            required
            disabled={isEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={values.type}
            onChange={(e) =>
              handleChange('type', e.target.value as ProductType)
            }
            required
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Cost (RMB)</label>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            step="0.01"
            value={values.cost_rmb}
            onChange={(e) => handleChange('cost_rmb', Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Sell Price (USD)</label>
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={values.price_usd ?? 0}
            onChange={(e) => handleChange('price_usd', Number(e.target.value))}
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={values.image_url ?? ''}
            onChange={(e) => handleChange('image_url', e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
            value={values.stock}
            onChange={(e) => handleChange('stock', Number(e.target.value))}
            disabled={isEdit}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Minimum Stock</label>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
            value={values.min_stock}
            onChange={(e) => handleChange('min_stock', Number(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:opacity-90"
        >
          {isEdit ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
