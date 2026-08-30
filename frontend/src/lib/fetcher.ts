import toast from 'react-hot-toast';
import { ENV } from './env';

export interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  idempotent?: boolean;
  cacheKey?: string;
  silent?: boolean;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Enterprise Resilient Fetcher with Retries, Exponential Backoff, Idempotency, and Toast Notifications
 */
export async function apiFetch<T = any>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeoutMs = 10000,
    retries = 2,
    retryDelayMs = 1000,
    idempotent = true,
    cacheKey,
    silent = false,
    headers = {},
    ...customConfig
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${ENV.VITE_API_BASE_URL}${endpoint}`;
  
  // Headers setup
  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(headers as Record<string, string>),
  };

  // Attach auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && !reqHeaders['Authorization']) {
    reqHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Idempotency key for mutating requests
  const method = (customConfig.method || 'GET').toUpperCase();
  if (idempotent && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && !reqHeaders['X-Idempotency-Key']) {
    reqHeaders['X-Idempotency-Key'] = generateUUID();
  }

  let attempt = 0;
  let lastError: any = null;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...customConfig,
        method,
        headers: reqHeaders,
        signal: controller.signal,
      });

      clearTimeout(timer);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          if (!silent) {
            toast.error('Session expired. Please sign in again.');
          }
        }
        throw new ApiError('Unauthorized session', 401);
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        if (!silent) {
          toast.error('Access denied for this resource.');
        }
        throw new ApiError('Forbidden resource', 403);
      }

      // Handle 500 Server Errors
      if (response.status >= 500) {
        throw new ApiError(`Server error (${response.status})`, response.status);
      }

      const contentType = response.headers.get('content-type');
      let data: any = null;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMsg = data?.message || data?.error || `HTTP Request failed with status ${response.status}`;
        throw new ApiError(errorMsg, response.status, data);
      }

      // Save to localStorage cache if specified
      if (cacheKey && typeof window !== 'undefined' && method === 'GET') {
        try {
          localStorage.setItem(`cache_${cacheKey}`, JSON.stringify({ timestamp: Date.now(), data }));
        } catch (e) {
          // ignore cache write errors (e.g. quota exceeded)
        }
      }

      return data as T;
    } catch (err: any) {
      clearTimeout(timer);
      lastError = err;

      // Don't retry client errors (4xx) except 429 rate limit
      if (err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 429) {
        break;
      }

      attempt++;
      if (attempt <= retries) {
        // Exponential backoff with jitter
        const backoff = retryDelayMs * Math.pow(2, attempt - 1) + Math.random() * 200;
        await wait(backoff);
      }
    }
  }

  // Network/API failure - Try cache fallback if GET request
  if (cacheKey && typeof window !== 'undefined' && method === 'GET') {
    const cached = localStorage.getItem(`cache_${cacheKey}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (!silent) {
          toast('Serving cached data (Offline mode)', { icon: '📡' });
        }
        return parsed.data as T;
      } catch (e) {}
    }
  }

  const errorMessage = lastError?.message || 'Network request failed. Please check your connection.';
  if (!silent) {
    toast.error(errorMessage);
  }
  throw lastError;
}
