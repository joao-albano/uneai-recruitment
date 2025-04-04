
import { EmotionType, IntentType, ObjectionType } from '@/types/recruitment';

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isFromLead: boolean;
  isFromAi?: boolean;
  emotion?: EmotionType;
  intent?: IntentType;
  objection?: ObjectionType;
}
