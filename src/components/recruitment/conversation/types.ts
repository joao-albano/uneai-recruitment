
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
  isRead?: boolean;
  assignedTo?: string;
}

export interface ActiveConversation {
  id: string;
  leadName: string;
  leadCourse?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'waiting' | 'closed';
  emotion?: EmotionType;
  assignedTo?: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  activeChats: number;
}
