
import React, { createContext, useContext, useState } from 'react';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppMessage } from '@/types/whatsapp';

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
}

const defaultWhatsAppConfig: WhatsAppConfig = {
  provider: 'disabled',
  apiKey: '',
  enabled: false,
  templateMessages: {
    introduction: 'Olá {{parentName}}, somos do Colégio XYZ. Estamos realizando uma pesquisa rápida sobre o {{studentName}}.',
    followUp: 'Você poderia responder algumas perguntas? É bem rápido, prometo!',
    thankYou: 'Muito obrigado pela sua participação! Suas respostas são muito importantes para nós.',
    surveyQuestion1: 'O {{studentName}} mudou de escola recentemente? (Sim/Não)',
    surveyQuestion2: 'Vocês têm preocupações com bullying ou problemas sociais? (Sim/Não)',
    surveyQuestion3: 'De 1 a 10, como você avalia a adaptação social do {{studentName}} na escola?',
    appointmentReminder: 'Olá {{parentName}}, lembramos que você tem uma reunião agendada para amanhã ({{appointmentDate}}) referente ao aluno {{studentName}}. Contamos com sua presença!'
  }
};

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsAppConfig] = useState<WhatsAppConfig>(defaultWhatsAppConfig);
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessage[]>([]);

  const addWhatsAppMessage = (message: WhatsAppMessage) => {
    setWhatsAppMessages(prev => [...prev, message]);
  };

  return (
    <WhatsAppContext.Provider value={{
      whatsAppConfig,
      whatsAppMessages,
      addWhatsAppMessage
    }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
};
