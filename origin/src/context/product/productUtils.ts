
import { ProductType } from './types';

// Function to determine the current product based on the URL path
export const determineProductFromPath = (path: string): ProductType | null => {
  if (path.startsWith('/dashboard') || path.startsWith('/model') || path.startsWith('/upload')) {
    return 'retention';
  }
  
  if (path.startsWith('/recruitment')) {
    return 'recruitment';
  }
  
  if (path.startsWith('/billing')) {
    return 'billing';
  }
  
  if (path.startsWith('/secretary')) {
    return 'secretary';
  }
  
  if (path.startsWith('/emotional')) {
    return 'emotional';
  }
  
  if (path.startsWith('/sales')) {
    return 'sales';
  }
  
  if (path.startsWith('/schedule')) {
    return 'scheduling';
  }
  
  if (path.startsWith('/pedagogical')) {
    return 'pedagogical';
  }
  
  if (path.startsWith('/finance')) {
    return 'finance';
  }
  
  return null;
};
