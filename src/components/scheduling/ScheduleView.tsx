
import React, { useState } from 'react';
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
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ productContext }) => {
  const { visibleSchedules } = useSchedules();
  const today = new Date();
  const [dialogState, setDialogState] = useState({
    scheduleDialogOpen: false,
    detailsDialogOpen: false,
    daySchedulesDialogOpen: false,
    remindersHistoryDialogOpen: false,
    selectedSchedule: null,
    selectedDay: null
  });
  
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
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CalendarView 
            calendarState={calendarState} 
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
            schedules={todaySchedules}
            onViewDetails={(schedule) => {
              setDialogState(prev => ({
                ...prev,
                detailsDialogOpen: true,
                selectedSchedule: schedule
              }));
            }}
          />
          
          <UpcomingSchedules 
            schedules={upcomingSchedules}
            onViewDetails={(schedule) => {
              setDialogState(prev => ({
                ...prev,
                detailsDialogOpen: true,
                selectedSchedule: schedule
              }));
            }}
          />
          
          <ScheduleStats 
            onNewSchedule={() => {
              setDialogState(prev => ({
                ...prev,
                scheduleDialogOpen: true
              }));
            }}
            onViewReminders={() => {
              setDialogState(prev => ({
                ...prev,
                remindersHistoryDialogOpen: true
              }));
            }}
          />
        </div>
      </div>
      
      <ScheduleDialogs 
        dialogState={dialogState}
        setDialogState={setDialogState}
        students={students}
        availableStudents={studentsWithoutSchedules}
        productContext={productContext}
      />
    </div>
  );
};

export default ScheduleView;
