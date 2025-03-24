
import { ProductType } from '@/context/ProductContext';

export type OrganizationType = {
  id: string;
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  createdAt: string;
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
