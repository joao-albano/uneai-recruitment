
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DialingRule, DialingFailureType, RedialInterval } from '@/types/voicecall';
import { useToast } from '@/hooks/use-toast';

// Default redial intervals for each failure type
const defaultRedialIntervals: RedialInterval[] = [
  { failureType: 'voicemail', intervalMinutes: 60, maxAttempts: 3 },
  { failureType: 'no-answer', intervalMinutes: 30, maxAttempts: 3 },
  { failureType: 'busy', intervalMinutes: 15, maxAttempts: 3 },
  { failureType: 'failure', intervalMinutes: 120, maxAttempts: 2 },
  { failureType: 'error', intervalMinutes: 240, maxAttempts: 1 },
  { failureType: 'invalid-number', intervalMinutes: 0, maxAttempts: 0 }
];

// Mock data for initial rules
const mockDialingRules: DialingRule[] = [
  {
    id: '1',
    name: 'Padrão Horário Comercial',
    enabled: true,
    simultaneousChannels: 5,
    startDate: new Date(),
    startTime: '08:00',
    endDate: null,
    endTime: '18:00',
    maxAttemptsPerLead: 5,
    timeBetweenCalls: 10, // 10 seconds
    createdAt: new Date(),
    updatedAt: new Date(),
    redialIntervals: [...defaultRedialIntervals]
  }
];

export const useDialingRules = () => {
  const { toast } = useToast();
  const [rules, setRules] = useState<DialingRule[]>(() => {
    // Try to load from localStorage
    const savedRules = localStorage.getItem('dialing_rules');
    if (savedRules) {
      try {
        // Parse dates properly from JSON
        const parsedRules = JSON.parse(savedRules);
        return parsedRules.map((rule: any) => ({
          ...rule,
          startDate: new Date(rule.startDate),
          endDate: rule.endDate ? new Date(rule.endDate) : null,
          createdAt: new Date(rule.createdAt),
          updatedAt: new Date(rule.updatedAt)
        }));
      } catch (e) {
        console.error('Error loading dialing rules:', e);
        return mockDialingRules;
      }
    }
    return mockDialingRules;
  });

  const [loading, setLoading] = useState(false);

  // Save rules to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('dialing_rules', JSON.stringify(rules));
    } catch (e) {
      console.error('Error saving dialing rules to localStorage:', e);
    }
  }, [rules]);

  const addRule = (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          const newRule: DialingRule = {
            ...rule,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          setRules(prevRules => [...prevRules, newRule]);
          
          toast({
            title: 'Regra criada com sucesso',
            description: `A regra "${rule.name}" foi criada com sucesso.`
          });
          
          setLoading(false);
          resolve(true);
        } catch (error) {
          console.error('Error adding rule:', error);
          
          toast({
            title: 'Erro ao criar regra',
            description: 'Ocorreu um erro ao criar a regra. Tente novamente.',
            variant: 'destructive'
          });
          
          setLoading(false);
          resolve(false);
        }
      }, 100); // Pequeno delay para evitar congelamento da UI
    });
  };

  const updateRule = (id: string, updatedRule: Partial<Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
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
          
          toast({
            title: 'Regra atualizada com sucesso',
            description: `A regra foi atualizada com sucesso.`
          });
          
          setLoading(false);
          resolve(true);
        } catch (error) {
          console.error('Error updating rule:', error);
          
          toast({
            title: 'Erro ao atualizar regra',
            description: 'Ocorreu um erro ao atualizar a regra. Tente novamente.',
            variant: 'destructive'
          });
          
          setLoading(false);
          resolve(false);
        }
      }, 100); // Pequeno delay para evitar congelamento da UI
    });
  };

  const deleteRule = (id: string) => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          setRules(prevRules => prevRules.filter(rule => rule.id !== id));
          
          toast({
            title: 'Regra excluída com sucesso',
            description: `A regra foi excluída com sucesso.`
          });
          
          setLoading(false);
          resolve(true);
        } catch (error) {
          console.error('Error deleting rule:', error);
          
          toast({
            title: 'Erro ao excluir regra',
            description: 'Ocorreu um erro ao excluir a regra. Tente novamente.',
            variant: 'destructive'
          });
          
          setLoading(false);
          resolve(false);
        }
      }, 100); // Pequeno delay para evitar congelamento da UI
    });
  };

  const toggleRuleStatus = (id: string) => {
    setLoading(true);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          setRules(prevRules => 
            prevRules.map(rule => 
              rule.id === id 
                ? { ...rule, enabled: !rule.enabled, updatedAt: new Date() } 
                : rule
            )
          );
          
          const rule = rules.find(r => r.id === id);
          const statusText = rule?.enabled ? 'desativada' : 'ativada';
          
          toast({
            title: `Regra ${statusText}`,
            description: `A regra foi ${statusText} com sucesso.`
          });
          
          setLoading(false);
          resolve(true);
        } catch (error) {
          console.error('Error toggling rule status:', error);
          
          toast({
            title: 'Erro ao alterar status da regra',
            description: 'Ocorreu um erro ao alterar o status da regra. Tente novamente.',
            variant: 'destructive'
          });
          
          setLoading(false);
          resolve(false);
        }
      }, 100); // Pequeno delay para evitar congelamento da UI
    });
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
