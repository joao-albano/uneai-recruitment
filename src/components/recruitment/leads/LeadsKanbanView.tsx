
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
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

interface StageGroups {
  [key: string]: Lead[];
}

interface LeadsKanbanViewProps {
  stageGroups: StageGroups;
  onStageChange: (leadId: number, newStage: string, notes?: string) => void;
}

const LeadsKanbanView: React.FC<LeadsKanbanViewProps> = ({ stageGroups, onStageChange }) => {
  // Função para lidar com o fim da operação de arrastar/soltar
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Verifica se o usuário soltou o item fora de uma área de destino válida
    if (!destination) return;

    // Se soltou no mesmo lugar, não faz nada
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Se mudou de coluna, chama o callback para atualizar o estágio
    if (destination.droppableId !== source.droppableId) {
      const leadId = parseInt(draggableId.replace('lead-', ''));
      onStageChange(leadId, destination.droppableId);
    }
  };

  // Obter as cores para os diferentes status
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 overflow-x-auto">
        {Object.entries(stageGroups).map(([stageName, leads]) => (
          <Droppable droppableId={stageName} key={stageName}>
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mt-1 h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Editar Lead</DropdownMenuItem>
                                <DropdownMenuItem>Alterar Etapa</DropdownMenuItem>
                                <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Excluir Lead
                                </DropdownMenuItem>
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
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default LeadsKanbanView;
