
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleManagement } from './useScheduleManagement';
import { Schedule } from '@/types/schedule';

export type { Schedule, FormattedScheduleData } from '@/types/schedule';

export const useScheduleData = () => {
  const location = useLocation();
  const { students, schedules, generateDemoData } = useData();
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
    handleScheduleSubmit,
    markCompleted,
    cancelSchedule
  } = useScheduleManagement();
  
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
    
    if (location.state?.studentId) {
      setShowAddDialog(true);
    }
  }, [students.length, generateDemoData, location.state]);
  
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
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    today,
    todaySchedules,
    upcomingSchedules,
    previousMonth,
    nextMonth,
    handleScheduleSubmit,
    markCompleted,
    cancelSchedule,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay,
    finalPreSelectedStudentId
  };
};
