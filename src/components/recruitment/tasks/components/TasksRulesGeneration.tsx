
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GenerationRule {
  id: string;
  name: string;
  conditions: {
    field: string;
    operator: string;
    value: string | number | boolean | string[];
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TasksRulesGenerationProps {
  rules: GenerationRule[];
  onUpdateRules: (rules: GenerationRule[]) => void;
}

const TasksRulesGeneration: React.FC<TasksRulesGenerationProps> = ({
  rules,
  onUpdateRules
}) => {
  const [localRules, setLocalRules] = useState<GenerationRule[]>(rules);
  const [newRuleName, setNewRuleName] = useState('');
  
  const handleSave = () => {
    onUpdateRules(localRules);
  };
  
  const handleToggleRule = (id: string) => {
    setLocalRules(
      localRules.map(rule => 
        rule.id === id 
          ? { ...rule, isActive: !rule.isActive, updatedAt: new Date() } 
          : rule
      )
    );
  };
  
  const handleDeleteRule = (id: string) => {
    setLocalRules(localRules.filter(rule => rule.id !== id));
  };
  
  const handleAddRule = () => {
    if (!newRuleName.trim()) return;
    
    const newRule: GenerationRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      conditions: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setLocalRules([...localRules, newRule]);
    setNewRuleName('');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regras de Geração de Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {localRules.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma regra de geração configurada
              </p>
            ) : (
              localRules.map(rule => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rule.name}</h3>
                      <Badge variant={rule.isActive ? 'default' : 'outline'}>
                        {rule.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
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
                  
                  <div className="mt-4">
                    <Label className="mb-2 block">Condições</Label>
                    {rule.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm mb-1">
                        <Badge variant="outline">{condition.field}</Badge>
                        <span>{condition.operator}</span>
                        <Badge variant="secondary">{String(condition.value)}</Badge>
                      </div>
                    ))}
                    {rule.conditions.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma condição configurada
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Atualizado em: {new Date(rule.updatedAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
            
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

export default TasksRulesGeneration;
