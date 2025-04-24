
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
  onViewContactHistory,
  onCompleteTask
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-border hover:bg-transparent">
          <TableHead className="w-[250px]">Lead</TableHead>
          <TableHead className="w-[250px]">Tarefa</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          <TableHead className="w-[120px]">Prioridade</TableHead>
          <TableHead className="w-[120px]">Vencimento</TableHead>
          <TableHead className="w-[120px]">Atendente</TableHead>
          <TableHead className="w-[150px] text-right">Ações</TableHead>
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
            <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
              Nenhuma tarefa encontrada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TasksList;
