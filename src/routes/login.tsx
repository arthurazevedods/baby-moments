import { createFileRoute, useNavigate } from '@tanstack/react-router'; // Alterado
import { FaGoogle } from "react-icons/fa";
import { useThemeStore } from "../store/theme";
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate(); // NOVO: Obtenha a função de navegação
  const { theme } = useThemeStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAuthStore();

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    
    if (error) {
      setError(error.message);
      return;
    }
    
    if (data.user) {
      setUser(data.user);
      // NOVO: Navegue explicitamente para a página inicial após o login.
      navigate({ to: '/' });
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    
    // NOVO: A chamada de login do Google já lida com o redirecionamento.
    // Apenas precisamos lidar com o caso de erro.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 bg-base-100"
      data-theme={theme}
    >
      <form 
        className="form p-5 bg-secondary flex flex-col items-start justify-center gap-5 rounded-md border-2 border-black shadow-[4px_4px_black]"
        onSubmit={handleEmailPasswordLogin}
      >
        <div className="title text-black font-extrabold text-xl mb-6 dark:text-white">
          Bem-vindo,<br />
          <span className="text-gray-600 font-semibold text-lg dark:text-300">
            Faça login para continuar
          </span>
        </div>
        
        {error && <p className="text-red-500 font-semibold text-sm mb-2">{error}</p>}
        
        <input 
          className="input w-[350px] h-10 rounded-md border-2 border-black bg-white shadow-[4px_4px_black] text-sm font-semibold text-black p-[5px_10px] outline-none placeholder:text-gray-600 placeholder:opacity-80 focus:border-blue-500 dark:bg-gray-700 dark:border-white dark:text-white dark:shadow-[4px_4px_white] dark:placeholder:text-gray-400" 
          name="email" 
          placeholder="Email" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className="input w-[350px] h-10 rounded-md border-2 border-black bg-white shadow-[4px_4px_black] text-sm font-semibold text-black p-[5px_10px] outline-none placeholder:text-gray-600 placeholder:opacity-80 focus:border-blue-500 dark:bg-gray-700 dark:border-white dark:text-white dark:shadow-[4px_4px_white] dark:placeholder:text-gray-400" 
          name="password" 
          placeholder="Senha" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="login-with flex gap-5">
          <div 
            className="button-log cursor-pointer w-10 h-10 rounded-full border-2 border-black bg-white shadow-[4px_4px_black] text-xl text-black flex justify-center items-center active:translate-[3px_3px] active:shadow-none dark:bg-gray-700 dark:border-white dark:text-white dark:shadow-[4px_4px_white] dark:active:shadow-none"
            onClick={handleGoogleLogin}
          >
            <FaGoogle />
          </div>
        </div>
        
        <button
          type="submit"
          className="button-confirm mt-[50px] mx-auto w-32 h-10 rounded-md border-2 border-black bg-white shadow-[4px_4px_black] text-lg font-semibold text-black cursor-pointer active:translate-[3px_3px] active:shadow-none dark:bg-gray-700 dark:border-white dark:text-white dark:shadow-[4px_4px_white] dark:active:shadow-none"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Vamos →'}
        </button>
      </form>
    </div>
  );
}