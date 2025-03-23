
import { HeaderMap } from "./types";

// Function to convert Excel column headers to our expected property names
export const mapHeadersToProperties = (headers: string[]): HeaderMap => {
  const headerMap: Record<string, string> = {
    // Portuguese headers - standard format
    'nome': 'name',
    'turma': 'class',
    'nota': 'grade',
    'frequencia': 'attendance',
    'nome_responsavel': 'parentName',
    'contato_responsavel': 'parentContact',
    
    // Portuguese headers - alternative formats with underscores and capitalization
    'nome responsavel': 'parentName',
    'contato responsavel': 'parentContact',
    'nome_responsável': 'parentName',
    'contato_responsável': 'parentContact',
    'nome responsável': 'parentName',
    'contato responsável': 'parentContact',
    'nome_responsavel': 'parentName',
    'contato_responsavel': 'parentContact',
    
    // Format with capitalization that matches the CSV
    'Nome_Responsavel': 'parentName',
    'Contato_Responsavel': 'parentContact',
    
    // English headers (fallback)
    'name': 'name',
    'class': 'class',
    'grade': 'grade',
    'attendance': 'attendance',
    'parent_name': 'parentName',
    'parent_contact': 'parentContact'
  };

  return headers.reduce((acc, header, index) => {
    const normalizedHeader = header.trim();
    // Try exact match first
    if (headerMap[normalizedHeader]) {
      acc[index] = headerMap[normalizedHeader];
    } else {
      // Try case-insensitive match
      const lowerHeader = normalizedHeader.toLowerCase();
      if (headerMap[lowerHeader]) {
        acc[index] = headerMap[lowerHeader];
      }
    }
    return acc;
  }, {} as Record<string, string>);
};

// Header validation function
export const validateHeaders = (headers: string[]): boolean => {
  const requiredHeaders = [
    'nome', 'turma', 'nota', 'frequencia'
  ];
  
  // Create a more flexible header matching approach
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  
  return requiredHeaders.every(required => {
    // Check standard forms
    if (normalizedHeaders.includes(required)) return true;
    
    // Check English equivalents
    const englishEquivalent = 
      required === 'nome' ? 'name' :
      required === 'turma' ? 'class' :
      required === 'nota' ? 'grade' :
      required === 'frequencia' ? 'attendance' :
      required;
    
    if (normalizedHeaders.includes(englishEquivalent)) return true;
    
    // Check capitalized versions
    const capitalizedVersion = required.charAt(0).toUpperCase() + required.slice(1);
    return normalizedHeaders.includes(capitalizedVersion);
  });
};

// Get the expected format of the Excel file
export const getExcelFormat = (): { headers: string[]; description: string } => {
  return {
    headers: [
      'Nome', 'Turma', 'Nota', 'Frequencia', 
      'Nome_Responsavel', 'Contato_Responsavel'
    ],
    description: 'O arquivo deve conter as colunas: Nome, Turma, Nota (0-10), Frequência (0-100), ' +
      'Nome do Responsável, e Contato do Responsável (formato (99) 99999-9999)'
  };
};
