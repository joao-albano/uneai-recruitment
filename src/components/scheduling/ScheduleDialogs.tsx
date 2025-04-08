
import React from 'react';
import ScheduleDialog from './ScheduleDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import RemindersHistoryDialog from './RemindersHistoryDialog';
import { Schedule } from '@/types/schedule';
import { ProductType } from '@/context/product/types';

interface ScheduleDialogsProps {
  dialogState: {
    scheduleDialogOpen: boolean;
    detailsDialogOpen: boolean;
    daySchedulesDialogOpen: boolean;
    remindersHistoryDialogOpen: boolean;
    selectedSchedule: Schedule | null;
    selectedDay: Date | null;
  };
  setDialogState: React.Dispatch<React.SetStateAction<{
    scheduleDialogOpen: boolean;
    detailsDialogOpen: boolean;
    daySchedulesDialogOpen: boolean;
    remindersHistoryDialogOpen: boolean;
    selectedSchedule: Schedule | null;
    selectedDay: Date | null;
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
  // Function to handle schedule status changes
  const handleStatusChange = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    // Update the status in context
    console.log(`Changing status for ${id} to ${status}`);
  };
  
  // Handle opening/closing the schedule dialog
  const handleScheduleDialogOpenChange = (open: boolean) => {
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
  
  // Mock messages for reminders history
  const reminderMessages = [];

  return (
    <>
      <ScheduleDialog
        open={dialogState.scheduleDialogOpen}
        onOpenChange={handleScheduleDialogOpenChange}
        availableStudents={availableStudents}
        productContext={productContext}
        preselectedStudentId={preselectedStudentId}
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
      />
      
      <RemindersHistoryDialog
        open={dialogState.remindersHistoryDialogOpen}
        onOpenChange={(open) => {
          setDialogState(prev => ({
            ...prev,
            remindersHistoryDialogOpen: open
          }));
        }}
        messages={reminderMessages}
      />
    </>
  );
};

export default ScheduleDialogs;
