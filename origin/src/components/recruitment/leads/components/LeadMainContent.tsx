
import React, { memo, useCallback } from 'react';
import LeadsToolbar from './LeadsToolbar';
import { LeadFilterOptions } from '../types/leadFilters';
import LeadsTabsContent from './content/LeadsTabsContent';

interface LeadMainContentProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (viewMode: 'table' | 'kanban') => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filters: LeadFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<LeadFilterOptions>>;
  clearFilters: () => void;
  exportLeads: () => void;
  filteredLeads: any[];
  stageGroups: any;
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  openChangeStageDialog?: (leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const LeadMainContent: React.FC<LeadMainContentProps> = ({
  viewMode,
  onViewModeChange,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  clearFilters,
  exportLeads,
  filteredLeads,
  stageGroups,
  onViewLead,
  onEditLead,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  onChangeStage,
  openChangeStageDialog,
  currentPage,
  itemsPerPage,
  onPageChange
}) => {
  // Memoize event handlers to prevent unnecessary re-renders
  const handleViewLead = useCallback((e: React.MouseEvent, leadId: number) => {
    onViewLead(e, leadId);
  }, [onViewLead]);

  const handleEditLead = useCallback((e: React.MouseEvent, leadId: number) => {
    onEditLead(e, leadId);
  }, [onEditLead]);

  const handleChangeStage = useCallback((e: React.MouseEvent, leadId: number) => {
    onChangeStage(e, leadId);
  }, [onChangeStage]);

  const handleViewHistory = useCallback((e: React.MouseEvent, leadId: number) => {
    onViewHistory(e, leadId);
  }, [onViewHistory]);

  const handleDeleteLead = useCallback((e: React.MouseEvent, leadId: number) => {
    onDeleteLead(e, leadId);
  }, [onDeleteLead]);

  const handleStageChange = useCallback((leadId: number, newStage: string, notes?: string) => {
    onStageChange(leadId, newStage, notes);
  }, [onStageChange]);

  return (
    <div>
      <LeadsToolbar
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        exportLeads={exportLeads}
      />
      
      <LeadsTabsContent 
        viewMode={viewMode}
        filteredLeads={filteredLeads}
        stageGroups={stageGroups}
        onViewLead={handleViewLead}
        onEditLead={handleEditLead}
        onChangeStage={handleChangeStage}
        onViewHistory={handleViewHistory}
        onDeleteLead={handleDeleteLead}
        onStageChange={handleStageChange}
        openChangeStageDialog={openChangeStageDialog}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(LeadMainContent);
