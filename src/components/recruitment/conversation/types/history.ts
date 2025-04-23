
import { Message } from '../types';

export type ChannelType = 'whatsapp' | 'email' | 'voz';

export interface ConversationHistory {
  id: string;
  leadId: string;
  channel: ChannelType;
  date: Date;
  agent: string;
  status: 'completed' | 'missed' | 'cancelled';
  registryCode?: string;
  registryDescription?: string;
  messages: Message[];
  duration?: number; // para chamadas de voz
  transcription?: string; // para chamadas de voz
}
