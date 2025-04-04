
import { ProductType, InstitutionType } from "./headerTypes";

// Get required headers based on product type and institution type
export const getRequiredHeaders = (
  productType: ProductType = 'retention', 
  institutionType: InstitutionType = 'school'
): string[] => {
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      return ['nome', 'canal']; // RA is no longer required, but email_responsavel or cpf_responsavel will be checked separately
    } else {
      return ['nome', 'email', 'telefone', 'canal', 'curso'];
    }
  } else {
    if (institutionType === 'school') {
      return ['nome', 'registro', 'turma', 'segmento'];
    } else {
      return ['nome', 'registro', 'curso', 'periodo', 'semestre'];
    }
  }
};

// Header validation function
export const validateHeaders = (
  headers: string[], 
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): boolean => {
  const requiredHeaders = getRequiredHeaders(productType, institutionType);
  
  // Create a more flexible header matching approach
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  
  // For school recruitment, check if either email_responsavel or cpf_responsavel is present
  if (productType === 'recruitment' && institutionType === 'school') {
    const hasEmailResponsavel = normalizedHeaders.includes('email_responsavel');
    const hasCpfResponsavel = normalizedHeaders.includes('cpf_responsavel');
    
    if (!hasEmailResponsavel && !hasCpfResponsavel) {
      return false; // Neither email_responsavel nor cpf_responsavel is present
    }
  }
  
  return requiredHeaders.every(required => {
    // Check standard forms
    if (normalizedHeaders.includes(required)) return true;
    
    // Special case for 'registro' - also accept 'matricula' or 'ra'
    if (required === 'registro' && 
        (normalizedHeaders.includes('matricula') || normalizedHeaders.includes('ra'))) 
      return true;
    
    // Check English equivalents
    const englishEquivalent = 
      required === 'nome' ? 'name' :
      required === 'registro' ? 'registration' :
      required === 'turma' ? 'class' :
      required === 'segmento' ? 'segment' :
      required === 'nota' ? 'grade' :
      required === 'frequencia' ? 'attendance' :
      required === 'comportamento' ? 'behavior' :
      required === 'telefone' ? 'phone' :
      required === 'curso' ? 'course' :
      required === 'periodo' ? 'period' :
      required === 'canal' ? 'channel' :
      required;
    
    if (normalizedHeaders.includes(englishEquivalent)) return true;
    
    // Check capitalized versions
    const capitalizedVersion = required.charAt(0).toUpperCase() + required.slice(1);
    return normalizedHeaders.includes(capitalizedVersion);
  });
};
