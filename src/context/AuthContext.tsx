
import { createContext, useContext, useState, useEffect } from 'react';

// Define Organization type
interface Organization {
  id: string;
  name: string;
}

// Define User type
interface User {
  email: string;
  role: string;
  organizationId?: string;
  organization?: Organization;
}

// Auth context type definition
export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  currentUser: User | null;
  currentOrganization: Organization | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Create the context with a default value matching the interface
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  userEmail: null,
  currentUser: null,
  currentOrganization: null,
  login: () => false,
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  
  // Check localStorage on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const adminStatus = localStorage.getItem("isAdmin");
    const storedEmail = localStorage.getItem("userEmail");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedOrgName = localStorage.getItem("organizationName");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus === "true");
      setUserEmail(storedEmail);
      
      // Set organization data if available
      if (storedOrgId && storedOrgName) {
        const org = {
          id: storedOrgId,
          name: storedOrgName
        };
        setCurrentOrganization(org);
      }
      
      // Set currentUser based on stored data
      if (storedEmail) {
        setCurrentUser({
          email: storedEmail,
          role: adminStatus === "true" ? "admin" : "user",
          organizationId: storedOrgId,
          organization: storedOrgId && storedOrgName ? { id: storedOrgId, name: storedOrgName } : undefined
        });
      }
    }
  }, []);
  
  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    if (email === 'admin@escola.edu' && password === 'admin123') {
      // Admin da Escola de Letras
      const org = { id: '1', name: 'Escola de Letras' };
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "admin",
        organizationId: org.id,
        organization: org
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      return true;
    } else if (email === 'user@escola.edu' && password === 'user123') {
      // Usuário da Escola de Letras
      const org = { id: '1', name: 'Escola de Letras' };
      setIsAuthenticated(true);
      setIsAdmin(false);
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "user",
        organizationId: org.id,
        organization: org
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      return true;
    } else if (email === 'admin@outraescola.com' && password === 'admin123') {
      // Admin de Outra Escola
      const org = { id: '2', name: 'Outra Escola' };
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "admin",
        organizationId: org.id,
        organization: org
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail(null);
    setCurrentUser(null);
    setCurrentOrganization(null);
    
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("organizationName");
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin, 
      userEmail, 
      currentUser, 
      currentOrganization,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
