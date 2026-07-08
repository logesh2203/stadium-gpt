import { AlertTriangle, MapPin, Clock } from 'lucide-react';

interface EmergencyData {
  id: string;
  type: string;
  status: string;
  priority: string;
  time: string;
  location: string;
}

export default function EmergencyPanel({ data }: { data: EmergencyData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Emergency Alerts</h2>
      <div className="space-y-4">
        {data.map((alert, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className={alert.priority === 'Critical' ? 'text-red-600' : 'text-orange-500'} />
                <h3 className="font-semibold text-gray-900 dark:text-white">{alert.type}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                alert.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                alert.priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {alert.priority}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5"><MapPin size={14} /> {alert.location}</div>
              <div className="flex items-center gap-1.5"><Clock size={14} /> {alert.time} • Status: {alert.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
