
import React, { memo } from 'react';
import TableTabContent from '../tabs/TableTabContent';
import KanbanTabContent from '../tabs/KanbanTabContent';

interface LeadsTabsContentProps {
  viewMode: 'table' | 'kanban';
  filteredLeads: any[];
  stageGroups: any;
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  openChangeStageDialog?: (leadId: number) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const LeadsTabsContent: React.FC<LeadsTabsContentProps> = ({
  viewMode,
  filteredLeads,
  stageGroups,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  openChangeStageDialog,
  currentPage,
  itemsPerPage,
  onPageChange
}) => {
  return (
    <div className="mt-4">
      {viewMode === 'table' ? (
        <TableTabContent 
          filteredLeads={filteredLeads}
          onViewLead={onViewLead}
          onEditLead={onEditLead}
          onChangeStage={onChangeStage}
          onViewHistory={onViewHistory} 
          onDeleteLead={onDeleteLead}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      ) : (
        <KanbanTabContent 
          stageGroups={stageGroups}
          onViewLead={onViewLead}
          onEditLead={onEditLead}
          onChangeStage={onChangeStage}
          onViewHistory={onViewHistory}
          onDeleteLead={onDeleteLead}
          onStageChange={onStageChange}
          openChangeStageDialog={openChangeStageDialog}
        />
      )}
    </div>
  );
};

export default memo(LeadsTabsContent);
