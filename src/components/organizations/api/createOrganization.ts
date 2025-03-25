
import { supabase } from '@/integrations/supabase/client';
import { NewOrganizationType } from '../types';

/**
 * Cria uma nova organização
 */
export const createOrganization = async (orgData: NewOrganizationType) => {
  try {
    console.log('Criando nova organização:', orgData);
    
    // Adaptar o formato para o Supabase
    const organizationData = {
      name: orgData.name,
      is_main_org: orgData.isMainOrg || false,
    };
    
    // Inserir a organização
    const { data: newOrg, error } = await supabase
      .from('organizations')
      .insert(organizationData)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao criar organização:', error);
      throw error;
    }
    
    console.log('Organização criada:', newOrg);
    
    // Se houver produtos, adicionar à tabela organization_products
    if (orgData.products && orgData.products.length > 0) {
      const productsToInsert = orgData.products.map(product => ({
        organization_id: newOrg.id,
        type: product.type,
        active: product.active
      }));
      
      const { error: productsError } = await supabase
        .from('organization_products')
        .insert(productsToInsert);
      
      if (productsError) {
        console.error('Erro ao adicionar produtos à organização:', productsError);
        // Não falhar completamente, já que a organização foi criada
      }
    }
    
    return newOrg;
  } catch (error) {
    console.error('Erro ao criar organização:', error);
    throw error;
  }
};
