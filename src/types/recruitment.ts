
// Tipos de dados para o módulo de captação (recrutamento)

export type LeadStatus = 'novo' | 'contatado' | 'interessado' | 'nao_interessado' | 'agendado' | 'matriculado' | 'desistente';

export type ChannelType = 'site' | 'facebook' | 'instagram' | 'whatsapp' | 'indicacao' | 'google' | 'eventos' | 'presencial' | 'outros';

export type LeadData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  channel: ChannelType;
  course?: string;         // Para IES
  grade?: string;          // Para escolas (série)
  funnelStage?: string;    // Etapa atual no funil
  status: LeadStatus;
  lastContactDate?: Date;
  responsiblePerson?: string;
  children?: number;       // Número de filhos (relevante para escolas)
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  // Campos específicos para instituições
  institutionType?: 'school' | 'university';  // Tipo de instituição
  campaign?: string;       // Campanha relacionada
  location?: string;       // Localização/região
  segments?: string[];     // Segmentos de interesse
  enrollmentScore?: number; // Escore de probabilidade de matrícula (0-100)
  lastAiInteraction?: Date; // Data da última interação com IA
  interactionHistory?: LeadInteraction[]; // Histórico de interações
};

export type LeadInteraction = {
  id: string;
  leadId: string;
  type: 'whatsapp' | 'email' | 'call' | 'webchat';
  content: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  createdAt: Date;
  aiSuggestions?: string[];
};

export type FunnelStage = {
  id: string;
  name: string;
  order: number;
  description?: string;
  isActive: boolean;
  leadCount?: number;      // Total de leads nessa etapa
  conversionRate?: number; // Taxa de conversão para próxima etapa
  averageDuration?: number; // Tempo médio na etapa (em dias)
  actions?: string[];      // Ações recomendadas para esta etapa
};

export type Campaign = {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget?: number;
  channel: ChannelType[];
  performance?: {
    leadsGenerated: number;
    conversion: number;
    cost?: number;
  };
  goal?: {
    targetLeads: number;
    targetConversion: number;
  };
};

export type EnrollmentPrediction = {
  leadId: string;
  leadName: string;
  score: number;  // 0-100
  factors: {
    interactionFrequency: number;
    responseSpeed: number;
    engagement: number;
    sentiment: number;
  };
  courseDemand?: number;
  lastUpdated: Date;
  recommendation?: string;
};

export type CourseEnrollmentProjection = {
  courseId: string;
  courseName: string;
  projectedEnrollments: number;
  currentLeads: number;
  conversionRate: number;
  target?: number;
  lastUpdated: Date;
};
