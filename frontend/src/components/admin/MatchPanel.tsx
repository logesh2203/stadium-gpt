import { Users, Sun } from 'lucide-react';
import { MatchData, WeatherData } from '../../types';

export default function MatchPanel({ matchData, weatherData }: { matchData: MatchData, weatherData: WeatherData }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-blue-100 text-sm font-medium mb-1">Live Match</p>
          <h2 className="text-2xl font-bold">{matchData.match}</h2>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
          <span className="text-sm font-bold">{matchData.time_remaining}</span>
        </div>
      </div>
      
      <div className="flex justify-center my-6">
        <div className="text-5xl font-black tracking-widest">{matchData.score}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-blue-200" />
          <div className="text-sm">
            <p className="text-blue-200 text-xs">Attendance</p>
            <p className="font-semibold">{matchData.attendance}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sun size={18} className="text-blue-200" />
          <div className="text-sm">
            <p className="text-blue-200 text-xs">{weatherData.condition}</p>
            <p className="font-semibold">{weatherData.temperature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
