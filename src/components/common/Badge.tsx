import type { ReactNode } from 'react';

type BadgeProps = {
  tone?: 'gray' | 'green' | 'blue' | 'red' | 'amber';
  children: ReactNode;
  className?: string;
};

export function Badge({ tone = 'gray', children, className }: BadgeProps) {
  const tones: Record<string, string> = {
    gray: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    red: 'bg-rose-100 text-rose-700',
    amber: 'bg-amber-100 text-amber-700',
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
