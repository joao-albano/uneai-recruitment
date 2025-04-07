
export interface OmnichannelReportData {
  // Métricas gerais
  totalInteractions: number;
  interactionGrowth: number;
  avgResponseTime: number;
  responseTimeChange: number;
  resolutionRate: number;
  resolutionRateChange: number;
  dominantEmotion: 'positiva' | 'neutra' | 'negativa';
  positiveEmotionPercentage: number;
  
  // Distribuição por canal
  channelDistribution: {
    whatsapp: number;
    email: number;
    phone: number;
  };
  
  // Insights principais
  keyInsights: string[];
  
  // Dados para gráficos
  responseTimeByChannel: {
    name: string;
    avgTime: number;
    firstResponseTime: number;
  }[];
  
  resolutionByChannel: {
    name: string;
    resolutionRate: number;
    satisfactionRate: number;
  }[];
  
  dailyVolume: {
    date: string;
    whatsapp: number;
    email: number;
    phone: number;
  }[];
  
  // Métricas detalhadas por canal
  channelMetrics: {
    name: string;
    interactions: number;
    avgTime: number;
    firstResponseTime: number;
    resolutionRate: number;
    satisfactionRate: number;
    transferRate: number;
  }[];
  
  // Análise de emoções
  emotionDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  
  emotionsByChannel: {
    channel: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
  
  emotionTrend: {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }[];
  
  emotionImpact: {
    emotion: string;
    resolutionRate: number;
    avgInteractionTime: number;
  }[];
  
  emotionalTriggers: {
    positive: string[];
    neutral: string[];
    negative: string[];
  };
  
  // Insights de interação
  peakHours: {
    hour: string;
    whatsapp: number;
    email: number;
    phone: number;
  }[];
  
  topTopics: {
    topic: string;
    count: number;
  }[];
  
  conversionByChannel: {
    channel: string;
    rate: number;
  }[];
  
  efficiencyTrend: {
    date: string;
    responseTime: number;
    resolutionRate: number;
  }[];
  
  recommendations: {
    title: string;
    description: string;
    priority: 'alta' | 'média' | 'baixa';
    actions: string[];
  }[];
}
