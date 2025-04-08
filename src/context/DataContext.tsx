import React, { useContext, useCallback, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStudents } from './students/StudentsContext';
import { useAlerts } from './alerts/AlertsContext';
import { useSchedules } from './schedules/SchedulesContext';
import { useSurveys } from './surveys/SurveysContext';
import { useUploads } from './uploads/UploadsContext';
import { useWhatsApp } from './whatsapp/WhatsAppContext';
import { useAppState } from './app/AppStateContext';
import { processSurveyForRisk } from '@/utils/riskCalculator';
import { DataContextType, AlertItem, StudentData } from '@/types/data';
import { generateDemoAlerts } from '@/data/demoAlerts';

// Main context combining all sub-contexts
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get state and methods from individual context providers
  const { students, setStudents, addStudent, updateStudent, deleteStudent } = useStudents();
  const { alerts, setAlerts, addAlert, markAlertAsRead, markAlertActionTaken } = useAlerts();
  const { schedules, setSchedules, addSchedule, updateScheduleStatus, updateSchedule } = useSchedules();
  const { surveys, addSurvey } = useSurveys();
  const { uploadHistory, addUploadRecord, clearUploadHistory } = useUploads();
  const { whatsAppConfig, whatsAppMessages, addWhatsAppMessage, sendWhatsAppSurvey } = useWhatsApp();
  const { isLoading, generateDemoData: appStateGenerateDemoData } = useAppState();

  // Custom generateDemoData that ensures alerts are loaded
  const generateDemoData = useCallback(() => {
    console.log("Generating demo data including alerts...");
    // Call the app state demo data generator
    appStateGenerateDemoData();
    
    // Make sure we have alerts
    if (alerts.length === 0) {
      console.log("No alerts found, loading demo alerts");
      const demoAlerts = generateDemoAlerts();
      setAlerts(demoAlerts);
      console.log(`Loaded ${demoAlerts.length} demo alerts`);
    }
  }, [alerts.length, appStateGenerateDemoData, setAlerts]);

  // Process survey with risk model
  const processSurveyWithRiskModel = useCallback((survey: any) => {
    const student = students.find(s => s.id === survey.studentId);
    
    if (!student) {
      console.error('Estudante não encontrado para processar pesquisa:', survey.studentId);
      return;
    }
    
    // Process the survey using the risk model
    const updatedStudent = processSurveyForRisk(student, survey);
    
    // Update the student in the list
    updateStudent(updatedStudent);
    
    // Create an alert if the risk level changed
    if (updatedStudent.riskLevel !== student.riskLevel) {
      let riskType: 'high-risk' | 'medium-risk' | 'low-risk';
      
      switch (updatedStudent.riskLevel) {
        case 'high':
          riskType = 'high-risk';
          break;
        case 'medium':
          riskType = 'medium-risk';
          break;
        default:
          riskType = 'low-risk';
      }
      
      addAlert({
        id: uuidv4(),
        studentId: updatedStudent.id,
        studentName: updatedStudent.name,
        studentClass: updatedStudent.class,
        type: riskType,
        message: `Nível de risco atualizado para ${updatedStudent.riskLevel === 'high' ? 'ALTO' : updatedStudent.riskLevel === 'medium' ? 'MÉDIO' : 'BAIXO'} com base na pesquisa diagnóstica.`,
        createdAt: new Date(),
        read: false,
        actionTaken: false,
      });
    }
  }, [students, updateStudent, addAlert]);

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
        sendWhatsAppSurvey: (studentId: string) => {
          const student = students.find(s => s.id === studentId);
          if (student) {
            sendWhatsAppSurvey(student, addAlert);
          }
        },
        addStudent,
        updateStudent,
        deleteStudent,
        processSurveyWithRiskModel
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

export type { StudentData } from '@/types/data';
