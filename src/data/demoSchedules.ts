
import { ScheduleItem } from '@/types/data';

export const generateDemoSchedules = (): ScheduleItem[] => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);
  
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 30, 0, 0);
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(11, 0, 0, 0);
  
  return [
    {
      id: 'schedule-1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: tomorrow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento para prevenção de evasão'
    },
    {
      id: 'schedule-2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: nextWeek,
      agentName: 'Psic. Rafael',
      status: 'scheduled',
      notes: 'Avaliação psicopedagógica'
    },
    {
      id: 'schedule-3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: yesterday,
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Conversa sobre desempenho em matemática'
    }
  ];
};
