
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
      // Update existing student data for the current month
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

/**
 * Special merge function for recruitment leads that doesn't use monthly tracking
 */
export function mergeRecruitmentLeads(
  newLeads: StudentData[],
  existingLeads: StudentData[],
  keyField: string = 'registrationNumber'
): { mergedLeads: StudentData[], updatedCount: number, newCount: number } {
  let updatedCount = 0;
  let newCount = 0;
  
  const mergedLeads = [...existingLeads];
  
  // Process each new lead
  for (const newLead of newLeads) {
    // For recruitment, we simply check if the key field already exists
    const existingIndex = mergedLeads.findIndex(
      lead => lead[keyField as keyof StudentData] === newLead[keyField as keyof StudentData]
    );
    
    if (existingIndex >= 0) {
      // Update existing lead data
      mergedLeads[existingIndex] = { 
        ...mergedLeads[existingIndex], 
        ...newLead,
        id: mergedLeads[existingIndex].id // Keep the original ID
      };
      updatedCount++;
    } else {
      // Add as a new lead
      mergedLeads.push(newLead);
      newCount++;
    }
  }
  
  return { mergedLeads: mergedLeads, updatedCount, newCount };
}
