import { useMemo, useState } from 'react';
import type { NoteWithImages } from '../../lib/supabase/models';
import { NoteDetails } from './NoteDetails';
import { Spinner } from '../common/Spinner';

type Props = {
  rows: NoteWithImages[];
  loading?: boolean;
  onEdit: (note: NoteWithImages) => void;
  onDelete: (note: NoteWithImages) => void;
};

export function NotesList({ rows, loading, onEdit, onDelete }: Props) {
  const [selected, setSelected] = useState<NoteWithImages | null>(null);

  const ordered = useMemo(() => {
    return [...rows].sort((a, b) => {
      const at = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
      const bt = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
      return bt - at;
    });
  }, [rows]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinner className="h-8 w-8" />
        <span className="ml-3 text-sm text-gray-600">Loading…</span>
      </div>
    );
  }

  if (!ordered.length) {
    return (
      <div className="grid place-items-center rounded-xl border bg-white py-12 text-center">
        <div className="space-y-2">
          <div className="text-3xl">📝</div>
          <div className="text-sm text-slate-500">No notes yet</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((n) => {
          const open = () => setSelected(n);
          const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          };

          return (
            <div
              key={n.id}
              role="button"
              tabIndex={0}
              onClick={open}
              onKeyDown={onKey}
              className="group cursor-pointer overflow-hidden rounded-2xl border bg-white text-left transition hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {n.images?.length ? (
                <div className="relative h-24 w-full overflow-hidden bg-slate-50">
                  <img
                    src={n.images[0].url ?? ''}
                    alt={n.title ?? 'Note image'}
                    className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {n.images.length > 1 && (
                    <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs text-slate-700 shadow">
                      +{n.images.length - 1} more
                    </div>
                  )}
                </div>
              ) : null}

              <div className="space-y-1 p-4">
                <div className="truncate text-base font-semibold text-slate-900">
                  {n.title || 'Untitled'}
                </div>
                <div className="line-clamp-2 text-sm text-slate-600">
                  {n.content_text || '—'}
                </div>
                <div className="pt-1 text-xs text-slate-500">
                  {n.updated_at
                    ? `Updated ${new Date(n.updated_at).toLocaleDateString()}`
                    : n.created_at
                      ? `Created ${new Date(n.created_at).toLocaleDateString()}`
                      : ''}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t bg-slate-50 px-3 py-2 opacity-0 transition group-hover:opacity-100">
                <button
                  className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(n);
                  }}
                >
                  Edit
                </button>
                <button
                  className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(n);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <NoteDetails note={selected} onClose={() => setSelected(null)} />
    </>
  );
}
