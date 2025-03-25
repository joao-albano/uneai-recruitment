
import { supabase } from '@/integrations/supabase/client';

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
