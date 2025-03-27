
export type VoiceCallStatus = 'completed' | 'in-progress' | 'no-answer' | 'failed';

export interface VoiceCall {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  recipientNumber: string;
  status: VoiceCallStatus;
  createdAt: Date;
  answeredAt: Date | null;
  endedAt: Date | null;
  duration: number | null; // in seconds
  transcription: string | null;
  summary: string | null;
}
