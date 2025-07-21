import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Activity {
  id: string;
  type: "feeding" | "sleep" | "diaper" | "medicine" | "other";
  timestamp: Date;
  duration?: number;
  details: Record<string, any>;
  notes?: string;
}


interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id'>) => void;
  onClose: () => void;
}


export const ActivityForm = ({ onSubmit, onClose }: ActivityFormProps) => {
  const [type, setType] = useState<Activity['type']>('feeding');
  const [timestamp, setTimestamp] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [duration, setDuration] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [details, setDetails] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      type,
      timestamp: new Date(timestamp),
      duration: duration ? parseInt(duration) : undefined,
      details,
      notes: notes || undefined,
    });
  };

  const updateDetail = (key: string, value: any) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" data-theme="cupcake">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Nova Atividade</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Activity Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Atividade</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Activity['type'])}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="feeding">Mamada</option>
              <option value="sleep">Sono</option>
              <option value="diaper">Troca de Fralda</option>
              <option value="medicine">Medicamento</option>
              <option value="other">Outro</option>
            </select>
          </div>

          {/* Timestamp */}
          <div className="space-y-2">
            <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Data e Hora</label>
            <div className="relative">
              <input
                id="timestamp"
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>

          {/* Type-specific fields */}
          {type === 'feeding' && (
            <>
              <div className="space-y-2">
                <label htmlFor="side" className="block text-sm font-medium text-gray-700">Lado</label>
                <select
                  id="side"
                  value={details.side || ''}
                  onChange={(e) => updateDetail('side', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione o lado</option>
                  <option value="esquerdo">Seio Esquerdo</option>
                  <option value="direito">Seio Direito</option>
                  <option value="mamadeira">Mamadeira</option>
                </select>
              </div>
              
              {details.side === 'mamadeira' && (
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Quantidade (ml)</label>
                  <input
                    id="amount"
                    type="number"
                    placeholder="Ex: 120"
                    value={details.amount || ''}
                    onChange={(e) => updateDetail('amount', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </>
          )}

          {type === 'diaper' && (
            <div className="space-y-2">
              <label htmlFor="diaperType" className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                id="diaperType"
                value={details.type || ''}
                onChange={(e) => updateDetail('type', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione o tipo</option>
                <option value="xixi">Xixi</option>
                <option value="cocô">Cocô</option>
                <option value="ambos">Xixi e Cocô</option>
              </select>
            </div>
          )}

          {type === 'medicine' && (
            <>
              <div className="space-y-2">
                <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">Nome do Medicamento</label>
                <input
                  id="medicineName"
                  placeholder="Ex: Paracetamol"
                  value={details.name || ''}
                  onChange={(e) => updateDetail('name', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosagem</label>
                <input
                  id="dosage"
                  placeholder="Ex: 2.5ml"
                  value={details.dosage || ''}
                  onChange={(e) => updateDetail('dosage', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Duration */}
          {(type === 'feeding' || type === 'sleep') && (
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duração (minutos)</label>
              <input
                id="duration"
                type="number"
                placeholder="Ex: 30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Observações</label>
            <textarea
              id="notes"
              placeholder="Adicione observações..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-base-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-content bg-primary hover:bg-secondary  focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};