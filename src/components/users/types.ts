
export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  organizationId?: string;
  organizationName?: string;
};

export type NewUserType = {
  name: string;
  email: string;
  role: string;
  password: string;
  initials: string;
  organizationId?: string;
  organizationName?: string;
};
