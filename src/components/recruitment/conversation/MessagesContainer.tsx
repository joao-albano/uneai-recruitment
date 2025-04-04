
import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from './types';
import { Loader2 } from 'lucide-react';

interface MessagesContainerProps {
  messages: Message[];
  showAnalytics: boolean;
  leadId?: string;
  isLoading?: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ 
  messages,
  showAnalytics,
  leadId,
  isLoading = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
          {leadId && (
            <p className="text-sm text-muted-foreground mt-1">
              Inicie uma conversa com este lead
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-2 max-h-[calc(100vh-250px)]">
      <div className="max-w-full">
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesContainer;
