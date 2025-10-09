import type { NoteWithImages } from '../../lib/supabase/models';
import { Modal } from '../common/Modal';
import { RichTextEditor } from '../common';

type Props = {
  note: NoteWithImages | null;
  onClose: () => void;
};

export function NoteDetails({ note, onClose }: Props) {
  const open = !!note;
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={note!.title || 'Untitled'}
      widthClassName="max-w-3xl"
      footer={
        <button
          className="rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
          onClick={onClose}
        >
          Close
        </button>
      }
    >
      <div className="space-y-4">
        {note!.images?.length ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {note!.images.map((img, idx) => (
              <div
                key={img.id ?? idx}
                className="overflow-hidden rounded-lg border bg-slate-50"
              >
                <img
                  src={img.url ?? ''}
                  alt={`${note!.title ?? 'Note'} image ${idx + 1}`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : null}

        {/* Content */}
        <div className="space-y-2">
          {note.content_json ? (
            <RichTextEditor
              value={(note as any).content_json}
              onChange={() => {}}
              editable={false}
              toolbar={{}}
            />
          ) : (
            <div className="text-sm text-slate-500">No content</div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <div>
              <span className="uppercase tracking-wide">Updated</span>{' '}
              {note!.updated_at
                ? new Date(note!.updated_at).toLocaleString()
                : '—'}
            </div>
            <div>
              <span className="uppercase tracking-wide">Created</span>{' '}
              {note!.created_at
                ? new Date(note!.created_at).toLocaleString()
                : '—'}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
