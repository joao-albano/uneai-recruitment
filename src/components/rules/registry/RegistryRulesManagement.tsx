
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bot } from 'lucide-react';
import RegistryRulesList from './RegistryRulesList';
import { useRegistryRules } from './hooks/useRegistryRules';

const RegistryRulesManagement: React.FC = () => {
  const { rules, loading, addRule, updateRule, deleteRule, toggleRuleStatus } = useRegistryRules();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="human" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="human" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Atendimento Humano</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Atendimento IA</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="human">
          <RegistryRulesList 
            type="human"
            rules={rules.filter(r => r.type === 'human')}
            isLoading={loading}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
            onToggleStatus={toggleRuleStatus}
          />
        </TabsContent>
        
        <TabsContent value="ai">
          <RegistryRulesList
            type="ai" 
            rules={rules.filter(r => r.type === 'ai')}
            isLoading={loading}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
            onToggleStatus={toggleRuleStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegistryRulesManagement;
