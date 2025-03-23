
import { useState, useEffect } from 'react';
import { WhatsAppMessage } from '@/types/whatsapp';
import { v4 as uuidv4 } from 'uuid';

// Dados fictícios para demonstração
const generateDemoMessages = (): WhatsAppMessage[] => {
  return [
    {
      id: uuidv4(),
      studentId: '1',
      studentName: 'Ana Silva',
      parentName: 'Roberto Silva',
      recipientNumber: '(11) 98765-4321',
      message: 'Olá Sr. Roberto, gostaríamos de informar que Ana teve uma melhora significativa em Matemática este mês. Continue incentivando os estudos em casa!',
      status: 'read',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
      updatedAt: new Date(Date.now() - 2.9 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '5',
      studentName: 'Elena Costa',
      parentName: 'Fernando Costa',
      recipientNumber: '(11) 99123-8765',
      message: 'Sr. Fernando, notamos que Elena faltou às últimas 3 aulas de Português. Podemos agendar uma reunião para discutir sua frequência?',
      status: 'delivered',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
      updatedAt: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '3',
      studentName: 'Carla Oliveira',
      parentName: 'Paulo Oliveira',
      recipientNumber: '(11) 99876-5432',
      message: 'Sr. Paulo, gostaríamos de sua autorização para incluir Carla no programa de reforço escolar às terças e quintas após o horário regular. Por favor, responda sim ou não.',
      status: 'sent',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
      updatedAt: undefined
    },
    {
      id: uuidv4(),
      studentId: '2',
      studentName: 'Bruno Santos',
      parentName: 'Marta Santos',
      recipientNumber: '(11) 91234-5678',
      message: 'Sra. Marta, lembramos que amanhã teremos reunião de pais e mestres às 18h. Sua presença é muito importante para discutirmos o progresso de Bruno.',
      status: 'read',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dias atrás
      updatedAt: new Date(Date.now() - 3.7 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '7',
      studentName: 'Gabriela Lima',
      parentName: 'Ricardo Lima',
      recipientNumber: '(11) 96543-2109',
      message: 'Sr. Ricardo, a feira de ciências será realizada na próxima sexta-feira. Gabriela está com o projeto bem avançado, mas precisa finalizar alguns detalhes. Pode auxiliá-la?',
      status: 'delivered',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
      updatedAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '8',
      studentName: 'Henrique Alves',
      parentName: 'Cristina Alves',
      recipientNumber: '(11) 95432-1098',
      message: 'Sra. Cristina, Henrique foi selecionado para representar a escola na Olimpíada de Matemática! Precisamos de sua autorização até amanhã.',
      status: 'failed',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 dias atrás
      updatedAt: new Date(Date.now() - 5.9 * 24 * 60 * 60 * 1000),
      errorMessage: 'Número de telefone inválido ou não disponível'
    },
    {
      id: uuidv4(),
      studentId: '4',
      studentName: 'Daniel Pereira',
      parentName: 'Luisa Pereira',
      recipientNumber: '(11) 98123-4567',
      message: 'Sra. Luisa, parabenizamos Daniel pelo excelente desempenho na avaliação de História. Continue incentivando seu interesse pela disciplina!',
      status: 'read',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
      updatedAt: new Date(Date.now() - 6.8 * 24 * 60 * 60 * 1000)
    }
  ];
};

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
    
    // Se não houver histórico, retorna dados de demonstração
    return generateDemoMessages();
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
