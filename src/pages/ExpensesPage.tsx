import { PurchasesTable, PurchaseForm } from '../components/Purchases';
import { usePurchases } from '../lib/supabase/hooks/usePurchases';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type {
  Expense,
  ExpenseUpdate,
  PurchaseWithItemsInsert,
} from '../lib/supabase/models';
import { diffPurchaseItems } from '../lib/utils/diffPurchaseItems';
import { CrudSection } from '../components/common/';
import { useSupplies } from '../lib/supabase/hooks/useSupplies';
import { useExpenses } from '../lib/supabase/hooks/useExpenses';
import { ExpenseForm, ExpensesTable } from '../components/Expenses';

export default function ExpensesPage() {
  const {
    purchasesWithItems,
    loading: purchasesLoading,
    refetch: purchasesRefetch,
    createPurchase,
    createPurchaseItem,
    updatePurchase,
    updatePurchaseItem,
    deletePurchase,
    deletePurchaseItem,
  } = usePurchases();
  const { productsWithImages } = useProducts();
  const { supplies } = useSupplies();

  const {
    expenses,
    loading: expensesLoading,
    refetch: expensesRefetch,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  async function handlePurchaseCreate(values: PurchaseWithItemsInsert) {
    const purchase = {
      purchase_order_no: values.purchase_order_no,
      order_date: values.order_date,
      shipping_fee_domestic: values.shipping_fee_domestic,
      shipping_fee_international: values.shipping_fee_international,
      date_received: values.date_received,
    };

    await createPurchase(purchase, values.purchaseItems);
    purchasesRefetch();
  }

  async function handlePurchaseUpdate(
    id: string,
    values: PurchaseWithItemsInsert
  ) {
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
    purchasesRefetch();
  }

  async function handlePurchaseDelete(id: string) {
    await deletePurchase(id);
    purchasesRefetch();
  }

  async function handleExpenseCreate(expense: Expense) {
    await createExpense(expense);
    expensesRefetch();
  }

  async function handleExpenseUpdate(id: string, expense: ExpenseUpdate) {
    await updateExpense(id, expense);
    expensesRefetch();
  }

  async function handleExpenseDelete(id: string) {
    await deleteExpense(id);
    expensesRefetch();
  }

  return (
    <div className="space-y-6">
      <CrudSection
        title="Purchases Overview"
        description="Manage your product and supply expenses"
        addButtonText="Add Purchases"
        tableTitle="Purchases"
        rows={purchasesWithItems}
        loading={purchasesLoading}
        Table={PurchasesTable}
        Form={(props) => (
          <PurchaseForm
            {...props}
            inventory={[...productsWithImages, ...supplies]}
          />
        )}
        filters={{
          getRowLabel: (p) => p.purchase_order_no,
          getSearchParams: (p) => [p.purchase_order_no],
          searchParams: ['purchase order #'],
        }}
        onCreate={handlePurchaseCreate}
        onUpdate={handlePurchaseUpdate}
        onDelete={handlePurchaseDelete}
      />

      <CrudSection
        title="Expenses Overview"
        description="Manage your general costs and expenses"
        addButtonText="Add Expense"
        tableTitle="Expenses"
        rows={expenses}
        loading={expensesLoading}
        Table={ExpensesTable}
        Form={ExpenseForm}
        filters={{
          getRowLabel: (e) => e.name,
          getSearchParams: (e) => [e.name, e.description],
          searchParams: ['name', 'description'],
        }}
        onCreate={handleExpenseCreate}
        onUpdate={handleExpenseUpdate}
        onDelete={handleExpenseDelete}
      />
    </div>
  );
}
