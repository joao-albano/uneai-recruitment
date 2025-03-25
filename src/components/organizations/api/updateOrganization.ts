
import { supabase } from '@/integrations/supabase/client';

export const updateOrganization = async (
  id: string,
  data: { name?: string; isActive?: boolean }
) => {
  try {
    console.log('Atualizando organização:', id, data);
    
    // Preparar dados para atualização
    const updateData: Record<string, any> = {};
    
    if (data.name !== undefined) {
      updateData.name = data.name;
    }
    
    // We don't store isActive in the database, so we skip it
    
    // Atualizar organização no Supabase
    const { data: updatedData, error } = await supabase
      .from('organizations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar organização:', error);
      throw error;
    }
    
    console.log('Organização atualizada com sucesso:', updatedData);
    return updatedData;
    
  } catch (error) {
    console.error('Erro ao atualizar organização:', error);
    throw error;
  }
};
