import { useState } from 'react';
import { products } from '../data/fake';
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

export default function ProductsPage() {
  const [search, setSearch] = useState('');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentSku, setCurrentSku] = useState<string | null>(null);

  const filtered = products.filter((product) =>
    (product.name + product.sku + product.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function onAddClick() {
    setOpenAdd(true);
  }

  async function handleAdd() {
    setOpenAdd(false);
  }

  function onEditClick(sku: string) {
    setOpenEdit(true);
    setCurrentSku(sku);
  }

  async function handleEdit() {
    if (!currentSku) return;

    setOpenEdit(false);
    setCurrentSku(null);
  }

  function onDeleteClick(sku: string) {
    setOpenDelete(true);
    setCurrentSku(sku);
  }

  async function handleDelete() {
    if (!currentSku) return;

    setOpenDelete(false);
    setCurrentSku(null);
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
          {filtered.map((product) => (
            <ProductRow
              product={product}
              onEdit={() => onEditClick(product.sku)}
              onDelete={() => onDeleteClick(product.sku)}
            />
          ))}
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
          onSubmit={handleAdd}
        />
      </Modal>

      <Modal
        open={openEdit && !!currentSku}
        onClose={() => {
          setOpenEdit(false);
          setCurrentSku(null);
        }}
        title={`Edit ${
          products.find((product) => product.sku === currentSku)?.name ??
          'this product'
        }`}
      >
        {currentSku && (
          <ProductForm
            type="edit"
            initial={products.find((product) => product.sku === currentSku)}
            onCancel={() => {
              setOpenEdit(false);
              setCurrentSku(null);
            }}
            onSubmit={handleEdit}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={openDelete}
        onCancel={() => {
          setOpenDelete(false);
          setCurrentSku(null);
        }}
        onConfirm={handleDelete}
        title="Delete product?"
        description={`This will permanently remove ${
          products.find((product) => product.sku === currentSku)?.name ??
          'this product'
        }.`}
        confirmText="Delete"
      />
    </div>
  );
}
