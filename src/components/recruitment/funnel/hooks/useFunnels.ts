
import { useState, useEffect, useCallback } from 'react';
import { Funnel, FunnelStage } from '@/types/recruitment';
import { useToast } from '@/hooks/use-toast';
import { initialFunnels } from './funnelMockData';
import { 
  createNewFunnel, 
  updateFunnelStagesInList, 
  toggleFunnelActiveState,
  updateSelectedFunnel
} from './funnelOperations';

export function useFunnels() {
  const { toast } = useToast();
  const [funnels, setFunnels] = useState<Funnel[]>(initialFunnels);
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(null);
  const [createFunnelDialogOpen, setCreateFunnelDialogOpen] = useState(false);

  // Initialize with the first funnel
  useEffect(() => {
    if (funnels.length > 0 && !selectedFunnel) {
      setSelectedFunnel(funnels[0]);
    }
  }, [funnels, selectedFunnel]);

  const handleCreateFunnel = useCallback((funnelData: { name: string; description: string }) => {
    const newFunnel = createNewFunnel(funnelData);
    
    setFunnels(prevFunnels => [...prevFunnels, newFunnel]);
    setSelectedFunnel(newFunnel);
    
    toast({
      title: "Funil criado",
      description: `O funil "${funnelData.name}" foi criado com sucesso.`,
    });
    
    setCreateFunnelDialogOpen(false);
  }, [toast]);

  const updateFunnelStages = useCallback((funnelId: string, stages: FunnelStage[]) => {
    setFunnels(prevFunnels => updateFunnelStagesInList(prevFunnels, funnelId, stages));
    
    // Also update the selected funnel if it's the one being modified
    if (selectedFunnel?.id === funnelId) {
      setSelectedFunnel(prev => 
        updateSelectedFunnel(prev, funnelId, { stages })
      );
    }
  }, [selectedFunnel]);

  // Função para ativar/desativar o funil
  const toggleFunnelActive = useCallback((funnelId: string, isActive: boolean) => {
    setFunnels(prevFunnels => toggleFunnelActiveState(prevFunnels, funnelId, isActive));
    
    // Also update the selected funnel if it's the one being modified
    if (selectedFunnel?.id === funnelId) {
      setSelectedFunnel(prev => 
        updateSelectedFunnel(prev, funnelId, { isActive })
      );
    }
  }, [selectedFunnel]);

  return {
    funnels,
    selectedFunnel,
    setSelectedFunnel,
    createFunnelDialogOpen,
    setCreateFunnelDialogOpen,
    handleCreateFunnel,
    updateFunnelStages,
    toggleFunnelActive
  };
}
