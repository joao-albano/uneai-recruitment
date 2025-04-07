
import { useState, useEffect } from 'react';
import { FunnelStage } from '@/types/recruitment';
import { useToast } from '@/hooks/use-toast';

// Initial data for funnel stages
const initialFunnelStages: FunnelStage[] = [
  { 
    id: '1', 
    name: 'Lead Gerado', 
    order: 1, 
    isActive: true, 
    leadCount: 520, 
    conversionRate: 75,
    expectedDuration: 2,
    description: 'Lead captado através de diversos canais',
    subStages: []
  },
  { 
    id: '2', 
    name: 'Primeiro Contato', 
    order: 2, 
    isActive: true, 
    leadCount: 390, 
    conversionRate: 64,
    expectedDuration: 3,
    description: 'Primeiro contato realizado com o lead',
    subStages: [
      {
        id: '2.1',
        name: 'Material Enviado',
        order: 1,
        isActive: true,
        leadCount: 210,
        conversionRate: 85,
        expectedDuration: 1,
        description: 'Material informativo enviado ao lead',
        parentId: '2',
        isSubStage: true
      },
      {
        id: '2.2',
        name: 'Analisando Proposta',
        order: 2,
        isActive: true,
        leadCount: 180,
        conversionRate: 78,
        expectedDuration: 2,
        description: 'Lead está analisando a proposta enviada',
        parentId: '2',
        isSubStage: true
      }
    ]
  },
  { 
    id: '3', 
    name: 'Apresentação', 
    order: 3, 
    isActive: true, 
    leadCount: 250, 
    conversionRate: 68,
    expectedDuration: 5,
    description: 'Apresentação da instituição e cursos',
    subStages: []
  },
  { 
    id: '4', 
    name: 'Visita', 
    order: 4, 
    isActive: true, 
    leadCount: 170, 
    conversionRate: 65,
    expectedDuration: 7,
    description: 'Visita agendada à instituição',
    subStages: []
  },
  { 
    id: '5', 
    name: 'Matrícula', 
    order: 5, 
    isActive: true, 
    leadCount: 110, 
    conversionRate: 100,
    expectedDuration: 2,
    description: 'Processo de matrícula concluído',
    subStages: []
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
    setFunnelStages(prevStages => {
      // Function to recursively update stages
      const updateStages = (stages: FunnelStage[]): FunnelStage[] => {
        return stages.map(stage => {
          if (stage.id === updatedStage.id) {
            return { ...updatedStage };
          }
          
          if (stage.subStages && stage.subStages.length > 0) {
            return {
              ...stage,
              subStages: updateStages(stage.subStages)
            };
          }
          
          return stage;
        });
      };
      
      return updateStages(prevStages);
    });
    
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
    const newStageId = String(Math.random().toString(36).substr(2, 9));
    const newStageOrder = funnelStages.length + 1;
    
    const newStage: FunnelStage = {
      id: newStageId,
      name: stageData.name,
      order: newStageOrder,
      isActive: true,
      leadCount: 0,
      conversionRate: 0,
      expectedDuration: stageData.expectedDuration,
      description: stageData.description,
      subStages: []
    };
    
    setFunnelStages(prevStages => [...prevStages, newStage]);
    
    toast({
      title: "Etapa criada",
      description: `A etapa "${stageData.name}" foi adicionada ao funil com sucesso.`,
    });
    
    setNewStageDialogOpen(false);
  };

  const addSubStage = (parentStageId: string) => {
    // Find the parent stage
    const parentStage = funnelStages.find(stage => stage.id === parentStageId);
    
    if (!parentStage) {
      toast({
        title: "Erro",
        description: "Etapa pai não encontrada.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new sub-stage
    const newSubStage: FunnelStage = {
      id: `${parentStageId}.${(parentStage.subStages?.length || 0) + 1}`,
      name: `Nova sub-etapa de ${parentStage.name}`,
      order: (parentStage.subStages?.length || 0) + 1,
      isActive: true,
      leadCount: 0,
      conversionRate: 0,
      expectedDuration: 1,
      description: `Sub-etapa de ${parentStage.name}`,
      parentId: parentStageId,
      isSubStage: true
    };
    
    // Update the funnel stages
    setFunnelStages(prevStages => {
      return prevStages.map(stage => {
        if (stage.id === parentStageId) {
          return {
            ...stage,
            subStages: [...(stage.subStages || []), newSubStage]
          };
        }
        return stage;
      });
    });
    
    // Select the new sub-stage for editing
    setSelectedStage(newSubStage);
    setEditDialogOpen(true);
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
    handleSaveConfig,
    addSubStage
  };
}
