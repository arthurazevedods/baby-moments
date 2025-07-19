import type { Activity } from "../routes/index";
import { Baby, Clock, Droplets } from "lucide-react";
import {  isToday, differenceInMinutes } from "date-fns";

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
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
    },
    {
      icon: Clock,
      label: "Sono Total",
      value: `${Math.floor(totalSleepTime / 60)}h ${totalSleepTime % 60}m`,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Droplets,
      label: "Trocas Hoje",
      value: diaperCount,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: Clock,
      label: "Última Mamada",
      value: timeSinceLastFeeding ? `há ${timeSinceLastFeeding}min` : "N/A",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};