import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';

type KpiProps = {
  title: string;
  value: string | number;
  note?: string;
  icon: string;
};

function Kpi({ title, value, note, icon }: KpiProps) {
  return (
    <Card className="p-0">
      <div className="p-5 flex items-start justify-between">
        <div>
          <div className="text-slate-600 text-sm">{title}</div>
          <div className="mt-1 text-3xl font-bold">{value}</div>
          {note && (
            <div className="mt-3">
              <Badge tone="green">{note}</Badge>
            </div>
          )}
        </div>
        <div className="text-3xl text-slate-400">{icon}</div>
      </div>
    </Card>
  );
}

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Kpi title="Total Products" value="247" note="12 low stock" icon="📦" />
        <Kpi title="Monthly Orders" value="156" note="8 pending" icon="🛒" />
        <Kpi
          title="Monthly Revenue"
          value="¥89,420"
          note="+12.5% vs last month"
          icon="💲"
        />
        <Kpi
          title="Monthly Profit"
          value="¥23,180"
          note="25.9% margin"
          icon="📈"
        />
      </div>

      {/* Recent Orders */}
      <Card title="Recent Orders">
        <div className="space-y-3"></div>
      </Card>
    </div>
  );
}
