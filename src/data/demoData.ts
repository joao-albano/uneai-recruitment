
import { StudentData, AlertItem, ScheduleItem } from '../types/data';

export const generateDemoStudents = (): StudentData[] => {
  return [
    {
      id: '1',
      name: 'Ana Silva',
      registrationNumber: '12345',
      class: '9A',
      grade: 5.5,
      attendance: 75,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Contatar pais', 'Agendar aconselhamento'],
      parentName: 'Roberto Silva',
      parentContact: '(11) 98765-4321',
      decisionPath: [
        'Frequência: 75% - Abaixo do ideal (risco médio)',
        'Nota média: 5.5 - Abaixo da média (risco alto)',
        'Comportamento: 3/5 - Mediano (mantém risco alto)'
      ]
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '23456',
      class: '9A',
      grade: 7.2,
      attendance: 92,
      behavior: 4,
      riskLevel: 'low',
      actionItems: ['Monitorar desempenho'],
      parentName: 'Marta Santos',
      parentContact: '(11) 91234-5678',
      decisionPath: [
        'Frequência: 92% - Excelente (risco baixo)',
        'Nota média: 7.2 - Acima da média (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '34567',
      class: '9B',
      grade: 6.1,
      attendance: 81,
      behavior: 2,
      riskLevel: 'medium',
      actionItems: ['Apoio acadêmico', 'Intervenção comportamental'],
      parentName: 'Paulo Oliveira',
      parentContact: '(11) 99876-5432',
      decisionPath: [
        'Frequência: 81% - Adequada (risco baixo)',
        'Nota média: 6.1 - Adequada (mantém risco baixo)',
        'Comportamento: 2/5 - Preocupante (risco elevado para médio)'
      ]
    },
    {
      id: '4',
      name: 'Daniel Pereira',
      registrationNumber: '45678',
      class: '9B',
      grade: 8.5,
      attendance: 96,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'Luisa Pereira',
      parentContact: '(11) 98123-4567',
      decisionPath: [
        'Frequência: 96% - Excelente (risco baixo)',
        'Nota média: 8.5 - Excelente (mantém risco baixo)',
        'Comportamento: 5/5 - Excelente (mantém risco baixo)'
      ]
    },
    {
      id: '5',
      name: 'Elena Costa',
      registrationNumber: '56789',
      class: '9C',
      grade: 4.8,
      attendance: 68,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Reunião com pais', 'Intervenção acadêmica'],
      parentName: 'Fernando Costa',
      parentContact: '(11) 99123-8765',
      decisionPath: [
        'Frequência: 68% - Crítica (risco alto)',
        'Nota média: 4.8 - Crítica (mantém risco alto)',
        'Comportamento: 3/5 - Mediano (mantém risco alto)'
      ]
    },
    {
      id: '6',
      name: 'Felipe Martins',
      registrationNumber: '67890',
      class: '9C',
      grade: 6.9,
      attendance: 88,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Joana Martins',
      parentContact: '(11) 97654-3210',
      decisionPath: [
        'Frequência: 88% - Boa (risco baixo)',
        'Nota média: 6.9 - Adequada (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    },
    {
      id: '7',
      name: 'Gabriela Lima',
      registrationNumber: '78901',
      class: '9A',
      grade: 5.9,
      attendance: 79,
      behavior: 3,
      riskLevel: 'medium',
      actionItems: ['Apoio acadêmico'],
      parentName: 'Ricardo Lima',
      parentContact: '(11) 96543-2109',
      decisionPath: [
        'Frequência: 79% - Adequada (risco baixo)',
        'Nota média: 5.9 - Limítrofe (risco médio)',
        'Comportamento: 3/5 - Mediano (mantém risco médio)'
      ]
    },
    {
      id: '8',
      name: 'Henrique Alves',
      registrationNumber: '89012',
      class: '9C',
      grade: 7.8,
      attendance: 93,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Cristina Alves',
      parentContact: '(11) 95432-1098',
      decisionPath: [
        'Frequência: 93% - Excelente (risco baixo)',
        'Nota média: 7.8 - Boa (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    }
  ];
};

export const generateDemoAlerts = (): AlertItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Ana Silva possui múltiplos fatores de risco: notas baixas, frequência abaixo de 80% e questões comportamentais.',
      createdAt: new Date(Date.now() - 86400000 * 2),
      read: false,
      actionTaken: false
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      studentClass: '9C',
      type: 'high-risk',
      message: 'Elena Costa tem problemas críticos de frequência (68%) e notas abaixo da média.',
      createdAt: new Date(Date.now() - 86400000),
      read: false,
      actionTaken: false
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      studentClass: '9B',
      type: 'medium-risk',
      message: 'Carla Oliveira possui notas limítrofes e preocupações comportamentais.',
      createdAt: new Date(),
      read: false,
      actionTaken: false
    }
  ];
};

export const generateDemoSchedules = (): ScheduleItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: new Date(Date.now() + 86400000),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discutir frequência e desempenho acadêmico. Recomendado pelo modelo de IA: foco em plano de recuperação de notas.'
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: new Date(Date.now() + 86400000 * 3),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para tratar problemas de frequência. Estratégia sugerida pelo modelo: estabelecer metas claras de frequência.'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: new Date(Date.now() - 86400000 * 2),
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Intervenção comportamental concluída. Recomendação de IA aplicada: estabelecimento de rotina de estudos estruturada.'
    },
    {
      id: '4',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: new Date(Date.now() - 86400000 * 5),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Apoio acadêmico realizado. Plano de estudos baseado em análise de IA sobre pontos fracos identificados.'
    },
    {
      id: '5',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: new Date(Date.now() - 86400000 * 10),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Monitoramento preventivo conforme recomendação do modelo para manutenção do bom desempenho.'
    }
  ];
};
