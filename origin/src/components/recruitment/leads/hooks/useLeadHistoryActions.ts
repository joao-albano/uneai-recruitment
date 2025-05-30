
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLeadHistoryActions = (
  leadsData: any[],
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setHistoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();
  
  // Handler para visualizar histórico - aprimorado com tratamento de eventos e captura de erros
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
      
      // Clone profundo para garantir referências não mutáveis
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

  return {
    handleViewHistory,
  };
};
