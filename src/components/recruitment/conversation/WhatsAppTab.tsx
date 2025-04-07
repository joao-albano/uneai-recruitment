
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import { Message } from './types';
import { Settings, RefreshCw, MoreVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { toast } from "sonner";

interface WhatsAppTabProps {
  messages: Message[];
  isAiMode: boolean;
  showAnalytics: boolean;
  onSendMessage: (message: string) => void;
  onOpenSettings?: () => void;
  isSelectedLead?: boolean;
  leadId?: string;
  onEndConversation?: () => void;
}

const WhatsAppTab: React.FC<WhatsAppTabProps> = ({
  messages,
  isAiMode,
  showAnalytics,
  onSendMessage,
  onOpenSettings,
  isSelectedLead = true,
  leadId,
  onEndConversation
}) => {
  const handleEndConversation = () => {
    if (onEndConversation) {
      onEndConversation();
    } else {
      toast.success("Atendimento encerrado com sucesso!");
    }
  };

  return (
    <TabsContent value="whatsapp" className="flex-1 flex flex-col p-0 m-0 h-full">
      <div className="flex items-center justify-end p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => window.location.reload()}
          title="Atualizar conversa"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        {onOpenSettings && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onOpenSettings}
            title="Configurações da conversa"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}

        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Mais opções"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem onClick={handleEndConversation} className="text-destructive">
              <X className="h-4 w-4 mr-2" />
              Encerrar atendimento
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <MessagesContainer 
          messages={messages}
          showAnalytics={showAnalytics}
          leadId={leadId}
        />
      </div>
      
      {isSelectedLead && (
        <div className="p-2 border-t bg-background">
          <MessageInput 
            isAiMode={isAiMode}
            onSendMessage={onSendMessage}
            onEndConversation={handleEndConversation}
          />
        </div>
      )}
    </TabsContent>
  );
};

export default WhatsAppTab;
