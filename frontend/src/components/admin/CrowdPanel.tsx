import { CrowdData } from '../../types';

export default function CrowdPanel({ data }: { data: CrowdData[] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Crowd Monitoring</h2>
      <div className="space-y-4">
        {data.map((gate, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className={`w-3 h-3 rounded-full bg-${gate.color}-500 shadow-sm shadow-${gate.color}-500/50`}></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{gate.gate}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Crowd: {gate.current_crowd} • Wait: {gate.waiting_time_mins}m</p>
              </div>
            </div>
            <div className="w-full md:w-auto text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-blue-600 dark:text-blue-400">AI Rec:</span> {gate.ai_recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
