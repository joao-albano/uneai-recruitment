
import { useState, useEffect, useCallback } from 'react';
import { Schedule } from '@/types/schedule';

interface DialogState {
  scheduleDialogOpen: boolean;
  detailsDialogOpen: boolean;
  daySchedulesDialogOpen: boolean;
  remindersHistoryDialogOpen: boolean;
  selectedSchedule: Schedule | null;
  selectedDay: Date | null;
  preselectedStudentId?: string;
  editMode: boolean;
}

interface UseScheduleDialogsProps {
  externalShowAddDialog?: boolean;
  externalSetShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
}

export const useScheduleDialogs = ({
  externalShowAddDialog,
  externalSetShowAddDialog,
  leadId
}: UseScheduleDialogsProps) => {
  
  const [dialogState, setDialogState] = useState<DialogState>({
    scheduleDialogOpen: false,
    detailsDialogOpen: false,
    daySchedulesDialogOpen: false,
    remindersHistoryDialogOpen: false,
    selectedSchedule: null,
    selectedDay: null,
    preselectedStudentId: leadId ? `lead-${leadId}` : undefined,
    editMode: false
  });
  
  // Handle external add dialog state
  useEffect(() => {
    if (externalShowAddDialog !== undefined) {
      console.log("External dialog state changed to:", externalShowAddDialog);
      setDialogState(prev => ({
        ...prev,
        scheduleDialogOpen: externalShowAddDialog
      }));
    }
  }, [externalShowAddDialog]);
  
  // Update external add dialog state when internal dialog closes
  useEffect(() => {
    if (dialogState.scheduleDialogOpen === false && 
        externalSetShowAddDialog && 
        externalShowAddDialog === true) {
      console.log("Dialog closed, updating external state");
      externalSetShowAddDialog(false);
    }
  }, [dialogState.scheduleDialogOpen, externalSetShowAddDialog, externalShowAddDialog]);
  
  // Update preselected student ID when lead ID changes
  useEffect(() => {
    if (leadId) {
      setDialogState(prev => ({
        ...prev,
        preselectedStudentId: `lead-${leadId}`
      }));
    }
  }, [leadId]);
  
  // Handle view details
  const handleViewDetails = useCallback((schedule: Schedule) => {
    setDialogState(prev => ({
      ...prev,
      detailsDialogOpen: true,
      selectedSchedule: schedule
    }));
  }, []);
  
  // Handle new schedule
  const handleNewSchedule = useCallback(() => {
    console.log("handleNewSchedule called - opening dialog");
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: true,
      editMode: false,
      selectedSchedule: null
    }));
    
    if (externalSetShowAddDialog) {
      externalSetShowAddDialog(true);
    }
  }, [externalSetShowAddDialog]);
  
  // Handle edit schedule
  const handleEditSchedule = useCallback((schedule: Schedule) => {
    console.log("Editing schedule:", schedule);
    // Make a deep copy of the schedule to avoid unintended mutations
    const scheduleCopy = JSON.parse(JSON.stringify(schedule));
    
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: true,
      editMode: true,
      selectedSchedule: scheduleCopy
    }));
  }, []);
  
  // Handle view reminders (stub function to satisfy interface requirements)
  const handleViewReminders = useCallback(() => {
    console.log("View reminders handler (currently disabled)");
    // This function is kept as a stub to satisfy interface requirements
    // but doesn't actually open the reminders dialog anymore
  }, []);
  
  // Handle open change
  const handleOpenChange = useCallback((open: boolean) => {
    console.log("handleOpenChange called with:", open);
    
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: open
    }));
    
    if (externalSetShowAddDialog) {
      externalSetShowAddDialog(open);
    }
  }, [externalSetShowAddDialog]);
  
  return {
    dialogState,
    setDialogState,
    handleViewDetails,
    handleNewSchedule,
    handleEditSchedule,
    handleViewReminders,
    handleOpenChange
  };
};
