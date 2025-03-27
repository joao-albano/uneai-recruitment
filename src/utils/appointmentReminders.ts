
import { ScheduleItem } from '@/types/data';
import { WhatsAppConfig, sendWhatsAppMessage, formatAppointmentDateTime } from '@/utils/whatsappIntegration';
import { WhatsAppMessage } from '@/types/whatsapp';
import { v4 as uuidv4 } from 'uuid';

// Function to check if a reminder should be sent for a schedule
export const shouldSendReminder = (schedule: ScheduleItem, reminderDays: number = 1): boolean => {
  // Only send reminders for future scheduled appointments
  if (schedule.status !== 'scheduled') {
    return false;
  }

  const now = new Date();
  const appointmentDate = new Date(schedule.date);
  
  // Calculate the date when the reminder should be sent
  const reminderDate = new Date(appointmentDate);
  reminderDate.setDate(reminderDate.getDate() - reminderDays);
  
  // Check if today is the reminder date
  return (
    now.getFullYear() === reminderDate.getFullYear() &&
    now.getMonth() === reminderDate.getMonth() &&
    now.getDate() === reminderDate.getDate()
  );
};

// Create a message with the reminder template
export const createReminderMessage = (
  schedule: ScheduleItem, 
  parentName: string, 
  parentContact: string,
  config: WhatsAppConfig
): string => {
  if (!config.templateMessages?.appointmentReminder) {
    return `Olá ${parentName}, lembramos que você tem uma reunião agendada para amanhã (${formatAppointmentDateTime(schedule.date)}) referente ao aluno ${schedule.studentName}. Contamos com sua presença!`;
  }
  
  // Replace template variables
  let message = config.templateMessages.appointmentReminder;
  message = message.replace(/{{parentName}}/g, parentName);
  message = message.replace(/{{studentName}}/g, schedule.studentName);
  message = message.replace(/{{appointmentDate}}/g, formatAppointmentDateTime(schedule.date));
  
  return message;
};

// Send reminders for all schedules that need them
export const sendAppointmentReminders = async (
  schedules: ScheduleItem[],
  students: any[],
  whatsAppConfig: WhatsAppConfig,
  addWhatsAppMessage: (message: WhatsAppMessage) => void,
  addAlert: (alert: any) => void
): Promise<void> => {
  if (!whatsAppConfig.enabled || whatsAppConfig.provider === 'disabled') {
    console.log('WhatsApp reminders are disabled');
    return;
  }
  
  const reminderDays = whatsAppConfig.reminderTiming || 1;
  
  // Find schedules that need reminders
  const schedulesNeedingReminders = schedules.filter(schedule => 
    shouldSendReminder(schedule, reminderDays)
  );
  
  console.log(`Found ${schedulesNeedingReminders.length} schedules needing reminders`);
  
  // Send reminders
  for (const schedule of schedulesNeedingReminders) {
    // Find student data
    const student = students.find(s => s.id === schedule.studentId);
    
    if (!student || !student.parentContact || !student.parentName) {
      console.log(`Missing parent contact information for student ${schedule.studentName}`);
      continue;
    }
    
    // Create reminder message
    const message = createReminderMessage(
      schedule,
      student.parentName,
      student.parentContact,
      whatsAppConfig
    );
    
    // Send WhatsApp message
    try {
      const result = await sendWhatsAppMessage(
        whatsAppConfig,
        student.parentContact,
        message
      );
      
      // Create message record
      const whatsAppMessage: WhatsAppMessage = {
        id: uuidv4(),
        studentId: student.id,
        studentName: student.name,
        parentName: student.parentName,
        to: student.parentContact,
        recipientNumber: student.parentContact,
        messageType: 'notification',
        status: result.success ? 'sent' : 'failed',
        createdAt: new Date(),
        message: message,
        errorMessage: result.success ? undefined : result.message
      };
      
      // Add to history
      addWhatsAppMessage(whatsAppMessage);
      
      // Add alert
      addAlert({
        id: `reminder-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        studentClass: student.class || '',
        type: 'meeting-scheduled',
        message: `Lembrete de agendamento enviado para ${student.parentName} (${student.parentContact})`,
        createdAt: new Date(),
        read: false,
        actionTaken: false,
      });
      
      console.log(`Reminder sent for ${schedule.studentName}'s appointment on ${formatAppointmentDateTime(schedule.date)}`);
    } catch (error) {
      console.error('Error sending reminder:', error);
    }
  }
};
