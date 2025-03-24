
import { createContext, useContext, useState, useEffect } from 'react';

// Define Organization type
interface Organization {
  id: string;
  name: string;
  isMainOrg?: boolean; // Identificador para a UNE CX
}

// Define User type
interface User {
  email: string;
  role: string;
  organizationId?: string;
  organization?: Organization;
  isSuperAdmin?: boolean; // Admin da UNE CX
}

// Auth context type definition
export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean; // Nova propriedade
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
  isSuperAdmin: false, // Nova propriedade
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
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false); // Novo estado
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  
  // Check localStorage on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const adminStatus = localStorage.getItem("isAdmin");
    const superAdminStatus = localStorage.getItem("isSuperAdmin"); // Novo item
    const storedEmail = localStorage.getItem("userEmail");
    const storedOrgId = localStorage.getItem("organizationId");
    const storedOrgName = localStorage.getItem("organizationName");
    const isMainOrg = localStorage.getItem("isMainOrg"); // Novo item
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus === "true");
      setIsSuperAdmin(superAdminStatus === "true"); // Novo estado
      setUserEmail(storedEmail);
      
      // Set organization data if available
      if (storedOrgId && storedOrgName) {
        const org = {
          id: storedOrgId,
          name: storedOrgName,
          isMainOrg: isMainOrg === "true" // Novo campo
        };
        setCurrentOrganization(org);
      }
      
      // Set currentUser based on stored data
      if (storedEmail) {
        setCurrentUser({
          email: storedEmail,
          role: adminStatus === "true" ? "admin" : "user",
          organizationId: storedOrgId,
          organization: storedOrgId && storedOrgName ? { 
            id: storedOrgId, 
            name: storedOrgName,
            isMainOrg: isMainOrg === "true" // Novo campo
          } : undefined,
          isSuperAdmin: superAdminStatus === "true" // Novo campo
        });
      }
    }
  }, []);
  
  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    if (email === 'admin@unecx.com' && password === 'admin123') {
      // Super Admin da UNE CX
      const org = { id: '0', name: 'UNE CX', isMainOrg: true };
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsSuperAdmin(true); // É super admin
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "admin",
        organizationId: org.id,
        organization: org,
        isSuperAdmin: true
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isSuperAdmin", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      localStorage.setItem("isMainOrg", "true");
      return true;
    } else if (email === 'admin@escola.edu' && password === 'admin123') {
      // Admin da Escola de Letras (apenas admin da escola, não da plataforma)
      const org = { id: '1', name: 'Escola de Letras', isMainOrg: false };
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsSuperAdmin(false); // Não é super admin
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "admin",
        organizationId: org.id,
        organization: org,
        isSuperAdmin: false
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isSuperAdmin", "false");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      localStorage.setItem("isMainOrg", "false");
      return true;
    } else if (email === 'user@escola.edu' && password === 'user123') {
      // Usuário da Escola de Letras
      const org = { id: '1', name: 'Escola de Letras', isMainOrg: false };
      setIsAuthenticated(true);
      setIsAdmin(false);
      setIsSuperAdmin(false); // Não é super admin
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "user",
        organizationId: org.id,
        organization: org,
        isSuperAdmin: false
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("isSuperAdmin", "false");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      localStorage.setItem("isMainOrg", "false");
      return true;
    } else if (email === 'admin@outraescola.com' && password === 'admin123') {
      // Admin de Outra Escola (apenas admin da escola, não da plataforma)
      const org = { id: '2', name: 'Outra Escola', isMainOrg: false };
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsSuperAdmin(false); // Não é super admin
      setUserEmail(email);
      setCurrentOrganization(org);
      setCurrentUser({ 
        email, 
        role: "admin",
        organizationId: org.id,
        organization: org,
        isSuperAdmin: false
      });
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isSuperAdmin", "false");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("organizationId", org.id);
      localStorage.setItem("organizationName", org.name);
      localStorage.setItem("isMainOrg", "false");
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSuperAdmin(false); // Limpar estado de super admin
    setUserEmail(null);
    setCurrentUser(null);
    setCurrentOrganization(null);
    
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isSuperAdmin"); // Remover item de super admin
    localStorage.removeItem("userEmail");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("organizationName");
    localStorage.removeItem("isMainOrg"); // Remover item de org principal
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin, 
      isSuperAdmin, // Nova propriedade
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
