
import { useState, useEffect } from 'react';
import { VoiceCall } from '@/types/voicecall';
import { generateDemoVoiceCalls } from './voicecall/generateDemoVoiceCalls';
import { loadCallsFromStorage, saveCallsToStorage } from './voicecall/localStorageUtils';
import { createCallOperations, CallOperations } from './voicecall/callOperations';

export interface VoiceCallHistoryHook extends CallOperations {
  calls: VoiceCall[];
}

export const useVoiceCallHistory = (): VoiceCallHistoryHook => {
  // Initialize state with calls from localStorage or demo data
  const [calls, setCalls] = useState<VoiceCall[]>(() => {
    const storedCalls = loadCallsFromStorage();
    return storedCalls || generateDemoVoiceCalls();
  });

  // Save calls to localStorage when they change
  useEffect(() => {
    saveCallsToStorage(calls);
  }, [calls]);

  // Create call operations
  const operations = createCallOperations(calls, setCalls);

  return {
    calls,
    ...operations
  };
};
