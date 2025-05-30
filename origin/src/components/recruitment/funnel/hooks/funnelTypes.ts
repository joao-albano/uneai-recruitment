
import { Funnel, FunnelStage } from '@/types/recruitment';

export interface FunnelOperations {
  updateFunnelStages: (funnelId: string, stages: FunnelStage[]) => void;
  toggleFunnelActive: (funnelId: string, isActive: boolean) => void;
  handleCreateFunnel: (funnelData: { name: string; description: string }) => void;
  setCreateFunnelDialogOpen: (open: boolean) => void;
  setSelectedFunnel: (funnel: Funnel) => void;
}

export interface FunnelState {
  funnels: Funnel[];
  selectedFunnel: Funnel | null;
  createFunnelDialogOpen: boolean;
}
