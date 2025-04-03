
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLeadViewActions = (
  leadsData: any[],
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  // Handler for viewing a lead
  const handleViewLead = useCallback((e: React.MouseEvent, leadId: number) => {
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
      
      // Clone deeply to ensure non-mutable references
      const leadClone = JSON.parse(JSON.stringify(lead));
      setSelectedLead(leadClone);
      setViewDialogOpen(true);
    } catch (error) {
      console.error("Error opening view dialog:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de visualização.",
        variant: "destructive",
      });
    }
  }, [leadsData, setSelectedLead, setViewDialogOpen, toast]);

  return {
    handleViewLead,
  };
};
