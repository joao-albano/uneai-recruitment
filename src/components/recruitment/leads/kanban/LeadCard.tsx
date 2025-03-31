
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

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
  onEditLead: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead: (e: React.MouseEvent, leadId: number) => void;
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
    actionHandler: (e: React.MouseEvent, leadId: number) => void
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    actionHandler(e, lead.id);
  };

  return (
    <Draggable draggableId={`lead-${lead.id}`} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? 'bg-accent/50 shadow-lg' : ''
          } transition-shadow hover:shadow-md`}
        >
          <CardHeader className="px-3 py-2 pb-0">
            <div className="flex justify-between items-start">
              <div className="font-medium line-clamp-1">{lead.name}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={(e) => handleAction(e, onEditLead)}
                  >
                    Editar Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={(e) => handleAction(e, onChangeStage)}
                  >
                    Alterar Etapa
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={(e) => handleAction(e, onViewHistory)}
                  >
                    Ver Histórico
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive cursor-pointer"
                    onClick={(e) => handleAction(e, onDeleteLead)}
                  >
                    Excluir Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="px-3 py-2">
            <div className="text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Curso:</span>
                <span className="font-medium">{lead.course}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Canal:</span>
                <Badge variant="outline" className="text-xs h-5 px-1.5">
                  {lead.channel}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-3 py-2 pt-0 flex justify-between">
            <Badge 
              className={`
                ${lead.status === 'Novo' ? 'bg-blue-100 text-blue-800' : 
                lead.status === 'Em Andamento' ? 'bg-amber-100 text-amber-800' : 
                lead.status === 'Aguardando' ? 'bg-purple-100 text-purple-800' : 
                'bg-green-100 text-green-800'}
              `}
            >
              {lead.status}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {lead.createdAt}
            </div>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  );
};

export default LeadCard;
