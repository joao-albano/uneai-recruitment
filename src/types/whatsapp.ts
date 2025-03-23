
export interface WhatsAppMessage {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  recipientNumber: string;
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  createdAt: Date;
  updatedAt?: Date;
  errorMessage?: string;
}

export interface WhatsAppMessageHistory {
  messages: WhatsAppMessage[];
}
