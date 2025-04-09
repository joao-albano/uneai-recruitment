
import { useState, useEffect } from 'react';
import { DialingRule } from '@/types/voicecall';
import { 
  loadRulesFromStorage, 
  saveRulesToStorage 
} from './utils';
import { 
  addRuleOperation, 
  updateRuleOperation, 
  deleteRuleOperation, 
  toggleRuleStatusOperation 
} from './ruleOperations';
import { defaultRedialIntervals } from './constants';
import { AddRuleParams, UpdateRuleParams } from './types';

export const useDialingRules = () => {
  const [rules, setRules] = useState<DialingRule[]>(() => loadRulesFromStorage());
  const [loading, setLoading] = useState(false);

  // Save rules to localStorage whenever they change
  useEffect(() => {
    saveRulesToStorage(rules);
  }, [rules]);

  const addRule = async (rule: AddRuleParams) => {
    setLoading(true);
    
    try {
      const result = await addRuleOperation(rule, rules);
      
      if (result.success && result.rule) {
        setRules(prevRules => [...prevRules, result.rule!]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in addRule:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateRule = async (id: string, updatedRule: UpdateRuleParams) => {
    setLoading(true);
    
    try {
      const result = await updateRuleOperation(id, updatedRule, rules);
      
      if (result.success) {
        setRules(prevRules => 
          prevRules.map(rule => 
            rule.id === id 
              ? { 
                  ...rule, 
                  ...updatedRule, 
                  updatedAt: new Date() 
                } 
              : rule
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in updateRule:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRule = async (id: string) => {
    setLoading(true);
    
    try {
      const result = await deleteRuleOperation(id, rules);
      
      if (result.success) {
        setRules(prevRules => prevRules.filter(rule => rule.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in deleteRule:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleRuleStatus = async (id: string) => {
    setLoading(true);
    
    try {
      const result = await toggleRuleStatusOperation(id, rules);
      
      if (result.success) {
        setRules(prevRules => 
          prevRules.map(rule => 
            rule.id === id 
              ? { ...rule, enabled: result.newStatus!, updatedAt: new Date() } 
              : rule
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in toggleRuleStatus:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    rules,
    loading,
    addRule,
    updateRule,
    deleteRule,
    toggleRuleStatus,
    defaultRedialIntervals
  };
};
