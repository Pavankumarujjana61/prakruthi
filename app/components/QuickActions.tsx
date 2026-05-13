import { Plus, Play, Upload, Wrench, FileText, Users } from 'lucide-react';

const actions = [
  { icon: Plus, label: 'Add Vehicle', color: 'text-blue-600' },
  { icon: Play, label: 'Start New Trip', color: 'text-green-600' },
  { icon: Upload, label: 'Upload Document', color: 'text-purple-600' },
  { icon: Wrench, label: 'Add Maintenance', color: 'text-orange-600' },
  { icon: FileText, label: 'View Reports', color: 'text-blue-600' },
  { icon: Users, label: 'Manage Drivers', color: 'text-teal-600' },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="p-3 bg-gray-100 group-hover:bg-white rounded-lg transition-colors">
              <action.icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <span className="text-sm text-gray-700 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
