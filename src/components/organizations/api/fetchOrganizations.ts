
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
    
    // Se não há usuário autenticado ou não é admin, retornar array vazio
    if (!currentUser || (!currentUser.isSuperAdmin && !currentUser.organization)) {
      console.log('Usuário sem permissão para ver organizações.');
      return [];
    }
    
    // Buscar organizações com seus produtos
    const query = supabase
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
    if (currentUser && !currentUser.isSuperAdmin && currentUser.organization) {
      query.eq('id', currentUser.organization.id);
    }
    
    const { data, error } = await query;
    
    if (error) {
      // Verify if it's a schema error and try with the correct schema
      if (error.message.includes('schema') || error.code === 'PGRST106') {
        console.log('Schema error detected, trying alternative approach...');
        
        // Use the from method without specifying the schema
        const fallbackQuery = supabase
          .from('organizations')  // Without 'public.' prefix
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
          
        if (currentUser && !currentUser.isSuperAdmin && currentUser.organization) {
          fallbackQuery.eq('id', currentUser.organization.id);
        }
        
        const fallbackResult = await fallbackQuery;
        
        if (fallbackResult.error) {
          console.error('Erro alternativo ao buscar organizações:', fallbackResult.error);
          throw fallbackResult.error;
        }
        
        return fallbackResult.data || [];
      }
      
      console.error('Erro ao buscar organizações:', error);
      throw error;
    }
    
    console.log('Organizações encontradas:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};
