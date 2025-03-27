
import { Schedule } from '@/types/schedule';

const createDateWithTime = (daysOffset = 0, hours = 9, minutes = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const generateDemoSchedules = (): Schedule[] => {
  return [
    // Agendamentos para hoje
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: createDateWithTime(0, 10, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discutir frequência e desempenho acadêmico. Recomendado pelo modelo de IA: foco em plano de recuperação de notas.'
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: createDateWithTime(0, 14, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para tratar problemas de frequência. Estratégia sugerida pelo modelo: estabelecer metas claras de frequência.'
    },
    {
      id: '12',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: createDateWithTime(0, 16, 15),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Revisão de progresso nas atividades de reforço. Verificar evolução nas notas de português.'
    },
    {
      id: '17',
      studentId: '6',
      studentName: 'Felipe Martins',
      date: createDateWithTime(0, 8, 0),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Orientação vocacional inicial. Exploração de áreas de interesse para futuros estudos.'
    },
    
    // Agendamentos futuros
    {
      id: '3',
      studentId: '2',
      studentName: 'Bruno Oliveira',
      date: createDateWithTime(1, 11, 0),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Acompanhamento de adaptação escolar. Aluno transferido recentemente.'
    },
    {
      id: '4',
      studentId: '3',
      studentName: 'Carlos Santos',
      date: createDateWithTime(2, 15, 30),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Feedback sobre progresso em matemática. Possibilidade de participação em olimpíada.'
    },
    {
      id: '5',
      studentId: '4',
      studentName: 'Diego Pereira',
      date: createDateWithTime(3, 9, 15),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discussão sobre comportamento em sala. Recomendação do sistema: atividades extracurriculares.'
    },
    {
      id: '6',
      studentId: '1',
      studentName: 'Ana Silva',
      date: createDateWithTime(5, 13, 45),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento de plano de estudos. Verificar evolução após intervenção anterior.'
    },
    {
      id: '7',
      studentId: '8',
      studentName: 'Henrique Alves',
      date: createDateWithTime(7, 10, 0),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Orientação para projeto científico. Aluno demonstrou interesse em física.'
    },
    
    // Agendamentos completados e cancelados para histórico
    {
      id: '8',
      studentId: '9',
      studentName: 'Isabela Gomes',
      date: createDateWithTime(-1, 14, 30),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Revisão de desempenho em língua portuguesa. Sugestão de leituras complementares.'
    },
    {
      id: '9',
      studentId: '10',
      studentName: 'João Mendes',
      date: createDateWithTime(-2, 11, 0),
      agentName: 'Coord. Mariana',
      status: 'canceled',
      notes: 'Reunião com responsáveis sobre comportamento. Cancelado a pedido dos pais.'
    },
    {
      id: '10',
      studentId: '3',
      studentName: 'Carlos Santos',
      date: createDateWithTime(-3, 9, 45),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Acompanhamento de projeto de ciências. Projeto concluído com sucesso.'
    }
  ];
};
