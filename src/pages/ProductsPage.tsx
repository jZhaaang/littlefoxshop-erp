import { useState } from 'react';
import { ProductForm, ProductsTable } from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import { CrudSection } from '../components/common/CrudSection';
import { useCrudDialogs } from '../lib/hooks/useCrudDialogs';

export default function ProductsPage() {
  const [search, setSearch] = useState('');

  const { products, loading, createProduct, updateProduct, deleteProduct } =
    useProducts();
  const productDialogs = useCrudDialogs();

  return (
    <div className="space-y-6">
      <CrudSection
        title="Product Management"
        description="Manage your products to be sold"
        addButtonText="Add Product"
        tableTitle="Products"
        rows={products}
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search products by name or SKU"
        Table={ProductsTable}
        Form={ProductForm}
        getTitleForRow={(p) => p.sku}
        getNameForRow={(p) => p.name}
        dialogs={productDialogs}
        onCreate={createProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}
