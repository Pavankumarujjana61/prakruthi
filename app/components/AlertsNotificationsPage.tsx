import { AlertTriangle, AlertCircle, Info, CheckCircle2, Bell, Filter, Search, X } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Vehicle Tax Expired',
    vehicle: 'TN 38 CD 5678',
    description: 'Vehicle tax certificate has expired on 18 May 2024. Immediate action required.',
    date: '20 May 2024',
    time: '09:30 AM',
    status: 'Overdue',
    priority: 'High',
  },
  {
    id: 2,
    type: 'warning',
    icon: AlertCircle,
    title: 'Battery Replacement Due',
    vehicle: 'TN 45 AB 1234',
    description: 'Vehicle battery is 3 years old. Replacement recommended within 7 days.',
    date: '20 May 2024',
    time: '08:15 AM',
    status: 'Due Soon',
    priority: 'Medium',
  },
  {
    id: 3,
    type: 'warning',
    icon: AlertCircle,
    title: 'Pollution Certificate Expiring',
    vehicle: 'TN 22 GH 3456',
    description: 'Pollution certificate expires in 5 days on 25 May 2024.',
    date: '20 May 2024',
    time: '07:45 AM',
    status: 'Expiring Soon',
    priority: 'Medium',
  },
  {
    id: 4,
    type: 'info',
    icon: Info,
    title: 'Insurance Renewal Due',
    vehicle: 'TN 45 AB 1234',
    description: 'Vehicle insurance expires in 12 days on 01 June 2024.',
    date: '20 May 2024',
    time: '07:00 AM',
    status: 'Upcoming',
    priority: 'Low',
  },
  {
    id: 5,
    type: 'warning',
    icon: AlertCircle,
    title: 'Engine Oil Service Due',
    vehicle: 'TN 07 LJ 6789',
    description: 'Next oil change due in 4,500 km or within 15 days.',
    date: '19 May 2024',
    time: '04:20 PM',
    status: 'Due Soon',
    priority: 'Medium',
  },
  {
    id: 6,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Brake Pad Wear Alert',
    vehicle: 'TN 19 EF 9012',
    description: 'Brake pad thickness below recommended level. Immediate inspection required.',
    date: '19 May 2024',
    time: '02:10 PM',
    status: 'Urgent',
    priority: 'High',
  },
  {
    id: 7,
    type: 'info',
    icon: Info,
    title: 'Tire Rotation Recommended',
    vehicle: 'TN 12 XY 3421',
    description: 'Vehicle has completed 10,000 km. Tire rotation recommended.',
    date: '19 May 2024',
    time: '11:30 AM',
    status: 'Recommended',
    priority: 'Low',
  },
  {
    id: 8,
    type: 'success',
    icon: CheckCircle2,
    title: 'Wheel Alignment Completed',
    vehicle: 'TN 38 CD 5678',
    description: 'Wheel alignment service completed successfully on 18 May 2024.',
    date: '18 May 2024',
    time: '03:45 PM',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 9,
    type: 'warning',
    icon: AlertCircle,
    title: 'Coolant Level Low',
    vehicle: 'TN 22 GH 3456',
    description: 'Coolant level detected below minimum. Top-up required.',
    date: '18 May 2024',
    time: '10:20 AM',
    status: 'Action Required',
    priority: 'Medium',
  },
  {
    id: 10,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Fitness Certificate Expired',
    vehicle: 'TN 07 LJ 6789',
    description: 'Fitness certificate expired on 15 May 2024. Vehicle cannot operate legally.',
    date: '17 May 2024',
    time: '09:00 AM',
    status: 'Overdue',
    priority: 'High',
  },
];

export function AlertsNotificationsPage() {
  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;
  const infoCount = alerts.filter(a => a.type === 'info').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Alerts & Notifications</h1>
          <p className="text-sm text-gray-500">Stay updated on vehicle maintenance and compliance</p>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Mark All as Read
        </button>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-semibold text-red-600">{criticalCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-semibold text-orange-600">{warningCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Information</p>
              <p className="text-2xl font-semibold text-blue-600">{infoCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-semibold text-green-600">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts by vehicle, type, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Alerts List */}
        <div className="divide-y divide-gray-100">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            const bgColor =
              alert.type === 'critical' ? 'bg-red-50 border-red-200' :
              alert.type === 'warning' ? 'bg-orange-50 border-orange-200' :
              alert.type === 'success' ? 'bg-green-50 border-green-200' :
              'bg-blue-50 border-blue-200';

            const iconColor =
              alert.type === 'critical' ? 'text-red-600' :
              alert.type === 'warning' ? 'text-orange-600' :
              alert.type === 'success' ? 'text-green-600' :
              'text-blue-600';

            const statusColor =
              alert.priority === 'High' ? 'bg-red-100 text-red-700' :
              alert.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700';

            return (
              <div key={alert.id} className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${bgColor}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${alert.type === 'critical' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-orange-100' : alert.type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-0.5">Vehicle: {alert.vehicle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${statusColor}`}>
                          {alert.status}
                        </span>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{alert.date}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                      <span>•</span>
                      <span className={`font-medium ${
                        alert.priority === 'High' ? 'text-red-600' :
                        alert.priority === 'Medium' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {alert.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
