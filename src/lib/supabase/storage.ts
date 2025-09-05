import { supabase } from './client';

const BUCKET = 'product-images';

export async function uploadProductImage(params: {
  sku: string;
  file: File;
}): Promise<string> {
  const { sku, file } = params;
  const ext = file.name.split('.').pop() || 'jpg';
  const key = `product/${sku}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(key, file);
  if (uploadError)
    console.error('Error uploading product image', uploadError.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  if (!data?.publicUrl) console.error('Error getting URL');

  return data.publicUrl;
}
