
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getStatusForStage } from './utils/leadStatusUtils';

export const useLeadStageActions = (
  leadsData: any[],
  setLeadsData: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  // Handler para mudar estágio - aprimorado com tratamento de eventos e captura de erros
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
      
      // Clone profundo para garantir referências não mutáveis
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

  // Chamada de função direta para diálogo de mudança de estágio (para arrastar e soltar Kanban)
  const openChangeStageDialog = useCallback((leadId: number) => {
    try {
      const lead = leadsData.find(l => l.id === leadId);
      if (!lead) {
        console.error("Lead not found:", leadId);
        return;
      }
      
      // Clone profundo para garantir referências não mutáveis
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

  // Salvar mudança de estágio - aprimorado com melhor tratamento de erros
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
      // Atualizar o estágio do lead e status correspondente com cópias rasas
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

  return {
    handleChangeStage,
    openChangeStageDialog,
    handleSaveStage,
  };
};
