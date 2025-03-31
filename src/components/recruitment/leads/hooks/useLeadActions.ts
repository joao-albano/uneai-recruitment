
import { useToast } from '@/hooks/use-toast';

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

  // Handle edit lead action (event-based)
  const handleEditLead = (e: React.MouseEvent, leadId: number) => {
    if (e) e.stopPropagation();
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setEditDialogOpen(true);
    }
  };
  
  // Opens the change stage dialog (event-based)
  const handleChangeStage = (e: React.MouseEvent, leadId: number) => {
    if (e) e.stopPropagation();
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setStageDialogOpen(true);
    }
  };

  // Direct function call (for drag-and-drop or other non-event triggers)
  const openChangeStageDialog = (leadId: number) => {
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setStageDialogOpen(true);
    }
  };
  
  const handleViewHistory = (e: React.MouseEvent, leadId: number) => {
    if (e) e.stopPropagation();
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setHistoryDialogOpen(true);
    }
  };
  
  const handleDeleteLead = (e: React.MouseEvent, leadId: number) => {
    if (e) e.stopPropagation();
    
    const lead = leadsData.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      setDeleteDialogOpen(true);
    }
  };
  
  // Save changes to a lead
  const handleSaveLead = (updatedLead: any) => {
    const updatedLeads = leadsData.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    
    setLeadsData(updatedLeads);
    toast({
      title: "Lead atualizado",
      description: "As informações do lead foram atualizadas com sucesso"
    });
  };
  
  // Save stage change
  const handleSaveStage = (leadId: number, newStage: string, notes: string = '') => {
    // Update the lead's stage and corresponding status
    const updatedLeads = leadsData.map(lead => {
      if (lead.id === leadId) {
        const newStatus = getStatusForStage(newStage);
        return { ...lead, stage: newStage, status: newStatus };
      }
      return lead;
    });
    
    setLeadsData(updatedLeads);
    console.log(`Lead ${leadId} movido para etapa: ${newStage}. Notas: ${notes}`);
  };
  
  // Confirm lead deletion
  const handleConfirmDelete = (leadId: number) => {
    setLeadsData(prev => prev.filter(lead => lead.id !== leadId));
    toast({
      title: "Lead excluído",
      description: "O lead foi excluído com sucesso"
    });
  };

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
