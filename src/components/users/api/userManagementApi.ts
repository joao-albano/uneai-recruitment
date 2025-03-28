
import { supabase } from '@/integrations/supabase/client';
import { UserType, NewUserType } from '../types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Busca todos os usuários com seus perfis e organizações
 */
export const fetchUsers = async () => {
  try {
    console.log('Simulando busca de usuários (modo de teste)');
    
    // Retornar dados de teste em vez de buscar do banco
    return [
      {
        id: 'user-1',
        email: 'admin@teste.com',
        role: 'admin',
        is_admin: true,
        is_super_admin: false,
        organization_id: 'mock-org-id',
        organizations: {
          id: 'mock-org-id',
          name: 'Organização Teste'
        }
      },
      {
        id: 'user-2',
        email: 'usuario@teste.com',
        role: 'user',
        is_admin: false,
        is_super_admin: false,
        organization_id: 'mock-org-id',
        organizations: {
          id: 'mock-org-id',
          name: 'Organização Teste'
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
        id: 'mock-org-id',
        name: 'Organização Teste'
      },
      {
        id: 'une-cx-org-id',
        name: 'UNE CX'
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
