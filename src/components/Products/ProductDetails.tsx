import { useMemo, useState } from 'react';
import type { ProductWithImages } from '../../lib/supabase/models';
import { Modal } from '../common/Modal';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  product: ProductWithImages | null;
  onClose: () => void;
};

export function ProductDetails({ product, onClose }: Props) {
  const open = !!product;
  if (!open) return null;

  const urls = useMemo(() => {
    const fromTable = (product?.images ?? [])
      .map((i) => i.url)
      .filter((u): u is string => !!u);
    if (fromTable.length === 0 && (product as any)?.image_url) {
      fromTable.push((product as any).image_url as string);
    }
    return fromTable;
  }, [product]);

  const [i, setI] = useState(0);
  const hasImages = urls.length > 0;
  const canPrev = hasImages && i > 0;
  const canNext = hasImages && i < urls.length - 1;

  const goPrev = () => canPrev && setI((n) => n - 1);
  const goNext = () => canNext && setI((n) => n + 1);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={product!.name}
      widthClassName="max-w-3xl"
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
        {/* Gallery */}
        <div className="sm:col-span-1">
          {hasImages ? (
            <div className="space-y-3">
              {/* Hero */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border">
                <img
                  src={urls[i]}
                  alt={`${product!.name} (${i + 1}/${urls.length})`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {urls.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={goPrev}
                      disabled={!canPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={goNext}
                      disabled={!canNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 disabled:opacity-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                      {i + 1}/{urls.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {urls.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {urls.map((u, idx) => (
                    <button
                      key={u + idx}
                      type="button"
                      onClick={() => setI(idx)}
                      className={`aspect-square overflow-hidden rounded-lg border ${
                        idx === i ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <img
                        src={u}
                        alt={`${product!.name} thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid aspect-square place-items-center rounded-xl bg-slate-100 text-3xl text-slate-600">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
        </div>

        {/* Details */}
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
          <Info label="Material" value={product!.material ?? 'N/A'} />
          <Info label="Size" value={product!.size ?? 'N/A'} />
          <Info label="Weight" value={product!.weight ?? 'N/A'} />
          <Info
            label="Cleaning Method"
            value={product!.cleaning_method ?? 'N/A'}
          />
          <Info
            label="Sustainability"
            value={product!.sustainability ?? 'N/A'}
          />
          <Info label="Tags" value={product!.tags ?? 'N/A'} />
          <Info label="Occasion" value={product!.occasion ?? 'N/A'} />
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
