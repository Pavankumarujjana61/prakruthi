import { LucideIcon, ArrowRight } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  link: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
};

export function StatCard({ icon: Icon, title, value, link, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-start gap-4">
        <div className={`${colorClasses[color]} rounded-full p-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
        {link}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
