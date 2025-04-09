
import React from 'react';
import { Card } from '@/components/ui/card';
import RulesList from '../RulesList';
import EmptyRulesState from '../EmptyRulesState';
import { DialingRule } from '@/types/voicecall';
import { useIsMobile } from '@/hooks/use-mobile';

interface RulesContentProps {
  rules: DialingRule[];
  isLoading: boolean;
  onEditRule: (rule: DialingRule) => void;
  onDeleteRule: (rule: DialingRule) => void;
  onToggleStatus: (rule: DialingRule) => void;
  onAddRule: () => void;
}

const RulesContent: React.FC<RulesContentProps> = ({
  rules,
  isLoading,
  onEditRule,
  onDeleteRule,
  onToggleStatus,
  onAddRule
}) => {
  const isMobile = useIsMobile();

  if (rules.length === 0) {
    return <EmptyRulesState onAddRule={onAddRule} />;
  }

  return (
    <Card>
      <RulesList
        rules={rules}
        isMobile={isMobile}
        onEditRule={onEditRule}
        onDeleteRule={onDeleteRule}
        onToggleStatus={onToggleStatus}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default RulesContent;
