
import { useState } from 'react';
import { PriorizationRule } from '@/types/recruitment/tasks';

export const useRuleEditor = () => {
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<{
    name: string;
    weight: number;
    isActive: boolean;
    factors: {
      factor: string;
      weight: number;
    }[];
    appliesTo?: {
      stageId?: string;
      stageName?: string;
    };
  }>({
    name: '',
    weight: 5,
    isActive: true,
    factors: []
  });

  const handleEditClick = (rule: PriorizationRule) => {
    setEditingRuleId(rule.id);
    setEditFormData({
      name: rule.name,
      weight: rule.weight,
      isActive: rule.isActive,
      factors: Array.isArray(rule.factors) ? [...rule.factors] : [],
      appliesTo: rule.appliesTo || {}
    });
  };

  const handleEditCancel = () => {
    setEditingRuleId(null);
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditFormData({
      ...editFormData,
      [field]: value
    });
  };

  const handleAddFactor = () => {
    setEditFormData({
      ...editFormData,
      factors: [...(Array.isArray(editFormData.factors) ? editFormData.factors : []), { factor: 'etapa_funil', weight: 3 }]
    });
  };

  const handleDeleteFactor = (index: number) => {
    if (!Array.isArray(editFormData.factors)) {
      return;
    }
    
    const updatedFactors = [...editFormData.factors];
    updatedFactors.splice(index, 1);
    
    setEditFormData({
      ...editFormData,
      factors: updatedFactors
    });
  };

  const handleFactorChange = (index: number, field: string, value: any) => {
    if (!Array.isArray(editFormData.factors)) {
      return;
    }
    
    const updatedFactors = [...editFormData.factors];
    if (updatedFactors[index]) {
      updatedFactors[index] = {
        ...updatedFactors[index],
        [field]: value
      };
      
      setEditFormData({
        ...editFormData,
        factors: updatedFactors
      });
    }
  };

  return {
    editingRuleId,
    editFormData,
    handleEditClick,
    handleEditCancel,
    handleEditFormChange,
    handleAddFactor,
    handleDeleteFactor,
    handleFactorChange,
    setEditFormData,
    setEditingRuleId
  };
};
