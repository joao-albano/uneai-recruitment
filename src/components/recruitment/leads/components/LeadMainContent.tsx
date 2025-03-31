
import React from 'react';
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
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (leadIdOrEvent: React.MouseEvent | number, leadIdOrStage?: number | string) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
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
}) => {
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
      
      <Tabs defaultValue={viewMode} className="mt-4">
        <TabsContent value="table" hidden={viewMode !== 'table'}>
          <LeadsTableView leads={filteredLeads} />
        </TabsContent>
        
        <TabsContent value="kanban" hidden={viewMode !== 'kanban'}>
          <LeadsKanbanView 
            stageGroups={stageGroups}
            onEditLead={onEditLead}
            onStageChange={onStageChange}
            onViewHistory={onViewHistory}
            onDeleteLead={onDeleteLead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadMainContent;
