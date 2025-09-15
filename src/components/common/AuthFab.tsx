import { useState } from 'react';
import { useSession } from '../../lib/supabase/auth/useSession';
import { supabase } from '../../lib/supabase/client';
import { AuthModal } from './AuthModal';

export function AuthFab() {
  const { user } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 rounded-full bg-black px-4 py-2 text-white shadow-lg hover:opacity-90"
      >
        {user ? 'Account' : 'Login / Sign up'}
      </button>
      {open && (
        <AuthModal
          onClose={() => setOpen(false)}
          user={user}
          onSignOut={async () => {
            await supabase.auth.signOut();
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
