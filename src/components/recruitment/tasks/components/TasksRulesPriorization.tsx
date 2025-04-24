
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PriorizationRule {
  id: string;
  name: string;
  weight: number;
  factors: {
    factor: string;
    weight: number;
  }[];
  isActive: boolean;
}

interface TasksRulesPriorizationProps {
  rules: PriorizationRule[];
  onUpdateRules: (rules: PriorizationRule[]) => void;
}

const TasksRulesPriorization: React.FC<TasksRulesPriorizationProps> = ({
  rules,
  onUpdateRules
}) => {
  const [localRules, setLocalRules] = useState<PriorizationRule[]>(rules);
  const [newRuleName, setNewRuleName] = useState('');
  
  const handleSave = () => {
    onUpdateRules(localRules);
  };
  
  const handleToggleRule = (id: string) => {
    setLocalRules(
      localRules.map(rule => 
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };
  
  const handleDeleteRule = (id: string) => {
    setLocalRules(localRules.filter(rule => rule.id !== id));
  };
  
  const handleWeightChange = (id: string, value: number) => {
    setLocalRules(
      localRules.map(rule => 
        rule.id === id ? { ...rule, weight: value } : rule
      )
    );
  };
  
  const handleAddRule = () => {
    if (!newRuleName.trim()) return;
    
    const newRule: PriorizationRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      weight: 5,
      factors: [],
      isActive: true,
    };
    
    setLocalRules([...localRules, newRule]);
    setNewRuleName('');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regras de Priorização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {localRules.map(rule => (
              <div key={rule.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{rule.name}</h3>
                    <Badge variant={rule.isActive ? 'default' : 'outline'}>
                      {rule.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>
                    Peso da Regra: {rule.weight}
                  </Label>
                  <Slider
                    value={[rule.weight]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => handleWeightChange(rule.id, value[0])}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Fatores</Label>
                  <div className="space-y-2">
                    {rule.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{factor.factor}</span>
                        <span>Peso: {factor.weight}</span>
                      </div>
                    ))}
                    {rule.factors.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Nenhum fator adicionado
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Nome da nova regra"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={handleAddRule}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-6 flex justify-end">
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksRulesPriorization;
