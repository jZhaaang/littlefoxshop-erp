import { useState } from 'react';
import { OrdersTable, OrderForm } from '../components/Orders';
import { useOrders } from '../lib/supabase/hooks/useOrders';
import { useProducts } from '../lib/supabase/hooks/useProducts';
import type { OrderWithItemsInsert } from '../lib/supabase/models';
import { diffOrderItems } from '../lib/utils/diffOrderItems';
import { CrudSection } from '../components/common/';
import { useCrudDialogs } from '../lib/hooks/useCrudDialogs';

export default function ExpensesPage() {
  const [search, setSearch] = useState('');

  const {
    ordersWithItems,
    loading,
    createOrder,
    createOrderItem,
    updateOrder,
    updateOrderItem,
    deleteOrder,
    deleteOrderItem,
  } = useOrders();
  const { products } = useProducts();
  const orderDialogs = useCrudDialogs();

  async function handleCreate(values: OrderWithItemsInsert) {
    const order = {
      id: values.id,
      order_no: values.order_no,
      order_date: values.order_date,
      date_fulfilled: values.date_fulfilled,
      customer_name: values.customer_name,
      delivery_fee: values.delivery_fee,
      other_fees: values.other_fees,
      notes: values.notes,
    };

    await createOrder(order, values.orderItems);
  }
  async function handleUpdate(id: string, values: OrderWithItemsInsert) {
    const order = {
      id: values.id,
      order_no: values.order_no,
      order_date: values.order_date,
      date_fulfilled: values.date_fulfilled,
      customer_name: values.customer_name,
      delivery_fee: values.delivery_fee,
      other_fees: values.other_fees,
      notes: values.notes,
    };

    await updateOrder(order.id!, order);

    const original = ordersWithItems.find(
      (orderWithItems) => orderWithItems.id === id
    )!.orderItems;
    const edited = values.orderItems;

    const { itemsToCreate, itemsToUpdate, itemIdsToDelete } = diffOrderItems(
      original,
      edited
    );

    await Promise.all(itemIdsToDelete.map((id) => deleteOrderItem(id)));
    await Promise.all(
      itemsToUpdate.map(({ id, orderItem }) => updateOrderItem(id, orderItem))
    );
    await Promise.all(
      itemsToCreate.map((orderItem) => createOrderItem(id, orderItem))
    );
  }

  return (
    <div className="space-y-6">
      <CrudSection
        title="Orders Overview"
        description="Manage your customer orders"
        addButtonText="Add Order"
        tableTitle="Orders"
        rows={ordersWithItems}
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search orders by order number"
        Table={OrdersTable}
        Form={(props) => <OrderForm {...props} products={[...products]} />}
        getTitleForRow={(p) => p.order_no}
        getNameForRow={(p) => p.order_no}
        dialogs={orderDialogs}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={deleteOrder}
      />
    </div>
  );
}
