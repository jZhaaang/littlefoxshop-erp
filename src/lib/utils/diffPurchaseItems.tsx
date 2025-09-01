import type {
  PurchaseItem,
  PurchaseItemInsert,
  PurchaseItemUpdate,
} from '../supabase/models';

export function diffPurchaseItems(
  original: PurchaseItem[],
  edited: PurchaseItemInsert[]
) {
  const origById = new Map(original.map((orig) => [orig.id, orig]));

  const itemsToCreate: PurchaseItemInsert[] = [];
  const itemsToUpdate: Array<{ id: string; purchaseItem: PurchaseItemUpdate }> =
    [];
  const keep = new Set<string>();

  for (const purchaseItem of edited) {
    if (!purchaseItem.id) {
      // new row
      itemsToCreate.push({
        purchase_id: '',
        sku: purchaseItem.sku,
        quantity: purchaseItem.quantity,
      });
      continue;
    }

    keep.add(purchaseItem.id);
    const before = origById.get(purchaseItem.id);
    if (!before) continue;

    const updated: PurchaseItemUpdate = {};
    if (purchaseItem.sku !== before.sku) updated.sku = purchaseItem.sku;
    if (purchaseItem.quantity !== before.quantity)
      updated.quantity = purchaseItem.quantity;

    if (Object.keys(updated).length > 0)
      itemsToUpdate.push({ id: purchaseItem.id, purchaseItem: updated });
  }

  const itemIdsToDelete = original
    .filter((orig) => !keep.has(orig.id))
    .map((orig) => orig.id);

  return { itemsToCreate, itemsToUpdate, itemIdsToDelete };
}
