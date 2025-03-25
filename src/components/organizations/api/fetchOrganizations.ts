
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';

export const fetchOrganizations = async (currentUser: UserProfile | null) => {
  try {
    console.log('Buscando organizações...', currentUser);
    
    // Se não há usuário autenticado, retornar array vazio
    if (!currentUser) {
      console.log('Nenhum usuário autenticado.');
      return [];
    }
    
    // Buscar organizações com seus produtos
    const { data, error } = await supabase
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
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      throw error;
    }
    
    // Para usuários não super admin, filtrar apenas a organização do usuário
    if (currentUser && !currentUser.isSuperAdmin && currentUser.organizationId) {
      const filteredData = data?.filter(org => org.id === currentUser.organizationId);
      console.log('Organizações filtradas para usuário admin:', filteredData);
      return filteredData || [];
    }
    
    console.log('Organizações encontradas:', data);
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};
