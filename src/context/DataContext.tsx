
import React, { createContext, useContext, ReactNode } from 'react';
import { StudentsProvider, useStudents } from './students/StudentsContext';
import { SurveysProvider, useSurveys } from './surveys/SurveysContext';
import { SchedulesProvider, useSchedules } from './schedules/SchedulesContext';
import { useAlerts } from './alerts/AlertsContext';
import { UploadsProvider, useUploads } from './uploads/UploadsContext';
import { WhatsAppProvider, useWhatsApp } from './whatsapp/WhatsAppContext';
import { useAppState } from './app/AppStateContext';
import { StudentData, SurveyData, ScheduleItem, AlertItem, UploadRecord } from '@/types/data';
import { WhatsAppMessage } from '@/types/whatsapp';

// Combined context type that matches the original DataContextType
export type DataContextType = {
  students: StudentData[];
  surveys: SurveyData[];
  schedules: ScheduleItem[];
  alerts: AlertItem[];
  uploadHistory: UploadRecord[];
  isLoading: boolean;
  whatsAppConfig: any;
  whatsAppMessages: WhatsAppMessage[];
  setStudents: (students: StudentData[]) => void;
  addSurvey: (survey: SurveyData) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  addAlert: (alert: AlertItem) => void;
  addWhatsAppMessage: (message: WhatsAppMessage) => void;
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void;
  clearUploadHistory: () => void;
  markAlertAsRead: (id: string) => void;
  markAlertActionTaken: (id: string) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
  generateDemoData: () => void;
  sendWhatsAppSurvey: (studentId: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StudentsProvider>
      <SurveysProvider>
        <SchedulesProvider>
          <UploadsProvider>
            <WhatsAppProvider>
              <DataProviderInner>{children}</DataProviderInner>
            </WhatsAppProvider>
          </UploadsProvider>
        </SchedulesProvider>
      </SurveysProvider>
    </StudentsProvider>
  );
};

// Inner provider that combines all contexts
const DataProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { students, setStudents } = useStudents();
  const { surveys, addSurvey } = useSurveys();
  const { schedules, addSchedule, updateScheduleStatus, updateSchedule, setSchedules } = useSchedules();
  const { alerts, addAlert, markAlertAsRead, markAlertActionTaken, setAlerts } = useAlerts();
  const { uploadHistory, addUploadRecord, clearUploadHistory } = useUploads();
  const { whatsAppConfig, whatsAppMessages, addWhatsAppMessage, sendWhatsAppSurvey: sendWhatsAppSurveyToStudent } = useWhatsApp();
  const { isLoading, generateDemoData } = useAppState();

  // Adapt the sendWhatsAppSurvey function to match the original signature
  const sendWhatsAppSurvey = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      sendWhatsAppSurveyToStudent(student, addAlert);
    }
  };

  const value: DataContextType = {
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

export type { StudentData, SurveyData, ScheduleItem, AlertItem, UploadRecord, WhatsAppMessage };
