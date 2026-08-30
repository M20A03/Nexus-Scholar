import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactElement;
  redirectTo?: string;
}

/**
 * Route guard component that protects private routes.
 * Preserves the intended target location in state for post-login redirect.
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  redirectTo = '/' 
}) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

/**
 * Route guard for public-only routes (e.g. login/registration pages)
 */
export const RequireGuest: React.FC<{ children: React.ReactElement; redirectTo?: string }> = ({
  children,
  redirectTo = '/feed',
}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
