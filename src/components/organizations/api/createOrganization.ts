
import { supabase } from '@/integrations/supabase/client';
import { NewOrganizationType, OrganizationProduct } from '../types';

export const createOrganization = async (data: NewOrganizationType) => {
  try {
    console.log('Criando organização:', data);
    
    // 1. Criar a organização
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert([
        { 
          name: data.name,
          is_main_org: data.isMainOrg || false
        }
      ])
      .select()
      .single();
    
    if (orgError) {
      console.error('Erro ao criar organização:', orgError);
      throw orgError;
    }
    
    console.log('Organização criada com sucesso:', orgData);
    
    // 2. Adicionar produtos para a organização
    if (data.products && data.products.length > 0) {
      const productsToInsert = data.products.map(product => ({
        organization_id: orgData.id,
        type: product.type,
        active: product.active
      }));
      
      const { error: productError } = await supabase
        .from('organization_products')
        .insert(productsToInsert);
      
      if (productError) {
        console.error('Erro ao adicionar produtos para a organização:', productError);
        // Não vamos lançar erro aqui para não impedir a criação da organização
      }
    }
    
    return orgData;
  } catch (error) {
    console.error('Erro ao criar organização:', error);
    throw error;
  }
};
