
import { ProductType } from '@/context/ProductContext';
import { UserType } from '../types';

// Função utilitária para obter o nome de exibição do produto
export const getProductDisplayName = (productType: ProductType): string => {
  switch (productType) {
    case 'retention':
      return 'Retenção de Alunos';
    case 'billing':
      return 'Cobrança de Mensalidades';
    case 'recruitment':
      return 'Captação de Alunos';
    default:
      return productType;
  }
};

// Funções utilitárias para atualizar propriedades de usuário
export const updateUserName = (user: UserType, name: string): UserType => {
  if (!user) return user;
  return { ...user, name };
};

export const updateUserEmail = (user: UserType, email: string): UserType => {
  if (!user) return user;
  return { ...user, email };
};

export const updateUserRole = (user: UserType, role: string): UserType => {
  if (!user) return user;
  return { ...user, role };
};

export const updateUserSuperAdminStatus = (user: UserType, isSuperAdmin: boolean): UserType => {
  if (!user) return user;
  return { ...user, isSuperAdmin };
};
