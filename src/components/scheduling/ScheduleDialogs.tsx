
import React from 'react';
import ScheduleDialog from './ScheduleDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import RemindersHistoryDialog from './RemindersHistoryDialog';
import { Schedule } from '@/types/schedule';
import { WhatsAppMessage } from '@/types/whatsapp';

interface ScheduleDialogsProps {
  showAddDialog: boolean;
  setShowAddDialog: (show: boolean) => void;
  showDayDialog: boolean;
  setShowDayDialog: (show: boolean) => void;
  showDetailsDialog: boolean;
  setShowDetailsDialog: (show: boolean) => void;
  showRemindersHistory: boolean;
  setShowRemindersHistory: (show: boolean) => void;
  selectedDate: Date;
  selectedSchedule: Schedule | null;
  schedulesForSelectedDay: Schedule[];
  studentsWithoutSchedules: any[];
  whatsAppMessages: WhatsAppMessage[];
  handleScheduleSubmit: (formData: FormData) => boolean;
  handleOpenDetails: (schedule: Schedule) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled', updatedSchedule?: Schedule) => void;
}

const ScheduleDialogs: React.FC<ScheduleDialogsProps> = ({
  showAddDialog,
  setShowAddDialog,
  showDayDialog,
  setShowDayDialog,
  showDetailsDialog,
  setShowDetailsDialog,
  showRemindersHistory,
  setShowRemindersHistory,
  selectedDate,
  selectedSchedule,
  schedulesForSelectedDay,
  studentsWithoutSchedules,
  whatsAppMessages,
  handleScheduleSubmit,
  handleOpenDetails,
  updateScheduleStatus
}) => {
  return (
    <>
      <ScheduleDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        students={studentsWithoutSchedules}
        onSubmit={handleScheduleSubmit}
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
      />
      
      {showDayDialog && (
        <DaySchedulesDialog 
          open={showDayDialog}
          onOpenChange={setShowDayDialog}
          date={selectedDate}
          schedules={schedulesForSelectedDay}
          onScheduleClick={handleOpenDetails}
          onAddNew={() => setShowAddDialog(true)}
        />
      )}
      
      <ScheduleDetailsDialog 
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        schedule={selectedSchedule}
        onStatusChange={updateScheduleStatus}
      />
      
      <RemindersHistoryDialog
        open={showRemindersHistory}
        onOpenChange={setShowRemindersHistory}
        messages={whatsAppMessages}
      />
    </>
  );
};

export default ScheduleDialogs;
