
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import WhatsAppTab from '../WhatsAppTab';
import ChannelTab from '../ChannelTab';
import { ConversationHistoryView } from '../history/ConversationHistoryView';
import ConversationTabContent from './ConversationTabContent';
import { ActiveConversation } from '../types';

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
  // Não precisamos mais do mockHistory aqui, já está no componente ConversationHistoryView

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

      <TabsContent value="history" className="flex-1 overflow-hidden">
        <ConversationHistoryView 
          leadName={selectedConversation.leadName}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ConversationTabsContainer;
