import { ProductForm, ProductsTable } from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import { CrudSection } from '../components/common/CrudSection';
import { useSupplies } from '../lib/supabase/hooks/useSupplies';
import { SuppliesTable, SupplyForm } from '../components/Supplies';
import type {
  ImagesDraft,
  ProductWithImagesInsert,
} from '../lib/supabase/models';

export default function InventoryPage() {
  const {
    productsWithImages,
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

  const conformedProducts = productsWithImages.map((productWithImages) => {
    return {
      ...productWithImages,
      imagesDraft: {
        existing: productWithImages.images,
        added: [],
        removedIds: [],
      } as ImagesDraft,
    };
  });

  async function handleCreate(values: ProductWithImagesInsert) {
    const product = {
      sku: values.sku,
      name: values.name,
      supplier: values.supplier,
      type: values.type,
      price_usd: values.price_usd,
      cost_rmb: values.cost_rmb,
      description: values.description,
      details: values.details,
      min_stock: values.min_stock,
    };

    await createProduct(product, values.imagesDraft!);
  }
  async function handleUpdate(id: string, values: ProductWithImagesInsert) {
    const product = {
      sku: values.sku,
      name: values.name,
      supplier: values.supplier,
      type: values.type,
      price_usd: values.price_usd,
      cost_rmb: values.cost_rmb,
      description: values.description,
      details: values.details,
      min_stock: values.min_stock,
    };

    await updateProduct(id, product, values.imagesDraft!);
  }

  return (
    <div className="space-y-6">
      <CrudSection
        title="Product Management"
        description="Manage your products to be sold"
        addButtonText="Add Product"
        tableTitle="Products"
        rows={conformedProducts}
        loading={productsLoading}
        Table={ProductsTable}
        Form={ProductForm}
        filters={{
          getRowLabel: (p) => p.name,
          getSearchParams: (p) => [p.name, p.sku, p.supplier, p.type],
          searchParams: ['name', 'SKU', 'supplier', 'type'],
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
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
