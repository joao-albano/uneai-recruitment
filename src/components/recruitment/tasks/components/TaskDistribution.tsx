
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface TaskDistributionProps {
  config: {
    isAutomatic: boolean;
    maxTasksPerAgent: number;
    prioritizeCriteria: 'priority' | 'dueDate' | 'region' | 'course';
    considerExpertise: boolean;
    balanceLoad: boolean;
  };
  onConfigChange: (config: any) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const TaskDistribution: React.FC<TaskDistributionProps> = ({
  config,
  onConfigChange
}) => {
  const handleIsAutomaticChange = (checked: boolean) => {
    onConfigChange({ ...config, isAutomatic: checked });
  };
  
  const handleMaxTasksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onConfigChange({ ...config, maxTasksPerAgent: value });
  };
  
  const handlePrioritizeCriteriaChange = (value: string) => {
    onConfigChange({ 
      ...config, 
      prioritizeCriteria: value as 'priority' | 'dueDate' | 'region' | 'course' 
    });
  };
  
  const handleConsiderExpertiseChange = (checked: boolean) => {
    onConfigChange({ ...config, considerExpertise: checked });
  };
  
  const handleBalanceLoadChange = (checked: boolean) => {
    onConfigChange({ ...config, balanceLoad: checked });
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="automatic-distribution"
          checked={config.isAutomatic}
          onCheckedChange={handleIsAutomaticChange}
        />
        <Label htmlFor="automatic-distribution">Distribuição automática</Label>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="max-tasks">Máximo de tarefas por atendente</Label>
        <Input
          id="max-tasks"
          type="number"
          value={config.maxTasksPerAgent.toString()}
          onChange={handleMaxTasksChange}
          min="1"
          max="100"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="prioritize-criteria">Critério de priorização</Label>
        <Select 
          value={config.prioritizeCriteria} 
          onValueChange={handlePrioritizeCriteriaChange}
        >
          <SelectTrigger id="prioritize-criteria">
            <SelectValue placeholder="Selecione um critério" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Prioridade</SelectItem>
            <SelectItem value="dueDate">Data de vencimento</SelectItem>
            <SelectItem value="region">Região</SelectItem>
            <SelectItem value="course">Curso</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="consider-expertise"
          checked={config.considerExpertise}
          onCheckedChange={handleConsiderExpertiseChange}
        />
        <Label htmlFor="consider-expertise">Considerar expertise do atendente</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="balance-load"
          checked={config.balanceLoad}
          onCheckedChange={handleBalanceLoadChange}
        />
        <Label htmlFor="balance-load">Balancear carga de trabalho</Label>
      </div>
    </div>
  );
};

export default TaskDistribution;
