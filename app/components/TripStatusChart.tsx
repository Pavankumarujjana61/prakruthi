import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'In Progress', value: 40, count: 12, color: '#3b82f6' },
  { name: 'Loading Done', value: 20, count: 6, color: '#f97316' },
  { name: 'Unloading Done', value: 20, count: 6, color: '#a855f7' },
  { name: 'Completed', value: 13, count: 4, color: '#22c55e' },
  { name: 'Not Started', value: 7, count: 2, color: '#6b7280' },
];

export function TripStatusChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Trip Status Overview</h3>

      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="relative" style={{ width: 192, height: 192 }}>
          <ResponsiveContainer width={192} height={192}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-gray-900">30</div>
            <div className="text-sm text-gray-500">Total Trips</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.count} ({item.value}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div>
          <div className="text-sm text-gray-600 mb-1">Total Trips (This Month)</div>
          <div className="text-2xl font-semibold text-gray-900">30</div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Completion Rate</div>
          <div className="text-2xl font-semibold text-green-600">76%</div>
        </div>
      </div>
    </div>
  );
}
