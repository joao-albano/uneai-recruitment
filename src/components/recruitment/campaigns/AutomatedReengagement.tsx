
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';
import { useReengagementRules } from '@/hooks/useReengagementRules';
import ReengagementRulesList from './reengagement/ReengagementRulesList';
import ReengagementRuleForm from './reengagement/ReengagementRuleForm';

const AutomatedReengagement: React.FC = () => {
  const {
    rules,
    editingRule,
    isCreating,
    areAnyRulesEnabled,
    handleToggleRule,
    handleEditRule,
    handleSaveRule,
    handleCreateNewRule,
    handleCancelEdit,
    handleUpdateRule,
    toggleAllRules,
  } = useReengagementRules();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-5 w-5" /> Reengajamento Automático
              </CardTitle>
              <CardDescription className="mt-1">
                Configure mensagens automáticas para leads inativos baseado em períodos de tempo
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {areAnyRulesEnabled ? 'Ativado' : 'Desativado'}
              </span>
              <Switch 
                checked={areAnyRulesEnabled}
                onCheckedChange={toggleAllRules}
              />
            </div>
          </div>
        </CardHeader>

        <ReengagementRulesList
          rules={rules}
          onToggleRule={handleToggleRule}
          onEditRule={handleEditRule}
          onCreateNewRule={handleCreateNewRule}
        />
      </Card>
      
      {editingRule && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? 'Nova Regra de Reengajamento' : 'Editar Regra de Reengajamento'}</CardTitle>
            <CardDescription>
              Personalize a mensagem e configurações de reengajamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReengagementRuleForm
              rule={editingRule}
              isCreating={isCreating}
              onSave={handleSaveRule}
              onCancel={handleCancelEdit}
              onRuleChange={handleUpdateRule}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutomatedReengagement;
