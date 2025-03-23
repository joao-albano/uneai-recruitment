
import { useMemo } from 'react';
import { Schedule } from '@/types/schedule';
import { demoStudents } from '@/data/demoStudents';

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

  // Get the complete list of students from the available demo data
  // This ensures we always have the full student list regardless of schedule history
  const students = useMemo(() => {
    // Create a unique list of students from all schedules
    const uniqueStudents = new Map();
    
    // Add students from demo data to ensure we always have a full list
    demoStudents().forEach(student => {
      uniqueStudents.set(student.id, {
        id: student.id,
        name: student.name,
        riskLevel: student.riskLevel
      });
    });
    
    // Also add any students from schedules that might not be in demo data
    schedules.forEach(s => {
      if (!uniqueStudents.has(s.studentId)) {
        uniqueStudents.set(s.studentId, {
          id: s.studentId,
          name: s.studentName
        });
      }
    });
    
    return Array.from(uniqueStudents.values());
  }, [schedules]);

  // Calculate students without active schedules
  const studentsWithoutSchedules = useMemo(() => {
    return students.filter(student => {
      // A student is available if they have NO active (scheduled) appointments
      // Completed or canceled appointments don't count - those students should be available
      return !schedules.some(
        schedule => 
          schedule.studentId === student.id && 
          schedule.status === 'scheduled' // Only check for active schedules
      );
    });
  }, [students, schedules]);

  return {
    todaySchedules,
    upcomingSchedules,
    students,
    studentsWithoutSchedules
  };
};
