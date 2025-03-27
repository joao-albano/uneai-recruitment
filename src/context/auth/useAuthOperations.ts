
import { useEffect } from 'react';
import { useAuthState } from './hooks/useAuthState';
import { loginWithEmail, loginWithPhone, logout } from './api/authApi';

// Mock user data for testing
const MOCK_USER = {
  id: 'mock-user-id',
  name: 'Usuário Teste',
  email: 'usuario@teste.com',
  role: 'admin',
  organizationId: 'mock-org-id',
  organization: {
    id: 'mock-org-id',
    name: 'Organização Teste',
    isMainOrg: false
  },
  isSuperAdmin: true
};

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
  
  // Login wrapper function
  const login = async (email: string, password: string) => {
    const result = await loginWithEmail(email, password);
    
    if (result.success) {
      // Set mock auth state for testing
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsSuperAdmin(true);
      setUserEmail(email);
      setCurrentUser(MOCK_USER);
      setCurrentOrganization(MOCK_USER.organization);
      
      // Create a mock session object
      const mockSession = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_at: Date.now() + 3600000, // One hour from now
        user: {
          id: MOCK_USER.id,
          email: email,
          app_metadata: {},
          user_metadata: {
            full_name: MOCK_USER.name
          },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }
      };
      
      setSession(mockSession);
      setUser(mockSession.user);
    }
    
    return result;
  };
  
  // Logout wrapper function
  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        // Reset auth state
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setUserEmail(null);
        setCurrentUser(null);
        setCurrentOrganization(null);
        setSession(null);
        setUser(null);
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
