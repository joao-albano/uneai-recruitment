
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

// Function to map stage to appropriate status - moved from useLeadsManagement.ts
const getStatusForStage = (stage: string): string => {
  switch (stage) {
    case 'Contato Inicial':
      return 'Novo';
    case 'Agendamento':
      return 'Em Andamento';
    case 'Visita':
      return 'Aguardando';
    case 'Matrícula':
      return 'Finalizado';
    default:
      return 'Novo';
  }
};

export const useLeadActions = (
  leadsData: any[],
  setLeadsData: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setHistoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  // Ensure these methods always stop propagation
  const handleEditLead = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead({...lead}); // Clone para evitar referências mutáveis
      setEditDialogOpen(true);
    }
  }, [leadsData, setSelectedLead, setEditDialogOpen]);
  
  const handleChangeStage = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead({...lead}); // Clone para evitar referências mutáveis
      setStageDialogOpen(true);
    }
  }, [leadsData, setSelectedLead, setStageDialogOpen]);

  // Direct function call (for drag-and-drop or other non-event triggers)
  const openChangeStageDialog = useCallback((leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead({...lead}); // Clone para evitar referências mutáveis
      setStageDialogOpen(true);
    }
  }, [leadsData, setSelectedLead, setStageDialogOpen]);
  
  const handleViewHistory = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead({...lead}); // Clone para evitar referências mutáveis
      setHistoryDialogOpen(true);
    }
  }, [leadsData, setSelectedLead, setHistoryDialogOpen]);
  
  const handleDeleteLead = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead({...lead}); // Clone para evitar referências mutáveis
      setDeleteDialogOpen(true);
    }
  }, [leadsData, setSelectedLead, setDeleteDialogOpen]);
  
  // Save changes to a lead - com tratamento de erro
  const handleSaveLead = useCallback((updatedLead: any) => {
    try {
      setLeadsData(prevData => 
        prevData.map(lead => 
          lead.id === updatedLead.id ? {...updatedLead} : lead
        )
      );
      
      toast({
        title: "Lead atualizado",
        description: "As informações do lead foram atualizadas com sucesso"
      });
      
      return true; // Indica sucesso para o componente chamador
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o lead. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  }, [setLeadsData, toast]);
  
  // Save stage change - com tratamento de erro
  const handleSaveStage = useCallback((leadId: number, newStage: string, notes: string = '') => {
    try {
      // Update the lead's stage and corresponding status
      setLeadsData(prevData => 
        prevData.map(lead => {
          if (lead.id === leadId) {
            const newStatus = getStatusForStage(newStage);
            return { ...lead, stage: newStage, status: newStatus };
          }
          return lead;
        })
      );
      
      toast({
        title: "Etapa atualizada",
        description: `Lead movido para etapa: ${newStage}`
      });
      
      return true;
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
      toast({
        title: "Erro ao atualizar etapa",
        description: "Não foi possível mover o lead para a nova etapa.",
        variant: "destructive",
      });
      return false;
    }
  }, [setLeadsData, toast]);
  
  // Confirm lead deletion - com tratamento de erro
  const handleConfirmDelete = useCallback((leadId: number) => {
    try {
      setLeadsData(prevData => prevData.filter(lead => lead.id !== leadId));
      
      toast({
        title: "Lead excluído",
        description: "O lead foi excluído com sucesso"
      });
      
      return true;
    } catch (error) {
      console.error("Erro ao excluir lead:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o lead. Tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  }, [setLeadsData, toast]);

  return {
    handleEditLead,
    handleChangeStage,
    openChangeStageDialog,
    handleViewHistory,
    handleDeleteLead,
    handleSaveLead,
    handleSaveStage,
    handleConfirmDelete,
  };
};
