import { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleManagement } from './useScheduleManagement';
import { Schedule } from '@/types/schedule';

export type { Schedule, FormattedScheduleData } from '@/types/schedule';

export const useScheduleData = () => {
  // Get data and location first
  const location = useLocation();
  const { students, schedules, generateDemoData } = useData();
  
  // Basic state
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Memoize Today
  const today = useMemo(() => new Date(), []);
  
  // Get hooks - keep them in the same order on every render
  const calendarHooks = useCalendarState(schedules);
  const {
    selectedDate,
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    previousMonth,
    nextMonth,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay
  } = calendarHooks;
  
  const scheduleManagementHooks = useScheduleManagement();
  const {
    studentsWithoutSchedules,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    scheduleToEdit,
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    startEditSchedule,
    markCompleted,
    cancelSchedule
  } = scheduleManagementHooks;
  
  // Memoized data calculations - must come after hooks
  const todaySchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === today.getDate() &&
             scheduleDate.getMonth() === today.getMonth() &&
             scheduleDate.getFullYear() === today.getFullYear() &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [schedules, today]);
  
  const upcomingSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return scheduleDate > todayStart &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);
  }, [schedules, today]);
  
  // Derived state - must come after all state hooks
  const preSelectedStudentId = useMemo(() => {
    const locationStudentId = location.state?.studentId || '';
    
    const canSelectStudent = !schedules.some(
      schedule => 
        schedule.studentId === locationStudentId && 
        schedule.status === 'scheduled'
    );
    
    return canSelectStudent ? locationStudentId : '';
  }, [location.state, schedules]);
  
  // Effects must be after all state definitions and derivations
  
  // Generate demo data if needed
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  // Handle location state
  useEffect(() => {
    const locationState = location.state as { studentId?: string; scheduleId?: string } | null;
    
    if (locationState?.scheduleId) {
      const schedule = schedules.find(s => s.id === locationState.scheduleId);
      if (schedule) {
        setSelectedSchedule(schedule);
        setShowScheduleDetails(true);
      }
    } else if (locationState?.studentId) {
      setShowAddDialog(true);
    }
  }, [location.state, schedules, setShowAddDialog]);
  
  // Update selected schedule when schedules change
  useEffect(() => {
    if (selectedSchedule) {
      const updatedSchedule = schedules.find(s => s.id === selectedSchedule.id);
      if (updatedSchedule) {
        setSelectedSchedule(updatedSchedule);
      }
    }
  }, [schedules, selectedSchedule]);

  return {
    students,
    studentsWithoutSchedules,
    schedules,
    selectedDate,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    scheduleToEdit,
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    today,
    todaySchedules,
    upcomingSchedules,
    previousMonth,
    nextMonth,
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    startEditSchedule,
    markCompleted,
    cancelSchedule,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay,
    finalPreSelectedStudentId: preSelectedStudentId,
    showScheduleDetails,
    setShowScheduleDetails,
    selectedSchedule
  };
};
