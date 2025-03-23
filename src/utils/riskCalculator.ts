
import { StudentData } from "../context/DataContext";

// Risk thresholds - these define our decision boundaries
const GRADE_THRESHOLD_HIGH = 5.0;
const GRADE_THRESHOLD_MEDIUM = 6.5;
const ATTENDANCE_THRESHOLD_HIGH = 70;
const ATTENDANCE_THRESHOLD_MEDIUM = 85;
const BEHAVIOR_THRESHOLD_HIGH = 2;
const BEHAVIOR_THRESHOLD_MEDIUM = 3;

// Decision Tree logic implementation for risk prediction
export const calculateRiskLevel = (student: Omit<StudentData, 'riskLevel' | 'actionItems'>): {
  riskLevel: 'low' | 'medium' | 'high';
  actionItems: string[];
  decisionPath: string[];
} => {
  const actionItems: string[] = [];
  const decisionPath: string[] = [];
  
  // Step 1: Check academic performance (grades)
  const hasLowGrades = student.grade < GRADE_THRESHOLD_HIGH;
  const hasMediumGrades = student.grade >= GRADE_THRESHOLD_HIGH && student.grade < GRADE_THRESHOLD_MEDIUM;
  
  // Step 2: Check attendance patterns
  const hasLowAttendance = student.attendance < ATTENDANCE_THRESHOLD_HIGH;
  const hasMediumAttendance = student.attendance >= ATTENDANCE_THRESHOLD_HIGH && student.attendance < ATTENDANCE_THRESHOLD_MEDIUM;
  
  // Step 3: Check behavior/engagement issues
  const hasSevereBehaviorIssues = student.behavior <= BEHAVIOR_THRESHOLD_HIGH;
  const hasModerateBehaviorIssues = student.behavior > BEHAVIOR_THRESHOLD_HIGH && student.behavior <= BEHAVIOR_THRESHOLD_MEDIUM;
  
  // Build the decision tree logic
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  
  // Decision Path 1: Check attendance first (most critical factor)
  if (hasLowAttendance) {
    decisionPath.push(`Frequência muito baixa (${student.attendance}% < ${ATTENDANCE_THRESHOLD_HIGH}%)`);
    
    // Sub-decision: Check if grades are also low
    if (hasLowGrades) {
      riskLevel = 'high';
      decisionPath.push(`Notas também baixas (${student.grade} < ${GRADE_THRESHOLD_HIGH})`);
      decisionPath.push(`Resultado: Risco ALTO - múltiplos fatores críticos`);
      
      actionItems.push('Agendar reunião imediata com responsáveis');
      actionItems.push('Criar plano de recuperação acadêmica');
      actionItems.push('Monitoramento diário de frequência');
    } 
    // Sub-decision: Check behavior if grades are acceptable
    else if (hasSevereBehaviorIssues) {
      riskLevel = 'high';
      decisionPath.push(`Comportamento problemático (${student.behavior} <= ${BEHAVIOR_THRESHOLD_HIGH})`);
      decisionPath.push(`Resultado: Risco ALTO - problemas de frequência e comportamento`);
      
      actionItems.push('Agendar reunião com responsáveis');
      actionItems.push('Avaliação psicopedagógica recomendada');
      actionItems.push('Implementar estratégias de engajamento');
    }
    else {
      riskLevel = 'medium';
      decisionPath.push(`Outros indicadores em níveis aceitáveis`);
      decisionPath.push(`Resultado: Risco MÉDIO - principalmente por frequência`);
      
      actionItems.push('Contatar responsáveis sobre frequência');
      actionItems.push('Acompanhamento semanal de presença');
    }
  }
  // Decision Path 2: Check grades as second priority
  else if (hasLowGrades) {
    decisionPath.push(`Notas muito baixas (${student.grade} < ${GRADE_THRESHOLD_HIGH})`);
    
    // Sub-decision: Check if behavior is also problematic
    if (hasSevereBehaviorIssues) {
      riskLevel = 'high';
      decisionPath.push(`Comportamento problemático (${student.behavior} <= ${BEHAVIOR_THRESHOLD_HIGH})`);
      decisionPath.push(`Resultado: Risco ALTO - baixo rendimento acadêmico e comportamento`);
      
      actionItems.push('Agendar reunião com responsáveis e equipe pedagógica');
      actionItems.push('Avaliar necessidade de acompanhamento especializado');
      actionItems.push('Implementar plano personalizado de estudos');
    }
    else if (hasMediumAttendance) {
      riskLevel = 'medium';
      decisionPath.push(`Frequência média (${student.attendance}% < ${ATTENDANCE_THRESHOLD_MEDIUM}%)`);
      decisionPath.push(`Resultado: Risco MÉDIO - rendimento acadêmico e frequência`);
      
      actionItems.push('Oferecer reforço escolar');
      actionItems.push('Monitorar frequência nas próximas semanas');
    }
    else {
      riskLevel = 'medium';
      decisionPath.push(`Frequência adequada (${student.attendance}% >= ${ATTENDANCE_THRESHOLD_MEDIUM}%)`);
      decisionPath.push(`Resultado: Risco MÉDIO - principalmente acadêmico`);
      
      actionItems.push('Oferecer auxílio acadêmico');
      actionItems.push('Verificar compreensão do conteúdo');
    }
  }
  // Decision Path 3: Check behavior as third priority
  else if (hasSevereBehaviorIssues) {
    riskLevel = 'medium';
    decisionPath.push(`Comportamento problemático (${student.behavior} <= ${BEHAVIOR_THRESHOLD_HIGH})`);
    decisionPath.push(`Outros indicadores em níveis aceitáveis`);
    decisionPath.push(`Resultado: Risco MÉDIO - principalmente comportamental`);
    
    actionItems.push('Agendar sessão com orientação educacional');
    actionItems.push('Implementar plano de intervenção comportamental');
  }
  // Decision Path 4: Medium risk factors
  else if (hasMediumGrades || hasMediumAttendance || hasModerateBehaviorIssues) {
    riskLevel = 'medium';
    
    if (hasMediumGrades) {
      decisionPath.push(`Notas medianas (${student.grade} < ${GRADE_THRESHOLD_MEDIUM})`);
      actionItems.push('Oferecer monitoria para reforço');
    }
    
    if (hasMediumAttendance) {
      decisionPath.push(`Frequência mediana (${student.attendance}% < ${ATTENDANCE_THRESHOLD_MEDIUM}%)`);
      actionItems.push('Acompanhar frequência nas próximas semanas');
    }
    
    if (hasModerateBehaviorIssues) {
      decisionPath.push(`Comportamento requer atenção (${student.behavior} <= ${BEHAVIOR_THRESHOLD_MEDIUM})`);
      actionItems.push('Conversar sobre engajamento em sala');
    }
    
    decisionPath.push(`Resultado: Risco MÉDIO - fatores de atenção moderados`);
  }
  // Decision Path 5: Low risk
  else {
    riskLevel = 'low';
    decisionPath.push(`Todos os indicadores em níveis satisfatórios`);
    decisionPath.push(`Notas: ${student.grade}, Frequência: ${student.attendance}%, Comportamento: ${student.behavior}`);
    decisionPath.push(`Resultado: Risco BAIXO`);
    
    // Even for low risk, suggest some positive reinforcement
    actionItems.push('Manter acompanhamento regular');
  }
  
  return { riskLevel, actionItems, decisionPath };
};

// Process a batch of students with the decision tree model
export const processStudentData = (students: Omit<StudentData, 'riskLevel' | 'actionItems'>[]): StudentData[] => {
  return students.map(student => {
    const { riskLevel, actionItems, decisionPath } = calculateRiskLevel(student);
    return {
      ...student,
      riskLevel,
      actionItems,
      decisionPath // Adding the decision path to the student data
    };
  });
};
