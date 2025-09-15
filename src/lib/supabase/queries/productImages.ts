import type {
  ProductImage,
  ProductImageInsert,
  ProductImageUpdate,
} from '../models';
import { supabase } from '../client';
import { removeProductImage } from '../storage';

export async function getAllProductImages(): Promise<{
  data: ProductImage[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('product_images').select('*');

  if (error) {
    console.error('Error fetching productimages:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductImageById(
  id: string
): Promise<{ data: ProductImage | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductImagesByProductId(
  productId: string
): Promise<{ data: ProductImage[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId);

  if (error) {
    console.error('Error fetching product images:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createProductImage(
  productImage: ProductImageInsert
): Promise<{ data: ProductImage | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('product_images')
    .insert(productImage)
    .select()
    .single();

  if (error) {
    console.error('Error creating product image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateProductImageById(
  id: string,
  productImage: ProductImageUpdate
): Promise<{ data: ProductImage | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('product_images')
    .update(productImage)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteProductImageById(
  id: string
): Promise<{ data: ProductImage | null; error: Error | null }> {
  const { data: row, error: selError } = await supabase
    .from('product_images')
    .select('path')
    .eq('id', id)
    .maybeSingle();
  if (!row || selError) return { data: null, error: selError };

  try {
    await removeProductImage(row.path);
  } catch (err) {
    console.error('Storage delete failed:', (err as Error).message);
  }

  const { data: delData, error: delErr } = await supabase
    .from('product_images')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (delErr) {
    console.error('Error deleting product image:', delErr.message);
    return { data: null, error: delErr };
  }

  return { data: delData, error: null };
}
