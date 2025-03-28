
import { StudentData } from '@/types/data';

/**
 * Function to merge students based on registration number and import month
 */
export function mergeStudentsMonthly(
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
