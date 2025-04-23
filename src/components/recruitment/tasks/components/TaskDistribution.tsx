
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { TasksDistributionConfig } from '@/types/recruitment/tasks';

interface TaskDistributionProps {
  config: TasksDistributionConfig;
  onConfigChange: (config: TasksDistributionConfig) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const TaskDistribution: React.FC<TaskDistributionProps> = ({
  config,
  onConfigChange,
  onConfirm,
  onCancel
}) => {
  const handleModeChange = (isAuto: boolean) => {
    onConfigChange({ ...config, isAutomatic: isAuto });
  };
  
  const handleMaxTasksChange = (value: number[]) => {
    onConfigChange({ ...config, maxTasksPerAgent: value[0] });
  };
  
  const handlePriorityCriteriaChange = (value: string) => {
    onConfigChange({ ...config, prioritizeCriteria: value as any });
  };
  
  const handleConsiderExpertiseChange = (checked: boolean) => {
    onConfigChange({ ...config, considerExpertise: checked });
  };
  
  const handleBalanceLoadChange = (checked: boolean) => {
    onConfigChange({ ...config, balanceLoad: checked });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Configuração de Distribuição</h3>
        <p className="text-sm text-muted-foreground">
          Configure como as tarefas serão distribuídas entre os atendentes
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label>Modo de Distribuição</Label>
          <div className="flex space-x-2">
            <Button
              variant={config.isAutomatic ? "default" : "outline"}
              onClick={() => handleModeChange(true)}
            >
              Automático
            </Button>
            <Button
              variant={!config.isAutomatic ? "default" : "outline"}
              onClick={() => handleModeChange(false)}
            >
              Manual
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Máximo de tarefas por atendente</Label>
          <div className="flex items-center space-x-4">
            <Slider
              defaultValue={[config.maxTasksPerAgent]}
              max={50}
              min={5}
              step={5}
              className="flex-1"
              onValueChange={handleMaxTasksChange}
            />
            <span className="w-12 text-center">{config.maxTasksPerAgent}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Critério de Priorização</Label>
          <Select value={config.prioritizeCriteria} onValueChange={handlePriorityCriteriaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um critério" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Data de Vencimento</SelectItem>
              <SelectItem value="priority">Prioridade</SelectItem>
              <SelectItem value="region">Região</SelectItem>
              <SelectItem value="course">Curso</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="expertise" 
            checked={config.considerExpertise}
            onCheckedChange={handleConsiderExpertiseChange}
          />
          <Label htmlFor="expertise" className="cursor-pointer">
            Considerar especialidade dos atendentes
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="balance" 
            checked={config.balanceLoad}
            onCheckedChange={handleBalanceLoadChange}
          />
          <Label htmlFor="balance" className="cursor-pointer">
            Balancear carga de trabalho
          </Label>
        </div>
      </div>
    </div>
  );
};

export default TaskDistribution;
