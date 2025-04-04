
// Types related to leads and lead management
import { ChannelType, EmotionType, IntentType, ObjectionType, LeadStatus } from './common';

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
