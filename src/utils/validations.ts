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

// Function to parse CSV files
export const parseCSV = async (text: string): Promise<{ data: StudentData[], errors: ValidationError[] }> => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return { data: [], errors: [{ row: 0, column: 'file', message: 'O arquivo está vazio' }] };
  }

  // Extract headers from the first line
  const headers = lines[0].split(',').map(h => h.trim());

  // Validate headers
  if (!validateHeaders(headers)) {
    return { 
      data: [], 
      errors: [{ 
        row: 0, 
        column: 'headers', 
        message: 'Cabeçalhos necessários estão faltando' 
      }] 
    };
  }

  const headerMap = mapHeadersToProperties(headers);
  const data: StudentData[] = [];
  const errors: ValidationError[] = [];

  // Process each row
  for (let i = 1; i < lines.length; i++) {
    const rowIndex = i;
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length !== headers.length) {
      errors.push({
        row: rowIndex,
        column: 'format',
        message: 'Número de colunas não corresponde ao número de cabeçalhos'
      });
      continue;
    }

    // Map values to student data object
    const studentData: Partial<StudentData> = {};
    
    for (let j = 0; j < headers.length; j++) {
      const propertyName = headerMap[j];
      
      if (propertyName) {
        const value = values[j];
        
        if (propertyName === 'grade' || propertyName === 'attendance' || propertyName === 'behavior') {
          studentData[propertyName] = parseFloat(value);
        } else {
          studentData[propertyName as keyof StudentData] = value as any;
        }
      }
    }

    // Validate the student data
    const rowErrors = validateStudentData(studentData, rowIndex);
    
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      // Add ID if not present
      if (!studentData.id) {
        studentData.id = `student-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
      
      data.push(studentData as StudentData);
    }
  }

  return { data, errors };
};

// Function to parse Excel files
export const parseExcel = async (file: File): Promise<{ data: StudentData[], errors: ValidationError[] }> => {
  try {
    // Since we can't directly parse Excel files in the browser without a library,
    // we'll simulate it by reading it as text (Note: in a real app, you'd use a library like xlsx)
    const text = await file.text();
    
    // For this simulation, we'll treat the Excel file as a CSV by assuming it's been exported as CSV
    return parseCSV(text);
    
    // In a real implementation, you would:
    // 1. Use a library like xlsx to parse the Excel file
    // 2. Convert the parsed data to the format expected by your app
    // 3. Validate the data using validateStudentData
    // 4. Return the data and any validation errors
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return { 
      data: [], 
      errors: [{ 
        row: 0, 
        column: 'file', 
        message: 'Erro ao processar arquivo Excel' 
      }] 
    };
  }
};

// Function to download a template file
export const downloadTemplate = (): void => {
  const { headers } = getExcelFormat();
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Example row
    'João da Silva,9A,7.5,85,4,medium,"Acompanhamento semanal","Maria da Silva","(11) 98765-4321"',
    // Empty row for user to fill
    'Nome do Aluno,Turma,0.0,0,1,low,"Ações necessárias","Nome do Responsável","(99) 99999-9999"'
  ].join('\n');

  // Create a blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'modelo_alunos.csv');
  link.style.visibility = 'hidden';
  
  // Add to document, trigger download, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
