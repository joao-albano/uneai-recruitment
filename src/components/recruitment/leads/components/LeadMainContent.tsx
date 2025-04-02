
import React, { memo } from 'react';
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
  // Use the React.memo pattern for improved performance
  const MemoizedLeadsTableView = React.useMemo(() => (
    <LeadsTableView 
      leads={filteredLeads} 
      onEditLead={onEditLead}
      onChangeStage={onChangeStage}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
    />
  ), [filteredLeads, onEditLead, onChangeStage, onViewHistory, onDeleteLead]);

  const MemoizedKanbanView = React.useMemo(() => (
    <LeadsKanbanView 
      stageGroups={stageGroups}
      onEditLead={onEditLead}
      onStageChange={onStageChange}
      onChangeStage={onChangeStage} 
      openChangeStageDialog={openChangeStageDialog}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
    />
  ), [stageGroups, onEditLead, onStageChange, onChangeStage, openChangeStageDialog, onViewHistory, onDeleteLead]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
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
        <TabsContent value="table" hidden={viewMode !== 'table'}>
          {MemoizedLeadsTableView}
        </TabsContent>
        
        <TabsContent value="kanban" hidden={viewMode !== 'kanban'}>
          {MemoizedKanbanView}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(LeadMainContent);
