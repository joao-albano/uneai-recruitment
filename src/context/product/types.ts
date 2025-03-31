
export type ProductType = 
  | 'retention'
  | 'recruitment'
  | 'billing'
  | 'secretary'
  | 'emotional'
  | 'sales'
  | 'scheduling'
  | 'pedagogical';

export interface ProductSubscription {
  productId: ProductType;
  status: 'active' | 'pending' | 'expired';
  expiresAt: Date | null;
}

export interface OrganizationProduct {
  id: ProductType;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ProductContextType {
  currentProduct: ProductType | null;
  setCurrentProduct: (product: ProductType | null) => void;
  availableProducts: ProductType[];
  subscribeToProduct: (product: ProductType) => Promise<boolean>;
  hasAccessToProduct: (product: ProductType) => boolean;
  userSubscriptions?: ProductSubscription[]; // Added missing property
}
