
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import StageColumn from './StageColumn';

interface LeadsKanbanViewProps {
  stageGroups: any;
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
  openChangeStageDialog?: (leadId: number) => void;
}

const LeadsKanbanView: React.FC<LeadsKanbanViewProps> = ({
  stageGroups,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  onStageChange,
  openChangeStageDialog
}) => {
  const [draggingLeadId, setDraggingLeadId] = useState<number | null>(null);

  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    setDraggingLeadId(null);
    
    // If dropped outside a valid area
    if (!result.destination) {
      return;
    }

    const { draggableId, destination } = result;
    
    // Extract leadId from draggableId format 'lead-{id}'
    const leadId = parseInt(draggableId.split('-')[1]);
    
    // Extract the new stage from destination droppableId
    const newStage = destination.droppableId;
    
    if (leadId && newStage) {
      // Update the lead stage
      onStageChange(leadId, newStage);
    }
  };
  
  // Handle drag start
  const handleDragStart = (result: any) => {
    // Extract leadId from draggableId format 'lead-{id}'
    const leadId = parseInt(result.draggableId.split('-')[1]);
    setDraggingLeadId(leadId);
  };

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stageGroups).map(([stageName, leads]: [string, any[]]) => (
            <Droppable droppableId={stageName} key={stageName}>
              {(provided) => (
                <StageColumn
                  stageName={stageName}
                  leads={leads}
                  provided={provided}
                  onViewLead={onViewLead}
                  onEditLead={onEditLead}
                  onChangeStage={onChangeStage}
                  onViewHistory={onViewHistory}
                  onDeleteLead={onDeleteLead}
                  activeLeadId={draggingLeadId}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default LeadsKanbanView;
