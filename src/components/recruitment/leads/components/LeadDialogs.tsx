
import React from 'react';
import LeadCreateDialog from '../LeadCreateDialog';
import EditLeadDialog from '../dialogs/EditLeadDialog';
import ChangeStageDialog from '../dialogs/ChangeStageDialog';
import LeadHistoryDialog from '../dialogs/LeadHistoryDialog';
import DeleteLeadDialog from '../dialogs/DeleteLeadDialog';
import ViewLeadDialog from '../dialogs/ViewLeadDialog';

interface LeadDialogsProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLead: any;
  editDialogOpen: boolean;
  setEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stageDialogOpen: boolean;
  setStageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  historyDialogOpen: boolean;
  setHistoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  viewDialogOpen: boolean;
  setViewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveLead: (updatedLead: any) => void;
  onSaveStage: (leadId: number, newStage: string, notes?: string) => void;
  onConfirmDelete: (leadId: number) => void;
  onLeadCreated?: (lead: any) => void;
}

const LeadDialogs: React.FC<LeadDialogsProps> = ({
  openDialog,
  setOpenDialog,
  selectedLead,
  editDialogOpen,
  setEditDialogOpen,
  stageDialogOpen,
  setStageDialogOpen,
  historyDialogOpen,
  setHistoryDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  viewDialogOpen,
  setViewDialogOpen,
  onSaveLead,
  onSaveStage,
  onConfirmDelete,
  onLeadCreated
}) => {
  return (
    <>
      {/* Create Lead Dialog */}
      <LeadCreateDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        onLeadCreated={onLeadCreated}
      />
      
      {/* View Lead Dialog */}
      <ViewLeadDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        lead={selectedLead}
      />
      
      {/* Edit Lead Dialog */}
      <EditLeadDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        lead={selectedLead}
        onSave={onSaveLead}
      />
      
      {/* Change Stage Dialog */}
      <ChangeStageDialog 
        open={stageDialogOpen}
        onOpenChange={setStageDialogOpen}
        lead={selectedLead}
        onSave={onSaveStage}
      />
      
      {/* Lead History Dialog */}
      <LeadHistoryDialog 
        open={historyDialogOpen}
        onOpenChange={setHistoryDialogOpen}
        lead={selectedLead}
      />
      
      {/* Delete Lead Dialog */}
      <DeleteLeadDialog 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        lead={selectedLead}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  );
};

export default LeadDialogs;
