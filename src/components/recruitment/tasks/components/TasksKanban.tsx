import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, CheckCircle, Clock, MoreHorizontal, History } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface TasksKanbanProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onContactLead: (task: Task, method: 'telefone' | 'whatsapp') => void;
  onCompleteTask: (taskId: string) => void;
  onViewContactHistory: (taskId: string) => void;
}

const TasksKanban: React.FC<TasksKanbanProps> = ({
  tasks,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  onContactLead,
  onCompleteTask,
  onViewContactHistory
}) => {
  // Group tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pendente');
  const inProgressTasks = tasks.filter(task => task.status === 'em_andamento');
  const scheduledTasks = tasks.filter(task => task.status === 'agendada');
  const completedTasks = tasks.filter(task => task.status === 'concluída');
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'border-l-4 border-l-red-500';
      case 'média':
        return 'border-l-4 border-l-yellow-500';
      case 'baixa':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If no destination or dropped in same place - do nothing
    if (!destination || 
        (destination.droppableId === source.droppableId && 
        destination.index === source.index)) {
      return;
    }
    
    // Extract the task ID from draggable ID
    const taskId = draggableId.replace('task-', '');
    
    // Find the task that was dragged
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Map destination droppable ID to status
    const statusMap: Record<string, 'pendente' | 'em_andamento' | 'agendada' | 'concluída'> = {
      'pendente': 'pendente',
      'em_andamento': 'em_andamento',
      'agendada': 'agendada',
      'concluida': 'concluída'
    };
    
    // Update task with new status
    const newStatus = statusMap[destination.droppableId];
    const updatedTask = { ...task, status: newStatus };
    
    // If destination is "concluida", mark task as completed
    if (destination.droppableId === 'concluida') {
      onCompleteTask(taskId);
    } else {
      // Update the task with new status
      onEditTask(updatedTask);
    }
  };

  const renderTaskCard = (task: Task, index: number) => (
    <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <Card 
            className={`cursor-pointer ${getPriorityClass(task.priority)}`}
            onClick={() => onSelectTask(task)}
          >
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm">{task.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { 
                      e.stopPropagation(); 
                      onEditTask(task); 
                    }}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { 
                      e.stopPropagation(); 
                      onDeleteTask(task.id); 
                    }}>
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-xs truncate">
                {task.lead?.name || 'N/A'} - {task.lead?.phone || 'Sem telefone'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-2">
              <p className="text-xs text-muted-foreground truncate mb-2">{task.description || 'Sem descrição'}</p>
              <div className="flex flex-wrap gap-1 mb-1">
                {task.dueDate && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(new Date(task.dueDate), 'dd/MM', { locale: ptBR })}
                  </div>
                )}
                {task.assignedToName && (
                  <Badge variant="outline" className="text-xs">
                    {task.assignedToName}
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-2 pt-0">
              <div className="flex gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onContactLead(task, 'telefone'); 
                  }}
                >
                  <Phone className="h-3 w-3" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onContactLead(task, 'whatsapp'); 
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onViewContactHistory(task.id);
                  }}
                >
                  <History className="h-3 w-3" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onCompleteTask(task.id); 
                  }}
                >
                  <CheckCircle className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="font-medium mb-3 flex justify-between items-center">
            <span>Pendentes</span>
            <Badge variant="outline">{pendingTasks.length}</Badge>
          </h3>
          <Droppable droppableId="pendente">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px] bg-muted/30 rounded-md p-2 h-[calc(100vh-300px)] overflow-y-auto"
              >
                {pendingTasks.map((task, index) => renderTaskCard(task, index))}
                {pendingTasks.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
                    Sem tarefas pendentes
                  </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        
        <div>
          <h3 className="font-medium mb-3 flex justify-between items-center">
            <span>Em Andamento</span>
            <Badge variant="outline">{inProgressTasks.length}</Badge>
          </h3>
          <Droppable droppableId="em_andamento">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px] bg-muted/30 rounded-md p-2 h-[calc(100vh-300px)] overflow-y-auto"
              >
                {inProgressTasks.map((task, index) => renderTaskCard(task, index))}
                {inProgressTasks.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
                    Sem tarefas em andamento
                  </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        
        <div>
          <h3 className="font-medium mb-3 flex justify-between items-center">
            <span>Agendadas</span>
            <Badge variant="outline">{scheduledTasks.length}</Badge>
          </h3>
          <Droppable droppableId="agendada">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px] bg-muted/30 rounded-md p-2 h-[calc(100vh-300px)] overflow-y-auto"
              >
                {scheduledTasks.map((task, index) => renderTaskCard(task, index))}
                {scheduledTasks.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
                    Sem tarefas agendadas
                  </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        
        <div>
          <h3 className="font-medium mb-3 flex justify-between items-center">
            <span>Concluídas</span>
            <Badge variant="outline">{completedTasks.length}</Badge>
          </h3>
          <Droppable droppableId="concluida">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-[200px] bg-muted/30 rounded-md p-2 h-[calc(100vh-300px)] overflow-y-auto"
              >
                {completedTasks.map((task, index) => renderTaskCard(task, index))}
                {completedTasks.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
                    Sem tarefas concluídas
                  </p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksKanban;
