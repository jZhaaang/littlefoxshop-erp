import { useState } from 'react';

export type Mode = 'create' | 'edit';

export type FieldType = 'text' | 'number' | 'select' | 'textarea';

export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  options?: readonly string[];
  placeholder?: string;
  disabled?: (mode: Mode) => boolean;
  validate?: (val: T[keyof T], values: T, mode: Mode) => string | null;
  parse?: (raw: string) => any;
  colSpan?: 1 | 2;
};

export type EntityFormProps<T> = {
  mode: Mode;
  initial: T;
  fields: FieldConfig<T>[];
  onCancel: () => void;
  onSubmit: (values: T) => Promise<void> | void;
  submitText?: string;
};

export function EntityForm<T extends Record<string, any>>({
  mode,
  initial,
  fields,
  onCancel,
  onSubmit,
  submitText,
}: EntityFormProps<T>) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const submitLabel = submitText ?? (mode === 'edit' ? 'Save Changes' : 'Add');

  function setField<K extends keyof T>(name: K, value: T[K]) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function runValidation(): boolean {
    const next: Record<string, string | null> = {};
    fields.forEach((field) => {
      const msg = field.validate?.(values[field.name], values, mode) ?? null;
      if (msg) next[String(field.name)] = msg;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!runValidation()) return;
    await onSubmit(values);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const key = String(field.name);
          const val = values[field.name];
          const disabled = field.disabled?.(mode) ?? false;

          const common = {
            className:
              'mt-1 w-full rounded-lg border px-3 py-2 disabled:bg-gray-100',
            disabled,
            placeholder: field.placeholder,
            'aria-invalid': errors[key] ? 'true' : undefined,
          } as const;

          return (
            <div
              key={key}
              className={field.colSpan === 2 ? 'sm:col-span-2' : ''}
            >
              <label className="block text-sm font-medium">{field.label}</label>

              {field.type === 'text' && (
                <input
                  {...common}
                  value={String(val ?? '')}
                  onChange={(e) =>
                    setField(
                      field.name,
                      (field.parse?.(e.target.value) ?? e.target.value) as any
                    )
                  }
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  step="0.01"
                  {...common}
                  value={Number(val ?? 0)}
                  onChange={(e) =>
                    setField(
                      field.name,
                      (field.parse?.(e.target.value) ??
                        Number(e.target.value)) as any
                    )
                  }
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  {...common}
                  value={String(val ?? '')}
                  onChange={(e) =>
                    setField(
                      field.name,
                      (field.parse?.(e.target.value) ?? e.target.value) as any
                    )
                  }
                  rows={4}
                />
              )}

              {field.type === 'select' && (
                <select
                  {...common}
                  value={String(val ?? '')}
                  onChange={(e) =>
                    setField(
                      field.name,
                      (field.parse?.(e.target.value) ?? e.target.value) as any
                    )
                  }
                >
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {errors[key] && (
                <p className="mt-1 text-xs text-red-600">{errors[key]}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:opacity-90"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
