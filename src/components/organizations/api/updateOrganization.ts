
import { supabase } from '@/integrations/supabase/client';
import { OrganizationType } from '../types';

/**
 * Atualiza uma organização existente
 */
export const updateOrganization = async (orgId: string, orgData: Partial<OrganizationType>) => {
  try {
    console.log('Atualizando organização:', orgId, 'com dados:', orgData);
    
    // Preparar dados para atualização
    const updateData: any = {};
    
    if (orgData.name !== undefined) updateData.name = orgData.name;
    if (orgData.isActive !== undefined) updateData.is_active = orgData.isActive;
    if (orgData.isMainOrg !== undefined) updateData.is_main_org = orgData.isMainOrg;
    
    // Atualizar a organização
    const { data: updatedOrg, error } = await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', orgId)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar organização:', error);
      throw error;
    }
    
    console.log('Organização atualizada:', updatedOrg);
    
    // Se houver produtos para atualizar
    if (orgData.products && orgData.products.length > 0) {
      // Primeiro excluir os produtos existentes
      const { error: deleteError } = await supabase
        .from('organization_products')
        .delete()
        .eq('organization_id', orgId);
      
      if (deleteError) {
        console.error('Erro ao excluir produtos da organização:', deleteError);
        // Continuar mesmo com erro, para tentar inserir os novos
      }
      
      // Inserir os novos produtos
      const productsToInsert = orgData.products.map(product => ({
        organization_id: orgId,
        type: product.type,
        active: product.active
      }));
      
      const { error: insertError } = await supabase
        .from('organization_products')
        .insert(productsToInsert);
      
      if (insertError) {
        console.error('Erro ao adicionar produtos à organização:', insertError);
        // Não falhar completamente, já que a organização foi atualizada
      }
    }
    
    return updatedOrg;
  } catch (error) {
    console.error('Erro ao atualizar organização:', error);
    throw error;
  }
};
