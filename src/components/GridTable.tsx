import type { ReactNode } from 'react';
import { Spinner } from './Spinner';

export type GridCol<T> = {
  header: ReactNode;
  span: number;
  cell: (row: T) => ReactNode;
  align?: string;
};

type Props<T> = {
  columns: GridCol<T>[];
  rows: T[];
  keyFor: (row: T) => string;
  leading?: (row: T) => ReactNode;
  leadingSpan?: number;
  actions?: (row: T) => ReactNode;
  actionsSpan?: number;
  loading?: boolean;
  emptyNode?: ReactNode;
};

export function GridTable<T>({
  columns,
  rows,
  keyFor,
  leading,
  leadingSpan = 0,
  actions,
  actionsSpan = 0,
  loading,
  emptyNode = (
    <div className="py-8 text-center text-sm text-slate-500">No data</div>
  ),
}: Props<T>) {
  return (
    <div className="divide-y">
      {/* Header */}
      <div className="py-2 px-2 grid grid-cols-12 items-center gap-2 font-semibold text-sm text-slate-600 border-b bg-slate-100 rounded-lg">
        {leadingSpan > 0 && <div className={`col-span-${leadingSpan}`} />}
        {columns.map((c, i) => (
          <div
            key={i}
            className={`col-span-${c.span} ${c.align ?? 'text-left'}`}
          >
            {c.header}
          </div>
        ))}
        {actionsSpan > 0 && <div className={`col-span-${actionsSpan}`} />}
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Spinner className="h-8 w-8" />
          <span className="ml-3 text-sm text-gray-600">Loading...</span>
        </div>
      ) : rows.length === 0 ? (
        emptyNode
      ) : (
        rows.map((row) => (
          <div
            key={keyFor(row)}
            className="py-4 px-2 grid grid-cols-12 items-center gap-2 text-sm"
          >
            {leadingSpan > 0 && (
              <div className={`col-span-${leadingSpan}`}>{leading?.(row)}</div>
            )}
            {columns.map((c, i) => (
              <div
                key={i}
                className={`col-span-${c.span} ${c.align ?? 'text-left'}`}
              >
                {c.cell(row)}
              </div>
            ))}
            {actionsSpan > 0 && (
              <div className={`col-span-${actionsSpan}`}>{actions?.(row)}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
