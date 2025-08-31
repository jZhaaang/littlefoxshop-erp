import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, actions, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border rounded-2xl ${className}`}>
      {(title || actions) && (
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <div className="font-semibold text-slate-800">{title}</div>
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
