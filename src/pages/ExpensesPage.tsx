import { PurchasesTable, PurchaseForm } from '../components/Purchases';
import { usePurchases } from '../lib/supabase/hooks/usePurchases';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type { PurchaseWithItemsInsert } from '../lib/supabase/models';
import { diffPurchaseItems } from '../lib/utils/diffPurchaseItems';
import { CrudSection } from '../components/common/';
import { useSupplies } from '../lib/supabase/hooks/useSupplies';

export default function ExpensesPage() {
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
  const { supplies } = useSupplies();

  async function handleCreate(values: PurchaseWithItemsInsert) {
    const purchase = {
      purchase_order_no: values.purchase_order_no,
      order_date: values.order_date,
      shipping_fee_domestic: values.shipping_fee_domestic,
      shipping_fee_international: values.shipping_fee_international,
      date_received: values.date_received,
    };

    await createPurchase(purchase, values.purchaseItems);
  }
  async function handleUpdate(id: string, values: PurchaseWithItemsInsert) {
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
      (purchaseWithItems) => purchaseWithItems.id === id
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
      itemsToCreate.map((purchaseItem) => createPurchaseItem(id, purchaseItem))
    );
  }

  return (
    <div className="space-y-6">
      <CrudSection
        title="Expenses Overview"
        description="Manage your product and supply expenses"
        addButtonText="Add Expense"
        tableTitle="Expenses"
        rows={purchasesWithItems}
        loading={loading}
        Table={PurchasesTable}
        Form={(props) => (
          <PurchaseForm {...props} inventory={[...products, ...supplies]} />
        )}
        filters={{
          getRowLabel: (p) => p.purchase_order_no,
          getSearchParams: (p) => [p.purchase_order_no],
          searchParams: ['purchase order #'],
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={deletePurchase}
      />
    </div>
  );
}
