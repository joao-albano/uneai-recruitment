
import { ReactNode } from 'react';

export type ProductType = 'retention' | 'sales' | 'scheduling' | 'recruitment' | 'secretary' | 'pedagogical' | 'billing';

export interface ProductSubscription {
  id: string;
  productType: ProductType;
  startDate: Date;
  status: 'active' | 'inactive' | 'pending' | 'trial';
}

export interface OrganizationProduct {
  id: string;
  productType: ProductType;
  isActive: boolean;
}

export interface ProductContextType {
  currentProduct: ProductType | null;
  setCurrentProduct: (product: ProductType) => void;
  userSubscriptions: ProductSubscription[];
  subscribeToProduct: (productType: ProductType) => Promise<boolean>;
  availableProducts: ProductType[];
  hasAccessToProduct: (productType: ProductType) => boolean;
  organizations: any[]; // For type satisfaction
}
