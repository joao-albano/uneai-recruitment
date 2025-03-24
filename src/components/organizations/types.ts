
export type OrganizationType = {
  id: string;
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
  createdAt: string;
};

export type NewOrganizationType = {
  name: string;
  isActive: boolean;
  isMainOrg?: boolean;
};
