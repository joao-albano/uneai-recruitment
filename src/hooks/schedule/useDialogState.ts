
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
    setShowEditDialog(show);
    if (!show) {
      // Clear the schedule being edited when dialog is closed
      setTimeout(() => setScheduleToEdit(null), 100);
    }
  }, []);

  // View schedule details
  const viewScheduleDetails = useCallback((schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowScheduleDetails(true);
  }, []);

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog: handleSetShowEditDialog,
    scheduleToEdit,
    startEditSchedule,
    showScheduleDetails,
    setShowScheduleDetails,
    selectedSchedule,
    viewScheduleDetails,
    finalPreSelectedStudentId,
    setFinalPreSelectedStudentId
  };
};
