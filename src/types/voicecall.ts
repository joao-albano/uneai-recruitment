
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

export type DialingFailureType = 
  | 'voicemail' 
  | 'no-answer' 
  | 'busy' 
  | 'failure' 
  | 'error'
  | 'invalid-number';

export interface DialingRule {
  id: string;
  name: string;
  enabled: boolean;
  simultaneousChannels: number;
  startDate: Date;
  startTime: string;
  endDate: Date | null;
  endTime: string;
  maxAttemptsPerLead: number;
  timeBetweenCalls: number; // in seconds
  createdAt: Date;
  updatedAt: Date;
  redialIntervals: RedialInterval[];
  segmentation?: RuleSegmentation; // Nova propriedade de segmentação
}

export interface RuleSegmentation {
  courseIds?: string[];
  funnelIds?: string[];
  funnelStageIds?: string[];
}

export interface RedialInterval {
  failureType: DialingFailureType;
  intervalMinutes: number;
  maxAttempts: number;
}

export interface FollowUpSchedule {
  id: string;
  leadId: string;
  scheduledDate: Date;
  createdAt: Date;
  callId: string;
  notes: string | null;
  completed: boolean;
}
