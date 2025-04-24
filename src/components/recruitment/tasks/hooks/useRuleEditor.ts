
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
      // Ensure factors is an array even if it's undefined or null
      factors: Array.isArray(rule.factors) ? [...rule.factors] : [],
      appliesTo: rule.appliesTo || {}
    });
  };

  const handleEditCancel = () => {
    setEditingRuleId(null);
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFactor = () => {
    setEditFormData(prev => ({
      ...prev,
      factors: [...(Array.isArray(prev.factors) ? prev.factors : []), { factor: 'etapa_funil', weight: 3 }]
    }));
  };

  const handleDeleteFactor = (index: number) => {
    if (!Array.isArray(editFormData.factors)) {
      setEditFormData(prev => ({
        ...prev,
        factors: []
      }));
      return;
    }
    
    const updatedFactors = [...editFormData.factors];
    updatedFactors.splice(index, 1);
    
    setEditFormData(prev => ({
      ...prev,
      factors: updatedFactors
    }));
  };

  const handleFactorChange = (index: number, field: string, value: any) => {
    if (!Array.isArray(editFormData.factors)) {
      return;
    }
    
    const updatedFactors = [...editFormData.factors];
    
    // Ensure the factor exists at this index
    if (!updatedFactors[index]) {
      updatedFactors[index] = { factor: '', weight: 3 };
    }
    
    updatedFactors[index] = {
      ...updatedFactors[index],
      [field]: value
    };
      
    setEditFormData(prev => ({
      ...prev,
      factors: updatedFactors
    }));
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
