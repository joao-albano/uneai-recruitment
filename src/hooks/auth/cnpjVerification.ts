
import { supabase } from '@/integrations/supabase/client';
import { normalizeCNPJ } from '@/utils/formatters';
import { toast } from 'sonner';

export async function verifyCNPJ(cnpj: string): Promise<{ valid: boolean; normalizedCNPJ: string }> {
  const normalizedCNPJ = normalizeCNPJ(cnpj);
  
  console.log('Iniciando verificação do CNPJ:', normalizedCNPJ);
  
  try {
    // Consulta simples e direta na tabela organizations
    const { data, error } = await supabase
      .from('organizations')
      .select('name')
      .eq('cnpj', normalizedCNPJ)
      .single();
    
    if (error) {
      console.error('Erro na consulta do CNPJ:', error);
      return { valid: true, normalizedCNPJ }; // Se der erro na consulta, permitimos passar
    }
    
    // Se encontrou dados, significa que o CNPJ já está cadastrado
    if (data) {
      console.log('CNPJ já cadastrado para:', data.name);
      toast.error(`CNPJ já está cadastrado para a organização "${data.name}"`);
      return { valid: false, normalizedCNPJ };
    }
    
    // Se não encontrou dados, o CNPJ está disponível
    console.log('CNPJ disponível para cadastro');
    return { valid: true, normalizedCNPJ };
    
  } catch (error) {
    // Em caso de erro inesperado, logamos e permitimos passar
    console.error('Erro inesperado ao verificar CNPJ:', error);
    return { valid: true, normalizedCNPJ };
  }
}
