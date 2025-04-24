
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Task } from '@/types/recruitment/tasks';
import TaskRow from './table/TaskRow';

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
  onContactLead,
  onScheduleContact,
  onCompleteTask,
  onViewContactHistory
}) => {
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
          <TaskRow
            key={task.id}
            task={task}
            onSelectTask={onSelectTask}
            onContactLead={onContactLead}
            onScheduleContact={onScheduleContact}
            onViewContactHistory={onViewContactHistory}
            onCompleteTask={onCompleteTask}
          />
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
