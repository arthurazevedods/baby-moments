import type { Activity } from "../routes/index";
import { Baby, Clock, Droplets } from "lucide-react";
import { isToday, differenceInMinutes } from "date-fns";

interface DashboardStatsProps {
  activities: Activity[];
}

export const DashboardStats = ({ activities }: DashboardStatsProps) => {
  const todayActivities = activities.filter(activity =>
    isToday(new Date(activity.timestamp))
  );

  const feedingCount = todayActivities.filter(a => a.type === 'feeding').length;
  const diaperCount = todayActivities.filter(a => a.type === 'diaper').length;
  const sleepActivities = todayActivities.filter(a => a.type === 'sleep');
  const totalSleepTime = sleepActivities.reduce((total, activity) =>
    total + (activity.duration || 0), 0
  );

  const lastFeeding = activities.find(a => a.type === 'feeding');
  const timeSinceLastFeeding = lastFeeding
    ? differenceInMinutes(new Date(), new Date(lastFeeding.timestamp))
    : null;

  const stats = [
    {
      icon: Baby,
      label: "Mamadas Hoje",
      value: feedingCount,
      color: "bg-primary text-primary-content",
    },
    {
      icon: Clock,
      label: "Sono Total",
      value: `${Math.floor(totalSleepTime / 60)}h ${totalSleepTime % 60}m`,
      color: "bg-secondary text-secondary-content",
    },
    {
      icon: Droplets,
      label: "Trocas Hoje",
      value: diaperCount,
      color: "bg-accent text-accent-content",
    },
    {
      icon: Clock,
      label: "Última Mamada",
      value: timeSinceLastFeeding ? `há ${timeSinceLastFeeding}min` : "N/A",
      color: "bg-info text-info-content",
    },
  ];

  return (
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
              <p className="text-sm text-neutral font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-neutral">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};