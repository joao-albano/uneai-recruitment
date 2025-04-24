
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, CheckCircle, Calendar, MoreHorizontal, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TasksKanbanProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onContactLead: (task: Task, method: 'telefone' | 'whatsapp') => void;
  onCompleteTask: (taskId: string) => void;
}

const TasksKanban: React.FC<TasksKanbanProps> = ({
  tasks,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  onContactLead,
  onCompleteTask
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

  const renderTaskCard = (task: Task) => (
    <Card 
      key={task.id} 
      className={`mb-3 cursor-pointer ${getPriorityClass(task.priority)}`}
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
              onCompleteTask(task.id); 
            }}
          >
            <CheckCircle className="h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <h3 className="font-medium mb-3 flex justify-between items-center">
          <span>Pendentes</span>
          <Badge variant="outline">{pendingTasks.length}</Badge>
        </h3>
        <div>
          {pendingTasks.map(renderTaskCard)}
          {pendingTasks.length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Sem tarefas pendentes
            </p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3 flex justify-between items-center">
          <span>Em Andamento</span>
          <Badge variant="outline">{inProgressTasks.length}</Badge>
        </h3>
        <div>
          {inProgressTasks.map(renderTaskCard)}
          {inProgressTasks.length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Sem tarefas em andamento
            </p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3 flex justify-between items-center">
          <span>Agendadas</span>
          <Badge variant="outline">{scheduledTasks.length}</Badge>
        </h3>
        <div>
          {scheduledTasks.map(renderTaskCard)}
          {scheduledTasks.length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Sem tarefas agendadas
            </p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3 flex justify-between items-center">
          <span>Concluídas</span>
          <Badge variant="outline">{completedTasks.length}</Badge>
        </h3>
        <div>
          {completedTasks.map(renderTaskCard)}
          {completedTasks.length === 0 && (
            <p className="text-sm text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Sem tarefas concluídas
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksKanban;
