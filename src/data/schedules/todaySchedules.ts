
import { ScheduleItem } from '@/types/data';
import { getRelativeDates, createDateWithTime } from './scheduleUtils';

export const generateTodaySchedules = (): ScheduleItem[] => {
  const { today } = getRelativeDates();
  
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: createDateWithTime(today, 10, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discutir frequência e desempenho acadêmico. Recomendado pelo modelo de IA: foco em plano de recuperação de notas.'
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: createDateWithTime(today, 14, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para tratar problemas de frequência. Estratégia sugerida pelo modelo: estabelecer metas claras de frequência.'
    },
    {
      id: '12',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: createDateWithTime(today, 16, 15),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Revisão de progresso nas atividades de reforço. Verificar evolução nas notas de português.'
    },
    {
      id: '17',
      studentId: '6',
      studentName: 'Felipe Martins',
      date: createDateWithTime(today, 8, 0),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Orientação vocacional inicial. Exploração de áreas de interesse para futuros estudos.'
    }
  ];
};
