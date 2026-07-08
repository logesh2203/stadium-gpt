interface CrowdData {
  gate: string;
  current_crowd: number;
  status: string;
  color: string;
}

export default function HeatmapPanel({ crowdData }: { crowdData: CrowdData[] }) {
  // A simplified visual representation of the stadium zones based on gates
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Live Heatmap</h2>
      <div className="flex-1 relative min-h-[300px] bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-8">
        
        {/* Abstract Stadium Shape */}
        <div className="w-full max-w-[250px] aspect-[3/4] border-4 border-gray-300 dark:border-gray-600 rounded-[100px] relative">
          
          {/* Pitch */}
          <div className="absolute inset-8 border-2 border-gray-300 dark:border-gray-600 rounded-full opacity-50"></div>
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600 opacity-50"></div>
          
          {/* Gate Indicators */}
          {crowdData.map((gate, idx) => {
            let positionClasses = "";
            if (gate.gate === "Gate A") positionClasses = "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"; // North
            if (gate.gate === "Gate B") positionClasses = "top-1/2 right-0 translate-x-1/2 -translate-y-1/2"; // East
            if (gate.gate === "Gate C") positionClasses = "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"; // South
            if (gate.gate === "Gate D") positionClasses = "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"; // West

            return (
              <div 
                key={idx} 
                className={`absolute ${positionClasses} flex flex-col items-center group`}
              >
                <div className={`w-8 h-8 rounded-full bg-${gate.color}-500 shadow-lg shadow-${gate.color}-500/50 animate-pulse border-2 border-white dark:border-gray-900 z-10`}></div>
                <div className="absolute bg-white dark:bg-gray-800 text-xs font-bold px-2 py-1 rounded-md shadow-md border border-gray-200 dark:border-gray-700 top-10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 text-gray-900 dark:text-white">
                  {gate.gate}: {gate.status}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
