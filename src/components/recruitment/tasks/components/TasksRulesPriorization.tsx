
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { PriorizationRule } from '@/types/recruitment/tasks';
import { usePriorizationRules } from '../hooks/usePriorizationRules';
import { useRuleEditor } from '../hooks/useRuleEditor';
import RuleEditForm from './rule-editor/RuleEditForm';
import PriorizationRuleItem from './rule-list/PriorizationRuleItem';

interface TasksRulesPriorizationProps {
  rules: PriorizationRule[];
  onUpdateRules: (rules: PriorizationRule[]) => void;
  funnelStages?: { id: string; name: string }[];
  generationRules?: { id: string; name: string; linkedPriorizationRules?: string[] }[];
}

const TasksRulesPriorization: React.FC<TasksRulesPriorizationProps> = ({
  rules,
  onUpdateRules,
  funnelStages = [],
  generationRules = []
}) => {
  const {
    localRules,
    newRuleName,
    setNewRuleName,
    handleSave,
    handleToggleRule,
    handleDeleteRule,
    handleWeightChange,
    handleAddRule
  } = usePriorizationRules(rules, onUpdateRules, generationRules);

  const {
    editingRuleId,
    editFormData,
    handleEditClick,
    handleEditCancel,
    handleEditFormChange,
    handleAddFactor,
    handleDeleteFactor,
    handleFactorChange,
    setEditingRuleId,
    setEditFormData
  } = useRuleEditor();

  const handleEditSave = () => {
    if (!editingRuleId) return;
    
    // Ensure factors is an array
    const validatedFactors = Array.isArray(editFormData.factors) 
      ? editFormData.factors 
      : [];
    
    const updatedRules = localRules.map(rule => 
      rule.id === editingRuleId 
        ? { 
            ...rule, 
            name: editFormData.name,
            weight: editFormData.weight,
            isActive: editFormData.isActive,
            factors: validatedFactors,
            appliesTo: editFormData.appliesTo
          } 
        : rule
    );
    
    setEditingRuleId(null);
    onUpdateRules(updatedRules);
  };

  const handleStageChange = (stageId: string) => {
    const stage = funnelStages.find(s => s.id === stageId);
    
    handleEditFormChange('appliesTo', {
      stageId,
      stageName: stage?.name
    });
  };

  const getLinkedGenerationRules = (ruleId: string) => {
    return generationRules.filter(rule => 
      rule.linkedPriorizationRules?.includes(ruleId)
    );
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
              <div key={rule.id}>
                {editingRuleId === rule.id ? (
                  <RuleEditForm
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleEditCancel={handleEditCancel}
                    handleEditSave={handleEditSave}
                    handleAddFactor={handleAddFactor}
                    handleDeleteFactor={handleDeleteFactor}
                    handleFactorChange={handleFactorChange}
                    handleStageChange={handleStageChange}
                    funnelStages={funnelStages}
                  />
                ) : (
                  <PriorizationRuleItem
                    rule={rule}
                    onEditClick={handleEditClick}
                    onToggleRule={handleToggleRule}
                    onDeleteRule={handleDeleteRule}
                    onWeightChange={handleWeightChange}
                    linkedGenerationRules={getLinkedGenerationRules(rule.id)}
                  />
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
                  type="button"
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
