
export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  organizationId?: string;
  organizationName?: string;
  isSuperAdmin?: boolean; // Novo campo para identificar admin da UNE CX
};

export type NewUserType = {
  name: string;
  email: string;
  role: string;
  password: string;
  initials: string;
  organizationId?: string;
  organizationName?: string;
  isSuperAdmin?: boolean; // Novo campo para identificar admin da UNE CX
};
