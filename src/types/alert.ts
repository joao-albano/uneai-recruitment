
export interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: 'high-risk' | 'medium-risk' | 'academic';
  actionTaken: boolean;
  createdAt: string;
}
