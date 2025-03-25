
import { User, Session } from '@supabase/supabase-js';

export type LoginResult = {
  success: boolean;
  message?: string;
  error?: any;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId?: string;
  organization?: Organization | null;
  isSuperAdmin?: boolean;
};

export type Organization = {
  id: string;
  name: string;
  isMainOrg?: boolean;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userEmail: string | null;
  currentUser: UserProfile | null;
  currentOrganization: Organization | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  loginWithPhone: (phone: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<boolean>;
};
