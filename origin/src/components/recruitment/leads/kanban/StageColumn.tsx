
import React from 'react';
import { DroppableProvided } from '@hello-pangea/dnd';
import LeadCard from './LeadCard';

interface StageColumnProps {
  stageName: string;
  leads: any[];
  provided: DroppableProvided;
  onViewLead: (e: React.MouseEvent, leadId: number) => void;
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
  activeLeadId: number | null;
}

const StageColumn: React.FC<StageColumnProps> = ({
  stageName,
  leads,
  provided,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
  activeLeadId
}) => {
  // Format column title
  const formatStageTitle = (stage: string) => {
    switch (stage) {
      case 'Contato Inicial':
        return { title: 'Contato Inicial', color: 'bg-blue-500' };
      case 'Agendamento':
        return { title: 'Agendamento', color: 'bg-amber-500' };
      case 'Visita':
        return { title: 'Visita', color: 'bg-purple-500' };
      case 'Matrícula':
        return { title: 'Matrícula', color: 'bg-green-500' };
      default:
        return { title: stage, color: 'bg-gray-500' };
    }
  };

  const { title, color } = formatStageTitle(stageName);

  return (
    <div 
      className={`bg-muted/30 rounded-lg border flex flex-col h-[calc(100vh-240px)] ${
        activeLeadId ? 'transition-shadow duration-200' : ''
      }`}
    >
      <div className={`rounded-t-lg px-4 py-2 ${color} text-white font-medium flex justify-between sticky top-0`}>
        <span>{title}</span>
        <span className="bg-white text-foreground w-6 h-6 flex items-center justify-center rounded-full text-xs">
          {leads.length}
        </span>
      </div>
      
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="p-2 flex-grow overflow-y-auto"
      >
        {leads.map((lead, index) => (
          <div key={lead.id} className="mb-2">
            <LeadCard 
              lead={lead} 
              index={index}
              onViewLead={onViewLead}
              onEditLead={onEditLead}
              onChangeStage={onChangeStage}
              onViewHistory={onViewHistory}
              onDeleteLead={onDeleteLead}
            />
          </div>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default StageColumn;
