
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
  }>>;
  students: any[];
  availableStudents: any[];
  productContext?: ProductType;
}

const ScheduleDialogs: React.FC<ScheduleDialogsProps> = ({
  dialogState,
  setDialogState,
  students,
  availableStudents,
  productContext
}) => {
  return (
    <>
      <ScheduleDialog
        open={dialogState.scheduleDialogOpen}
        onOpenChange={(open) => {
          setDialogState(prev => ({
            ...prev,
            scheduleDialogOpen: open
          }));
        }}
        availableStudents={availableStudents}
        productContext={productContext}
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
      />
    </>
  );
};

export default ScheduleDialogs;
