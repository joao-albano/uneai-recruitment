
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Schedule } from '@/types/schedule';

export const useDialogState = (visibleSchedules: Schedule[]) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  const location = useLocation();

  // Get pre-selected student ID from location state
  const preSelectedStudentId = location.state?.studentId || '';

  // Compute final pre-selected student ID
  const finalPreSelectedStudentId = () => {
    const scheduleId = preSelectedStudentId;
    const canSelectStudent = !visibleSchedules.some(
      schedule => 
        schedule.studentId === scheduleId && 
        schedule.status === 'scheduled'
    );
    
    return canSelectStudent ? scheduleId : '';
  };

  // Start edit schedule process
  const startEditSchedule = (schedule: Schedule) => {
    setScheduleToEdit(schedule);
    setShowEditDialog(true);
  };
  
  // Close edit dialog with delay to prevent UI flickering
  const closeEditDialog = () => {
    setShowEditDialog(false);
    setTimeout(() => {
      setScheduleToEdit(null);
    }, 100);
  };

  // Handle location state changes
  useEffect(() => {
    if (!location.state) return;
    
    const locationState = location.state as { studentId?: string; scheduleId?: string } | null;
    
    if (locationState?.scheduleId) {
      const schedule = visibleSchedules.find(s => s.id === locationState.scheduleId);
      if (schedule) {
        setSelectedSchedule(schedule);
        setShowScheduleDetails(true);
      }
    } else if (locationState?.studentId) {
      setShowAddDialog(true);
    }
  }, [location.state, visibleSchedules]);
  
  // Update selected schedule when schedules change
  useEffect(() => {
    if (selectedSchedule) {
      const updatedSchedule = visibleSchedules.find(s => s.id === selectedSchedule.id);
      if (updatedSchedule) {
        setSelectedSchedule(updatedSchedule);
      }
    }
  }, [visibleSchedules, selectedSchedule]);

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog: closeEditDialog,
    scheduleToEdit,
    startEditSchedule,
    showScheduleDetails,
    setShowScheduleDetails,
    selectedSchedule,
    preSelectedStudentId,
    finalPreSelectedStudentId: finalPreSelectedStudentId()
  };
};
