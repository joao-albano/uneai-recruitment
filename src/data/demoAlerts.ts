
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
