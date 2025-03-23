
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

export type UploadRecord = {
  id: string;
  filename: string;
  uploadDate: Date;
  recordCount: number;
  status: 'success' | 'error';
  errorCount?: number;
};

export type DataContextType = {
  students: StudentData[];
  surveys: SurveyData[];
  schedules: ScheduleItem[];
  alerts: AlertItem[];
  uploadHistory: UploadRecord[];
  isLoading: boolean;
  setStudents: (students: StudentData[]) => void;
  addSurvey: (survey: SurveyData) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  addAlert: (alert: AlertItem) => void;
  addUploadRecord: (record: Omit<UploadRecord, 'id'>) => void;
  clearUploadHistory: () => void;
  markAlertAsRead: (id: string) => void;
  markAlertActionTaken: (id: string) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
  generateDemoData: () => void;
  sendWhatsAppSurvey: (studentId: string) => void;
};
