
import { useState } from 'react';
import { PriorizationRule } from '@/types/recruitment/tasks';

export const usePriorizationRules = (
  initialRules: PriorizationRule[],
  onUpdateRules: (rules: PriorizationRule[]) => void,
  generationRules: { id: string; name: string; linkedPriorizationRules?: string[] }[] = []
) => {
  // Garante que todas as regras iniciais tenham um array factors válido
  const validatedInitialRules = initialRules.map(rule => ({
    ...rule,
    factors: Array.isArray(rule.factors) ? rule.factors : []
  }));
  
  const [localRules, setLocalRules] = useState<PriorizationRule[]>(validatedInitialRules);
  const [newRuleName, setNewRuleName] = useState('');

  const handleSave = () => {
    const updatedRules = localRules.map(rule => {
      const linkedFromRules = generationRules
        .filter(genRule => genRule.linkedPriorizationRules?.includes(rule.id))
        .map(genRule => genRule.id);
      
      return {
        ...rule,
        // Garantir que factors é sempre um array válido
        factors: Array.isArray(rule.factors) ? rule.factors : [],
        linkedFromGenerationRules: linkedFromRules
      };
    });
    
    onUpdateRules(updatedRules);
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
      appliesTo: {}
    };
    
    setLocalRules([...localRules, newRule]);
    setNewRuleName('');
  };

  return {
    localRules,
    newRuleName,
    setNewRuleName,
    handleSave,
    handleToggleRule,
    handleDeleteRule,
    handleWeightChange,
    handleAddRule
  };
};
