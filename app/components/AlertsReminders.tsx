import { AlertTriangle, AlertCircle, Info, CheckCircle2, ArrowRight } from 'lucide-react';

const alerts = [
  {
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    title: 'Vehicle Tax expired for TN 38 CD 5678',
    subtitle: 'Expired on 18 May 2024',
    badge: 'Overdue',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    icon: AlertCircle,
    iconColor: 'text-orange-500',
    title: 'Pollution certificate expires in 5 days',
    subtitle: 'TN 22 GH 3456',
    badge: '5 Days Left',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Info,
    iconColor: 'text-blue-500',
    title: 'Insurance expires in 12 days',
    subtitle: 'TN 45 AB 1234',
    badge: '12 Days Left',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: AlertCircle,
    iconColor: 'text-orange-500',
    title: 'Engine Oil service due soon',
    subtitle: 'TN 07 LJ 6789 - Due in 4,500 km',
    badge: 'Due Soon',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    title: 'Wheel Alignment completed',
    subtitle: 'TN 38 CD 5678 - Completed on 18 May 2024',
    badge: 'Completed',
    badgeColor: 'bg-green-100 text-green-700',
  },
];

export function AlertsReminders() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Alerts & Reminders</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <alert.icon className={`w-5 h-5 ${alert.iconColor} mt-0.5 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{alert.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{alert.subtitle}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${alert.badgeColor} whitespace-nowrap`}>
              {alert.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
