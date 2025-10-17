import { CrudSection } from '../components/common';
import { NoteForm, NotesList } from '../components/Notes';
import { useNotes } from '../lib/supabase/hooks/useNotes';
import type { ImagesDraft, NoteWithImagesInsert } from '../lib/supabase/models';

export default function NotesPage() {
  const {
    notesWithImages,
    loading,
    refetch,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const conformedNotes = notesWithImages.map((noteWithImages) => {
    return {
      ...noteWithImages,
      imagesDraft: {
        existing: noteWithImages.images,
        added: [],
        removedIds: [],
      } as ImagesDraft,
    };
  });

  async function handleCreate(values: NoteWithImagesInsert) {
    const note = {
      title: values.title,
      content_json: values.content_json,
    };

    await createNote(note, values.imagesDraft!);
    refetch();
  }

  async function handleUpdate(id: string, values: NoteWithImagesInsert) {
    const note = {
      title: values.title,
      content_json: values.content_json,
    };
    await updateNote(id, note, values.imagesDraft!);
    refetch();
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    refetch();
  }

  return (
    <div className="space-y-4">
      <CrudSection
        title="Team Notes"
        description=""
        addButtonText="Add Note"
        tableTitle="Notes"
        rows={conformedNotes}
        loading={loading}
        Table={NotesList}
        Form={NoteForm}
        filters={{
          getRowLabel: (n) => n.title,
          getSearchParams: (n) => [n.title],
          searchParams: ['title'],
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
