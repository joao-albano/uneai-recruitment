
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { WhatsAppMessage } from '@/types/whatsapp';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { sendWhatsAppSurvey as sendWhatsAppSurveyUtil } from '@/utils/notifications';
import { StudentData } from '@/types/data';
import { processStudentsForAutomatedSurveys } from '@/utils/automatedSurveys';
import { sendAppointmentReminders } from '@/utils/appointmentReminders';
import { useStudents } from '@/context/students/StudentsContext';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useAlerts } from '@/context/alerts/AlertsContext';

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
  sendWhatsAppSurvey: (student: StudentData, addAlert: any) => void;
  runAutomatedSurveys: () => void;
  runAppointmentReminders: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { config: whatsAppConfig } = useWhatsAppConfig();
  const { messages: whatsAppMessages, addMessage: addWhatsAppMessage } = useWhatsAppHistory();
  const { students } = useStudents();
  const { schedules } = useSchedules();
  const { addAlert } = useAlerts();

  const sendWhatsAppSurvey = (student: StudentData, addAlert: any) => {
    if (student) {
      sendWhatsAppSurveyUtil(student, addAlert, addWhatsAppMessage, whatsAppConfig);
    }
  };

  // Função para executar o processamento automático de pesquisas
  const runAutomatedSurveys = () => {
    processStudentsForAutomatedSurveys(
      students,
      addAlert,
      addWhatsAppMessage,
      whatsAppConfig
    );
  };

  // Function to run appointment reminders
  const runAppointmentReminders = () => {
    sendAppointmentReminders(
      schedules,
      students,
      whatsAppConfig,
      addWhatsAppMessage,
      addAlert
    );
  };

  // Execute automated processing periodically (every 24h)
  useEffect(() => {
    if (whatsAppConfig.provider !== 'disabled' && students.length > 0) {
      // Run on initialization - for demo purposes only
      // In production, you might want to use a more robust scheduler
      const timeoutId = setTimeout(() => {
        runAutomatedSurveys();
        runAppointmentReminders();
      }, 5000); // Run after 5 seconds for demonstration
      
      // Set up interval to check daily
      const intervalId = setInterval(() => {
        runAutomatedSurveys();
        runAppointmentReminders();
      }, 24 * 60 * 60 * 1000); // 24 hours
      
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [whatsAppConfig.provider, students, schedules]);

  const value = {
    whatsAppConfig,
    whatsAppMessages,
    addWhatsAppMessage,
    sendWhatsAppSurvey,
    runAutomatedSurveys,
    runAppointmentReminders,
  };

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
};
