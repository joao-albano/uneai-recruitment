
import { StudentData } from "../context/DataContext";

export type ValidationError = {
  row: number;
  column: string;
  message: string;
};

// Function to validate a row of student data
export const validateStudentData = (
  data: Partial<StudentData>,
  rowIndex: number
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check required fields
  if (!data.name) {
    errors.push({
      row: rowIndex,
      column: 'nome',
      message: 'Nome do aluno é obrigatório'
    });
  }

  if (!data.class) {
    errors.push({
      row: rowIndex,
      column: 'turma',
      message: 'Turma é obrigatória'
    });
  }

  // Validate grade (should be 0-10)
  if (data.grade === undefined || data.grade === null) {
    errors.push({
      row: rowIndex,
      column: 'nota',
      message: 'Nota é obrigatória'
    });
  } else if (isNaN(data.grade) || data.grade < 0 || data.grade > 10) {
    errors.push({
      row: rowIndex,
      column: 'nota',
      message: 'Nota deve ser um número entre 0 e 10'
    });
  }

  // Validate attendance (should be 0-100%)
  if (data.attendance === undefined || data.attendance === null) {
    errors.push({
      row: rowIndex,
      column: 'frequencia',
      message: 'Frequência é obrigatória'
    });
  } else if (isNaN(data.attendance) || data.attendance < 0 || data.attendance > 100) {
    errors.push({
      row: rowIndex,
      column: 'frequencia',
      message: 'Frequência deve ser uma porcentagem entre 0 e 100'
    });
  }

  // Validate behavior (should be 1-5)
  if (data.behavior === undefined || data.behavior === null) {
    errors.push({
      row: rowIndex,
      column: 'comportamento',
      message: 'Comportamento é obrigatório'
    });
  } else if (isNaN(data.behavior) || data.behavior < 1 || data.behavior > 5) {
    errors.push({
      row: rowIndex,
      column: 'comportamento',
      message: 'Comportamento deve ser um número entre 1 e 5'
    });
  }

  // Validate parent name if provided
  if (data.parentName !== undefined && typeof data.parentName !== 'string') {
    errors.push({
      row: rowIndex,
      column: 'nome_responsavel',
      message: 'Nome do responsável deve ser texto'
    });
  }

  // Validate parent contact if provided
  if (data.parentContact !== undefined) {
    const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (typeof data.parentContact !== 'string' || !phonePattern.test(data.parentContact)) {
      errors.push({
        row: rowIndex,
        column: 'contato_responsavel',
        message: 'Contato do responsável deve seguir o formato (99) 99999-9999'
      });
    }
  }

  // Risk level validation (if provided)
  if (data.riskLevel !== undefined) {
    const validRiskLevels = ['low', 'medium', 'high'];
    if (typeof data.riskLevel !== 'string' || !validRiskLevels.includes(data.riskLevel as string)) {
      errors.push({
        row: rowIndex,
        column: 'nivel_risco',
        message: 'Nível de risco deve ser low, medium ou high'
      });
    }
  }

  return errors;
};

// Function to convert Excel column headers to our expected property names
export const mapHeadersToProperties = (headers: string[]): Record<string, string> => {
  const headerMap: Record<string, string> = {
    // Portuguese headers
    'nome': 'name',
    'turma': 'class',
    'nota': 'grade',
    'frequencia': 'attendance',
    'comportamento': 'behavior',
    'nivel_risco': 'riskLevel',
    'acoes': 'actionItems',
    'nome_responsavel': 'parentName',
    'contato_responsavel': 'parentContact',
    
    // English headers (fallback)
    'name': 'name',
    'class': 'class',
    'grade': 'grade',
    'attendance': 'attendance',
    'behavior': 'behavior',
    'risk_level': 'riskLevel',
    'actions': 'actionItems',
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
    'nome', 'turma', 'nota', 'frequencia', 'comportamento'
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
      required === 'comportamento' ? 'behavior' :
      required
    )
  );
};

// Get the expected format of the Excel file
export const getExcelFormat = (): { headers: string[]; description: string } => {
  return {
    headers: [
      'Nome', 'Turma', 'Nota', 'Frequencia', 'Comportamento', 
      'Nivel_Risco', 'Acoes', 'Nome_Responsavel', 'Contato_Responsavel'
    ],
    description: 'O arquivo deve conter as colunas: Nome, Turma, Nota (0-10), Frequência (0-100), ' +
      'Comportamento (1-5), Nível de Risco (low, medium, high), Ações, Nome do Responsável, ' +
      'e Contato do Responsável (formato (99) 99999-9999)'
  };
};
