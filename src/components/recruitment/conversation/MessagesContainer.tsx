
import React from 'react';
import MessageBubble from './MessageBubble';
import { Message } from './types';

interface MessagesContainerProps {
  messages: Message[];
  showAnalytics: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ 
  messages,
  showAnalytics
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map(msg => (
        <MessageBubble 
          key={msg.id}
          id={msg.id}
          content={msg.content}
          timestamp={msg.timestamp}
          isFromLead={msg.isFromLead}
          isFromAi={msg.isFromAi}
          emotion={msg.emotion}
          intent={msg.intent}
          objection={msg.objection}
          showAnalytics={showAnalytics}
        />
      ))}
    </div>
  );
};

export default MessagesContainer;
