
import { supabase } from '@/integrations/supabase/client';
import { NewOrganizationType, OrganizationProduct } from '../types';
import { ProductType } from '@/context/ProductContext';

export const createOrganization = async (data: NewOrganizationType) => {
  try {
    console.log('Criando organização:', data);
    
    if (!data.name || data.name.trim() === '') {
      throw new Error('O nome da organização é obrigatório');
    }
    
    // 1. Criar a organização
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert([
        { 
          name: data.name.trim(),
          is_main_org: data.isMainOrg || false
        }
      ])
      .select('id, name, is_main_org, created_at, updated_at')
      .single();
    
    if (orgError) {
      console.error('Erro ao criar organização:', orgError);
      throw orgError;
    }
    
    if (!orgData) {
      throw new Error('Erro ao criar organização: Dados não retornados');
    }
    
    console.log('Organização criada com sucesso:', orgData);
    
    // 2. Adicionar produtos para a organização
    if (data.products && data.products.length > 0) {
      const productsToInsert = data.products.map(product => ({
        organization_id: orgData.id,
        type: product.type as ProductType,
        active: product.active
      }));
      
      console.log('Adicionando produtos para a organização:', productsToInsert);
      
      const { error: productError } = await supabase
        .from('organization_products')
        .insert(productsToInsert);
      
      if (productError) {
        console.error('Erro ao adicionar produtos para a organização:', productError);
        // Não vamos lançar erro aqui para não impedir a criação da organização
      }
    }
    
    return {
      id: orgData.id,
      name: orgData.name,
      isActive: true,
      isMainOrg: orgData.is_main_org || false,
      createdAt: orgData.created_at,
      products: data.products || []
    };
  } catch (error) {
    console.error('Erro ao criar organização:', error);
    throw error;
  }
};
