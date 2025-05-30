
export type UserRole = 'superadmin' | 'admin' | 'gestor' | 'coordenador' | 'gerente' | 'professor' | 'financeiro' | 'vendedor' | 'medico' | 'atendente' | 'user';

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  organizationId?: string;
  organizationName?: string;
  isSuperAdmin?: boolean; // Identifies UNE CX admin
};

export type NewUserType = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  initials: string;
  organizationId?: string;
  organizationName?: string;
  isSuperAdmin?: boolean; // Identifies UNE CX admin
};
