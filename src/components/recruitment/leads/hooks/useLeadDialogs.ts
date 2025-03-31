
import { useState } from 'react';

export const useLeadDialogs = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return {
    openDialog,
    setOpenDialog,
    selectedLead,
    setSelectedLead,
    editDialogOpen,
    setEditDialogOpen,
    stageDialogOpen,
    setStageDialogOpen,
    historyDialogOpen,
    setHistoryDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
  };
};
