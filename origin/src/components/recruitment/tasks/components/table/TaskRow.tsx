
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
  const getLeadPhone = (task: Task) => {
    return task.lead?.phone || '-';
  };

  return (
    <TableRow 
      className="group border-b transition-colors hover:bg-muted/50" 
      onClick={() => onSelectTask(task)}
    >
      <TableCell className="py-3 pl-4">
        <div className="flex items-start gap-1">
          <input
            type="checkbox"
            className="mt-1.5 h-4 w-4 rounded-full border-gray-300"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {task.lead?.name || 'Sem nome'}
            </span>
            <span className="text-sm text-muted-foreground">
              {getLeadPhone(task)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{task.title}</span>
          <span className="text-sm text-muted-foreground line-clamp-1">
            {task.description || '-'}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <TaskBadge variant="status" label={task.status} />
      </TableCell>
      <TableCell>
        <TaskBadge variant="priority" label={task.priority} />
      </TableCell>
      <TableCell className="text-muted-foreground">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {task.assignedToName || '-'}
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
