
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
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
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  openChangeStageDialog?: (leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ 
  stageName, 
  leads,
  onEditLead,
  onChangeStage,
  openChangeStageDialog,
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
            {leads.map((lead, index) => (
              <LeadCard
                key={`lead-${lead.id}`}
                lead={lead}
                index={index}
                onEditLead={onEditLead}
                onChangeStage={(leadId, stage) => {
                  // Create a synthetic event or call the function directly
                  if (openChangeStageDialog) {
                    openChangeStageDialog(leadId);
                  }
                }}
                onViewHistory={onViewHistory}
                onDeleteLead={onDeleteLead}
              />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default StageColumn;
