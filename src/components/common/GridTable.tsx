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
  onRowClick?: (row: T) => void;
};

const spanClass: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
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
  onRowClick,
}: Props<T>) {
  return (
    <div className="divide-y">
      {/* Header */}
      <div className="py-2 px-2 grid grid-cols-12 items-center gap-2 font-semibold text-sm text-slate-600 border-b bg-slate-100 rounded-lg">
        {leadingSpan > 0 && <div className={`${spanClass[leadingSpan]}`} />}
        {columns.map((c, i) => (
          <div
            key={i}
            className={`${spanClass[c.span]} ${c.align ?? 'text-left'}`}
          >
            {c.header}
          </div>
        ))}
        {actionsSpan > 0 && <div className={`${spanClass[actionsSpan]}`} />}
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
        rows.map((row) => {
          const clickable = !!onRowClick;
          return (
            <div
              key={keyFor(row)}
              className={`py-4 px-2 grid grid-cols-12 items-center gap-2 text-sm ${clickable ? 'cursor-pointer hover:bg-slate-50' : ''}`}
              onClick={clickable ? () => onRowClick(row) : undefined}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
            >
              {leadingSpan > 0 && (
                <div className={`col-span-${leadingSpan}`}>
                  {leading?.(row)}
                </div>
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
                <div className={`col-span-${actionsSpan}`}>
                  {actions?.(row)}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
