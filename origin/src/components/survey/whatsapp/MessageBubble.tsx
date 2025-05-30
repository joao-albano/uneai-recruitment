
import React from 'react';
import { User, MessageSquare, Clock, Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WhatsAppMessageProps {
  type: 'sent' | 'received';
  content: string;
  time: Date;
  id: string;
}

const MessageBubble: React.FC<WhatsAppMessageProps> = ({ type, content, time, id }) => {
  // Determine if message is recent (less than 1 minute old)
  const isRecent = Date.now() - time.getTime() < 60000;
  
  return (
    <div 
      key={id} 
      className={`flex ${type === 'sent' ? 'justify-end' : 'justify-start'}`}
    >
      {type === 'received' && (
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
          <User className="h-4 w-4" />
        </div>
      )}
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          type === 'sent' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}
      >
        <p className="text-sm">{content}</p>
        <div className="flex justify-end items-center mt-1">
          <Clock className="h-3 w-3 mr-1 opacity-70" />
          <span className="text-xs opacity-70">
            {format(time, 'HH:mm', { locale: ptBR })}
          </span>
          {type === 'sent' && (
            isRecent ? 
              <Check className="h-3 w-3 ml-1 opacity-70" /> : 
              <CheckCheck className="h-3 w-3 ml-1 opacity-70" />
          )}
        </div>
      </div>
      {type === 'sent' && (
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ml-2">
          <MessageSquare className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
