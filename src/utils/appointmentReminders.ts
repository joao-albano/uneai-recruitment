
import { Schedule } from '@/types/schedule';
import { StudentData } from '@/types/data';
import { WhatsAppConfig, formatAppointmentDateTime, sendWhatsAppMessage } from './whatsappIntegration';
import { WhatsAppMessage, MessageStatus } from '@/types/whatsapp';

export const sendAppointmentReminders = async (
  schedules: Schedule[],
  students: StudentData[],
  whatsAppConfig: WhatsAppConfig,
  addMessage: (message: WhatsAppMessage) => void,
  addAlert: (alert: any) => void
): Promise<number> => {
  if (!whatsAppConfig.enabled || whatsAppConfig.provider === 'disabled') {
    console.log('[Reminders] WhatsApp integration is disabled');
    return 0;
  }

  // Get the current date and target date based on reminder timing setting
  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + (whatsAppConfig.reminderTiming || 1));
  
  // Reset time for date comparison (we only want to compare the date, not the time)
  const targetDateNoTime = new Date(
    targetDate.getFullYear(), 
    targetDate.getMonth(), 
    targetDate.getDate()
  );
  
  console.log(`[Reminders] Checking for appointments on ${targetDateNoTime.toLocaleDateString()}`);
  
  // Get schedules for the target date that are still scheduled (not canceled or completed)
  const targetSchedules = schedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    const scheduleDateNoTime = new Date(
      scheduleDate.getFullYear(), 
      scheduleDate.getMonth(), 
      scheduleDate.getDate()
    );
    
    return (
      schedule.status === 'scheduled' && 
      scheduleDateNoTime.getTime() === targetDateNoTime.getTime()
    );
  });
  
  console.log(`[Reminders] Found ${targetSchedules.length} appointments for reminder`);
  
  if (targetSchedules.length === 0) {
    addAlert({
      id: `reminder-${Date.now()}`,
      type: 'info',
      message: `Não há agendamentos previstos para ${targetDateNoTime.toLocaleDateString()} para enviar lembretes.`,
      createdAt: new Date(),
      read: false,
      actionTaken: false,
    });
    return 0;
  }
  
  let remindersSent = 0;
  
  // Process each schedule
  for (const schedule of targetSchedules) {
    // Find the student associated with this schedule
    const student = students.find(s => s.id === schedule.studentId);
    
    if (!student || !student.parentContact) {
      console.log(`[Reminders] No parent contact found for student ID: ${schedule.studentId}`);
      continue;
    }
    
    // Replace template variables in the reminder message
    let reminderMessage = whatsAppConfig.templateMessages?.appointmentReminder || 
      `Olá {{parentName}}, lembramos que {{studentName}} tem um atendimento agendado para {{appointmentDate}}. Por favor, confirme sua presença. Obrigado!`;
    
    reminderMessage = reminderMessage
      .replace(/\{\{parentName\}\}/g, student.parentName || 'Responsável')
      .replace(/\{\{studentName\}\}/g, student.name)
      .replace(/\{\{appointmentDate\}\}/g, formatAppointmentDateTime(schedule.date));
    
    // Send the message
    try {
      console.log(`[Reminders] Sending reminder to ${student.parentContact}`);
      
      // Create a message object for history
      const whatsAppMessage: WhatsAppMessage = {
        id: `whatsapp-reminder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        studentId: student.id,
        studentName: student.name,
        parentName: student.parentName || 'Responsável',
        to: student.parentContact,
        recipientNumber: student.parentContact,
        message: reminderMessage,
        status: 'sending' as MessageStatus,
        messageType: 'notification',
        createdAt: new Date(),
      };
      
      // Send the message using WhatsApp integration
      const result = await sendWhatsAppMessage(
        whatsAppConfig,
        student.parentContact,
        reminderMessage
      );
      
      // Update message status based on result
      whatsAppMessage.status = result.success ? 'delivered' : 'failed';
      if (!result.success && result.message) {
        whatsAppMessage.errorMessage = result.message;
      }
      
      // Add message to history
      addMessage(whatsAppMessage);
      
      if (result.success) {
        remindersSent++;
      }
      
      // Add alert
      addAlert({
        id: `reminder-${Date.now()}-${student.id}`,
        studentId: student.id,
        studentName: student.name,
        studentClass: student.class,
        type: result.success ? 'appointment-reminder' : 'error',
        message: result.success 
          ? `Lembrete de agendamento enviado para ${student.parentName || 'Responsável'} (${student.parentContact}).`
          : `Erro ao enviar lembrete para ${student.parentName || 'Responsável'}: ${result.message || 'Erro desconhecido'}`,
        createdAt: new Date(),
        read: false,
        actionTaken: false,
      });
      
    } catch (error) {
      console.error('[Reminders] Error sending reminder:', error);
      
      // Add alert for error
      addAlert({
        id: `reminder-error-${Date.now()}-${student.id}`,
        studentId: student.id,
        studentName: student.name,
        studentClass: student.class,
        type: 'error',
        message: `Erro ao enviar lembrete para ${student.parentName || 'Responsável'}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        createdAt: new Date(),
        read: false,
        actionTaken: false,
      });
    }
  }
  
  return remindersSent;
};
