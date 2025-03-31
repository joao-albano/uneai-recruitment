import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, User, Calendar, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getStatusColor } from './LeadCardUtils';

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

interface LeadCardProps {
  lead: Lead;
  index: number;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (leadId: number, stage: string) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ 
  lead, 
  index,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  return (
    <Draggable
      key={`lead-${lead.id}`}
      draggableId={`lead-${lead.id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? 'shadow-lg' : ''
          } cursor-grab active:cursor-grabbing`}
        >
          <CardHeader className="p-3 pb-0 flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-sm font-medium">
                {lead.name}
              </CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                {lead.course}
              </div>
            </div>
            <LeadCardActions
              leadId={lead.id}
              stage={lead.stage}
              onEditLead={onEditLead}
              onChangeStage={onChangeStage}
              onViewHistory={onViewHistory}
              onDeleteLead={onDeleteLead}
            />
          </CardHeader>
          <CardContent className="p-3 pt-2">
            <LeadCardDetails lead={lead} />
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

interface LeadCardActionsProps {
  leadId: number;
  stage: string;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (leadId: number, stage: string) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadCardActions: React.FC<LeadCardActionsProps> = ({
  leadId,
  stage,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="-mt-1 h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onEditLead && (
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onEditLead(e, leadId);
            }}
            className="cursor-pointer"
          >
            Editar Lead
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={(e) => {
            e.stopPropagation();
            // For direct call via the dropdown menu, we need to call the function using stage
            onChangeStage(leadId, stage);
          }}
          className="cursor-pointer"
        >
          Alterar Etapa
        </DropdownMenuItem>
        {onViewHistory && (
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onViewHistory(e, leadId);
            }}
            className="cursor-pointer"
          >
            Ver Histórico
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {onDeleteLead && (
          <DropdownMenuItem 
            className="text-destructive cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteLead(e, leadId);
            }}
          >
            Excluir Lead
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface LeadCardDetailsProps {
  lead: Lead;
}

const LeadCardDetails: React.FC<LeadCardDetailsProps> = ({ lead }) => {
  return (
    <>
      <div className="grid gap-2 text-xs">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span className="text-muted-foreground">
            Cadastrado em: {lead.createdAt}
          </span>
        </div>
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1" />
          <span className="text-muted-foreground">
            Filhos: {lead.children}
          </span>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-3 w-3 mr-1" />
          <span className="text-muted-foreground">
            Canal: {lead.channel}
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Badge className={getStatusColor(lead.status)}>
          {lead.status}
        </Badge>
      </div>
    </>
  );
};

export default LeadCard;
