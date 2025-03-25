
import { supabase } from '@/integrations/supabase/client';
import { normalizeCNPJ } from '@/utils/formatters';
import { toast } from 'sonner';

export async function verifyCNPJ(cnpj: string): Promise<{ valid: boolean; normalizedCNPJ: string }> {
  const normalizedCNPJ = normalizeCNPJ(cnpj);
  
  console.log('Verificando CNPJ normalizado:', normalizedCNPJ);
  
  try {
    // Verificar se o CNPJ já existe
    const { data: existingOrg, error: checkError } = await supabase
      .from('organizations')
      .select('id, name, cnpj')
      .eq('cnpj', normalizedCNPJ)
      .maybeSingle();
    
    if (checkError) {
      console.error('Erro ao verificar CNPJ:', checkError);
      toast.error('Erro ao verificar disponibilidade do CNPJ');
      return { valid: false, normalizedCNPJ };
    }
    
    // Se CNPJ já existe, mostrar erro
    if (existingOrg) {
      console.log('CNPJ já cadastrado:', existingOrg);
      toast.error(`CNPJ já cadastrado para a organização "${existingOrg.name}"`);
      return { valid: false, normalizedCNPJ };
    }
    
    // CNPJ é válido e não existe no banco
    return { valid: true, normalizedCNPJ };
  } catch (error) {
    console.error('Erro ao verificar dados:', error);
    toast.error('Ocorreu um erro ao verificar seus dados');
    return { valid: false, normalizedCNPJ };
  }
}
