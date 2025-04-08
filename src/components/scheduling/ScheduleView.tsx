
import React from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from '@/hooks/useCalendarState';
import { useScheduleFilters } from '@/hooks/schedule/useScheduleFilters';
import { useScheduleOperations } from '@/hooks/schedule/useScheduleOperations';
import { useScheduleDialogs } from '@/hooks/schedule/useScheduleDialogs';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { ProductType } from '@/context/product/types';
import ViewModeRenderer from './ViewModeRenderer';
import ScheduleDialogs from './ScheduleDialogs';

interface ScheduleViewProps {
  productContext?: ProductType;
  showAddDialog?: boolean;
  setShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
  viewMode?: string;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  productContext,
  showAddDialog: externalShowAddDialog,
  setShowAddDialog: externalSetShowAddDialog,
  leadId,
  viewMode = "month"
}) => {
  const { visibleSchedules } = useSchedules();
  const { whatsAppMessages } = useWhatsApp();
  const { markCompleted, cancelSchedule } = useScheduleOperations();
  const today = new Date();
  
  // Use the dialog hook to manage dialog state
  const {
    dialogState,
    setDialogState,
    handleViewDetails,
    handleNewSchedule,
    handleEditSchedule,
    handleOpenChange
  } = useScheduleDialogs({
    externalShowAddDialog,
    externalSetShowAddDialog,
    leadId
  });
  
  // Filter schedules based on product context
  const filteredSchedules = productContext 
    ? visibleSchedules.filter(schedule => 
        (schedule.productContext === productContext) ||
        (!schedule.productContext && 
         ((productContext === 'retention' && !schedule.studentId.startsWith('lead-')) ||
          (productContext === 'recruitment' && schedule.studentId.startsWith('lead-'))))
      )
    : visibleSchedules;
  
  // Get calendar state and schedule filters
  const calendarState = useCalendarState(filteredSchedules);
  const { 
    todaySchedules, 
    upcomingSchedules,
    students,
    studentsWithoutSchedules
  } = useScheduleFilters(filteredSchedules, today);
  
  // Handle completed and canceled schedules
  const handleCompleted = (id: string) => {
    markCompleted(id);
  };
  
  const handleCanceled = (id: string) => {
    cancelSchedule(id);
  };

  return (
    <div className="space-y-8">
      <ViewModeRenderer 
        viewMode={viewMode}
        todaySchedules={todaySchedules}
        upcomingSchedules={upcomingSchedules}
        calendarState={calendarState}
        today={today}
        handleViewDetails={handleViewDetails}
        handleCompleted={handleCompleted}
        handleCanceled={handleCanceled}
        handleEditSchedule={handleEditSchedule}
        handleNewSchedule={handleNewSchedule}
        setDialogState={setDialogState}
      />
      
      <ScheduleDialogs 
        dialogState={{
          ...dialogState,
          scheduleDialogOpen: dialogState.scheduleDialogOpen
        }}
        setDialogState={setDialogState}
        students={students}
        availableStudents={studentsWithoutSchedules}
        productContext={productContext}
        onOpenChange={handleOpenChange}
        preselectedStudentId={dialogState.preselectedStudentId}
      />
    </div>
  );
};

export default ScheduleView;
