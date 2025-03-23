import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAlertsState } from '@/hooks/useAlertsState';
import { useSchedulesState } from '@/hooks/useSchedulesState';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { StudentData, SurveyData, ScheduleItem, AlertItem, DataContextType } from '@/types/data';
import { UploadRecord } from '@/types/upload';
import { sendWhatsAppSurvey as sendWhatsAppSurveyUtil } from '@/utils/notifications';
import { generateDemoStudents, generateDemoAlerts, generateDemoSchedules } from '@/data/demoData';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([]);
  
  const { 
    alerts, 
    setAlerts, 
    addAlert, 
    markAlertAsRead, 
    markAlertActionTaken 
  } = useAlertsState();
  
  const { 
    schedules, 
    setSchedules, 
    addSchedule, 
    updateScheduleStatus, 
    updateSchedule 
  } = useSchedulesState();
  
  const { config: whatsAppConfig } = useWhatsAppConfig();

  const addSurvey = (survey: SurveyData) => {
    setSurveys([...surveys, survey]);
  };

  const addUploadRecord = (record: Omit<UploadRecord, 'id'>) => {
    const newRecord: UploadRecord = {
      ...record,
      id: `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    setUploadHistory([newRecord, ...uploadHistory]);
  };

  const clearUploadHistory = () => {
    setUploadHistory([]);
  };

  const sendWhatsAppSurvey = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      sendWhatsAppSurveyUtil(student, addAlert, whatsAppConfig);
    }
  };

  const generateDemoData = () => {
    setIsLoading(true);
    
    const demoStudents = generateDemoStudents();
    const demoAlerts = generateDemoAlerts();
    const demoSchedules = generateDemoSchedules();
    
    setStudents(demoStudents);
    setAlerts(demoAlerts);
    setSchedules(demoSchedules);
    
    addUploadRecord({
      filename: 'demo_dados.csv',
      uploadDate: new Date(Date.now() - 86400000), // yesterday
      recordCount: demoStudents.length,
      status: 'success'
    });
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const value = {
    students,
    surveys,
    schedules,
    alerts,
    uploadHistory,
    isLoading,
    setStudents,
    addSurvey,
    addSchedule,
    addAlert,
    addUploadRecord,
    clearUploadHistory,
    markAlertAsRead,
    markAlertActionTaken,
    updateScheduleStatus,
    updateSchedule,
    generateDemoData,
    sendWhatsAppSurvey
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export type { StudentData, SurveyData, ScheduleItem, AlertItem, UploadRecord };
