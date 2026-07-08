import { useEffect, useState } from 'react';
import DashboardCards from '../../components/admin/DashboardCards';
import CrowdPanel from '../../components/admin/CrowdPanel';
import EmergencyPanel from '../../components/admin/EmergencyPanel';
import HeatmapPanel from '../../components/admin/HeatmapPanel';
import MatchPanel from '../../components/admin/MatchPanel';
import { Sparkles } from 'lucide-react';
import { endpoints } from '../../api/config';
import { DashboardState } from '../../types';

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, crowdRes, emRes, matchRes, weatherRes] = await Promise.all([
          fetch(endpoints.dashboard),
          fetch(endpoints.crowd),
          fetch(endpoints.emergency),
          fetch(endpoints.match),
          fetch(endpoints.weather),
        ]);

        const dashboardData = await dashRes.json();
        const crowdData = await crowdRes.json();
        const emergencyData = await emRes.json();
        const matchData = await matchRes.json();
        const weatherData = await weatherRes.json();

        setData({
          dashboard: dashboardData,
          crowd: crowdData,
          emergency: emergencyData,
          match: matchData,
          weather: weatherData
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        ))}
      </div>
      <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
          </div>
        </div>
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Section */}
      <DashboardCards data={data.dashboard} />

      {/* AI Recommendation Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-md flex items-start gap-4">
        <div className="bg-white/20 p-3 rounded-xl shrink-0">
          <Sparkles size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">AI Actionable Insight</h3>
          <p className="text-indigo-100">{data.dashboard.ai_recommendation}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <CrowdPanel data={data.crowd} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HeatmapPanel crowdData={data.crowd} />
            <MatchPanel matchData={data.match} weatherData={data.weather} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <EmergencyPanel data={data.emergency} />
        </div>

      </div>
    </div>
  );
}
