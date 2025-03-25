
import { ProductType } from '@/context/ProductContext';

export type OrganizationType = {
  id: string;
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  createdAt?: string;
  updatedAt?: string;
  products?: OrganizationProduct[];
};

export type OrganizationProduct = {
  type: ProductType;
  active: boolean;
};

export type NewOrganizationType = {
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  products?: OrganizationProduct[];
};

// Add new type for plans in the context of organizations
export type OrganizationPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  relatedProduct?: ProductType;
  features?: string[];
};
