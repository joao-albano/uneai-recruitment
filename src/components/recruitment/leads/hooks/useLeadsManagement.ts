import { useLeadViewMode } from './useLeadViewMode';
import { useLeadData } from './useLeadData';
import { useLeadDialogs } from './useLeadDialogs';
import { useLeadFilters } from './useLeadFilters';
import { useLeadActions } from './useLeadActions';
import { useLeadExport } from './useLeadExport';
import { useCallback, useState, useEffect } from 'react';

export const useLeadsManagement = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterState.activeFilter, filterState.searchTerm, filterState.filters]);
  
  // Actions
  const leadActions = useLeadActions(
    dataState.leadsData,
    dataState.setLeadsData,
    dialogState.setSelectedLead,
    dialogState.setEditDialogOpen,
    dialogState.setStageDialogOpen,
    dialogState.setHistoryDialogOpen,
    dialogState.setDeleteDialogOpen,
    dialogState.setViewDialogOpen
  );
  
  // Export functionality
  const exportActions = useLeadExport();

  // Handle new lead creation
  const handleLeadCreated = useCallback((lead: any) => {
    console.log("New lead created in management hook:", lead);
    dataState.addNewLead(lead);
  }, [dataState]);

  // Pagination handler
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

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
    handleExportLeads: () => exportActions.handleExportLeads(dataState.filteredLeads),

    // New lead handler
    handleLeadCreated,
    
    // Pagination
    currentPage,
    itemsPerPage,
    handlePageChange
  };
};

// Re-exportar a função utilitária de getStatusForStage do arquivo de utils
export { getStatusForStage } from './utils/leadStatusUtils';
