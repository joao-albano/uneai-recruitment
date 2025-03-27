
import { useMemo } from 'react';
import { Schedule } from '@/types/schedule';
import { generateDemoStudents } from '@/data/demoStudents';

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
  
  // Calculate upcoming schedules (não incluindo hoje)
  const upcomingSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const tomorrowStart = new Date(todayStart);
      tomorrowStart.setDate(todayStart.getDate() + 1);
      
      return scheduleDate >= tomorrowStart &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);
  }, [schedules, today]);

  // Calculate completed schedules
  const completedSchedules = useMemo(() => {
    return schedules.filter(schedule => schedule.status === 'completed')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [schedules]);

  // Calculate canceled schedules
  const canceledSchedules = useMemo(() => {
    return schedules.filter(schedule => schedule.status === 'canceled')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [schedules]);

  // Agrupar agendamentos por mês para estatísticas
  const schedulesByMonth = useMemo(() => {
    const months: Record<string, number> = {};
    
    schedules.forEach(schedule => {
      const date = new Date(schedule.date);
      const monthYear = `${date.getMonth()}-${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = 0;
      }
      
      months[monthYear]++;
    });
    
    return months;
  }, [schedules]);

  // Get the complete list of students from the available demo data
  const students = useMemo(() => {
    // Create a unique list of students from all schedules
    const uniqueStudents = new Map();
    
    // Add students from demo data to ensure we always have a full list
    generateDemoStudents().forEach(student => {
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
      return !schedules.some(
        schedule => 
          schedule.studentId === student.id && 
          schedule.status === 'scheduled'
      );
    });
  }, [students, schedules]);

  // Calcular o número de atendimentos por agente
  const schedulesByAgent = useMemo(() => {
    const agents: Record<string, number> = {};
    
    schedules.forEach(schedule => {
      if (!agents[schedule.agentName]) {
        agents[schedule.agentName] = 0;
      }
      
      agents[schedule.agentName]++;
    });
    
    return agents;
  }, [schedules]);

  return {
    todaySchedules,
    upcomingSchedules,
    completedSchedules,
    canceledSchedules,
    schedulesByMonth,
    schedulesByAgent,
    students,
    studentsWithoutSchedules
  };
};
