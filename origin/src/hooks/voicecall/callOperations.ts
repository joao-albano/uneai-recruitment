
import { VoiceCall } from '@/types/voicecall';
import { v4 as uuidv4 } from 'uuid';

export interface CallOperations {
  addCall: (call: Omit<VoiceCall, 'id'>) => void;
  updateCall: (call: VoiceCall) => void;
  updateCallStatus: (id: string, status: VoiceCall['status'], endTime?: Date) => void;
  addTranscription: (id: string, transcription: string) => void;
  addSummary: (id: string, summary: string) => void;
}

export const createCallOperations = (
  calls: VoiceCall[],
  setCalls: React.Dispatch<React.SetStateAction<VoiceCall[]>>
): CallOperations => {
  const addCall = (call: Omit<VoiceCall, 'id'>) => {
    const newCall: VoiceCall = {
      ...call,
      id: uuidv4()
    };
    setCalls(prevCalls => [...prevCalls, newCall]);
    return newCall;
  };

  const updateCall = (updatedCall: VoiceCall) => {
    setCalls(prevCalls => 
      prevCalls.map(call => 
        call.id === updatedCall.id ? updatedCall : call
      )
    );
  };

  const updateCallStatus = (id: string, status: VoiceCall['status'], endTime?: Date) => {
    setCalls(prevCalls => 
      prevCalls.map(call => {
        if (call.id === id) {
          const updatedCall = { ...call, status };
          
          // If call is completed, set the end time and calculate duration
          if (status === 'completed' && endTime) {
            updatedCall.endedAt = endTime;
            // Calculate duration in seconds if we have start and end times
            if (call.answeredAt) {
              const durationMs = endTime.getTime() - call.answeredAt.getTime();
              updatedCall.duration = Math.floor(durationMs / 1000);
            }
          }
          
          return updatedCall;
        }
        return call;
      })
    );
  };

  const addTranscription = (id: string, transcription: string) => {
    setCalls(prevCalls => 
      prevCalls.map(call => 
        call.id === id ? { ...call, transcription } : call
      )
    );
  };

  const addSummary = (id: string, summary: string) => {
    setCalls(prevCalls => 
      prevCalls.map(call => 
        call.id === id ? { ...call, summary } : call
      )
    );
  };

  return {
    addCall,
    updateCall,
    updateCallStatus,
    addTranscription,
    addSummary
  };
};
