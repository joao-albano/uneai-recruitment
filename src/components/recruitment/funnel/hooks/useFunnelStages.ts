
import { useState } from 'react';
import { FunnelStage } from '@/types/recruitment';
import { useToast } from '@/hooks/use-toast';

// Initial data for funnel stages
const initialFunnelStages = [
  { 
    id: '1', 
    name: 'Lead Gerado', 
    order: 1, 
    isActive: true, 
    leadCount: 520, 
    conversionRate: 75,
    expectedDuration: 2,
    description: 'Lead captado através de diversos canais'
  },
  { 
    id: '2', 
    name: 'Primeiro Contato', 
    order: 2, 
    isActive: true, 
    leadCount: 390, 
    conversionRate: 64,
    expectedDuration: 3,
    description: 'Primeiro contato realizado com o lead'
  },
  { 
    id: '3', 
    name: 'Apresentação', 
    order: 3, 
    isActive: true, 
    leadCount: 250, 
    conversionRate: 68,
    expectedDuration: 5,
    description: 'Apresentação da instituição e cursos'
  },
  { 
    id: '4', 
    name: 'Visita', 
    order: 4, 
    isActive: true, 
    leadCount: 170, 
    conversionRate: 65,
    expectedDuration: 7,
    description: 'Visita agendada à instituição'
  },
  { 
    id: '5', 
    name: 'Matrícula', 
    order: 5, 
    isActive: true, 
    leadCount: 110, 
    conversionRate: 100,
    expectedDuration: 2,
    description: 'Processo de matrícula concluído'
  }
];

export function useFunnelStages() {
  const { toast } = useToast();
  const [funnelStages, setFunnelStages] = useState<FunnelStage[]>(initialFunnelStages);
  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [newStageDialogOpen, setNewStageDialogOpen] = useState(false);

  const handleEditClick = (stage: FunnelStage) => {
    setSelectedStage(stage);
    setEditDialogOpen(true);
  };

  const handleSaveStage = (updatedStage: FunnelStage) => {
    setFunnelStages(prevStages => 
      prevStages.map(stage => 
        stage.id === updatedStage.id ? updatedStage : stage
      )
    );
    
    toast({
      title: "Etapa atualizada",
      description: `A etapa "${updatedStage.name}" foi atualizada com sucesso.`,
    });
  };

  const handleAddNewStage = (stageData: {
    name: string;
    description: string;
    expectedDuration: number;
  }) => {
    const newStageId = String(funnelStages.length + 1);
    const newStageOrder = funnelStages.length + 1;
    
    const newStage: FunnelStage = {
      id: newStageId,
      name: stageData.name,
      order: newStageOrder,
      isActive: true,
      leadCount: 0,
      conversionRate: 0,
      expectedDuration: stageData.expectedDuration,
      description: stageData.description
    };
    
    setFunnelStages(prevStages => [...prevStages, newStage]);
    setNewStageDialogOpen(false);
    
    toast({
      title: "Etapa criada",
      description: `A etapa "${stageData.name}" foi adicionada ao funil com sucesso.`,
    });
  };

  const handleSaveConfig = (config: {
    autoMoveLeads: boolean;
    notifyStaleLeads: boolean;
    staleDays: number;
  }) => {
    console.log("Funnel configuration saved:", config);
    setConfigDialogOpen(false);
  };

  return {
    funnelStages,
    selectedStage,
    editDialogOpen,
    setEditDialogOpen,
    configDialogOpen,
    setConfigDialogOpen,
    newStageDialogOpen,
    setNewStageDialogOpen,
    handleEditClick,
    handleSaveStage,
    handleAddNewStage,
    handleSaveConfig
  };
}
