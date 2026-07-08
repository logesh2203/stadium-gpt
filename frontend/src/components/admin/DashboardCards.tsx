import { Users, Car, HeartPulse, AlertTriangle } from 'lucide-react';

interface DashboardData {
  total_visitors: number;
  current_visitors: number;
  crowd_status: string;
  emergency_alerts: number;
  medical_requests: number;
  parking_availability: string;
}

export default function DashboardCards({ data }: { data: DashboardData }) {
  const cards = [
    {
      title: "Current Visitors",
      value: data.current_visitors.toLocaleString(),
      subtitle: `Out of ${data.total_visitors.toLocaleString()} capacity`,
      icon: Users,
      color: "blue"
    },
    {
      title: "Crowd Status",
      value: data.crowd_status,
      subtitle: "Live monitoring active",
      icon: AlertTriangle,
      color: data.crowd_status === "High" ? "red" : data.crowd_status === "Medium" ? "yellow" : "green"
    },
    {
      title: "Parking",
      value: data.parking_availability,
      subtitle: "Availability left",
      icon: Car,
      color: "purple"
    },
    {
      title: "Medical Requests",
      value: data.medical_requests,
      subtitle: `${data.emergency_alerts} active emergencies`,
      icon: HeartPulse,
      color: "red"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500">{card.subtitle}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${card.color}-100 dark:bg-${card.color}-900/30 text-${card.color}-600 dark:text-${card.color}-400`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
