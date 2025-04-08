
import { AlertItem } from '@/types/data';

export const generateDemoAlerts = (): AlertItem[] => {
  return [
    // Alertas de captação (recrutamento)
    {
      id: 'c1',
      studentId: 'lead1',
      studentName: 'Ricardo Oliveira',
      studentClass: 'Graduação',
      type: 'lead-opportunity',
      message: 'Lead com alta probabilidade de conversão. Visitou o site 5 vezes na última semana e baixou o material informativo do curso de Engenharia.',
      createdAt: new Date(Date.now() - 3600000 * 2), // 2 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c2',
      studentId: 'lead2',
      studentName: 'Mariana Santos',
      studentClass: 'Pós-graduação',
      type: 'stage-change',
      message: 'Mariana Santos avançou para a etapa de "Agendamento" no funil de captação. Recomenda-se contato imediato.',
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c3',
      studentId: '',
      studentName: '',
      studentClass: '',
      type: 'campaign-performance',
      message: 'Campanha "Matrícula Antecipada 2025" está performando 35% acima da meta. Considere ampliar o investimento.',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      read: true,
      actionTaken: false
    },
    {
      id: 'c4',
      studentId: 'lead3',
      studentName: 'Felipe Mendes',
      studentClass: 'MBA',
      type: 'lead-assigned',
      message: 'Novo lead designado para seu acompanhamento. Felipe demonstrou interesse no programa de MBA Executivo durante evento corporativo.',
      createdAt: new Date(Date.now() - 3600000 * 5), // 5 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c5',
      studentId: 'lead4',
      studentName: 'Carolina Barros',
      studentClass: 'Graduação',
      type: 'lead-opportunity',
      message: 'Lead qualificado pelo chatbot como "alta prioridade". Solicitou informações sobre formas de pagamento e disponibilidade de bolsas para o curso de Psicologia.',
      createdAt: new Date(Date.now() - 3600000 * 8), // 8 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c6',
      studentId: '',
      studentName: '',
      studentClass: '',
      type: 'info',
      message: 'O prazo para matrículas com desconto termina em 5 dias. Existem 28 leads na etapa de "Interesse Confirmado" que ainda não foram contatados.',
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      read: true,
      actionTaken: true
    },
    {
      id: 'c7',
      studentId: 'lead5',
      studentName: 'André Martins',
      studentClass: 'Técnico',
      type: 'stage-change',
      message: 'André Martins regrediu da etapa "Proposta Enviada" para "Avaliando Concorrentes". Recomenda-se ação de reengajamento urgente.',
      createdAt: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
      read: true,
      actionTaken: false
    },
    {
      id: 'c8',
      studentId: 'lead6',
      studentName: 'Juliana Costa',
      studentClass: 'Extensão',
      type: 'lead-assigned',
      message: 'Lead transferido para sua responsabilidade. Juliana está comparando preços dos cursos de extensão em Gestão de Projetos.',
      createdAt: new Date(Date.now() - 3600000 * 12), // 12 horas atrás
      read: false,
      actionTaken: false
    },
    // ===== NOVOS ALERTAS ADICIONADOS =====
    {
      id: 'c9',
      studentId: 'lead7',
      studentName: 'Paulo Ribeiro',
      studentClass: 'Graduação',
      type: 'lead-opportunity',
      message: 'Lead com interesse em Medicina. Compareceu ao evento de portas abertas e deixou contato para informações sobre processo seletivo e bolsas.',
      createdAt: new Date(Date.now() - 3600000 * 1), // 1 hora atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c10',
      studentId: 'lead8',
      studentName: 'Fernanda Gomes',
      studentClass: 'Pós-graduação',
      type: 'stage-change',
      message: 'Fernanda Gomes completou a etapa de "Avaliação Financeira" e está pronta para receber a proposta final. Necessário contato prioritário.',
      createdAt: new Date(Date.now() - 3600000 * 4), // 4 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c11',
      studentId: '',
      studentName: '',
      studentClass: '',
      type: 'campaign-performance',
      message: 'Campanha "Volta às Aulas 2025" apresentando baixa conversão (12% abaixo da meta). Recomenda-se revisão de segmentação e mensagem.',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c12',
      studentId: 'lead9',
      studentName: 'Roberto Almeida',
      studentClass: 'Doutorado',
      type: 'lead-assigned',
      message: 'Professor visitante interessado no programa de doutorado em Engenharia. Alta probabilidade de conversão devido ao perfil acadêmico.',
      createdAt: new Date(Date.now() - 3600000 * 6), // 6 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c13',
      studentId: 'lead10',
      studentName: 'Carla Souza',
      studentClass: 'Graduação',
      type: 'lead-opportunity',
      message: 'Estudante de último ano do ensino médio com histórico acadêmico excepcional. Interessada em bolsa de mérito para o curso de Direito.',
      createdAt: new Date(Date.now() - 3600000 * 7), // 7 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c14',
      studentId: '',
      studentName: '',
      studentClass: '',
      type: 'info',
      message: 'Novo recurso de captação via Instagram disponível. 12 leads foram gerados nas últimas 24h através desta nova integração.',
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c15',
      studentId: 'lead11',
      studentName: 'Lucas Ferreira',
      studentClass: 'MBA',
      type: 'stage-change',
      message: 'Lucas Ferreira solicitou alteração da forma de pagamento. Necessário revisar proposta e reenviar documentação atualizada.',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c16',
      studentId: 'lead12',
      studentName: 'Amanda Cardoso',
      studentClass: 'Extensão',
      type: 'lead-assigned',
      message: 'Profissional em transição de carreira buscando especialização em Data Science. Indicada por aluno atual da instituição.',
      createdAt: new Date(Date.now() - 3600000 * 10), // 10 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c17',
      studentId: 'lead13',
      studentName: 'Rafael Moreira',
      studentClass: 'Mestrado',
      type: 'lead-opportunity',
      message: 'Profissional sênior com interesse em programa de mestrado executivo em horário noturno. Potencial para captação de outros funcionários da mesma empresa.',
      createdAt: new Date(Date.now() - 3600000 * 3), // 3 horas atrás
      read: false,
      actionTaken: false
    },
    {
      id: 'c18',
      studentId: 'lead14',
      studentName: 'Beatriz Lima',
      studentClass: 'Graduação',
      type: 'stage-change',
      message: 'Beatriz Lima participa do processo seletivo há mais de 30 dias sem evolução. Recomendar ação de recuperação ou fechamento do ciclo.',
      createdAt: new Date(Date.now() - 86400000 * 4), // 4 dias atrás
      read: true,
      actionTaken: true
    },
    // Mantendo alguns alertas originais de alta prioridade
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Queda significativa no desempenho acadêmico. Ana Silva apresentou notas abaixo da média em 3 disciplinas consecutivas e frequência em declínio.',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      read: false,
      actionTaken: false
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      studentClass: '9C',
      type: 'high-risk',
      message: 'URGENTE: Elena Costa atingiu frequência crítica (65%) e apresenta sinais de possível evasão. Necessária intervenção imediata.',
      createdAt: new Date(Date.now() - 86400000), // 1 dia atrás
      read: false,
      actionTaken: false
    }
  ];
};
