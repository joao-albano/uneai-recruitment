
import { useLeadViewMode } from './useLeadViewMode';
import { useLeadData } from './useLeadData';
import { useLeadDialogs } from './useLeadDialogs';
import { useLeadFilters } from './useLeadFilters';
import { useLeadActions } from './useLeadActions';
import { useLeadExport } from './useLeadExport';

export const useLeadsManagement = () => {
  // Use specialized hooks
  const viewModeState = useLeadViewMode();
  const dataState = useLeadData();
  
  // Dialogs state
  const dialogState = useLeadDialogs();
  
  // Filters
  const filterState = useLeadFilters(
    dataState.leadsData, 
    dataState.setFilteredLeads, 
    dataState.setStageGroups
  );
  
  // Actions
  const leadActions = useLeadActions(
    dataState.leadsData,
    dataState.setLeadsData,
    dialogState.setSelectedLead,
    dialogState.setEditDialogOpen,
    dialogState.setStageDialogOpen,
    dialogState.setHistoryDialogOpen,
    dialogState.setDeleteDialogOpen
  );
  
  // Export functionality
  const exportActions = useLeadExport();

  return {
    // View mode
    ...viewModeState,
    
    // Data
    filteredLeads: dataState.filteredLeads,
    stageGroups: dataState.stageGroups,
    
    // From useLeadDialogs
    ...dialogState,
    
    // From useLeadFilters
    ...filterState,
    
    // From useLeadActions
    ...leadActions,
    
    // From useLeadExport
    handleExportLeads: () => exportActions.handleExportLeads(dataState.filteredLeads)
  };
};

// Re-exportar a função utilitária de getStatusForStage do arquivo de utils
export { getStatusForStage } from './utils/leadStatusUtils';
