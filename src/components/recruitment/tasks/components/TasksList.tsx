
import React, { useState } from 'react';
import { Task } from '@/types/recruitment/tasks';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Phone, 
  MessageSquare, 
  MoreVertical, 
  Calendar, 
  CheckCircle,
  AlertTriangle,
  Clock,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TasksListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onAssignTask: (taskId: string, agentId: string, agentName: string) => void;
  onCompleteTask: (taskId: string) => void;
  onBulkOperations: (taskIds: string[], operation: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({ 
  tasks,
  onSelectTask,
  onContactLead,
  onScheduleContact,
  onAssignTask,
  onCompleteTask,
  onBulkOperations
}) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  
  const handleToggleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };
  
  const handleToggleSelectTask = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };
  
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive';
      case 'média': return 'default';
      case 'baixa': return 'outline';
      default: return 'secondary';
    }
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pendente': return 'secondary';
      case 'em_andamento': return 'default';
      case 'concluída': return 'outline'; // Changed from 'success' to 'outline'
      case 'agendada': return 'secondary'; // Changed from 'warning' to 'secondary'
      case 'cancelada': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'em_andamento': return <AlertTriangle className="h-4 w-4" />;
      case 'concluída': return <CheckCircle className="h-4 w-4" />;
      case 'agendada': return <Calendar className="h-4 w-4" />;
      case 'cancelada': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md bg-muted/10">
        <h3 className="text-lg font-medium">Nenhuma tarefa encontrada</h3>
        <p className="text-muted-foreground mt-1">
          Tente ajustar os filtros ou criar uma nova tarefa
        </p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md overflow-auto">
      {selectedTasks.length > 0 && (
        <div className="bg-secondary/20 p-3 border-b flex items-center justify-between">
          <div className="text-sm font-medium">
            {selectedTasks.length} {selectedTasks.length === 1 ? 'tarefa selecionada' : 'tarefas selecionadas'}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onBulkOperations(selectedTasks, 'complete')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Concluir
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onBulkOperations(selectedTasks, 'schedule')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Agendar
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onBulkOperations(selectedTasks, 'delete')}
            >
              Excluir
            </Button>
          </div>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={selectedTasks.length === tasks.length && tasks.length > 0} 
                onCheckedChange={handleToggleSelectAll}
              />
            </TableHead>
            <TableHead>Tarefa</TableHead>
            <TableHead className="hidden md:table-cell">Lead</TableHead>
            <TableHead className="hidden md:table-cell">Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Atribuído</TableHead>
            <TableHead className="hidden sm:table-cell">Prioridade</TableHead>
            <TableHead className="w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow 
              key={task.id}
              className="cursor-pointer"
              onClick={() => onSelectTask(task)}
            >
              <TableCell onClick={e => e.stopPropagation()}>
                <Checkbox 
                  checked={selectedTasks.includes(task.id)} 
                  onCheckedChange={() => handleToggleSelectTask(task.id)}
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {task.description || 'Sem descrição'}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {task.lead ? (
                  <>
                    <div>{task.lead.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.lead.course || 'Sem curso'}
                    </div>
                  </>
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {task.dueDate ? (
                  format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })
                ) : (
                  'Sem data'
                )}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(task.status)} className="flex items-center space-x-1">
                  {getStatusIcon(task.status)}
                  <span className="ml-1 capitalize">
                    {task.status.replace('_', ' ')}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>
                {task.assignedToName ? (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{task.assignedToName}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Não atribuído</span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={getPriorityBadgeVariant(task.priority)} className="capitalize">
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell onClick={e => e.stopPropagation()}>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => onContactLead(task)}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onContactLead(task)}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opções</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onScheduleContact(task)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar contato
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onCompleteTask(task.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Marcar como concluída
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        Atribuir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
