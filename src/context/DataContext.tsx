
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { demoStudents } from '@/data/demoStudents';
import { demoAlerts } from '@/data/demoAlerts';
import { demoSchedules } from '@/data/demoSchedules';
import { 
  StudentData, 
  SurveyData, 
  ScheduleItem, 
  AlertItem, 
  UploadRecord,
  DataContextType,
  Student
} from '@/types/data';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppMessage } from '@/types/whatsapp';

const defaultWhatsAppConfig: WhatsAppConfig = {
  phoneNumber: '',
  apiKey: '',
  enabled: false,
  templateMessages: {
    introduction: 'Olá {{parentName}}, somos do Colégio XYZ. Estamos realizando uma pesquisa rápida sobre o {{studentName}}.',
    followUp: 'Você poderia responder algumas perguntas? É bem rápido, prometo!',
    thankYou: 'Muito obrigado pela sua participação! Suas respostas são muito importantes para nós.',
    surveyQuestion1: 'O {{studentName}} mudou de escola recentemente? (Sim/Não)',
    surveyQuestion2: 'Vocês têm preocupações com bullying ou problemas sociais? (Sim/Não)',
    surveyQuestion3: 'De 1 a 10, como você avalia a adaptação social do {{studentName}} na escola?'
  }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>(defaultWhatsAppConfig);
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessage[]>([]);

  const addSurvey = (survey: SurveyData) => {
    setSurveys(prev => [...prev, survey]);
  };

  const addSchedule = (schedule: ScheduleItem) => {
    setSchedules(prev => [...prev, schedule]);
  };

  const addAlert = (alert: AlertItem) => {
    setAlerts(prev => [...prev, alert]);
  };

  const addWhatsAppMessage = (message: WhatsAppMessage) => {
    setWhatsAppMessages(prev => [...prev, message]);
  };

  const addUploadRecord = (record: Omit<UploadRecord, 'id'>) => {
    setUploadHistory(prev => [
      ...prev,
      { ...record, id: uuidv4() }
    ]);
  };

  const clearUploadHistory = () => {
    setUploadHistory([]);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, read: true } 
          : alert
      )
    );
  };

  const markAlertActionTaken = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, actionTaken: true } 
          : alert
      )
    );
  };

  const updateScheduleStatus = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, status } 
          : schedule
      )
    );
  };

  const updateSchedule = (updatedSchedule: ScheduleItem) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === updatedSchedule.id 
          ? updatedSchedule 
          : schedule
      )
    );
  };
  
  // Métodos CRUD para estudantes
  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };
  
  const updateStudent = (student: Student) => {
    setStudents(prev => 
      prev.map(s => s.id === student.id ? student : s)
    );
  };
  
  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const generateDemoData = useCallback(() => {
    setIsLoading(true);
    setStudents(demoStudents);
    setAlerts(demoAlerts);
    setSchedules(demoSchedules);
    setIsLoading(false);
  }, []);

  const sendWhatsAppSurvey = (studentId: string) => {
    // Find the student
    const student = students.find(s => s.id === studentId);
    if (!student || !student.parentContact) return;
    
    // Create a dummy message for the demo
    const message: WhatsAppMessage = {
      id: uuidv4(),
      studentId: student.id,
      studentName: student.name,
      parentName: student.parentName || "Responsável",
      phoneNumber: student.parentContact,
      messageType: 'survey',
      status: 'sent',
      sentAt: new Date(),
      content: `Olá ${student.parentName || "Responsável"}, gostaríamos de fazer uma pesquisa sobre ${student.name}.`,
    };
    
    // Add the message to the context
    addWhatsAppMessage(message);
    
    // Add a new alert
    addAlert({
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

  return (
    <DataContext.Provider
      value={{
        students,
        surveys,
        schedules,
        alerts,
        uploadHistory,
        isLoading,
        whatsAppConfig,
        whatsAppMessages,
        setStudents,
        addSurvey,
        addSchedule,
        addAlert,
        addWhatsAppMessage,
        addUploadRecord,
        clearUploadHistory,
        markAlertAsRead,
        markAlertActionTaken,
        updateScheduleStatus,
        updateSchedule,
        generateDemoData,
        sendWhatsAppSurvey,
        // Métodos CRUD de estudantes
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
