
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
    <TabsContent 
      value="whatsapp" 
      className="flex-1 flex flex-col overflow-hidden"
    >
      <MessagesContainer 
        messages={messages} 
        showAnalytics={showAnalytics} 
      />
      <MessageInput 
        isAiMode={isAiMode}
        onSendMessage={onSendMessage} 
        onOpenSettings={onOpenSettings}
        messages={messages}
        onEndConversation={onEndConversation}
        isSelectedLead={isSelectedLead}
      />
    </TabsContent>
  );
};

export default WhatsAppTab;
