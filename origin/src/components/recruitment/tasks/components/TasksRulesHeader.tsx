
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, Download, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TasksRulesHeader: React.FC = () => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "As regras de tarefas estão sendo exportadas.",
    });

    // Simulando o download após um curto período
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "As regras de tarefas foram exportadas com sucesso.",
      });
    }, 1500);
  };

  const handleImport = () => {
    toast({
      title: "Importação iniciada",
      description: "Por favor, selecione um arquivo para importar as regras.",
    });
  };

  const handleApply = () => {
    toast({
      title: "Regras aplicadas",
      description: "As regras de tarefas foram aplicadas com sucesso.",
    });
  };

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
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleImport}
        >
          <Upload className="h-4 w-4" />
          <span>Importar</span>
        </Button>
        <Button 
          className="flex items-center gap-2"
          onClick={handleApply}
        >
          <Settings2 className="h-4 w-4" />
          <span>Aplicar</span>
        </Button>
      </div>
    </div>
  );
};

export default TasksRulesHeader;
