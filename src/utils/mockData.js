// Mock data for development without MongoDB

export const mockDrivers = [
  {
    _id: '1',
    name: 'Ramesh Kumar',
    phone: '+91-9876543210',
    license: 'TN 01 AB 1234',
    licenseNumber: 'TN 01 AB 1234',
    status: 'Active',
    currentVehicle: 'TN 45 AB 1234',
    totalTrips: 45,
    email: 'ramesh@prakruthi.com'
  },
  {
    _id: '2',
    name: 'Suresh Babu',
    phone: '+91-9876543211',
    license: 'TN 02 CD 5678',
    licenseNumber: 'TN 02 CD 5678',
    status: 'Active',
    currentVehicle: 'TN 38 CD 5678',
    totalTrips: 38,
    email: 'suresh@prakruthi.com'
  },
  {
    _id: '3',
    name: 'Manoj Kumar',
    phone: '+91-9876543212',
    license: 'TN 03 EF 2345',
    licenseNumber: 'TN 03 EF 2345',
    status: 'On Leave',
    currentVehicle: null,
    totalTrips: 32,
    email: 'manoj@prakruthi.com'
  }
];

export const mockVehicles = [
  {
    _id: '1',
    number: 'TN 45 AB 1234',
    type: 'Truck',
    brand: 'Tata',
    model: 'LPT 1612',
    status: 'Active',
    currentDriver: { name: 'Ramesh Kumar' },
    lastLocation: 'Salem - Chennai Highway',
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    number: 'TN 38 CD 5678',
    type: 'Truck',
    brand: 'Ashok Leyland',
    model: '2516',
    status: 'Active',
    currentDriver: { name: 'Suresh Babu' },
    lastLocation: 'Trichy - Salem Route',
    createdAt: '2024-02-10'
  },
  {
    _id: '3',
    number: 'TN 22 GH 3456',
    type: 'Truck',
    brand: 'Bharat Benz',
    model: '2823',
    status: 'In Maintenance',
    currentDriver: null,
    lastLocation: 'Service Center',
    createdAt: '2024-03-05'
  }
];

export const mockTrips = [
  {
    _id: '1',
    tripId: 'TRP00025',
    vehicle: 'TN 45 AB 1234',
    driver: 'Ramesh Kumar',
    route: 'Salem → Chennai',
    distance: '340 km',
    startDate: '20 May 2024',
    status: 'In Progress',
    createdAt: '2024-05-20'
  },
  {
    _id: '2',
    tripId: 'TRP00024',
    vehicle: 'TN 38 CD 5678',
    driver: 'Suresh Babu',
    route: 'Trichy → Salem',
    distance: '210 km',
    startDate: '20 May 2024',
    status: 'Loading Done',
    createdAt: '2024-05-20'
  },
  {
    _id: '3',
    tripId: 'TRP00023',
    vehicle: 'TN 22 GH 3456',
    driver: 'Manoj Kumar',
    route: 'Madurai → Coimbatore',
    distance: '165 km',
    startDate: '20 May 2024',
    status: 'Unloading Done',
    createdAt: '2024-05-20'
  }
];

export const mockMaintenance = [
  {
    _id: '1',
    vehicleNumber: 'TN 22 GH 3456',
    maintenanceType: 'Regular Servicing',
    lastServiceDate: '15 May 2024',
    nextServiceDate: '30 June 2024',
    status: 'In Progress',
    cost: 15000,
    notes: 'Oil change, filter replacement, inspection'
  },
  {
    _id: '2',
    vehicleNumber: 'TN 45 AB 1234',
    maintenanceType: 'Tire Replacement',
    lastServiceDate: '10 May 2024',
    nextServiceDate: '15 August 2024',
    status: 'Pending',
    cost: 8000,
    notes: 'All four tires need replacement'
  }
];

export const mockAlerts = [
  {
    _id: '1',
    type: 'Maintenance Due',
    message: 'Vehicle TN 22 GH 3456 maintenance is overdue',
    severity: 'high',
    vehicle: 'TN 22 GH 3456',
    createdAt: '2024-05-11'
  },
  {
    _id: '2',
    type: 'Driver Alert',
    message: 'Driver Manoj Kumar has been on leave for 3 days',
    severity: 'medium',
    driver: 'Manoj Kumar',
    createdAt: '2024-05-09'
  }
];
