
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLeadDeleteActions = (
  leadsData: any[],
  setLeadsData: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();
  
  // Handler para excluir lead - aprimorado com tratamento de eventos e captura de erros
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
      
      // Clone profundo para garantir referências não mutáveis
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
  
  // Confirmar exclusão do lead - aprimorado com melhor tratamento de erros
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
      // Remover lead com cópia rasa para evitar problemas de mutação de estado
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
    handleDeleteLead,
    handleConfirmDelete,
  };
};
