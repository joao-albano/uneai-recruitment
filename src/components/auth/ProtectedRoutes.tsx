
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Protected route component
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin route component - only accessible to admins
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // First check if authenticated, then check if admin
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but not admin, redirect to dashboard
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};
