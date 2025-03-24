
export type OrganizationType = {
  id: string;
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  createdAt: string;
  products?: OrganizationProduct[];
};

export type OrganizationProduct = {
  type: 'retention' | 'billing' | 'recruitment';
  active: boolean;
};

export type NewOrganizationType = {
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  products?: OrganizationProduct[];
};
