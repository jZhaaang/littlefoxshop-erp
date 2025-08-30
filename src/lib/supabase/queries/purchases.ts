import type { Purchase, PurchaseInsert, PurchaseUpdate } from '../models';
import { supabase } from '../client';

export async function getAllPurchases(): Promise<{
  data: Purchase[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('purchases').select('*');

  if (error) {
    console.error('Error fetching purchases:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getPurchaseById(id: string): Promise<{
  data: Purchase | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching purchase:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createPurchase(
  purchase: PurchaseInsert
): Promise<{ data: Purchase | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchases')
    .insert(purchase)
    .select()
    .single();

  if (error) {
    console.error('Error creating purchase:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updatePurchaseById(
  id: string,
  purchase: PurchaseUpdate
): Promise<{ data: Purchase | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchases')
    .update(purchase)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating purchase:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deletePurchaseById(
  id: string
): Promise<{ data: Purchase | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('purchases')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting purchase:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
