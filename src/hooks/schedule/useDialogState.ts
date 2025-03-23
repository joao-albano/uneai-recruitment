
import { useState, useCallback } from 'react';
import { Schedule } from '@/types/schedule';

export const useDialogState = (schedules: Schedule[]) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [finalPreSelectedStudentId, setFinalPreSelectedStudentId] = useState<string | null>(null);

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
    showScheduleDetails,
    setShowScheduleDetails: handleSetShowScheduleDetails,
    selectedSchedule,
    viewScheduleDetails,
    finalPreSelectedStudentId,
    setFinalPreSelectedStudentId
  };
};
