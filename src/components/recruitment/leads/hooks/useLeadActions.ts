
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

  // Handler for edit lead - improved with proper event handling and error capture
  const handleEditLead = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Deep clone to ensure no mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error opening edit dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de edição.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setEditDialogOpen, toast]);
  
  // Handler for change stage - improved with proper event handling and error capture
  const handleChangeStage = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Deep clone to ensure no mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setStageDialogOpen(true);
    } catch (error) {
      console.error("Error opening stage dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de mudança de etapa.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setStageDialogOpen, toast]);

  // Direct function call for change stage dialog (for Kanban drag-and-drop)
  const openChangeStageDialog = useCallback((leadId: number) => {
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Deep clone to ensure no mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setStageDialogOpen(true);
    } catch (error) {
      console.error("Error opening stage dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de mudança de etapa.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setStageDialogOpen, toast]);
  
  // Handler for view history - improved with proper event handling and error capture
  const handleViewHistory = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Deep clone to ensure no mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setHistoryDialogOpen(true);
    } catch (error) {
      console.error("Error opening history dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o histórico do lead.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setHistoryDialogOpen, toast]);
  
  // Handler for delete lead - improved with proper event handling and error capture
  const handleDeleteLead = useCallback((e: React.MouseEvent, leadId: number) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Deep clone to ensure no mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error opening delete dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de exclusão.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setDeleteDialogOpen, toast]);
  
  // Save changes to a lead - improved with better error handling
  const handleSaveLead = useCallback((updatedLead: any) => {
    if (!updatedLead || !updatedLead.id) {
      toast({
        title: "Erro ao atualizar",
        description: "Dados do lead inválidos ou incompletos.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Update data with shallow copies to avoid state mutation issues
      setLeadsData(prevData => 
        prevData.map(lead => 
          lead.id === updatedLead.id ? {...updatedLead} : lead
        )
      );
      
      toast({
        title: "Lead atualizado",
        description: "As informações do lead foram atualizadas com sucesso"
      });
      
      return true; // Indicate success to the component
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
  
  // Save stage change - improved with better error handling
  const handleSaveStage = useCallback((leadId: number, newStage: string, notes: string = '') => {
    if (!leadId || !newStage) {
      toast({
        title: "Erro ao atualizar etapa",
        description: "Dados da etapa inválidos ou incompletos.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Update the lead's stage and corresponding status with shallow copies
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
  
  // Confirm lead deletion - improved with better error handling
  const handleConfirmDelete = useCallback((leadId: number) => {
    if (!leadId) {
      toast({
        title: "Erro ao excluir",
        description: "ID do lead inválido ou não fornecido.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Remove lead with shallow copy to avoid state mutation issues
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
