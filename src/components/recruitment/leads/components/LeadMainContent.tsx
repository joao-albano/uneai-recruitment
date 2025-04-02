
import React, { memo, useCallback } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import LeadsTableView from './LeadsTableView';
import LeadsToolbar from './LeadsToolbar';
import { LeadFilterOptions } from '../types/leadFilters';
import LeadsKanbanView from '../kanban/LeadsKanbanView';

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
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  openChangeStageDialog?: (leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
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
  onEditLead,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  onChangeStage,
  openChangeStageDialog,
}) => {
  // Memoize event handlers to prevent unnecessary re-renders
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
      
      <Tabs value={viewMode} className="mt-4">
        <TabsContent value="table">
          <LeadsTableView 
            leads={filteredLeads} 
            onEditLead={handleEditLead}
            onChangeStage={handleChangeStage}
            onViewHistory={handleViewHistory}
            onDeleteLead={handleDeleteLead}
          />
        </TabsContent>
        
        <TabsContent value="kanban">
          <LeadsKanbanView 
            stageGroups={stageGroups}
            onEditLead={handleEditLead}
            onStageChange={handleStageChange}
            onChangeStage={handleChangeStage} 
            openChangeStageDialog={openChangeStageDialog}
            onViewHistory={handleViewHistory}
            onDeleteLead={handleDeleteLead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(LeadMainContent);
