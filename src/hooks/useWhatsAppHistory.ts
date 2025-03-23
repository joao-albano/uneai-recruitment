
import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '@/types/whatsapp';
import { generateDemoMessages } from './whatsapp/generateDemoMessages';
import { loadMessagesFromStorage, saveMessagesToStorage } from './whatsapp/localStorageUtils';
import { createMessageOperations, MessageOperations } from './whatsapp/messageOperations';

export interface WhatsAppHistoryHook extends MessageOperations {
  messages: WhatsAppMessage[];
}

export const useWhatsAppHistory = (): WhatsAppHistoryHook => {
  // Initialize state with messages from localStorage or demo data
  const [messages, setMessages] = useState<WhatsAppMessage[]>(() => {
    const storedMessages = loadMessagesFromStorage();
    return storedMessages || generateDemoMessages();
  });

  // Save messages to localStorage when they change
  useEffect(() => {
    saveMessagesToStorage(messages);
  }, [messages]);

  // Create message operations
  const operations = createMessageOperations(messages, setMessages);

  return {
    messages,
    ...operations
  };
};
