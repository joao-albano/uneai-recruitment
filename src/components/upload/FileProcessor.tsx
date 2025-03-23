
import { StudentData } from '@/types/data';
import { parseCSV, parseExcel } from '@/utils/validation';
import { processStudentData } from '@/utils/riskCalculator';
import { ValidationError } from '@/utils/validation/types';
import { UploadRecord } from '@/types/upload';
import { AlertItem } from '@/types/data';

interface ProcessFileResult {
  students?: StudentData[];
  errors?: ValidationError[];
  uploadRecord: UploadRecord;
}

export async function processFile(
  file: File,
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void
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
      // Generate behavior scores randomly for the imported students
      const dataWithBehavior = result.data.map(student => ({
        ...student,
        behavior: Math.floor(Math.random() * 5) + 1 // Random behavior score between 1 and 5
      }));
      
      // Apply risk calculation algorithm
      const processedStudents = processStudentData(dataWithBehavior);
      
      // Create upload record
      const successRecord = {
        filename: file.name,
        uploadDate: new Date(),
        recordCount: processedStudents.length,
        status: 'success' as const
      };
      
      addUploadRecord(successRecord);
      
      return {
        students: processedStudents,
        uploadRecord: {
          ...successRecord,
          id: `upload-${Date.now()}`
        }
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
