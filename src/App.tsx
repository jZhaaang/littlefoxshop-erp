import './global.css';
import { useEffect, useRef, useState } from 'react';
import { Layout } from './components/common';
import ExpensesPage from './pages/ExpensesPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import { AuthFab } from './components/common/AuthFab';
import { supabase } from './lib/supabase/client';
import NotesPage from './pages/NotesPage';
import AnalyticsPage from './pages/AnalyticsPage';

function useReloadOnAuthBoundaryChange() {
  const hadSessionRef = useRef<boolean | null>(null);

  useEffect(() => {
    let unsub: { unsubscribe: () => void } | null = null;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      hadSessionRef.current = !!session;

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, sess) => {
        if (event !== 'SIGNED_IN' && event !== 'SIGNED_OUT') return;

        const prev = hadSessionRef.current;
        const now = !!sess;
        if (prev !== now) {
          hadSessionRef.current = now;
          setTimeout(() => window.location.reload(), 10);
        }
      });

      unsub = subscription;
    })();

    return () => unsub?.unsubscribe();
  }, []);
}

export default function App() {
  const [page, setPage] = useState('inventory');

  useReloadOnAuthBoundaryChange();

  return (
    <>
      <AuthFab />
      <Layout page={page} setPage={setPage}>
        {page === 'overview' && (
          <div className="text-slate-500">Overview (coming soon)</div>
        )}
        {page === 'inventory' && <InventoryPage />}
        {page === 'orders' && <OrdersPage />}
        {page === 'expenses' && <ExpensesPage />}
        {page === 'analytics' && <AnalyticsPage />}
        {page === 'notes' && <NotesPage />}
      </Layout>
    </>
  );
}
