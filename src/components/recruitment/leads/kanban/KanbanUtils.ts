
import { DropResult } from '@hello-pangea/dnd';

export const handleDragEnd = (
  result: DropResult,
  onStageChange: (leadId: number, newStage: string, notes?: string) => void
) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (destination.droppableId !== source.droppableId) {
    const leadId = parseInt(draggableId.replace('lead-', ''));
    onStageChange(leadId, destination.droppableId);
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Novo':
      return 'bg-green-500';
    case 'Em Andamento':
      return 'bg-blue-500';
    case 'Aguardando':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};
