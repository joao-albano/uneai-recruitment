import { EmotionType, IntentType, ObjectionType } from '@/types/recruitment';

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isFromLead: boolean;
  isFromAi: boolean;
  emotion?: EmotionType;
  intent?: IntentType;
  objection?: ObjectionType;
  registryCode?: string;
  registryDescription?: string;
}

export type ActiveConversation = {
  id: string;
  leadName: string;
  leadId: string;
  agentId: string;
  channel: 'whatsapp' | 'email' | 'voice';
  status: 'active' | 'pending' | 'closed';
  lastMessage: string;
  lastMessageTime: Date;
};

export type RegistrySelection = {
  code: string;
  description: string;
  type: 'human' | 'ai';
};
