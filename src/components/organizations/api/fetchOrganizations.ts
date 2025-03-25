
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';
import { OrganizationType, OrganizationProduct } from '../types';
import { ProductType } from '@/context/ProductContext';

/**
 * Busca organizações com base no perfil do usuário
 * - Super Admin: vê todas as organizações
 * - Admin: vê apenas a organização vinculada a ele
 * - Usuário normal: não vê organizações
 */
export const fetchOrganizations = async (currentUser: UserProfile | null): Promise<OrganizationType[]> => {
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
    
    // Se for admin (não super) e tem organizationId, filtrar apenas a organização do usuário
    if (!currentUser.isSuperAdmin && currentUser.organizationId) {
      console.log('Filtrando pela organização do admin:', currentUser.organizationId);
      query = query.eq('id', currentUser.organizationId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      throw error;
    }
    
    console.log('Organizações encontradas:', data?.length || 0);
    
    // Transformar os dados para o formato esperado pelo frontend
    const organizations: OrganizationType[] = (data || []).map(org => {
      return {
        id: org.id,
        name: org.name,
        isActive: true, // Não temos este campo no banco, definimos como true por padrão
        isMainOrg: org.is_main_org || false,
        createdAt: org.created_at || new Date().toISOString(),
        // Mapear produtos com a tipagem correta
        products: Array.isArray(org.products) ? org.products.map(p => ({
          type: p.type as ProductType,
          active: p.active || true
        })) : []
      };
    });
    
    return organizations;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};
