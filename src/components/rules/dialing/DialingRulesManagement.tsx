
import React from 'react';
import { useDialingRulesManagement } from './hooks/useDialingRulesManagement';
import RulesHeader from './RulesHeader';
import RulesContent from './components/RulesContent';
import RulesInfo from './RulesInfo';
import AddRuleDialog from './dialogs/AddRuleDialog';
import EditRuleDialog from './dialogs/EditRuleDialog';
import DeleteRuleDialog from './DeleteRuleDialog';

const DialingRulesManagement: React.FC = () => {
  const {
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
  } = useDialingRulesManagement();

  return (
    <div className="space-y-6">
      <RulesHeader onAddRule={() => setIsAddDialogOpen(true)} />

      <RulesContent
        rules={rules}
        isLoading={isLoading}
        onEditRule={openEditDialog}
        onDeleteRule={openDeleteDialog}
        onToggleStatus={handleToggleStatus}
        onAddRule={() => setIsAddDialogOpen(true)}
      />

      <RulesInfo />

      {/* Add Dialog */}
      <AddRuleDialog
        open={isAddDialogOpen}
        onClose={closeAddDialog}
        onSubmit={handleAddRule}
        defaultRedialIntervals={defaultRedialIntervals}
        isSubmitting={processingAction}
      />

      {/* Edit Dialog */}
      <EditRuleDialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        onSubmit={handleEditRule}
        rule={selectedRule}
        defaultRedialIntervals={defaultRedialIntervals}
        isSubmitting={processingAction}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteRuleDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleDeleteRule}
        ruleName={selectedRule?.name || ''}
        isDeleting={processingAction}
      />
    </div>
  );
};

export default DialingRulesManagement;
