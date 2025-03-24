
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
    try {
      const userData = await fetchUserProfile(userId);
      if (userData) {
        console.log('Setting auth states with user data:', userData);
        setIsAdmin(userData.isAdmin || false);
        setIsSuperAdmin(userData.isSuperAdmin || false);
        setCurrentUser(userData.profile);
        setCurrentOrganization(userData.organization);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
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
    let isSubscribed = true;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        if (!isSubscribed) return;
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession) {
          setIsAuthenticated(true);
          setUserEmail(newSession.user.email);
          
          // Fetch user profile
          handleProfileFetch(newSession.user.id);
        } else if (event === 'SIGNED_OUT') {
          // Clear state when no session exists
          resetAuthState();
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        console.log('Existing session:', existingSession);
        
        if (!isSubscribed) return;
        
        setSession(existingSession);
        setUser(existingSession?.user ?? null);
        
        if (existingSession) {
          setIsAuthenticated(true);
          setUserEmail(existingSession.user.email);
          
          // Fetch user profile
          handleProfileFetch(existingSession.user.id);
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
      }
    };
    
    initializeAuth();

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, []);
  
  // Login with email wrapper function
  const login = async (email: string, password: string) => {
    return await loginWithEmail(email, password);
  };
  
  // Logout wrapper function
  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        resetAuthState();
      }
      return success;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      return false;
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
