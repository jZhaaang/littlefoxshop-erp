import { useCallback } from 'react';
import type {
  ProductImageInsert,
  ProductImageUpdate,
} from '../../lib/supabase/models';

type ProductImagesFormProps = {
  images: ProductImageInsert[];
  onChange: (images: ProductImageInsert[]) => void;
};

export function ProductImagesForm({
  images,
  onChange,
}: ProductImagesFormProps) {
  const addRow = useCallback(() => {
    onChange([...images, { product_id: '', path: '', url: null }]);
  }, [images, onChange]);

  const updateRow = useCallback(
    (i: number, productImage: ProductImageUpdate) => {
      onChange(
        images.map((row, idx) =>
          idx === i ? { ...row, ...productImage } : row
        )
      );
    },
    [images, onChange]
  );

  const deleteRow = useCallback(
    (i: number) => {
      onChange(images.filter((_, idx) => idx !== i));
    },
    [images, onChange]
  );

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Images</h4>
        <button
          type="button"
          className="px-2 py-1 border rounded bg-blue-500 text-white"
          onClick={addRow}
        >
          + Add Image
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2 pr-4">Path</th>
              <th className="py-2 pr-4">URL (optional)</th>
              <th className="py-2 pr-0 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-gray-500">
                  No images yet.
                </td>
              </tr>
            )}
            {images.map((row, i) => (
              <tr key={row.id ?? `new-${i}`} className="border-b">
                <td className="py-2 pr-4">
                  <input
                    className="w-full border rounded px-2 py-1"
                    type="text"
                    value={row.path}
                    onChange={(e) => updateRow(i, { path: e.target.value })}
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    className="w-full border rounded px-2 py-1"
                    type="text"
                    value={row.url ?? ''}
                    onChange={(e) => updateRow(i, { url: e.target.value })}
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
