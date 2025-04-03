
import { ProductType } from '@/context/product/types';

export interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  productContext?: ProductType;
  
  // Additional fields for education context
  educationType?: 'basic' | 'higher';
  parentName?: string;
  parentPhone?: string;
  studentPhone?: string;
  studentEmail?: string;
  course?: string;
}

export interface FormattedScheduleData {
  formData: FormData;
  scheduleDate: Date;
}
