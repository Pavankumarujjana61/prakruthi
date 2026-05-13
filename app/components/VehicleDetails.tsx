import {
  ArrowLeft,
  MapPin,
  Fuel,
  Calendar,
  User,
  FileText,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Settings,
  Download,
  Edit,
  Trash2,
} from 'lucide-react';

const vehicleInfo = {
  number: 'TN 45 AB 1234',
  type: 'Heavy Truck',
  brand: 'Tata',
  model: 'LPT 1918',
  year: 2022,
  status: 'Active',
  currentDriver: 'Ramesh Kumar',
  lastLocation: 'Chennai, Tamil Nadu',
  fuelLevel: 75,
  odometer: 45820,
  nextService: '48,000 km',
};

const documents = [
  { name: 'Vehicle Registration', expiry: '15 Aug 2026', status: 'Valid', daysLeft: 475 },
  { name: 'Insurance', expiry: '01 Jun 2024', status: 'Expiring Soon', daysLeft: 5 },
  { name: 'Pollution Certificate', expiry: '25 May 2024', status: 'Expiring Soon', daysLeft: -2 },
  { name: 'Fitness Certificate', expiry: '10 Jan 2025', status: 'Valid', daysLeft: 258 },
];

const maintenanceHistory = [
  {
    date: '15 Apr 2024',
    service: 'Engine Oil Change',
    cost: '₹3,500',
    mileage: '42,300 km',
    status: 'Completed',
    technician: 'Auto Service Center',
  },
  {
    date: '28 Mar 2024',
    service: 'Brake Pad Replacement',
    cost: '₹8,200',
    mileage: '41,500 km',
    status: 'Completed',
    technician: 'Tata Service Center',
  },
  {
    date: '10 Mar 2024',
    service: 'Wheel Alignment',
    cost: '₹1,500',
    mileage: '40,800 km',
    status: 'Completed',
    technician: 'Quick Fix Garage',
  },
  {
    date: '22 Feb 2024',
    service: 'Air Filter Replacement',
    cost: '₹1,200',
    mileage: '39,900 km',
    status: 'Completed',
    technician: 'Auto Service Center',
  },
];

const tripHistory = [
  {
    id: 'TRP00025',
    route: 'Salem → Chennai',
    date: '20 May 2024',
    distance: '340 km',
    duration: '6h 30m',
    status: 'In Progress',
    driver: 'Ramesh Kumar',
  },
  {
    id: 'TRP00021',
    route: 'Chennai → Salem',
    date: '18 May 2024',
    distance: '340 km',
    duration: '6h 45m',
    status: 'Completed',
    driver: 'Ramesh Kumar',
  },
  {
    id: 'TRP00018',
    route: 'Salem → Coimbatore',
    date: '15 May 2024',
    distance: '165 km',
    duration: '3h 20m',
    status: 'Completed',
    driver: 'Suresh Babu',
  },
];

const fuelHistory = [
  { date: '19 May 2024', quantity: '120 L', cost: '₹10,800', station: 'HP Fuel Station, Chennai' },
  { date: '16 May 2024', quantity: '115 L', cost: '₹10,350', station: 'Indian Oil, Salem' },
  { date: '12 May 2024', quantity: '118 L', cost: '₹10,620', station: 'Bharat Petroleum, Trichy' },
];

export function VehicleDetails({ onBack }: { onBack: () => void }) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{vehicleInfo.number}</h1>
            <p className="text-sm text-gray-500">
              {vehicleInfo.brand} {vehicleInfo.model} ({vehicleInfo.year})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-gray-900">{vehicleInfo.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Odometer</p>
              <p className="text-lg font-semibold text-gray-900">{vehicleInfo.odometer.toLocaleString()} km</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Fuel className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Fuel Level</p>
              <p className="text-lg font-semibold text-gray-900">{vehicleInfo.fuelLevel}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Wrench className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Service</p>
              <p className="text-lg font-semibold text-gray-900">{vehicleInfo.nextService}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Vehicle Information */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Vehicle Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Vehicle Number</span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Brand</span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Model</span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Year</span>
                <span className="text-sm font-medium text-gray-900">{vehicleInfo.year}</span>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Current Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Current Driver</p>
                  <p className="text-sm font-medium text-gray-900">{vehicleInfo.currentDriver}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Last Location</p>
                  <p className="text-sm font-medium text-gray-900">{vehicleInfo.lastLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents & Certificates */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Documents & Certificates</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Expires: {doc.expiry}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      doc.status === 'Valid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Maintenance & Trips */}
        <div className="col-span-2 space-y-6">
          {/* Maintenance History */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Maintenance History</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Date</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Service Type</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Cost</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Mileage</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Technician</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceHistory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-700">{item.date}</td>
                      <td className="py-3 text-sm text-gray-900">{item.service}</td>
                      <td className="py-3 text-sm text-gray-900">{item.cost}</td>
                      <td className="py-3 text-sm text-gray-600">{item.mileage}</td>
                      <td className="py-3 text-sm text-gray-600">{item.technician}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trip History */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Trips</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Trip ID</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Route</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Date</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Distance</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Duration</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Driver</th>
                    <th className="text-left text-xs font-medium text-gray-600 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tripHistory.map((trip, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-900">{trip.id}</td>
                      <td className="py-3 text-sm text-gray-900">{trip.route}</td>
                      <td className="py-3 text-sm text-gray-600">{trip.date}</td>
                      <td className="py-3 text-sm text-gray-600">{trip.distance}</td>
                      <td className="py-3 text-sm text-gray-600">{trip.duration}</td>
                      <td className="py-3 text-sm text-gray-700">{trip.driver}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            trip.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {trip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fuel History */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Fuel History</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              {fuelHistory.map((fuel, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Fuel className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{fuel.quantity}</p>
                      <p className="text-xs text-gray-500">{fuel.station}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{fuel.cost}</p>
                    <p className="text-xs text-gray-500">{fuel.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
