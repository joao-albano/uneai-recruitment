
import { StudentData } from '@/types/data';

// Define a interface para histórico de análises
export interface AnalysisRecord {
  id: string;
  date: Date;
  riskLevel: 'low' | 'medium' | 'high';
  analysisType: 'automatic' | 'manual';
  performedBy?: string;
  notes?: string;
  indicators: {
    grade: number;
    attendance: number;
    behavior: number;
  };
}

// Define a interface para intervenções
export interface Intervention {
  id: string;
  date: Date;
  interventionType: 'meeting' | 'call' | 'material' | 'monitoring';
  status: 'scheduled' | 'completed' | 'canceled';
  performedBy: string;
  notes?: string;
  outcome?: string;
}

export interface InterventionsTabProps {
  student: StudentData;
}
