import { apiGet, apiPost, apiPut } from './client';
import type { ApiListResponse, Vehicle, Driver, Trip, Maintenance, Alert } from './types';

const buildQuery = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

export const fetchVehicles = async (params: Record<string, unknown> = {}) =>
  apiGet<ApiListResponse<Vehicle>>(`/api/vehicles${buildQuery(params)}`);

export const fetchVehicle = async (id: string) => apiGet<{ vehicle: Vehicle }>(`/api/vehicles/${id}`);
export const createVehicle = async (data: Partial<Vehicle>) => apiPost<{ vehicle: Vehicle }>('/api/vehicles', data);
export const updateVehicle = async (id: string, data: Partial<Vehicle>) =>
  apiPut<{ vehicle: Vehicle }>(`/api/vehicles/${id}`, data);

export const fetchDrivers = async (params: Record<string, unknown> = {}) =>
  apiGet<ApiListResponse<Driver>>(`/api/drivers${buildQuery(params)}`);

export const fetchTrips = async (params: Record<string, unknown> = {}) =>
  apiGet<ApiListResponse<Trip>>(`/api/trips${buildQuery(params)}`);

export const fetchMaintenance = async (params: Record<string, unknown> = {}) =>
  apiGet<ApiListResponse<Maintenance>>(`/api/maintenance${buildQuery(params)}`);

export const fetchAlerts = async (params: Record<string, unknown> = {}) =>
  apiGet<ApiListResponse<Alert>>(`/api/alerts${buildQuery(params)}`);

export const acknowledgeAlert = async (id: string) => apiPut<{ alert: Alert }>(`/api/alerts/${id}/acknowledge`, {});
export const resolveAlert = async (id: string) => apiPut<{ alert: Alert }>(`/api/alerts/${id}/resolve`, {});
