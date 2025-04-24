
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/recruitment/tasks';
import { Phone, Calendar, Check, History, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TasksListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onBulkOperations: (operation: string, selectedIds: string[]) => void;
  onViewContactHistory: (taskId: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  onContactLead,
  onScheduleContact,
  onCompleteTask,
  onBulkOperations,
  onViewContactHistory
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'média':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluída':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'agendada':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-muted hover:bg-transparent">
          <TableHead className="py-4 font-semibold text-muted-foreground">Título</TableHead>
          <TableHead className="font-semibold text-muted-foreground">Prioridade</TableHead>
          <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
          <TableHead className="font-semibold text-muted-foreground">Atribuído a</TableHead>
          <TableHead className="font-semibold text-muted-foreground">Data de Vencimento</TableHead>
          <TableHead className="text-right font-semibold text-muted-foreground">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow 
            key={task.id} 
            className="cursor-pointer border-b transition-colors hover:bg-muted/50" 
            onClick={() => onSelectTask(task)}
          >
            <TableCell className="py-4 font-medium">{task.title}</TableCell>
            <TableCell>
              <Badge variant="secondary" className={`${getPriorityColor(task.priority)} px-2 py-0.5 text-xs font-medium rounded-full`}>
                {task.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={`${getStatusColor(task.status)} px-2 py-0.5 text-xs font-medium rounded-full`}>
                {task.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{task.assignedToName}</TableCell>
            <TableCell className="text-muted-foreground">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onContactLead(task);
                  }}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onScheduleContact(task);
                  }}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewContactHistory(task.id);
                  }}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCompleteTask(task.id);
                  }}
                  className="h-8 w-8 hover:bg-muted"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {tasks.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
              Nenhuma tarefa encontrada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TasksList;
