
import { useState, useCallback } from 'react';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Schedule } from '@/types/schedule';

export const useScheduleManagement = () => {
  const { students, schedules, addSchedule, updateScheduleStatus, updateSchedule } = useData();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<Schedule | null>(null);
  const { toast } = useToast();
  
  const studentsWithoutSchedules = students.filter(student => {
    return !schedules.some(
      schedule => 
        schedule.studentId === student.id && 
        schedule.status === 'scheduled'
    );
  });
  
  const handleScheduleSubmit = (formData: FormData) => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const newSchedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName: student.name,
      date: scheduleDate,
      agentName: 'Coord. Mariana',
      status: 'scheduled' as const,
      notes,
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
    
    setShowAddDialog(false);
  };
  
  const handleEditScheduleSubmit = useCallback((formData: FormData) => {
    if (!scheduleToEdit) return;
    
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const updatedSchedule = {
      ...scheduleToEdit,
      date: scheduleDate,
      notes,
    };
    
    updateSchedule(updatedSchedule);
    
    toast({
      title: 'Atendimento atualizado',
      description: `Agendamento de ${updatedSchedule.studentName} atualizado com sucesso.`
    });
    
    // First close the dialog
    setShowEditDialog(false);
    // Then clear the schedule data after the dialog transition completes
    setTimeout(() => {
      setScheduleToEdit(null);
    }, 300);
  }, [scheduleToEdit, toast, updateSchedule]);
  
  const startEditSchedule = useCallback((schedule: Schedule) => {
    // Create a proper deep copy to avoid reference issues
    const scheduleClone = {
      ...schedule,
      date: new Date(schedule.date),
    };
    
    setScheduleToEdit(scheduleClone);
    setShowEditDialog(true);
  }, []);
  
  const closeEditDialog = useCallback(() => {
    // First close the dialog
    setShowEditDialog(false);
    // Then clear the schedule data after the dialog transition completes
    setTimeout(() => {
      setScheduleToEdit(null);
    }, 300);
  }, []);
  
  const markCompleted = useCallback((id: string) => {
    updateScheduleStatus(id, 'completed');
    toast({
      title: 'Atendimento concluído',
      description: 'O atendimento foi marcado como concluído com sucesso.'
    });
  }, [toast, updateScheduleStatus]);
  
  const cancelSchedule = useCallback((id: string) => {
    updateScheduleStatus(id, 'canceled');
    toast({
      title: 'Atendimento cancelado',
      description: 'O atendimento foi cancelado com sucesso.'
    });
  }, [toast, updateScheduleStatus]);

  return {
    students,
    studentsWithoutSchedules,
    schedules,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog: closeEditDialog,
    scheduleToEdit,
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    startEditSchedule,
    markCompleted,
    cancelSchedule
  };
};
