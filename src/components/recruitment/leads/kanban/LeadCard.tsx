
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, MoreHorizontal } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

interface LeadCardProps {
  lead: any;
  index: number;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
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
  // Função para tratar eventos com prevenção de propagação
  const handleAction = (
    e: React.MouseEvent, 
    actionHandler?: (e: React.MouseEvent, leadId: number) => void
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (actionHandler) {
      actionHandler(e, lead.id);
    }
  };

  return (
    <Draggable draggableId={`lead-${lead.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2"
        >
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm line-clamp-1" title={lead.name}>
                  {lead.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {onEditLead && (
                      <DropdownMenuItem 
                        onClick={(e) => handleAction(e, onEditLead)}
                        className="cursor-pointer"
                      >
                        Editar Lead
                      </DropdownMenuItem>
                    )}
                    {onChangeStage && (
                      <DropdownMenuItem 
                        onClick={(e) => handleAction(e, onChangeStage)}
                        className="cursor-pointer"
                      >
                        Alterar Etapa
                      </DropdownMenuItem>
                    )}
                    {onViewHistory && (
                      <DropdownMenuItem 
                        onClick={(e) => handleAction(e, onViewHistory)}
                        className="cursor-pointer"
                      >
                        Ver Histórico
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {onDeleteLead && (
                      <DropdownMenuItem 
                        className="text-destructive cursor-pointer"
                        onClick={(e) => handleAction(e, onDeleteLead)}
                      >
                        Excluir Lead
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1" title={lead.course}>
                  <MessageSquare className="h-3 w-3" />
                  <span className="truncate">{lead.course}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{lead.createdAt}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs">
                  {lead.channel}
                </Badge>
                <Badge 
                  className={`text-xs ${
                    lead.status === 'Novo' 
                      ? 'bg-blue-100 text-blue-800' 
                      : lead.status === 'Em Andamento' 
                      ? 'bg-amber-100 text-amber-800' 
                      : lead.status === 'Aguardando' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {lead.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default LeadCard;
