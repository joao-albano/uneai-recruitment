
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
      column: 'name',
      message: 'Student name is required'
    });
  }

  if (!data.class) {
    errors.push({
      row: rowIndex,
      column: 'class',
      message: 'Class is required'
    });
  }

  // Validate grade (should be 0-10)
  if (data.grade === undefined || data.grade === null) {
    errors.push({
      row: rowIndex,
      column: 'grade',
      message: 'Grade is required'
    });
  } else if (isNaN(data.grade) || data.grade < 0 || data.grade > 10) {
    errors.push({
      row: rowIndex,
      column: 'grade',
      message: 'Grade must be a number between 0 and 10'
    });
  }

  // Validate attendance (should be 0-100%)
  if (data.attendance === undefined || data.attendance === null) {
    errors.push({
      row: rowIndex,
      column: 'attendance',
      message: 'Attendance is required'
    });
  } else if (isNaN(data.attendance) || data.attendance < 0 || data.attendance > 100) {
    errors.push({
      row: rowIndex,
      column: 'attendance',
      message: 'Attendance must be a percentage between 0 and 100'
    });
  }

  // Validate behavior (should be 1-5)
  if (data.behavior === undefined || data.behavior === null) {
    errors.push({
      row: rowIndex,
      column: 'behavior',
      message: 'Behavior rating is required'
    });
  } else if (isNaN(data.behavior) || data.behavior < 1 || data.behavior > 5) {
    errors.push({
      row: rowIndex,
      column: 'behavior',
      message: 'Behavior must be rated from 1 to 5'
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
  
  const requiredColumns = ['name', 'class', 'grade', 'attendance', 'behavior'];
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  
  const errors: ValidationError[] = [];
  
  // Check if all required columns are present
  if (missingColumns.length > 0) {
    errors.push({
      row: 0,
      column: missingColumns.join(', '),
      message: `Missing required columns: ${missingColumns.join(', ')}`
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
    
    // Map CSV values to student data properties
    headers.forEach((header, index) => {
      if (header === 'name') rowData.name = values[index];
      else if (header === 'class') rowData.class = values[index];
      else if (header === 'grade') rowData.grade = parseFloat(values[index]);
      else if (header === 'attendance') rowData.attendance = parseFloat(values[index]);
      else if (header === 'behavior') rowData.behavior = parseInt(values[index]);
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
  const headers = ['name', 'class', 'grade', 'attendance', 'behavior'];
  const csvContent = [
    headers.join(','),
    'João Silva,9A,7.5,85,4',
    'Maria Oliveira,9A,6.8,92,3',
    'Pedro Santos,9B,5.5,78,2'
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'template_alunos.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
