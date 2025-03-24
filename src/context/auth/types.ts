
import { User, Session } from '@supabase/supabase-js';

// Define Organization type
export interface Organization {
  id: string;
  name: string;
  isMainOrg?: boolean; // Identificador para a UNE CX
}

// Define User profile type
export interface UserProfile {
  id?: string; // ID do usuário
  name?: string; // Nome do usuário
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
  isSuperAdmin: boolean;
  userEmail: string | null;
  currentUser: UserProfile | null;
  currentOrganization: Organization | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPhone: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  session: Session | null;
}
