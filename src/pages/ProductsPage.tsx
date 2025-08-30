import { useState } from 'react';
import {
  Card,
  SearchBar,
  PageHeader,
  ConfirmDialog,
  Modal,
  LoadingModal,
} from '../components';
import { ProductForm, ProductsTable } from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type { ProductValues } from '../lib/supabase/models';

export default function ProductsPage() {
  const [search, setSearch] = useState('');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);

  const { products, loading, createProduct, updateProduct, deleteProduct } =
    useProducts();

  const [loadingText, setLoadingText] = useState<string | null>(null);

  const filtered = products.filter((product) =>
    (product.name + product.sku + product.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function onAddClick() {
    setOpenAdd(true);
  }

  async function handleAdd(values: ProductValues) {
    setLoadingText(`Adding ${values.name}`);

    await createProduct(values);

    setLoadingText(null);
    setOpenAdd(false);
  }

  function onEditClick(id: string) {
    setOpenEdit(true);
    setCurrentProduct(id);
  }

  async function handleEdit(values: ProductValues) {
    if (!currentProduct) return;

    setLoadingText(`Editing ${values.sku}`);

    await updateProduct(currentProduct, values);

    setLoadingText(null);
    setOpenEdit(false);
    setCurrentProduct(null);
  }

  function onDeleteClick(id: string) {
    setOpenDelete(true);
    setCurrentProduct(id);
  }

  async function handleDelete() {
    if (!currentProduct) return;

    setLoadingText(
      `Deleting ${products.find((product) => product.id === currentProduct)?.sku}`
    );

    await deleteProduct(currentProduct);

    setLoadingText(null);
    setOpenDelete(false);
    setCurrentProduct(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="Manage your inventory and products"
        buttonText="Add Product"
        onClick={() => onAddClick()}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search products by name or SKU"
      />

      <Card title={`Products (${filtered.length})`}>
        <ProductsTable
          rows={filtered}
          loading={loading}
          onEdit={(product) => onEditClick(product.id)}
          onDelete={(product) => onDeleteClick(product.id)}
        />
      </Card>

      <Modal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
        title={`Add New Product`}
      >
        <ProductForm
          type="create"
          onCancel={() => {
            setOpenAdd(false);
          }}
          onSubmit={(values) => handleAdd(values)}
        />
      </Modal>

      <Modal
        open={openEdit && !!currentProduct}
        onClose={() => {
          setOpenEdit(false);
          setCurrentProduct(null);
        }}
        title={`Edit ${
          products.find((product) => product.id === currentProduct)?.sku
        }`}
      >
        {currentProduct && (
          <ProductForm
            type="edit"
            initial={products.find((product) => product.id === currentProduct)}
            onCancel={() => {
              setOpenEdit(false);
              setCurrentProduct(null);
            }}
            onSubmit={(values) => handleEdit(values)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={openDelete}
        onCancel={() => {
          setOpenDelete(false);
          setCurrentProduct(null);
        }}
        onConfirm={handleDelete}
        title={`Delete ${
          products.find((product) => product.id === currentProduct)?.sku
        }?`}
        description={`This will permanently remove ${
          products.find((product) => product.id === currentProduct)?.name
        }.`}
        confirmText="Delete"
      />

      <LoadingModal open={!!loadingText} text={loadingText ?? ''} />
    </div>
  );
}
