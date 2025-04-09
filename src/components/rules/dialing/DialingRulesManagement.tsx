
import React, { useState } from 'react';
import { useDialingRules } from '@/hooks/useDialingRules';
import { DialingRule } from '@/types/voicecall';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import DialingRuleForm from './DialingRuleForm';
import DeleteRuleDialog from './DeleteRuleDialog';
import RulesList from './RulesList';
import EmptyRulesState from './EmptyRulesState';
import RulesHeader from './RulesHeader';
import RulesInfo from './RulesInfo';

const DialingRulesManagement: React.FC = () => {
  const { rules, loading, addRule, updateRule, deleteRule, toggleRuleStatus, defaultRedialIntervals } = useDialingRules();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<DialingRule | null>(null);
  const [processingAction, setProcessingAction] = useState(false);
  const isMobile = useIsMobile();

  const handleAddRule = async (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    setProcessingAction(true);
    const success = await addRule(rule);
    setProcessingAction(false);
    
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditRule = async (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedRule) {
      setProcessingAction(true);
      const success = await updateRule(selectedRule.id, rule);
      setProcessingAction(false);
      
      if (success) {
        setIsEditDialogOpen(false);
        setSelectedRule(null);
      }
    }
  };

  const handleDeleteRule = async () => {
    if (selectedRule) {
      setProcessingAction(true);
      const success = await deleteRule(selectedRule.id);
      setProcessingAction(false);
      
      if (success) {
        setIsDeleteDialogOpen(false);
        setSelectedRule(null);
      }
    }
  };

  const handleToggleStatus = async (rule: DialingRule) => {
    setProcessingAction(true);
    await toggleRuleStatus(rule.id);
    setProcessingAction(false);
  };

  const openEditDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <RulesHeader onAddRule={() => setIsAddDialogOpen(true)} />

      {rules.length === 0 ? (
        <EmptyRulesState onAddRule={() => setIsAddDialogOpen(true)} />
      ) : (
        <Card>
          <RulesList
            rules={rules}
            isMobile={isMobile}
            onEditRule={openEditDialog}
            onDeleteRule={openDeleteDialog}
            onToggleStatus={handleToggleStatus}
            isLoading={processingAction || loading}
          />
        </Card>
      )}

      <RulesInfo />

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => !processingAction && setIsAddDialogOpen(open)}>
        <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
          <DialogHeader>
            <DialogTitle>Nova Regra de Discagem</DialogTitle>
            <DialogDescription>
              Configure os parâmetros da nova regra de discagem automática.
            </DialogDescription>
          </DialogHeader>
          <DialingRuleForm 
            onSubmit={handleAddRule} 
            onCancel={() => !processingAction && setIsAddDialogOpen(false)}
            defaultRedialIntervals={defaultRedialIntervals}
            isSubmitting={processingAction}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => !processingAction && setIsEditDialogOpen(open)}>
        <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
          <DialogHeader>
            <DialogTitle>Editar Regra de Discagem</DialogTitle>
            <DialogDescription>
              Atualize os parâmetros da regra de discagem.
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <DialingRuleForm 
              initialData={selectedRule}
              onSubmit={handleEditRule} 
              onCancel={() => !processingAction && setIsEditDialogOpen(false)}
              defaultRedialIntervals={defaultRedialIntervals}
              isSubmitting={processingAction}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteRuleDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => !processingAction && setIsDeleteDialogOpen(open)}
        onConfirm={handleDeleteRule}
        ruleName={selectedRule?.name || ''}
        isDeleting={processingAction}
      />
    </div>
  );
};

export default DialingRulesManagement;
