
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';

/**
 * Busca organizações com base no perfil do usuário
 * - Super Admin: vê todas as organizações
 * - Admin: vê apenas a organização vinculada a ele
 * - Usuário normal: não vê organizações
 */
export const fetchOrganizations = async (currentUser: UserProfile | null) => {
  try {
    console.log('Buscando organizações para o usuário:', currentUser);
    
    // Se não há usuário autenticado, retornar array vazio
    if (!currentUser) {
      console.log('Usuário não autenticado');
      return [];
    }
    
    console.log('Status do usuário:', { 
      isSuperAdmin: currentUser.isSuperAdmin, 
      organizationId: currentUser.organizationId
    });
    
    // Verificar permissões - apenas super admin ou admin com organização vinculada pode ver organizações
    if (!currentUser.isSuperAdmin && !currentUser.organizationId) {
      console.log('Usuário sem permissão ou sem organização vinculada');
      return [];
    }
    
    console.log('Configuração Supabase:', {
      url: supabase.getUrl(),
      schema: 'public', // Agora estamos explicitamente configurando o schema como 'public'
    });
    
    // Construir a consulta para buscar organizações
    let query = supabase
      .from('organizations')
      .select(`
        id, 
        name, 
        is_main_org,
        created_at, 
        updated_at,
        products:organization_products(
          id,
          type,
          active,
          organization_id,
          created_at,
          updated_at
        )
      `)
      .order('name', { ascending: true });
    
    // Se for admin (não super), filtrar apenas a organização do usuário
    if (!currentUser.isSuperAdmin && currentUser.organizationId) {
      console.log('Filtrando pela organização do admin:', currentUser.organizationId);
      query = query.eq('id', currentUser.organizationId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      console.error('Detalhes do erro:', JSON.stringify(error));
      throw error;
    }
    
    console.log('Organizações encontradas:', data?.length || 0);
    console.log('Dados das organizações:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    console.error('Tipo de erro:', typeof error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
    } else {
      console.error('Detalhes do erro JSON:', JSON.stringify(error));
    }
    throw error;
  }
};
