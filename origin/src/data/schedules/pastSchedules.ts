
import { ScheduleItem } from '@/types/data';
import { getRelativeDates, createDateWithTime } from './scheduleUtils';

export const generatePastSchedules = (): ScheduleItem[] => {
  const { yesterday, lastWeek, twoDaysAgo } = getRelativeDates();
  
  return [
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: createDateWithTime(yesterday, 9, 0),
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Intervenção comportamental concluída. Recomendação de IA aplicada: estabelecimento de rotina de estudos estruturada.'
    },
    {
      id: '4',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: createDateWithTime(lastWeek, 11, 15),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Apoio acadêmico realizado. Plano de estudos baseado em análise de IA sobre pontos fracos identificados.'
    },
    {
      id: '5',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: createDateWithTime(new Date(lastWeek.getTime() - 3 * 24 * 60 * 60 * 1000), 10, 0),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Monitoramento preventivo conforme recomendação do modelo para manutenção do bom desempenho.'
    },
    {
      id: '10',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: createDateWithTime(new Date(yesterday.getTime() - 2 * 24 * 60 * 60 * 1000), 14, 30),
      agentName: 'Prof. Juliana',
      status: 'canceled',
      notes: 'Cancelado devido a conflito de horário com atividade escolar.'
    },
    {
      id: '14',
      studentId: '5',
      studentName: 'Elena Costa',
      date: createDateWithTime(twoDaysAgo, 13, 0),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Intervenção específica em dificuldades de leitura e interpretação de texto. Atividades propostas foram bem recebidas.'
    },
    {
      id: '16',
      studentId: '4',
      studentName: 'Daniel Pereira',
      date: createDateWithTime(lastWeek, 15, 30),
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Discussão sobre participação em programa de mentoria para novos alunos. O aluno demonstrou grande interesse e aptidão.'
    },
    {
      id: '19',
      studentId: '1',
      studentName: 'Ana Silva',
      date: createDateWithTime(twoDaysAgo, 9, 15),
      agentName: 'Prof. Ricardo',
      status: 'canceled',
      notes: 'Atendimento cancelado a pedido dos pais. Remarcação pendente.'
    }
  ];
};
