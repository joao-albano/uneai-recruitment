
import React, { useState } from 'react';
import { Bot, User, Loader2, SendHorizonal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MessageInputProps {
  isAiMode: boolean;
  onSendMessage: (message: string) => void;
  onEndConversation?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  isAiMode,
  onSendMessage,
  onEndConversation
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simular um delay para dar feedback visual
    setTimeout(() => {
      onSendMessage(message);
      setMessage('');
      setIsSending(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Badge variant={isAiMode ? "default" : "outline"} className="mr-2">
          {isAiMode ? (
            <div className="flex items-center">
              <Bot className="h-3 w-3 mr-1" />
              <span>Atendimento IA</span>
            </div>
          ) : (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>Atendimento Humano</span>
            </div>
          )}
        </Badge>
      </div>
      
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[80px] resize-none"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isSending || !message.trim()}
          className="h-10 w-10 p-0"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizonal className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
