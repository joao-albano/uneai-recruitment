
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from './types';

interface MessagesContainerProps {
  messages: Message[];
  showAnalytics: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, showAnalytics }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          id={message.id}
          content={message.content}
          timestamp={message.timestamp}
          isFromLead={message.isFromLead}
          isFromAi={message.isFromAi}
          emotion={message.emotion}
          intent={message.intent}
          objection={message.objection}
          showAnalytics={showAnalytics}
        />
      ))}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Nenhuma mensagem para exibir</p>
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
