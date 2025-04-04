
import React from 'react';
import { ActiveConversation } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActiveConversationsListProps {
  conversations: ActiveConversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
}

const ActiveConversationsList: React.FC<ActiveConversationsListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation
}) => {
  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Nenhuma conversa ativa</p>
      </div>
    );
  }

  const getEmotionColor = (emotion?: string) => {
    switch(emotion) {
      case 'positivo': return 'bg-green-500';
      case 'negativo': return 'bg-red-500';
      case 'interessado': return 'bg-blue-500';
      case 'confuso': return 'bg-orange-500';
      case 'hesitante': return 'bg-yellow-500';
      case 'entusiasmado': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <Badge className="bg-green-500">Ativo</Badge>;
      case 'waiting': return <Badge className="bg-yellow-500">Aguardando</Badge>;
      case 'closed': return <Badge className="bg-gray-500">Encerrado</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-2 p-2">
      {conversations.map(conversation => (
        <div 
          key={conversation.id}
          className={`p-3 rounded-md cursor-pointer hover:bg-accent transition-colors ${
            selectedConversationId === conversation.id ? 'bg-accent' : ''
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{conversation.leadName}</span>
                {conversation.unreadCount > 0 && (
                  <Badge className="bg-primary">{conversation.unreadCount}</Badge>
                )}
              </div>

              <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {conversation.leadCourse && (
                  <span className="mr-2 text-xs">{conversation.leadCourse}</span>
                )}
                {conversation.lastMessage}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(conversation.lastMessageTime, { locale: ptBR, addSuffix: true })}
              </div>
              <div className="mt-1">
                {getStatusBadge(conversation.status)}
              </div>
            </div>
          </div>
          
          {conversation.emotion && (
            <div className="mt-2 flex justify-between items-center">
              <Badge className={`${getEmotionColor(conversation.emotion)} text-xs`}>
                {conversation.emotion}
              </Badge>
              
              {conversation.assignedTo ? (
                <span className="text-xs text-muted-foreground">
                  Atendente: {conversation.assignedTo}
                </span>
              ) : (
                <Button variant="outline" size="sm" className="text-xs py-0 h-6">
                  Assumir atendimento
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActiveConversationsList;
