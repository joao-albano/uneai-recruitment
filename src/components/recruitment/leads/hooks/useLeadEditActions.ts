
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useLeadEditActions = (
  leadsData: any[],
  setLeadsData: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  // Handler para editar lead - aprimorado com tratamento de eventos e captura de erros
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
      
      // Clone profundo para garantir referências não mutáveis
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

  // Salvar alterações em um lead - aprimorado com melhor tratamento de erros
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
      // Atualizar dados com cópias rasas para evitar problemas de mutação de estado
      setLeadsData(prevData => 
        prevData.map(lead => 
          lead.id === updatedLead.id ? {...updatedLead} : lead
        )
      );
      
      toast({
        title: "Lead atualizado",
        description: "As informações do lead foram atualizadas com sucesso"
      });
      
      return true; // Indicar sucesso para o componente
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

  return {
    handleEditLead,
    handleSaveLead,
  };
};
