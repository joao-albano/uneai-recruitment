
import React, { useState } from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MoreHorizontal, Phone, Calendar, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TasksListProps {
  tasks: Task[];
  onSelectTask: (task: Task | null) => void;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onAssignTask: (taskId: string, agentId: string, agentName: string) => void;
  onCompleteTask: (taskId: string) => void;
  onBulkOperations: (operation: string, selectedIds: string[]) => void;
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
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  
  // Status colors for badges
  const statusColors = {
    pendente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    em_andamento: 'bg-blue-100 text-blue-800 border-blue-300',
    concluída: 'bg-green-100 text-green-800 border-green-300',
    agendada: 'bg-purple-100 text-purple-800 border-purple-300',
    cancelada: 'bg-gray-100 text-gray-800 border-gray-300',
  };
  
  // Priority colors
  const priorityColors = {
    alta: 'bg-red-100 text-red-800 border-red-300',
    média: 'bg-yellow-100 text-amber-800 border-amber-300',
    baixa: 'bg-green-100 text-green-800 border-green-300',
  };

  // Toggle task selection
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };
  
  // Select all or none
  const toggleSelectAll = () => {
    if (selectedTaskIds.length === tasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasks.map(task => task.id));
    }
  };

  // Get lead info display
  const getLeadDisplayInfo = (task: Task) => {
    if (task.leads && task.leads.length > 0) {
      const leadCount = task.leads.length;
      const primaryLead = task.leads[0];
      if (leadCount === 1) {
        return primaryLead.name;
      } else {
        return `${primaryLead.name} +${leadCount - 1}`;
      }
    } else if (task.lead) {
      return task.lead.name;
    }
    return "Sem lead associado";
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-muted-foreground text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-sm text-muted-foreground mt-2">
          Crie uma nova tarefa ou ajuste os filtros para visualizar tarefas existentes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedTaskIds.length > 0 && (
        <div className="flex justify-between items-center bg-accent/20 px-4 py-2 rounded-md">
          <span className="text-sm font-medium">{selectedTaskIds.length} item(s) selecionado(s)</span>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onBulkOperations('complete', selectedTaskIds)}
            >
              <Check className="h-4 w-4 mr-1" />
              Concluir
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onBulkOperations('delete', selectedTaskIds)}
            >
              Excluir
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedTaskIds.length === tasks.length && tasks.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Título/Lead</TableHead>
              <TableHead className="w-[120px]">Data</TableHead>
              <TableHead className="w-[100px]">Prioridade</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[150px]">Atribuído</TableHead>
              <TableHead className="w-[100px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {tasks.map(task => (
              <TableRow 
                key={task.id}
                className="cursor-pointer hover:bg-accent/5 transition-colors"
                onClick={() => onSelectTask(task)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedTaskIds.includes(task.id)}
                    onCheckedChange={() => toggleTaskSelection(task.id)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {getLeadDisplayInfo(task)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {task.dueDate ? (
                      <span className="whitespace-nowrap">
                        {format(new Date(task.dueDate), 'dd/MM/yyyy')}
                      </span>
                    ) : '-'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${priorityColors[task.priority]} capitalize`}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${statusColors[task.status]} capitalize`}
                  >
                    {task.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {task.assignedToName || 
                      <span className="text-muted-foreground">Não atribuído</span>
                    }
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => onContactLead(task)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contatar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onScheduleContact(task)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {task.status !== 'concluída' && (
                        <DropdownMenuItem onClick={() => onCompleteTask(task.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Concluir
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksList;
