
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
  color?: string; // Cor da etapa
  icon?: React.ReactNode | null; // Ícone da etapa
  actions?: string[]; // Ações disponíveis na etapa
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
