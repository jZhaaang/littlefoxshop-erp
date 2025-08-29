import type { Product, ProductInsert, ProductUpdate } from '../models';
import { supabase } from '../client';

export async function getAllProducts(): Promise<{
  data: Product[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductById(
  id: string
): Promise<{ data: Product | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductBySku(
  sku: string
): Promise<{ data: Product | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('sku', sku)
    .single();

  if (error) {
    console.error('Error fetching product:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createProduct(
  product: ProductInsert
): Promise<{ data: Product | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateProductById(
  id: string,
  product: ProductUpdate
): Promise<{ data: Product | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteProductById(
  id: string
): Promise<{ data: Product | null; error: Error | null }> {
  const { data, error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Error deleting product:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
