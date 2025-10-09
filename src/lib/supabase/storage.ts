import { supabase } from './client';

const PRODUCT_BUCKET = 'product-images';
const NOTE_BUCKET = 'note-images';

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
    .from(PRODUCT_BUCKET)
    .upload(path, file);
  if (error) {
    console.error('Error uploading product image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getProductImageUrl(path: string): Promise<string> {
  const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) console.error('Error getting URL');

  return data.publicUrl;
}

export async function removeProductImage(path: string) {
  const { error } = await supabase.storage.from(PRODUCT_BUCKET).remove([path]);
  if (error) throw error;
}

export async function uploadNoteImage(
  noteId: string,
  file: File
): Promise<{
  data: { id: string; path: string; fullPath: string } | null;
  error: Error | null;
}> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `note/${noteId}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(NOTE_BUCKET)
    .upload(path, file);
  if (error) {
    console.error('Error uploading note image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getNoteImageUrl(path: string): Promise<string> {
  const { data } = supabase.storage.from(NOTE_BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) console.error('Error getting URL');

  return data.publicUrl;
}

export async function removeNoteImage(path: string) {
  const { error } = await supabase.storage.from(NOTE_BUCKET).remove([path]);
  if (error) throw error;
}
