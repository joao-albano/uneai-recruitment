
import { StudentData, AlertItem } from '@/types/data';

/**
 * Generate alerts for high and medium risk students after processing data
 */
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
