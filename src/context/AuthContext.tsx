
import { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// Define User type
interface User {
  email: string;
  role: string;
}

// Auth context type definition
export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

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
  
  // Check localStorage on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const adminStatus = localStorage.getItem("isAdmin");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus === "true");
      setUserEmail(storedEmail);
      
      // Set currentUser based on stored data
      if (storedEmail) {
        setCurrentUser({
          email: storedEmail,
          role: adminStatus === "true" ? "admin" : "user"
        });
      }
    }
  }, []);
  
  const login = (email: string, password: string): boolean => {
    // Simple mock authentication
    if (email === 'admin@escola.edu' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUserEmail(email);
      setCurrentUser({ email, role: "admin" });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userEmail", email);
      return true;
    } else if (email === 'user@escola.edu' && password === 'user123') {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setUserEmail(email);
      setCurrentUser({ email, role: "user" });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userEmail", email);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail(null);
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, userEmail, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
