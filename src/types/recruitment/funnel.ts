
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
};
