
import { VoiceCall } from '@/types/voicecall';

const STORAGE_KEY = 'voice_calls_history';

export const loadCallsFromStorage = (): VoiceCall[] | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Convert string dates back to Date objects
      return parsedData.map((call: any) => ({
        ...call,
        createdAt: new Date(call.createdAt),
        answeredAt: call.answeredAt ? new Date(call.answeredAt) : null,
        endedAt: call.endedAt ? new Date(call.endedAt) : null
      }));
    }
    return null;
  } catch (error) {
    console.error('Error loading voice calls from storage:', error);
    return null;
  }
};

export const saveCallsToStorage = (calls: VoiceCall[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calls));
  } catch (error) {
    console.error('Error saving voice calls to storage:', error);
  }
};
