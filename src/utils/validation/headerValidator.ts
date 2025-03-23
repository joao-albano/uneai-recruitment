
import { HeaderMap } from "./types";

// Function to convert Excel column headers to our expected property names
export const mapHeadersToProperties = (headers: string[]): HeaderMap => {
  const headerMap: Record<string, string> = {
    // Portuguese headers
    'nome': 'name',
    'turma': 'class',
    'nota': 'grade',
    'frequencia': 'attendance',
    'nome_responsavel': 'parentName',
    'contato_responsavel': 'parentContact',
    
    // English headers (fallback)
    'name': 'name',
    'class': 'class',
    'grade': 'grade',
    'attendance': 'attendance',
    'parent_name': 'parentName',
    'parent_contact': 'parentContact'
  };

  return headers.reduce((acc, header, index) => {
    const normalizedHeader = header.toLowerCase().trim();
    if (headerMap[normalizedHeader]) {
      acc[index] = headerMap[normalizedHeader];
    }
    return acc;
  }, {} as Record<string, string>);
};

// Header validation function
export const validateHeaders = (headers: string[]): boolean => {
  const requiredHeaders = [
    'nome', 'turma', 'nota', 'frequencia'
  ];
  
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  
  return requiredHeaders.every(required => 
    normalizedHeaders.includes(required) || 
    // Check English equivalents too
    normalizedHeaders.includes(
      required === 'nome' ? 'name' :
      required === 'turma' ? 'class' :
      required === 'nota' ? 'grade' :
      required === 'frequencia' ? 'attendance' :
      required
    )
  );
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
