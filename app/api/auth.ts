import { apiGet, apiPost } from './client';
import type { User } from './types';

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface RefreshResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
  };
}

export const login = async (credentials: AuthLoginRequest) =>
  apiPost<AuthResponse>('/api/auth/login', credentials, false);

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
  phone?: string;
}) => apiPost<AuthResponse>('/api/auth/register', payload, false);

export const refreshToken = async (refreshToken: string) =>
  apiPost<RefreshResponse>('/api/auth/refresh', { refreshToken }, false);

export const getCurrentUser = async () => apiGet<{ user: User }>('/api/auth/me');
