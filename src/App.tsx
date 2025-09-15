import './global.css';
import { useState } from 'react';
import { Layout } from './components/common';
import ExpensesPage from './pages/ExpensesPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  const [page, setPage] = useState('inventory');

  return (
    <Layout page={page} setPage={setPage}>
      {page === 'overview' && (
        <div className="text-slate-500">Overview (coming soon)</div>
      )}
      {page === 'inventory' && <InventoryPage />}
      {page === 'orders' && <OrdersPage />}
      {page === 'expenses' && <ExpensesPage />}
      {page === 'analytics' && (
        <div className="text-slate-500">Analytics (coming soon)</div>
      )}
    </Layout>
  );
}
