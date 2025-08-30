import './global.css';
import { useState } from 'react';
import { Layout } from './components/Layout';
import OverviewPage from './pages/OverviewPage';
import ProductsPage from './pages/ProductsPage';
import ExpensesPage from './pages/ExpensesPage';

export default function App() {
  const [page, setPage] = useState('overview');

  return (
    <Layout page={page} setPage={setPage}>
      {page === 'overview' && <OverviewPage />}
      {page === 'products' && <ProductsPage />}
      {page === 'orders' && (
        <div className="text-slate-500">Orders (coming soon)</div>
      )}
      {page === 'expenses' && <ExpensesPage />}
      {page === 'analytics' && (
        <div className="text-slate-500">Analytics (coming soon)</div>
      )}
    </Layout>
  );
}
