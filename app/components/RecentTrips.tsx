import { ArrowRight } from 'lucide-react';

const trips = [
  {
    id: 'TRP00025',
    vehicle: 'TN 45 AB 1234',
    driver: 'Ramesh Kumar',
    route: 'Salem → Chennai',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-700',
    lastUpdate: '20 May, 08:15 AM',
  },
  {
    id: 'TRP00024',
    vehicle: 'TN 38 CD 5678',
    driver: 'Suresh Babu',
    route: 'Trichy → Salem',
    status: 'Loading Done',
    statusColor: 'bg-orange-100 text-orange-700',
    lastUpdate: '20 May, 09:30 AM',
  },
  {
    id: 'TRP00023',
    vehicle: 'TN 22 GH 3456',
    driver: 'Manoj Kumar',
    route: 'Madurai → Coimbatore',
    status: 'Unloading Done',
    statusColor: 'bg-purple-100 text-purple-700',
    lastUpdate: '20 May, 02:15 PM',
  },
  {
    id: 'TRP00022',
    vehicle: 'TN 07 LJ 6789',
    driver: 'Karthik Raj',
    route: 'Coimbatore → Erode',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-700',
    lastUpdate: '20 May, 12:45 PM',
  },
  {
    id: 'TRP00021',
    vehicle: 'TN 19 EF 9012',
    driver: 'Vinoth Kumar',
    route: 'Chennai → Bengaluru',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    lastUpdate: '20 May, 11:30 AM',
  },
];

export function RecentTrips() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Trips</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View All Trips
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Trip ID</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Vehicle No.</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Driver</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Route</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-600 pb-3">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-sm text-gray-900">{trip.id}</td>
                <td className="py-3 text-sm text-gray-900">{trip.vehicle}</td>
                <td className="py-3 text-sm text-gray-700">{trip.driver}</td>
                <td className="py-3 text-sm text-gray-700">{trip.route}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded ${trip.statusColor}`}>
                    {trip.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{trip.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
