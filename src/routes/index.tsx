import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityForm } from "../components/ActivityForm";
import { TimelineView } from "../components/TimelineView";
import Switch from "../components/Switch";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const Route = createFileRoute("/")({
  component: Index,
});

export interface Activity {
  id: string;
  type: "feeding" | "sleep" | "diaper" | "medicine" | "other";
  timestamp: Date;
  duration?: number;
  details: Record<string, any>;
  notes?: string;
}

function Index() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showForm, setShowForm] = useState(false);

  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR });

  const addActivity = (activity: Omit<Activity, "id">) => {
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
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-secondary" data-theme="cupcake">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-primary-content bg-clip-text text-transparent">
                Momentos do Bebê
              </h1>
              <p className="text-sm text-muted-foreground capitalize">
                {today}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="btn bg-primary shadow-lg"
              >
                <div className="w-4 h-4 mr-2" />
                Nova Atividade
              </button>
              <Switch />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        {/* <DashboardStats activities={activities} /> */}
        {/* Quick Actions */}
        {/* <QuickActions onQuickAdd={addActivity} /> */}

        {/* Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Timeline do Dia
          </h2>
          <TimelineView activities={activities} />
        </div>
      </main>

      {/* Activity Form Modal */}
      {showForm && (
        <ActivityForm
          onSubmit={addActivity}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="bg-secondary" data-theme="cupcake">
        <h3 className="bold bg-transparent text-3xl">Cupcake</h3>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary">primary</div>
          <div className="h-50 w-50 bg-secondary">secondary</div>
          <div className="h-50 w-50 bg-neutral">neutral</div>
          <div className="h-50 w-50 bg-info">info</div>
          <div className="h-50 w-50 bg-sucess">sucess</div>
          <div className="h-50 w-50 bg-warning">warning</div>
          <div className="h-50 w-50 bg-accent">accent</div>
          <div className="h-50 w-50 bg-base-100">base100</div>
          <div className="h-50 w-50 bg-base-300">base300</div>
        </div>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary-content">primary</div>
          <div className="h-50 w-50 bg-secondary-content">secondary</div>

          <div className="h-50 w-50 bg-neutral-content">neutral</div>
          <div className="h-50 w-50 bg-info-content">info</div>
          <div className="h-50 w-50 bg-sucess-content">sucess</div>
          <div className="h-50 w-50 bg-warning-content">warning</div>
          <div className="h-50 w-50 bg-accent-content">accent</div>
          <div className="h-50 w-50 bg-base-100-content">base100</div>
          <div className="h-50 w-50 bg-base-300-content">base300</div>
        </div>
      </div>

      <div className="bg-secondary" data-theme="bumblebee">
        <h3 className="bold bg-transparent text-3xl">Bumblebee</h3>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary">primary</div>
          <div className="h-50 w-50 bg-secondary">secondary</div>
          <div className="h-50 w-50 bg-neutral">neutral</div>
          <div className="h-50 w-50 bg-info">info</div>
          <div className="h-50 w-50 bg-sucess">sucess</div>
          <div className="h-50 w-50 bg-warning">warning</div>
          <div className="h-50 w-50 bg-accent">accent</div>
          <div className="h-50 w-50 bg-base-100">base100</div>
          <div className="h-50 w-50 bg-base-300">base300</div>
        </div>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary-content">primary</div>
          <div className="h-50 w-50 bg-secondary-content">secondary</div>

          <div className="h-50 w-50 bg-neutral-content">neutral</div>
          <div className="h-50 w-50 bg-info-content">info</div>
          <div className="h-50 w-50 bg-sucess-content">sucess</div>
          <div className="h-50 w-50 bg-warning-content">warning</div>
          <div className="h-50 w-50 bg-accent-content">accent</div>
          <div className="h-50 w-50 bg-base-100-content">base100</div>
          <div className="h-50 w-50 bg-base-300-content">base300</div>
        </div>
      </div>
      <div className="bg-secondary" data-theme="winter">
        <h3 className="bold bg-transparent text-3xl text-primary-content">
          winter
        </h3>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary">primary</div>
          <div className="h-50 w-50 bg-secondary">secondary</div>
          <div className="h-50 w-50 bg-neutral">neutral</div>
          <div className="h-50 w-50 bg-info">info</div>
          <div className="h-50 w-50 bg-sucess">sucess</div>
          <div className="h-50 w-50 bg-warning">warning</div>
          <div className="h-50 w-50 bg-accent">accent</div>
          <div className="h-50 w-50 bg-base-100">base100</div>
          <div className="h-50 w-50 bg-base-300">base300</div>
        </div>
        <div className="container flex justify-around">
          <div className="h-50 w-50 bg-primary-content">primary</div>
          <div className="h-50 w-50 bg-secondary-content">secondary</div>

          <div className="h-50 w-50 bg-neutral-content">neutral</div>
          <div className="h-50 w-50 bg-info-content">info</div>
          <div className="h-50 w-50 bg-sucess-content">sucess</div>
          <div className="h-50 w-50 bg-warning-content">warning</div>
          <div className="h-50 w-50 bg-accent-content">accent</div>
          <div className="h-50 w-50 bg-base-100-content">base100</div>
          <div className="h-50 w-50 bg-base-300-content">base300</div>
        </div>
      </div>
    </div>
  );
}
