
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { ReengagementRule } from '@/types/recruitment';
import ReengagementRuleCard from './ReengagementRuleCard';

interface ReengagementRulesListProps {
  rules: ReengagementRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (id: string) => void;
  onCreateNewRule: () => void;
}

const ReengagementRulesList: React.FC<ReengagementRulesListProps> = ({
  rules,
  onToggleRule,
  onEditRule,
  onCreateNewRule,
}) => {
  return (
    <>
      <CardContent className="space-y-4">
        {rules.map((rule) => (
          <ReengagementRuleCard
            key={rule.id}
            rule={rule}
            onToggle={onToggleRule}
            onEdit={onEditRule}
          />
        ))}
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onCreateNewRule}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Adicionar Nova Regra de Reengajamento
        </Button>
      </CardFooter>
    </>
  );
};

export default ReengagementRulesList;
