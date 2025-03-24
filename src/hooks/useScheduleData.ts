import { useMemo } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleOperations } from './schedule/useScheduleOperations';
import { useScheduleFilters } from './schedule/useScheduleFilters';
import { useDialogState } from './schedule/useDialogState';
import { useAuth } from '@/context/auth';

export type { Schedule } from '@/types/schedule';

export const useScheduleData = () => {
  // Basic state and data
  const { schedules, visibleSchedules } = useSchedules();
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
    
    // Today and upcoming schedules
    today,
    todaySchedules: scheduleFilters.todaySchedules,
    upcomingSchedules: scheduleFilters.upcomingSchedules,
    
    // Operations with arguments adjusted for composition
    handleScheduleSubmit,
    markCompleted: scheduleOperations.markCompleted,
    cancelSchedule: scheduleOperations.cancelSchedule,
  };
};
