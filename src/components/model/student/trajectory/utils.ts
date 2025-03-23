
import { StudentData } from '@/types/data';

// Generate trajectory data for the student
export const generateTrajectoryData = (student: StudentData) => {
  // Últimos 6 meses
  const months = ['Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro'];
  
  // Começar com valores altos e ir deteriorando (para alunos de risco)
  // Ou começar com valores baixos e ir melhorando (para alunos de baixo risco)
  let riskScores;
  let grades;
  let attendance;
  let behavior;
  
  if (student.riskLevel === 'high') {
    // Para alunos de alto risco, começar bem e deteriorar
    riskScores = [30, 40, 55, 65, 80, 95];
    grades = [8.5, 7.8, 7.0, 6.5, 5.8, student.grade];
    attendance = [95, 92, 88, 85, 80, student.attendance];
    behavior = [5, 4, 4, 3, 3, student.behavior];
  } else if (student.riskLevel === 'medium') {
    // Para alunos de médio risco, alguma inconsistência
    riskScores = [45, 60, 50, 65, 55, 70];
    grades = [7.5, 7.0, 7.2, 6.8, 6.5, student.grade];
    attendance = [90, 85, 88, 82, 80, student.attendance];
    behavior = [4, 4, 3, 4, 3, student.behavior];
  } else {
    // Para alunos de baixo risco, boa estabilidade
    riskScores = [25, 20, 30, 25, 20, 15];
    grades = [8.0, 8.2, 8.0, 8.5, 8.3, student.grade];
    attendance = [92, 94, 93, 95, 94, student.attendance];
    behavior = [4, 5, 4, 5, 4, student.behavior];
  }
  
  // Construir os dados de trajetória
  return months.map((month, index) => ({
    month,
    riskScore: riskScores[index],
    grade: grades[index],
    attendance: attendance[index],
    behavior: behavior[index]
  }));
};
