
import { Funnel, FunnelStage } from '@/types/recruitment';
import { defaultEmptyStage } from './funnelMockData';

// Função para criar um novo funil
export const createNewFunnel = (
  funnelData: { name: string; description: string }
): Funnel => {
  return {
    id: String(Date.now()),
    name: funnelData.name,
    description: funnelData.description,
    isActive: true,
    // Add a default empty stage to prevent errors in components expecting stages
    stages: [{ ...defaultEmptyStage, id: `${Date.now()}-initial` }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Função para atualizar os estágios de um funil
export const updateFunnelStagesInList = (
  funnels: Funnel[],
  funnelId: string,
  stages: FunnelStage[]
): Funnel[] => {
  return funnels.map(funnel =>
    funnel.id === funnelId
      ? {
          ...funnel,
          stages,
          updatedAt: new Date().toISOString()
        }
      : funnel
  );
};

// Função para atualizar o estado ativo de um funil
export const toggleFunnelActiveState = (
  funnels: Funnel[],
  funnelId: string,
  isActive: boolean
): Funnel[] => {
  return funnels.map(funnel =>
    funnel.id === funnelId
      ? {
          ...funnel,
          isActive,
          updatedAt: new Date().toISOString()
        }
      : funnel
  );
};

// Função para atualizar um funil selecionado
export const updateSelectedFunnel = (
  selectedFunnel: Funnel | null,
  funnelId: string,
  updateData: Partial<Funnel>
): Funnel | null => {
  if (!selectedFunnel || selectedFunnel.id !== funnelId) {
    return selectedFunnel;
  }
  
  return {
    ...selectedFunnel,
    ...updateData,
    updatedAt: new Date().toISOString()
  };
};
