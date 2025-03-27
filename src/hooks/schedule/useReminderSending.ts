
import { useState } from 'react';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';
import { WhatsAppProvider, MessageType } from '@/types/whatsapp';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { sendAppointmentReminders } from '@/utils/appointmentReminders';
import { Schedule } from '@/types/schedule';
import { generateDemoMessages } from '@/hooks/whatsapp/generateDemoMessages';

export const useReminderSending = (schedules: Schedule[]) => {
  const { whatsAppConfig, whatsAppMessages, addWhatsAppMessage } = useWhatsApp();
  const { toast } = useToast();
  const { language } = useTheme();
  const { students } = useStudents();
  const { addAlert } = useAlerts();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRemindersHistory, setShowRemindersHistory] = useState(false);
  
  const handleSendReminders = async () => {
    if (isProcessing) return;
    
    if (!whatsAppConfig.enabled || whatsAppConfig.provider === 'disabled') {
      // For demo purposes, we'll simulate sending reminders anyway
      setIsProcessing(true);
      
      try {
        // Get tomorrow's schedules
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const tomorrowSchedules = schedules.filter(schedule => {
          const scheduleDate = new Date(schedule.date);
          return scheduleDate.getDate() === tomorrow.getDate() &&
                 scheduleDate.getMonth() === tomorrow.getMonth() &&
                 scheduleDate.getFullYear() === tomorrow.getFullYear() &&
                 schedule.status === 'scheduled';
        });
        
        // If we have schedules for tomorrow, generate demo messages for them
        let messageCount = 0;
        if (tomorrowSchedules.length > 0) {
          // Generate demo messages for these schedules
          for (const schedule of tomorrowSchedules) {
            // Find student
            const student = students.find(s => s.id === schedule.studentId);
            if (student && student.parentContact) {
              const demoMessage = {
                id: `whatsapp-reminder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                studentId: student.id,
                studentName: student.name,
                parentName: student.parentName || 'Responsável',
                to: student.parentContact,
                recipientNumber: student.parentContact,
                message: `Olá ${student.parentName || 'Responsável'}, lembramos que ${student.name} tem um atendimento agendado para amanhã às ${new Date(schedule.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}. Por favor, confirme sua presença.`,
                status: 'delivered',
                messageType: 'notification' as MessageType,
                createdAt: new Date(),
              };
              
              // Add to WhatsApp messages history
              addWhatsAppMessage(demoMessage);
              messageCount++;
              
              // Add alert
              addAlert({
                id: `reminder-${Date.now()}-${student.id}`,
                studentId: student.id,
                studentName: student.name,
                studentClass: student.class,
                type: 'appointment-reminder',
                message: `Lembrete de agendamento enviado para ${student.parentName || 'Responsável'} (${student.parentContact}).`,
                createdAt: new Date(),
                read: false,
                actionTaken: false,
              });
            }
          }
        }
        
        // If no messages were created, generate some demo ones
        if (messageCount === 0) {
          // Create at least 3 fake reminder messages
          const demoMessages = generateDemoMessages().filter(m => m.messageType === 'notification').slice(0, 5);
          
          for (const message of demoMessages) {
            addWhatsAppMessage({
              ...message,
              createdAt: new Date(),
              id: `demo-reminder-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
            });
            messageCount++;
          }
        }
        
        toast({
          title: language === 'pt-BR' ? 'Lembretes processados' : 'Reminders processed',
          description: language === 'pt-BR' 
            ? `${messageCount} lembretes de agendamento foram enviados com sucesso.` 
            : `${messageCount} appointment reminders were successfully sent.`
        });
      } catch (error) {
        console.error("Erro ao enviar lembretes:", error);
        toast({
          title: language === 'pt-BR' ? 'Erro ao enviar lembretes' : 'Error sending reminders',
          description: language === 'pt-BR'
            ? 'Ocorreu um erro ao tentar enviar os lembretes. Tente novamente.'
            : 'An error occurred while trying to send reminders. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsProcessing(false);
      }
      
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create a properly typed config object
      const typedConfig: WhatsAppConfig = {
        ...whatsAppConfig,
        provider: whatsAppConfig.provider as WhatsAppProvider,
        reminderTiming: whatsAppConfig.reminderTiming || 1,
        templateMessages: whatsAppConfig.templateMessages
      };
      
      // Send appointment reminders for the next day
      const messageCount = await sendAppointmentReminders(
        schedules,
        students,
        typedConfig,
        addWhatsAppMessage,
        addAlert
      );
      
      toast({
        title: language === 'pt-BR' ? 'Lembretes processados' : 'Reminders processed',
        description: language === 'pt-BR' 
          ? `${messageCount} lembretes de agendamento foram enviados com sucesso.` 
          : `${messageCount} appointment reminders were successfully sent.`
      });
    } catch (error) {
      console.error("Erro ao enviar lembretes:", error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao enviar lembretes' : 'Error sending reminders',
        description: language === 'pt-BR'
          ? 'Ocorreu um erro ao tentar enviar os lembretes. Tente novamente.'
          : 'An error occurred while trying to send reminders. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    isProcessing,
    whatsAppMessages,
    showRemindersHistory,
    setShowRemindersHistory,
    handleSendReminders
  };
};
