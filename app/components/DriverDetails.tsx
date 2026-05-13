import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  AlertCircle,
  TrendingUp,
  Clock,
  FileText,
  Download,
  Edit,
} from 'lucide-react';

const driverInfo = {
  name: 'Ramesh Kumar',
  license: 'DL1234567890',
  phone: '+91 98765 43210',
  email: 'ramesh.kumar@fleetcare.com',
  address: '123, Anna Nagar, Chennai, Tamil Nadu - 600040',
  dateOfBirth: '15 March 1985',
  joinDate: '01 January 2020',
  experience: '12 years',
  status: 'Active',
  currentVehicle: 'TN 45 AB 1234',
  totalTrips: 145,
  rating: 4.8,
};

const tripHistory = [
  { id: 'TRP00025', route: 'Salem → Chennai', date: '20 May 2024', distance: '340 km', duration: '6h 30m', status: 'In Progress' },
  { id: 'TRP00021', route: 'Chennai → Salem', date: '18 May 2024', distance: '340 km', duration: '6h 45m', status: 'Completed' },
  { id: 'TRP00018', route: 'Salem → Coimbatore', date: '15 May 2024', distance: '165 km', duration: '3h 20m', status: 'Completed' },
  { id: 'TRP00015', route: 'Coimbatore → Madurai', date: '12 May 2024', distance: '215 km', duration: '4h 10m', status: 'Completed' },
  { id: 'TRP00012', route: 'Madurai → Chennai', date: '10 May 2024', distance: '462 km', duration: '8h 30m', status: 'Completed' },
];

const documents = [
  { name: 'Driving License', number: 'DL1234567890', expiry: '15 March 2028', status: 'Valid' },
  { name: 'Medical Certificate', number: 'MC9876543210', expiry: '01 August 2024', status: 'Expiring Soon' },
  { name: 'Police Verification', number: 'PV5544332211', expiry: '10 December 2025', status: 'Valid' },
  { name: 'Training Certificate', number: 'TC7788990011', expiry: 'N/A', status: 'Permanent' },
];

const performanceMetrics = [
  { label: 'On-Time Delivery', value: '95%', trend: 'up', color: 'text-green-600' },
  { label: 'Fuel Efficiency', value: '8.5 km/L', trend: 'up', color: 'text-green-600' },
  { label: 'Safety Score', value: '4.8/5', trend: 'neutral', color: 'text-blue-600' },
  { label: 'Customer Rating', value: '4.9/5', trend: 'up', color: 'text-green-600' },
];

const incidents = [
  { date: '05 May 2024', type: 'Minor Accident', description: 'Minor collision while parking. No injuries.', severity: 'Low' },
  { date: '20 April 2024', type: 'Traffic Violation', description: 'Speeding fine - 10 km/h over limit.', severity: 'Low' },
];

export function DriverDetails({ onBack }: { onBack: () => void }) {
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
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${driverInfo.name}&background=3b82f6&color=fff&size=80`}
              alt={driverInfo.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{driverInfo.name}</h1>
              <p className="text-sm text-gray-500">License: {driverInfo.license}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-gray-900">{driverInfo.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-lg font-semibold text-gray-900">{driverInfo.totalTrips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-lg font-semibold text-gray-900">{driverInfo.rating}/5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="text-lg font-semibold text-gray-900">{driverInfo.experience}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Incidents</p>
              <p className="text-lg font-semibold text-gray-900">{incidents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{driverInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{driverInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">{driverInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Personal Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date of Birth</span>
                <span className="text-sm font-medium text-gray-900">{driverInfo.dateOfBirth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Join Date</span>
                <span className="text-sm font-medium text-gray-900">{driverInfo.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="text-sm font-medium text-gray-900">{driverInfo.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Vehicle</span>
                <span className="text-sm font-medium text-gray-900">{driverInfo.currentVehicle}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className={`text-sm font-medium ${metric.color}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle & Right Columns */}
        <div className="col-span-2 space-y-6">
          {/* Documents & Certificates */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Documents & Certificates</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Number: {doc.number}</p>
                      <p className="text-xs text-gray-500">Expiry: {doc.expiry}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                        doc.status === 'Valid' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          trip.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Incidents & Violations */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Incidents & Violations</h3>
            <div className="space-y-3">
              {incidents.map((incident, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{incident.type}</p>
                      <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{incident.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      incident.severity === 'High' ? 'bg-red-100 text-red-700' :
                      incident.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {incident.severity}
                    </span>
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
