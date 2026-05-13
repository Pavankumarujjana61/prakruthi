import { useEffect, useState } from 'react';
import { Plus, Search, Filter, MapPin } from 'lucide-react';
import { fetchTrips } from '../api/fleet';
import type { Trip } from '../api/types';

interface TripManagementPageProps {
  onViewDetails: (tripId: string) => void;
}

export function TripManagementPage({ onViewDetails }: TripManagementPageProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true);
      try {
        const response = await fetchTrips({ search, limit: 10 });
        setTrips(response.data.trips);
      } catch (error) {
        console.error('Unable to load trips', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Trip Management</h1>
          <p className="text-sm text-gray-500">Track and manage all vehicle trips</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Start New Trip
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Trips</p>
          <p className="text-3xl font-semibold text-gray-900">30</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-3xl font-semibold text-blue-600">12</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-3xl font-semibold text-green-600">14</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Not Started</p>
          <p className="text-3xl font-semibold text-gray-600">4</p>
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
              placeholder="Search trips by ID, vehicle, or route..."
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
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Trip ID</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Vehicle</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Driver</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Route</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Distance</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Start Date</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-600 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading trips...
                  </td>
                </tr>
              ) : trips.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No trips found.
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onViewDetails(trip._id)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {trip.tripId}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{trip.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{trip.driver}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{trip.route}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{trip.distance}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{trip.startDate}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        trip.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        trip.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        trip.status === 'Loading Done' ? 'bg-orange-100 text-orange-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </button>
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
