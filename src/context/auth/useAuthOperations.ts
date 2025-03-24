
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthState } from './hooks/useAuthState';
import { fetchUserProfile } from './api/profileApi';
import { loginWithEmail, loginWithPhone, logout } from './api/authApi';

export const useAuthOperations = () => {
  const {
    // State
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    userEmail,
    currentUser,
    currentOrganization,
    session,
    // Setters
    setIsAuthenticated,
    setIsAdmin,
    setIsSuperAdmin,
    setUserEmail,
    setCurrentUser,
    setCurrentOrganization,
    setSession,
    setUser
  } = useAuthState();
  
  // Handle user profile fetching
  const handleProfileFetch = async (userId: string) => {
    const userData = await fetchUserProfile(userId);
    if (userData) {
      setIsAdmin(userData.isAdmin);
      setIsSuperAdmin(userData.isSuperAdmin);
      setCurrentUser(userData.profile);
      setCurrentOrganization(userData.organization);
    }
  };
  
  // Reset all auth state
  const resetAuthState = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setUserEmail(null);
    setCurrentUser(null);
    setCurrentOrganization(null);
    setSession(null);
    setUser(null);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession) {
          setIsAuthenticated(true);
          setUserEmail(newSession.user.email);
          
          // Fetch user profile
          handleProfileFetch(newSession.user.id);
        } else {
          // Clear state when no session exists
          resetAuthState();
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession) {
        setIsAuthenticated(true);
        setUserEmail(existingSession.user.email);
        
        // Fetch user profile
        handleProfileFetch(existingSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Login with email wrapper function
  const login = async (email: string, password: string) => {
    return await loginWithEmail(email, password);
  };
  
  // Logout wrapper function
  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      resetAuthState();
    }
  };

  return {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    userEmail,
    currentUser,
    currentOrganization,
    session,
    login,
    loginWithPhone,
    logout: handleLogout
  };
};
