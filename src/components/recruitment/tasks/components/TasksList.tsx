
import React, { useState } from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Check,
  MoreHorizontal,
  Phone,
  UserPlus,
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TasksListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onAssignTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onBulkOperations: (operation: string, taskIds: string[]) => void;
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
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(tasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };
  
  const handleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };
  
  const handleBulkAssign = () => {
    onBulkOperations('assign', selectedTasks);
    setSelectedTasks([]);
  };
  
  const handleBulkComplete = () => {
    onBulkOperations('complete', selectedTasks);
    setSelectedTasks([]);
  };
  
  const handleBulkDelete = () => {
    onBulkOperations('delete', selectedTasks);
    setSelectedTasks([]);
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'média':
        return <Badge variant="default">Média</Badge>;
      case 'baixa':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Pendente</Badge>;
      case 'em_andamento':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Em andamento</Badge>;
      case 'agendada':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Agendada</Badge>;
      case 'concluída':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Concluída</Badge>;
      case 'cancelada':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Cancelada</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      {selectedTasks.length > 0 && (
        <div className="mb-4 p-2 bg-muted rounded-md flex items-center justify-between">
          <span className="text-sm font-medium">
            {selectedTasks.length} tarefas selecionadas
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleBulkAssign}>
              <UserPlus className="h-4 w-4 mr-1" /> Atribuir
            </Button>
            <Button size="sm" variant="outline" onClick={handleBulkComplete}>
              <Check className="h-4 w-4 mr-1" /> Concluir
            </Button>
            <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
              Excluir
            </Button>
          </div>
        </div>
      )}
      
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada.</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox 
                    onCheckedChange={handleSelectAll}
                    checked={selectedTasks.length === tasks.length && tasks.length > 0}
                  />
                </TableHead>
                <TableHead>Título/Lead</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="hidden md:table-cell">Prioridade</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Atribuído</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => handleSelectTask(task.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelectTask(task)}
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.lead?.name || "Sem lead associado"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {task.dueDate ? (
                      <span className="whitespace-nowrap">
                        {format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
                      </span>
                    ) : (
                      "Sem data"
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getPriorityBadge(task.priority)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(task.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {task.assignedToName || "Não atribuído"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onContactLead(task)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Contatar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onScheduleContact(task)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Agendar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAssignTask(task.id)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Atribuir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCompleteTask(task.id)}>
                          <Check className="mr-2 h-4 w-4" />
                          Concluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TasksList;
