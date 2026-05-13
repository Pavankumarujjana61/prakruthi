import { useEffect, useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { fetchVehicles } from '../api/fleet';
import type { Vehicle } from '../api/types';

interface VehiclesPageProps {
  onViewDetails: (vehicleNumber: string) => void;
}

export function VehiclesPage({ onViewDetails }: VehiclesPageProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetchVehicles({ search, limit: 10 });
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error('Unable to load vehicles', error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Vehicles</h1>
          <p className="text-sm text-gray-500">Manage and monitor your fleet vehicles</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Vehicle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="text"
              placeholder="Search vehicles by number, type, or driver..."
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
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Brand & Model</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Current Driver</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Location</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading vehicles...
                  </td>
                </tr>
              ) : vehicles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onViewDetails(vehicle.number)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {vehicle.number}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.brand} {vehicle.model}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        vehicle.status === 'Active' ? 'bg-green-100 text-green-700' :
                        vehicle.status === 'In Maintenance' ? 'bg-orange-100 text-orange-700' :
                        vehicle.status === 'Idle' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{vehicle.currentDriver?.name || 'Not Assigned'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{vehicle.lastLocation || 'Unknown'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetails(vehicle.number)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
