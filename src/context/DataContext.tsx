import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our data
export type StudentData = {
  id: string;
  name: string;
  class: string;
  grade: number;
  attendance: number;
  behavior: number;
  riskLevel?: 'low' | 'medium' | 'high';
  actionItems?: string[];
  parentName?: string;
  parentContact?: string;
};

export type SurveyData = {
  studentId: string;
  movedRecently: boolean;
  bullyingConcerns: boolean;
  socialIntegration: number;
  additionalNotes?: string;
};

export type ScheduleItem = {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
};

export type AlertItem = {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: 'high-risk' | 'medium-risk' | 'low-risk' | 'survey-requested' | 'meeting-scheduled';
  message: string;
  createdAt: Date;
  read: boolean;
  actionTaken: boolean;
};

type DataContextType = {
  students: StudentData[];
  surveys: SurveyData[];
  schedules: ScheduleItem[];
  alerts: AlertItem[];
  isLoading: boolean;
  setStudents: (students: StudentData[]) => void;
  addSurvey: (survey: SurveyData) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  addAlert: (alert: AlertItem) => void;
  markAlertAsRead: (id: string) => void;
  markAlertActionTaken: (id: string) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
  generateDemoData: () => void;
  sendWhatsAppSurvey: (studentId: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addSurvey = (survey: SurveyData) => {
    setSurveys([...surveys, survey]);
  };

  const addSchedule = (schedule: ScheduleItem) => {
    setSchedules([...schedules, schedule]);
  };

  const addAlert = (alert: AlertItem) => {
    setAlerts([alert, ...alerts]);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const markAlertActionTaken = (id: string) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, actionTaken: true } : alert))
    );
  };

  const updateScheduleStatus = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    setSchedules(
      schedules.map((schedule) => (schedule.id === id ? { ...schedule, status } : schedule))
    );
  };

  const updateSchedule = (updatedSchedule: ScheduleItem) => {
    setSchedules(
      schedules.map((schedule) => 
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
  };

  const sendWhatsAppSurvey = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student || !student.parentContact) return;
    
    const message = `Olá ${student.parentName}, gostaríamos de fazer uma pesquisa sobre ${student.name}. Por favor, responda as seguintes perguntas:
    1. A família mudou de residência nos últimos 6 meses?
    2. O aluno relatou episódios de bullying ou tratamento inadequado?
    3. Como você avalia a integração social do aluno na escola? (1-5)
    4. Com que frequência o aluno enfrenta dificuldades para chegar à escola?
    5. Alguma observação adicional?`;
    
    console.log(`Simulando envio de WhatsApp para ${student.parentName}: ${student.parentContact}`);
    console.log(message);
    
    addAlert({
      id: `whatsapp-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      type: 'survey-requested',
      message: `Pesquisa diagnóstica enviada via WhatsApp para ${student.parentName} (${student.parentContact}).`,
      createdAt: new Date(),
      read: false,
      actionTaken: false,
    });
    
    setTimeout(() => {
      console.log(`Simulação: ${student.parentName} visualizou a mensagem.`);
    }, 3000);
  };

  const generateDemoData = () => {
    setIsLoading(true);
    
    const demoStudents: StudentData[] = [
      {
        id: '1',
        name: 'Ana Silva',
        class: '9A',
        grade: 5.5,
        attendance: 75,
        behavior: 3,
        riskLevel: 'high',
        actionItems: ['Contact parents', 'Schedule counseling'],
        parentName: 'Roberto Silva',
        parentContact: '(11) 98765-4321'
      },
      {
        id: '2',
        name: 'Bruno Santos',
        class: '9A',
        grade: 7.2,
        attendance: 92,
        behavior: 4,
        riskLevel: 'low',
        actionItems: ['Monitor performance'],
        parentName: 'Marta Santos',
        parentContact: '(11) 91234-5678'
      },
      {
        id: '3',
        name: 'Carla Oliveira',
        class: '9B',
        grade: 6.1,
        attendance: 81,
        behavior: 2,
        riskLevel: 'medium',
        actionItems: ['Academic support', 'Behavior intervention'],
        parentName: 'Paulo Oliveira',
        parentContact: '(11) 99876-5432'
      },
      {
        id: '4',
        name: 'Daniel Pereira',
        class: '9B',
        grade: 8.5,
        attendance: 96,
        behavior: 5,
        riskLevel: 'low',
        parentName: 'Luisa Pereira',
        parentContact: '(11) 98123-4567'
      },
      {
        id: '5',
        name: 'Elena Costa',
        class: '9C',
        grade: 4.8,
        attendance: 68,
        behavior: 3,
        riskLevel: 'high',
        actionItems: ['Parent meeting', 'Academic intervention'],
        parentName: 'Fernando Costa',
        parentContact: '(11) 99123-8765'
      },
      {
        id: '6',
        name: 'Felipe Martins',
        class: '9C',
        grade: 6.9,
        attendance: 88,
        behavior: 4,
        riskLevel: 'low',
        parentName: 'Joana Martins',
        parentContact: '(11) 97654-3210'
      },
      {
        id: '7',
        name: 'Gabriela Lima',
        class: '9A',
        grade: 5.9,
        attendance: 79,
        behavior: 3,
        riskLevel: 'medium',
        actionItems: ['Academic support'],
        parentName: 'Ricardo Lima',
        parentContact: '(11) 96543-2109'
      },
      {
        id: '8',
        name: 'Henrique Alves',
        class: '9C',
        grade: 7.8,
        attendance: 93,
        behavior: 4,
        riskLevel: 'low',
        parentName: 'Cristina Alves',
        parentContact: '(11) 95432-1098'
      }
    ];
    
    const demoAlerts: AlertItem[] = [
      {
        id: '1',
        studentId: '1',
        studentName: 'Ana Silva',
        studentClass: '9A',
        type: 'high-risk',
        message: 'Ana Silva has multiple risk factors: low grades, attendance below 80%, and behavioral issues.',
        createdAt: new Date(Date.now() - 86400000 * 2),
        read: false,
        actionTaken: false
      },
      {
        id: '2',
        studentId: '5',
        studentName: 'Elena Costa',
        studentClass: '9C',
        type: 'high-risk',
        message: 'Elena Costa has critical attendance issues (68%) and failing grades.',
        createdAt: new Date(Date.now() - 86400000),
        read: false,
        actionTaken: false
      },
      {
        id: '3',
        studentId: '3',
        studentName: 'Carla Oliveira',
        studentClass: '9B',
        type: 'medium-risk',
        message: 'Carla Oliveira has borderline grades and behavioral concerns.',
        createdAt: new Date(),
        read: false,
        actionTaken: false
      }
    ];
    
    const demoSchedules: ScheduleItem[] = [
      {
        id: '1',
        studentId: '1',
        studentName: 'Ana Silva',
        date: new Date(Date.now() + 86400000),
        agentName: 'Coord. Mariana',
        status: 'scheduled',
        notes: 'Discuss attendance and academic performance'
      },
      {
        id: '2',
        studentId: '5',
        studentName: 'Elena Costa',
        date: new Date(Date.now() + 86400000 * 3),
        agentName: 'Coord. Mariana',
        status: 'scheduled',
        notes: 'Parent meeting to address attendance issues'
      }
    ];
    
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
