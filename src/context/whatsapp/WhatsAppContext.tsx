
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { WhatsAppMessage } from '@/types/whatsapp';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { sendWhatsAppSurvey as sendWhatsAppSurveyUtil } from '@/utils/notifications';
import { StudentData } from '@/types/data';
import { processStudentsForAutomatedSurveys } from '@/utils/automatedSurveys';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
  sendWhatsAppSurvey: (student: StudentData, addAlert: any) => void;
  runAutomatedSurveys: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { config: whatsAppConfig } = useWhatsAppConfig();
  const { messages: whatsAppMessages, addMessage: addWhatsAppMessage } = useWhatsAppHistory();
  const { students } = useStudents();
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

  // Executa o processamento automático periodicamente (a cada 24h)
  useEffect(() => {
    if (whatsAppConfig.provider !== 'disabled' && students.length > 0) {
      // Executa na inicialização - apenas para fins de demonstração
      // Em produção, você pode querer usar um agendador mais robusto
      const timeoutId = setTimeout(() => {
        runAutomatedSurveys();
      }, 5000); // Executa após 5 segundos para demonstração
      
      // Configura um intervalo para verificar diariamente
      const intervalId = setInterval(() => {
        runAutomatedSurveys();
      }, 24 * 60 * 60 * 1000); // 24 horas
      
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [whatsAppConfig.provider, students]);

  const value = {
    whatsAppConfig,
    whatsAppMessages,
    addWhatsAppMessage,
    sendWhatsAppSurvey,
    runAutomatedSurveys,
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
