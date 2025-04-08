
import { Schedule } from '@/types/schedule';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { ProductType } from '@/context/product/types';

export const useScheduleOperations = () => {
  const { addSchedule, updateScheduleStatus, updateSchedule: updateScheduleContext } = useSchedules();
  const { userEmail } = useAuth();
  const { toast } = useToast();

  const handleScheduleSubmit = (formData: FormData): boolean => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string || userEmail;
    const productContext = formData.get('productContext') as ProductType | null;
    const campusId = formData.get('campusId') as string;
    
    // Get education type specific fields
    const educationType = formData.get('educationType') as 'basic' | 'higher' | null;
    const parentName = formData.get('parentName') as string | null;
    const parentPhone = formData.get('parentPhone') as string | null;
    const studentPhone = formData.get('studentPhone') as string | null;
    const studentEmail = formData.get('studentEmail') as string | null;
    const course = formData.get('course') as string | null;
    
    // Validate required fields
    if (!studentId || !date || !time) return false;
    
    // Validate education type specific required fields
    if (productContext === 'recruitment' && educationType === 'basic') {
      if (!parentName || !parentPhone) {
        toast({
          title: 'Dados incompletos',
          description: 'Para educação básica, o nome e telefone do responsável são obrigatórios.',
          variant: 'destructive'
        });
        return false;
      }
    } else if (productContext === 'recruitment' && educationType === 'higher') {
      if (!studentPhone || !studentEmail || !course) {
        toast({
          title: 'Dados incompletos',
          description: 'Para ensino superior, telefone, email e curso de interesse são obrigatórios.',
          variant: 'destructive'
        });
        return false;
      }
    }
    
    // Validate campus selection for recruitment context
    if (productContext === 'recruitment' && !campusId) {
      toast({
        title: 'Unidade não selecionada',
        description: 'Por favor, selecione a unidade para a visita.',
        variant: 'destructive'
      });
      return false;
    }
    
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
      productContext,
      
      // Add campus ID if provided
      ...(campusId && { campusId }),
      
      // Add education type specific fields
      educationType,
      ...(parentName && { parentName }),
      ...(parentPhone && { parentPhone }),
      ...(studentPhone && { studentPhone }),
      ...(studentEmail && { studentEmail }),
      ...(course && { course })
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
    
    return true;
  };
  
  const updateSchedule = (formData: FormData): boolean => {
    const id = formData.get('id') as string;
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    const agentName = formData.get('agentName') as string || userEmail;
    const productContext = formData.get('productContext') as ProductType | null;
    const status = formData.get('status') as 'scheduled' | 'completed' | 'canceled';
    const campusId = formData.get('campusId') as string;
    
    // Get education type specific fields
    const educationType = formData.get('educationType') as 'basic' | 'higher' | null;
    const parentName = formData.get('parentName') as string | null;
    const parentPhone = formData.get('parentPhone') as string | null;
    const studentPhone = formData.get('studentPhone') as string | null;
    const studentEmail = formData.get('studentEmail') as string | null;
    const course = formData.get('course') as string | null;
    
    // Validate required fields
    if (!id || !studentId || !date || !time) return false;
    
    // Validate education type specific required fields
    if (productContext === 'recruitment' && educationType === 'basic') {
      if (!parentName || !parentPhone) {
        toast({
          title: 'Dados incompletos',
          description: 'Para educação básica, o nome e telefone do responsável são obrigatórios.',
          variant: 'destructive'
        });
        return false;
      }
    } else if (productContext === 'recruitment' && educationType === 'higher') {
      if (!studentPhone || !studentEmail || !course) {
        toast({
          title: 'Dados incompletos',
          description: 'Para ensino superior, telefone, email e curso de interesse são obrigatórios.',
          variant: 'destructive'
        });
        return false;
      }
    }
    
    // Validate campus selection for recruitment context
    if (productContext === 'recruitment' && !campusId) {
      toast({
        title: 'Unidade não selecionada',
        description: 'Por favor, selecione a unidade para a visita.',
        variant: 'destructive'
      });
      return false;
    }
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    // Determine student name based on student ID
    let studentName = `Aluno ${studentId}`;
    if (productContext === 'recruitment' || studentId.startsWith('lead-')) {
      studentName = `Lead ${studentId.replace('lead-', '')}`;
    }
    
    const updatedSchedule: Schedule = {
      id,
      studentId,
      studentName,
      date: scheduleDate,
      agentName: agentName || 'Coord. Mariana',
      status: status || 'scheduled',
      notes,
      productContext,
      
      // Add campus ID if provided
      ...(campusId && { campusId }),
      
      // Add education type specific fields
      educationType,
      ...(parentName && { parentName }),
      ...(parentPhone && { parentPhone }),
      ...(studentPhone && { studentPhone }),
      ...(studentEmail && { studentEmail }),
      ...(course && { course })
    };
    
    updateScheduleContext(updatedSchedule);
    
    toast({
      title: 'Agendamento atualizado',
      description: `Atualizado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
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
    updateSchedule,
    markCompleted,
    cancelSchedule
  };
};
