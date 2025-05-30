
import { useState } from 'react';
import { TasksDistributionConfig } from '@/types/recruitment/tasks';
import { useToast } from '@/components/ui/use-toast';
import { FunnelStage } from '@/types/recruitment';

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
  linkedPriorizationRules?: string[];
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
  appliesTo?: {
    stageId?: string;
    stageName?: string;
  };
  linkedFromGenerationRules?: string[];
}

// Dados de exemplo para etapas do funil
const mockFunnelStages: { id: string; name: string }[] = [
  { id: 'stage1', name: 'Contato Inicial' },
  { id: 'stage2', name: 'Agendamento' },
  { id: 'stage3', name: 'Visita' },
  { id: 'stage4', name: 'Matrícula' }
];

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
    name: 'Etapas Avançadas',
    weight: 8,
    factors: [
      { factor: 'etapa_funil', weight: 5 },
      { factor: 'tempo_etapa', weight: 3 },
    ],
    isActive: true,
    appliesTo: {
      stageId: 'stage3',
      stageName: 'Visita'
    }
  },
  {
    id: '2',
    name: 'Proximidade ao Prazo',
    weight: 7,
    factors: [
      { factor: 'prazo_matricula', weight: 5 },
      { factor: 'sla', weight: 4 }
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
    updatedAt: new Date(),
    linkedPriorizationRules: ['1']
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
    updatedAt: new Date(),
    linkedPriorizationRules: ['2']
  }
];

export const useTasksRules = () => {
  const { toast } = useToast();
  const [distributionRules, setDistributionRules] = useState<TasksDistributionConfig>(initialDistributionRules);
  const [priorizationRules, setPriorizationRules] = useState<PriorizationRule[]>(initialPriorizationRules);
  const [generationRules, setGenerationRules] = useState<GenerationRule[]>(initialGenerationRules);
  const [funnelStages] = useState(mockFunnelStages);

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

  // Update generation rules
  const updateGenerationRules = (newRules: GenerationRule[]) => {
    setGenerationRules(newRules);
    
    // Atualizar as relações com as regras de priorização
    const updatedPriorizationRules = priorizationRules.map(prRule => {
      const linkedFromRules = newRules.filter(genRule => 
        genRule.linkedPriorizationRules?.includes(prRule.id)
      ).map(genRule => genRule.id);
      
      return {
        ...prRule,
        linkedFromGenerationRules: linkedFromRules
      };
    });
    
    setPriorizationRules(updatedPriorizationRules);
    
    toast({
      title: "Regras de geração atualizadas",
      description: "As regras de geração de tarefas foram atualizadas com sucesso.",
    });
  };

  return {
    distributionRules,
    priorizationRules,
    generationRules,
    funnelStages,
    updateDistributionRules,
    updatePriorizationRules,
    updateGenerationRules
  };
};
