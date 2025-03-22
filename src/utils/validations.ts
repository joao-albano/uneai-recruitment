
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
      message: 'Avaliação de comportamento é obrigatória'
    });
  } else if (isNaN(data.behavior) || data.behavior < 1 || data.behavior > 5) {
    errors.push({
      row: rowIndex,
      column: 'comportamento',
      message: 'Comportamento deve ser avaliado de 1 a 5'
    });
  }

  // Validate additional fields for parent information
  if (!data.parentName) {
    errors.push({
      row: rowIndex,
      column: 'responsavel',
      message: 'Nome do responsável é obrigatório'
    });
  }

  if (!data.parentContact) {
    errors.push({
      row: rowIndex,
      column: 'contato',
      message: 'Contato do responsável é obrigatório'
    });
  } else if (!data.parentContact.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
    errors.push({
      row: rowIndex,
      column: 'contato',
      message: 'Formato de contato inválido. Use o formato (XX) XXXXX-XXXX'
    });
  }

  return errors;
};

// Function to parse CSV data
export const parseCSV = (csvText: string): { 
  data: Partial<StudentData>[];
  errors: ValidationError[];
} => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  // Map Portuguese headers to English property names
  const headerMap: Record<string, keyof StudentData> = {
    'nome': 'name',
    'turma': 'class',
    'nota': 'grade',
    'frequencia': 'attendance',
    'comportamento': 'behavior',
    'responsavel': 'parentName',
    'contato': 'parentContact'
  };
  
  const requiredColumns = ['nome', 'turma', 'nota', 'frequencia', 'comportamento', 'responsavel', 'contato'];
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  
  const errors: ValidationError[] = [];
  
  // Check if all required columns are present
  if (missingColumns.length > 0) {
    errors.push({
      row: 0,
      column: missingColumns.join(', '),
      message: `Colunas obrigatórias ausentes: ${missingColumns.join(', ')}`
    });
    return { data: [], errors };
  }
  
  // Parse data rows
  const data: Partial<StudentData>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    
    const values = line.split(',').map(value => value.trim());
    const rowData: Partial<StudentData> = {};
    
    // Map CSV values to student data properties using the header map
    headers.forEach((header, index) => {
      const propName = headerMap[header];
      if (propName) {
        if (propName === 'grade' || propName === 'attendance' || propName === 'behavior') {
          rowData[propName] = parseFloat(values[index]);
        } else {
          rowData[propName] = values[index];
        }
      }
    });
    
    // Add a unique ID
    rowData.id = `${i}`;
    
    // Validate the row
    const rowErrors = validateStudentData(rowData, i);
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    }
    
    data.push(rowData);
  }
  
  return { data, errors };
};

// Function to parse Excel data
export const parseExcel = async (file: File): Promise<{
  data: Partial<StudentData>[];
  errors: ValidationError[];
}> => {
  // For MVP, we'll convert Excel to CSV and use the parseCSV function
  // This is a placeholder for actual Excel parsing which would require a library
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Simulate CSV conversion by assuming a simple format
      const csvText = e.target?.result as string;
      const result = parseCSV(csvText);
      resolve(result);
    };
    reader.readAsText(file);
  });
};

// Function to download a CSV template
export const downloadTemplate = () => {
  const headers = ['nome', 'turma', 'nota', 'frequencia', 'comportamento', 'responsavel', 'contato'];
  const csvContent = [
    headers.join(','),
    'João Silva,9A,7.5,85,4,Roberto Silva,(11) 98765-4321',
    'Maria Oliveira,9A,6.8,92,3,Paulo Oliveira,(11) 97654-3210',
    'Pedro Santos,9B,5.5,78,2,Ana Santos,(11) 96543-2109'
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'modelo_alunos.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
