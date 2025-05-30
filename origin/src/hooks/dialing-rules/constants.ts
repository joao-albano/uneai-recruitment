
import { RedialInterval } from '@/types/voicecall';

// Default redial intervals for each failure type
export const defaultRedialIntervals: RedialInterval[] = [
  { failureType: 'voicemail', intervalMinutes: 60, maxAttempts: 3 },
  { failureType: 'no-answer', intervalMinutes: 30, maxAttempts: 3 },
  { failureType: 'busy', intervalMinutes: 15, maxAttempts: 3 },
  { failureType: 'failure', intervalMinutes: 120, maxAttempts: 2 },
  { failureType: 'error', intervalMinutes: 240, maxAttempts: 1 },
  { failureType: 'invalid-number', intervalMinutes: 0, maxAttempts: 0 }
];

// Mock data for initial rules
export const mockDialingRules = [
  {
    id: '1',
    name: 'Padrão Horário Comercial',
    enabled: true,
    simultaneousChannels: 5,
    startDate: new Date(),
    startTime: '08:00',
    endDate: null,
    endTime: '18:00',
    maxAttemptsPerLead: 5,
    timeBetweenCalls: 10, // 10 seconds
    createdAt: new Date(),
    updatedAt: new Date(),
    redialIntervals: [...defaultRedialIntervals]
  }
];
