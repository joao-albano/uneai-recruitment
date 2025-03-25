
import { supabase } from '@/integrations/supabase/client';

/**
 * Busca todas as organizações
 * 
 * Super Admins podem ver todas as organizações
 * Admins podem ver apenas sua própria organização
 * Usuários comuns não devem acessar organizações
 */
export const fetchOrganizations = async () => {
  try {
    console.log('Buscando organizações...');
    
    // Consulta que respeita as políticas RLS - Super admins verão todas as organizações,
    // admins verão apenas a sua própria
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select(`
        id,
        name,
        is_main_org,
        created_at,
        updated_at
      `)
      .order('name');
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      throw error;
    }
    
    console.log('Organizações recebidas:', organizations);
    
    // Adicionar os produtos para cada organização
    const orgsWithProducts = await Promise.all(organizations.map(async (org) => {
      try {
        const { data: products, error: productsError } = await supabase
          .from('organization_products')
          .select(`
            type,
            active
          `)
          .eq('organization_id', org.id);
        
        if (productsError) {
          console.error(`Erro ao buscar produtos para organização ${org.id}:`, productsError);
          return {
            ...org,
            products: []
          };
        }
        
        return {
          ...org,
          products: products || []
        };
      } catch (err) {
        console.error(`Erro ao processar produtos para organização ${org.id}:`, err);
        return {
          ...org,
          products: []
        };
      }
    }));
    
    return orgsWithProducts;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};
