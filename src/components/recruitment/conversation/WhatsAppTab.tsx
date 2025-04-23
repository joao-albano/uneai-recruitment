
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import { Message } from './types';

interface WhatsAppTabProps {
  messages: any[];
  isAiMode: boolean;
  showAnalytics: boolean;
  onSendMessage: (message: string) => void;
  onOpenSettings: () => void;
  isSelectedLead: boolean;
  onEndConversation?: () => void;
}

const WhatsAppTab: React.FC<WhatsAppTabProps> = ({
  messages,
  isAiMode,
  showAnalytics,
  onSendMessage,
  onOpenSettings,
  isSelectedLead,
  onEndConversation
}) => {
  return (
    <TabsContent value="whatsapp" className="flex-1 flex flex-col overflow-hidden p-0">
      <MessagesContainer 
        messages={messages}
        showAnalytics={showAnalytics}
        // Removed isAiMode as it's not expected in MessagesContainerProps
      />
      
      <MessageInput 
        onSendMessage={onSendMessage}
        // Passing messages to MessageInput as it's required
        messages={messages}
        isAiMode={isAiMode}
        // Removed onOpenSettings as it's not expected in MessageInputProps
        onEndConversation={onEndConversation}
      />
    </TabsContent>
  );
};

export default WhatsAppTab;
