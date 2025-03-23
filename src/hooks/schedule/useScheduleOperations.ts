
import { Schedule } from '@/types/schedule';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useScheduleOperations = () => {
  const { addSchedule, updateScheduleStatus, updateSchedule } = useSchedules();
  const { userEmail } = useAuth();
  const { toast } = useToast();

  const handleScheduleSubmit = (formData: FormData) => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string || userEmail;
    
    if (!studentId || !date || !time) return false;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const newSchedule: Schedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName: `Aluno ${studentId}`, // Simplified for example
      date: scheduleDate,
      agentName: agentName || 'Coord. Mariana',
      status: 'scheduled',
      notes,
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
    
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
    
    toast({
      title: 'Atendimento atualizado',
      description: `Agendamento de ${updatedSchedule.studentName} atualizado com sucesso.`
    });
    
    return true;
  };
  
  const markCompleted = (id: string) => {
    updateScheduleStatus(id, 'completed');
    
    toast({
      title: 'Atendimento concluído',
      description: 'O atendimento foi marcado como concluído com sucesso.'
    });
  };
  
  const cancelSchedule = (id: string) => {
    updateScheduleStatus(id, 'canceled');
    
    toast({
      title: 'Atendimento cancelado',
      description: 'O atendimento foi cancelado com sucesso.'
    });
  };

  return {
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    markCompleted,
    cancelSchedule
  };
};
