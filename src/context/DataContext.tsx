
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
import { Alert } from '@/types/alert';
import { DataContextType } from '@/types/data';

// Main context combining all sub-contexts
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get state and methods from individual context providers
  const { students, setStudents, addStudent, updateStudent, deleteStudent } = useStudents();
  const { alerts, setAlerts, addAlert, markAlertAsRead, markAlertActionTaken } = useAlerts();
  const { schedules, setSchedules, addSchedule, updateScheduleStatus, updateSchedule } = useSchedules();
  const { surveys, addSurvey } = useSurveys();
  const { uploadHistory, addUploadRecord, clearUploadHistory } = useUploads();
  const { whatsAppConfig, whatsAppMessages, addWhatsAppMessage } = useWhatsApp();
  const { isLoading, generateDemoData } = useAppState();

  // Process survey with risk model
  const processSurveyWithRiskModel = useCallback((survey: SurveyData) => {
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

  // Send WhatsApp survey
  const sendWhatsAppSurvey = useCallback((studentId: string) => {
    const student = students.find(s => s.id === studentId);
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
  }, [students, addWhatsAppMessage, addAlert]);

  // Convert AlertItem[] to Alert[] by formatting createdAt to string
  const formattedAlerts: Alert[] = alerts.map(alert => ({
    ...alert,
    createdAt: alert.createdAt instanceof Date ? alert.createdAt.toISOString() : alert.createdAt
  }));

  return (
    <DataContext.Provider
      value={{
        students,
        surveys,
        schedules,
        alerts: formattedAlerts,
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
