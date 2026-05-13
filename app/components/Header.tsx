import { Menu, Calendar, Bell, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, Admin User!</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Date Picker */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm">20 May 2024</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
            alt="Admin User"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">Admin User</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
