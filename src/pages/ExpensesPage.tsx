import { useState } from 'react';
import {
  Card,
  SearchBar,
  PageHeader,
  ConfirmDialog,
  Modal,
  LoadingModal,
} from '../components';
import { PurchasesTable } from '../components/Purchases';
import { usePurchases } from '../lib/supabase/hooks/usePurchases';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type { PurchaseWithItemsInsert } from '../lib/supabase/models';
import { PurchaseForm } from '../components/Purchases/PurchaseForm';
import { diffPurchaseItems } from '../lib/utils/diffPurchaseItems';

export default function ExpensesPage() {
  const [search, setSearch] = useState('');

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<string | null>(null);

  const [loadingText, setLoadingText] = useState<string | null>(null);

  const {
    purchasesWithItems,
    loading,
    createPurchase,
    createPurchaseItem,
    updatePurchase,
    updatePurchaseItem,
    deletePurchase,
    deletePurchaseItem,
  } = usePurchases();

  const { products } = useProducts();

  const filtered = purchasesWithItems.filter((purchaseWithItems) =>
    purchaseWithItems.purchase_order_no
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function onAddClick() {
    setOpenAdd(true);
  }

  async function handleAdd(values: PurchaseWithItemsInsert) {
    setLoadingText(`Adding ${values.purchase_order_no}`);

    const purchase = {
      purchase_order_no: values.purchase_order_no,
      order_date: values.order_date,
      shipping_fee_domestic: values.shipping_fee_domestic,
      shipping_fee_international: values.shipping_fee_international,
      date_received: values.date_received,
    };

    await createPurchase(purchase, values.purchaseItems);

    setLoadingText(null);
    setOpenAdd(false);
  }

  function onEditClick(id: string) {
    setOpenEdit(true);
    setCurrentPurchase(id);
  }

  async function handleEdit(values: PurchaseWithItemsInsert) {
    if (!currentPurchase) return;

    setLoadingText(`Editing Purchase Order #${values.purchase_order_no}`);

    const purchase = {
      id: values.id,
      purchase_order_no: values.purchase_order_no,
      order_date: values.order_date,
      shipping_fee_domestic: values.shipping_fee_domestic,
      shipping_fee_international: values.shipping_fee_international,
      date_received: values.date_received,
    };

    await updatePurchase(purchase.id!, purchase);

    const original = purchasesWithItems.find(
      (purchaseWithItems) => purchaseWithItems.id === currentPurchase
    )!.purchaseItems;
    const edited = values.purchaseItems;

    const { itemsToCreate, itemsToUpdate, itemIdsToDelete } = diffPurchaseItems(
      original,
      edited
    );

    await Promise.all(itemIdsToDelete.map((id) => deletePurchaseItem(id)));
    await Promise.all(
      itemsToUpdate.map(({ id, purchaseItem }) =>
        updatePurchaseItem(id, purchaseItem)
      )
    );
    await Promise.all(
      itemsToCreate.map((pi) => createPurchaseItem(currentPurchase, pi))
    );

    setLoadingText(null);
    setOpenEdit(false);
    setCurrentPurchase(null);
  }

  function onDeleteClick(id: string) {
    setOpenDelete(true);
    setCurrentPurchase(id);
  }

  async function handleDelete() {
    if (!currentPurchase) return;

    setLoadingText(
      `Deleting Purchase Order #${purchasesWithItems.find((purchaseWithItems) => purchaseWithItems.id === currentPurchase)?.purchase_order_no}`
    );

    await deletePurchase(currentPurchase);

    setLoadingText(null);
    setOpenDelete(false);
    setCurrentPurchase(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses Overview"
        description="Manage your business expenses"
        buttonText="Add Expense"
        onClick={onAddClick}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Search expenses by supplier or order number"
      />

      <Card title={`Purchases (${filtered.length})`}>
        <PurchasesTable
          rows={purchasesWithItems}
          loading={loading}
          onEdit={(purchase) => onEditClick(purchase.id)}
          onDelete={(purchase) => onDeleteClick(purchase.id)}
        />
      </Card>

      <Modal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
        title={`Add New Purchase`}
      >
        <PurchaseForm
          type="create"
          products={products}
          onCancel={() => {
            setOpenAdd(false);
          }}
          onSubmit={(values) => handleAdd(values)}
        />
      </Modal>

      <Modal
        open={openEdit && !!currentPurchase}
        onClose={() => {
          setOpenEdit(false);
          setCurrentPurchase(null);
        }}
        title={`Edit Purchase Order #${purchasesWithItems.find((purchaseWithItems) => purchaseWithItems.id === currentPurchase)?.purchase_order_no}`}
      >
        {currentPurchase && (
          <PurchaseForm
            type="edit"
            initial={purchasesWithItems.find(
              (purchaseWithItems) => purchaseWithItems.id === currentPurchase
            )}
            products={products}
            onCancel={() => {
              setOpenEdit(false);
              setCurrentPurchase(null);
            }}
            onSubmit={(values) => handleEdit(values)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={openDelete}
        onCancel={() => {
          setOpenDelete(false);
          setCurrentPurchase(null);
        }}
        onConfirm={handleDelete}
        title={`Delete Purchase Order #${
          purchasesWithItems.find(
            (purchaseWithItems) => purchaseWithItems.id === currentPurchase
          )?.purchase_order_no
        }?`}
        description={`This will permanently remove Purchase Order #${
          purchasesWithItems.find(
            (purchaseWithItems) => purchaseWithItems.id === currentPurchase
          )?.purchase_order_no
        }.`}
        confirmText="Delete"
      />

      <LoadingModal open={!!loadingText} text={loadingText ?? ''} />
    </div>
  );
}
