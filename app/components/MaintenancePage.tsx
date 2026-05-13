import { Plus, Search, Filter, Wrench } from 'lucide-react';

const maintenanceRecords = [
  { vehicle: 'TN 45 AB 1234', service: 'Engine Oil Change', date: '25 May 2024', cost: '₹3,500', status: 'Scheduled', dueIn: '5 Days' },
  { vehicle: 'TN 22 GH 3456', service: 'Wheel Alignment', date: '22 May 2024', cost: '₹1,500', status: 'Scheduled', dueIn: '2 Days' },
  { vehicle: 'TN 38 CD 5678', service: 'Brake System Check', date: '20 May 2024', cost: '₹2,800', status: 'In Progress', dueIn: 'Today' },
  { vehicle: 'TN 07 LJ 6789', service: 'Tire Replacement', date: '18 May 2024', cost: '₹12,000', status: 'Completed', dueIn: '' },
  { vehicle: 'TN 19 EF 9012', service: 'Battery Check', date: '15 May 2024', cost: '₹500', status: 'Completed', dueIn: '' },
];

export function MaintenancePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Maintenance</h1>
          <p className="text-sm text-gray-500">Track vehicle maintenance and service schedules</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Maintenance
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Services</p>
          <p className="text-3xl font-semibold text-gray-900">156</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Scheduled</p>
          <p className="text-3xl font-semibold text-orange-600">12</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-3xl font-semibold text-blue-600">4</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">This Month Cost</p>
          <p className="text-3xl font-semibold text-green-600">₹45,200</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search maintenance records..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Vehicle Number</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Service Type</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Date</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Cost</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Due In</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.vehicle}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.service}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.cost}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      record.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      record.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.dueIn}</td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Wrench className="w-4 h-4 text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
