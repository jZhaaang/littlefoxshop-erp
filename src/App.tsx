import './global.css';
import { useState } from 'react';
import { Layout } from './components/common';
import OverviewPage from './pages/OverviewPage';
import ExpensesPage from './pages/ExpensesPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  const [page, setPage] = useState('overview');

  return (
    <Layout page={page} setPage={setPage}>
      {page === 'overview' && <OverviewPage />}
      {page === 'inventory' && <InventoryPage />}
      {page === 'orders' && <OrdersPage />}
      {page === 'expenses' && <ExpensesPage />}
      {page === 'analytics' && (
        <div className="text-slate-500">Analytics (coming soon)</div>
      )}
    </Layout>
  );
}
