
import { useState, useCallback } from 'react';
import { Schedule } from '@/types/schedule';

export const useDialogState = (schedules: Schedule[]) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDayDialog, setShowDayDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [finalPreSelectedStudentId, setFinalPreSelectedStudentId] = useState<string | null>(null);

  // View schedule details
  const handleOpenDetails = useCallback((schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailsDialog(true);
  }, []);

  // Get schedules for the selected day
  const getSchedulesForDay = useCallback((date: Date) => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === date.getDate() &&
             scheduleDate.getMonth() === date.getMonth() &&
             scheduleDate.getFullYear() === date.getFullYear();
    });
  }, [schedules]);

  // Handle day click in the calendar
  const handleDayClick = useCallback((day: number) => {
    const selectedDate = new Date();
    selectedDate.setDate(day);
    setShowDayDialog(true);
  }, []);

  // Clean close of the add dialog
  const handleSetShowAddDialog = useCallback((show: boolean = false) => {
    setShowAddDialog(show);
  }, []);

  // Clean close of the details dialog
  const handleSetShowScheduleDetails = useCallback((show: boolean = false) => {
    setShowDetailsDialog(show);
    
    if (!show) {
      setTimeout(() => setSelectedSchedule(null), 300);
    }
  }, []);

  return {
    showAddDialog,
    setShowAddDialog: handleSetShowAddDialog,
    showDayDialog,
    setShowDayDialog,
    showDetailsDialog,
    setShowDetailsDialog: handleSetShowScheduleDetails,
    selectedSchedule,
    handleOpenDetails,
    schedulesForSelectedDay: selectedSchedule ? [selectedSchedule] : [],
    finalPreSelectedStudentId,
    setFinalPreSelectedStudentId
  };
};
