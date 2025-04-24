
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, Download, Upload } from 'lucide-react';

const TasksRulesHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Regras de Tarefas</h1>
        <p className="text-muted-foreground">
          Configure as regras de geração, priorização e distribuição de tarefas
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
        <Button className="flex items-center gap-2">
          <Settings2 className="h-4 w-4" />
          <span>Aplicar</span>
        </Button>
      </div>
    </div>
  );
};

export default TasksRulesHeader;
