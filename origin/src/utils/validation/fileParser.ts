
import { StudentData } from "../../context/DataContext";
import { ValidationError } from "./types";
import { mapHeadersToProperties, validateHeaders } from "./headerValidator";
import { validateStudentData } from "./studentValidator";
import { v4 as uuidv4 } from 'uuid';

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
    const studentData: Partial<StudentData> = {
      importMonth: new Date().getMonth() + 1, // Add current month for merge control
      importYear: new Date().getFullYear(),    // Add current year for merge control
    };
    
    for (let j = 0; j < headers.length; j++) {
      const propertyName = headerMap[j];
      
      if (propertyName) {
        const value = values[j];
        
        if (propertyName === 'grade' || propertyName === 'attendance' || propertyName === 'behavior') {
          studentData[propertyName] = parseFloat(value);
        } else {
          // Fix type issue by properly typing the value based on property name
          (studentData as any)[propertyName] = value;
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

// Add month name utility function
export const getMonthName = (monthNumber: number): string => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return monthNames[monthNumber - 1] || 'Desconhecido';
};
