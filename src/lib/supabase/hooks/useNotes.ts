import { useEffect, useState } from 'react';
import type {
  ImagesDraft,
  NoteInsert,
  NoteUpdate,
  NoteWithImages,
} from '../models';
import {
  getAllNotes,
  createNote as createNoteQuery,
  updateNoteById,
  deleteNoteById,
} from '../queries/notes';
import {
  createNoteImage as createNoteImageQuery,
  deleteNoteImageById,
  getNoteImagesByNoteId,
} from '../queries/noteImages';
import { getNoteImageUrl, uploadNoteImage } from '../storage';

export function useNotes() {
  const [notesWithImages, setNotesWithImages] = useState<NoteWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data: notesData, error: notesError } = await getAllNotes();
      if (!notesData || notesError) throw notesError;

      const promises = notesData.map(async (note) => {
        const { data: noteImagesData, error: noteImagesError } =
          await getNoteImagesByNoteId(note.id);
        if (!noteImagesData || noteImagesError) throw noteImagesError;

        return {
          ...note,
          images: noteImagesData,
        } as NoteWithImages;
      });
      const enriched = await Promise.all(promises);
      setNotesWithImages(enriched);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (note: NoteInsert, noteImages: ImagesDraft) => {
    setLoading(true);
    try {
      const { data: noteData, error: noteError } = await createNoteQuery(note);
      if (!noteData || noteError) throw noteError;
      const noteId = noteData.id;

      const promises = noteImages.added.map(async (noteImage) => {
        const { data: uploadData, error: uploadError } = await uploadNoteImage(
          noteId,
          noteImage.file
        );
        if (!uploadData || uploadError) throw uploadError;

        const url = await getNoteImageUrl(uploadData.path);

        const { data: noteImageData, error: noteImageError } =
          await createNoteImageQuery({
            note_id: noteId,
            path: uploadData.path,
            url,
          });
        if (!noteImageData || noteImageError) throw noteImageError;

        return noteImageData;
      });

      const enriched = await Promise.all(promises);
      const newNoteWithImages = {
        ...noteData,
        images: enriched,
      };
      setNotesWithImages((prev) => [...prev, newNoteWithImages]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (
    id: string,
    note: NoteUpdate,
    noteImages: ImagesDraft
  ) => {
    setLoading(true);
    try {
      const { data: noteData, error: noteError } = await updateNoteById(
        id,
        note
      );
      if (!noteData || noteError) throw error;
      const noteId = noteData.id;

      setNotesWithImages((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, note: noteData } : note
        )
      );

      if (noteImages.added.length || noteImages.removedIds.length) {
        const removed = new Set(noteImages.removedIds);
        for (const id of removed) {
          await deleteNoteImageById(id);
        }

        const promises = noteImages.added.map(async (noteImage) => {
          const { data: uploadData, error: uploadError } =
            await uploadNoteImage(noteId, noteImage.file);
          if (!uploadData || uploadError) throw uploadError;

          const url = await getNoteImageUrl(uploadData.path);

          const { data: noteImageData, error: noteImageError } =
            await createNoteImageQuery({
              note_id: noteId,
              path: uploadData.path,
              url,
            });
          if (!noteImageData || noteImageError) throw noteImageError;

          return noteImageData;
        });

        const enriched = await Promise.all(promises);
        setNotesWithImages((prev) =>
          prev.map((note) => {
            if (note.id !== id) return note;
            return {
              ...note,
              images: [
                ...note.images!.filter((image) => !removed.has(image.id)),
                ...enriched,
              ],
            };
          })
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await deleteNoteById(id);
      if (error) throw error;
      setNotesWithImages((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notesWithImages,
    loading,
    error,
    refetch: fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}
