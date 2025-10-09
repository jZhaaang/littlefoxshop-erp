import { supabase } from '../client';
import type { NoteImage, NoteImageInsert, NoteImageUpdate } from '../models';
import { removeNoteImage } from '../storage';

export async function getNoteImagesByNoteId(
  noteId: string
): Promise<{ data: NoteImage[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('note_images')
    .select('*')
    .eq('note_id', noteId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching note images:', error.message);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function createNoteImage(
  noteImage: NoteImageInsert
): Promise<{ data: NoteImage | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('note_images')
    .insert(noteImage)
    .select()
    .single();

  if (error) {
    console.error('Error creating note image:', error.message);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function updateNoteImageById(
  id: string,
  noteImage: NoteImageUpdate
): Promise<{ data: NoteImage | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('note_images')
    .update(noteImage)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating note image:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteNoteImageById(
  id: string
): Promise<{ data: NoteImage | null; error: Error | null }> {
  const { data: row, error: selError } = await supabase
    .from('note_images')
    .select('path')
    .eq('id', id)
    .maybeSingle();
  if (!row || selError) return { data: null, error: selError };

  try {
    await removeNoteImage(row.path);
  } catch (err) {
    console.error('Storage delete failed:', (err as Error).message);
  }

  const { data: delData, error: delErr } = await supabase
    .from('note_images')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (delErr) {
    console.error('Error deleting note image:', delErr.message);
    return { data: null, error: delErr };
  }

  return { data: delData, error: null };
}
