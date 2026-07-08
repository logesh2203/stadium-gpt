import { useEffect, useState } from 'react';
import { CrowdDistributionChart, EntryTrendChart } from '../../components/admin/Charts';
import { endpoints } from '../../api/config';
import { CrowdData } from '../../types';

export default function Analytics() {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([]);

  useEffect(() => {
    fetch(endpoints.crowd)
      .then(res => res.json())
      .then(data => setCrowdData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stadium Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">Deep dive into operational metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EntryTrendChart />
        {crowdData.length > 0 ? (
          <CrowdDistributionChart data={crowdData} />
        ) : (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-[350px] flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        )}
      </div>
      
      {/* Additional Charts place holders for Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Parking Usage', 'Medical Requests Trend', 'Incident Resolution Time'].map(title => (
          <div key={title} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-[250px] flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
               <span className="text-2xl">📊</span>
             </div>
             <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
             <p className="text-xs text-gray-500 mt-2">Data syncing...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
