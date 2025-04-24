
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2, Edit } from 'lucide-react';
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
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    weight: number;
    isActive: boolean;
    factors: {
      factor: string;
      weight: number;
    }[];
  }>({
    name: '',
    weight: 5,
    isActive: true,
    factors: []
  });
  
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
  
  const handleEditClick = (rule: PriorizationRule) => {
    setEditingRuleId(rule.id);
    setEditFormData({
      name: rule.name,
      weight: rule.weight,
      isActive: rule.isActive,
      factors: [...rule.factors]
    });
  };

  const handleEditCancel = () => {
    setEditingRuleId(null);
  };

  const handleEditSave = () => {
    if (!editingRuleId) return;
    
    setLocalRules(
      localRules.map(rule => 
        rule.id === editingRuleId 
          ? { 
              ...rule, 
              name: editFormData.name,
              weight: editFormData.weight,
              isActive: editFormData.isActive,
              factors: editFormData.factors
            } 
          : rule
      )
    );
    
    setEditingRuleId(null);
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  const handleAddFactor = () => {
    if (!editingRuleId) return;
    
    const newFactor = {
      factor: '',
      weight: 1
    };
    
    setEditFormData({
      ...editFormData,
      factors: [...editFormData.factors, newFactor]
    });
  };

  const handleDeleteFactor = (index: number) => {
    const updatedFactors = [...editFormData.factors];
    updatedFactors.splice(index, 1);
    
    setEditFormData({
      ...editFormData,
      factors: updatedFactors
    });
  };

  const handleFactorChange = (index: number, field: string, value: any) => {
    const updatedFactors = [...editFormData.factors];
    updatedFactors[index] = {
      ...updatedFactors[index],
      [field]: value
    };
    
    setEditFormData({
      ...editFormData,
      factors: updatedFactors
    });
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
                {editingRuleId === rule.id ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Input 
                        value={editFormData.name}
                        onChange={(e) => handleEditFormChange('name', e.target.value)}
                        className="max-w-md"
                      />
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={editFormData.isActive}
                          onCheckedChange={(checked) => handleEditFormChange('isActive', checked)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEditCancel}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleEditSave}
                        >
                          Salvar
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>
                        Peso da Regra: {editFormData.weight}
                      </Label>
                      <Slider
                        value={[editFormData.weight]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleEditFormChange('weight', value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Fatores</Label>
                      {editFormData.factors.length === 0 ? (
                        <p className="text-sm text-muted-foreground mb-2">
                          Nenhum fator adicionado
                        </p>
                      ) : (
                        editFormData.factors.map((factor, idx) => (
                          <div key={idx} className="flex items-center gap-2 mb-2">
                            <Input
                              value={factor.factor}
                              onChange={(e) => handleFactorChange(idx, 'factor', e.target.value)}
                              placeholder="Nome do fator"
                              className="flex-1"
                            />
                            <div className="flex flex-col w-32">
                              <Label className="text-xs">Peso: {factor.weight}</Label>
                              <Slider
                                value={[factor.weight]}
                                min={1}
                                max={5}
                                step={1}
                                onValueChange={(value) => handleFactorChange(idx, 'weight', value[0])}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteFactor(idx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleAddFactor}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Adicionar Fator
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
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
                          onClick={() => handleEditClick(rule)}
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
                  </>
                )}
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
