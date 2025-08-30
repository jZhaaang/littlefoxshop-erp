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

export default function ExpensesPage() {
  const [search, setSearch] = useState('');

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

  const filtered = purchasesWithItems.filter((purchaseWithItems) =>
    (
      purchaseWithItems.purchase.purchase_order_no +
      purchaseWithItems.purchase.supplier
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function onAddClick() {}

  async function handleAdd() {}

  function onEditClick() {}

  async function handleEdit() {}

  function onDeleteClick() {}

  async function handleDelete() {}

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses Overview"
        description="Manage your business expenses"
        buttonText="Add Expense"
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
          onEdit={() => onEditClick()}
          onDelete={() => onDeleteClick()}
        />
      </Card>
    </div>
  );
}
