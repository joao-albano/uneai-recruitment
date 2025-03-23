
import React, { createContext, useContext, ReactNode } from 'react';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { WhatsAppMessage } from '@/types/whatsapp';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { sendWhatsAppSurvey as sendWhatsAppSurveyUtil } from '@/utils/notifications';
import { StudentData } from '@/types/data';

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
  sendWhatsAppSurvey: (student: StudentData, addAlert: any) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { config: whatsAppConfig } = useWhatsAppConfig();
  const { messages: whatsAppMessages, addMessage: addWhatsAppMessage } = useWhatsAppHistory();

  const sendWhatsAppSurvey = (student: StudentData, addAlert: any) => {
    if (student) {
      sendWhatsAppSurveyUtil(student, addAlert, addWhatsAppMessage, whatsAppConfig);
    }
  };

  const value = {
    whatsAppConfig,
    whatsAppMessages,
    addWhatsAppMessage,
    sendWhatsAppSurvey,
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
