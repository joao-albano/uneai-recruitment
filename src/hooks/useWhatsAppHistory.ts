
import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '@/types/whatsapp';

export const useWhatsAppHistory = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>(() => {
    // Tenta carregar o histórico do localStorage
    const savedHistory = localStorage.getItem('whatsapp_history');
    if (savedHistory) {
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
      }
    }
    
    // Retorna um array vazio se não houver histórico ou ocorrer um erro
    return [];
  });

  // Salva mensagens no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('whatsapp_history', JSON.stringify(messages));
  }, [messages]);

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

  const clearHistory = () => {
    setMessages([]);
  };

  return {
    messages,
    addMessage,
    updateMessageStatus,
    clearHistory
  };
};
