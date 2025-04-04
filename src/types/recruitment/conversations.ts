
// Types related to conversations and messaging
import { ChannelType, EmotionType, IntentType, ObjectionType } from './common';

export type Conversation = {
  id: string;
  leadId: string;
  startDate: Date;
  lastMessageDate: Date;
  channel: 'whatsapp' | 'email' | 'voz' | 'chat';
  messages: ConversationMessage[];
  summary?: string;
  aiSuggestions?: string[];
  emotionTrend?: EmotionType;
  status: 'ativa' | 'encerrada' | 'agendada' | 'convertida';
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  timestamp: Date;
  sender: 'lead' | 'instituicao' | 'ai';
  content: string;
  detectedEmotion?: EmotionType;
  detectedIntent?: IntentType;
  detectedObjection?: ObjectionType;
  isAutomatic?: boolean;
};
