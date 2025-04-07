
import { OmnichannelReportData } from './types';

export const omnichannelReportData: OmnichannelReportData = {
  // Métricas gerais
  totalInteractions: 3847,
  interactionGrowth: 12.5,
  avgResponseTime: 8.3,
  responseTimeChange: -5.2,
  resolutionRate: 87.4,
  resolutionRateChange: 3.8,
  dominantEmotion: 'positiva',
  positiveEmotionPercentage: 68,
  
  // Distribuição por canal
  channelDistribution: {
    whatsapp: 62,
    email: 18,
    phone: 20
  },
  
  // Insights principais
  keyInsights: [
    "O WhatsApp é o canal preferido para 62% dos atendimentos, com maior eficiência de resolução.",
    "Atendimentos com emoções positivas têm 23% mais chances de conversão.",
    "O horário de pico de atendimento é entre 14h e 16h, especialmente por WhatsApp.",
    "Dúvidas sobre processo seletivo representam 35% de todos os atendimentos."
  ],
  
  // Dados para gráficos de desempenho por canal
  responseTimeByChannel: [
    { name: 'WhatsApp', avgTime: 5.2, firstResponseTime: 2.5 },
    { name: 'Email', avgTime: 15.8, firstResponseTime: 8.9 },
    { name: 'Telefone', avgTime: 3.6, firstResponseTime: 1.0 }
  ],
  
  resolutionByChannel: [
    { name: 'WhatsApp', resolutionRate: 89.5, satisfactionRate: 92.3 },
    { name: 'Email', resolutionRate: 76.2, satisfactionRate: 84.1 },
    { name: 'Telefone', resolutionRate: 94.8, satisfactionRate: 88.7 }
  ],
  
  dailyVolume: [
    { date: '01/04', whatsapp: 125, email: 32, phone: 43 },
    { date: '02/04', whatsapp: 142, email: 38, phone: 39 },
    { date: '03/04', whatsapp: 138, email: 35, phone: 41 },
    { date: '04/04', whatsapp: 156, email: 42, phone: 36 },
    { date: '05/04', whatsapp: 167, email: 45, phone: 42 },
    { date: '06/04', whatsapp: 110, email: 28, phone: 30 },
    { date: '07/04', whatsapp: 98, email: 25, phone: 24 }
  ],
  
  // Métricas detalhadas por canal
  channelMetrics: [
    { 
      name: 'WhatsApp', 
      interactions: 2385, 
      avgTime: 5.2, 
      firstResponseTime: 2.5, 
      resolutionRate: 89.5, 
      satisfactionRate: 92.3, 
      transferRate: 4.7 
    },
    { 
      name: 'Email', 
      interactions: 692, 
      avgTime: 15.8, 
      firstResponseTime: 8.9, 
      resolutionRate: 76.2, 
      satisfactionRate: 84.1, 
      transferRate: 12.5 
    },
    { 
      name: 'Telefone', 
      interactions: 770, 
      avgTime: 3.6, 
      firstResponseTime: 1.0, 
      resolutionRate: 94.8, 
      satisfactionRate: 88.7, 
      transferRate: 7.3 
    }
  ],
  
  // Análise de emoções
  emotionDistribution: {
    positive: 68,
    neutral: 21,
    negative: 11
  },
  
  emotionsByChannel: [
    { channel: 'WhatsApp', positive: 72, neutral: 18, negative: 10 },
    { channel: 'Email', positive: 58, neutral: 27, negative: 15 },
    { channel: 'Telefone', positive: 64, neutral: 23, negative: 13 }
  ],
  
  emotionTrend: [
    { date: '01/04', positive: 65, neutral: 23, negative: 12 },
    { date: '02/04', positive: 67, neutral: 21, negative: 12 },
    { date: '03/04', positive: 64, neutral: 24, negative: 12 },
    { date: '04/04', positive: 70, neutral: 19, negative: 11 },
    { date: '05/04', positive: 72, neutral: 18, negative: 10 },
    { date: '06/04', positive: 68, neutral: 22, negative: 10 },
    { date: '07/04', positive: 71, neutral: 20, negative: 9 }
  ],
  
  emotionImpact: [
    { emotion: 'Positiva', resolutionRate: 92, avgInteractionTime: 6.8 },
    { emotion: 'Neutra', resolutionRate: 85, avgInteractionTime: 9.2 },
    { emotion: 'Negativa', resolutionRate: 76, avgInteractionTime: 12.5 }
  ],
  
  emotionalTriggers: {
    positive: [
      "Respostas rápidas e claras sobre processo seletivo",
      "Informações detalhadas sobre bolsas e descontos",
      "Atendimento personalizado com demonstração de interesse",
      "Esclarecimento de dúvidas sobre o curso desejado"
    ],
    neutral: [
      "Informações gerais sobre a instituição",
      "Perguntas sobre calendário acadêmico",
      "Solicitação de materiais informativos",
      "Dúvidas sobre documentação necessária"
    ],
    negative: [
      "Longo tempo de espera para resolução",
      "Transferência excessiva entre atendentes",
      "Informações conflitantes entre canais",
      "Falta de clareza sobre valores e mensalidades"
    ]
  },
  
  // Insights de interação
  peakHours: [
    { hour: '08-10h', whatsapp: 185, email: 65, phone: 78 },
    { hour: '10-12h', whatsapp: 310, email: 84, phone: 102 },
    { hour: '12-14h', whatsapp: 290, email: 75, phone: 95 },
    { hour: '14-16h', whatsapp: 425, email: 98, phone: 135 },
    { hour: '16-18h', whatsapp: 380, email: 92, phone: 125 },
    { hour: '18-20h', whatsapp: 345, email: 75, phone: 87 },
    { hour: '20-22h', whatsapp: 290, email: 45, phone: 62 }
  ],
  
  topTopics: [
    { topic: 'Processo Seletivo', count: 1235 },
    { topic: 'Bolsas e Descontos', count: 985 },
    { topic: 'Cursos Oferecidos', count: 765 },
    { topic: 'Documentação', count: 540 },
    { topic: 'Calendário Acadêmico', count: 322 }
  ],
  
  conversionByChannel: [
    { channel: 'WhatsApp', rate: 28.5 },
    { channel: 'Email', rate: 18.2 },
    { channel: 'Telefone', rate: 32.7 }
  ],
  
  efficiencyTrend: [
    { date: '01/04', responseTime: 9.2, resolutionRate: 84 },
    { date: '02/04', responseTime: 8.9, resolutionRate: 85 },
    { date: '03/04', responseTime: 8.5, resolutionRate: 86 },
    { date: '04/04', responseTime: 8.3, resolutionRate: 87 },
    { date: '05/04', responseTime: 7.9, resolutionRate: 88 },
    { date: '06/04', responseTime: 7.5, resolutionRate: 89 },
    { date: '07/04', responseTime: 7.2, resolutionRate: 90 }
  ],
  
  recommendations: [
    {
      title: "Reforçar equipe de WhatsApp nos horários de pico",
      description: "O atendimento por WhatsApp apresenta maior demanda entre 14h e 16h, mas o tempo de resposta aumenta nesse período.",
      priority: 'alta',
      actions: [
        "Realocar 2-3 atendentes para WhatsApp no período de pico",
        "Implementar respostas rápidas para perguntas frequentes",
        "Criar fluxos automatizados para dúvidas sobre processo seletivo"
      ]
    },
    {
      title: "Melhorar tempo de resposta por e-mail",
      description: "O canal de e-mail apresenta o maior tempo de resposta (15.8 min) e a menor taxa de resolução (76.2%).",
      priority: 'média',
      actions: [
        "Implementar sistema de triagem de e-mails por assunto",
        "Criar modelos de resposta padronizados para tópicos frequentes",
        "Estabelecer meta de primeira resposta em até 5 minutos"
      ]
    },
    {
      title: "Capacitar atendentes sobre bolsas e descontos",
      description: "O segundo assunto mais abordado (985 interações) tem gerado transferências desnecessárias.",
      priority: 'alta',
      actions: [
        "Criar material de referência rápida sobre todas as bolsas disponíveis",
        "Treinar equipe sobre critérios de concessão e valores",
        "Implementar calculadora de descontos integrada ao sistema de atendimento"
      ]
    },
    {
      title: "Aprimorar conteúdo sobre processo seletivo no site",
      description: "35% dos atendimentos são dúvidas sobre processo seletivo que poderiam ser evitadas com informações mais claras.",
      priority: 'média',
      actions: [
        "Revisar a seção de FAQ do site com base nas perguntas mais frequentes",
        "Criar tutoriais em vídeo sobre inscrição e matrícula",
        "Desenvolver chatbot específico para dúvidas sobre processo seletivo"
      ]
    },
    {
      title: "Reduzir taxa de transferência nas interações por e-mail",
      description: "12.5% das interações por e-mail exigem transferência para outro atendente.",
      priority: 'baixa',
      actions: [
        "Melhorar o sistema de triagem inicial de e-mails",
        "Capacitar atendentes de e-mail em todos os assuntos principais",
        "Implementar sistema de consulta rápida entre atendentes"
      ]
    }
  ]
};
