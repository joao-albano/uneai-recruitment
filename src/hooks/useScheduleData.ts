
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from './useCalendarState';
import { Schedule } from '@/types/schedule';
import { useAuth } from '@/context/AuthContext';

export type { Schedule } from '@/types/schedule';

export const useScheduleData = () => {
  // Estado básico
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Dados e localização
  const location = useLocation();
  const { schedules, visibleSchedules, addSchedule, updateScheduleStatus, updateSchedule, clearAllSchedules } = useSchedules();
  const { isAdmin, userEmail } = useAuth();
  
  // Valor fixo para Today
  const today = useMemo(() => new Date(), []);
  
  // Hooks principais - manter na mesma ordem em cada renderização
  const calendarHooks = useCalendarState(visibleSchedules);
  
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
  
  // Estado para diálogos
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);
  
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
  
  // Funções de gerenciamento de agendamentos
  const handleScheduleSubmit = (formData: FormData) => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string || userEmail;
    
    if (!studentId || !date || !time) return;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const newSchedule: Schedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName: `Aluno ${studentId}`, // Simplificado para o exemplo
      date: scheduleDate,
      agentName: agentName || 'Coord. Mariana',
      status: 'scheduled',
      notes,
    };
    
    addSchedule(newSchedule);
    setShowAddDialog(false);
  };
  
  const handleEditScheduleSubmit = (formData: FormData) => {
    if (!scheduleToEdit) return;
    
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const updatedSchedule = {
      ...scheduleToEdit,
      date: scheduleDate,
      notes,
      agentName: agentName || scheduleToEdit.agentName
    };
    
    updateSchedule(updatedSchedule);
    setShowEditDialog(false);
    setScheduleToEdit(null);
  };
  
  const startEditSchedule = (schedule: Schedule) => {
    setScheduleToEdit(schedule);
    setShowEditDialog(true);
  };
  
  const closeEditDialog = () => {
    setShowEditDialog(false);
    setTimeout(() => {
      setScheduleToEdit(null);
    }, 100);
  };
  
  const markCompleted = (id: string) => {
    updateScheduleStatus(id, 'completed');
  };
  
  const cancelSchedule = (id: string) => {
    updateScheduleStatus(id, 'canceled');
  };

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
  }, [location.state, visibleSchedules]);
  
  // Atualizar agendamento selecionado quando os agendamentos mudam
  useEffect(() => {
    if (selectedSchedule) {
      const updatedSchedule = visibleSchedules.find(s => s.id === selectedSchedule.id);
      if (updatedSchedule) {
        setSelectedSchedule(updatedSchedule);
      }
    }
  }, [visibleSchedules, selectedSchedule]);

  // Lista de estudantes básica para o exemplo
  const students = schedules.map(s => ({
    id: s.studentId,
    name: s.studentName
  }));

  // Estudantes sem agendamentos
  const studentsWithoutSchedules = students.filter(student => {
    return !schedules.some(
      schedule => 
        schedule.studentId === student.id && 
        schedule.status === 'scheduled'
    );
  });

  return {
    students,
    studentsWithoutSchedules,
    schedules,
    visibleSchedules,
    selectedDate,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog: closeEditDialog,
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
