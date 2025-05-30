
import { AnalysisRecord, Intervention } from './types';
import { StudentData } from '@/types/data';

// Gerar dados fictícios para histórico de análises
export const generateAnalysisHistory = (student: StudentData): AnalysisRecord[] => {
  // Datas para as análises (da mais recente para a mais antiga)
  const dates = [
    new Date(),
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias atrás
    new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 dias atrás
    new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 dias atrás
  ];

  // Progressão de indicadores (do mais antigo para o mais recente)
  // Vamos simular uma trajetória que leva ao nível de risco atual
  const indicators = [
    { grade: 7.5, attendance: 90, behavior: 4 }, // começou bem
    { grade: 6.8, attendance: 85, behavior: 3 }, // leve piora
    { grade: 6.0, attendance: 80, behavior: 3 }, // mais deterioração
    { grade: student.grade, attendance: student.attendance, behavior: student.behavior }, // estado atual
  ];

  // Níveis de risco correspondentes
  const riskLevels: ('low' | 'medium' | 'high')[] = [
    'low',
    indicators[1].grade < 7 || indicators[1].attendance < 85 ? 'medium' : 'low',
    indicators[2].grade < 6.5 || indicators[2].attendance < 80 ? 'medium' : 'low',
    student.riskLevel || 'low',
  ];

  // Gerar histórico de análises
  return dates.map((date, index) => ({
    id: `analysis-${index}`,
    date,
    riskLevel: riskLevels[3 - index], // ordem reversa para combinar com as datas
    analysisType: index === 0 ? 'manual' : 'automatic',
    performedBy: index === 0 ? 'Coord. Mariana Silva' : 'Sistema IA',
    indicators: indicators[3 - index], // ordem reversa para combinar com as datas
    notes: index === 0 
      ? 'Análise manual após conversa com professores. Aluno mostra sinais de desmotivação.'
      : undefined,
  }));
};

// Gerar dados fictícios de intervenções
export const generateInterventionHistory = (student: StudentData): Intervention[] => {
  // Se o aluno for de baixo risco, terá menos ou nenhuma intervenção
  if (student.riskLevel === 'low') {
    return [];
  }

  const interventions: Intervention[] = [];
  
  // Alunos de alto risco têm mais intervenções no histórico
  if (student.riskLevel === 'high') {
    interventions.push({
      id: 'int-1',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      interventionType: 'meeting',
      status: 'completed',
      performedBy: 'Coord. Mariana Silva',
      notes: 'Reunião com aluno e responsáveis para discutir desempenho e frequência.',
      outcome: 'Pais comprometeram-se a acompanhar tarefas diariamente. Aluno receberá apoio de monitoria.'
    });
    
    interventions.push({
      id: 'int-2',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      interventionType: 'monitoring',
      status: 'completed',
      performedBy: 'Prof. Carlos Santos',
      notes: 'Acompanhamento individual em matemática e português.',
      outcome: 'Dificuldades identificadas em interpretação de texto. Recomendado material complementar.'
    });
    
    // Intervenção agendada para o futuro
    interventions.push({
      id: 'int-3',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interventionType: 'meeting',
      status: 'scheduled',
      performedBy: 'Psicopedagoga Ana Luíza',
      notes: 'Avaliação das necessidades de aprendizagem e possíveis adaptações de material.',
    });
  }
  
  // Alunos de médio risco têm menos intervenções
  if (student.riskLevel === 'medium') {
    interventions.push({
      id: 'int-1',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      interventionType: 'call',
      status: 'completed',
      performedBy: 'Prof. Marcos Oliveira',
      notes: 'Contato com responsáveis para alertar sobre queda no desempenho.',
      outcome: 'Pais não estavam cientes. Comprometeram-se a acompanhar mais de perto.'
    });
    
    // Intervenção agendada para o futuro
    interventions.push({
      id: 'int-2',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      interventionType: 'monitoring',
      status: 'scheduled',
      performedBy: 'Prof. Marcos Oliveira',
      notes: 'Acompanhamento para verificar progresso após contato com pais.',
    });
  }
  
  return interventions;
};
