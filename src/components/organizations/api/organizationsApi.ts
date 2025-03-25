
import { supabase } from '@/integrations/supabase/client';
import { OrganizationType, NewOrganizationType } from '../types';
import { ProductType } from '@/context/ProductContext';

/**
 * Busca todas as organizações
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
    }));
    
    return orgsWithProducts;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    throw error;
  }
};

/**
 * Cria uma nova organização
 */
export const createOrganization = async (orgData: NewOrganizationType) => {
  try {
    console.log('Criando nova organização:', orgData);
    
    // Inserir a organização
    const { data: newOrg, error } = await supabase
      .from('organizations')
      .insert({
        name: orgData.name,
        is_main_org: orgData.isMainOrg || false,
      })
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

/**
 * Exclui uma organização
 */
export const deleteOrganization = async (orgId: string) => {
  try {
    console.log('Excluindo organização:', orgId);
    
    // Excluir a organização (cascade excluirá seus produtos)
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', orgId);
    
    if (error) {
      console.error('Erro ao excluir organização:', error);
      throw error;
    }
    
    console.log('Organização excluída com sucesso:', orgId);
    return true;
  } catch (error) {
    console.error('Erro ao excluir organização:', error);
    throw error;
  }
};
