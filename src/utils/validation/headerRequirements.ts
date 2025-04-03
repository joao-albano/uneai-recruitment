
import { ProductType, InstitutionType } from "./headerTypes";

// Get required headers based on product type and institution type
export const getRequiredHeaders = (
  productType: ProductType = 'retention', 
  institutionType: InstitutionType = 'school'
): string[] => {
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      return ['nome', 'email', 'telefone', 'canal'];
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
