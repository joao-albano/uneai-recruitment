import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import WhatsAppTab from '../WhatsAppTab';
import ConversationTabContent from './ConversationTabContent';
import EmailTab from '../email/EmailTab';
import VoiceTab from '../voice/VoiceTab';
import { ConversationHistoryView } from '../history/ConversationHistoryView';
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
      
      <EmailTab />
      
      <VoiceTab />

      <ConversationHistoryView 
        leadName={selectedConversation.leadName}
      />
    </Tabs>
  );
};

export default ConversationTabsContainer;
