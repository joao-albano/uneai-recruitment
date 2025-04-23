
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
  leadCourse?: string;
  agentId: string;
  channel: 'whatsapp' | 'email' | 'voice';
  status: 'active' | 'pending' | 'closed' | 'new' | 'waiting';
  lastMessage: string;
  lastMessageTime: Date;
  emotion?: string;
  assignedTo?: string;
  unreadCount?: number;
};

export type RegistrySelection = {
  code: string;
  description: string;
  type: 'human' | 'ai';
};

export type Agent = {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  activeChats: number;
  avatar?: string;
};
