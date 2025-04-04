
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, SmilePlus, Bot, UserCircle2, AlertCircle } from 'lucide-react';

interface MessageInputProps {
  isAiMode: boolean;
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  isAiMode, 
  onSendMessage 
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t">
      {isAiMode && (
        <div className="mb-2 px-2">
          <div className="text-sm font-medium flex items-center">
            <Bot className="h-4 w-4 mr-1 text-primary" />
            Sugestões da IA:
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setMessage("Temos bolsas de até 40% para alunos com experiência profissional na área. Posso explicar como funciona o processo de solicitação?")}
            >
              Oferecer bolsa por experiência
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setMessage("Gostaria de agendar uma visita ao campus para conhecer nossa estrutura e conversar com coordenadores do curso?")}
            >
              Sugerir visita ao campus
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setMessage("Além do desconto noturno, temos parcelamento especial em até 12x sem juros para matrícula antecipada. Tem interesse?")}
            >
              Condições de pagamento
            </Badge>
          </div>
        </div>
      )}
      
      {!isAiMode && (
        <div className="mb-2 px-2">
          <div className="text-sm font-medium flex items-center text-green-700">
            <UserCircle2 className="h-4 w-4 mr-1" />
            Atendimento humano ativo
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <div className="flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Tempo médio de resposta: 2 minutos</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isAiMode 
            ? "Digite uma mensagem (IA responderá automaticamente)..." 
            : "Digite uma mensagem como atendente humano..."}
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button 
          size="icon" 
          variant="ghost"
        >
          <SmilePlus className="h-4 w-4" />
        </Button>
        <Button 
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className={isAiMode ? "" : "bg-green-600 hover:bg-green-700"}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
