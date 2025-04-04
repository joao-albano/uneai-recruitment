
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Mail, Phone, Filter, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ActiveConversation, Agent, Message } from './types';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

// Import components
import ActiveConversationsList from './ActiveConversationsList';
import AgentsList from './AgentsList';
import WhatsAppTab from './WhatsAppTab';
import ChannelTab from './ChannelTab';
import ConversationSettingsDialog from './ConversationSettingsDialog';
import ConversationFiltersDialog from './ConversationFiltersDialog';
import ConversationHeader from './ConversationHeader';

const ConversationalAI: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'voz'>('whatsapp');
  const [isAiMode, setIsAiMode] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
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

  const selectedConversation = getSelectedConversation();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">IA Conversacional</h1>
          <p className="text-muted-foreground">
            Interação inteligente e humanizada com leads via múltiplos canais
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setFiltersOpen(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" onClick={handleOpenSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card className="h-[75vh] flex">
        <div className="w-[300px] border-r flex flex-col">
          <div className="p-3 border-b">
            <h2 className="font-semibold">Conversas Ativas</h2>
            <p className="text-sm text-muted-foreground">
              Interações em andamento com leads
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ActiveConversationsList 
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          
          <Separator />
          
          <AgentsList agents={agents} />
        </div>
        
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <ConversationHeader 
                leadName={selectedConversation.leadName}
                leadEmail={`${selectedConversation.leadName.toLowerCase().replace(' ', '.')}@email.com`}
                leadPhone="(11) 98765-4321"
                isAiMode={isAiMode}
                showAnalytics={showAnalytics}
                onToggleAttendanceMode={handleToggleAiMode}
                onToggleAnalytics={handleToggleAnalytics}
              />
              
              <CardContent className="flex-1 flex flex-col p-0">
                <Tabs defaultValue={activeChannel} className="flex-1 flex flex-col">
                  <TabsList className="mx-6 mt-2 grid grid-cols-3">
                    <TabsTrigger value="whatsapp" onClick={() => setActiveChannel('whatsapp')}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </TabsTrigger>
                    <TabsTrigger value="email" onClick={() => setActiveChannel('email')}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="voz" onClick={() => setActiveChannel('voz')}>
                      <Phone className="h-4 w-4 mr-2" />
                      Voz
                    </TabsTrigger>
                  </TabsList>
                  
                  <WhatsAppTab 
                    messages={getSelectedMessages()}
                    isAiMode={isAiMode}
                    showAnalytics={showAnalytics}
                    onSendMessage={handleSendMessage}
                    onOpenSettings={handleOpenSettings}
                  />
                  
                  <ChannelTab 
                    value="email"
                    icon="mail"
                    title="Interface de Email"
                    description="Integração de email em desenvolvimento."
                  />
                  
                  <ChannelTab 
                    value="voz"
                    icon="phone"
                    title="Interface de Voz"
                    description="Integração de chamadas de voz em desenvolvimento."
                  />
                </Tabs>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Nenhuma conversa selecionada</h2>
                <p className="text-muted-foreground mb-4">
                  Selecione uma conversa na lista à esquerda ou inicie uma nova conversa.
                </p>
                <Button>Iniciar nova conversa</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <ConversationSettingsDialog 
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        showAnalytics={showAnalytics}
        onToggleAnalytics={setShowAnalytics}
        isAiMode={isAiMode}
        onToggleAiMode={setIsAiMode}
      />
      
      <ConversationFiltersDialog 
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={(filters) => {
          console.log('Applied filters:', filters);
          setFiltersOpen(false);
        }}
      />
    </div>
  );
};

export default ConversationalAI;
