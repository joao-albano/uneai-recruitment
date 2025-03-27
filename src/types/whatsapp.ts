
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed' | 'sending';
export type MessageType = 'survey' | 'notification' | 'followup';
export type WhatsAppProvider = 'disabled' | 'twilio' | 'messagebird' | 'whatsapp-web' | 'n8n_webhook';

export interface WhatsAppMessage {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  to: string; // For backward compatibility
  recipientNumber: string;
  messageType?: MessageType;
  status: MessageStatus;
  sentAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
  content?: string;
  message: string;
  responseContent?: string;
  responseTime?: Date;
  errorMessage?: string;
}
