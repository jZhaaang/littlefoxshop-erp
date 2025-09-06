import type { Product } from '../../lib/supabase/models';
import { Modal } from '../common/Modal';
import { ImageIcon } from 'lucide-react';

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDetails({ product, onClose }: Props) {
  const open = !!product;
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product!.name}
      widthClassName="max-w-2xl"
      footer={
        <button
          className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
          onClick={onClose}
        >
          Close
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          {product!.image_url ? (
            <img
              src={product!.image_url}
              alt={product!.name}
              className="w-full rounded-xl object-cover"
            />
          ) : (
            <div className="grid h-40 place-items-center rounded-xl bg-slate-100 text-3xl text-slate-600">
              <ImageIcon className="h-10 w-10 bg-gray" />
            </div>
          )}
        </div>

        <div className="sm:col-span-2 grid grid-cols-2 gap-3 text-sm">
          <Info label="SKU" value={product!.sku} />
          <Info label="Type" value={product!.type ?? '—'} />
          <Info label="Supplier" value={product!.supplier ?? '—'} />
          <Info
            label="Cost"
            value={
              <>
                <div className="font-medium text-slate-800">
                  ${(product!.cost_rmb * 0.14).toFixed(2)} USD
                </div>
                <div className="text-xs text-slate-500">
                  ¥{product!.cost_rmb.toFixed(2)} RMB
                </div>
              </>
            }
          />
          <Info
            label="Price"
            value={`$${product!.price_usd ? product!.price_usd.toFixed(2) : '0.00'}`}
          />
          <Info
            label="Stock"
            value={
              <span
                className={
                  product!.stock <= product!.min_stock
                    ? 'text-amber-600 font-medium'
                    : 'text-slate-800'
                }
              >
                {product!.stock} (min {product!.min_stock})
              </span>
            }
          />
          <div className="col-span-2">
            <Info label="Description" value={product!.description ?? '—'} />
          </div>
          <div className="col-span-2">
            <Info label="Details" value={product!.details ?? '—'} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-slate-800">{value}</div>
    </div>
  );
}
