
import { useState, useCallback } from 'react';
import { Schedule } from '@/types/schedule';

export const useDialogState = (schedules: Schedule[]) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [finalPreSelectedStudentId, setFinalPreSelectedStudentId] = useState<string | null>(null);

  // Start editing a schedule
  const startEditSchedule = useCallback((schedule: Schedule) => {
    setScheduleToEdit(schedule);
    setShowEditDialog(true);
  }, []);

  // Function to explicitly control edit dialog
  const handleSetShowEditDialog = useCallback((show: boolean = false) => {
    // First set the dialog visibility
    setShowEditDialog(show);
    
    // Only clear the schedule reference when closing
    if (!show) {
      // Use a longer timeout to ensure proper cleanup
      setTimeout(() => setScheduleToEdit(null), 500);
    }
  }, []);

  // View schedule details
  const viewScheduleDetails = useCallback((schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowScheduleDetails(true);
  }, []);

  // Clean close of the add dialog
  const handleSetShowAddDialog = useCallback((show: boolean = false) => {
    setShowAddDialog(show);
  }, []);

  // Clean close of the details dialog
  const handleSetShowScheduleDetails = useCallback((show: boolean = false) => {
    setShowScheduleDetails(show);
    
    if (!show) {
      setTimeout(() => setSelectedSchedule(null), 300);
    }
  }, []);

  return {
    showAddDialog,
    setShowAddDialog: handleSetShowAddDialog,
    showEditDialog,
    setShowEditDialog: handleSetShowEditDialog,
    scheduleToEdit,
    startEditSchedule,
    showScheduleDetails,
    setShowScheduleDetails: handleSetShowScheduleDetails,
    selectedSchedule,
    viewScheduleDetails,
    finalPreSelectedStudentId,
    setFinalPreSelectedStudentId
  };
};
