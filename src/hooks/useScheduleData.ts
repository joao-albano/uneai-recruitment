
import { useMemo } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleOperations } from './schedule/useScheduleOperations';
import { useScheduleFilters } from './schedule/useScheduleFilters';
import { useDialogState } from './schedule/useDialogState';
import { useAuth } from '@/context/auth';
import { Schedule } from '@/types/schedule';

export type { Schedule } from '@/types/schedule';

export const useScheduleData = () => {
  // Basic state and data
  const { schedules, visibleSchedules, updateScheduleStatus } = useSchedules();
  const { userEmail } = useAuth();
  
  // Fixed value for today
  const today = useMemo(() => new Date(), []);
  
  // Load all sub-hooks
  const calendarHooks = useCalendarState(visibleSchedules);
  const scheduleOperations = useScheduleOperations();
  const scheduleFilters = useScheduleFilters(visibleSchedules, today);
  const dialogState = useDialogState(visibleSchedules);
  
  // Handle schedule submission 
  const handleScheduleSubmit = (formData: FormData) => {
    const success = scheduleOperations.handleScheduleSubmit(formData);
    if (success) {
      // Explicit false parameter
      dialogState.setShowAddDialog(false);
    }
    return success;
  };

  // Computes schedules for the selected day
  const schedulesForSelectedDay = useMemo(() => {
    return visibleSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === calendarHooks.selectedDate.getDate() &&
             scheduleDate.getMonth() === calendarHooks.selectedDate.getMonth() &&
             scheduleDate.getFullYear() === calendarHooks.selectedDate.getFullYear();
    });
  }, [visibleSchedules, calendarHooks.selectedDate]);

  // Handle day click in the calendar
  const handleDayClick = (day: number) => {
    const newDate = new Date(calendarHooks.selectedDate.getFullYear(), 
                            calendarHooks.selectedDate.getMonth(), 
                            day);
    // Update the selected date
    // Set show day dialog
    dialogState.setShowDayDialog(true);
  };

  // Return combined object with all needed properties and methods
  return {
    // Data
    students: scheduleFilters.students,
    studentsWithoutSchedules: scheduleFilters.studentsWithoutSchedules,
    schedules,
    visibleSchedules,
    
    // Calendar state
    ...calendarHooks,
    
    // Dialog state
    ...dialogState,
    
    // Day handling
    handleDayClick,
    schedulesForSelectedDay,
    
    // Today and upcoming schedules
    today,
    todaySchedules: scheduleFilters.todaySchedules,
    upcomingSchedules: scheduleFilters.upcomingSchedules,
    
    // Operations with arguments adjusted for composition
    handleScheduleSubmit,
    markCompleted: scheduleOperations.markCompleted,
    cancelSchedule: scheduleOperations.cancelSchedule,
    updateScheduleStatus
  };
};
