
import { supabase } from '@/integrations/supabase/client';
import { UserType, NewUserType, UserRole } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Busca todos os usuários com seus perfis e organizações
 */
export const fetchUsers = async () => {
  try {
    console.log('Simulando busca de usuários (modo de teste)');
    
    // Retornar dados de teste em vez de buscar do banco
    return [
      // Super Admins (UNE CX)
      {
        id: 'user-1',
        email: 'paula.martins@une.cx',
        role: 'admin',
        is_admin: true,
        is_super_admin: true,
        organization_id: 'une-cx-org-id',
        organizations: {
          id: 'une-cx-org-id',
          name: 'UNE CX'
        }
      },
      {
        id: 'user-2',
        email: 'super.admin@une.cx',
        role: 'admin',
        is_admin: true,
        is_super_admin: true,
        organization_id: 'une-cx-org-id',
        organizations: {
          id: 'une-cx-org-id',
          name: 'UNE CX'
        }
      },
      // Regular organization users
      {
        id: 'user-3',
        email: 'admin@escola.com',
        role: 'admin',
        is_admin: true,
        is_super_admin: false,
        organization_id: 'mock-org-id',
        organizations: {
          id: 'mock-org-id',
          name: 'Escola Exemplo'
        }
      },
      {
        id: 'user-4',
        email: 'professor@escola.com',
        role: 'professor',
        is_admin: false,
        is_super_admin: false,
        organization_id: 'mock-org-id',
        organizations: {
          id: 'mock-org-id',
          name: 'Escola Exemplo'
        }
      },
      {
        id: 'user-5',
        email: 'medico@clinica.com',
        role: 'medico',
        is_admin: false,
        is_super_admin: false,
        organization_id: 'clinic-org-id',
        organizations: {
          id: 'clinic-org-id',
          name: 'Clínica Saúde'
        }
      },
      {
        id: 'user-6',
        email: 'gestor@empresa.com',
        role: 'gestor',
        is_admin: false,
        is_super_admin: false,
        organization_id: 'company-org-id',
        organizations: {
          id: 'company-org-id',
          name: 'Empresa ABC'
        }
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

/**
 * Busca todas as organizações disponíveis
 */
export const fetchOrganizations = async () => {
  try {
    console.log('Simulando busca de organizações (modo de teste)');
    
    // Retornar dados de teste em vez de buscar do banco
    return [
      {
        id: 'une-cx-org-id',
        name: 'UNE CX'
      },
      {
        id: 'mock-org-id',
        name: 'Escola Exemplo'
      },
      {
        id: 'clinic-org-id',
        name: 'Clínica Saúde'
      },
      {
        id: 'company-org-id',
        name: 'Empresa ABC'
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    return [];
  }
};

/**
 * Cria um novo usuário (simulado)
 */
export const createUser = async (userData: NewUserType) => {
  try {
    console.log('Criando usuário (modo de simulação):', userData);
    
    // Validar dados básicos
    if (!userData.email) {
      throw new Error('Email é obrigatório');
    }
    if (!userData.password) {
      throw new Error('Senha é obrigatória');
    }
    
    // Simular criação de usuário com ID aleatório
    return {
      id: uuidv4(),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      organization_id: userData.organizationId,
      is_admin: userData.role === 'admin',
      is_super_admin: userData.isSuperAdmin || false
    };
  } catch (error) {
    console.error('Erro ao criar usuário (simulado):', error);
    throw error;
  }
};

/**
 * Atualiza um usuário existente (simulado)
 */
export const updateUser = async (userId: string, userData: Partial<UserType>) => {
  try {
    console.log('Atualizando usuário (modo de simulação):', userId, userData);
    return true;
  } catch (error) {
    console.error('Erro ao atualizar usuário (simulado):', error);
    throw error;
  }
};

/**
 * Exclui um usuário (simulado)
 */
export const deleteUser = async (userId: string) => {
  try {
    console.log('Excluindo usuário (modo de simulação):', userId);
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário (simulado):', error);
    throw error;
  }
};
