
import React from 'react';
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

interface LeadCardProps {
  lead: {
    id: number;
    name: string;
    course: string;
    children: number;
    channel: string;
    stage: string;
    status: string;
    createdAt: string;
  };
  provided: any;
  snapshot: any;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage: (leadId: number, stage: string) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ 
  lead, 
  provided,
  snapshot,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead
}) => {
  const getStatusColor = (status: string) => {
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

  return (
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
                  onEditLead(e, lead.id);
                }}
                className="cursor-pointer"
              >
                Editar Lead
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                onChangeStage(lead.id, lead.stage);
              }}
              className="cursor-pointer"
            >
              Alterar Etapa
            </DropdownMenuItem>
            {onViewHistory && (
              <DropdownMenuItem 
                onClick={(e) => {
                  e.stopPropagation();
                  onViewHistory(e, lead.id);
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
                  onDeleteLead(e, lead.id);
                }}
              >
                Excluir Lead
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-3 pt-2">
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
      </CardContent>
    </Card>
  );
};

export default LeadCard;
