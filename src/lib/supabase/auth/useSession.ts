import { useEffect, useState } from 'react';
import { supabase } from '../client';

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<
    | Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']
    | null
  >(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return { loading, user: session?.user ?? null };
}
