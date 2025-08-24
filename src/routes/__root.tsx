import { createRootRoute } from '@tanstack/react-router';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { MainLayout } from '../components/MainLayout';

export const Route = createRootRoute({
  // O 'beforeLoad' agora só verifica a sessão, sem redirecionar.
  beforeLoad: async () => {
    // Pega o estado atual do usuário e carregamento.
    const { isLoading, setIsLoading, setUser } = useAuthStore.getState();

    // Se o estado ainda não foi carregado, verifica a sessão do usuário no Supabase.
    if (isLoading) {
      const { data, error } = await supabase.auth.getUser();
      if(error) {
        console.error("Erro ao obter o usuário:", error.message);
      }
      if (data.user) {
        setUser(data.user);
      }
      setIsLoading(false);
    }
    // A lógica de redirecionamento para o login foi removida daqui.
    // Isso permite que usuários não logados vejam a página principal.
  },
  // O componente MainLayout ainda envolve todas as outras rotas.
  component: () => <MainLayout />,
});