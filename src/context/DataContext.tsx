
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAlertsState } from '@/hooks/useAlertsState';
import { useSchedulesState } from '@/hooks/useSchedulesState';
import { StudentData, SurveyData, ScheduleItem, AlertItem, DataContextType } from '@/types/data';
import { sendWhatsAppSurvey as sendWhatsAppSurveyUtil } from '@/utils/notifications';
import { generateDemoStudents, generateDemoAlerts, generateDemoSchedules } from '@/data/demoData';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use our custom hooks for alerts and schedules
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

  const addSurvey = (survey: SurveyData) => {
    setSurveys([...surveys, survey]);
  };

  const sendWhatsAppSurvey = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      sendWhatsAppSurveyUtil(student, addAlert);
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
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const value = {
    students,
    surveys,
    schedules,
    alerts,
    isLoading,
    setStudents,
    addSurvey,
    addSchedule,
    addAlert,
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

// Re-export types for convenience
export type { StudentData, SurveyData, ScheduleItem, AlertItem };
