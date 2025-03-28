import { StudentData } from '@/types/data';
import { parseCSV, parseExcel } from '@/utils/validation';
import { processStudentData } from '@/utils/riskCalculator';
import { ValidationError } from '@/utils/validation/types';
import { UploadRecord } from '@/types/data';
import { AlertItem } from '@/types/data';

interface ProcessFileResult {
  students?: StudentData[];
  errors?: ValidationError[];
  uploadRecord: UploadRecord;
  updatedCount?: number;
  newCount?: number;
}

export async function processFile(
  file: File,
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void,
  currentStudents: StudentData[]
): Promise<ProcessFileResult> {
  // Process the file based on its type
  const fileType = file.name.split('.').pop()?.toLowerCase();
  let result: { data: StudentData[], errors: ValidationError[] };
  
  try {
    if (fileType === 'csv') {
      // Process CSV file
      const text = await file.text();
      result = await parseCSV(text);
    } else {
      // Process Excel file
      result = await parseExcel(file);
    }
    
    // Check for validation errors
    if (result.errors.length > 0) {
      const errorRecord = {
        filename: file.name,
        uploadDate: new Date(),
        recordCount: 0,
        status: 'error' as const,
        errorCount: result.errors.length
      };
      
      addUploadRecord(errorRecord);
      
      return {
        errors: result.errors,
        uploadRecord: {
          ...errorRecord,
          id: `upload-${Date.now()}`
        }
      };
    }
    
    // Process data if valid
    if (result.data.length > 0) {
      // Implement the monthly merge control logic
      const { mergedStudents, updatedCount, newCount } = mergeStudentsMonthly(
        result.data, 
        currentStudents
      );
      
      // Generate behavior scores randomly for the imported students (only for new students)
      const dataWithBehavior = mergedStudents.map(student => {
        // If the student already has a behavior score, keep it
        if (student.behavior !== undefined) {
          return student;
        }
        // Otherwise, generate a random score
        return {
          ...student,
          behavior: Math.floor(Math.random() * 5) + 1 // Random behavior score between 1 and 5
        };
      });
      
      // Apply risk calculation algorithm
      const processedStudents = processStudentData(dataWithBehavior);
      
      // Create upload record with merge information
      const successRecord = {
        filename: file.name,
        uploadDate: new Date(),
        recordCount: processedStudents.length,
        status: 'success' as const,
        updatedCount,
        newCount
      };
      
      addUploadRecord(successRecord);
      
      return {
        students: processedStudents,
        uploadRecord: {
          ...successRecord,
          id: `upload-${Date.now()}`
        },
        updatedCount,
        newCount
      };
    }
    
    // Return empty result if no data
    return {
      uploadRecord: {
        id: `upload-${Date.now()}`,
        filename: file.name,
        uploadDate: new Date(),
        recordCount: 0,
        status: 'error',
        errorCount: 1
      }
    };
  } catch (error) {
    console.error('Error processing file:', error);
    
    const errorRecord = {
      filename: file.name,
      uploadDate: new Date(),
      recordCount: 0,
      status: 'error' as const,
      errorCount: 1
    };
    
    addUploadRecord(errorRecord);
    
    return {
      errors: [{
        row: 0,
        column: 'file',
        message: 'Ocorreu um erro ao processar o arquivo.'
      }],
      uploadRecord: {
        ...errorRecord,
        id: `upload-${Date.now()}`
      }
    };
  }
}

// Function to merge students based on registration number and import month
function mergeStudentsMonthly(
  newStudents: StudentData[], 
  existingStudents: StudentData[]
): { mergedStudents: StudentData[], updatedCount: number, newCount: number } {
  let updatedCount = 0;
  let newCount = 0;
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentYear = new Date().getFullYear();
  
  const mergedStudents = [...existingStudents];
  
  // Process each new student
  for (const newStudent of newStudents) {
    // Ensure all new students have the current month and year
    newStudent.importMonth = currentMonth;
    newStudent.importYear = currentYear;
    
    // Check if this student (by registration number) already exists in the current month/year
    const existingIndex = mergedStudents.findIndex(
      s => s.registrationNumber === newStudent.registrationNumber && 
           s.importMonth === currentMonth &&
           s.importYear === currentYear
    );
    
    if (existingIndex >= 0) {
      // Update existing student data
      mergedStudents[existingIndex] = { 
        ...mergedStudents[existingIndex], 
        ...newStudent,
        id: mergedStudents[existingIndex].id // Keep the original ID
      };
      updatedCount++;
    } else {
      // Add as a new student
      mergedStudents.push(newStudent);
      newCount++;
    }
  }
  
  return { mergedStudents, updatedCount, newCount };
}

export function generateAlertsFromStudents(
  students: StudentData[],
  addAlert: (alert: AlertItem) => void
): void {
  // Create alerts for high and medium risk students
  students
    .filter(student => student.riskLevel === 'high' || student.riskLevel === 'medium')
    .forEach(student => {
      addAlert({
        id: `alert-${Date.now()}-${student.id}`,
        studentId: student.id,
        studentName: student.name,
        studentClass: student.class,
        type: student.riskLevel === 'high' ? 'high-risk' : 'medium-risk',
        message: `${student.name} foi classificado como risco ${student.riskLevel === 'high' ? 'alto' : 'médio'}.`,
        createdAt: new Date(),
        read: false,
        actionTaken: false
      });
    });
}
