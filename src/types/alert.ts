
export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: 'high-risk' | 'medium-risk' | 'low-risk' | 'survey-requested' | 'meeting-scheduled' | 'appointment-reminder' | 'error' | 'info' | 'lead-opportunity' | 'stage-change' | 'campaign-performance' | 'lead-assigned';
  actionTaken: boolean;
  createdAt: string;
}
