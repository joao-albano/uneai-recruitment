
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RegistryRule, AddRegistryRuleParams, UpdateRegistryRuleParams } from '@/types/registry';

// This would normally interact with a backend API
// For now, we'll use local state with mock data
export const useRegistryRules = () => {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<RegistryRule[]>([
    {
      id: '1',
      code: 'INT',
      description: 'Lead demonstrou interesse no curso',
      type: 'human',
      resultType: 'positive',
      requiresFollowUp: true,
      automaticActions: ['enviar_email_informativo'],
      status: 'active',
      category: 'Interesse',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      code: 'NAO',
      description: 'Lead não tem interesse',
      type: 'human',
      resultType: 'negative',
      requiresFollowUp: false,
      automaticActions: [],
      status: 'active',
      category: 'Desinteresse',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      code: 'AGD',
      description: 'Agendamento realizado',
      type: 'ai',
      resultType: 'positive',
      requiresFollowUp: true,
      automaticActions: ['enviar_confirmacao', 'agendar_lembrete'],
      status: 'active',
      category: 'Agendamento',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const addRule = useCallback(async (ruleData: AddRegistryRuleParams) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newRule: RegistryRule = {
        id: uuidv4(),
        ...ruleData,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setRules(prevRules => [...prevRules, newRule]);
    } catch (error) {
      console.error('Error adding rule:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRule = useCallback(async (ruleId: string, updates: UpdateRegistryRuleParams) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRules(prevRules => 
        prevRules.map(rule => 
          rule.id === ruleId 
            ? { ...rule, ...updates, updatedAt: new Date() } 
            : rule
        )
      );
    } catch (error) {
      console.error('Error updating rule:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRule = useCallback(async (ruleId: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
    } catch (error) {
      console.error('Error deleting rule:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleRuleStatus = useCallback(async (ruleId: string, status: 'active' | 'inactive') => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRules(prevRules => 
        prevRules.map(rule => 
          rule.id === ruleId 
            ? { ...rule, status, updatedAt: new Date() } 
            : rule
        )
      );
    } catch (error) {
      console.error('Error toggling rule status:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    rules, 
    loading, 
    addRule, 
    updateRule, 
    deleteRule, 
    toggleRuleStatus 
  };
};
