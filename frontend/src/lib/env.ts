/**
 * Runtime and Build-Time Environment Variable Validator
 */

interface ClientEnv {
  VITE_API_BASE_URL: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
}

function validateEnv(): ClientEnv {
  const isProd = import.meta.env.PROD;
  const isDev = import.meta.env.DEV;
  
  // Default fallback to current host or configured URL
  const apiBase = import.meta.env.VITE_API_BASE_URL || 
    (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:8001'
      : 'https://nexus-scholar-coral.vercel.app');

  return {
    VITE_API_BASE_URL: apiBase,
    IS_PRODUCTION: isProd,
    IS_DEVELOPMENT: isDev,
  };
}

export const ENV = validateEnv();
