
import { useState } from 'react';
import { useDialingRules } from '@/hooks/useDialingRules';
import { DialingRule } from '@/types/voicecall';
import { useToast } from '@/hooks/use-toast';

export const useDialingRulesManagement = () => {
  const { rules, loading, addRule, updateRule, deleteRule, toggleRuleStatus, defaultRedialIntervals } = useDialingRules();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<DialingRule | null>(null);
  const [processingAction, setProcessingAction] = useState(false);
  const { toast } = useToast();

  // Combine global loading and local processing state
  const isLoading = loading || processingAction;

  const handleAddRule = async (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setProcessingAction(true);
      const success = await addRule(rule);
      
      if (success) {
        setIsAddDialogOpen(false);
      }
    } catch (error) {
      console.error('Error adding rule:', error);
      toast({
        title: 'Erro ao criar regra',
        description: 'Ocorreu um erro ao criar a regra. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const handleEditRule = async (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedRule) return;
    
    try {
      setProcessingAction(true);
      const success = await updateRule(selectedRule.id, rule);
      
      if (success) {
        setIsEditDialogOpen(false);
        setSelectedRule(null);
      }
    } catch (error) {
      console.error('Error updating rule:', error);
      toast({
        title: 'Erro ao atualizar regra',
        description: 'Ocorreu um erro ao atualizar a regra. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const handleDeleteRule = async () => {
    if (!selectedRule) return;
    
    try {
      setProcessingAction(true);
      const success = await deleteRule(selectedRule.id);
      
      if (success) {
        setIsDeleteDialogOpen(false);
        setSelectedRule(null);
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast({
        title: 'Erro ao excluir regra',
        description: 'Ocorreu um erro ao excluir a regra. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const handleToggleStatus = async (rule: DialingRule) => {
    try {
      setProcessingAction(true);
      await toggleRuleStatus(rule.id);
    } catch (error) {
      console.error('Error toggling rule status:', error);
      toast({
        title: 'Erro ao alterar status da regra',
        description: 'Ocorreu um erro ao alterar o status da regra. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setProcessingAction(false);
    }
  };

  const openEditDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsDeleteDialogOpen(true);
  };

  const closeAddDialog = () => {
    if (!processingAction) {
      setIsAddDialogOpen(false);
    }
  };

  const closeEditDialog = () => {
    if (!processingAction) {
      setIsEditDialogOpen(false);
      setSelectedRule(null);
    }
  };

  const closeDeleteDialog = () => {
    if (!processingAction) {
      setIsDeleteDialogOpen(false);
      setSelectedRule(null);
    }
  };

  return {
    rules,
    isLoading,
    selectedRule,
    defaultRedialIntervals,
    processingAction,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    setIsAddDialogOpen,
    handleAddRule,
    handleEditRule,
    handleDeleteRule,
    handleToggleStatus,
    openEditDialog,
    openDeleteDialog,
    closeAddDialog,
    closeEditDialog,
    closeDeleteDialog
  };
};
