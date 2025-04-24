
import { useState } from 'react';
import { TasksDistributionConfig } from '@/types/recruitment/tasks';
import { useToast } from '@/components/ui/use-toast';

// Types for rules
interface GenerationRule {
  id: string;
  name: string;
  conditions: {
    field: string;
    operator: string;
    value: string | number | boolean | string[];
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PriorizationRule {
  id: string;
  name: string;
  weight: number;
  factors: {
    factor: string;
    weight: number;
  }[];
  isActive: boolean;
}

// Mock initial data
const initialDistributionRules: TasksDistributionConfig = {
  isAutomatic: true,
  maxTasksPerAgent: 20,
  prioritizeCriteria: 'priority',
  considerExpertise: true,
  balanceLoad: true
};

const initialPriorizationRules: PriorizationRule[] = [
  {
    id: '1',
    name: 'Lead Quente',
    weight: 10,
    factors: [
      { factor: 'interesse', weight: 5 },
      { factor: 'interacoes_recentes', weight: 3 },
      { factor: 'campanha_paga', weight: 2 }
    ],
    isActive: true
  },
  {
    id: '2',
    name: 'Data limite próxima',
    weight: 8,
    factors: [
      { factor: 'data_limite', weight: 5 },
      { factor: 'dias_restantes', weight: 3 }
    ],
    isActive: true
  }
];

const initialGenerationRules: GenerationRule[] = [
  {
    id: '1',
    name: 'Leads sem contato em 3 dias',
    conditions: [
      { field: 'dias_sem_contato', operator: '>', value: 3 },
      { field: 'status', operator: '!=', value: 'matriculado' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Leads de Medicina',
    conditions: [
      { field: 'curso', operator: '=', value: 'Medicina' },
      { field: 'status', operator: '=', value: 'novo' }
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useTasksRules = () => {
  const { toast } = useToast();
  const [distributionRules, setDistributionRules] = useState<TasksDistributionConfig>(initialDistributionRules);
  const [priorizationRules, setPriorizationRules] = useState<PriorizationRule[]>(initialPriorizationRules);
  const [generationRules, setGenerationRules] = useState<GenerationRule[]>(initialGenerationRules);

  // Update distribution rules
  const updateDistributionRules = (newRules: Partial<TasksDistributionConfig>) => {
    setDistributionRules(prev => ({ ...prev, ...newRules }));
    toast({
      title: "Regras de distribuição atualizadas",
      description: "As regras de distribuição de tarefas foram atualizadas com sucesso.",
    });
  };

  // Update priorization rules
  const updatePriorizationRules = (newRules: PriorizationRule[]) => {
    setPriorizationRules(newRules);
    toast({
      title: "Regras de priorização atualizadas",
      description: "As regras de priorização de tarefas foram atualizadas com sucesso.",
    });
  };

  // Add new priorization rule
  const addPriorizationRule = (newRule: Omit<PriorizationRule, 'id'>) => {
    const rule = { ...newRule, id: `p-${Date.now()}` };
    setPriorizationRules(prev => [...prev, rule]);
    toast({
      title: "Regra de priorização adicionada",
      description: "A nova regra de priorização foi adicionada com sucesso.",
    });
  };

  // Delete priorization rule
  const deletePriorizationRule = (id: string) => {
    setPriorizationRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: "Regra de priorização removida",
      description: "A regra de priorização foi removida com sucesso.",
    });
  };

  // Update generation rules
  const updateGenerationRules = (newRules: GenerationRule[]) => {
    setGenerationRules(newRules);
    toast({
      title: "Regras de geração atualizadas",
      description: "As regras de geração de tarefas foram atualizadas com sucesso.",
    });
  };

  // Add new generation rule
  const addGenerationRule = (newRule: Omit<GenerationRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    const rule = { 
      ...newRule, 
      id: `g-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setGenerationRules(prev => [...prev, rule]);
    toast({
      title: "Regra de geração adicionada",
      description: "A nova regra de geração foi adicionada com sucesso.",
    });
  };

  // Delete generation rule
  const deleteGenerationRule = (id: string) => {
    setGenerationRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: "Regra de geração removida",
      description: "A regra de geração foi removida com sucesso.",
    });
  };

  // Toggle rule status
  const toggleRuleStatus = (id: string, type: 'generation' | 'priorization') => {
    if (type === 'generation') {
      setGenerationRules(prev => prev.map(rule => 
        rule.id === id ? { ...rule, isActive: !rule.isActive, updatedAt: new Date() } : rule
      ));
    } else {
      setPriorizationRules(prev => prev.map(rule => 
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      ));
    }
    
    toast({
      title: "Status da regra alterado",
      description: `A regra foi ${type === 'generation' ? 'geração' : 'priorização'} foi atualizada com sucesso.`,
    });
  };

  return {
    distributionRules,
    priorizationRules,
    generationRules,
    updateDistributionRules,
    updatePriorizationRules,
    addPriorizationRule,
    deletePriorizationRule,
    updateGenerationRules,
    addGenerationRule,
    deleteGenerationRule,
    toggleRuleStatus
  };
};
