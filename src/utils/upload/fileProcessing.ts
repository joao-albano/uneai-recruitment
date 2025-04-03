import { StudentData, UploadRecord } from '@/types/data';
import { parseCSV, parseExcel } from '@/utils/validation';
import { ValidationError } from '@/utils/validation/types';
import { mergeStudentsMonthly, mergeRecruitmentLeads } from './mergeUtils';
import { processStudentData } from '@/utils/riskCalculator';

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
  currentStudents: StudentData[],
  productType: 'recruitment' | 'retention' = 'retention',
  keyField: string = 'registrationNumber'
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
      // Use different merge logic based on product type
      let mergedStudents: StudentData[];
      let updatedCount: number;
      let newCount: number;
      
      if (productType === 'retention') {
        // For retention - use monthly merge control logic
        const mergeResult = mergeStudentsMonthly(result.data, currentStudents);
        mergedStudents = mergeResult.mergedStudents;
        updatedCount = mergeResult.updatedCount;
        newCount = mergeResult.newCount;
      } else {
        // For recruitment - use key-based merge without monthly tracking
        const mergeResult = mergeRecruitmentLeads(result.data, currentStudents, keyField);
        mergedStudents = mergeResult.mergedLeads;
        updatedCount = mergeResult.updatedCount;
        newCount = mergeResult.newCount;
      }
      
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
