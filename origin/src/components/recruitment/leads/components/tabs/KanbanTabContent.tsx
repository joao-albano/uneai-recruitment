
import React, { memo } from 'react';
import LeadsKanbanView from '../../kanban/LeadsKanbanView';

interface KanbanTabContentProps {
  stageGroups: any;
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  openChangeStageDialog?: (leadId: number) => void;
}

const KanbanTabContent: React.FC<KanbanTabContentProps> = ({
  stageGroups,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  openChangeStageDialog
}) => {
  return (
    <LeadsKanbanView 
      stageGroups={stageGroups}
      onViewLead={onViewLead}
      onEditLead={onEditLead}
      onChangeStage={onChangeStage}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
      onStageChange={onStageChange}
      openChangeStageDialog={openChangeStageDialog}
    />
  );
};

export default memo(KanbanTabContent);
