
import React, { memo } from 'react';
import LeadsKanbanView from '../../kanban/LeadsKanbanView';

interface KanbanTabContentProps {
  stageGroups: any;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  openChangeStageDialog?: (leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
}

const KanbanTabContent: React.FC<KanbanTabContentProps> = ({
  stageGroups,
  onEditLead,
  onStageChange,
  onChangeStage,
  openChangeStageDialog,
  onViewHistory,
  onDeleteLead
}) => {
  return (
    <LeadsKanbanView 
      stageGroups={stageGroups}
      onEditLead={onEditLead}
      onStageChange={onStageChange}
      onChangeStage={onChangeStage} 
      openChangeStageDialog={openChangeStageDialog}
      onViewHistory={onViewHistory}
      onDeleteLead={onDeleteLead}
    />
  );
};

export default memo(KanbanTabContent);
