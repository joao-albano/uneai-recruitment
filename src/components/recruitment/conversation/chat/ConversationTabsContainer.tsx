
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import WhatsAppTab from '../../conversation/WhatsAppTab';
import ChannelTab from '../../conversation/ChannelTab';
import { ConversationHistoryView } from '../../conversation/history/ConversationHistoryView';
import ConversationTabContent from './ConversationTabContent';
import { ActiveConversation } from '../../conversation/types';

interface ConversationTabsContainerProps {
  activeChannel: 'whatsapp' | 'email' | 'voz';
  setActiveChannel: (channel: 'whatsapp' | 'email' | 'voz') => void;
  isAiMode: boolean;
  showAnalytics: boolean;
  handleSendMessage: (message: string) => void;
  handleOpenSettings: () => void;
  messages: any[];
  onEndConversation?: () => void;
  isSelectedLead: boolean;
  selectedConversation: ActiveConversation;
}

const ConversationTabsContainer: React.FC<ConversationTabsContainerProps> = ({
  activeChannel,
  setActiveChannel,
  isAiMode,
  showAnalytics,
  handleSendMessage,
  handleOpenSettings,
  messages,
  onEndConversation,
  isSelectedLead,
  selectedConversation
}) => {
  return (
    <Tabs defaultValue={activeChannel} className="flex-1 flex flex-col overflow-hidden">
      <ConversationTabContent 
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      
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
        description="Visualize e responda emails de leads diretamente da plataforma. Esta funcionalidade estará disponível em breve."
      />
      
      <ChannelTab 
        value="voz"
        icon="phone"
        title="Interface de Voz"
        description="Realize e receba chamadas diretamente da plataforma. Esta funcionalidade estará disponível em breve."
      />

      <ConversationHistoryView 
        leadName={selectedConversation.leadName}
      />
    </Tabs>
  );
};

export default ConversationTabsContainer;
