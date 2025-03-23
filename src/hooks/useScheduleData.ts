
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleManagement } from './useScheduleManagement';
import { Schedule } from '@/types/schedule';

export type { Schedule, FormattedScheduleData } from '@/types/schedule';

export const useScheduleData = () => {
  // Core data and location hooks first
  const location = useLocation();
  const { students, schedules, generateDemoData } = useData();
  
  // State hooks next
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Custom hooks last
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
  } = useCalendarState(schedules);
  
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
  } = useScheduleManagement();
  
  // Memoized data calculations
  const today = useMemo(() => new Date(), []);
  
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
  
  // Effects
  // Effect for generating demo data
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  // Effect for handling location state
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
  
  // Effect for updating selected schedule when schedules change
  useEffect(() => {
    if (selectedSchedule) {
      const updatedSchedule = schedules.find(s => s.id === selectedSchedule.id);
      if (updatedSchedule) {
        setSelectedSchedule(updatedSchedule);
      }
    }
  }, [schedules, selectedSchedule]);
  
  // Derived state
  const preSelectedStudentId = location.state?.studentId || '';
  const canSelectPreSelectedStudent = !schedules.some(
    schedule => 
      schedule.studentId === preSelectedStudentId && 
      schedule.status === 'scheduled'
  );
  
  const finalPreSelectedStudentId = canSelectPreSelectedStudent ? preSelectedStudentId : '';

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
    finalPreSelectedStudentId,
    showScheduleDetails,
    setShowScheduleDetails,
    selectedSchedule
  };
};
