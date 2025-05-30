
import { useCallback } from 'react';
import { useLeadEditActions } from './useLeadEditActions';
import { useLeadStageActions } from './useLeadStageActions';
import { useLeadHistoryActions } from './useLeadHistoryActions';
import { useLeadDeleteActions } from './useLeadDeleteActions';
import { useLeadViewActions } from './useLeadViewActions';

export const useLeadActions = (
  leadsData: any[],
  setLeadsData: React.Dispatch<React.SetStateAction<any[]>>,
  setSelectedLead: React.Dispatch<React.SetStateAction<any>>,
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setHistoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Importar todas as ações de leads dos hooks específicos
  const viewActions = useLeadViewActions(
    leadsData,
    setSelectedLead,
    setViewDialogOpen
  );
  
  const editActions = useLeadEditActions(
    leadsData, 
    setLeadsData, 
    setSelectedLead, 
    setEditDialogOpen
  );
  
  const stageActions = useLeadStageActions(
    leadsData,
    setLeadsData,
    setSelectedLead,
    setStageDialogOpen
  );
  
  const historyActions = useLeadHistoryActions(
    leadsData,
    setSelectedLead,
    setHistoryDialogOpen
  );
  
  const deleteActions = useLeadDeleteActions(
    leadsData,
    setLeadsData,
    setSelectedLead,
    setDeleteDialogOpen
  );
  
  // Retornar todas as ações combinadas
  return {
    ...viewActions,
    ...editActions,
    ...stageActions,
    ...historyActions,
    ...deleteActions,
  };
};

// Re-exportar a função utilitária de getStatusForStage do arquivo de utils
export { getStatusForStage } from './utils/leadStatusUtils';
