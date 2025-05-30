
import { useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile, Organization } from '../types';

/**
 * Hook for managing authentication state
 */
export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return {
    // State
    isAuthenticated,
    isAdmin, 
    isSuperAdmin,
    userEmail,
    currentUser,
    currentOrganization,
    session,
    user,
    // Setters
    setIsAuthenticated,
    setIsAdmin,
    setIsSuperAdmin,
    setUserEmail,
    setCurrentUser,
    setCurrentOrganization,
    setSession,
    setUser
  };
};
