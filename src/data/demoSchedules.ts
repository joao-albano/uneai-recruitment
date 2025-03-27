
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
  
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
  twoDaysFromNow.setHours(15, 0, 0, 0);
  
  return [
    {
      id: 'schedule-1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: tomorrow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião de urgência com responsáveis para discutir queda no desempenho e plano de recuperação'
    },
    {
      id: 'schedule-2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: nextWeek,
      agentName: 'Psic. Rafael',
      status: 'scheduled',
      notes: 'Avaliação psicopedagógica e elaboração de plano de intervenção'
    },
    {
      id: 'schedule-3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: yesterday,
      agentName: 'Prof. Marcos',
      status: 'completed',
      notes: 'Acompanhamento de matemática - aluna mostrou melhora na compreensão de álgebra'
    },
    {
      id: 'schedule-4',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: twoDaysFromNow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Conversa sobre frequência e dificuldades de transporte'
    },
    {
      id: 'schedule-5',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: nextWeek,
      agentName: 'Prof. Carla',
      status: 'scheduled',
      notes: 'Orientação sobre olimpíada de matemática e preparação especial'
    }
  ];
};
