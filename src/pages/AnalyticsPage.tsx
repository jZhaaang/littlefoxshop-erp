import { Card, PageHeader, Spinner } from '../components/common';
import { KpiCard } from '../components/Analytics/KpiCard';
import { fmtCurrency } from '../lib/utils/currency';
import { fmtMonth } from '../lib/utils/datetime';
import { useLifetimeKPIs, useMonthlyKPIs } from '../lib/supabase/hooks/useKpis';

export default function AnalyticsPage() {
  const {
    data: monthly,
    loading: mLoading,
    error: mError,
  } = useMonthlyKPIs(18);
  const {
    data: lifetime,
    loading: lLoading,
    error: lError,
  } = useLifetimeKPIs();

  const latest = monthly?.[monthly.length - 1];

  function downloadCSV() {
    if (!monthly) return;
    const headers = [
      'month',
      'order_count',
      'products_sold',
      'revenue_usd',
      'cogs_usd',
      'gross_profit_usd',
      'operating_expenses_usd',
      'net_profit_after_opex_usd',
      'purchase_spend_usd',
      'delivery_fee_usd',
      'other_fees_usd',
    ];
    const lines = monthly.map((r) =>
      [
        r.month,
        r.order_count,
        r.products_sold,
        r.revenue_usd,
        r.cogs_usd,
        r.gross_profit_usd,
        r.operating_expenses_usd,
        r.net_profit_after_opex_usd,
        r.purchase_spend_usd,
        r.delivery_fee_usd,
        r.other_fees_usd,
      ].join(',')
    );
    const blob = new Blob([`${headers.join(',')}\n${lines.join('\n')}`], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monthly_kpis.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Key KPIs and monthly summaries"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lLoading ? (
          <Card>
            <div className="flex items-center gap-2">
              <Spinner /> Loading...
            </div>
          </Card>
        ) : lError ? (
          <Card>
            <div className="text-rose-600">{lError}</div>
          </Card>
        ) : lifetime ? (
          <>
            <KpiCard
              title="Lifetime Revenue"
              value={fmtCurrency(lifetime.revenue_usd)}
              hint={`${fmtCurrency(latest?.revenue_usd)} latest month`}
            />
            <KpiCard
              title="Lifetime Cost of Goods Sold (COGS)"
              value={fmtCurrency(lifetime.cogs_usd)}
              hint={`${fmtCurrency(latest?.cogs_usd)} latest month`}
            />
            <KpiCard
              title="Lifetime Gross Profit"
              value={fmtCurrency(lifetime.gross_profit_usd)}
              hint={`${fmtCurrency(latest?.gross_profit_usd)} latest month`}
            />
            <KpiCard
              title="Lifetime Net Profit"
              value={fmtCurrency(lifetime.net_profit_after_opex_usd)}
              hint={`${fmtCurrency(latest?.net_profit_after_opex_usd)} latest month`}
            />
          </>
        ) : null}
      </div>

      <Card
        title="Monthly Metrics"
        actions={
          <button
            className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
            onClick={downloadCSV}
          >
            Export CSV
          </button>
        }
      >
        {mLoading ? (
          <div className="flex items-center gap-2">
            <Spinner /> Loading…
          </div>
        ) : mError ? (
          <div className="text-rose-600">{mError}</div>
        ) : monthly && monthly.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="px-2 py-2">Month</th>
                  <th className="px-2 py-2">Orders</th>
                  <th className="px-2 py-2">Sold</th>
                  <th className="px-2 py-2">Revenue</th>
                  <th className="px-2 py-2">COGS</th>
                  <th className="px-2 py-2">Gross Profit</th>
                  <th className="px-2 py-2">Expenses</th>
                  <th className="px-2 py-2">Net Profit</th>
                  <th className="px-2 py-2">Purchase Spend</th>
                  <th className="px-2 py-2">Delivery Fees</th>
                  <th className="px-2 py-2">Other Fees</th>
                </tr>
              </thead>
              <tbody>
                {[...monthly].reverse().map((r) => (
                  <tr key={r.month} className="border-t border-slate-100">
                    <td className="px-2 py-2 whitespace-nowrap">
                      {fmtMonth(r.month)}
                    </td>
                    <td className="px-2 py-2">{r.order_count}</td>
                    <td className="px-2 py-2">{r.products_sold}</td>
                    <td className="px-2 py-2">{fmtCurrency(r.revenue_usd)}</td>
                    <td className="px-2 py-2">{fmtCurrency(r.cogs_usd)}</td>
                    <td className="px-2 py-2">
                      {fmtCurrency(r.gross_profit_usd)}
                    </td>
                    <td className="px-2 py-2">
                      {fmtCurrency(r.operating_expenses_usd)}
                    </td>
                    <td
                      className={`px-2 py-2 ${r.net_profit_after_opex_usd >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}
                    >
                      {fmtCurrency(r.net_profit_after_opex_usd)}
                    </td>
                    <td className="px-2 py-2">
                      {fmtCurrency(r.purchase_spend_usd)}
                    </td>
                    <td className="px-2 py-2">
                      {fmtCurrency(r.delivery_fee_usd)}
                    </td>
                    <td className="px-2 py-2">
                      {fmtCurrency(r.other_fees_usd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-slate-500">No rows yet.</div>
        )}
      </Card>
    </div>
  );
}
