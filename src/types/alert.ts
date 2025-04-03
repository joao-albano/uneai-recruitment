
export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: 'high-risk' | 'medium-risk' | 'low-risk' | 'survey-requested' | 'meeting-scheduled' | 'appointment-reminder' | 'info' | 'error' | 'lead-opportunity' | 'stage-change' | 'campaign-performance' | 'lead-assigned';
  message: string;
  createdAt: Date;
  read: boolean;
  actionTaken: boolean;
}
