
// Types related to funnel stages and management

export type FunnelStage = {
  id: string;
  name: string;
  order: number;
  description?: string;
  isActive: boolean;
  leadCount: number;
  conversionRate?: number; // Taxa de conversão dessa etapa
  expectedDuration?: number; // Duração esperada em dias nessa etapa
  parentId?: string; // ID da etapa pai (se for uma sub-etapa)
  subStages?: FunnelStage[]; // Sub-etapas
  isSubStage?: boolean; // Indica se é uma sub-etapa
};

export type Funnel = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  stages: FunnelStage[];
  createdAt: string;
  updatedAt: string;
};
