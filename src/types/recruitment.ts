
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
};

export type FunnelStage = {
  id: string;
  name: string;
  order: number;
  description?: string;
  isActive: boolean;
  leadCount?: number;      // Total de leads nessa etapa
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
