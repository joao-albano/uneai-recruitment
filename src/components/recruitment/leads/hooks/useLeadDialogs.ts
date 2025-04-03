
import { useState, useCallback } from 'react';

export const useLeadDialogs = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [stageDialogOpen, setStageDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Reset lead and close all dialogs
  const resetDialogs = useCallback(() => {
    setSelectedLead(null);
    setEditDialogOpen(false);
    setStageDialogOpen(false);
    setHistoryDialogOpen(false);
    setDeleteDialogOpen(false);
    setViewDialogOpen(false);
  }, []);

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
    viewDialogOpen,
    setViewDialogOpen,
    resetDialogs
  };
};
