
import { useMemo } from 'react';
import { Schedule } from '@/types/schedule';

export const useScheduleFilters = (schedules: Schedule[], today: Date) => {
  // Filter for today's schedules
  const todaySchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === today.getDate() &&
             scheduleDate.getMonth() === today.getMonth() &&
             scheduleDate.getFullYear() === today.getFullYear() &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [schedules, today]);
  
  // Filter for upcoming schedules (future dates)
  const upcomingSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      // Check if the date is in the future, but not today
      const isAfterToday = 
        (scheduleDate.getDate() > today.getDate() && 
         scheduleDate.getMonth() === today.getMonth() && 
         scheduleDate.getFullYear() === today.getFullYear()) ||
        (scheduleDate.getMonth() > today.getMonth() && 
         scheduleDate.getFullYear() === today.getFullYear()) ||
        scheduleDate.getFullYear() > today.getFullYear();
      
      return isAfterToday && schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [schedules, today]);
  
  // Filter for completed schedules
  const completedSchedules = useMemo(() => {
    return schedules
      .filter(schedule => schedule.status === 'completed')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [schedules]);
  
  // Filter for canceled schedules
  const canceledSchedules = useMemo(() => {
    return schedules
      .filter(schedule => schedule.status === 'canceled')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [schedules]);
  
  // Create a list of unique student IDs
  const studentIds = useMemo(() => {
    return [...new Set(schedules.map(schedule => schedule.studentId))];
  }, [schedules]);
  
  // Create a map of students with their names
  const students = useMemo(() => {
    const studentMap = new Map();
    schedules.forEach(schedule => {
      studentMap.set(schedule.studentId, {
        id: schedule.studentId,
        name: schedule.studentName
      });
    });
    return Array.from(studentMap.values());
  }, [schedules]);
  
  // Create demo students without schedules
  const studentsWithoutSchedules = useMemo(() => {
    // In a real app, you would fetch this from the API
    const demoStudents = [
      { id: 'student-1', name: 'Leonardo Marques' },
      { id: 'student-2', name: 'Sofia Andrade' },
      { id: 'student-3', name: 'Rafael Costa' },
      { id: 'student-4', name: 'Mariana Oliveira' },
      { id: 'student-5', name: 'Pedro Henrique' },
      { id: 'lead-101', name: 'Lucas Ferreira (Lead)' },
      { id: 'lead-102', name: 'Isabela Santos (Lead)' },
      { id: 'lead-103', name: 'Marcos Almeida (Lead)' },
      { id: 'lead-104', name: 'Juliana Ribeiro (Lead)' },
      { id: 'lead-105', name: 'Thiago Mendes (Lead)' }
    ];
    
    // Filter out students that already have a scheduled appointment
    const scheduledStudentIds = schedules
      .filter(schedule => schedule.status === 'scheduled')
      .map(schedule => schedule.studentId);
    
    return demoStudents.filter(student => !scheduledStudentIds.includes(student.id));
  }, [schedules]);
  
  // Group schedules by month for analytics
  const schedulesByMonth = useMemo(() => {
    const months: { [key: string]: number } = {};
    schedules.forEach(schedule => {
      const date = new Date(schedule.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      months[monthYear] = (months[monthYear] || 0) + 1;
    });
    return months;
  }, [schedules]);
  
  // Group schedules by agent for analytics
  const schedulesByAgent = useMemo(() => {
    const agents: { [key: string]: number } = {};
    schedules.forEach(schedule => {
      const agent = schedule.agentName || 'Não definido';
      agents[agent] = (agents[agent] || 0) + 1;
    });
    return agents;
  }, [schedules]);
  
  return {
    todaySchedules,
    upcomingSchedules,
    completedSchedules,
    canceledSchedules,
    students,
    studentsWithoutSchedules,
    schedulesByMonth,
    schedulesByAgent
  };
};
