
import { supabase } from '@/integrations/supabase/client';
import { UserType, NewUserType } from '../types';

/**
 * Busca todos os usuários com seus perfis e organizações
 */
export const fetchUsers = async () => {
  try {
    // Consulta que respeita as políticas RLS - Super admins verão todos os usuários,
    // admins verão apenas os da sua organização
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        email,
        role,
        is_admin,
        is_super_admin,
        organization_id,
        organizations(id, name)
      `);
    
    if (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

/**
 * Busca organizações disponíveis - modificada para buscar diretamente sem RLS
 * para garantir que super admins sempre vejam todas as organizações
 */
export const fetchOrganizations = async () => {
  try {
    console.log('Iniciando busca de organizações com método aprimorado');
    
    // Verificar se o usuário atual é super admin
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Erro ao verificar usuário atual:', userError);
    }
    
    const userId = userData?.user?.id;
    console.log('ID do usuário atual:', userId);
    
    if (!userId) {
      console.error('Usuário não autenticado');
      return [];
    }
    
    // Verificar se o usuário é super admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_super_admin')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('Erro ao verificar perfil do usuário:', profileError);
    }
    
    const isSuperAdmin = profileData?.is_super_admin;
    console.log('Usuário é super admin?', isSuperAdmin);
    
    // Buscar organizações - se for super admin, busca todas
    const { data, error } = await supabase
      .from('organizations')
      .select('id, name')
      .order('name');
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('Nenhuma organização encontrada');
      return [];
    }
    
    console.log('Organizações carregadas com sucesso:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    return [];
  }
};

/**
 * Cria um novo usuário
 */
export const createUser = async (userData: NewUserType) => {
  try {
    console.log('Tentando criar usuário com dados:', userData);
    
    // Verificar se o password está presente
    if (!userData.password) {
      throw new Error('Senha é obrigatória para criar um novo usuário');
    }
    
    // Criar usuário usando a função RPC
    const { data, error } = await supabase.rpc('create_user_with_profile', {
      email: userData.email,
      password: userData.password,
      name: userData.name || userData.email.split('@')[0], // Use o nome ou extraia do email
      role: userData.role || 'user',
      organization_id: userData.organizationId,
      is_admin: userData.role === 'admin',
      is_super_admin: userData.isSuperAdmin || false
    });
    
    if (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
    
    console.log('Usuário criado com sucesso:', data);
    return data;
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
    // Atualizar usuário usando a função RPC
    const { error } = await supabase.rpc('update_user_profile', {
      user_id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      organization_id: userData.organizationId,
      is_admin: userData.role === 'admin',
      is_super_admin: userData.isSuperAdmin
    });
    
    if (error) {
      console.error('Erro ao atualizar usuário:', error);
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
    // Excluir usuário usando a função RPC
    const { error } = await supabase.rpc('delete_user', {
      user_id: userId
    });
    
    if (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};
