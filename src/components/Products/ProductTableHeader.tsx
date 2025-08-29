export function ProductTableHeader() {
  return (
    <div className="py-2 px-2 grid grid-cols-12 items-center gap-2 font-semibold text-center text-sm text-slate-600 border-b bg-slate-100 rounded-lg">
      <div className="col-span-1" />
      <div className="col-span-4 text-left">Product</div>
      <div className="col-span-2 text-left">SKU</div>
      <div className="col-span-1">Type</div>
      <div className="col-span-1">Cost</div>
      <div className="col-span-1">Price</div>
      <div className="col-span-1">Stock</div>
      <div className="col-span-1" />
    </div>
  );
}
