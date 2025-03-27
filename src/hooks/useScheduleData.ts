
import { useMemo, useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleOperations } from './schedule/useScheduleOperations';
import { useScheduleFilters } from './schedule/useScheduleFilters';
import { useAuth } from '@/context/auth';
import { Schedule } from '@/types/schedule';

export type { Schedule } from '@/types/schedule';

export const useScheduleData = () => {
  // Estado para controlar diálogos e detalhes
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDayDialog, setShowDayDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Basic state and data
  const { schedules, visibleSchedules, updateScheduleStatus } = useSchedules();
  const { userEmail } = useAuth();
  
  // Fixed value for today
  const today = useMemo(() => new Date(), []);
  
  // Load all sub-hooks
  const calendarHooks = useCalendarState(visibleSchedules);
  const scheduleOperations = useScheduleOperations();
  const scheduleFilters = useScheduleFilters(visibleSchedules, today);
  
  // Manipulação de detalhes do agendamento
  const handleOpenDetails = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailsDialog(true);
  };
  
  // Handle schedule submission - ensure this returns a boolean
  const handleScheduleSubmit = (formData: FormData): boolean => {
    return scheduleOperations.handleScheduleSubmit(formData);
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
    const newDate = new Date(calendarHooks.selectedDate);
    newDate.setDate(day);
    calendarHooks.selectedDate.setDate(day);
    setShowDayDialog(true);
  };

  // Estatísticas adicionais
  const stats = useMemo(() => {
    return {
      total: visibleSchedules.length,
      scheduled: visibleSchedules.filter(s => s.status === 'scheduled').length,
      completed: visibleSchedules.filter(s => s.status === 'completed').length,
      canceled: visibleSchedules.filter(s => s.status === 'canceled').length
    };
  }, [visibleSchedules]);

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
    showAddDialog,
    setShowAddDialog,
    showDayDialog,
    setShowDayDialog,
    showDetailsDialog,
    setShowDetailsDialog,
    selectedSchedule,
    
    // Day handling
    handleDayClick,
    schedulesForSelectedDay,
    
    // Today and upcoming schedules
    today,
    todaySchedules: scheduleFilters.todaySchedules,
    upcomingSchedules: scheduleFilters.upcomingSchedules,
    completedSchedules: scheduleFilters.completedSchedules,
    canceledSchedules: scheduleFilters.canceledSchedules,
    
    // Estatísticas
    stats,
    schedulesByMonth: scheduleFilters.schedulesByMonth,
    schedulesByAgent: scheduleFilters.schedulesByAgent,
    
    // Operations with arguments adjusted for composition
    handleScheduleSubmit,
    markCompleted: scheduleOperations.markCompleted,
    cancelSchedule: scheduleOperations.cancelSchedule,
    updateScheduleStatus,
    handleOpenDetails
  };
};
