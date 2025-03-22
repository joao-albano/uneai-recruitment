
import { StudentData } from "../context/DataContext";

// Risk thresholds
const GRADE_THRESHOLD = 6.0;
const ATTENDANCE_THRESHOLD = 80;
const BEHAVIOR_THRESHOLD = 3; // Assuming behavior is rated 1-5, with 3 being neutral

// Risk calculation function using Decision Tree logic
export const calculateRiskLevel = (student: Omit<StudentData, 'riskLevel' | 'actionItems'>): {
  riskLevel: 'low' | 'medium' | 'high';
  actionItems: string[];
} => {
  const actionItems: string[] = [];
  
  // Check individual risk factors
  const hasLowGrades = student.grade < GRADE_THRESHOLD;
  const hasLowAttendance = student.attendance < ATTENDANCE_THRESHOLD;
  const hasBehaviorIssues = student.behavior < BEHAVIOR_THRESHOLD;
  
  // Count risk factors
  const riskFactorCount = [hasLowGrades, hasLowAttendance, hasBehaviorIssues].filter(Boolean).length;
  
  // Determine risk level based on number of risk factors
  let riskLevel: 'low' | 'medium' | 'high';
  
  if (riskFactorCount === 0) {
    riskLevel = 'low';
  } else if (riskFactorCount === 1) {
    // Single risk factor - medium risk
    riskLevel = 'medium';
    
    // Generate specific action items based on the risk factor
    if (hasLowGrades) {
      actionItems.push('Provide academic support');
      actionItems.push('Schedule additional tutoring');
    }
    
    if (hasLowAttendance) {
      actionItems.push('Monitor attendance closely');
      actionItems.push('Contact parents about attendance');
    }
    
    if (hasBehaviorIssues) {
      actionItems.push('Schedule counseling session');
      actionItems.push('Implement behavior intervention plan');
    }
  } else {
    // Multiple risk factors - high risk
    riskLevel = 'high';
    
    // Add more urgent action items for high risk students
    actionItems.push('Schedule parent-teacher conference');
    
    if (hasLowGrades && hasLowAttendance) {
      actionItems.push('Create comprehensive academic recovery plan');
    }
    
    if (hasBehaviorIssues) {
      actionItems.push('Develop personalized behavior intervention');
    }
    
    // Always recommend a follow-up for high risk students
    actionItems.push('Schedule regular follow-up meetings');
  }
  
  return { riskLevel, actionItems };
};

// Process a batch of students
export const processStudentData = (students: Omit<StudentData, 'riskLevel' | 'actionItems'>[]): StudentData[] => {
  return students.map(student => {
    const { riskLevel, actionItems } = calculateRiskLevel(student);
    return {
      ...student,
      riskLevel,
      actionItems
    };
  });
};
