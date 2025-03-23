
import { ScheduleItem } from '@/types/data';
import { getRelativeDates, createDateWithTime } from './scheduleUtils';

export const generateUpcomingSchedules = (): ScheduleItem[] => {
  const { tomorrow, nextWeek, threeDaysAhead, fourDaysAhead, twoWeeksAhead } = getRelativeDates();
  
  return [
    {
      id: '6',
      studentId: '4',
      studentName: 'Daniel Pereira',
      date: createDateWithTime(tomorrow, 9, 0),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento regular de desempenho para manter bom rendimento.'
    },
    {
      id: '7',
      studentId: '6',
      studentName: 'Felipe Martins',
      date: createDateWithTime(tomorrow, 15, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discussão sobre atividades extracurriculares e participação em projetos escolares.'
    },
    {
      id: '8',
      studentId: '8',
      studentName: 'Henrique Alves',
      date: createDateWithTime(nextWeek, 13, 45),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Planejamento de estudos para o próximo período letivo.'
    },
    {
      id: '9',
      studentId: '5',
      studentName: 'Elena Costa',
      date: createDateWithTime(new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000), 10, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento das metas estabelecidas na reunião anterior.'
    },
    {
      id: '11',
      studentId: '1',
      studentName: 'Ana Silva',
      date: createDateWithTime(threeDaysAhead, 11, 0),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento do plano de melhoria acadêmica. Foco em matemática e ciências.'
    },
    {
      id: '13',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: createDateWithTime(fourDaysAhead, 9, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discussão sobre oportunidades de participação em olimpíadas de conhecimento.'
    },
    {
      id: '15',
      studentId: '8',
      studentName: 'Henrique Alves',
      date: createDateWithTime(twoWeeksAhead, 10, 45),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Orientação para trabalho de conclusão de semestre e preparação para apresentação.'
    },
    {
      id: '18',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: createDateWithTime(new Date(twoWeeksAhead.getTime() - 1 * 24 * 60 * 60 * 1000), 14, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para discutir evolução comportamental e estabelecer novas metas.'
    },
    {
      id: '20',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: createDateWithTime(new Date(fourDaysAhead.getTime() + 1 * 24 * 60 * 60 * 1000), 13, 30),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento do programa de leitura avançada. Verificar progresso e ajustar dificuldade dos textos.'
    }
  ];
};
