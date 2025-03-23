
import { ScheduleItem } from '@/types/data';

export const generateDemoSchedules = (): ScheduleItem[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  
  const threeDaysAhead = new Date(today);
  threeDaysAhead.setDate(today.getDate() + 3);
  
  const fourDaysAhead = new Date(today);
  fourDaysAhead.setDate(today.getDate() + 4);
  
  const twoWeeksAhead = new Date(today);
  twoWeeksAhead.setDate(today.getDate() + 14);
  
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discutir frequência e desempenho acadêmico. Recomendado pelo modelo de IA: foco em plano de recuperação de notas.'
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para tratar problemas de frequência. Estratégia sugerida pelo modelo: estabelecer metas claras de frequência.'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 0),
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Intervenção comportamental concluída. Recomendação de IA aplicada: estabelecimento de rotina de estudos estruturada.'
    },
    {
      id: '4',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 11, 15),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Apoio acadêmico realizado. Plano de estudos baseado em análise de IA sobre pontos fracos identificados.'
    },
    {
      id: '5',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate() - 3, 10, 0),
      agentName: 'Prof. Ricardo',
      status: 'completed',
      notes: 'Monitoramento preventivo conforme recomendação do modelo para manutenção do bom desempenho.'
    },
    {
      id: '6',
      studentId: '4',
      studentName: 'Daniel Pereira',
      date: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento regular de desempenho para manter bom rendimento.'
    },
    {
      id: '7',
      studentId: '6',
      studentName: 'Felipe Martins',
      date: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 15, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discussão sobre atividades extracurriculares e participação em projetos escolares.'
    },
    {
      id: '8',
      studentId: '8',
      studentName: 'Henrique Alves',
      date: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate(), 13, 45),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Planejamento de estudos para o próximo período letivo.'
    },
    {
      id: '9',
      studentId: '5',
      studentName: 'Elena Costa',
      date: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate() + 2, 10, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento das metas estabelecidas na reunião anterior.'
    },
    {
      id: '10',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() - 2, 14, 30),
      agentName: 'Prof. Juliana',
      status: 'canceled',
      notes: 'Cancelado devido a conflito de horário com atividade escolar.'
    },
    {
      id: '11',
      studentId: '1',
      studentName: 'Ana Silva',
      date: new Date(threeDaysAhead.getFullYear(), threeDaysAhead.getMonth(), threeDaysAhead.getDate(), 11, 0),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento do plano de melhoria acadêmica. Foco em matemática e ciências.'
    },
    {
      id: '12',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 15),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Revisão de progresso nas atividades de reforço. Verificar evolução nas notas de português.'
    },
    {
      id: '13',
      studentId: '2',
      studentName: 'Bruno Santos',
      date: new Date(fourDaysAhead.getFullYear(), fourDaysAhead.getMonth(), fourDaysAhead.getDate(), 9, 30),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discussão sobre oportunidades de participação em olimpíadas de conhecimento.'
    },
    {
      id: '14',
      studentId: '5',
      studentName: 'Elena Costa',
      date: new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate(), 13, 0),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Intervenção específica em dificuldades de leitura e interpretação de texto. Atividades propostas foram bem recebidas.'
    },
    {
      id: '15',
      studentId: '8',
      studentName: 'Henrique Alves',
      date: new Date(twoWeeksAhead.getFullYear(), twoWeeksAhead.getMonth(), twoWeeksAhead.getDate(), 10, 45),
      agentName: 'Prof. Ricardo',
      status: 'scheduled',
      notes: 'Orientação para trabalho de conclusão de semestre e preparação para apresentação.'
    },
    {
      id: '16',
      studentId: '4',
      studentName: 'Daniel Pereira',
      date: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 15, 30),
      agentName: 'Coord. Mariana',
      status: 'completed',
      notes: 'Discussão sobre participação em programa de mentoria para novos alunos. O aluno demonstrou grande interesse e aptidão.'
    },
    {
      id: '17',
      studentId: '6',
      studentName: 'Felipe Martins',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
      agentName: 'Prof. Juliana',
      status: 'completed',
      notes: 'Orientação vocacional inicial. Exploração de áreas de interesse para futuros estudos.'
    },
    {
      id: '18',
      studentId: '3',
      studentName: 'Carla Oliveira',
      date: new Date(twoWeeksAhead.getFullYear(), twoWeeksAhead.getMonth(), twoWeeksAhead.getDate() - 1, 14, 0),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Reunião com pais para discutir evolução comportamental e estabelecer novas metas.'
    },
    {
      id: '19',
      studentId: '1',
      studentName: 'Ana Silva',
      date: new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate(), 9, 15),
      agentName: 'Prof. Ricardo',
      status: 'canceled',
      notes: 'Atendimento cancelado a pedido dos pais. Remarcação pendente.'
    },
    {
      id: '20',
      studentId: '7',
      studentName: 'Gabriela Lima',
      date: new Date(fourDaysAhead.getFullYear(), fourDaysAhead.getMonth(), fourDaysAhead.getDate() + 1, 13, 30),
      agentName: 'Prof. Juliana',
      status: 'scheduled',
      notes: 'Acompanhamento do programa de leitura avançada. Verificar progresso e ajustar dificuldade dos textos.'
    }
  ];
};
