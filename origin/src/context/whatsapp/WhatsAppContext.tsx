
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Student, AlertItem } from '@/types/data';
import { processStudentsForAutomatedSurveys } from '@/utils/automatedSurveys';
import { useStudents } from '../students/StudentsContext';
import { useAlerts } from '../alerts/AlertsContext';

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
  sendWhatsAppSurvey: (student: Student, addAlert: (alert: AlertItem) => void) => void;
  runAutomatedSurveys: () => void;
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
  const { students } = useStudents();
  const { addAlert } = useAlerts();

  const addWhatsAppMessage = (message: WhatsAppMessage) => {
    setWhatsAppMessages(prev => [...prev, message]);
  };

  // Send WhatsApp survey to a specific student
  const sendWhatsAppSurvey = (student: Student, addAlertFn = addAlert) => {
    if (!student || !student.parentContact) return;
    
    const message = {
      id: uuidv4(),
      studentId: student.id,
      studentName: student.name,
      parentName: student.parentName || "Responsável",
      to: student.parentContact,
      recipientNumber: student.parentContact,
      messageType: 'survey' as const,
      status: 'sent' as const,
      sentAt: new Date(),
      createdAt: new Date(),
      message: `Olá ${student.parentName || "Responsável"}, gostaríamos de fazer uma pesquisa sobre ${student.name}.`,
      content: `Olá ${student.parentName || "Responsável"}, gostaríamos de fazer uma pesquisa sobre ${student.name}.`,
    };
    
    addWhatsAppMessage(message);
    
    addAlertFn({
      id: uuidv4(),
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      type: 'survey-requested',
      message: `Pesquisa enviada para o responsável de ${student.name}`,
      createdAt: new Date(),
      read: false,
      actionTaken: false,
    });
  };

  // Run automated surveys for high-risk students
  const runAutomatedSurveys = () => {
    processStudentsForAutomatedSurveys(
      students,
      addAlert,
      addWhatsAppMessage,
      whatsAppConfig
    );
  };

  return (
    <WhatsAppContext.Provider value={{
      whatsAppConfig,
      whatsAppMessages,
      addWhatsAppMessage,
      sendWhatsAppSurvey,
      runAutomatedSurveys
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
