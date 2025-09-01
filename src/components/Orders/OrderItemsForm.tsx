import { useCallback } from 'react';
import type {
  Product,
  OrderItemInsert,
  OrderItemUpdate,
} from '../../lib/supabase/models';

type Props = {
  orderItems: OrderItemInsert[];
  products: Product[];
  onChange: (change: OrderItemInsert[]) => void;
};

export function OrderItemsForm({ orderItems, products, onChange }: Props) {
  const productOptions = products.map((product) => ({
    value: product.sku,
    label: `${product.name} (${product.sku})`,
  }));

  const addRow = useCallback(() => {
    onChange([...orderItems, { order_id: '', product_sku: '', quantity: 1 }]);
  }, [orderItems, onChange]);

  const updateRow = useCallback(
    (i: Number, orderItem: OrderItemUpdate) => {
      onChange(
        orderItems.map((row, idx) =>
          idx === i ? { ...row, ...orderItem } : row
        )
      );
    },
    [orderItems, onChange]
  );

  const deleteRow = useCallback(
    (i: Number) => {
      onChange(orderItems.filter((_, idx) => idx !== i));
    },
    [orderItems, onChange]
  );

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Items</h4>
        <button
          type="button"
          className="px-2 py-1 border rounded-xl bg-blue-500 text-white"
          onClick={addRow}
        >
          + Add Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2 pr-4">Product</th>
              <th className="py-2 pr-4 w-32">Qty</th>
              <th className="py-2 pr-0 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-gray-500">
                  No items yet.
                </td>
              </tr>
            )}
            {orderItems.map((row, i) => (
              <tr key={row.id ?? `new-${i}`} className="border-b">
                <td className="py-2 pr-4">
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={row.product_sku}
                    onChange={(e) =>
                      updateRow(i, { product_sku: e.target.value })
                    }
                  >
                    <option value="">Select product…</option>
                    {productOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-4">
                  <input
                    className="w-24 border rounded px-2 py-1"
                    type="number"
                    min={0}
                    value={row.quantity}
                    onChange={(e) =>
                      updateRow(i, {
                        quantity: parseInt(e.target.value || '0'),
                      })
                    }
                  />
                </td>
                <td className="py-2 pr-0 text-right">
                  <button
                    type="button"
                    className="px-2 py-1 border rounded"
                    onClick={() => deleteRow(i)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
