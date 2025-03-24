
import { UserType, NewUserType } from '../types';

// Initial state values for the user management system
export const initialNewUser: NewUserType = {
  name: '',
  email: '',
  role: 'user',
  password: '',
  initials: '',
  organizationId: '1',
  organizationName: 'Escola de Letras'
};

// Initial users data for demonstration
export const initialUsers: UserType[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', initials: 'AU', organizationId: '1', organizationName: 'Escola de Letras' },
  { id: '2', name: 'Maria Silva', email: 'maria@example.com', role: 'user', initials: 'MS', organizationId: '1', organizationName: 'Escola de Letras' },
  { id: '3', name: 'João Santos', email: 'joao@example.com', role: 'user', initials: 'JS', organizationId: '1', organizationName: 'Escola de Letras' },
  { id: '4', name: 'Carlos Mendes', email: 'carlos@outraescola.com', role: 'admin', initials: 'CM', organizationId: '2', organizationName: 'Outra Escola' },
  { id: '5', name: 'Ana Paula', email: 'ana@outraescola.com', role: 'user', initials: 'AP', organizationId: '2', organizationName: 'Outra Escola' },
];
