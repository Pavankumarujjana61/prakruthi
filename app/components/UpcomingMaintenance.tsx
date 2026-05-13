import { Eye } from 'lucide-react';

const maintenanceItems = [
  {
    vehicle: 'TN 45 AB 1234',
    service: 'Engine Oil Change',
    dueDate: '25 May 2024',
    dueIn: '5 Days',
    dueInColor: 'text-orange-600',
    lastService: '25 Apr 2024',
    details: 'Due in 4,500 km',
  },
  {
    vehicle: 'TN 22 GH 3456',
    service: 'Wheel Alignment',
    dueDate: '22 May 2024',
    dueIn: '2 Days',
    dueInColor: 'text-red-600',
    lastService: '22 Apr 2024',
    details: 'Due in 1,200 km',
  },
  {
    vehicle: 'TN 07 LJ 6789',
    service: 'Grease Oil',
    dueDate: '24 May 2024',
    dueIn: '4 Days',
    dueInColor: 'text-orange-600',
    lastService: '24 Apr 2024',
    details: 'Due in 3,000 km',
  },
  {
    vehicle: 'TN 38 CD 5678',
    service: 'Differential Oil',
    dueDate: '23 May 2024',
    dueIn: '3 Days',
    dueInColor: 'text-orange-600',
    lastService: '23 Apr 2024',
    details: 'Due in 2,000 km',
  },
];

export function UpcomingMaintenance() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Upcoming Maintenance & Services</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Vehicle No.</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Service Type</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Due Date</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Due In</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Last Service</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Details</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {maintenanceItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-sm text-gray-900">{item.vehicle}</td>
                <td className="py-3 text-sm text-gray-700">{item.service}</td>
                <td className="py-3 text-sm text-gray-700">{item.dueDate}</td>
                <td className="py-3">
                  <span className={`text-sm font-medium ${item.dueInColor}`}>
                    {item.dueIn}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{item.lastService}</td>
                <td className="py-3 text-sm text-gray-600">{item.details}</td>
                <td className="py-3">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
