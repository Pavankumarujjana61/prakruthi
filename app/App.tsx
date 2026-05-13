import { useState } from 'react';
import { Car, Route, CircleDot, CheckCircle2, AlertCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { TripStatusChart } from './components/TripStatusChart';
import { AlertsReminders } from './components/AlertsReminders';
import { RecentTrips } from './components/RecentTrips';
import { VehicleStatus } from './components/VehicleStatus';
import { UpcomingMaintenance } from './components/UpcomingMaintenance';
import { QuickActions } from './components/QuickActions';
import { VehiclesPage } from './components/VehiclesPage';
import { TripManagementPage } from './components/TripManagementPage';
import { DriversPage } from './components/DriversPage';
import { MaintenancePage } from './components/MaintenancePage';
import { VehicleDetails } from './components/VehicleDetails';
import { DriverDetails } from './components/DriverDetails';
import { AlertsNotificationsPage } from './components/AlertsNotificationsPage';
import { TripDetails } from './components/TripDetails';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const renderPage = () => {
    if (selectedVehicle) {
      return <VehicleDetails onBack={() => setSelectedVehicle(null)} />;
    }

    if (selectedDriver) {
      return <DriverDetails onBack={() => setSelectedDriver(null)} />;
    }

    if (selectedTrip) {
      return <TripDetails onBack={() => setSelectedTrip(null)} />;
    }

    switch (currentPage) {
      case 'vehicles':
        return <VehiclesPage onViewDetails={(vehicle) => setSelectedVehicle(vehicle)} />;
      case 'trips':
        return <TripManagementPage onViewDetails={(trip) => setSelectedTrip(trip)} />;
      case 'drivers':
        return <DriversPage onViewDetails={(driver) => setSelectedDriver(driver)} />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'alerts':
        return <AlertsNotificationsPage />;
      case 'documents':
      case 'fuel':
      case 'reports':
      case 'users':
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page
              </h2>
              <p className="text-gray-600">This page is under development</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <StatCard
                icon={Car}
                title="Total Vehicles"
                value={30}
                link="View All Vehicles"
                color="blue"
              />
              <StatCard
                icon={Route}
                title="Active Trips"
                value={12}
                link="View All Trips"
                color="green"
              />
              <StatCard
                icon={CircleDot}
                title="In Progress"
                value={6}
                link="View Details"
                color="orange"
              />
              <StatCard
                icon={CheckCircle2}
                title="Completed Today"
                value={4}
                link="View Details"
                color="purple"
              />
              <StatCard
                icon={AlertCircle}
                title="Pending Alerts"
                value={8}
                link="View Alerts"
                color="red"
              />
            </div>

            {/* Trip Status & Alerts */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <TripStatusChart />
              <AlertsReminders />
            </div>

            {/* Recent Trips & Vehicle Status */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <RecentTrips />
              </div>
              <VehicleStatus />
            </div>

            {/* Upcoming Maintenance & Quick Actions */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <UpcomingMaintenance />
              </div>
              <QuickActions />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}