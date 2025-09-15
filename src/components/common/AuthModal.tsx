import { useState } from 'react';
import { supabase } from '../../lib/supabase/client';

type Props = {
  onClose: () => void;
  user: { email?: string } | null;
  onSignOut: () => Promise<void>;
};

export function AuthModal({ onClose, user, onSignOut }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      onClose();
    } catch (e: any) {
      setErr(e.message ?? 'Invalid credentials');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {user ? 'Account' : 'Log in'}
          </h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
            ✕
          </button>
        </div>

        {user ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              Signed in{user.email ? ` as ${user.email}` : ''}.
            </p>
            <button
              onClick={onSignOut}
              className="w-full rounded bg-gray-900 px-3 py-2 text-white"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                className="w-full rounded border p-2"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full rounded border p-2"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {err && <p className="text-sm text-red-600">{err}</p>}
              {msg && <p className="text-sm text-green-700">{msg}</p>}
              <button
                disabled={busy}
                className="w-full rounded bg-gray-900 px-3 py-2 text-white"
              >
                {busy ? 'Please wait…' : 'Log in'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
