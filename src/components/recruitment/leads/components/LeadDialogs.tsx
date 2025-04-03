
import React from 'react';
import LeadCreateDialog from '../LeadCreateDialog';
import EditLeadDialog from '../dialogs/EditLeadDialog';
import ChangeStageDialog from '../dialogs/ChangeStageDialog';
import DeleteLeadDialog from '../dialogs/DeleteLeadDialog';
import LeadHistoryDialog from '../dialogs/LeadHistoryDialog';

interface LeadDialogsProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  selectedLead: any;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  stageDialogOpen: boolean;
  setStageDialogOpen: (open: boolean) => void;
  historyDialogOpen: boolean;
  setHistoryDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  onSaveLead: (lead: any) => void;
  onSaveStage: (leadId: number, newStage: string, notes: string) => void;
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
  onSaveLead,
  onSaveStage,
  onConfirmDelete,
  onLeadCreated
}) => {
  return (
    <>
      <LeadCreateDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        onLeadCreated={onLeadCreated}
      />
      
      {selectedLead && (
        <>
          <EditLeadDialog 
            open={editDialogOpen} 
            onOpenChange={setEditDialogOpen} 
            lead={selectedLead}
            onSave={onSaveLead}
          />
          
          <ChangeStageDialog 
            open={stageDialogOpen} 
            onOpenChange={setStageDialogOpen} 
            lead={selectedLead}
            onSave={onSaveStage}
          />
          
          <DeleteLeadDialog 
            open={deleteDialogOpen} 
            onOpenChange={setDeleteDialogOpen} 
            lead={selectedLead}
            onConfirm={onConfirmDelete}
          />
          
          <LeadHistoryDialog 
            open={historyDialogOpen} 
            onOpenChange={setHistoryDialogOpen} 
            lead={selectedLead}
          />
        </>
      )}
    </>
  );
};

export default LeadDialogs;
