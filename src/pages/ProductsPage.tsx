import { useState } from 'react';
import {
  Card,
  SearchBar,
  PageHeader,
  ConfirmDialog,
  Modal,
} from '../components';
import {
  ProductTableHeader,
  ProductRow,
  ProductForm,
} from '../components/Products';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type { ProductValues } from '../lib/supabase/models';
import { Spinner } from '../components/Spinner';
import { LoadingModal } from '../components/LoadingModal';

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

  function onEditClick(sku: string) {
    setOpenEdit(true);
    setCurrentProduct(sku);
  }

  async function handleEdit(values: ProductValues) {
    if (!currentProduct) return;

    setLoadingText(`Editing ${values.sku}`);

    await updateProduct(currentProduct, values);

    setLoadingText(null);
    setOpenEdit(false);
    setCurrentProduct(null);
  }

  function onDeleteClick(sku: string) {
    setOpenDelete(true);
    setCurrentProduct(sku);
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
        <div className="divide-y">
          <ProductTableHeader />

          {/* Product Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner className="h-8 w-8" />
              <span className="ml-3 text-sm text-gray-600">
                Loading products…
              </span>
            </div>
          ) : (
            filtered.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={() => onEditClick(product.id)}
                onDelete={() => onDeleteClick(product.id)}
              />
            ))
          )}
        </div>
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
