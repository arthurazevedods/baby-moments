import { isToday, differenceInMinutes, isWithinInterval, subDays } from "date-fns";
import type { Activity } from "../routes/index";
import { Baby, Clock, Droplets } from "lucide-react";

interface DashboardStatsProps {
  activities: Activity[];
}

export const DashboardStats = ({ activities }: DashboardStatsProps) => {
  // Filtra as atividades do dia atual
  const todayActivities = activities.filter((activity) =>
    isToday(new Date(activity.timestamp))
  );

  // Filtra as atividades dos últimos 7 dias
  const sevenDaysAgo = subDays(new Date(), 7);
  const weeklyActivities = activities.filter((activity) =>
    isWithinInterval(new Date(activity.timestamp), { start: sevenDaysAgo, end: new Date() })
  );

  // Cálculos para o dia
  const feedingCountToday = todayActivities.filter(
    (a) => a.type === "feeding"
  ).length;
  const diaperCountToday = todayActivities.filter(
    (a) => a.type === "diaper"
  ).length;
  const totalSleepTimeToday = todayActivities
    .filter((a) => a.type === "sleep")
    .reduce((total, activity) => total + (activity.duration || 0), 0);
  
  const lastFeeding = activities.find((a) => a.type === "feeding");
  const timeSinceLastFeeding = lastFeeding
    ? differenceInMinutes(new Date(), new Date(lastFeeding.timestamp))
    : null;

  // Cálculos para a semana
  const feedingCountWeekly = weeklyActivities.filter(
    (a) => a.type === "feeding"
  ).length;
  const diaperCountWeekly = weeklyActivities.filter(
    (a) => a.type === "diaper"
  ).length;
  const totalSleepTimeWeekly = weeklyActivities
    .filter((a) => a.type === "sleep")
    .reduce((total, activity) => total + (activity.duration || 0), 0);

  // Array de métricas com valores para o dia e a semana
  const stats = [
    {
      icon: Baby,
      labelToday: "Mamadas Hoje",
      valueToday: feedingCountToday,
      labelWeekly: "Mamadas (7 dias)",
      valueWeekly: feedingCountWeekly,
      color: "bg-primary text-primary-content",
    },
    {
      icon: Clock,
      labelToday: "Sono Total (Hoje)",
      valueToday: `${Math.floor(totalSleepTimeToday / 60)}h ${totalSleepTimeToday % 60}m`,
      labelWeekly: "Sono Total (7 dias)",
      valueWeekly: `${Math.floor(totalSleepTimeWeekly / 60)}h ${totalSleepTimeWeekly % 60}m`,
      color: "bg-secondary text-secondary-content",
    },
    {
      icon: Droplets,
      labelToday: "Trocas Hoje",
      valueToday: diaperCountToday,
      labelWeekly: "Trocas (7 dias)",
      valueWeekly: diaperCountWeekly,
      color: "bg-accent text-accent-content",
    },
    {
      icon: Clock,
      labelToday: "Última Mamada",
      valueToday: timeSinceLastFeeding ? `há ${timeSinceLastFeeding} min` : "N/A",
      labelWeekly: " ", // Campo vazio para manter o layout
      valueWeekly: " ", // Campo vazio para manter o layout
      color: "bg-info text-info-content",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Seção de estatísticas de Hoje */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-base-100 rounded-2xl p-4 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl shadow-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral font-medium">{stat.labelToday}</p>
                <p className="text-lg font-bold text-neutral">{stat.valueToday}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Seção de estatísticas da Semana */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-base-100 rounded-2xl p-4 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl shadow-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-neutral font-medium">{stat.labelWeekly}</p>
                <p className="text-lg font-bold text-neutral">{stat.valueWeekly}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
