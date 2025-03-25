
import { supabase } from '@/integrations/supabase/client';

export const fetchOrganizations = async () => {
  try {
    console.log('Buscando organizações...');
    
    // Buscar organizações com seus produtos - especificando o schema "api"
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
    
    console.log('Organizações encontradas:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};
