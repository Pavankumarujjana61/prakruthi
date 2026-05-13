export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const buildHeaders = (hasJson = true, additionalHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = { ...additionalHeaders };

  if (hasJson) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response: Response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || response.statusText || 'Unknown API error';
    throw new ApiError(response.status, message, data?.details || data);
  }

  return data;
};

const request = async (
  path: string,
  options: {
    method?: string;
    body?: unknown;
    auth?: boolean;
    headers?: Record<string, string>;
  } = {}
) => {
  const url = `${API_BASE_URL}${path}`;
  const { method = 'GET', body, auth = true, headers = {} } = options;
  const init: RequestInit = {
    method,
    headers: buildHeaders(auth, headers),
    body: body ? JSON.stringify(body) : undefined
  };

  const response = await fetch(url, init);
  return parseResponse(response);
};

export const apiGet = async <T>(path: string, auth = true) => request(path, { method: 'GET', auth }) as Promise<T>;
export const apiPost = async <T>(path: string, body: unknown, auth = true) =>
  request(path, { method: 'POST', body, auth }) as Promise<T>;
export const apiPut = async <T>(path: string, body: unknown, auth = true) =>
  request(path, { method: 'PUT', body, auth }) as Promise<T>;
export const apiDelete = async <T>(path: string, auth = true) =>
  request(path, { method: 'DELETE', auth }) as Promise<T>;

export const getStoredRefreshToken = () => localStorage.getItem('refreshToken');
