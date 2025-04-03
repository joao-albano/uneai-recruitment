
import { Schedule } from '@/types/schedule';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { ProductType } from '@/context/product/types';

export const useScheduleOperations = () => {
  const { addSchedule, updateScheduleStatus } = useSchedules();
  const { userEmail } = useAuth();
  const { toast } = useToast();

  const handleScheduleSubmit = (formData: FormData): boolean => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string || userEmail;
    const productContext = formData.get('productContext') as ProductType | null;
    
    if (!studentId || !date || !time) return false;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);

    // Determine student name and default agent name based on product context
    let studentName = `Aluno ${studentId}`; 
    let defaultAgentName = 'Coord. Mariana';
    
    if (productContext === 'recruitment') {
      studentName = `Lead ${studentId.replace('lead-', '')}`;
      defaultAgentName = 'Coord. Renata';
    }
    
    const newSchedule: Schedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName,
      date: scheduleDate,
      agentName: agentName || defaultAgentName,
      status: 'scheduled',
      notes,
      productContext
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
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
    markCompleted,
    cancelSchedule
  };
};
