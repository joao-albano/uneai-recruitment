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
    <TabsContent value="whatsapp" className="flex-1 flex flex-col">
      <MessagesContainer
        messages={messages}
        showAnalytics={showAnalytics}
        leadId={isSelectedLead ? 'current-lead' : undefined}
      />
      
      <div className="p-4 border-t">
        <MessageInput
          isAiMode={isAiMode}
          onSendMessage={onSendMessage}
          onEndConversation={onEndConversation}
          messages={messages}
        />
      </div>
    </TabsContent>
  );
};

export default WhatsAppTab;
