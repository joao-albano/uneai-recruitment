
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { StudentData, AlertItem } from '@/types/data';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { WhatsAppMessage } from '@/types/whatsapp';
import type { WhatsAppProvider as WhatsAppProviderType } from '@/types/whatsapp';
import { processStudentsForAutomatedSurveys } from '@/utils/automatedSurveys';
import { sendWhatsAppSurvey as sendSurveyToWhatsApp } from '@/utils/notifications';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';

interface WhatsAppConfig {
  enabled: boolean;
  provider: WhatsAppProviderType;
  apiKey?: string;
}

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  setWhatsAppConfig: (config: WhatsAppConfig) => void;
  runAppointmentReminders: () => void;
  runAutomatedSurveys: () => void;
  sendWhatsAppSurvey: (student: StudentData, addAlert: (alert: AlertItem) => void) => void;
  whatsAppMessages: WhatsAppMessage[];
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>({
    enabled: false,
    provider: 'disabled' as WhatsAppProviderType,
    apiKey: ''
  });
  
  const { schedules } = useSchedules();
  const { toast } = useToast();
  const { messages: whatsAppMessages, addMessage } = useWhatsAppHistory();
  const { config } = useWhatsAppConfig();
  const { students } = useStudents();
  const { addAlert } = useAlerts();
  
  // Simular envio de lembretes de agendamentos
  const runAppointmentReminders = () => {
    // Filtrar agendamentos para amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const tomorrowSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === tomorrow.getDate() &&
             scheduleDate.getMonth() === tomorrow.getMonth() &&
             scheduleDate.getFullYear() === tomorrow.getFullYear() &&
             schedule.status === 'scheduled';
    });
    
    // Simular envio de mensagens
    if (tomorrowSchedules.length > 0) {
      toast({
        title: 'Lembretes enviados',
        description: `${tomorrowSchedules.length} lembretes enviados para agendamentos de amanhã.`
      });
    } else {
      toast({
        title: 'Nenhum lembrete enviado',
        description: 'Não há agendamentos para amanhã.',
        variant: 'default'
      });
    }
    
    return tomorrowSchedules.length;
  };

  // Executar pesquisas automatizadas
  const runAutomatedSurveys = () => {
    processStudentsForAutomatedSurveys(students, addAlert, addMessage, config);
    return true;
  };

  // Enviar pesquisa de WhatsApp para um estudante específico
  const sendWhatsAppSurvey = (student: StudentData, alertFunction: (alert: AlertItem) => void) => {
    sendSurveyToWhatsApp(student, alertFunction, addMessage, config);
  };
  
  return (
    <WhatsAppContext.Provider value={{ 
      whatsAppConfig, 
      setWhatsAppConfig,
      runAppointmentReminders,
      runAutomatedSurveys,
      sendWhatsAppSurvey,
      whatsAppMessages
    }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
};
