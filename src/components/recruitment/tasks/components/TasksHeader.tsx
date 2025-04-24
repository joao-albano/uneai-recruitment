
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Upload } from 'lucide-react';

interface TasksHeaderProps {
  onCreateTask: () => void;
}

const TasksHeader: React.FC<TasksHeaderProps> = ({ onCreateTask }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <p className="text-muted-foreground">
          Gerencie e execute tarefas de contato com leads
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => alert('Funcionalidade de exportar em desenvolvimento')}
        >
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => alert('Funcionalidade de importar em desenvolvimento')}
        >
          <Upload className="h-4 w-4" />
          <span>Importar</span>
        </Button>
        <Button className="flex items-center gap-2" onClick={onCreateTask}>
          <Plus className="h-4 w-4" />
          <span>Nova Tarefa</span>
        </Button>
      </div>
    </div>
  );
};

export default TasksHeader;
