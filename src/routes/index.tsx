import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ActivityForm } from "../components/ActivityForm";
import { TimelineView } from "../components/TimelineView";
import { useThemeStore } from "../store/theme";
import Header from "../components/Header";
import { DashboardStats } from "../components/DashboardsStats";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/")({
  component: Index,
});

export interface Activity {
  id: string;
  user_id?: string;
  type: "feeding" | "sleep" | "diaper" | "medicine" | "other";
  timestamp: Date;
  duration?: number;
  details: Record<string, any>;
  notes?: string;
}

function Index() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { theme } = useThemeStore();
  const { user } = useAuthStore();

  // Função para carregar as atividades
  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .limit(10);
        if (error) {
          console.error("Erro ao carregar atividades:", error);
        } else {
          const parsedActivities = data.map(activity => ({
              ...activity,
              timestamp: new Date(activity.timestamp)
          }));
          setActivities(parsedActivities as Activity[]);
        }
      } else {
        setActivities([]);
      }
    };
    fetchActivities();
  }, [user]);

  // Função para adicionar uma nova atividade
  const addActivity = async (activity: Omit<Activity, "id">) => {
    // MODO AUTENTICADO: Salva no banco de dados e atualiza a UI
    if (user) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .insert({
            ...activity,
            user_id: user.id
          })
          .select();

        if (error) {
          console.error("Erro ao inserir atividade no Supabase:", error.message);
          throw error;
        }
        
        const newActivity = data[0];
        setActivities((prev) =>
          [newActivity, ...prev].sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        );
      } catch (error) {
        console.error("Erro ao salvar a atividade:", error);
      }
    } else {
      // MODO NÃO AUTENTICADO: Salva apenas no estado local
      const newActivity: Activity = {
        ...activity,
        id: Date.now().toString(),
      };
      setActivities((prev) =>
        [newActivity, ...prev].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    }
    // Fecha o formulário em ambos os casos
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-base-100" data-theme={theme}>
      <Header onNewActivity={() => setShowForm(true)}/>
      <main className="container mx-auto px-4 py-6 space-y-6">
        <DashboardStats activities={activities} />
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Timeline
          </h2>
          <TimelineView activities={activities} />
        </div>
      </main>

      {showForm && (
        <ActivityForm
          onSubmit={addActivity}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
