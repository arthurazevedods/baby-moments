// src/components/SignOutButton.tsx
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function SignOutButton() {
  const { setUser } = useAuthStore();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro ao deslogar:', error.message);
    } else {
      setUser(null);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-sm btn-ghost">
      Sair
    </button>
  );
}