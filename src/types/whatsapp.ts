
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'survey' | 'notification' | 'followup';

export interface WhatsAppMessage {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  to: string;
  messageType: MessageType;
  status: MessageStatus;
  sentAt: Date;
  content: string;
  responseContent?: string;
  responseTime?: Date;
}
