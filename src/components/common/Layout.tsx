import type { ReactNode } from 'react';
import { Tabs } from './Tabs';

type LayoutProps = {
  page: string;
  setPage: (page: string) => void;
  children: ReactNode;
};

const TABS = [
  {
    key: 'overview',
    label: 'Overview',
    icon: <span className="text-slate-500">📊</span>,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    icon: <span className="text-slate-500">📦</span>,
  },
  {
    key: 'orders',
    label: 'Orders',
    icon: <span className="text-slate-500">🧾</span>,
  },
  {
    key: 'expenses',
    label: 'Expenses',
    icon: <span className="text-slate-500">💵</span>,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: <span className="text-slate-500">📈</span>,
  },
];

export function Layout({ page, setPage, children }: LayoutProps) {
  // top bar
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-6">
          <img src="assets/logo-icon.png" alt="Logo" className="h-12 w-12" />
          <div className="text-2xl font-bold">
            LittleFoxShop{' '}
            <span className="font-medium text-slate-500">ERP</span>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <Tabs tabs={TABS} value={page} onChange={setPage} />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
