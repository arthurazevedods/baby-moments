import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Baby, Moon, Droplets, Pill, Smile } from "lucide-react";
import type { Activity } from "../routes/index";


interface TimelineViewProps {
  activities: Activity[];
}

const activityConfig = {
  feeding: {
    icon: Baby,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 border-pink-200",
    label: "Mamada"
  },
  sleep: {
    icon: Moon,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 border-blue-200",
    label: "Sono"
  },
  diaper: {
    icon: Droplets,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 border-green-200",
    label: "Fralda"
  },
  medicine: {
    icon: Pill,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 border-purple-200",
    label: "Medicamento"
  },
  other: {
    icon: Smile,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 border-orange-200",
    label: "Outro"
  }
};

export const TimelineView = ({ activities }: TimelineViewProps) => {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <Baby className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">Nenhuma atividade registrada ainda</p>
        <p className="text-gray-400 text-sm">Comece adicionando a primeira atividade do seu bebê!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const config = activityConfig[activity.type];
        const Icon = config.icon;
        
        return (
          <div key={activity.id} className="flex items-start space-x-4 group">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${config.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent mt-2" />
              )}
            </div>
            
            {/* Activity content */}
            <div className={`flex-1 p-4 rounded-xl ${config.bgColor} border transition-all duration-200 hover:shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{config.label}</h3>
                <span className="text-sm text-gray-500">
                  {format(new Date(activity.timestamp), "HH:mm", { locale: ptBR })}
                </span>
              </div>
              
              {/* Activity details */}
              <div className="space-y-1 text-sm text-gray-600">
                {activity.type === 'feeding' && (
                  <>
                    {activity.details.side && (
                      <p>Lado: {activity.details.side}</p>
                    )}
                    {activity.duration && (
                      <p>Duração: {activity.duration} minutos</p>
                    )}
                    {activity.details.amount && (
                      <p>Quantidade: {activity.details.amount}ml</p>
                    )}
                  </>
                )}
                
                {activity.type === 'sleep' && activity.duration && (
                  <p>Duração: {Math.floor(activity.duration / 60)}h {activity.duration % 60}m</p>
                )}
                
                {activity.type === 'diaper' && activity.details.type && (
                  <p>Tipo: {activity.details.type}</p>
                )}
                
                {activity.type === 'medicine' && (
                  <>
                    {activity.details.name && <p>Medicamento: {activity.details.name}</p>}
                    {activity.details.dosage && <p>Dosagem: {activity.details.dosage}</p>}
                  </>
                )}
                
                {activity.notes && (
                  <p className="italic text-gray-500 mt-2">"{activity.notes}"</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
