import { useCallback } from 'react';
import type {
  Product,
  PurchaseItemInsert,
  PurchaseItemUpdate,
  Supply,
} from '../../lib/supabase/models';

type Props = {
  purchaseItems: PurchaseItemInsert[];
  inventory: (Product | Supply)[];
  onChange: (change: PurchaseItemInsert[]) => void;
};

export function PurchaseItemsForm({
  purchaseItems,
  inventory,
  onChange,
}: Props) {
  const productOptions = inventory.map((item) => ({
    value: item.sku,
    label: `${item.name} (${item.sku})`,
  }));

  const addRow = useCallback(() => {
    onChange([...purchaseItems, { purchase_id: '', sku: '', quantity: 1 }]);
  }, [purchaseItems, onChange]);

  const updateRow = useCallback(
    (i: number, purchaseItem: PurchaseItemUpdate) => {
      onChange(
        purchaseItems.map((row, idx) =>
          idx === i ? { ...row, ...purchaseItem } : row
        )
      );
    },
    [purchaseItems, onChange]
  );

  const deleteRow = useCallback(
    (i: number) => {
      onChange(purchaseItems.filter((_, idx) => idx !== i));
    },
    [purchaseItems, onChange]
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
            {purchaseItems.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-gray-500">
                  No items yet.
                </td>
              </tr>
            )}
            {purchaseItems.map((row, i) => (
              <tr key={row.id ?? `new-${i}`} className="border-b">
                <td className="py-2 pr-4">
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={row.sku}
                    onChange={(e) => updateRow(i, { sku: e.target.value })}
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
