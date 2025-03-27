
import { useState } from 'react';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';
import { WhatsAppProvider } from '@/types/whatsapp';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { sendAppointmentReminders } from '@/utils/appointmentReminders';
import { Schedule } from '@/types/schedule';

export const useReminderSending = (schedules: Schedule[]) => {
  const { whatsAppConfig, whatsAppMessages } = useWhatsApp();
  const { toast } = useToast();
  const { language } = useTheme();
  const { students } = useStudents();
  const { addAlert } = useAlerts();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRemindersHistory, setShowRemindersHistory] = useState(false);
  
  const handleSendReminders = async () => {
    if (isProcessing) return;
    
    if (!whatsAppConfig.enabled || whatsAppConfig.provider === 'disabled') {
      toast({
        title: language === 'pt-BR' ? 'WhatsApp desativado' : 'WhatsApp disabled',
        description: language === 'pt-BR' 
          ? 'Ative a integração com WhatsApp nas configurações para enviar lembretes.' 
          : 'Enable WhatsApp integration in settings to send reminders.',
        variant: 'destructive'
      });
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
        (message) => {
          // Add message to WhatsApp history
          console.log("Mensagem enviada:", message);
        },
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
