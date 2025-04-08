
import React, { useState, useEffect } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from '@/hooks/useCalendarState';
import { useScheduleFilters } from '@/hooks/schedule/useScheduleFilters';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import ScheduleDialogs from './ScheduleDialogs';
import { ProductType } from '@/context/product/types';

interface ScheduleViewProps {
  productContext?: ProductType;
  showAddDialog?: boolean;
  setShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  productContext,
  showAddDialog: externalShowAddDialog,
  setShowAddDialog: externalSetShowAddDialog,
  leadId
}) => {
  const { visibleSchedules } = useSchedules();
  const today = new Date();
  const [dialogState, setDialogState] = useState({
    scheduleDialogOpen: false,
    detailsDialogOpen: false,
    daySchedulesDialogOpen: false,
    remindersHistoryDialogOpen: false,
    selectedSchedule: null,
    selectedDay: null,
    preselectedStudentId: leadId ? `lead-${leadId}` : undefined
  });
  
  // Use external state if provided
  useEffect(() => {
    if (externalShowAddDialog !== undefined) {
      setDialogState(prev => ({
        ...prev,
        scheduleDialogOpen: externalShowAddDialog
      }));
    }
  }, [externalShowAddDialog]);
  
  // Update external state when dialog closes
  useEffect(() => {
    if (!dialogState.scheduleDialogOpen && externalSetShowAddDialog && externalShowAddDialog) {
      externalSetShowAddDialog(false);
    }
  }, [dialogState.scheduleDialogOpen, externalSetShowAddDialog, externalShowAddDialog]);
  
  // Update preselected student ID when leadId changes
  useEffect(() => {
    if (leadId) {
      setDialogState(prev => ({
        ...prev,
        preselectedStudentId: `lead-${leadId}`
      }));
    }
  }, [leadId]);
  
  // Filter schedules based on product context if specified
  const filteredSchedules = productContext 
    ? visibleSchedules.filter(schedule => 
        (schedule.productContext === productContext) ||
        // For backward compatibility with existing schedules that don't have productContext
        (!schedule.productContext && 
         ((productContext === 'retention' && !schedule.studentId.startsWith('lead-')) ||
          (productContext === 'recruitment' && schedule.studentId.startsWith('lead-'))))
      )
    : visibleSchedules;
  
  const calendarState = useCalendarState(filteredSchedules);
  const { 
    todaySchedules, 
    upcomingSchedules,
    students,
    studentsWithoutSchedules
  } = useScheduleFilters(filteredSchedules, today);
  
  const handleViewDetails = (schedule) => {
    setDialogState(prev => ({
      ...prev,
      detailsDialogOpen: true,
      selectedSchedule: schedule
    }));
  };
  
  const handleNewSchedule = () => {
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: true
    }));
  };
  
  const handleViewReminders = () => {
    setDialogState(prev => ({
      ...prev,
      remindersHistoryDialogOpen: true
    }));
  };
  
  const handleOpenChange = (open: boolean) => {
    setDialogState(prev => ({
      ...prev,
      scheduleDialogOpen: open
    }));
    
    // Also update external state if provided
    if (externalSetShowAddDialog) {
      externalSetShowAddDialog(open);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CalendarView 
            formattedMonthYear={calendarState.formattedMonthYear}
            firstDayOfMonth={calendarState.firstDayOfMonth}
            daysInMonth={calendarState.daysInMonth}
            today={today}
            selectedDate={calendarState.selectedDate}
            previousMonth={calendarState.previousMonth}
            nextMonth={calendarState.nextMonth}
            hasSchedulesOnDay={calendarState.hasSchedulesOnDay}
            getScheduleCountForDay={calendarState.getScheduleCountForDay}
            getScheduleStatusForDay={calendarState.getScheduleStatusForDay}
            onDayClick={(day) => {
              setDialogState(prev => ({
                ...prev,
                daySchedulesDialogOpen: true,
                selectedDay: new Date(
                  calendarState.selectedDate.getFullYear(),
                  calendarState.selectedDate.getMonth(),
                  day
                )
              }));
            }}
          />
        </div>
        
        <div className="space-y-8">
          <TodaySchedules 
            todaySchedules={todaySchedules}
            onViewDetails={handleViewDetails}
            onCompleted={(id) => console.log('Completed', id)}
            onCanceled={(id) => console.log('Canceled', id)}
          />
          
          <UpcomingSchedules 
            upcomingSchedules={upcomingSchedules}
            onViewDetails={handleViewDetails}
            onCompleted={(id) => console.log('Completed', id)}
            onCanceled={(id) => console.log('Canceled', id)}
          />
          
          <ScheduleStats 
            onNewSchedule={handleNewSchedule}
            onViewReminders={handleViewReminders}
          />
        </div>
      </div>
      
      <ScheduleDialogs 
        dialogState={{
          ...dialogState,
          scheduleDialogOpen: dialogState.scheduleDialogOpen || (externalShowAddDialog || false)
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
