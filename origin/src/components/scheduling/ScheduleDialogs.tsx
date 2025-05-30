
import React from 'react';
import ScheduleDialog from './ScheduleDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import RemindersHistoryDialog from './RemindersHistoryDialog';
import { Schedule } from '@/types/schedule';
import { ProductType } from '@/context/product/types';
import { useScheduleOperations } from '@/hooks/schedule/useScheduleOperations';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';

interface ScheduleDialogsProps {
  dialogState: {
    scheduleDialogOpen: boolean;
    detailsDialogOpen: boolean;
    daySchedulesDialogOpen: boolean;
    remindersHistoryDialogOpen: boolean;
    selectedSchedule: Schedule | null;
    selectedDay: Date | null;
    editMode?: boolean;
    preselectedStudentId?: string;
  };
  setDialogState: React.Dispatch<React.SetStateAction<{
    scheduleDialogOpen: boolean;
    detailsDialogOpen: boolean;
    daySchedulesDialogOpen: boolean;
    remindersHistoryDialogOpen: boolean;
    selectedSchedule: Schedule | null;
    selectedDay: Date | null;
    editMode?: boolean;
    preselectedStudentId?: string;
  }>>;
  students: any[];
  availableStudents: any[];
  productContext?: ProductType;
  onOpenChange?: (open: boolean) => void;
  preselectedStudentId?: string;
}

const ScheduleDialogs: React.FC<ScheduleDialogsProps> = ({
  dialogState,
  setDialogState,
  students,
  availableStudents,
  productContext,
  onOpenChange,
  preselectedStudentId
}) => {
  const { markCompleted, cancelSchedule } = useScheduleOperations();
  const { whatsAppMessages } = useWhatsApp();
  
  // Handle schedule status changes
  const handleStatusChange = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    if (status === 'completed') {
      markCompleted(id);
    } else if (status === 'canceled') {
      cancelSchedule(id);
    }
    
    // Close the dialog after changing status
    setDialogState(prev => ({
      ...prev,
      detailsDialogOpen: false
    }));
  };
  
  // Handle opening/closing the schedule dialog
  const handleScheduleDialogOpenChange = (open: boolean) => {
    console.log("Schedule dialog open change:", open);
    // Update internal state
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: open
    }));
    
    // Call external handler if provided
    if (onOpenChange) {
      onOpenChange(open);
    }
  };
  
  // Handle editing a schedule
  const handleEditSchedule = (scheduleToEdit: Schedule) => {
    setDialogState(prev => ({
      ...prev,
      detailsDialogOpen: false,
      scheduleDialogOpen: true,
      selectedSchedule: scheduleToEdit,
      editMode: true
    }));
  };
  
  // Handle reminders history dialog open change
  const handleRemindersHistoryDialogOpenChange = (open: boolean) => {
    console.log("Reminders history dialog open change:", open);
    setDialogState(prev => ({
      ...prev,
      remindersHistoryDialogOpen: open
    }));
  };

  return (
    <>
      <ScheduleDialog
        open={dialogState.scheduleDialogOpen}
        onOpenChange={handleScheduleDialogOpenChange}
        availableStudents={availableStudents}
        productContext={productContext}
        preselectedStudentId={preselectedStudentId}
        scheduleToEdit={dialogState.editMode ? dialogState.selectedSchedule : null}
        isEditMode={dialogState.editMode}
      />
      
      <ScheduleDetailsDialog
        open={dialogState.detailsDialogOpen}
        onOpenChange={(open) => {
          setDialogState(prev => ({
            ...prev,
            detailsDialogOpen: open
          }));
        }}
        schedule={dialogState.selectedSchedule}
        onStatusChange={handleStatusChange}
        onEdit={handleEditSchedule}
      />
      
      <DaySchedulesDialog
        open={dialogState.daySchedulesDialogOpen}
        onOpenChange={(open) => {
          setDialogState(prev => ({
            ...prev,
            daySchedulesDialogOpen: open
          }));
        }}
        day={dialogState.selectedDay}
        productContext={productContext}
        onViewDetails={(schedule) => {
          setDialogState(prev => ({
            ...prev,
            daySchedulesDialogOpen: false,
            detailsDialogOpen: true,
            selectedSchedule: schedule
          }));
        }}
        onCompleted={markCompleted}
        onCanceled={cancelSchedule}
        onEdit={handleEditSchedule}
      />
      
      <RemindersHistoryDialog
        open={dialogState.remindersHistoryDialogOpen}
        onOpenChange={handleRemindersHistoryDialogOpenChange}
        messages={whatsAppMessages}
      />
    </>
  );
};

export default ScheduleDialogs;
