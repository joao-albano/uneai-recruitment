
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import { ActiveConversation } from './types';
import WhatsAppTab from './WhatsAppTab';
import ChannelTab from './ChannelTab';
import ConversationHeader from './ConversationHeader';

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
  onEndConversation
}) => {
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
            messages={messages}
            isAiMode={isAiMode}
            showAnalytics={showAnalytics}
            onSendMessage={handleSendMessage}
            onOpenSettings={handleOpenSettings}
            isSelectedLead={!!selectedConversation}
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
        </Tabs>
      </CardContent>
    </>
  );
};

export default ConversationChatArea;
