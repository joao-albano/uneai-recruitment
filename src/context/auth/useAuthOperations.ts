
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
  isSuperAdmin: false // Default is not a super admin
};

// Special UNE CX Super Admin mock data
const SUPER_ADMIN_USER = {
  id: 'super-admin-id',
  name: 'Paula Martins',
  email: 'paula.martins@une.cx',
  role: 'admin',
  organizationId: 'une-cx-org-id',
  organization: {
    id: 'une-cx-org-id',
    name: 'UNE CX',
    isMainOrg: true
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
      // Check if the user is the special super admin
      const isSuperAdmin = email.toLowerCase() === 'paula.martins@une.cx';
      const userToUse = isSuperAdmin ? SUPER_ADMIN_USER : MOCK_USER;
      
      // Set auth state based on the user type
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsSuperAdmin(isSuperAdmin);
      setUserEmail(email);
      setCurrentUser(userToUse);
      setCurrentOrganization(userToUse.organization);
      
      // Create a mock session object with all required properties
      const mockSession = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_at: Date.now() + 3600000, // One hour from now
        expires_in: 3600, // Expires in 1 hour (seconds)
        token_type: 'bearer', // Standard token type for JWT
        user: {
          id: userToUse.id,
          email: email,
          app_metadata: {},
          user_metadata: {
            full_name: userToUse.name
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
