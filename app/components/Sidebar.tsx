import {
  LayoutDashboard,
  Car,
  Route,
  Users,
  Wrench,
  FileText,
  Bell,
  Fuel,
  BarChart3,
  UserCog,
  Settings,
  LogOut,
  Truck
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'vehicles', icon: Car, label: 'Vehicles' },
  { id: 'trips', icon: Route, label: 'Trip Management' },
  { id: 'drivers', icon: Users, label: 'Driver Management' },
  { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
  { id: 'documents', icon: FileText, label: 'Documents & Certificates' },
  { id: 'alerts', icon: Bell, label: 'Alerts & Notifications', badge: 8 },
  { id: 'fuel', icon: Fuel, label: 'Fuel & Expenses' },
  { id: 'reports', icon: BarChart3, label: 'Reports & Analytics' },
  { id: 'users', icon: UserCog, label: 'Users & Roles' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-[#0f172a] text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <Truck className="w-8 h-8 text-blue-400" />
        <div>
          <div className="font-semibold text-lg">FleetCare</div>
          <div className="text-xs text-gray-400">Admin Panel</div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors relative ${
              currentPage === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
            {currentPage === item.id && (
              <div className="absolute right-2 w-1 h-6 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
