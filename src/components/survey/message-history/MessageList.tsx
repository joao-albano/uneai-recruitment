
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WhatsAppMessage } from '@/types/whatsapp';
import MessageStatusIcon from './MessageStatusIcon';
import MessageStatusBadge from './MessageStatusBadge';

interface MessageListProps {
  messages: WhatsAppMessage[];
  onViewMessage: (message: WhatsAppMessage) => void;
  itemsPerPage?: number;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  onViewMessage,
  itemsPerPage = 10
}) => {
  if (messages.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Nenhuma mensagem encontrada com os critérios de busca.
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className="grid grid-cols-12 gap-2 p-3 text-sm border-b last:border-0 hover:bg-muted/30"
        >
          <div className="col-span-3 truncate">{message.studentName}</div>
          <div className="col-span-3 truncate">
            {message.parentName} • {message.recipientNumber}
          </div>
          <div className="col-span-2">
            {format(message.createdAt, 'dd/MM/yy HH:mm', { locale: ptBR })}
          </div>
          <div className="col-span-2 flex items-center gap-1.5">
            <MessageStatusIcon status={message.status} />
            <MessageStatusBadge status={message.status} />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewMessage(message)}
              className="h-8 px-2"
            >
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
