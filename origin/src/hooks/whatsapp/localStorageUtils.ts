
import { WhatsAppMessage } from '@/types/whatsapp';

export const loadMessagesFromStorage = (): WhatsAppMessage[] | null => {
  try {
    const storedMessages = localStorage.getItem('whatsapp_messages');
    if (!storedMessages) return null;
    
    const parsed = JSON.parse(storedMessages);
    
    // Convert string dates back to Date objects
    return parsed.map((msg: any) => ({
      ...msg,
      createdAt: new Date(msg.createdAt),
      sentAt: msg.sentAt ? new Date(msg.sentAt) : undefined,
      updatedAt: msg.updatedAt ? new Date(msg.updatedAt) : undefined,
      responseTime: msg.responseTime ? new Date(msg.responseTime) : undefined
    }));
  } catch (error) {
    console.error('Error loading WhatsApp messages from storage:', error);
    return null;
  }
};

export const saveMessagesToStorage = (messages: WhatsAppMessage[]): void => {
  try {
    localStorage.setItem('whatsapp_messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving WhatsApp messages to storage:', error);
  }
};
