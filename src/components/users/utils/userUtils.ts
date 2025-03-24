
import { UserType } from '../types';

// Safe update functions for user properties
export const updateUserName = (
  user: UserType | null, 
  name: string
): UserType | null => {
  if (!user) return null;
  try {
    return {...user, name};
  } catch (error) {
    console.error("Error updating user name:", error);
    return user;
  }
};

export const updateUserEmail = (
  user: UserType | null, 
  email: string
): UserType | null => {
  if (!user) return null;
  try {
    return {...user, email};
  } catch (error) {
    console.error("Error updating user email:", error);
    return user;
  }
};

export const updateUserRole = (
  user: UserType | null, 
  role: string
): UserType | null => {
  if (!user) return null;
  try {
    return {...user, role};
  } catch (error) {
    console.error("Error updating user role:", error);
    return user;
  }
};

export const updateUserSuperAdminStatus = (
  user: UserType | null, 
  isSuperAdmin: boolean
): UserType | null => {
  if (!user) return null;
  try {
    return {...user, isSuperAdmin};
  } catch (error) {
    console.error("Error updating super admin status:", error);
    return user;
  }
};

// Helper to translate product types to readable names
export const getProductDisplayName = (productType: string): string => {
  const productNames: Record<string, string> = {
    'retention': 'Retenção',
    'billing': 'Cobrança',
    'recruitment': 'Recrutamento'
  };
  
  return productNames[productType] || productType;
};
