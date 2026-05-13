import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  User,
  Car,
  Package,
  TrendingUp,
  Download,
  Edit,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const tripInfo = {
  id: 'TRP00025',
  vehicle: 'TN 45 AB 1234',
  driver: 'Ramesh Kumar',
  route: 'Salem → Chennai',
  startDate: '20 May 2024',
  startTime: '06:00 AM',
  estimatedEndTime: '12:30 PM',
  distance: '340 km',
  status: 'In Progress',
  currentLocation: 'Near Tindivanam, NH45',
  progress: 65,
};

const milestones = [
  { location: 'Salem (Start)', time: '06:00 AM', status: 'Completed', distance: '0 km' },
  { location: 'Dharmapuri', time: '07:15 AM', status: 'Completed', distance: '45 km' },
  { location: 'Krishnagiri', time: '08:30 AM', status: 'Completed', distance: '95 km' },
  { location: 'Vellore', time: '09:45 AM', status: 'Completed', distance: '155 km' },
  { location: 'Tindivanam', time: '11:00 AM', status: 'In Progress', distance: '221 km' },
  { location: 'Chennai (End)', time: '12:30 PM (Est.)', status: 'Pending', distance: '340 km' },
];

const cargoDetails = {
  type: 'Electronics',
  weight: '12,500 kg',
  quantity: '450 boxes',
  value: '₹25,00,000',
  sender: 'Tech Distributors Pvt Ltd',
  receiver: 'Chennai Electronics Hub',
};

const fuelConsumption = [
  { location: 'Salem Start', fuelLevel: '100%', liters: '150 L' },
  { location: 'Krishnagiri', fuelLevel: '75%', liters: '112 L' },
  { location: 'Current', fuelLevel: '55%', liters: '82 L' },
];

const alerts = [
  { time: '10:45 AM', type: 'Info', message: 'Vehicle crossed Vellore checkpoint' },
  { time: '09:30 AM', type: 'Warning', message: 'Driver took 15 min break at Krishnagiri' },
  { time: '07:00 AM', type: 'Info', message: 'Trip started from Salem warehouse' },
];

export function TripDetails({ onBack }: { onBack: () => void }) {
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
            <h1 className="text-2xl font-semibold text-gray-900">Trip {tripInfo.id}</h1>
            <p className="text-sm text-gray-500">{tripInfo.route}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Trip
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
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="text-lg font-semibold text-gray-900">{tripInfo.vehicle}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Driver</p>
              <p className="text-lg font-semibold text-gray-900">{tripInfo.driver}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-lg font-semibold text-gray-900">{tripInfo.distance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Start Time</p>
              <p className="text-lg font-semibold text-gray-900">{tripInfo.startTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-lg font-semibold text-gray-900">{tripInfo.progress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Trip Progress</h3>
          <span className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700">{tripInfo.status}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${tripInfo.progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Current Location: {tripInfo.currentLocation}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Trip Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Trip Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Trip ID</span>
                <span className="text-sm font-medium text-gray-900">{tripInfo.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Route</span>
                <span className="text-sm font-medium text-gray-900">{tripInfo.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="text-sm font-medium text-gray-900">{tripInfo.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Time</span>
                <span className="text-sm font-medium text-gray-900">{tripInfo.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Est. End Time</span>
                <span className="text-sm font-medium text-gray-900">{tripInfo.estimatedEndTime}</span>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Cargo Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="text-sm font-medium text-gray-900">{cargoDetails.type}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-medium text-gray-900">{cargoDetails.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Quantity</span>
                <span className="text-sm font-medium text-gray-900">{cargoDetails.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Value</span>
                <span className="text-sm font-medium text-gray-900">{cargoDetails.value}</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sender</p>
                <p className="text-sm font-medium text-gray-900">{cargoDetails.sender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Receiver</p>
                <p className="text-sm font-medium text-gray-900">{cargoDetails.receiver}</p>
              </div>
            </div>
          </div>

          {/* Fuel Consumption */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Fuel Consumption</h3>
            <div className="space-y-3">
              {fuelConsumption.map((fuel, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{fuel.location}</span>
                    <span className="text-sm font-semibold text-orange-600">{fuel.fuelLevel}</span>
                  </div>
                  <p className="text-xs text-gray-600">{fuel.liters}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle & Right Columns */}
        <div className="col-span-2 space-y-6">
          {/* Route Milestones */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Route Milestones</h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        milestone.status === 'Completed'
                          ? 'bg-green-100'
                          : milestone.status === 'In Progress'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                      }`}
                    >
                      {milestone.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : milestone.status === 'In Progress' ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <MapPin className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          milestone.status === 'Completed' ? 'bg-green-300' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{milestone.location}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          milestone.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : milestone.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>{milestone.time}</span>
                      <span>•</span>
                      <span>{milestone.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trip Alerts & Updates */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Trip Alerts & Updates</h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'Warning'
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === 'Warning' ? (
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
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
