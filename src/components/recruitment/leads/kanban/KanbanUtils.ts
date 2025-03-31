
import { DropResult } from '@hello-pangea/dnd';

export const handleDragEnd = (
  result: DropResult,
  onStageChange: (leadId: number, newStage: string, notes?: string) => void
) => {
  const { destination, source, draggableId } = result;

  // If there's no destination or if dropped in same place - do nothing
  if (!destination || 
      (destination.droppableId === source.droppableId && 
       destination.index === source.index)) {
    return;
  }

  // Get the lead ID from the draggableId
  const leadId = parseInt(draggableId.split('-')[1]);
  
  // The destination droppableId is the new stage name
  const newStage = destination.droppableId;
  
  // Call function to update the lead stage
  onStageChange(leadId, newStage);
};
