
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

interface TasksHeaderProps {
  onCreateTask?: () => void;
}

const TasksHeader: React.FC<TasksHeaderProps> = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Lista de Tarefas</h1>
        <p className="text-muted-foreground">
          Gerencie e execute tarefas de contato com leads
        </p>
      </div>
    </div>
  );
};

export default TasksHeader;
