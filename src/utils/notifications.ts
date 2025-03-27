
import { v4 as uuidv4 } from 'uuid';
import { StudentData, AlertItem } from '@/types/data';
import { WhatsAppMessage } from '@/types/whatsapp';
import { WhatsAppConfig, sendWhatsAppMessage, generateTemplateMessage } from './whatsappIntegration';

// Send WhatsApp survey to a specific student
export const sendWhatsAppSurvey = (
  student: StudentData,
  addAlert: (alert: AlertItem) => void,
  addWhatsAppMessage: (message: WhatsAppMessage) => void,
  whatsAppConfig: WhatsAppConfig
) => {
  if (!student || !student.parentContact) return;
  
  // Create template message
  const messageContent = generateTemplateMessage(
    whatsAppConfig.templateMessages?.introduction || '',
    student
  );
  
  // Create record of message
  const message: WhatsAppMessage = {
    id: uuidv4(),
    studentId: student.id,
    studentName: student.name,
    parentName: student.parentName || "Responsável",
    to: student.parentContact, 
    recipientNumber: student.parentContact,
    messageType: 'survey',
    status: 'sent',
    sentAt: new Date(),
    createdAt: new Date(),
    message: messageContent,
    content: messageContent,
  };
  
  // Add to message history
  addWhatsAppMessage(message);
  
  // Try to send message through configured provider
  if (whatsAppConfig.enabled && whatsAppConfig.provider !== 'disabled') {
    sendWhatsAppMessage(whatsAppConfig, student.parentContact, messageContent)
      .catch(error => console.error('Error sending WhatsApp message:', error));
  }
  
  // Create alert for the sent survey
  addAlert({
    id: uuidv4(),
    studentId: student.id,
    studentName: student.name, 
    studentClass: student.class || '',
    type: 'survey-requested',
    message: `Pesquisa enviada para o responsável de ${student.name}`,
    createdAt: new Date(),
    read: false,
    actionTaken: false,
  });
};

// Send appointment reminder message
export const sendAppointmentReminder = (
  student: StudentData,
  appointmentDate: Date,
  addAlert: (alert: AlertItem) => void,
  addWhatsAppMessage: (message: WhatsAppMessage) => void,
  whatsAppConfig: WhatsAppConfig
) => {
  if (!student || !student.parentContact) return;
  
  // Create template message
  const messageContent = generateTemplateMessage(
    whatsAppConfig.templateMessages?.appointmentReminder || '',
    student,
    appointmentDate
  );
  
  // Create record of message
  const message: WhatsAppMessage = {
    id: uuidv4(),
    studentId: student.id,
    studentName: student.name,
    parentName: student.parentName || "Responsável",
    to: student.parentContact,
    recipientNumber: student.parentContact,
    messageType: 'notification',
    status: 'sent',
    sentAt: new Date(),
    createdAt: new Date(),
    message: messageContent,
    content: messageContent,
  };
  
  // Add to message history
  addWhatsAppMessage(message);
  
  // Try to send message through configured provider
  if (whatsAppConfig.enabled && whatsAppConfig.provider !== 'disabled') {
    sendWhatsAppMessage(whatsAppConfig, student.parentContact, messageContent)
      .catch(error => console.error('Error sending appointment reminder:', error));
  }
  
  // Create alert for the sent reminder
  addAlert({
    id: uuidv4(),
    studentId: student.id,
    studentName: student.name,
    studentClass: student.class || '',
    type: 'appointment-reminder',
    message: `Lembrete de agendamento enviado para o responsável de ${student.name}`,
    createdAt: new Date(),
    read: false,
    actionTaken: false,
  });
};
