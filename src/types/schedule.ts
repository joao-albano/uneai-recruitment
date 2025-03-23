
export interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

export interface FormattedScheduleData {
  formData: FormData;
  scheduleDate: Date;
}
