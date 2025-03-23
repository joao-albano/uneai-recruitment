
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from './useCalendarState';
import { useScheduleManagement } from './useScheduleManagement';
import { Schedule } from '@/types/schedule';

export type { Schedule, FormattedScheduleData } from '@/types/schedule';

export const useScheduleData = () => {
  // Estado básico
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Dados e localização
  const location = useLocation();
  const { students, generateDemoData } = useData();
  const { schedules, visibleSchedules } = useSchedules();
  
  // Valor fixo para Today
  const today = useMemo(() => new Date(), []);
  
  // Hooks principais - manter na mesma ordem em cada renderização
  const calendarHooks = useCalendarState(visibleSchedules);
  const scheduleManagementHooks = useScheduleManagement();
  
  // Extrair valores dos hooks
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
  
  // Cálculos de dados memorizados
  const todaySchedules = useMemo(() => {
    return visibleSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === today.getDate() &&
             scheduleDate.getMonth() === today.getMonth() &&
             scheduleDate.getFullYear() === today.getFullYear() &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [visibleSchedules, today]);
  
  const upcomingSchedules = useMemo(() => {
    return visibleSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return scheduleDate > todayStart &&
             schedule.status === 'scheduled';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);
  }, [visibleSchedules, today]);
  
  // Estado derivado
  const preSelectedStudentId = useMemo(() => {
    const locationStudentId = location.state?.studentId || '';
    
    const canSelectStudent = !schedules.some(
      schedule => 
        schedule.studentId === locationStudentId && 
        schedule.status === 'scheduled'
    );
    
    return canSelectStudent ? locationStudentId : '';
  }, [location.state, schedules]);
  
  // Efeitos - devem estar após todas as definições de estado
  
  // Gerar dados de demonstração se necessário
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  // Lidar com dados do estado da localização
  useEffect(() => {
    if (!location.state) return;
    
    const locationState = location.state as { studentId?: string; scheduleId?: string } | null;
    
    if (locationState?.scheduleId) {
      const schedule = visibleSchedules.find(s => s.id === locationState.scheduleId);
      if (schedule) {
        setSelectedSchedule(schedule);
        setShowScheduleDetails(true);
      }
    } else if (locationState?.studentId) {
      setShowAddDialog(true);
    }
  }, [location.state, visibleSchedules, setShowAddDialog]);
  
  // Atualizar agendamento selecionado quando os agendamentos mudam
  useEffect(() => {
    if (selectedSchedule) {
      const updatedSchedule = visibleSchedules.find(s => s.id === selectedSchedule.id);
      if (updatedSchedule) {
        setSelectedSchedule(updatedSchedule);
      }
    }
  }, [visibleSchedules, selectedSchedule]);

  return {
    students,
    studentsWithoutSchedules,
    schedules,
    visibleSchedules,
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
