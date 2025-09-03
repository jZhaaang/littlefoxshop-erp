import { useState } from 'react';
import { ProductForm, ProductsTable } from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import { CrudSection } from '../components/common/CrudSection';
import { useCrudDialogs } from '../lib/hooks/useCrudDialogs';
import { useSupplies } from '../lib/supabase/hooks/useSupplies';
import { SuppliesTable, SupplyForm } from '../components/Supplies';

export default function InventoryPage() {
  const [productSearch, setProductSearch] = useState('');
  const [supplySearch, setSupplySearch] = useState('');

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
  const productDialogs = useCrudDialogs();
  const supplyDialogs = useCrudDialogs();

  return (
    <div className="space-y-6">
      <CrudSection
        title="Product Management"
        description="Manage your products to be sold"
        addButtonText="Add Product"
        tableTitle="Products"
        rows={products}
        loading={productsLoading}
        search={productSearch}
        setSearch={setProductSearch}
        searchPlaceholder="Search products by name, SKU, or supplier"
        Table={ProductsTable}
        Form={ProductForm}
        getTitleForRow={(p) => p.sku}
        getFilterForRow={(p) => p.name + p.type + p.supplier}
        dialogs={productDialogs}
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
        search={supplySearch}
        setSearch={setSupplySearch}
        searchPlaceholder="Search supplies by name, SKU, or supplier"
        Table={SuppliesTable}
        Form={SupplyForm}
        getTitleForRow={(s) => s.sku}
        getFilterForRow={(s) => s.name + s.supplier}
        dialogs={supplyDialogs}
        onCreate={createSupply}
        onUpdate={updateSupply}
        onDelete={deleteSupply}
      />
    </div>
  );
}
