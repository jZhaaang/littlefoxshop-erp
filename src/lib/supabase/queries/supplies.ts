import type { Supply, SupplyInsert, SupplyUpdate } from '../models';
import { supabase } from '../client';

export async function getAllSupplies(): Promise<{
  data: Supply[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('supplies').select('*');

  if (error) {
    console.error('Error fetching supplies:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getSupplyById(
  id: string
): Promise<{ data: Supply | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('supplies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching supply:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getSupplyBySku(
  sku: string
): Promise<{ data: Supply | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('supplies')
    .select('*')
    .eq('sku', sku)
    .single();

  if (error) {
    console.error('Error fetching supply:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createSupply(
  supply: SupplyInsert
): Promise<{ data: Supply | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('supplies')
    .insert(supply)
    .select()
    .single();

  if (error) {
    console.error('Error creating supplies:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateSupplyById(
  id: string,
  supply: SupplyUpdate
): Promise<{ data: Supply | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('supplies')
    .update(supply)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating supply:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteSupplyById(
  id: string
): Promise<{ data: Supply | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('supplies')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting supply:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
