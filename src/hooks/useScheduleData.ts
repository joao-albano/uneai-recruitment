
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleManagement } from './useScheduleManagement';
import { Schedule } from '@/types/schedule';

export type { Schedule, FormattedScheduleData } from '@/types/schedule';

export const useScheduleData = () => {
  const location = useLocation();
  const { students, schedules, generateDemoData } = useData();
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
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
  
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
    
    const locationState = location.state as { studentId?: string; scheduleId?: string } | null;
    
    // Check if we have a scheduleId in the state
    if (locationState?.scheduleId) {
      const schedule = schedules.find(s => s.id === locationState.scheduleId);
      if (schedule) {
        setSelectedSchedule(schedule);
        setShowScheduleDetails(true);
      }
    }
    // If we have a studentId but no scheduleId, open the add dialog
    else if (locationState?.studentId) {
      setShowAddDialog(true);
    }
  }, [students.length, schedules, generateDemoData, location.state, setShowAddDialog]);
  
  const today = new Date();
  
  const todaySchedules = schedules.filter(schedule => 
    schedule.date.getDate() === today.getDate() &&
    schedule.date.getMonth() === today.getMonth() &&
    schedule.date.getFullYear() === today.getFullYear() &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const upcomingSchedules = schedules.filter(schedule => 
    schedule.date > today &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
  
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
