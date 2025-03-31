
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import StageColumn from './StageColumn';
import { handleDragEnd } from './KanbanUtils';

interface Lead {
  id: number;
  name: string;
  course: string;
  children: number;
  channel: string;
  stage: string;
  status: string;
  createdAt: string;
}

interface StageGroups {
  [key: string]: Lead[];
}

interface LeadsKanbanViewProps {
  stageGroups: StageGroups;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadsKanbanView: React.FC<LeadsKanbanViewProps> = ({ 
  stageGroups, 
  onStageChange,
  onEditLead,
  onViewHistory,
  onDeleteLead 
}) => {
  const handleChangeStage = (leadId: number, stage: string) => {
    // Esta função é usada para abrir o diálogo de alteração de etapa
    // A implementação real de alteração de etapa está no handleDragEnd/onStageChange
    onStageChange(leadId, stage);
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result, onStageChange)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 overflow-x-auto">
        {Object.entries(stageGroups).map(([stageName, leads]) => (
          <StageColumn 
            key={stageName}
            stageName={stageName}
            leads={leads}
            onEditLead={onEditLead}
            onChangeStage={handleChangeStage}
            onViewHistory={onViewHistory}
            onDeleteLead={onDeleteLead}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default LeadsKanbanView;
