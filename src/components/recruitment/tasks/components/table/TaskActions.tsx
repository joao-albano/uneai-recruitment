
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, History, Check } from 'lucide-react';
import { Task } from '@/types/recruitment/tasks';

interface TaskActionsProps {
  task: Task;
  onContactLead: (task: Task) => void;
  onScheduleContact: (task: Task) => void;
  onViewContactHistory: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  onContactLead,
  onScheduleContact,
  onViewContactHistory,
  onCompleteTask,
}) => {
  return (
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
  );
};

export default TaskActions;
