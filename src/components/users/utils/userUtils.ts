
import { UserType, NewUserType } from '../types';
import { ProductType } from '@/context/ProductContext';

// Função para gerar iniciais a partir do nome
export const generateInitials = (name: string): string => {
  if (!name) return '';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Função para atualizar o status de super admin do usuário
export const updateUserSuperAdminStatus = (user: UserType, isSuperAdmin: boolean): UserType => {
  return {
    ...user,
    isSuperAdmin,
    // Se for super admin, já define o papel como superadmin
    role: isSuperAdmin ? 'superadmin' : user.role
  };
};

// Obter nome de exibição do produto
export const getProductDisplayName = (productType: ProductType): string => {
  switch(productType) {
    case 'retention':
      return 'Retenção de Alunos';
    case 'billing':
      return 'Cobrança de Mensalidades';
    case 'recruitment':
      return 'Captação de Alunos';
    case 'secretary':
      return 'Secretaria';
    case 'pedagogical':
      return 'Pedagógico';
    default:
      return productType;
  }
};

// Outras funções relacionadas a usuários podem ser adicionadas aqui
