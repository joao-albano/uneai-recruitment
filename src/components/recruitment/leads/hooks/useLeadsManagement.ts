
import { useState } from 'react';
import { mockLeadsData, getLeadsByStage } from '../data/mockLeadsData';
import { useLeadActions } from './useLeadActions';
import { useLeadDialogs } from './useLeadDialogs';
import { useLeadFilters } from './useLeadFilters';
import { useLeadExport } from './useLeadExport';

export const useLeadsManagement = () => {
  // View mode state
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  
  // Leads data state
  const [leadsData, setLeadsData] = useState(mockLeadsData);
  const [stageGroups, setStageGroups] = useState(getLeadsByStage());
  const [filteredLeads, setFilteredLeads] = useState(leadsData);
  
  // Import hooks
  const dialogState = useLeadDialogs();
  
  const filterState = useLeadFilters(
    leadsData, 
    setFilteredLeads, 
    setStageGroups
  );
  
  const leadActions = useLeadActions(
    leadsData,
    setLeadsData,
    dialogState.setSelectedLead,
    dialogState.setEditDialogOpen,
    dialogState.setStageDialogOpen,
    dialogState.setHistoryDialogOpen,
    dialogState.setDeleteDialogOpen
  );
  
  const exportActions = useLeadExport();

  return {
    // View mode
    viewMode,
    setViewMode,
    
    // From useLeadDialogs
    ...dialogState,
    
    // From useLeadFilters
    ...filterState,

    // Data
    filteredLeads,
    stageGroups,
    
    // From useLeadActions
    ...leadActions,
    
    // From useLeadExport
    handleExportLeads: () => exportActions.handleExportLeads(filteredLeads)
  };
};
