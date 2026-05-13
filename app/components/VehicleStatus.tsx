import { Car, Wrench, Clock, XCircle } from 'lucide-react';

const statuses = [
  {
    icon: Car,
    label: 'Active',
    count: 18,
    percentage: 60,
    color: 'bg-green-500',
  },
  {
    icon: Wrench,
    label: 'In Maintenance',
    count: 4,
    percentage: 13,
    color: 'bg-orange-500',
  },
  {
    icon: Clock,
    label: 'Idle',
    count: 5,
    percentage: 17,
    color: 'bg-purple-500',
  },
  {
    icon: XCircle,
    label: 'Inactive',
    count: 3,
    percentage: 10,
    color: 'bg-red-500',
  },
];

export function VehicleStatus() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Vehicle Status Overview</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="space-y-4">
        {statuses.map((status, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <status.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{status.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {status.count} ({status.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${status.color}`}
                style={{ width: `${status.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
