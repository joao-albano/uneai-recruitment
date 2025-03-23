
import { WhatsAppMessage } from '@/types/whatsapp';

export const STORAGE_KEY = 'whatsapp_history';

export const loadMessagesFromStorage = (): WhatsAppMessage[] | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const savedHistory = localStorage.getItem(STORAGE_KEY);
  if (!savedHistory) {
    return null;
  }
  
  try {
    const parsed = JSON.parse(savedHistory);
    // Converte as strings de data para objetos Date
    return parsed.map((msg: any) => ({
      ...msg,
      createdAt: new Date(msg.createdAt),
      updatedAt: msg.updatedAt ? new Date(msg.updatedAt) : undefined,
    }));
  } catch (e) {
    console.error('Erro ao carregar histórico de WhatsApp:', e);
    return null;
  }
};

export const saveMessagesToStorage = (messages: WhatsAppMessage[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};
