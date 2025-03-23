
import { WhatsAppMessage } from '@/types/whatsapp';

export interface MessageOperations {
  addMessage: (message: WhatsAppMessage) => void;
  updateMessageStatus: (id: string, status: WhatsAppMessage['status'], errorMessage?: string) => void;
}

export const createMessageOperations = (
  messages: WhatsAppMessage[],
  setMessages: React.Dispatch<React.SetStateAction<WhatsAppMessage[]>>
): MessageOperations => {
  const addMessage = (message: WhatsAppMessage) => {
    setMessages(prev => [message, ...prev]);
  };

  const updateMessageStatus = (id: string, status: WhatsAppMessage['status'], errorMessage?: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id 
          ? { 
              ...msg, 
              status, 
              updatedAt: new Date(), 
              ...(errorMessage && { errorMessage })
            } 
          : msg
      )
    );
  };

  return {
    addMessage,
    updateMessageStatus
  };
};
