
export interface ActiveConversation {
  id: string;
  leadName: string;
  leadCourse: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'waiting' | 'finished' | 'new';
  emotion?: string;
  assignedTo?: string;
}

export interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  activeChats: number;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isFromLead: boolean;
  isFromAi?: boolean;
  emotion?: string;
  intent?: string;
  objection?: string;
}
