import { supabase } from './client';

const BUCKET = 'product-images';

export async function uploadProductImage(
  id: string,
  file: File
): Promise<{
  data: { id: string; path: string; fullPath: string } | null;
  error: Error | null;
}> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `product/${id}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);
  if (error) {
    console.error('Error uploading product image', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductImageUrl(path: string): Promise<string> {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) console.error('Error getting URL');

  return data.publicUrl;
}

export async function removeProductImage(path: string) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
