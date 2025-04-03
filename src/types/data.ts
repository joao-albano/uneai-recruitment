// Define types for our data
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppMessage } from './whatsapp';
import { ProductType } from '@/context/product/types';

export type SchoolSegment = 'ENSINO MÉDIO' | 'ENSINO FUNDAMENTAL I' | 'ENSINO FUNDAMENTAL II' | 'EDUCAÇÃO INFANTIL';

export type StudentData = {
  id: string;
  name: string;
  registrationNumber: string; // Added registration number field
  class: string;
  segment: SchoolSegment; // Added segment field
  grade: number;
  attendance: number;
  behavior: number;
  riskLevel?: 'low' | 'medium' | 'high';
  actionItems?: string[];
  parentName?: string;
  parentContact?: string;
  decisionPath?: string[]; // Add decision path for explainable AI;
  importMonth?: number;    // Month when the data was imported
  importYear?: number;     // Year when the data was imported
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
  productContext?: ProductType;
};

export type AlertItem = {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: 'high-risk' | 'medium-risk' | 'low-risk' | 'survey-requested' | 'meeting-scheduled' | 'appointment-reminder' | 'error' | 'info' | 'lead-opportunity' | 'stage-change' | 'campaign-performance' | 'lead-assigned';
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
  updatedCount?: number; // Count of records that were updated
  newCount?: number;     // Count of new records created
};

// Alias Student to StudentData
export type Student = StudentData;

export type DataContextType = {
  students: StudentData[];
  surveys: SurveyData[];
  schedules: ScheduleItem[];
  alerts: AlertItem[];
  uploadHistory: UploadRecord[];
  isLoading: boolean;
  whatsAppConfig: WhatsAppConfig;
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
  // Métodos CRUD para estudantes
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  // Nova função para processar as pesquisas com o modelo de IA
  processSurveyWithRiskModel: (survey: SurveyData) => void;
};
