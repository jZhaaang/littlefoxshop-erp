import { ProductForm, ProductsTable } from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import { CrudSection } from '../components/common/CrudSection';
import { useSupplies } from '../lib/supabase/hooks/useSupplies';
import { SuppliesTable, SupplyForm } from '../components/Supplies';

export default function InventoryPage() {
  const {
    products,
    loading: productsLoading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const {
    supplies,
    loading: suppliesLoading,
    createSupply,
    updateSupply,
    deleteSupply,
  } = useSupplies();

  return (
    <div className="space-y-6">
      <CrudSection
        title="Product Management"
        description="Manage your products to be sold"
        addButtonText="Add Product"
        tableTitle="Products"
        rows={products}
        loading={productsLoading}
        Table={ProductsTable}
        Form={ProductForm}
        filters={{
          getRowLabel: (p) => p.name,
          getSearchParams: (p) => [p.name, p.sku, p.supplier],
          searchParams: ['name', 'SKU', 'supplier'],
        }}
        onCreate={createProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
      />

      <CrudSection
        title="Supplies Management"
        description="Manage your inventory of packaging supplies"
        addButtonText="Add Supply"
        tableTitle="Supplies"
        rows={supplies}
        loading={suppliesLoading}
        Table={SuppliesTable}
        Form={SupplyForm}
        filters={{
          getRowLabel: (s) => s.name,
          getSearchParams: (s) => [s.name, s.sku, s.supplier],
          searchParams: ['name', 'SKU', 'supplier'],
        }}
        onCreate={createSupply}
        onUpdate={updateSupply}
        onDelete={deleteSupply}
      />
    </div>
  );
}
