import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, Eye } from 'lucide-react';
import { fetchDrivers } from '../api/fleet';
import type { Driver } from '../api/types';

interface DriversPageProps {
  onViewDetails: (driverName: string) => void;
}

export function DriversPage({ onViewDetails }: DriversPageProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetchDrivers({ search, limit: 10 });
        setDrivers(response.data.drivers);
      } catch (error) {
        console.error('Unable to load drivers', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Driver Management</h1>
          <p className="text-sm text-gray-500">Manage driver information and assignments</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Driver
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Drivers</p>
          <p className="text-3xl font-semibold text-gray-900">{drivers.length || 24}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-3xl font-semibold text-green-600">{drivers.filter((d: Driver) => d.status === 'Active').length || 18}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">On Leave</p>
          <p className="text-3xl font-semibold text-orange-600">{drivers.filter((d: Driver) => d.status === 'On Leave').length || 6}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="text"
              placeholder="Search drivers by name or license..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {loading && <div className="p-4 text-center text-gray-500">Loading drivers...</div>}
        {!loading && drivers.length === 0 && <div className="p-4 text-center text-gray-500">No drivers found</div>}

        {!loading && drivers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Driver Name</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">License Number</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Phone</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Current Vehicle</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Total Trips</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver: Driver, index: number) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{driver.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{driver.licenseNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {driver.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{driver.currentVehicle || 'Not Assigned'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{driver.totalTrips || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => onViewDetails(driver.name)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
