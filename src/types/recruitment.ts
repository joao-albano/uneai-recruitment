// Tipos de dados para o módulo de captação (recrutamento)

export type LeadStatus = 'novo' | 'contatado' | 'interessado' | 'nao_interessado' | 'agendado' | 'matriculado' | 'desistente';

export type ChannelType = 'site' | 'facebook' | 'instagram' | 'whatsapp' | 'indicacao' | 'google' | 'eventos' | 'presencial' | 'outros';

export type EmotionType = 'neutro' | 'positivo' | 'negativo' | 'confuso' | 'interessado' | 'hesitante' | 'entusiasmado';

export type IntentType = 
  | 'informacao_curso' 
  | 'informacao_preco' 
  | 'agendar_visita' 
  | 'solicitar_bolsa' 
  | 'reclamacao' 
  | 'elogio'
  | 'duvida_processo'
  | 'informacao_turno'
  | 'informacao_modalidade'
  | 'comparacao_concorrente'
  | 'desistencia'
  | 'outra';

export type ObjectionType = 
  | 'preco_alto' 
  | 'distancia' 
  | 'horario_incompativel' 
  | 'falta_informacao' 
  | 'concorrente_melhor' 
  | 'aguardando_decisao'
  | 'estrutura'
  | 'reputacao'
  | 'nenhuma';

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
  
  // Novos campos para IA conversacional
  lastEmotion?: EmotionType;
  lastIntent?: IntentType;
  lastObjection?: ObjectionType;
  responseTime?: number;   // Tempo médio de resposta em minutos
  interactionCount?: number; // Número total de interações
  
  // Dados de predição
  enrollmentScore?: number;    // Escore de probabilidade de matrícula (0-100)
  confidenceLevel?: 'alto' | 'medio' | 'baixo';  // Nível de confiança na predição
  predictedEnrollmentDate?: Date;  // Data prevista para matrícula
  customIncentives?: string[];     // Incentivos personalizados sugeridos
};

export type FunnelStage = {
  id: string;
  name: string;
  order: number;
  description?: string;
  isActive: boolean;
  leadCount?: number;      // Total de leads nessa etapa
  conversionRate?: number; // Taxa de conversão dessa etapa
  expectedDuration?: number; // Duração esperada em dias nessa etapa
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

export type Conversation = {
  id: string;
  leadId: string;
  startDate: Date;
  lastMessageDate: Date;
  channel: 'whatsapp' | 'email' | 'voz' | 'chat';
  messages: ConversationMessage[];
  summary?: string;
  aiSuggestions?: string[];
  emotionTrend?: EmotionType;
  status: 'ativa' | 'encerrada' | 'agendada' | 'convertida';
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  timestamp: Date;
  sender: 'lead' | 'instituicao' | 'ai';
  content: string;
  detectedEmotion?: EmotionType;
  detectedIntent?: IntentType;
  detectedObjection?: ObjectionType;
  isAutomatic?: boolean;
};

export type EnrollmentPrediction = {
  id: string;
  courseId: string;
  courseName: string;
  period: string;
  targetCount: number;
  predictedCount: number;
  confidence: 'alta' | 'media' | 'baixa';
  variance: number;
  riskLevel: 'baixo' | 'medio' | 'alto';
  lastUpdated: Date;
  suggestedActions?: string[];
  leadsByStage?: {
    stageId: string;
    stageName: string;
    count: number;
    convertionProbability: number;
  }[];
};
