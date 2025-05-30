
import { Schedule } from '@/types/schedule';
import { addDays, subDays, subWeeks, addWeeks, setHours, setMinutes } from 'date-fns';
import { StudentData } from '@/types/data';
import { AlertItem } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

export const generateDemoStudents = (): StudentData[] => {
  return [
    {
      id: '1',
      name: 'Ana Silva',
      registrationNumber: '2023001',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 5.8,
      attendance: 75,
      behavior: 3,
      riskLevel: 'high',
      parentName: 'Maria Silva',
      parentContact: '5511999991111',
      actionItems: [
        'Agendar reunião com responsável',
        'Reforço em matemática e língua portuguesa',
        'Acompanhamento psicopedagógico'
      ],
      decisionPath: [
        'Frequência abaixo de 80% (75%)',
        'Notas abaixo da média em 3 disciplinas',
        'Comportamento: nível 3 (neutro)',
        'Conclusão: Aluno com alto risco de evasão'
      ]
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '2023002',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 9.2,
      attendance: 95,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'João Santos',
      parentContact: '5511999992222',
      actionItems: [
        'Incentivo a participar de olimpíadas acadêmicas',
        'Oportunidades de liderança em projetos'
      ],
      decisionPath: [
        'Frequência acima de 90% (95%)',
        'Excelente desempenho acadêmico (9.2)',
        'Comportamento exemplar (nível 5)',
        'Conclusão: Baixo risco, potencial para destaque acadêmico'
      ]
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '2023003',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6.8,
      attendance: 85,
      behavior: 4,
      riskLevel: 'medium',
      parentName: 'Paula Oliveira',
      parentContact: '5511999993333',
      actionItems: [
        'Monitoramento do desempenho em matemática',
        'Feedback quinzenal sobre progresso'
      ],
      decisionPath: [
        'Frequência adequada (85%)',
        'Notas limítrofes em matemática',
        'Comportamento bom (nível 4)',
        'Conclusão: Risco médio, necessita acompanhamento preventivo'
      ]
    },
    // ... Additional student data kept from previous implementation
  ];
};

