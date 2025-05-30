
import { useState, useCallback } from 'react';
import { FunnelStage } from '@/types/recruitment';
import { useToast } from '@/hooks/use-toast';

// Initial sample data for funnel stages
const initialFunnelStages: FunnelStage[] = [
  {
    id: '1',
    name: 'Lead Gerado',
    order: 1,
    description: 'Lead captado através de diversos canais',
    isActive: true,
    leadCount: 520,
    conversionRate: 75,
    expectedDuration: 2,
    subStages: []
  },
  {
    id: '2',
    name: 'Primeiro Contato',
    order: 2,
    description: 'Primeiro contato realizado com o lead',
    isActive: true,
    leadCount: 390,
    conversionRate: 64,
    expectedDuration: 3,
    subStages: [
      {
        id: '2-1',
        name: 'Material Enviado',
        order: 1,
        description: 'Material informativo enviado ao lead',
        isActive: true,
        leadCount: 210,
        conversionRate: 85,
        expectedDuration: 1,
        parentId: '2',
        isSubStage: true
      },
      {
        id: '2-2',
        name: 'Analisando Proposta',
        order: 2,
        description: 'Lead está analisando a proposta enviada',
        isActive: true,
        leadCount: 180,
        conversionRate: 78,
        expectedDuration: 2,
        parentId: '2',
        isSubStage: true
      }
    ]
  },
  {
    id: '3',
    name: 'Apresentação',
    order: 3,
    description: 'Apresentação do produto/serviço ao lead',
    isActive: true,
    leadCount: 150,
    conversionRate: 80,
    expectedDuration: 4,
    subStages: []
  },
  {
    id: '4',
    name: 'Visita',
    order: 4,
    description: 'Visita agendada com o lead',
    isActive: true,
    leadCount: 120,
    conversionRate: 85,
    expectedDuration: 5,
    subStages: []
  },
  {
    id: '5',
    name: 'Matrícula',
    order: 5,
    description: 'Lead realizou a matrícula',
    isActive: true,
    leadCount: 100,
    conversionRate: 90,
    expectedDuration: 1,
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

  const handleEditClick = useCallback((stage: FunnelStage) => {
    setSelectedStage(stage);
    setEditDialogOpen(true);
  }, []);

  const handleSaveStage = useCallback((updatedStage: FunnelStage) => {
    setFunnelStages(prevStages => {
      if (updatedStage.isSubStage && updatedStage.parentId) {
        // Update a sub-stage
        return prevStages.map(stage => {
          if (stage.id === updatedStage.parentId) {
            return {
              ...stage,
              subStages: (stage.subStages || []).map(subStage => 
                subStage.id === updatedStage.id ? updatedStage : subStage
              )
            };
          }
          return stage;
        });
      } else {
        // Update a main stage
        return prevStages.map(stage => 
          stage.id === updatedStage.id ? updatedStage : stage
        );
      }
    });
    
    setEditDialogOpen(false);
    setSelectedStage(null);
    
    toast({
      title: "Etapa atualizada",
      description: `A etapa "${updatedStage.name}" foi atualizada com sucesso.`,
    });
  }, [toast]);

  const handleAddNewStage = useCallback((newStageData: Pick<FunnelStage, 'name' | 'description' | 'expectedDuration'>) => {
    const newStage: FunnelStage = {
      id: String(Date.now()),
      name: newStageData.name,
      order: funnelStages.length + 1,
      description: newStageData.description,
      isActive: true,
      leadCount: 0,
      conversionRate: 0,
      expectedDuration: newStageData.expectedDuration || 1,
      subStages: []
    };

    setFunnelStages(prevStages => [...prevStages, newStage]);
    setNewStageDialogOpen(false);
    
    toast({
      title: "Etapa criada",
      description: `A etapa "${newStage.name}" foi criada com sucesso.`,
    });
  }, [funnelStages.length, toast]);

  const addSubStage = useCallback((parentId: string) => {
    const parentStage = funnelStages.find(stage => stage.id === parentId);
    
    if (!parentStage) return;
    
    const newSubStage: FunnelStage = {
      id: `${parentId}-${(parentStage.subStages?.length || 0) + 1}`,
      name: 'Nova Sub-etapa',
      order: (parentStage.subStages?.length || 0) + 1,
      description: 'Descrição da nova sub-etapa',
      isActive: true,
      leadCount: 0,
      conversionRate: 0,
      expectedDuration: 1,
      parentId: parentId,
      isSubStage: true
    };
    
    setFunnelStages(prevStages => 
      prevStages.map(stage => {
        if (stage.id === parentId) {
          return {
            ...stage,
            subStages: [...(stage.subStages || []), newSubStage]
          };
        }
        return stage;
      })
    );
    
    // Automatically open edit dialog for the new sub-stage
    setSelectedStage(newSubStage);
    setEditDialogOpen(true);
    
    toast({
      title: "Sub-etapa criada",
      description: `Uma nova sub-etapa foi adicionada a "${parentStage.name}".`,
    });
  }, [funnelStages, toast]);

  const handleSaveConfig = useCallback((config: any) => {
    console.log("Saving config:", config);
    setConfigDialogOpen(false);
    
    toast({
      title: "Configurações salvas",
      description: "As configurações do funil foram atualizadas com sucesso.",
    });
  }, [toast]);

  return {
    funnelStages,
    setFunnelStages,
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
    addSubStage,
  };
}
