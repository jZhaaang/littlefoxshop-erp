import { useCallback, useRef, useState } from 'react';

export type ImagePickerProps = {
  initialUrl?: string | null;
  disabled?: boolean;
  maxSizeMB?: number;
  onChangeFile: (file: File | null) => void;
  className?: string;
};

export function ImagePicker({
  initialUrl,
  disabled,
  maxSizeMB = 5,
  onChangeFile,
  className,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [err, setErr] = useState<string | null>(null);

  const maxBytes = maxSizeMB * 1024 * 1024;

  const assignFile = useCallback(
    (file: File | null) => {
      setErr(null);
      if (!file) {
        setPreview(null);
        onChangeFile(null);
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErr('Please select an image file.');
        return;
      }
      if (file.size > maxBytes) {
        setErr(`Image too large. Max ${maxSizeMB}MB.`);
        return;
      }
      setPreview(URL.createObjectURL(file));
      onChangeFile(file);
    },
    [maxBytes, maxSizeMB, onChangeFile]
  );

  return (
    <div className={className}>
      <div
        className={`mt-1 overflow-hidden rounded-lg border aspect-square ${disabled ? 'bg-gray-100' : 'bg-white'}`}
      >
        {preview ? (
          <img
            src={preview ?? undefined}
            alt="Preview"
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center px-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="mt-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:bg-gray-100"
            >
              Choose file
            </button>
            <p className="mt-2 text-xs text-gray-500">
              PNG/JPG up to {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => assignFile(e.target.files?.[0] ?? null)}
      />

      <div className="mt-2 flex gap-2">
        {preview && (
          <button
            type="button"
            onClick={() => assignFile(null)}
            disabled={disabled}
            className="rounded-lg bg-red-300 border px-3 py-1.5 text-sm hover:bg-gray-50 disabled:bg-gray-100"
          >
            Remove
          </button>
        )}
      </div>

      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}
