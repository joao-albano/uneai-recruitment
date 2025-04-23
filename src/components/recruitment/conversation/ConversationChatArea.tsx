
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, Mail, Phone, History } from 'lucide-react';
import { ActiveConversation } from './types';
import WhatsAppTab from './WhatsAppTab';
import ChannelTab from './ChannelTab';
import ConversationHeader from './ConversationHeader';
import { ConversationHistoryView } from './history/ConversationHistoryView';
import { ConversationHistory } from './types/history';

interface ConversationChatAreaProps {
  selectedConversation?: ActiveConversation;
  isAiMode: boolean;
  showAnalytics: boolean;
  activeChannel: 'whatsapp' | 'email' | 'voz';
  setActiveChannel: (channel: 'whatsapp' | 'email' | 'voz') => void;
  handleToggleAiMode: () => void;
  handleToggleAnalytics: () => void;
  handleOpenSettings: () => void;
  handleSendMessage: (message: string) => void;
  messages: any[];
  onEndConversation?: () => void;
  isSelectedLead: boolean; // Added this missing prop
}

const ConversationChatArea: React.FC<ConversationChatAreaProps> = ({
  selectedConversation,
  isAiMode,
  showAnalytics,
  activeChannel,
  setActiveChannel,
  handleToggleAiMode,
  handleToggleAnalytics,
  handleOpenSettings,
  handleSendMessage,
  messages,
  onEndConversation,
  isSelectedLead // Added to props destructuring
}) => {
  // Mock do histórico para demonstração
  const mockHistory: ConversationHistory[] = [
    {
      id: '1',
      leadId: selectedConversation?.leadId || '',
      channel: 'whatsapp',
      date: new Date(2024, 2, 15, 14, 30),
      agent: 'João Silva',
      status: 'completed',
      registryCode: 'INT',
      registryDescription: 'Lead Interessado',
      messages: [
        {
          id: '1',
          content: 'Olá, gostaria de informações sobre o curso de Psicologia',
          timestamp: new Date(2024, 2, 15, 14, 30),
          isFromLead: true,
          isFromAi: false
        },
        {
          id: '2',
          content: 'Claro! O curso tem duração de 5 anos e é reconhecido pelo MEC',
          timestamp: new Date(2024, 2, 15, 14, 31),
          isFromLead: false,
          isFromAi: true
        }
      ]
    },
    {
      id: '2',
      leadId: selectedConversation?.leadId || '',
      channel: 'voz',
      date: new Date(2024, 2, 16, 10, 0),
      agent: 'Maria Oliveira',
      status: 'completed',
      duration: 360, // 6 minutos
      transcription: 'Lead demonstrou interesse no curso de Psicologia e solicitou informações sobre bolsas de estudo.',
      messages: []
    }
  ];

  if (!selectedConversation) {
    return null;
  }

  return (
    <>
      <ConversationHeader 
        leadName={selectedConversation.leadName}
        leadEmail={`${selectedConversation.leadName.toLowerCase().replace(' ', '.')}@email.com`}
        leadPhone="(11) 98765-4321"
        isAiMode={isAiMode}
        showAnalytics={showAnalytics}
        onToggleAttendanceMode={handleToggleAiMode}
        onToggleAnalytics={handleToggleAnalytics}
        onEndConversation={onEndConversation}
      />
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue={activeChannel} className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-2 grid grid-cols-4">
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
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>
          
          <WhatsAppTab 
            messages={messages}
            isAiMode={isAiMode}
            showAnalytics={showAnalytics}
            onSendMessage={handleSendMessage}
            onOpenSettings={handleOpenSettings}
            isSelectedLead={isSelectedLead}
            onEndConversation={onEndConversation}
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

          <TabsContent value="history" className="flex-1 overflow-auto">
            <ConversationHistoryView 
              history={mockHistory}
              leadName={selectedConversation.leadName}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default ConversationChatArea;
