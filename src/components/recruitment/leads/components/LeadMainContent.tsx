
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import LeadsKanbanView from '../LeadsKanbanView';
import LeadsToolbar from './LeadsToolbar';
import { getLeadColumns } from './LeadsTableColumns';

interface LeadMainContentProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (mode: 'table' | 'kanban') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  clearFilters: () => void;
  exportLeads: () => void;
  filteredLeads: any[];
  stageGroups: any;
  onEditLead: (leadId: number) => void;
  onChangeStage: (leadId: number) => void;
  onViewHistory: (leadId: number) => void;
  onDeleteLead: (leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes: string) => void;
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
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  onStageChange
}) => {
  // Get columns configuration with handlers
  const columns = getLeadColumns({
    onEditLead,
    onChangeStage,
    onViewHistory,
    onDeleteLead
  });

  return (
    <Card>
      <CardHeader className="pb-3">
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
      </CardHeader>
      <CardContent>
        {viewMode === 'table' ? (
          <DataTable 
            data={filteredLeads} 
            columns={columns} 
          />
        ) : (
          <LeadsKanbanView 
            stageGroups={stageGroups} 
            onStageChange={onStageChange} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LeadMainContent;
