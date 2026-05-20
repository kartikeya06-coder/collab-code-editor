import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MetricsGraph({ data }) {
  // If there's no data yet, show a placeholder
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500 font-mono text-xs border-l border-[#333]">
        Awaiting telemetry data...
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 bg-[#1e1e1e] border-l border-[#333] flex flex-col">
      <div className="text-xs font-bold uppercase tracking-widest text-[#10b981] mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse"></span>
        Live Memory Profiler
      </div>
      
      <div className="flex-grow w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            
            {/* X-Axis: Time Elapsed in ms */}
            <XAxis 
              dataKey="time" 
              stroke="#666" 
              tick={{fontSize: 10}} 
              tickFormatter={(t) => `${t}ms`} 
            />
            
            {/* Y-Axis: Memory in MB */}
            <YAxis 
              stroke="#666" 
              tick={{fontSize: 10}} 
              domain={['dataMin - 5', 'dataMax + 5']} 
              tickFormatter={(m) => `${m}MB`} 
            />
            
            {/* The hover tooltip */}
            <Tooltip 
              contentStyle={{ backgroundColor: '#252526', border: '1px solid #333', color: '#fff', fontSize: '12px' }}
              formatter={(value) => [`${value} MB`, 'RAM Usage']}
              labelFormatter={(label) => `Time: ${label}ms`}
            />
            
            {/* The Data Line */}
            <Line 
              type="monotone" 
              dataKey="memory" 
              stroke="#10b981" 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}