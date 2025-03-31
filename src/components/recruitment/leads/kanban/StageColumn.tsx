
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Badge } from '@/components/ui/badge';
import LeadCard from './LeadCard';

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

interface StageColumnProps {
  stageName: string;
  leads: Lead[];
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (leadId: number, stage: string) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ 
  stageName, 
  leads,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  return (
    <Droppable droppableId={stageName}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`border rounded-md p-3 min-h-[400px] ${
            snapshot.isDraggingOver ? 'bg-accent/50' : 'bg-card'
          }`}
        >
          <div className="font-semibold text-sm mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <span>{stageName}</span>
              <Badge variant="outline" className="ml-2">
                {leads.length}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {leads && leads.map((lead, index) => (
              <Draggable
                key={`lead-${lead.id}`}
                draggableId={`lead-${lead.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <LeadCard
                    lead={lead}
                    provided={provided}
                    snapshot={snapshot}
                    onEditLead={onEditLead}
                    onChangeStage={onChangeStage}
                    onViewHistory={onViewHistory}
                    onDeleteLead={onDeleteLead}
                  />
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StageColumn;
