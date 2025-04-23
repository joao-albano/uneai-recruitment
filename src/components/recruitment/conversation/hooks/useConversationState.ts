
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { toast } from "sonner";

export const useConversationState = () => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'voz'>('whatsapp');
  const [isAiMode, setIsAiMode] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [newConversationOpen, setNewConversationOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isFromLead: false,
      isFromAi: true,
    },
    {
      id: '2',
      content: `Olá, gostaria de saber mais sobre o curso de Administração. Vocês têm turmas noturnas?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 14),
      isFromLead: true,
      isFromAi: false,
      emotion: 'interessado',
      intent: 'informacao_turno',
    },
    {
      id: '3',
      content: `Sim, temos turmas de Administração no período noturno! As aulas acontecem de segunda a sexta, das 19h às 22h. Você trabalha durante o dia?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 13),
      isFromLead: false,
      isFromAi: true,
    },
    {
      id: '4',
      content: `Sim, trabalho em horário comercial e estou procurando um curso para me especializar. Mas acho que o valor está um pouco alto para mim.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      isFromLead: true,
      isFromAi: false,
      emotion: 'hesitante',
      intent: 'informacao_preco',
      objection: 'preco_alto',
    },
    {
      id: '5',
      content: `Entendo sua preocupação com o investimento! Temos várias opções de bolsas e descontos, especialmente para quem trabalha na área. Além disso, para o período noturno, oferecemos um desconto de 15% nas mensalidades. Posso enviar mais informações sobre nossos planos de pagamento?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 11),
      isFromLead: false,
      isFromAi: true,
    }
  ]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      isFromLead: false,
      isFromAi: isAiMode,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (isAiMode) {
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "Estou analisando sua mensagem. Como posso ajudar mais em relação ao curso de Administração?",
          timestamp: new Date(),
          isFromLead: true,
          isFromAi: false,
          emotion: 'neutro',
          intent: 'duvida_processo',
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleCreateNewConversation = (data: {
    name: string;
    email: string;
    phone: string;
    course: string;
  }) => {
    const initialMessage: Message = {
      id: uuidv4(),
      content: `Olá ${data.name}! Sou a assistente virtual da instituição. Como posso ajudar você hoje em relação ao curso de ${data.course}?`,
      timestamp: new Date(),
      isFromLead: false,
      isFromAi: true,
    };
    
    setMessages([initialMessage]);
    setNewConversationOpen(false);
    toast.success("Nova conversa iniciada com sucesso!");
  };

  return {
    activeChannel,
    setActiveChannel,
    isAiMode,
    setIsAiMode,
    showAnalytics,
    setShowAnalytics,
    newConversationOpen,
    setNewConversationOpen,
    messages,
    setMessages,
    handleSendMessage,
    handleCreateNewConversation,
  };
};