export const generateDemoAlerts = (): AlertItem[] => {
  const now = new Date();
  
  return [
    {
      id: uuidv4(),
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Alto risco de evasão detectado. Frequência abaixo de 80% e notas em declínio.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionTaken: false
    },
    {
      id: uuidv4(),
      studentId: '5',
      studentName: 'Elena Costa',
      studentClass: '9C',
      type: 'meeting-scheduled',
      message: 'Reunião com pais agendada para 15/04 às 14:00.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
      actionTaken: true
    },
    {
      id: uuidv4(),
      studentId: '3',
      studentName: 'Carla Oliveira',
      studentClass: '9B',
      type: 'medium-risk',
      message: 'Risco médio identificado. Queda em matemática nas últimas avaliações.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      read: false,
      actionTaken: false
    },
    {
      id: uuidv4(),
      studentId: 'lead-101',
      studentName: 'Lucas Ferreira',
      studentClass: 'Lead',
      type: 'lead-opportunity',
      message: 'Novo lead qualificado para Engenharia Civil com alta probabilidade de conversão.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 8), // 8 hours ago
      read: false,
      actionTaken: false
    },
    {
      id: uuidv4(),
      studentId: 'lead-102',
      studentName: 'Isabela Santos',
      studentClass: 'Lead',
      type: 'appointment-reminder',
      message: 'Lembrete: Visita agendada com pais para amanhã às 10h.',
      createdAt: new Date(now.getTime() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionTaken: false
    }
  ];
};

export const generateDemoSchedules = (): Schedule[] => {
  const today = new Date();
  
  const demoSchedules: Schedule[] = [
    // Today's scheduled appointments
    {
      id: 'schedule-1',
      studentId: 'lead-101',
      studentName: 'Lucas Ferreira',
      date: setMinutes(setHours(today, 10), 30),
      agentName: 'Coord. Renata',
      status: 'scheduled',
      notes: 'Primeira visita à escola, interessado no curso de Engenharia Civil',
      productContext: 'recruitment',
      educationType: 'higher',
      studentPhone: '(11) 98765-4321',
      studentEmail: 'lucas.ferreira@email.com',
      course: 'Engenharia Civil'
    },
    {
      id: 'schedule-2',
      studentId: 'lead-102',
      studentName: 'Isabela Santos',
      date: setMinutes(setHours(today, 14), 0),
      agentName: 'Coord. Renata',
      status: 'scheduled',
      notes: 'Pais interessados em conhecer a escola para o próximo ano letivo',
      productContext: 'recruitment',
      educationType: 'basic',
      parentName: 'Roberto Santos',
      parentPhone: '(11) 99876-5432'
    },
    {
      id: 'schedule-3',
      studentId: 'lead-103',
      studentName: 'Marcos Almeida',
      date: setMinutes(setHours(today, 16), 15),
      agentName: 'Prof. Camila',
      status: 'scheduled',
      notes: 'Interessado no programa de bolsas para Medicina',
      productContext: 'recruitment',
      educationType: 'higher',
      studentPhone: '(11) 95432-1098',
      studentEmail: 'marcos.almeida@email.com',
      course: 'Medicina'
    },
    
    // Future scheduled appointments
    {
      id: 'schedule-4',
      studentId: 'lead-104',
      studentName: 'Juliana Ribeiro',
      date: setMinutes(setHours(addDays(today, 2), 9), 0),
      agentName: 'Coord. Renata',
      status: 'scheduled',
      notes: 'Segunda reunião com responsáveis sobre matrícula para o 2º ano do Ensino Médio',
      productContext: 'recruitment',
      educationType: 'basic',
      parentName: 'Carla Ribeiro',
      parentPhone: '(11) 96543-2109'
    },
    {
      id: 'schedule-5',
      studentId: 'lead-105',
      studentName: 'Thiago Mendes',
      date: setMinutes(setHours(addDays(today, 3), 11), 30),
      agentName: 'Prof. Camila',
      status: 'scheduled',
      notes: 'Interessado em transferência para o 2º semestre',
      productContext: 'recruitment',
      educationType: 'higher',
      studentPhone: '(11) 97654-3210',
      studentEmail: 'thiago.mendes@email.com',
      course: 'Administração'
    },
    
    // Completed appointments (past)
    {
      id: 'schedule-6',
      studentId: 'lead-106',
      studentName: 'Amanda Costa',
      date: setMinutes(setHours(subDays(today, 1), 14), 0),
      agentName: 'Coord. Renata',
      status: 'completed',
      notes: 'Reunião concluída com sucesso. Família interessada em iniciar matrícula para o próximo semestre.',
      productContext: 'recruitment',
      educationType: 'basic',
      parentName: 'Marcelo Costa',
      parentPhone: '(11) 98123-4567'
    },
    {
      id: 'schedule-7',
      studentId: 'lead-107',
      studentName: 'Bruno Oliveira',
      date: setMinutes(setHours(subDays(today, 3), 10), 0),
      agentName: 'Prof. Camila',
      status: 'completed',
      notes: 'Candidato participou da apresentação do curso e demonstrou forte interesse. Programado contato de follow-up.',
      productContext: 'recruitment',
      educationType: 'higher',
      studentPhone: '(11) 98234-5678',
      studentEmail: 'bruno.oliveira@email.com',
      course: 'Direito'
    },
    {
      id: 'schedule-8',
      studentId: 'lead-108',
      studentName: 'Camila Rodrigues',
      date: setMinutes(setHours(subWeeks(today, 1), 15), 30),
      agentName: 'Coord. Renata',
      status: 'completed',
      notes: 'Processo de matrícula iniciado. Pais ficaram satisfeitos com as instalações e plano pedagógico.',
      productContext: 'recruitment',
      educationType: 'basic',
      parentName: 'Eduardo Rodrigues',
      parentPhone: '(11) 98345-6789'
    },
    
    // Canceled appointments
    {
      id: 'schedule-9',
      studentId: 'lead-109',
      studentName: 'Daniel Martins',
      date: setMinutes(setHours(subDays(today, 2), 11), 0),
      agentName: 'Prof. Camila',
      status: 'canceled',
      notes: 'Candidato solicitou cancelamento devido a conflito de agenda. Reagendamento pendente.',
      productContext: 'recruitment',
      educationType: 'higher',
      studentPhone: '(11) 98456-7890',
      studentEmail: 'daniel.martins@email.com',
      course: 'Sistemas de Informação'
    },
    {
      id: 'schedule-10',
      studentId: 'lead-110',
      studentName: 'Eduarda Pereira',
      date: setMinutes(setHours(subWeeks(today, 2), 9), 30),
      agentName: 'Coord. Renata',
      status: 'canceled',
      notes: 'Família decidiu adiar visita para o próximo mês por motivos pessoais.',
      productContext: 'recruitment',
      educationType: 'basic',
      parentName: 'Paulo Pereira',
      parentPhone: '(11) 98567-8901'
    }
  ];
  
  return demoSchedules;
};
