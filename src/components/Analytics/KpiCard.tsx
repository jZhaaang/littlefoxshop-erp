import { Badge, Card } from '../common';

type KpiProps = {
  title: string;
  value: string;
  hint?: string;
  tone?: 'gray' | 'green' | 'blue' | 'red' | 'amber';
  icon?: React.ReactNode;
};

export function KpiCard({
  title,
  value,
  hint,
  tone = 'gray' as const,
  icon,
}: KpiProps) {
  return (
    <Card>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">{title}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {value}
            </div>
          </div>
          {icon && (
            <div className="text-slate-400 self-center -mt-1 px-2">{icon}</div>
          )}
        </div>
        {hint && (
          <div className="mt-auto pt-4">
            <Badge tone={tone}>{hint}</Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
