
import { supabase } from '@/integrations/supabase/client';
import { normalizeCNPJ } from '@/utils/formatters';
import { toast } from 'sonner';

export async function verifyCNPJ(cnpj: string): Promise<{ valid: boolean; normalizedCNPJ: string }> {
  const normalizedCNPJ = normalizeCNPJ(cnpj);
  
  console.log('CNPJ verification bypassed for testing');
  
  // Always return valid for testing purposes
  return { valid: true, normalizedCNPJ };
}
