// components/common/ImagePicker.tsx
import { useRef } from 'react';
import type { ImagesDraft, LocalImage } from '../../lib/supabase/models';

type Props = {
  value: ImagesDraft;
  onChange: (next: ImagesDraft) => void;
};

export function ImagePicker({ value, onChange }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const newlyAdded: LocalImage[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    onChange({ ...value, added: [...value.added, ...newlyAdded] });
  }

  function removeExisting(id: string) {
    onChange({
      ...value,
      removedIds: value.removedIds.includes(id)
        ? value.removedIds
        : [...value.removedIds, id],
    });
  }

  function undoRemoveExisting(id: string) {
    onChange({
      ...value,
      removedIds: value.removedIds.filter((x) => x !== id),
    });
  }

  function removeAdded(id: string) {
    onChange({
      ...value,
      added: value.added.filter((x) => x.id !== id),
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Images</h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1 rounded border"
            onClick={() => fileInput.current?.click()}
          >
            + Add Images
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Existing images */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {value.existing.map((img) => {
          const markedForRemoval = value.removedIds.includes(img.id);
          return (
            <div
              key={img.id}
              className={`relative rounded-lg overflow-hidden border ${markedForRemoval ? 'opacity-50' : ''}`}
            >
              <img
                src={img.url ?? ''}
                alt=""
                className="h-32 w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 text-white text-xs">
                {!markedForRemoval ? (
                  <button
                    type="button"
                    className="px-2 py-1"
                    onClick={() => removeExisting(img.id)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-2 py-1"
                    onClick={() => undoRemoveExisting(img.id)}
                  >
                    Undo
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Newly added (not uploaded yet) */}
      {value.added.length > 0 && (
        <>
          <div className="text-sm font-medium">New (to upload)</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {value.added.map((img) => (
              <div
                key={img.id}
                className="relative rounded-lg overflow-hidden border"
              >
                <img
                  src={img.previewUrl}
                  alt=""
                  className="h-32 w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded bg-white/80 px-2 py-0.5 text-xs"
                  onClick={() => removeAdded(img.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
