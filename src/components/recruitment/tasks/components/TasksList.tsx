
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
    pendente: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    em_andamento: 'bg-blue-50 text-blue-700 border-blue-300',
    concluída: 'bg-green-50 text-green-700 border-green-300',
    agendada: 'bg-purple-50 text-purple-700 border-purple-300',
    cancelada: 'bg-gray-50 text-gray-700 border-gray-300',
  };
  
  // Priority colors
  const priorityColors = {
    alta: 'bg-red-50 text-red-700 border-red-300',
    média: 'bg-yellow-50 text-amber-700 border-amber-300',
    baixa: 'bg-green-50 text-green-700 border-green-300',
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
  
  // Handle bulk operations
  const handleBulkOperation = (operation: string) => {
    onBulkOperations(operation, selectedTaskIds);
    setSelectedTaskIds([]);
  };
  
  // Determine lead display information for a task
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
    } else {
      return "Sem lead associado";
    }
  };
  
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Crie uma nova tarefa ou ajuste os filtros para visualizar tarefas existentes.
          </p>
        </div>
      ) : (
        <>
          {selectedTaskIds.length > 0 && (
            <div className="flex justify-between items-center bg-accent/20 px-4 py-2 rounded-md">
              <span>{selectedTaskIds.length} item(s) selecionado(s)</span>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkOperation('complete')}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Concluir
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleBulkOperation('delete')}
                >
                  Excluir
                </Button>
              </div>
            </div>
          )}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={selectedTaskIds.length === tasks.length && tasks.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Título/Lead</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atribuído</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => (
                  <TableRow 
                    key={task.id}
                    className="cursor-pointer hover:bg-accent/10"
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
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {getLeadDisplayInfo(task)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yyyy') : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={priorityColors[task.priority]}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[task.status]}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.assignedToName || 'Não atribuído'}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
        </>
      )}
    </div>
  );
};

export default TasksList;
