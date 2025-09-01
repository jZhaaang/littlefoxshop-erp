import type {
  OrderItem,
  OrderItemInsert,
  OrderItemUpdate,
} from '../supabase/models';

export function diffOrderItems(
  original: OrderItem[],
  edited: OrderItemInsert[]
) {
  const origById = new Map(original.map((orig) => [orig.id, orig]));

  const itemsToCreate: OrderItemInsert[] = [];
  const itemsToUpdate: Array<{ id: string; orderItem: OrderItemUpdate }> = [];
  const keep = new Set<string>();

  for (const orderItem of edited) {
    if (!orderItem.id) {
      // new row
      itemsToCreate.push({
        order_id: '',
        product_sku: orderItem.product_sku,
        quantity: orderItem.quantity,
      });
      continue;
    }

    keep.add(orderItem.id);
    const before = origById.get(orderItem.id);
    if (!before) continue;

    const updated: OrderItemUpdate = {};
    if (orderItem.product_sku !== before.product_sku)
      updated.product_sku = orderItem.product_sku;
    if (orderItem.quantity !== before.quantity)
      updated.quantity = orderItem.quantity;

    if (Object.keys(updated).length > 0)
      itemsToUpdate.push({ id: orderItem.id, orderItem: updated });
  }

  const itemIdsToDelete = original
    .filter((orig) => !keep.has(orig.id))
    .map((orig) => orig.id);

  return { itemsToCreate, itemsToUpdate, itemIdsToDelete };
}
