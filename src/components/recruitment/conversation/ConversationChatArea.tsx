
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { ActiveConversation } from './types';
import ConversationHeader from './ConversationHeader';
import ConversationTabsContainer from './chat/ConversationTabsContainer';

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
  isSelectedLead: boolean;
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
  isSelectedLead
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
        <ConversationTabsContainer 
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          isAiMode={isAiMode}
          showAnalytics={showAnalytics}
          handleSendMessage={handleSendMessage}
          handleOpenSettings={handleOpenSettings}
          messages={messages}
          onEndConversation={onEndConversation}
          isSelectedLead={isSelectedLead}
          selectedConversation={selectedConversation}
        />
      </CardContent>
    </>
  );
};

export default ConversationChatArea;
