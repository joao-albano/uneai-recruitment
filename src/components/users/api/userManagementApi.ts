
import { supabase } from '@/integrations/supabase/client';
import { UserType, NewUserType } from '../types';

/**
 * Busca todos os usuários com seus perfis e organizações
 */
export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        role,
        is_admin,
        is_super_admin,
        organization_id,
        organizations(name)
      `);
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

/**
 * Busca organizações disponíveis
 */
export const fetchOrganizations = async () => {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .select('id, name');
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};

/**
 * Cria um novo usuário
 */
export const createUser = async (userData: NewUserType) => {
  try {
    // Criar usuário usando a API de Admin
    const { data, error } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password || '',
      email_confirm: true,
      user_metadata: { full_name: userData.name }
    });
    
    if (error) {
      throw error;
    }
    
    if (!data.user) {
      throw new Error('Usuário não foi criado');
    }
    
    // Atualizar o perfil do usuário com informações adicionais
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: userData.role,
        is_admin: userData.role === 'admin',
        is_super_admin: userData.isSuperAdmin || false,
        organization_id: userData.organizationId
      })
      .eq('id', data.user.id);
    
    if (profileError) {
      throw profileError;
    }
    
    return data.user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

/**
 * Atualiza um usuário existente
 */
export const updateUser = async (userId: string, userData: Partial<UserType>) => {
  try {
    // Atualizar metadata do usuário se necessário
    if (userData.name || userData.email) {
      const { error: authError } = await supabase.auth.admin.updateUserById(
        userId,
        {
          email: userData.email,
          user_metadata: userData.name ? { full_name: userData.name } : undefined
        }
      );
      
      if (authError) {
        throw authError;
      }
    }
    
    // Atualizar o perfil do usuário
    const { error } = await supabase
      .from('profiles')
      .update({
        role: userData.role,
        is_admin: userData.role === 'admin',
        is_super_admin: userData.isSuperAdmin,
        organization_id: userData.organizationId
      })
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

/**
 * Exclui um usuário
 */
export const deleteUser = async (userId: string) => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};
