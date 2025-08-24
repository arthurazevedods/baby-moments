import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export function MainLayout() {
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    // This is a Supabase listener to track authentication state changes.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Cleanup function for the listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setIsLoading]); // Rerun effect if these functions change

  return (
    <main>
      <Outlet />
    </main>
  );
}