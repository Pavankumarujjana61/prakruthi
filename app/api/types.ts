export type ApiListResponse<T> = {
  success: boolean;
  data: {
    [key: string]: T | T[] | number | { page: number; limit: number; total: number; pages: number };
  };
  error?: string;
  details?: unknown;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'driver';
  phone?: string;
  isActive?: boolean;
  lastLogin?: string;
}

export interface Vehicle {
  _id: string;
  number: string;
  type: string;
  brand: string;
  model: string;
  status: string;
  currentDriver?: User | { name: string };
  lastLocation?: string;
}

export interface Driver {
  _id: string;
  name: string;
  licenseNumber: string;
  phone: string;
  status: string;
  currentVehicle?: Vehicle;
  totalTrips: number;
}

export interface Trip {
  _id: string;
  tripId: string;
  route: {
    from: string;
    to: string;
  };
  vehicle?: Vehicle;
  driver?: Driver;
  startDate: string;
  status: string;
  distance: number;
}

export interface Maintenance {
  _id: string;
  vehicle?: Vehicle;
  serviceType: string;
  status: string;
  priority: string;
  scheduledDate: string;
  cost?: number;
}

export interface Alert {
  _id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  status: string;
  vehicle?: Vehicle;
  driver?: Driver;
}
