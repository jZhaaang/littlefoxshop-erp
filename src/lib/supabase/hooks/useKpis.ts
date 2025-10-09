import { useEffect, useState } from 'react';
import { supabase } from '../client';

type MonthlyKPI = {
  month: string;
  order_count: number;
  products_sold: number;
  revenue_usd: number;
  cogs_usd: number;
  gross_profit_usd: number;
  delivery_fee_usd: number;
  other_fees_usd: number;
  net_profit_before_opex_usd: number;
  operating_expenses_usd: number;
  net_profit_after_opex_usd: number;
  purchase_spend_usd: number;
};

type LifetimeKPI = {
  revenue_usd: number;
  cogs_usd: number;
  gross_profit_usd: number;
  delivery_fee_usd: number;
  other_fees_usd: number;
  operating_expenses_usd: number;
  net_profit_after_opex_usd: number;
  purchase_spend_usd: number;
};

export function useMonthlyKPIs(limitMonths = 18) {
  const [data, setData] = useState<MonthlyKPI[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('v_monthly_kpis')
        .select('*')
        .order('month', { ascending: true });
      if (!mounted) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const rows = (data ?? []) as MonthlyKPI[];
      setData(rows.slice(-(limitMonths || rows.length)));
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [limitMonths]);

  return { data, loading, error };
}

export function useLifetimeKPIs() {
  const [data, setData] = useState<LifetimeKPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('v_lifetime_kpis')
        .select('*')
        .single();
      if (!mounted) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setData(data as LifetimeKPI);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
