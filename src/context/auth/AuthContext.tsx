
import { createContext } from 'react';
import { AuthContextType } from './types';
import { useAuthOperations } from './useAuthOperations';

// Create the context with a default value matching the interface
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  isSuperAdmin: false,
  userEmail: null,
  currentUser: null,
  currentOrganization: null,
  session: null,
  login: async () => ({ success: false }),
  loginWithPhone: async () => ({ success: false }),
  logout: async () => false, // Changed to return boolean to match type
});

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authOperations = useAuthOperations();
  
  return (
    <AuthContext.Provider value={authOperations}>
      {children}
    </AuthContext.Provider>
  );
};
