
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { TasksDistributionConfig } from '@/types/recruitment/tasks';

interface TasksRulesDistributionProps {
  rules: TasksDistributionConfig;
  onUpdateRules: (rules: TasksDistributionConfig) => void;
}

const TasksRulesDistribution: React.FC<TasksRulesDistributionProps> = ({
  rules,
  onUpdateRules
}) => {
  const [localRules, setLocalRules] = useState<TasksDistributionConfig>(rules);
  
  const handleSave = () => {
    onUpdateRules(localRules);
  };
  
  const handleAutomaticChange = (checked: boolean) => {
    setLocalRules({ ...localRules, isAutomatic: checked });
  };
  
  const handleExpertiseChange = (checked: boolean) => {
    setLocalRules({ ...localRules, considerExpertise: checked });
  };
  
  const handleBalanceLoadChange = (checked: boolean) => {
    setLocalRules({ ...localRules, balanceLoad: checked });
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Distribuição</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-distribution" className="font-medium">Distribuição Automática</Label>
              <p className="text-sm text-muted-foreground">
                Habilitar distribuição automática de tarefas
              </p>
            </div>
            <Switch
              id="auto-distribution"
              checked={localRules.isAutomatic}
              onCheckedChange={handleAutomaticChange}
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="max-tasks">Máximo de tarefas por atendente</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="max-tasks"
                  value={[localRules.maxTasksPerAgent]}
                  min={5}
                  max={50}
                  step={5}
                  onValueChange={(value) => setLocalRules({ ...localRules, maxTasksPerAgent: value[0] })}
                  className="w-full"
                />
                <span className="min-w-[3ch] text-center">{localRules.maxTasksPerAgent}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority-criteria">Critério de Prioridade</Label>
                <Select
                  value={localRules.prioritizeCriteria}
                  onValueChange={(value: any) => setLocalRules({ ...localRules, prioritizeCriteria: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dueDate">Data de Vencimento</SelectItem>
                    <SelectItem value="priority">Prioridade da Tarefa</SelectItem>
                    <SelectItem value="region">Região do Lead</SelectItem>
                    <SelectItem value="course">Curso de Interesse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="consider-expertise" className="font-medium">Considerar Especialidade</Label>
                  <p className="text-sm text-muted-foreground">
                    Distribuir tarefas baseado na especialidade do atendente
                  </p>
                </div>
                <Switch
                  id="consider-expertise"
                  checked={localRules.considerExpertise}
                  onCheckedChange={handleExpertiseChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="balance-load" className="font-medium">Balancear Carga</Label>
                  <p className="text-sm text-muted-foreground">
                    Equilibrar o número de tarefas entre os atendentes
                  </p>
                </div>
                <Switch
                  id="balance-load"
                  checked={localRules.balanceLoad}
                  onCheckedChange={handleBalanceLoadChange}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave}>Salvar Configurações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksRulesDistribution;
