import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ActivityForm } from "../components/ActivityForm";
import { TimelineView } from "../components/TimelineView";
import { useThemeStore } from "../store/theme";
import Header from "../components/Header";
import { DashboardStats } from "../components/DashboardsStats";
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


  const { theme } = useThemeStore();

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
    <div className="min-h-screen bg-secondary" data-theme={theme}>
      <Header onNewActivity={() => setShowForm(true)}/>
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        {/* <DashboardStats activities={activities} /> */}
        <DashboardStats activities={activities} />
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
    </div>
  );
}
