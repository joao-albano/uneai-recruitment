
import { Schedule } from '@/types/schedule';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useAuth } from '@/context/AuthContext';

export const useScheduleOperations = () => {
  const { addSchedule, updateScheduleStatus, updateSchedule } = useSchedules();
  const { userEmail } = useAuth();

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
    return true;
  };
  
  const handleEditScheduleSubmit = (scheduleToEdit: Schedule | null, formData: FormData) => {
    if (!scheduleToEdit) return false;
    
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string;
    
    if (!date || !time) return false;
    
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
    return true;
  };
  
  const markCompleted = (id: string) => {
    updateScheduleStatus(id, 'completed');
  };
  
  const cancelSchedule = (id: string) => {
    updateScheduleStatus(id, 'canceled');
  };

  return {
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    markCompleted,
    cancelSchedule
  };
};
