import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { ActiveConversation, Agent, Message } from '../types';

export function useConversationData() {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'voz'>('whatsapp');
  const [isAiMode, setIsAiMode] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [newConversationOpen, setNewConversationOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(undefined);
  
  // Mock data for conversations
  const [conversations, setConversations] = useState<ActiveConversation[]>([
    {
      id: '1',
      leadName: 'Maria Oliveira',
      leadCourse: 'Psicologia',
      lastMessage: 'Bom dia, gostaria de saber se o curso de Psicologia é reconhecido pelo MEC.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 0,
      status: 'active',
      emotion: 'interessado',
      assignedTo: 'Juliana Oliveira'
    },
    {
      id: '2',
      leadName: 'João Silva',
      leadCourse: 'Administração',
      lastMessage: 'Parece ótimo! Quando posso agendar uma visita?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      status: 'waiting',
      emotion: 'positivo'
    },
    {
      id: '3',
      leadName: 'Pedro Souza',
      leadCourse: 'Direito',
      lastMessage: 'Gostaria de mais informações sobre o curso de Direito.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
      unreadCount: 0,
      status: 'active',
      emotion: 'neutro',
      assignedTo: 'Roberto Santos'
    }
  ]);
  
  // Mock data for agents
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Juliana Oliveira',
      status: 'online',
      activeChats: 2
    },
    {
      id: '2',
      name: 'Roberto Santos',
      status: 'busy',
      activeChats: 3
    },
    {
      id: '3',
      name: 'Amanda Costa',
      status: 'online',
      activeChats: 1
    },
    {
      id: '4',
      name: 'IA Assistente',
      status: 'online',
      activeChats: 5
    }
  ]);

  // Mock messages for the selected conversation
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1',
        content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isFromLead: false,
        isFromAi: true,
      },
      {
        id: '2',
        content: `Bom dia, gostaria de saber se o curso de Psicologia é reconhecido pelo MEC.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
        isFromLead: true,
        emotion: 'interessado',
        intent: 'informacao_curso',
      }
    ],
    '2': [
      {
        id: '1',
        content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        isFromLead: false,
        isFromAi: true,
      },
      {
        id: '2',
        content: `Olá, gostaria de saber mais sobre o curso de Administração. Vocês têm turmas noturnas?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 34),
        isFromLead: true,
        emotion: 'interessado',
        intent: 'informacao_turno',
      },
      {
        id: '3',
        content: `Sim, temos turmas de Administração no período noturno! As aulas acontecem de segunda a sexta, das 19h às 22h. Você trabalha durante o dia?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 33),
        isFromLead: false,
        isFromAi: true,
      },
      {
        id: '4',
        content: `Sim, trabalho em horário comercial e estou procurando um curso para me especializar. O campus tem boa localização?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 32),
        isFromLead: true,
        emotion: 'positivo',
        intent: 'informacao_modalidade',
      },
      {
        id: '5',
        content: `Nosso campus principal fica bem localizado, próximo à estação de metrô Central. Temos também estacionamento gratuito para alunos. Parece uma boa opção para você?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 31),
        isFromLead: false,
        isFromAi: true,
      },
      {
        id: '6',
        content: `Parece ótimo! Quando posso agendar uma visita?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isFromLead: true,
        emotion: 'positivo',
        intent: 'agendar_visita',
      }
    ],
    '3': [
      {
        id: '1',
        content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 65),
        isFromLead: false,
        isFromAi: true,
      },
      {
        id: '2',
        content: `Gostaria de mais informações sobre o curso de Direito.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 64),
        isFromLead: true,
        emotion: 'neutro',
        intent: 'informacao_curso',
      },
      {
        id: '3',
        content: `Com certeza! Nosso curso de Direito tem nota 5 no MEC e conta com um corpo docente formado por renomados advogados, juízes e promotores. O que você gostaria de saber especificamente?`,
        timestamp: new Date(Date.now() - 1000 * 60 * 63),
        isFromLead: false,
        isFromAi: false,
      }
    ]
  });

  const getSelectedConversation = () => {
    return conversations.find(c => c.id === selectedConversationId);
  };

  const getSelectedMessages = () => {
    if (!selectedConversationId) return [];
    return messagesMap[selectedConversationId] || [];
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !selectedConversationId) return;
    
    // Add the new message
    const newMessage: Message = {
      id: uuidv4(),
      content: message,
      timestamp: new Date(),
      isFromLead: false,
      isFromAi: isAiMode,
    };
    
    setMessagesMap(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage]
    }));
    
    // Update the conversation's last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversationId
          ? {
              ...conv,
              lastMessage: message,
              lastMessageTime: new Date()
            }
          : conv
      )
    );
    
    // Simulate a lead response after a delay
    if (isAiMode) {
      setTimeout(() => {
        const responses = [
          "Entendi! Vou verificar essas informações para você.",
          "Obrigado por perguntar. Isso me ajuda a entender melhor suas necessidades.",
          "Ótima pergunta! Gostaria de agendar uma visita ao campus para conhecer nossa estrutura?",
          "Perfeito! Vou passar esses detalhes para nossa equipe de admissão.",
          "Entendo sua preocupação. Temos diversas opções de bolsas e financiamento que podem ajudar."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const aiResponse: Message = {
          id: uuidv4(),
          content: randomResponse,
          timestamp: new Date(),
          isFromLead: true,
          emotion: 'positivo',
          intent: 'duvida_processo',
        };
        
        setMessagesMap(prev => ({
          ...prev,
          [selectedConversationId]: [...(prev[selectedConversationId] || []), aiResponse]
        }));
        
        // Update the conversation's last message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversationId
              ? {
                  ...conv,
                  lastMessage: randomResponse,
                  lastMessageTime: new Date(),
                  emotion: 'positivo'
                }
              : conv
          )
        );
      }, 1500);
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id
          ? {
              ...conv,
              unreadCount: 0
            }
          : conv
      )
    );
  };

  const handleToggleAiMode = () => {
    setIsAiMode(!isAiMode);
  };

  const handleToggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleStartNewConversation = () => {
    setNewConversationOpen(true);
  };

  const handleCreateNewConversation = (leadData: {
    name: string;
    email: string;
    phone: string;
    course: string;
  }) => {
    const newConversationId = uuidv4();
    const newConversation: ActiveConversation = {
      id: newConversationId,
      leadName: leadData.name,
      leadCourse: leadData.course,
      lastMessage: 'Conversa iniciada',
      lastMessageTime: new Date(),
      unreadCount: 0,
      status: 'new',
      emotion: 'neutro'
    };

    // Add the new conversation to the list
    setConversations(prev => [newConversation, ...prev]);

    // Create initial message from AI
    const initialMessage: Message = {
      id: uuidv4(),
      content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
      timestamp: new Date(),
      isFromLead: false,
      isFromAi: true,
    };

    // Add the initial message to the messages map
    setMessagesMap(prev => ({
      ...prev,
      [newConversationId]: [initialMessage]
    }));

    // Select the new conversation
    setSelectedConversationId(newConversationId);
    
    // Close the dialog
    setNewConversationOpen(false);
    
    // Show success toast
    toast.success("Nova conversa iniciada com sucesso!");
  };

  return {
    activeChannel,
    setActiveChannel,
    isAiMode,
    setIsAiMode,
    showAnalytics,
    setShowAnalytics,
    settingsOpen,
    setSettingsOpen,
    filtersOpen,
    setFiltersOpen,
    newConversationOpen,
    setNewConversationOpen,
    selectedConversationId,
    conversations,
    agents,
    getSelectedConversation,
    getSelectedMessages,
    handleSendMessage,
    handleSelectConversation,
    handleToggleAiMode,
    handleToggleAnalytics,
    handleOpenSettings,
    handleStartNewConversation,
    handleCreateNewConversation
  };
}
