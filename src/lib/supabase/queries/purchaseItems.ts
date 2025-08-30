import type {
  PurchaseItem,
  PurchaseItemInsert,
  PurchaseItemUpdate,
} from '../models';
import { supabase } from '../client';

export async function getAllPurchaseItems(): Promise<{
  data: PurchaseItem[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('purchase_items').select('*');

  if (error) {
    console.error('Error fetching purchase items:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getPurchaseItemById(id: string): Promise<{
  data: PurchaseItem | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('purchase_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching purchase item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getPurchaseItemsByPurchaseId(
  purchaseId: string
): Promise<{
  data: PurchaseItem[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('purchase_items')
    .select('*')
    .eq('purchase_id', purchaseId);

  if (error) {
    console.error('Error fetching purchase item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createPurchaseItem(
  purchaseItem: PurchaseItemInsert
): Promise<{ data: PurchaseItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchase_items')
    .insert(purchaseItem)
    .select()
    .single();

  if (error) {
    console.error('Error creating purchase item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updatePurchaseItemById(
  id: string,
  purchaseItem: PurchaseItemUpdate
): Promise<{ data: PurchaseItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchase_items')
    .update(purchaseItem)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating purchase item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deletePurchaseItemById(
  id: string
): Promise<{ data: PurchaseItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchase_items')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting purchase item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
