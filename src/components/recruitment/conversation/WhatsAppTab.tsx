
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import { Message } from './types';

interface WhatsAppTabProps {
  messages: Message[];
  isAiMode: boolean;
  showAnalytics: boolean;
  onSendMessage: (message: string) => void;
}

const WhatsAppTab: React.FC<WhatsAppTabProps> = ({
  messages,
  isAiMode,
  showAnalytics,
  onSendMessage
}) => {
  return (
    <TabsContent value="whatsapp" className="flex-1 flex flex-col p-0 m-0">
      <MessagesContainer 
        messages={messages}
        showAnalytics={showAnalytics}
      />
      <MessageInput 
        isAiMode={isAiMode}
        onSendMessage={onSendMessage}
      />
    </TabsContent>
  );
};

export default WhatsAppTab;
