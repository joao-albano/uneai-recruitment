
import { useMemo } from 'react';
import { Schedule } from '@/types/schedule';

export const useScheduleFilters = (schedules: Schedule[], today: Date) => {
  // Calculate today's schedules
  const todaySchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === today.getDate() &&
             scheduleDate.getMonth() === today.getMonth() &&
             scheduleDate.getFullYear() === today.getFullYear() &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [schedules, today]);
  
  // Calculate upcoming schedules
  const upcomingSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return scheduleDate > todayStart &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);
  }, [schedules, today]);

  // Derive students list from schedules
  const students = useMemo(() => schedules.map(s => ({
    id: s.studentId,
    name: s.studentName
  })), [schedules]);

  // Calculate students without active schedules
  const studentsWithoutSchedules = useMemo(() => students.filter(student => {
    return !schedules.some(
      schedule => 
        schedule.studentId === student.id && 
        schedule.status === 'scheduled'
    );
  }), [students, schedules]);

  return {
    todaySchedules,
    upcomingSchedules,
    students,
    studentsWithoutSchedules
  };
};
