
import { v4 as uuidv4 } from 'uuid';
import { DialingRule } from '@/types/voicecall';
import { toast } from '@/hooks/use-toast';
import { simulateApiDelay } from './utils';
import { AddRuleParams, UpdateRuleParams, DialingRuleOperationResult } from './types';

// Add rule operation
export const addRuleOperation = async (
  rule: AddRuleParams,
  currentRules: DialingRule[]
): Promise<DialingRuleOperationResult & { rule?: DialingRule }> => {
  try {
    await simulateApiDelay();
    
    const newRule: DialingRule = {
      ...rule,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    toast({
      title: 'Regra criada com sucesso',
      description: `A regra "${rule.name}" foi criada com sucesso.`
    });
    
    return { success: true, rule: newRule };
  } catch (error) {
    console.error('Error adding rule:', error);
    
    toast({
      title: 'Erro ao criar regra',
      description: 'Ocorreu um erro ao criar a regra. Tente novamente.',
      variant: 'destructive'
    });
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Update rule operation
export const updateRuleOperation = async (
  id: string,
  updatedRule: UpdateRuleParams,
  currentRules: DialingRule[]
): Promise<DialingRuleOperationResult> => {
  try {
    await simulateApiDelay();
    
    const ruleExists = currentRules.some(rule => rule.id === id);
    if (!ruleExists) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    
    toast({
      title: 'Regra atualizada com sucesso',
      description: `A regra foi atualizada com sucesso.`
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating rule:', error);
    
    toast({
      title: 'Erro ao atualizar regra',
      description: 'Ocorreu um erro ao atualizar a regra. Tente novamente.',
      variant: 'destructive'
    });
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Delete rule operation
export const deleteRuleOperation = async (
  id: string,
  currentRules: DialingRule[]
): Promise<DialingRuleOperationResult> => {
  try {
    await simulateApiDelay();
    
    const ruleExists = currentRules.some(rule => rule.id === id);
    if (!ruleExists) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    
    toast({
      title: 'Regra excluída com sucesso',
      description: `A regra foi excluída com sucesso.`
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting rule:', error);
    
    toast({
      title: 'Erro ao excluir regra',
      description: 'Ocorreu um erro ao excluir a regra. Tente novamente.',
      variant: 'destructive'
    });
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Toggle rule status operation
export const toggleRuleStatusOperation = async (
  id: string,
  currentRules: DialingRule[]
): Promise<DialingRuleOperationResult & { newStatus?: boolean }> => {
  try {
    await simulateApiDelay();
    
    const rule = currentRules.find(r => r.id === id);
    if (!rule) {
      throw new Error(`Rule with ID ${id} not found`);
    }
    
    const newStatus = !rule.enabled;
    const statusText = newStatus ? 'ativada' : 'desativada';
    
    toast({
      title: `Regra ${statusText}`,
      description: `A regra foi ${statusText} com sucesso.`
    });
    
    return { success: true, newStatus };
  } catch (error) {
    console.error('Error toggling rule status:', error);
    
    toast({
      title: 'Erro ao alterar status da regra',
      description: 'Ocorreu um erro ao alterar o status da regra. Tente novamente.',
      variant: 'destructive'
    });
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
