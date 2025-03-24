
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

interface ConversationContainerProps {
  messages: Array<{
    type: 'sent' | 'received';
    content: string;
    time: Date;
    id: string;
  }>;
}

const ConversationContainer: React.FC<ConversationContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 pt-4 max-h-[500px] overflow-y-auto pr-2">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          type={message.type}
          content={message.content}
          time={message.time}
          id={message.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationContainer;
