import type { Activity } from "../routes/index";
import { Baby, Moon, Droplets, Pill } from "lucide-react";

interface QuickActionsProps {
  onQuickAdd: (activity: Omit<Activity, 'id'>) => void;
}

export const QuickActions = ({ onQuickAdd }: QuickActionsProps) => {
  const quickActions = [
    {
      type: 'feeding' as const,
      icon: Baby,
      label: "Mamada",
      color: "from-pink-500 to-rose-500",
      details: { side: "esquerdo" }
    },
    {
      type: 'sleep' as const,
      icon: Moon,
      label: "Sono",
      color: "from-blue-500 to-indigo-500",
      details: {}
    },
    {
      type: 'diaper' as const,
      icon: Droplets,
      label: "Fralda",
      color: "from-green-500 to-emerald-500",
      details: { type: "xixi" }
    },
    {
      type: 'medicine' as const,
      icon: Pill,
      label: "Remédio",
      color: "from-purple-500 to-violet-500",
      details: {}
    },
  ];

  const handleQuickAdd = (actionType: Activity['type'], details: Record<string, any>) => {
    onQuickAdd({
      type: actionType,
      timestamp: new Date(),
      details,
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Ações Rápidas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.type}
              onClick={() => handleQuickAdd(action.type, action.details)}
              className={`btn h-20 flex flex-col space-y-2 bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
