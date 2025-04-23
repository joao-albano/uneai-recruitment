
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';

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
        isAiMode={isAiMode}
        showAnalytics={showAnalytics}
      />
      
      <MessageInput 
        onSendMessage={onSendMessage}
        onOpenSettings={onOpenSettings}
        isAiMode={isAiMode}
        isSelectedLead={isSelectedLead}
        onEndConversation={onEndConversation}
      />
    </TabsContent>
  );
};

export default WhatsAppTab;
