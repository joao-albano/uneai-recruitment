
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

// Protected route component
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin route component - accessible to all admins (tanto super quanto escola)
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // First check if authenticated, then check if admin
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but not admin, redirect to dashboard
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

// Super admin route component - only accessible to UNE CX admins
export const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  
  // First check if authenticated, then check if super admin
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated but not super admin, redirect to dashboard
  return isSuperAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};
