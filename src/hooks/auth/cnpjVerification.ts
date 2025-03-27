
import { normalizeCNPJ } from '@/utils/formatters';

export async function verifyCNPJ(cnpj: string): Promise<{ valid: boolean; normalizedCNPJ: string }> {
  const normalizedCNPJ = normalizeCNPJ(cnpj);
  
  console.log('CNPJ verification bypassed for testing (always returns valid)');
  
  // Always return valid for testing purposes
  return { valid: true, normalizedCNPJ };
}
