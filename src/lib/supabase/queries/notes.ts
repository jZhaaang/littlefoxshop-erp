import { supabase } from '../client';
import type { Note, NoteInsert, NoteUpdate } from '../models';

export async function getAllNotes(): Promise<{
  data: Note[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('notes').select('*');

  if (error) {
    console.error('Error fetching notes:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createNote(
  note: NoteInsert
): Promise<{ data: Note | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('notes')
    .insert(note)
    .select()
    .single();

  if (error) {
    console.error('Error creating note:', error.message);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function updateNoteById(
  id: string,
  note: NoteUpdate
): Promise<{ data: Note | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('notes')
    .update(note)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating note:', error.message);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function deleteNoteById(
  id: string
): Promise<{ data: Note | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting note:', error.message);
    return { data: null, error };
  }
  return { data, error: null };
}
