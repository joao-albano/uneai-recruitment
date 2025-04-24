
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Task } from '@/types/recruitment/tasks';
import TaskBadge from './TaskBadge';
import TaskActions from './TaskActions';

interface TaskRowProps {
  task: Task;
  onSelectTask: (task: Task) => void;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onViewContactHistory: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onSelectTask,
  onContactLead,
  onScheduleContact,
  onViewContactHistory,
  onCompleteTask,
}) => {
  return (
    <TableRow 
      className="cursor-pointer border-b transition-colors hover:bg-muted/50" 
      onClick={() => onSelectTask(task)}
    >
      <TableCell className="py-4 font-medium">{task.title}</TableCell>
      <TableCell>
        <TaskBadge variant="priority" label={task.priority} />
      </TableCell>
      <TableCell>
        <TaskBadge variant="status" label={task.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">{task.assignedToName}</TableCell>
      <TableCell className="text-muted-foreground">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
      </TableCell>
      <TableCell>
        <TaskActions
          task={task}
          onContactLead={onContactLead}
          onScheduleContact={onScheduleContact}
          onViewContactHistory={onViewContactHistory}
          onCompleteTask={onCompleteTask}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;
