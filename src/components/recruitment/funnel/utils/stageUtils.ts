
import { FunnelStage } from '@/types/recruitment';

export const createEmptyStage = (): Partial<FunnelStage> => {
  return {
    name: '',
    color: 'bg-blue-500',
    actions: [''],
    order: 0,
  };
};

export const prepareStageForSubmit = (stageData: Partial<FunnelStage>): FunnelStage => {
  // Filtrar ações vazias
  const filteredActions = (stageData.actions || []).filter(a => a.trim() !== '');
  
  // Preparar objeto para salvar
  return {
    id: stageData.id || `${Date.now()}`,
    name: stageData.name || '',
    color: stageData.color || 'bg-blue-500',
    icon: stageData.icon || null,
    actions: filteredActions,
    order: stageData.order || 0,
    isActive: true,
    leadCount: 0,
    expectedDuration: 1,
  };
};
