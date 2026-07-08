import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CrowdData } from '../../types';

export function CrowdDistributionChart({ data }: { data: CrowdData[] }) {
  const chartData = data.map(item => ({
    name: item.gate,
    crowd: item.current_crowd,
    wait: item.waiting_time_mins
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Crowd Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend />
          <Bar dataKey="crowd" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Current Crowd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EntryTrendChart() {
  // Dummy trend data
  const data = [
    { time: '12:00', entries: 4000 },
    { time: '12:30', entries: 8000 },
    { time: '13:00', entries: 15000 },
    { time: '13:30', entries: 28000 },
    { time: '14:00', entries: 35000 },
    { time: '14:30', entries: 42500 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-[350px]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Entry Trend (Cumulative)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
          <XAxis dataKey="time" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend />
          <Line type="monotone" dataKey="entries" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Total Entries" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
